import { PrismaClient, Message, User } from "@prisma/client"
import { access, readFile, constants, readdir } from "node:fs/promises"
import { statSync } from "node:fs"
import { join } from "node:path"
import { format, formatISO, fromUnixTime } from "date-fns"
import { WebClient as SlackClient } from "@slack/web-api"
import { FileElement } from "@slack/web-api/dist/response/ChatPostMessageResponse"
import { ChannelType, EmbedType } from "discord.js"
import type {
  Guild as DiscordClient,
  TextChannel,
  APIEmbed as Embed,
  Message as MessageManager,
} from "discord.js"
import { ChannelClient } from "./channel.mjs"
import { UserClient } from "./user.mjs"
import { getDiscordServerMaxFileSize } from "./server.mjs"

interface SlackMessageFile {
  type?: "message"
  subtype?: string | "bot_message"
  text?: string
  ts?: string
  user?: string
  bot_id?: string
  app_id?: string
  files?: FileElement[]
  thread_ts?: string
  replies?: {
    user: string
    ts: string
  }[]
}

interface File {
  url: string
  size: number
}

export class MessageClient {
  client: PrismaClient
  channelClient: ChannelClient
  userClient: UserClient
  constructor(client = new PrismaClient()) {
    this.client = client
    this.channelClient = new ChannelClient(this.client)
    this.userClient = new UserClient(this.client)
  }

  /**
   * Migrate all message data
   * @param discordClient
   * @param slackClient
   * @param srcDirpath
   */
  async migrateAllMessage(
    discordClient: DiscordClient,
    slackClient: SlackClient,
    srcDirpath: string
  ) {
    const channels = await this.channelClient.getAllChannel()
    const maxFileSize = getDiscordServerMaxFileSize(discordClient)

    for (const channel of channels) {
      if (!channel.deployId)
        throw new Error(`Failed to deployed channel id of ${channel.id}`)

      const messageDirPath = join(srcDirpath, channel.name)
      const messageFilePaths = await this.getAllSlackMessageFilePath(
        messageDirPath
      )

      for (const messageFilePath of messageFilePaths) {
        const messages = await this.getSlackMessageFile(messageFilePath)
        const newMessages: Message[] = []
        for (const message of messages) {
          if (
            message.type === undefined ||
            message.text === undefined ||
            message.ts === undefined
          ) {
            throw new Error("Message is missing required parameter")
          }

          // Replace message content
          let content = await this.replaceMessageContent(
            this.userClient,
            message.text
          )

          // Get pinned item
          const pinIds = channel.pins ? channel.pins.split(",") : []
          const isPinned = pinIds.includes(message.ts)

          // Get attached file
          const files = message.files
            ? JSON.stringify(
                message.files
                  // Skip deleted file
                  .filter((file) => file.mode !== "tombstone")
                  // Skip file size over max file size
                  .filter((file) => file.size && file.size < maxFileSize)
                  .map((file) => {
                    if (!file.url_private || !file.size)
                      throw new Error("File is missing required parameter")
                    return {
                      url: file.url_private,
                      size: file.size,
                    } as File
                  })
              )
            : null

          let author: User | null = null
          if (message.bot_id) {
            author = await this.userClient.getBot(
              slackClient,
              message.bot_id,
              message.app_id
            )
          } else if (message.user) {
            author = await this.userClient.getUser(slackClient, message.user)
          }

          if (!author) {
            throw new Error(
              [
                "Failed to get message author",
                `Message Timestamp: ${message.ts}`,
                `Message Content: ${content}`,
              ].join("\n")
            )
          }

          // HACK: Split message to prevent images from show over embed
          if (content && files) {
            newMessages.push({
              timestamp: message.ts,
              deployId: null,
              channelDeployId: channel.deployId,
              threadId: message.thread_ts || null,
              content: content,
              files: null,
              type: 1,
              isPinned: isPinned,
              isReplyed: message.thread_ts && !message.replies ? true : false,
              authorId: author.id,
              authorName: author.name,
              authorType: author.type,
              authorColor: author.color,
              authorImageUrl: author.imageUrl,
              createdAt: new Date(),
              updatedAt: new Date(),
            })

            newMessages.push({
              timestamp: String(parseFloat(message.ts) + 0.000001),
              deployId: null,
              channelDeployId: channel.deployId,
              threadId: null,
              content: null,
              files: files,
              type: 1,
              isPinned: false,
              isReplyed: false,
              authorId: author.id,
              authorName: author.name,
              authorType: author.type,
              authorColor: author.color,
              authorImageUrl: author.imageUrl,
              createdAt: new Date(),
              updatedAt: new Date(),
            })
          } else {
            newMessages.push({
              timestamp: message.ts,
              deployId: null,
              channelDeployId: channel.deployId,
              threadId: message.thread_ts || null,
              content: content,
              files: files,
              type: 1,
              isPinned: isPinned,
              isReplyed: message.thread_ts && !message.replies ? true : false,
              authorId: author.id,
              authorName: author.name,
              authorType: author.type,
              authorColor: author.color,
              authorImageUrl: author.imageUrl,
              createdAt: new Date(),
              updatedAt: new Date(),
            })
          }
        }

        await this.updateManyMessage(newMessages)
      }
    }
  }

  /**
   * Deploy all message
   * @param discordClient
   */
  async deployAllMessage(discordClient: DiscordClient) {
    const channels = await this.channelClient.getAllChannel()
    for (const channel of channels) {
      if (!channel.deployId)
        throw new Error(`Failed to deployed channel id of ${channel.name}`)

      const channelManager = discordClient.channels.cache.get(channel.deployId)
      if (
        channelManager === undefined ||
        channelManager.type !== ChannelType.GuildText
      )
        throw new Error(`Failed to get channel manager of ${channel.id}`)

      // Pagination message
      const take = 100
      let skip = 0
      const total = await this.client.message.count({
        where: {
          // Get only undeployed message for redeploy
          deployId: { equals: null },
          channelDeployId: channel.deployId,
        },
      })
      while (skip < total) {
        const messages = await this.client.message.findMany({
          take: take,
          skip: skip,
          where: {
            deployId: { equals: null },
            channelDeployId: channel.deployId,
          },
          orderBy: {
            timestamp: "asc",
          },
        })

        await this.deployManyMessage(channelManager, messages)
        skip += take
      }
    }
  }

  /**
   * Deploy many message
   * @param channelManager
   * @param messages
   */
  async deployManyMessage(channelManager: TextChannel, messages: Message[]) {
    for (const message of messages) {
      if (message.content && message.files) {
        throw new Error(
          [
            "Failed to deploy message",
            "Not supposed to set content and file in message at the same time",
            `Message Timestamp: ${message.timestamp}`,
            `Message Content: ${message.content}`,
          ].join("\n")
        )
      }

      const content =
        message.content && message.content.length > 4044
          ? "------------------------------------------------\n" +
            message.content.substring(0, 4044) +
            "…"
          : "------------------------------------------------\n" +
            message.content
      const fileUrls = message.files
        ? (JSON.parse(message.files) as File[]).map((file) => file.url)
        : undefined
      const timestamp = fromUnixTime(parseFloat(message.timestamp))

      let authorTypeIcon: "🟢" | "🔵" | "🤖" = "🟢"
      if (message.authorType === 2) {
        authorTypeIcon = "🔵"
      } else if (message.authorType === 3) {
        authorTypeIcon = "🤖"
      }

      const embeds: Embed[] = [
        {
          type: EmbedType.Rich,
          color: message.authorColor,
          description: content,
          timestamp: formatISO(timestamp),
          author: {
            name: `${authorTypeIcon} ${message.authorName}`,
            icon_url: message.authorImageUrl,
          },
          footer: {
            text: format(timestamp, "yyyy/MM/dd HH:mm"),
          },
        },
      ]

      // Deploy message
      let messageManager: MessageManager | undefined = undefined
      if (message.isReplyed && message.threadId) {
        const threadMessage = await this.client.message.findFirst({
          where: {
            timestamp: message.threadId,
          },
        })

        if (!threadMessage)
          throw new Error(
            [
              "Failed to get message to reply",
              "Not found message to reply",
              `Message Timestamp: ${message.timestamp}`,
              `Message Content: ${message.content}`,
            ].join("\n")
          )
        if (!threadMessage.deployId)
          throw new Error(
            [
              "Failed to get message to reply",
              "Not deployed Message to reply",
              `Message Timestamp: ${message.timestamp}`,
              `Message Content: ${message.content}`,
            ].join("\n")
          )

        messageManager = await channelManager.messages.cache
          .get(threadMessage.deployId)
          ?.reply({
            embeds: embeds,
            files: fileUrls,
          })
      } else {
        messageManager = await channelManager.send({
          embeds: embeds,
          files: fileUrls,
        })
      }

      if (!messageManager)
        throw new Error(
          [
            "Failed to deploy message",
            "Not found message manager",
            `Message Timestamp: ${message.timestamp}`,
            `Message Content: ${message.content}`,
          ].join("\n")
        )

      // Deploy pinned item
      if (message.isPinned) {
        await messageManager.pin()
      }

      // Update message
      const newMessage = (() => message)()
      newMessage.deployId = messageManager.id
      await this.updateManyMessage([newMessage])
    }
  }

  // TODO: 後で消す
  /**
   * @deplicated Deploy many file
   * @param channelManager
   * @param message
   * @param files
   * @param maxFileSize
   */
  async deployManyFile(
    channelManager: TextChannel,
    message: Message,
    files: File[],
    maxFileSize: 8000000 | 50000000 | 100000000
  ) {
    // HACK: If file exceeds max upload file size, file url is attached without uploading file
    const sizeOverFileUrls = files
      ?.filter((file) => file.size && file.size >= maxFileSize)
      .map((file) => file.url)
    const uploadFileUrls = files
      ?.filter((file) => file.size && file.size < maxFileSize)
      .map((file) => file.url)

    //  Deploy message with file
    const sendMessage = await channelManager.send({
      content: sizeOverFileUrls.join("\n"),
      files: uploadFileUrls,
    })

    // Update message with file
    const newMessage = (() => message)()
    newMessage.deployId = sendMessage.id
    await this.updateManyMessage([newMessage])

    // Deploy pinned item
    if (!message.content && message.isPinned) {
      await sendMessage.pin()
    }
  }

  /**
   * Destroy all message
   */
  async destroyAllMessage(discordClient: DiscordClient) {
    //  Get all channel data
    const channels = await this.channelClient.getAllChannel()

    // Delete all messages
    await Promise.all(
      channels.map(async (channel) => {
        if (!channel.deployId)
          throw new Error(`Failed to deployed channel id of ${channel.name}`)

        const channelManager = discordClient.channels.cache.get(
          channel.deployId
        )
        if (
          channelManager === undefined ||
          channelManager.type !== ChannelType.GuildText
        )
          throw new Error(`Failed to get channel manager of ${channel.id}`)

        // Pagination message
        const take = 100
        let skip = 0
        const total = await this.client.message.count({
          where: {
            channelDeployId: channel.deployId,
          },
        })
        while (skip < total) {
          const messages = await this.client.message.findMany({
            take: take,
            skip: skip,
            where: {
              channelDeployId: channel.deployId,
            },
            orderBy: {
              timestamp: "asc",
            },
          })
          await this.destroyManyMessage(channelManager, messages)
          skip += take
        }
      })
    )
  }

  /**
   * Destroy many message
   * @param channelManager
   * @param messages
   */
  async destroyManyMessage(channelManager: TextChannel, messages: Message[]) {
    const newMessages = await Promise.all(
      messages
        // Skip destroy undeployed message
        .filter((message) => message.deployId)
        .map(async (message) => {
          if (message.isPinned) {
            // FIX: Want to avoid forced type casting
            await channelManager.messages.unpin(message.deployId as string)
          }

          // FIX: Want to avoid forced type casting
          await channelManager.messages.delete(message.deployId as string)

          const newMessage = (() => message)()
          newMessage.deployId = null
          return newMessage
        })
    )
    await this.updateManyMessage(newMessages)
  }

  /**
   * Get slack message file
   * @param messageFilePath
   */
  async getSlackMessageFile(messageFilePath: string) {
    await access(messageFilePath, constants.R_OK)
    return JSON.parse(
      await readFile(messageFilePath, "utf8")
    ) as SlackMessageFile[]
  }

  /**
   * Get all slack message file path
   * @param messageDirPath
   */
  async getAllSlackMessageFilePath(messageDirPath: string) {
    const fileOrDirNames = await readdir(join(messageDirPath))
    const messageFilePaths = fileOrDirNames
      .filter(
        (fileOrDirName) =>
          // TODO: Replace with async function
          statSync(join(messageDirPath, fileOrDirName)).isFile() &&
          new RegExp(
            /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]).json/g
          ).test(fileOrDirName)
      )
      .map((fileOrDirName) => join(messageDirPath, fileOrDirName))
    return messageFilePaths
  }

  /**
   * Replace message content
   * @param userClient
   * @param content
   */
  async replaceMessageContent(userClient: UserClient, content: string) {
    let newContent = content

    if (!newContent) return null

    // Replace mention
    const matchMention = newContent.match(/<@U[A-Z0-9]{10}>/g)
    if (matchMention?.length) {
      const userIds = matchMention.map((mention) =>
        mention.replace(/<@|>/g, "")
      )
      for (const userId of userIds) {
        const username = await userClient.getUsername(userId)
        if (username) {
          newContent = newContent.replaceAll(`<@${userId}>`, `@${username}`)
        } else {
          throw new Error(`Failed to replace mention of @${userId} to username`)
        }
      }
    }

    // Replace channel mention
    if (/<!channel>/.test(newContent))
      newContent = newContent.replaceAll(/<!channel>/g, "@channel")

    // Replace bold letters
    if (/\*.*\*/.test(newContent))
      newContent = newContent.replaceAll(/\**\*/g, "**")

    //  Replace italic letters
    // if (/\_.*\_/.test(newContent))
    //   newContent = newContent.replaceAll(/\_*\_/g, "_")

    // Replace strikethrough
    if (/~.*~/.test(newContent))
      newContent = newContent.replaceAll(/~*~/g, "~~")

    // Replace quote
    if (/&gt; .*/.test(newContent))
      newContent = newContent.replaceAll(/&gt; /g, "> ")

    // Replace URL
    if (/<http|https:\/\/.*\|.*>/.test(newContent))
      newContent = content.replaceAll(/<|\|.*>/g, "")

    return newContent
  }

  /**
   * Update many message
   * @param messages
   */
  async updateManyMessage(messages: Message[]) {
    const query = messages.map((message) =>
      this.client.message.upsert({
        where: {
          timestamp: message.timestamp,
        },
        update: {
          deployId: message.deployId,
          channelDeployId: message.channelDeployId,
          threadId: message.threadId,
          content: message.content,
          files: message.files,
          type: message.type,
          isPinned: message.isPinned,
          isReplyed: message.isReplyed,
          authorId: message.authorId,
          authorName: message.authorName,
          authorType: message.authorType,
          authorColor: message.authorColor,
          authorImageUrl: message.authorImageUrl,
        },
        create: {
          timestamp: message.timestamp,
          deployId: message.deployId,
          channelDeployId: message.channelDeployId,
          threadId: message.threadId,
          content: message.content,
          files: message.files,
          type: message.type,
          isPinned: message.isPinned,
          isReplyed: message.isReplyed,
          authorId: message.authorId,
          authorName: message.authorName,
          authorType: message.authorType,
          authorColor: message.authorColor,
          authorImageUrl: message.authorImageUrl,
        },
      })
    )
    await this.client.$transaction([...query])
  }
}

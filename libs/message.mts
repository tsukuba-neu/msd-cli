import { access, readFile, readdir, mkdir, writeFile } from "node:fs/promises"
import { statSync, constants } from "node:fs"
import { dirname, join } from "node:path"
import { fromUnixTime, format } from "date-fns"
import {
  Message as SlackBaseMessage,
  FileElement,
} from "@slack/web-api/dist/response/ChatPostMessageResponse"
import { ChannelType, Guild } from "discord.js"
import type { User } from "./user.mjs"
import type { Channel } from "./channel.mjs"

export interface SlackMessage extends SlackBaseMessage {
  files?: FileElement[]
}

export interface Message {
  message_id?: string
  channel_id?: string
  guild_id?: string
  text: string
  files?: {
    id: string
    file_type: string
    name: string
    size: number
    url: string
    download_url: string
  }[]
  author?: {
    id: string
    is_bot: boolean
  }
  timestamp?: number
}

/**
 * Get message file
 * @param distMessageFilePath
 */
export const getMessageFile = async (
  distMessageFilePath: string
): Promise<{
  messages: Message[]
  status: "success" | "failed"
  message?: any
}> => {
  try {
    await access(distMessageFilePath, constants.R_OK)
    const messages = JSON.parse(
      await readFile(distMessageFilePath, "utf8")
    ) as Message[]
    return { messages: messages, status: "success" }
  } catch (error) {
    return { messages: [], status: "failed", message: error }
  }
}

/**
 * Create message file
 * @param distMessageFilePath
 * @param messages
 */
export const createMessageFile = async (
  distMessageFilePath: string,
  messages: Message[]
): Promise<{
  status: "success" | "failed"
  message?: any
}> => {
  try {
    await mkdir(dirname(distMessageFilePath), {
      recursive: true,
    })
    await writeFile(distMessageFilePath, JSON.stringify(messages, null, 2))
    return { status: "success" }
  } catch (error) {
    return { status: "failed", message: error }
  }
}

/**
 * Build message file
 * @param srcMessageFilePath
 * @param distMessageFilePath
 * @param users
 * @param showCutLine
 */
export const buildMessageFile = async (
  srcMessageFilePath: string,
  distMessageFilePath: string,
  users: User[],
  maxFileSize: number,
  showCutLine: boolean
): Promise<{
  messages: Message[]
  isMaxFileSizeOver?: boolean
  status: "success" | "failed"
  message?: any
}> => {
  const newMessages: Message[] = []
  try {
    await access(srcMessageFilePath, constants.R_OK)
    const messageFile = await readFile(srcMessageFilePath, "utf8")
    const messages = JSON.parse(messageFile) as SlackMessage[]
    let isMaxFileSizeOver = false
    for (const message of messages) {
      let text = ""

      // テキストの最初にチャットの区切りが見やすいように切り取り線を追加
      if (showCutLine)
        text += "------------------------------------------------\n"

      // テキストに絵文字アイコンとユーザー名とタイムスタンプを追加
      const user = users.find(
        (user) =>
          user.slack.id === message.user || user.slack.id === message.bot_id
      )

      const name = user ? user.discord.name : "NoName"
      const icon = message.bot_id ? "🤖" : user?.slack.deleted ? "🥶" : "😃"
      const timestamp = message.ts
        ? format(fromUnixTime(Number(message.ts)), "yyyy/MM/dd HH:mm")
        : ""
      text += `${icon}  **${name}**  ${timestamp}\n`

      // TODO: ここにサブタイプに応じて必要なら処理を書く
      // "bot_add" | "bot_message" | "bot_remove" | "channel_join" | "channel_topic" | "channel_archive" | "channel_purpose"

      // テキストにメッセージ内容を追加
      text += message.text

      // テキスト内のメンションをユーザー名もしくはBot名に置換
      if (new RegExp(/<@U[A-Z0-9]{10}>/g).test(text)) {
        for (const user of users) {
          // Discordで送信時にメンションされないように加工
          text = text.replaceAll(
            new RegExp(`<@${user.slack.id}>`, "g"),
            `@${user.discord.name}`
          )
        }
      }

      // 添付ファイルがあれば追加
      const files: Message["files"] = message.files?.map((file) => {
        if (file.size && file.size > maxFileSize && !isMaxFileSizeOver) {
          isMaxFileSizeOver = true
        }
        return {
          id: file.id || "",
          file_type: file.filetype || "",
          name: file.name || "",
          size: file.size || 0,
          url: file.url_private || "",
          download_url: file.url_private_download || "",
        }
      })

      newMessages.push({
        text: text,
        files: files,
      })
    }

    const createMessageFileResult = await createMessageFile(
      distMessageFilePath,
      newMessages
    )
    if (createMessageFileResult.status === "failed") {
      return {
        messages: [],
        status: "failed",
        message: createMessageFileResult.message,
      }
    }

    return {
      messages: newMessages,
      isMaxFileSizeOver: isMaxFileSizeOver,
      status: "success",
    }
  } catch (error) {
    return { messages: [], status: "failed", message: error }
  }
}

/**
 * Build all message file
 * @param channels
 * @param users
 * @param showCutLine
 */
export const buildAllMessageFile = async (
  channels: Channel[],
  users: User[],
  showCutLine: boolean
): Promise<{
  isMaxFileSizeOver?: boolean
  status: "success" | "failed"
  message?: any
}> => {
  try {
    let isMaxFileSizeOver = false
    await Promise.all(
      channels.map(
        async (channel) =>
          await Promise.all(
            channel.slack.message_file_paths.map(
              async (srcMessageFilePath, index) => {
                const distMessageFilePath =
                  channel.discord.message_file_paths[index]
                const buildMessageFileResult = await buildMessageFile(
                  srcMessageFilePath,
                  distMessageFilePath,
                  users,
                  channel.discord.guild.max_file_size,
                  showCutLine
                )
                if (
                  buildMessageFileResult.isMaxFileSizeOver &&
                  !isMaxFileSizeOver
                ) {
                  isMaxFileSizeOver = true
                }
                if (buildMessageFileResult.status === "failed") {
                  throw new Error(buildMessageFileResult.message)
                }
              }
            )
          )
      )
    )
    return { isMaxFileSizeOver: isMaxFileSizeOver, status: "success" }
  } catch (error) {
    return { status: "failed", message: error }
  }
}

/**
 * Get message directory path
 * @param messageDirPath
 */
export const getMessageFilePaths = async (messageDirPath: string) => {
  const fileOrDirNames = await readdir(join(messageDirPath))
  const messageFilePaths = fileOrDirNames
    .filter(
      (fileOrDirName) =>
        // TODO: 非同期関数に置換する
        statSync(join(messageDirPath, fileOrDirName)).isFile() &&
        new RegExp(
          /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01]).json/g
        ).test(fileOrDirName)
    )
    .map((fileOrDirName) => join(messageDirPath, fileOrDirName))
  return messageFilePaths
}

/**
 *  Create message
 * @param discordGuild
 * @param channelId
 * @param maxFileSize
 * @param distMessageFilePath
 * @param messages
 */
export const createMessage = async (
  discordGuild: Guild,
  messages: Message[],
  channelId: string,
  maxFileSize: number,
  distMessageFilePath: string
): Promise<{
  messages: Message[]
  isMaxFileSizeOver?: boolean
  status: "success" | "failed"
  message?: any
}> => {
  try {
    // メッセージを作成
    const channelGuild = discordGuild.channels.cache.get(channelId)
    const newMessages: Message[] = []
    let isMaxFileSizeOver = false
    if (channelGuild && channelGuild.type === ChannelType.GuildText) {
      for (const message of messages) {
        /**
         * サーバーブーストレベルに応じて、最大ファイルサイズを超過したファイルは、
         * ファイルをアップロードせず、ファイルURLを添付するようにする
         */
        const maxSizeOverFileUrls = message.files?.filter(
          (file) => file.size > maxFileSize
        )
        const uploadFileUrls = message.files
          ?.filter((file) => file.size < maxFileSize)
          .map((file) => file.url)
        let content = message.text
        if (maxSizeOverFileUrls) {
          isMaxFileSizeOver = true
          for (const file of maxSizeOverFileUrls) {
            content += `\n${file.url}`
          }
        }

        const result = await channelGuild.send({
          content: content,
          files: uploadFileUrls,
        })
        newMessages.push({
          ...message,
          ...{
            message_id: result.id,
            channel_id: result.channelId,
            guild_id: result.guildId ? result.guildId : undefined,
            anthor: {
              id: result.author.id,
              is_bot: result.author.bot,
              name: result.author.username,
            },
            timestamp: result.createdTimestamp,
          },
        })
      }
    }

    // メッセージファイルを更新
    const createMessageFileResult = await createMessageFile(
      distMessageFilePath,
      newMessages
    )
    if (createMessageFileResult.status === "failed") {
      return {
        messages: [],
        status: "failed",
        message: createMessageFileResult.message,
      }
    }

    return {
      messages: newMessages,
      isMaxFileSizeOver: isMaxFileSizeOver,
      status: "success",
    }
  } catch (error) {
    return { messages: [], status: "failed", message: error }
  }
}

/**
 * Create all message
 */
export const createAllMessage = async (
  discordGuild: Guild,
  channels: Channel[]
): Promise<{
  isMaxFileSizeOver?: boolean
  status: "success" | "failed"
  message?: any
}> => {
  try {
    let isMaxFileSizeOver = false
    await Promise.all(
      channels.map(async (channel) => {
        await Promise.all(
          channel.discord.message_file_paths.map(async (messageFilePath) => {
            const getMessageFileResult = await getMessageFile(messageFilePath)
            if (getMessageFileResult.status === "failed") {
              throw new Error(getMessageFileResult.message)
            }
            const createMessageResult = await createMessage(
              discordGuild,
              getMessageFileResult.messages,
              channel.discord.channel_id,
              channel.discord.guild.max_file_size,
              messageFilePath
            )
            if (createMessageResult.status === "failed") {
              throw new Error(createMessageResult.message)
            }
            if (createMessageResult.isMaxFileSizeOver && !isMaxFileSizeOver) {
              isMaxFileSizeOver = true
            }
          })
        )
      })
    )
    return { isMaxFileSizeOver: isMaxFileSizeOver, status: "success" }
  } catch (error) {
    return { status: "failed", message: error }
  }
}

/**
 *  Delete message
 * @param discordGuild
 * @param channelId
 * @param distMessageFilePath
 * @param messages
 */
export const deleteMessage = async (
  discordGuild: Guild,
  messages: Message[],
  channelId: string,
  distMessageFilePath: string
): Promise<{
  messages: Message[]
  status: "success" | "failed"
  message?: any
}> => {
  try {
    // メッセージを削除
    const channelGuild = discordGuild.channels.cache.get(channelId)
    const newMessages: Message[] = []
    if (channelGuild && channelGuild.type === ChannelType.GuildText) {
      for (const message of messages) {
        if (message.message_id) {
          const result = await channelGuild.messages.cache
            .get(message.message_id)
            ?.delete()
          newMessages.push({
            ...message,
            ...{
              message_id: result?.id,
              channel_id: result?.channelId,
              guild_id: result?.guildId ? result?.guildId : undefined,
              timestamp: result?.editedTimestamp
                ? result?.editedTimestamp
                : undefined,
              anthor: {
                id: result?.author.id,
                is_bot: result?.author.bot,
                name: result?.author.username,
              },
            },
          })
        }
      }
    }

    // メッセージファイルを更新
    const createMessageFileResult = await createMessageFile(
      distMessageFilePath,
      newMessages
    )
    if (createMessageFileResult.status === "failed") {
      return {
        messages: [],
        status: "failed",
        message: createMessageFileResult.message,
      }
    }

    return { messages: newMessages, status: "success" }
  } catch (error) {
    return { messages: [], status: "failed", message: error }
  }
}

/**
 * Delete all message
 */
export const deleteAllMessage = async (
  discordGuild: Guild,
  channels: Channel[]
): Promise<{
  status: "success" | "failed"
  message?: any
}> => {
  try {
    await Promise.all(
      channels.map(async (channel) => {
        await Promise.all(
          channel.discord.message_file_paths.map(async (messageFilePath) => {
            const getMessageFileResult = await getMessageFile(messageFilePath)
            if (getMessageFileResult.status === "failed") {
              throw new Error(getMessageFileResult.message)
            }
            const deleteMessageResult = await deleteMessage(
              discordGuild,
              getMessageFileResult.messages,
              channel.discord.channel_id,
              messageFilePath
            )
            if (deleteMessageResult.status === "failed") {
              throw new Error(deleteMessageResult.message)
            }
          })
        )
      })
    )
    return { status: "success" }
  } catch (error) {
    return { status: "failed", message: error }
  }
}

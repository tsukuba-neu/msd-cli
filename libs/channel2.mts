import { PrismaClient, Channel } from "@prisma/client"
import { access, readFile, constants } from "node:fs/promises"
import { ChannelType, DiscordAPIError } from "discord.js"
import type { Guild as DiscordClient } from "discord.js"
import retry from "async-retry"
import { CategoryClient } from "./category2.mjs"

interface SlackChannelFile {
  id?: string
  name?: string
  purpose?: string
  topic?: {
    value: string
  }
  is_archived?: boolean
  pins?: {
    id: string
    user: string
  }[]
}

export class ChannelClient {
  client: PrismaClient
  categoryClient: CategoryClient
  constructor(client = new PrismaClient()) {
    this.client = client
    this.categoryClient = new CategoryClient(this.client)
  }

  /**
   * Migrate channel data
   * @param channelFilePath
   */
  async migrateChannel(channelFilePath: string) {
    // Get slack channel file
    const slackChannels = await this.getSlackChannelFile(channelFilePath)

    // Convert channel data
    const newChannels: Channel[] = slackChannels.map((channel) => {
      if (
        channel.id === undefined ||
        channel.name === undefined ||
        channel.topic === undefined ||
        channel.is_archived === undefined
      )
        throw new Error("Channel is missing a required parameter")

      return {
        id: channel.id,
        deployId: null,
        name: channel.name,
        categoryDeployId: null,
        type: 1,
        topic: channel.topic.value,
        isArchived: channel.is_archived,
        pins: channel.pins?.map((pin) => pin.id).join(",") || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })

    // Update category data
    await this.categoryClient.updateManyCategory([
      {
        id: "DEFAULT_CATEGORY",
        deployId: null,
        name: "CHANNEL",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "ARCHIVE_CATEGORY",
        deployId: null,
        name: "ARCHIVE",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])

    // Update channel data
    await this.updateManyChannel(newChannels)
  }

  /**
   * Deploy single channel
   * @param discordClient
   * @param channelName
   * @param channelId
   * @param option
   */
  async deployChannel(
    discordClient: DiscordClient,
    channelName: string,
    channelId: string,
    option: {
      channelType: 1 | 2
      topic?: string
      isArchived: boolean
    } = { channelType: 1, isArchived: false }
  ) {
    // Deploy all category
    await this.categoryClient.deployAllCategory(discordClient)
    const category = option.isArchived
      ? await this.categoryClient.getCategory("ARCHIVE_CATEGORY", true)
      : await this.categoryClient.getCategory("DEFAULT_CATEGORY", true)
    if (!category?.deployId)
      throw new Error("Failed to get deployed init category")

    // Deploy channel
    const result = await retry(
      async () =>
        await discordClient.channels.create({
          name: channelName,
          type: ChannelType.GuildText,
          topic: option.topic,
          parent: category.deployId,
        })
    )

    const newChannel: Channel = {
      id: channelId,
      deployId: result.id,
      name: result.name,
      categoryDeployId: category.deployId,
      type: option.channelType,
      topic: result.topic || null,
      isArchived: option.isArchived,
      pins: null,
      createdAt: result.createdAt,
      updatedAt: result.createdAt,
    }

    // Update channel data
    await this.updateChannel(newChannel)

    return result
  }

  /**
   * Destroy single channel
   * @param discordClient
   * @param channelDeployId
   */
  async destroyChannel(discordClient: DiscordClient, channelDeployId: string) {
    // Destroy discord channel
    try {
      await discordClient.channels.delete(channelDeployId)
    } catch (error) {
      if (error instanceof DiscordAPIError && error.code == 10003) {
        // Do not throw error if channel to be deleted does not exist
      } else {
        throw error
      }
    }

    // Delete channel data
    await this.client.channel.delete({
      where: {
        deployId: channelDeployId,
      },
    })
  }

  /**
   * Deploy all channel
   */
  async deployAllChannel(discordClient: DiscordClient) {
    // Get all channel data
    const channels = await this.getAllChannel()

    // Deploy all category
    await this.categoryClient.deployAllCategory(discordClient)
    const defaultCategory = await this.categoryClient.getCategory(
      "DEFAULT_CATEGORY",
      true
    )
    const archiveCategory = await this.categoryClient.getCategory(
      "ARCHIVE_CATEGORY",
      true
    )
    if (!defaultCategory?.deployId || !archiveCategory?.deployId)
      throw new Error("Failed to deployed init category")

    // Deploy all channel
    const newChannels: Channel[] = await Promise.all(
      channels.map(async (channel) => {
        const categoryDeployId = channel.isArchived
          ? archiveCategory.deployId
          : defaultCategory.deployId

        const result = await retry(
          async () =>
            await discordClient.channels.create({
              name: channel.name,
              type: ChannelType.GuildText,
              topic: channel.topic ? channel.topic : undefined,
              parent: categoryDeployId,
            })
        )

        return {
          id: channel.id,
          deployId: result.id,
          name: result.name,
          categoryDeployId: categoryDeployId,
          type: 1,
          topic: result.topic,
          isArchived: channel.isArchived,
          pins: channel.pins,
          createdAt: result.createdAt,
          updatedAt: result.createdAt,
        }
      })
    )

    // Update all channel data
    await this.updateManyChannel(newChannels)
  }

  /**
   * Destroy all channel
   */
  async destroyAllChannel(discordClient: DiscordClient) {
    // Get all deployed channel data
    const channels = await this.getAllChannel(true)

    // Destroy all channel
    await Promise.all(
      channels.map(async (channel) => {
        try {
          if (channel.deployId)
            await discordClient.channels.delete(channel.deployId)
        } catch (error) {
          if (error instanceof DiscordAPIError && error.code == 10003) {
            // Do not throw error if channel to be deleted does not exist
          } else {
            throw error
          }
        }
      })
    )

    // Delete all channel data
    await this.client.channel.deleteMany({
      where: {
        deployId: {
          not: {
            equals: null,
          },
        },
        type: 1,
      },
    })

    // Destroy all category
    await this.categoryClient.destroyAllCategory(discordClient)
  }

  /**
   * Get slack channel file
   * @param channelFilePath
   */
  async getSlackChannelFile(channelFilePath: string) {
    await access(channelFilePath, constants.R_OK)
    return JSON.parse(
      await readFile(channelFilePath, "utf8")
    ) as SlackChannelFile[]
  }

  /**
   * Get single channel data
   * @param channelName
   * @param channelType
   */
  async getChannel(channelName: string, channelType?: 1 | 2) {
    return await this.client.channel.findFirst({
      where: {
        name: channelName,
        type: channelType,
      },
      orderBy: [
        {
          updatedAt: "desc",
        },
      ],
    })
  }

  /**
   * Get all channel data
   * @param isDeployed
   */
  async getAllChannel(isDeployed: boolean = false) {
    return await this.client.channel.findMany({
      where: {
        type: 1,
        deployId: isDeployed ? { not: { equals: null } } : { equals: null },
      },
    })
  }

  /**
   * Update single channel data
   * @param channel
   */
  async updateChannel(channel: Channel) {
    await this.client.channel.upsert({
      where: {
        id: channel.id,
      },
      update: {
        deployId: channel.deployId,
        name: channel.name,
        categoryDeployId: channel.categoryDeployId,
        type: channel.type,
        topic: channel.topic,
        isArchived: channel.isArchived,
        pins: channel.pins,
      },
      create: {
        id: channel.id,
        deployId: channel.deployId,
        name: channel.name,
        categoryDeployId: channel.categoryDeployId,
        type: channel.type,
        topic: channel.topic,
        isArchived: channel.isArchived,
        pins: channel.pins,
        createdAt: channel.createdAt,
        updatedAt: channel.updatedAt,
      },
    })
  }

  /**
   * Update many channel data
   * @param channels
   */
  async updateManyChannel(channels: Channel[]) {
    const query = channels.map((channel) => {
      return this.client.channel.upsert({
        where: {
          id: channel.id,
        },
        update: {
          id: channel.id,
          deployId: channel.deployId,
          name: channel.name,
          categoryDeployId: channel.categoryDeployId,
          type: channel.type,
          topic: channel.topic,
          isArchived: channel.isArchived,
          pins: channel.pins,
          createdAt: channel.createdAt,
          updatedAt: channel.updatedAt,
        },
        create: {
          id: channel.id,
          deployId: channel.deployId,
          name: channel.name,
          categoryDeployId: channel.categoryDeployId,
          type: channel.type,
          topic: channel.topic,
          isArchived: channel.isArchived,
          pins: channel.pins,
          createdAt: channel.createdAt,
          updatedAt: channel.updatedAt,
        },
      })
    })
    await this.client.$transaction([...query])
  }

  // async connect(): Promise<void> {
  //   await this.client.$connect()
  // }

  // async disconnect(): Promise<void> {
  //   await this.client.$disconnect()
  // }
}

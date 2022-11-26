import { Command } from 'commander'
import dotenv from 'dotenv'
import { resolve } from 'node:path'
import type { Guild as DiscordClient } from 'discord.js'
import type { WebClient as SlackClient } from '@slack/web-api'
import { Spinner } from '../../libs/util/spinner.mjs'
import { MessageClient } from '../../libs/message.mjs'
import { createDiscordClient, createSlackClient } from '../../libs/client.mjs'

const __dirname = new URL(import.meta.url).pathname
const srcDirPath = resolve(__dirname, '../../../.src/')

dotenv.config({ path: './.env' })
const spinner = new Spinner()

interface Options {
  discordBotToken: string
  discordServerId: string
  slackBotToken: string
}

;(async () => {
  const program = new Command()
  program
    .description('Migrate message command')
    .requiredOption(
      '-dt, --discord-bot-token [string]',
      'DiscordBot OAuth Token',
      process.env.DISCORD_BOT_TOKEN
    )
    .requiredOption(
      '-ds, --discord-server-id [string]',
      'Discord Server ID',
      process.env.DISCORD_SERVER_ID
    )
    .requiredOption(
      '-st, --slack-bot-token [string]',
      'SlackBot OAuth Token',
      process.env.SLACK_BOT_TOKEN
    )
    .parse(process.argv)

  const { discordBotToken, discordServerId, slackBotToken }: Options = program.opts()

  spinner.loading('Create client')
  let messageClient: MessageClient | undefined = undefined
  let discordClient: DiscordClient | null = null
  let slackClient: SlackClient | undefined = undefined
  try {
    messageClient = new MessageClient()
    discordClient = await createDiscordClient(discordBotToken, discordServerId)
    slackClient = createSlackClient(slackBotToken)
  } catch (error) {
    spinner.failed(null, error)
    process.exit(1)
  }
  spinner.success()

  spinner.loading('Migrate message')
  try {
    await messageClient.migrateAllMessage(discordClient, slackClient, srcDirPath)
  } catch (error) {
    spinner.failed(null, error)
    process.exit(1)
  }
  spinner.success()

  process.exit(0)
})()

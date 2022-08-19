import { Command } from "commander"
import dotenv from "dotenv"
import { resolve, join } from "node:path"
import prompts from "prompts"
import type { Guild as DiscordClientType } from "discord.js"
import { Spinner } from "../../libs/util/spinner.mjs"
import { createDiscordClient } from "../../libs/client.mjs"
import type { Channel } from "../../libs/channel.mjs"
import { deleteChannel, getChannelFile } from "../../libs/channel.mjs"
import { deleteCategory, getCategoryFile } from "../../libs/category.mjs"
import type { Category } from "../../libs/category.mjs"

const __dirname = new URL(import.meta.url).pathname
const distDirPath = resolve(__dirname, "../../../.dist/")
const distCategoryFilePath = join(distDirPath, "category.json")
const distChannelFilePath = join(distDirPath, "channel.json")

dotenv.config({ path: "./.env" })
const spinner = new Spinner()

interface Options {
  discordBotToken?: string
  discordServerId?: string
}

;(async () => {
  // コマンドの実行確認
  const confirm = await prompts({
    type: "confirm",
    name: "value",
    message: "Delete channel?",
  })
  if (!confirm.value) process.exit(0)

  const program = new Command()
  program
    .description("Delete channel command")
    .requiredOption(
      "-dt, --discord-bot-token [string]",
      "DiscordBot OAuth Token",
      process.env.DISCORD_BOT_TOKEN
    )
    .requiredOption(
      "-ds, --discord-server-id [string]",
      "Discord Server ID",
      process.env.DISCORD_SERVER_ID
    )
    .parse(process.argv)

  // パラメーターの取得
  spinner.loading("Check parameter")
  const options: Options = program.opts()
  const { discordBotToken, discordServerId } = options
  if (discordBotToken === undefined || discordServerId === undefined) {
    spinner.failed(null, "Required parameter is not found")
    process.exit(0)
  }
  spinner.success()

  // Discordのクライアントを作成する
  spinner.loading("Create discord client")
  let discordClient: DiscordClientType | null = null
  try {
    discordClient = await createDiscordClient(discordBotToken, discordServerId)
  } catch (error) {
    spinner.failed(null, error)
    process.exit(0)
  }
  spinner.success()

  // チャンネルを取得する
  spinner.loading("Get channel")
  let channels: Channel[] | null = null
  try {
    channels = await getChannelFile(distChannelFilePath)
  } catch (error) {
    spinner.failed(null, error)
    process.exit(0)
  }
  spinner.success()

  // カテゴリーを取得する
  spinner.loading("Get category")
  let categories: Category[] | null = null
  try {
    categories = await getCategoryFile(distCategoryFilePath)
  } catch (error) {
    spinner.failed(null, error)
    process.exit(0)
  }
  spinner.success()

  // チャンネルを削除する
  spinner.loading("Delete channel")
  try {
    await deleteChannel(discordClient, channels)
  } catch (error) {
    spinner.failed(null, error)
    process.exit(0)
  }
  spinner.success()

  // カテゴリーを削除する
  spinner.loading("Delete category")
  try {
    await deleteCategory(discordClient, categories)
  } catch (error) {
    spinner.failed(null, error)
    process.exit(0)
  }
  spinner.success()

  process.exit(0)
})()

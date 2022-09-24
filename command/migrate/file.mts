import { Command } from "commander"
import dotenv from "dotenv"
import { resolve, join } from "node:path"
import { Spinner } from "../../libs/util/spinner.mjs"
import { FileClient } from "../../libs/file.mjs"

const __dirname = new URL(import.meta.url).pathname
const srcDirPath = resolve(__dirname, "../../../.src/")
const userFilePath = join(srcDirPath, "users.json")

dotenv.config({ path: "./.env" })
const spinner = new Spinner()

;(async () => {
  const program = new Command()
  program.description("Migrate user command").parse(process.argv)

  spinner.loading("Create client")
  let fileClient: FileClient | undefined = undefined
  try {
    fileClient = new FileClient()
  } catch (error) {
    spinner.failed(null, error)
    process.exit(1)
  }
  spinner.success()

  spinner.loading("Migrate user")
  try {
    await fileClient.migrateUser(userFilePath)
  } catch (error) {
    spinner.failed(null, error)
    process.exit(1)
  }
  spinner.success()

  process.exit(0)
})()

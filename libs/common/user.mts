import { access, readFile } from "node:fs/promises"
// BUG: @types/nodeにfsPromises.constantsが無いので代用
// https://github.com/nodejs/node/issues/44209
import { constants } from "node:fs"
import { Member } from "@slack/web-api/dist/response/UsersListResponse"

export interface User {
  slack: {
    user_id: string
    username: string
    deleted: boolean
    is_bot: boolean
  }
  discord: {
    user_id: string
    username: string
  }
}

export const getUsers = async (filePath: string) => {
  await access(filePath, constants.R_OK)
  const usersFile = await readFile(filePath, "utf8")
  const users = JSON.parse(usersFile).map((member: Member) => {
    const username = member.is_bot
      ? member.name
      : member.profile?.display_name
      ? member.profile.display_name
      : ""

    return {
      slack: {
        user_id: member.id,
        username: username,
        deleted: member.deleted,
        is_bot: member.is_bot,
      },
      discord: {
        user_id: "",
        username: username,
      },
    }
  }) as User[]
  return users
}

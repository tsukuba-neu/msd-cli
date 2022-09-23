import type { Guild as DiscordClient } from "discord.js"

/**
 * Get max file size according to discord server boost level
 * @param discordClient
 */
export const getDiscordServerMaxFileSize = (discordClient: DiscordClient) => {
  const boostCount = discordClient.premiumSubscriptionCount || 0

  let maxFileSize: 8000000 | 50000000 | 100000000 = 8000000
  if (boostCount >= 7 && boostCount < 14) {
    maxFileSize = 50000000
  } else if (boostCount >= 14) {
    maxFileSize = 100000000
  }

  return maxFileSize
}

import { redis } from "../redis/client"

interface GetSubscriberInvitesClicksParams {
  subscriberId: string
}

export async function getSubscriberInvitesClicks( { subscriberId }: GetSubscriberInvitesClicksParams) {
  const accessCount = await redis.hget('referral:access-count', subscriberId) // redis.hget pega o valor armazenado na hash table de subscriberId
  
  return { count: accessCount ? Number.parseInt(accessCount) : 0 }
}
import { redis } from "../redis/client"

interface GetSubscriberInvitesCountParams {
  subscriberId: string
}

export async function getSubscriberInvitesCount( { subscriberId }: GetSubscriberInvitesCountParams) {
  // Z no redis trabalha com Sorted Sets
  const accessCount = await redis.zscore('referral:ranking', subscriberId) 
  
  return { count: accessCount ? Number.parseInt(accessCount) : 0 }
}
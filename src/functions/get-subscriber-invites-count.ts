import { redis } from "../redis/client"

interface GetSubscriberInvitesCountParams {
  subscriberId: string
}

export async function getSubscriberInvitesCount( { subscriberId }: GetSubscriberInvitesCountParams) {
  const accessCount = await redis.zscore('referral:ranking', subscriberId) // diferente do ZINCRBY, que altera o score, o ZSCORE apenas consulta o valor atual
  
  return { count: accessCount ? Number.parseInt(accessCount) : 0 }
}
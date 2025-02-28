import { redis } from '../redis/client'

interface AccessInveteLinkParams {
  subscriberId: string
}

export async function accessInveteLink({ subscriberId }: AccessInveteLinkParams) {
  await redis.hincrby('referral:access-count', subscriberId, 1) // redis.hincby, incrementa 1 na tabela hash referente ao subscriberId
}

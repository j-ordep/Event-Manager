import { redis } from '../redis/client'

interface AcessInveteLinkParams {
  subscriberId: string
}

export async function acessInveteLink({ subscriberId }: AcessInveteLinkParams) {
  // hincrby trabalha com hash
  await redis.hincrby('referral:acess-count', subscriberId, 1) // contador para cada chamada no link (do subscriberId), incrementa mais 1 a cada chamada. É um , exemplo aqueles links que a cada convide ele acrescenta 1
}

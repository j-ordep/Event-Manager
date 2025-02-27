import { redis } from '../redis/client'

interface AccessInveteLinkParams {
  subscriberId: string
}

export async function accessInveteLink({ subscriberId }: AccessInveteLinkParams) {
  // hincrby trabalha com hash
  // (permanece - não apagar) redis.hincby, incrementa um valor a tabela hash referente ao subscriberId
  await redis.hincrby('referral:access-count', subscriberId, 1) // contador para cada chamada no link (do subscriberId), incrementa mais 1 a cada chamada. É um , exemplo aqueles links que a cada convide ele acrescenta 1
}

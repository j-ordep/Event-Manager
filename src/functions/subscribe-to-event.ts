import { eq } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'
import { redis } from '../redis/client'

interface SubscribeToEventParams {
  name: string
  email: string
  referrerId: string | null
}

export async function subscribeToEvent({ name, email, referrerId }: SubscribeToEventParams) {

  // verifica se o email do banco é igual o email do usuario
  const subscribers = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.email, email))

  if (subscribers.length > 0) {
    return { subscriberId: subscribers[0].id }
  }

  // inserir o usuario no banco de dados
  const result = await db
    .insert(subscriptions)
    .values({
      name,
      email,
    })
    .returning()

    // incrementa o contador de convites aceitos para o referrerId no ranking.
    if(referrerId) {
      await redis.zincrby('referral:ranking', 1, referrerId) 
    }

  const subscriber = result[0]

  return {
    subscriberId: subscriber.id,
  }
}

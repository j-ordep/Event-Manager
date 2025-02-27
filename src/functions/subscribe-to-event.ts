// criar usuario no banco

import { eq } from 'drizzle-orm'
import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'
import { redis } from '../redis/client'

interface SubscribeToEvenParams {
  name: string
  email: string
  referrerId?: string | null
}

// parametro desestruturados {em um objeto}, do tipo SubscribeToEvenParams ( interface )
export async function subscribeToEven({ name, email, referrerId }: SubscribeToEvenParams) {

  // consulta para verificar se o email já foi registrado
  const subscribers = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.email, email)) // verifica se o email do banco é igual o email do usuario

  if (subscribers.length > 0) { // se der true significa que o e-mail já está cadastrado.
    return { subscriberId: subscribers[0].id }
  }

  // inserir o usuario no banco de dados
  const result = await db
    .insert(subscriptions)
    .values({
      name,
      email,
    })
    .returning() // retorna um array de objetos, onde cada objeto é uma linha inserida, incluindo o id

    if(referrerId) {
      // Sorted Set
      await redis.zincrby('referral:ranking', 1, referrerId) // ranking de usuarios com mais convites aceitos
    }


  const subscriber = result[0] // pega o objeto que está na posição 0 no array

  return {
    // retorna como objeto, pois é mais fácil de adicionar mais propriedades futuramente no retorno
    // pega o id dentro do objeto subscriber (subscriber.id) e armazena em subscriberId
    subscriberId: subscriber.id,
  }
}

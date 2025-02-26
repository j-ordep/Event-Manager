// criar usuario no banco

import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'

interface SubscribeToEvenParams {
  name: string
  email: string
}

// parametro desestruturados {em um objeto}, do tipo SubscribeToEvenParams ( interface )
export async function subscribeToEven({ name, email }: SubscribeToEvenParams) {
  const result = await db
    .insert(subscriptions)
    .values({
      name,
      email,
    })
    .returning() // retorna um array de objetos, onde cada objeto é uma linha inserida, incluindo o id

  const subscriber = result[0] // pega o objeto que está na posição 0 no array

  return {
    // retorna como objeto, pois é mais fácil de adicionar mais propriedades futuramente no retorno
    // pega o id dentro do objeto subscriber (subscriber.id) e armazena em subscriberId
    subscriberId: subscriber.id,
  }
}

import { inArray } from "drizzle-orm";
import { db } from "../drizzle/client";
import { subscriptions } from "../drizzle/schema/subscriptions";
import { redis } from "../redis/client";

export async function getRanking() {
  try{
    const ranking = await redis.zrevrange('referral:ranking', 0, 2, 'WITHSCORES') // redis.zrevrange pega os 3 primeiros colocados, WITHSCORES retorna tanto o usuário quanto o score.
    const subscriberIdAndScore: Record<string, number> = {}

    for (let i = 0; i < ranking.length; i += 2) { // A cada iteração, ranking[i] é o ID do usuário e ranking[i + 1] é o score dele.
      subscriberIdAndScore[ranking[i]] = Number.parseInt(ranking[i + 1])
    }

    const subscribers = await db
      .select()
      .from(subscriptions)
      .where(inArray(subscriptions.id, Object.keys(subscriberIdAndScore)))

    const rankingWithScore = subscribers
    .map( subscriber => {
      return {
        id: subscriber.id,
        name: subscriber.name,
        score: subscriberIdAndScore[subscriber.id]
      }
    })
    .sort((sub1, sub2) => { // ordena de forma decrescente 
      return sub2.score - sub1.score
    })

    return { rankingWithScore }
  } catch (error) {
    console.error('Erro ao obter o ranking',error)
    throw new Error('Erro ao obter o ranking')
  }
}
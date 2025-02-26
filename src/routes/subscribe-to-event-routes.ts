import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { subscribeToEven } from '../functions/subscribe-to-event'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Subscribes someone to the event',
        tags: ['Subscription'],
        description: 'description...',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string(),
            name: z.string(),
            email: z.string()
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body // desestruturação o body, pegando name e email do request.body 

      // retornar um objeto que contém, pelo menos, o subscriberId
      const { subscriberId } = await subscribeToEven({ // recebe o name e email do request.body 
        name,
        email,
      })


      return reply.status(201).send({
        subscriberId,
        name,
        email,
      })
    }
  )
}
 
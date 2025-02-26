import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { env } from '../env'
import { acessInveteLink } from '../functions/acess-invite-link'

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        summary: 'Access invate link and redirect user',
        tags: ['refarral'],
        description: 'description...',
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params // pega o subscriberId da URL

      await acessInveteLink({ subscriberId })

      const redirectUrl = new URL(env.WEB_URL) // pega a URL base ( https://exemplo.com )

      redirectUrl.searchParams.set('referrer', subscriberId) // adiciona o subscriberId como parâmetro na URL ( https://exemplo.com?referrer=1234 )

      // 301: redirect permanente
      // 302: redirect temporário

      return reply.redirect(redirectUrl.toString(), 302) // redireciona o user para a nova url
    }
  )
}

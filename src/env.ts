import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333), // converte process.env.PORT (String) para number. "Se PORT for uma string contendo um número, converta para number automaticamente."
  POSTGRES_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  WEB_URL: z.string().url(),
})

// valida os valores de "envSchema" e converte se necessário
export const env = envSchema.parse(process.env) // process.env -> armazena as variáveis de ambiente do sistema ( .env ) que esta na raiz do projeto

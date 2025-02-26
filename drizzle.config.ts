import type { Config } from 'drizzle-kit'
import { env } from './src/env'

export default {
  schema: './src/drizzle/schema/*', // caminho para a pasta das tabelas
  out: './src/drizzle/migrations', // arquivos sql que serão gerados
  dialect: 'postgresql',
  dbCredentials: {
    url: env.POSTGRES_URL, // conexão com o banco
  },
} satisfies Config

import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

// definição/mapeamento da estrutura da tabela 'subscriptions' usando Drizzle ORM"

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(), // data da criação
})
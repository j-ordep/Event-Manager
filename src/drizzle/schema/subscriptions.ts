import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

// tabela e atributos (ORM) 
// aqui é só a definição, não é a criação da tabela, um mapeamento

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(), // data da criação
})
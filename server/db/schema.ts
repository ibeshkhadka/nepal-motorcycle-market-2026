import { sqliteTable, text, primaryKey } from 'drizzle-orm/sqlite-core';
export const favorites = sqliteTable('favorites', {
  userId: text('user_id').notNull(),
  modelKey: text('model_key').notNull(),
}, table => [primaryKey({columns:[table.userId, table.modelKey]})]);

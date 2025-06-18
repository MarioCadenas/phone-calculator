
import { serial, text, pgTable, timestamp, numeric } from 'drizzle-orm/pg-core';

// Calculator history table to optionally store calculation history
export const calculatorHistoryTable = pgTable('calculator_history', {
  id: serial('id').primaryKey(),
  operand1: numeric('operand1', { precision: 15, scale: 8 }).notNull(),
  operand2: numeric('operand2', { precision: 15, scale: 8 }).notNull(),
  operator: text('operator').notNull(),
  result: numeric('result', { precision: 15, scale: 8 }).notNull(),
  operation_string: text('operation_string').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// TypeScript types for the table schema
export type CalculatorHistory = typeof calculatorHistoryTable.$inferSelect;
export type NewCalculatorHistory = typeof calculatorHistoryTable.$inferInsert;

// Export all tables for proper query building
export const tables = { calculatorHistory: calculatorHistoryTable };


import { z } from 'zod';

// Calculator operation schema
export const calculatorOperationSchema = z.object({
  operand1: z.number(),
  operand2: z.number(),
  operator: z.enum(['add', 'subtract', 'multiply', 'divide'])
});

export type CalculatorOperation = z.infer<typeof calculatorOperationSchema>;

// Calculator result schema
export const calculatorResultSchema = z.object({
  result: z.number(),
  operation: z.string(),
  timestamp: z.date()
});

export type CalculatorResult = z.infer<typeof calculatorResultSchema>;

// Input schema for calculator operations
export const calculatorInputSchema = z.object({
  operand1: z.number(),
  operand2: z.number(),
  operator: z.enum(['add', 'subtract', 'multiply', 'divide'])
});

export type CalculatorInput = z.infer<typeof calculatorInputSchema>;

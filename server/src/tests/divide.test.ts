
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { type CalculatorInput } from '../schema';
import { divide } from '../handlers/divide';

describe('divide', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should divide two positive numbers', async () => {
    const input: CalculatorInput = {
      operand1: 10,
      operand2: 2,
      operator: 'divide'
    };

    const result = await divide(input);

    expect(result.result).toEqual(5);
    expect(result.operation).toEqual('10 ÷ 2 = 5');
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should divide decimal numbers correctly', async () => {
    const input: CalculatorInput = {
      operand1: 7.5,
      operand2: 2.5,
      operator: 'divide'
    };

    const result = await divide(input);

    expect(result.result).toEqual(3);
    expect(result.operation).toEqual('7.5 ÷ 2.5 = 3');
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should handle negative numbers', async () => {
    const input: CalculatorInput = {
      operand1: -10,
      operand2: 2,
      operator: 'divide'
    };

    const result = await divide(input);

    expect(result.result).toEqual(-5);
    expect(result.operation).toEqual('-10 ÷ 2 = -5');
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should handle division of negative by negative', async () => {
    const input: CalculatorInput = {
      operand1: -15,
      operand2: -3,
      operator: 'divide'
    };

    const result = await divide(input);

    expect(result.result).toEqual(5);
    expect(result.operation).toEqual('-15 ÷ -3 = 5');
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should handle division resulting in fractional numbers', async () => {
    const input: CalculatorInput = {
      operand1: 5,
      operand2: 2,
      operator: 'divide'
    };

    const result = await divide(input);

    expect(result.result).toEqual(2.5);
    expect(result.operation).toEqual('5 ÷ 2 = 2.5');
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should throw error for division by zero', async () => {
    const input: CalculatorInput = {
      operand1: 10,
      operand2: 0,
      operator: 'divide'
    };

    await expect(divide(input)).rejects.toThrow(/division by zero is not allowed/i);
  });

  it('should throw error for invalid operator', async () => {
    const input: CalculatorInput = {
      operand1: 10,
      operand2: 2,
      operator: 'add'
    };

    await expect(divide(input)).rejects.toThrow(/invalid operator for division/i);
  });

  it('should handle very small numbers', async () => {
    const input: CalculatorInput = {
      operand1: 0.001,
      operand2: 0.1,
      operator: 'divide'
    };

    const result = await divide(input);

    expect(result.result).toBeCloseTo(0.01, 10);
    expect(result.operation).toMatch(/^0\.001 ÷ 0\.1 = 0\.01/);
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should handle large numbers', async () => {
    const input: CalculatorInput = {
      operand1: 1000000,
      operand2: 1000,
      operator: 'divide'
    };

    const result = await divide(input);

    expect(result.result).toEqual(1000);
    expect(result.operation).toEqual('1000000 ÷ 1000 = 1000');
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should return fresh timestamp for each operation', async () => {
    const input: CalculatorInput = {
      operand1: 4,
      operand2: 2,
      operator: 'divide'
    };

    const result1 = await divide(input);
    
    // Small delay to ensure different timestamps
    await new Promise(resolve => setTimeout(resolve, 1));
    
    const result2 = await divide(input);

    expect(result1.timestamp).not.toEqual(result2.timestamp);
    expect(result2.timestamp.getTime()).toBeGreaterThan(result1.timestamp.getTime());
  });
});

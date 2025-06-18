
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { type CalculatorInput } from '../schema';
import { subtract } from '../handlers/subtract';

describe('subtract', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should subtract two positive numbers', async () => {
    const input: CalculatorInput = {
      operand1: 10,
      operand2: 3,
      operator: 'subtract'
    };

    const result = await subtract(input);

    expect(result.result).toEqual(7);
    expect(result.operation).toEqual('10 - 3 = 7');
    expect(result.timestamp).toBeInstanceOf(Date);
    expect(typeof result.result).toBe('number');
  });

  it('should subtract negative numbers', async () => {
    const input: CalculatorInput = {
      operand1: -5,
      operand2: -3,
      operator: 'subtract'
    };

    const result = await subtract(input);

    expect(result.result).toEqual(-2);
    expect(result.operation).toEqual('-5 - -3 = -2');
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should handle subtraction resulting in negative number', async () => {
    const input: CalculatorInput = {
      operand1: 3,
      operand2: 10,
      operator: 'subtract'
    };

    const result = await subtract(input);

    expect(result.result).toEqual(-7);
    expect(result.operation).toEqual('3 - 10 = -7');
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should handle decimal numbers', async () => {
    const input: CalculatorInput = {
      operand1: 5.5,
      operand2: 2.3,
      operator: 'subtract'
    };

    const result = await subtract(input);

    expect(result.result).toBeCloseTo(3.2, 10);
    expect(result.operation).toEqual('5.5 - 2.3 = 3.2');
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should handle zero operands', async () => {
    const input: CalculatorInput = {
      operand1: 0,
      operand2: 5,
      operator: 'subtract'
    };

    const result = await subtract(input);

    expect(result.result).toEqual(-5);
    expect(result.operation).toEqual('0 - 5 = -5');
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should handle subtracting zero', async () => {
    const input: CalculatorInput = {
      operand1: 7,
      operand2: 0,
      operator: 'subtract'
    };

    const result = await subtract(input);

    expect(result.result).toEqual(7);
    expect(result.operation).toEqual('7 - 0 = 7');
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should handle very large numbers', async () => {
    const input: CalculatorInput = {
      operand1: 1000000,
      operand2: 999999,
      operator: 'subtract'
    };

    const result = await subtract(input);

    expect(result.result).toEqual(1);
    expect(result.operation).toEqual('1000000 - 999999 = 1');
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should throw error for invalid operator', async () => {
    const input: CalculatorInput = {
      operand1: 5,
      operand2: 3,
      operator: 'add' as any
    };

    await expect(subtract(input)).rejects.toThrow(/invalid operator/i);
  });

  it('should handle scientific notation numbers', async () => {
    const input: CalculatorInput = {
      operand1: 1e6,
      operand2: 1e5,
      operator: 'subtract'
    };

    const result = await subtract(input);

    expect(result.result).toEqual(900000);
    expect(result.operation).toEqual('1000000 - 100000 = 900000');
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should handle precision with very small decimal differences', async () => {
    const input: CalculatorInput = {
      operand1: 0.1,
      operand2: 0.01,
      operator: 'subtract'
    };

    const result = await subtract(input);

    expect(result.result).toBeCloseTo(0.09, 10);
    // Test the operation string contains the expected components due to floating point precision
    expect(result.operation).toContain('0.1 - 0.01 = ');
    expect(result.operation).toMatch(/^0\.1 - 0\.01 = 0\.09/);
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should create timestamp close to current time', async () => {
    const beforeTime = new Date();
    
    const input: CalculatorInput = {
      operand1: 5,
      operand2: 3,
      operator: 'subtract'
    };

    const result = await subtract(input);
    const afterTime = new Date();

    expect(result.timestamp.getTime()).toBeGreaterThanOrEqual(beforeTime.getTime());
    expect(result.timestamp.getTime()).toBeLessThanOrEqual(afterTime.getTime());
  });
});


import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { type CalculatorInput } from '../schema';
import { multiply } from '../handlers/multiply';

describe('multiply', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should multiply two positive numbers', async () => {
    const input: CalculatorInput = {
      operand1: 6,
      operand2: 7,
      operator: 'multiply'
    };

    const result = await multiply(input);

    expect(result.result).toEqual(42);
    expect(result.operation).toEqual('6 × 7 = 42');
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should multiply two negative numbers', async () => {
    const input: CalculatorInput = {
      operand1: -3,
      operand2: -4,
      operator: 'multiply'
    };

    const result = await multiply(input);

    expect(result.result).toEqual(12);
    expect(result.operation).toEqual('-3 × -4 = 12');
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should multiply positive and negative numbers', async () => {
    const input: CalculatorInput = {
      operand1: 5,
      operand2: -3,
      operator: 'multiply'
    };

    const result = await multiply(input);

    expect(result.result).toEqual(-15);
    expect(result.operation).toEqual('5 × -3 = -15');
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should multiply by zero', async () => {
    const input: CalculatorInput = {
      operand1: 42,
      operand2: 0,
      operator: 'multiply'
    };

    const result = await multiply(input);

    expect(result.result).toEqual(0);
    expect(result.operation).toEqual('42 × 0 = 0');
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should multiply decimal numbers', async () => {
    const input: CalculatorInput = {
      operand1: 2.5,
      operand2: 4.2,
      operator: 'multiply'
    };

    const result = await multiply(input);

    expect(result.result).toEqual(10.5);
    expect(result.operation).toEqual('2.5 × 4.2 = 10.5');
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should throw error for invalid operator', async () => {
    const input: CalculatorInput = {
      operand1: 5,
      operand2: 3,
      operator: 'add'
    };

    await expect(multiply(input)).rejects.toThrow(/invalid operator/i);
  });
});

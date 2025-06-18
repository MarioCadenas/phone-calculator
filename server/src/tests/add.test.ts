
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { type CalculatorInput } from '../schema';
import { add } from '../handlers/add';

describe('add', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should add two positive numbers', async () => {
    const input: CalculatorInput = {
      operand1: 5,
      operand2: 3,
      operator: 'add'
    };

    const result = await add(input);

    expect(result.result).toEqual(8);
    expect(result.operation).toEqual('5 + 3 = 8');
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should add two negative numbers', async () => {
    const input: CalculatorInput = {
      operand1: -5,
      operand2: -3,
      operator: 'add'
    };

    const result = await add(input);

    expect(result.result).toEqual(-8);
    expect(result.operation).toEqual('-5 + -3 = -8');
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should add positive and negative numbers', async () => {
    const input: CalculatorInput = {
      operand1: 10,
      operand2: -4,
      operator: 'add'
    };

    const result = await add(input);

    expect(result.result).toEqual(6);
    expect(result.operation).toEqual('10 + -4 = 6');
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should add decimal numbers', async () => {
    const input: CalculatorInput = {
      operand1: 2.5,
      operand2: 3.7,
      operator: 'add'
    };

    const result = await add(input);

    expect(result.result).toBeCloseTo(6.2, 10);
    expect(result.operation).toEqual('2.5 + 3.7 = 6.2');
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should add zero to a number', async () => {
    const input: CalculatorInput = {
      operand1: 42,
      operand2: 0,
      operator: 'add'
    };

    const result = await add(input);

    expect(result.result).toEqual(42);
    expect(result.operation).toEqual('42 + 0 = 42');
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should add large numbers', async () => {
    const input: CalculatorInput = {
      operand1: 999999999,
      operand2: 1,
      operator: 'add'
    };

    const result = await add(input);

    expect(result.result).toEqual(1000000000);
    expect(result.operation).toEqual('999999999 + 1 = 1000000000');
    expect(result.timestamp).toBeInstanceOf(Date);
  });

  it('should throw error for invalid operator', async () => {
    const input: CalculatorInput = {
      operand1: 5,
      operand2: 3,
      operator: 'subtract'
    };

    await expect(add(input)).rejects.toThrow(/invalid operator for addition/i);
  });

  it('should create timestamp close to current time', async () => {
    const before = new Date();
    
    const input: CalculatorInput = {
      operand1: 1,
      operand2: 1,
      operator: 'add'
    };

    const result = await add(input);
    const after = new Date();

    expect(result.timestamp.getTime()).toBeGreaterThanOrEqual(before.getTime());
    expect(result.timestamp.getTime()).toBeLessThanOrEqual(after.getTime());
  });
});

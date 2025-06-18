
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { type CalculatorInput } from '../schema';
import { calculate, add, subtract, multiply, divide } from '../handlers/calculate';

describe('calculate', () => {
    beforeEach(createDB);
    afterEach(resetDB);

    describe('addition', () => {
        it('should add two positive numbers', async () => {
            const input: CalculatorInput = {
                operand1: 5,
                operand2: 3,
                operator: 'add'
            };

            const result = await calculate(input);

            expect(result.result).toEqual(8);
            expect(result.operation).toEqual('5 add 3');
            expect(result.timestamp).toBeInstanceOf(Date);
        });

        it('should add negative numbers', async () => {
            const input: CalculatorInput = {
                operand1: -5,
                operand2: -3,
                operator: 'add'
            };

            const result = await calculate(input);

            expect(result.result).toEqual(-8);
            expect(result.operation).toEqual('-5 add -3');
        });

        it('should add decimals', async () => {
            const input: CalculatorInput = {
                operand1: 1.5,
                operand2: 2.7,
                operator: 'add'
            };

            const result = await calculate(input);

            expect(result.result).toBeCloseTo(4.2);
            expect(result.operation).toEqual('1.5 add 2.7');
        });
    });

    describe('subtraction', () => {
        it('should subtract two positive numbers', async () => {
            const input: CalculatorInput = {
                operand1: 10,
                operand2: 3,
                operator: 'subtract'
            };

            const result = await calculate(input);

            expect(result.result).toEqual(7);
            expect(result.operation).toEqual('10 subtract 3');
            expect(result.timestamp).toBeInstanceOf(Date);
        });

        it('should handle negative results', async () => {
            const input: CalculatorInput = {
                operand1: 3,
                operand2: 10,
                operator: 'subtract'
            };

            const result = await calculate(input);

            expect(result.result).toEqual(-7);
            expect(result.operation).toEqual('3 subtract 10');
        });
    });

    describe('multiplication', () => {
        it('should multiply two positive numbers', async () => {
            const input: CalculatorInput = {
                operand1: 4,
                operand2: 5,
                operator: 'multiply'
            };

            const result = await calculate(input);

            expect(result.result).toEqual(20);
            expect(result.operation).toEqual('4 multiply 5');
            expect(result.timestamp).toBeInstanceOf(Date);
        });

        it('should multiply by zero', async () => {
            const input: CalculatorInput = {
                operand1: 10,
                operand2: 0,
                operator: 'multiply'
            };

            const result = await calculate(input);

            expect(result.result).toEqual(0);
            expect(result.operation).toEqual('10 multiply 0');
        });

        it('should multiply negative numbers', async () => {
            const input: CalculatorInput = {
                operand1: -3,
                operand2: 4,
                operator: 'multiply'
            };

            const result = await calculate(input);

            expect(result.result).toEqual(-12);
            expect(result.operation).toEqual('-3 multiply 4');
        });
    });

    describe('division', () => {
        it('should divide two positive numbers', async () => {
            const input: CalculatorInput = {
                operand1: 15,
                operand2: 3,
                operator: 'divide'
            };

            const result = await calculate(input);

            expect(result.result).toEqual(5);
            expect(result.operation).toEqual('15 divide 3');
            expect(result.timestamp).toBeInstanceOf(Date);
        });

        it('should handle decimal results', async () => {
            const input: CalculatorInput = {
                operand1: 10,
                operand2: 3,
                operator: 'divide'
            };

            const result = await calculate(input);

            expect(result.result).toBeCloseTo(3.333333);
            expect(result.operation).toEqual('10 divide 3');
        });

        it('should throw error for division by zero', async () => {
            const input: CalculatorInput = {
                operand1: 10,
                operand2: 0,
                operator: 'divide'
            };

            await expect(calculate(input)).rejects.toThrow(/division by zero/i);
        });
    });

    describe('error handling', () => {
        it('should throw error for unsupported operator', async () => {
            const input = {
                operand1: 5,
                operand2: 3,
                operator: 'power' as any
            };

            await expect(calculate(input)).rejects.toThrow(/unsupported operation/i);
        });
    });
});

describe('individual operation handlers', () => {
    beforeEach(createDB);
    afterEach(resetDB);

    describe('add', () => {
        it('should add two numbers correctly', async () => {
            const input: CalculatorInput = {
                operand1: 7,
                operand2: 3,
                operator: 'add'
            };

            const result = await add(input);

            expect(result.result).toEqual(10);
            expect(result.operation).toEqual('7 + 3');
            expect(result.timestamp).toBeInstanceOf(Date);
        });
    });

    describe('subtract', () => {
        it('should subtract two numbers correctly', async () => {
            const input: CalculatorInput = {
                operand1: 10,
                operand2: 4,
                operator: 'subtract'
            };

            const result = await subtract(input);

            expect(result.result).toEqual(6);
            expect(result.operation).toEqual('10 - 4');
            expect(result.timestamp).toBeInstanceOf(Date);
        });
    });

    describe('multiply', () => {
        it('should multiply two numbers correctly', async () => {
            const input: CalculatorInput = {
                operand1: 6,
                operand2: 7,
                operator: 'multiply'
            };

            const result = await multiply(input);

            expect(result.result).toEqual(42);
            expect(result.operation).toEqual('6 * 7');
            expect(result.timestamp).toBeInstanceOf(Date);
        });
    });

    describe('divide', () => {
        it('should divide two numbers correctly', async () => {
            const input: CalculatorInput = {
                operand1: 20,
                operand2: 4,
                operator: 'divide'
            };

            const result = await divide(input);

            expect(result.result).toEqual(5);
            expect(result.operation).toEqual('20 / 4');
            expect(result.timestamp).toBeInstanceOf(Date);
        });

        it('should throw error for division by zero', async () => {
            const input: CalculatorInput = {
                operand1: 10,
                operand2: 0,
                operator: 'divide'
            };

            await expect(divide(input)).rejects.toThrow(/division by zero/i);
        });
    });
});


import { type CalculatorInput, type CalculatorResult } from '../schema';

export async function calculate(input: CalculatorInput): Promise<CalculatorResult> {
    const { operand1, operand2, operator } = input;
    let result: number;
    
    switch (operator) {
        case 'add':
            result = operand1 + operand2;
            break;
        case 'subtract':
            result = operand1 - operand2;
            break;
        case 'multiply':
            result = operand1 * operand2;
            break;
        case 'divide':
            if (operand2 === 0) {
                throw new Error('Division by zero is not allowed');
            }
            result = operand1 / operand2;
            break;
        default:
            throw new Error(`Unsupported operation: ${operator}`);
    }
    
    return {
        result,
        operation: `${operand1} ${operator} ${operand2}`,
        timestamp: new Date()
    };
}

export async function add(input: CalculatorInput): Promise<CalculatorResult> {
    const result = input.operand1 + input.operand2;
    return {
        result,
        operation: `${input.operand1} + ${input.operand2}`,
        timestamp: new Date()
    };
}

export async function subtract(input: CalculatorInput): Promise<CalculatorResult> {
    const result = input.operand1 - input.operand2;
    return {
        result,
        operation: `${input.operand1} - ${input.operand2}`,
        timestamp: new Date()
    };
}

export async function multiply(input: CalculatorInput): Promise<CalculatorResult> {
    const result = input.operand1 * input.operand2;
    return {
        result,
        operation: `${input.operand1} * ${input.operand2}`,
        timestamp: new Date()
    };
}

export async function divide(input: CalculatorInput): Promise<CalculatorResult> {
    if (input.operand2 === 0) {
        throw new Error('Division by zero is not allowed');
    }
    const result = input.operand1 / input.operand2;
    return {
        result,
        operation: `${input.operand1} / ${input.operand2}`,
        timestamp: new Date()
    };
}


import { type CalculatorInput, type CalculatorResult } from '../schema';

export async function subtract(input: CalculatorInput): Promise<CalculatorResult> {
    // This handler performs subtraction operation
    // Takes two operands and returns their difference
    if (input.operator !== 'subtract') {
        throw new Error('Invalid operator for subtraction');
    }
    
    const result = input.operand1 - input.operand2;
    
    return {
        result,
        operation: `${input.operand1} - ${input.operand2} = ${result}`,
        timestamp: new Date()
    };
}

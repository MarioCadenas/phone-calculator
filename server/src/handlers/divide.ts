
import { type CalculatorInput, type CalculatorResult } from '../schema';

export async function divide(input: CalculatorInput): Promise<CalculatorResult> {
    // This handler performs division operation
    // Takes two operands and returns their quotient
    // Handles division by zero error
    if (input.operator !== 'divide') {
        throw new Error('Invalid operator for division');
    }
    
    if (input.operand2 === 0) {
        throw new Error('Division by zero is not allowed');
    }
    
    const result = input.operand1 / input.operand2;
    
    return {
        result,
        operation: `${input.operand1} ÷ ${input.operand2} = ${result}`,
        timestamp: new Date()
    };
}

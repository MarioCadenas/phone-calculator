
import { type CalculatorInput, type CalculatorResult } from '../schema';

export async function multiply(input: CalculatorInput): Promise<CalculatorResult> {
    // This handler performs multiplication operation
    // Takes two operands and returns their product
    if (input.operator !== 'multiply') {
        throw new Error('Invalid operator for multiplication');
    }
    
    const result = input.operand1 * input.operand2;
    
    return {
        result,
        operation: `${input.operand1} × ${input.operand2} = ${result}`,
        timestamp: new Date()
    };
}

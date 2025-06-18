
import { type CalculatorInput, type CalculatorResult } from '../schema';

export async function add(input: CalculatorInput): Promise<CalculatorResult> {
    // This handler performs addition operation
    // Takes two operands and returns their sum
    if (input.operator !== 'add') {
        throw new Error('Invalid operator for addition');
    }
    
    const result = input.operand1 + input.operand2;
    
    return {
        result,
        operation: `${input.operand1} + ${input.operand2} = ${result}`,
        timestamp: new Date()
    };
}

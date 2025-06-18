
import { type CalculatorInput, type CalculatorResult } from '../schema';
import { add } from './add';
import { subtract } from './subtract';
import { multiply } from './multiply';
import { divide } from './divide';

export async function calculate(input: CalculatorInput): Promise<CalculatorResult> {
    // This is the main calculator handler that routes operations to specific handlers
    // Supports addition, subtraction, multiplication, and division
    
    switch (input.operator) {
        case 'add':
            return await add(input);
        case 'subtract':
            return await subtract(input);
        case 'multiply':
            return await multiply(input);
        case 'divide':
            return await divide(input);
        default:
            throw new Error(`Unsupported operation: ${input.operator}`);
    }
}

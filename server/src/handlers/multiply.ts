
import { type CalculatorInput, type CalculatorResult } from '../schema';

export const multiply = async (input: CalculatorInput): Promise<CalculatorResult> => {
  if (input.operator !== 'multiply') {
    throw new Error('Invalid operator for multiplication');
  }
  
  const result = input.operand1 * input.operand2;
  
  return {
    result,
    operation: `${input.operand1} × ${input.operand2} = ${result}`,
    timestamp: new Date()
  };
};

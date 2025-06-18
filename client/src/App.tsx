
import { Button } from '@/components/ui/button';
import { trpc } from '@/utils/trpc';
import { useState } from 'react';
import type { CalculatorResult } from '../../server/src/schema';

function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide' | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = async (nextOperation?: 'add' | 'subtract' | 'multiply' | 'divide') => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      setIsLoading(true);
      try {
        const result: CalculatorResult = await trpc.calculate.mutate({
          operand1: previousValue,
          operand2: inputValue,
          operator: operation
        });
        
        setDisplay(String(result.result));
        setPreviousValue(result.result);
      } catch (error) {
        console.error('Calculation error:', error);
        setDisplay('Error');
        setPreviousValue(null);
      } finally {
        setIsLoading(false);
      }
    }

    setWaitingForOperand(true);
    setOperation(nextOperation || null);
  };

  const calculate = () => {
    performOperation();
  };

  const handleOperator = (nextOperation: 'add' | 'subtract' | 'multiply' | 'divide') => {
    performOperation(nextOperation);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-black p-6 rounded-2xl shadow-2xl w-80">
        {/* Display */}
        <div className="mb-6">
          <div className="bg-gray-900 rounded-lg p-4 text-right">
            <div className="text-white text-4xl font-light overflow-hidden">
              {isLoading ? '...' : display}
            </div>
          </div>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <Button
            onClick={clear}
            className="bg-gray-600 hover:bg-gray-500 text-white text-xl font-medium h-16 rounded-full"
          >
            AC
          </Button>
          <Button
            onClick={() => setDisplay(display.slice(0, -1) || '0')}
            className="bg-gray-600 hover:bg-gray-500 text-white text-xl font-medium h-16 rounded-full"
          >
            ⌫
          </Button>
          <Button
            onClick={() => handleOperator('divide')}
            className="bg-orange-500 hover:bg-orange-400 text-white text-2xl font-medium h-16 rounded-full"
            disabled={isLoading}
          >
            ÷
          </Button>
          <Button
            onClick={() => handleOperator('multiply')}
            className="bg-orange-500 hover:bg-orange-400 text-white text-2xl font-medium h-16 rounded-full"
            disabled={isLoading}
          >
            ×
          </Button>

          {/* Row 2 */}
          <Button
            onClick={() => inputNumber('7')}
            className="bg-gray-700 hover:bg-gray-600 text-white text-2xl font-medium h-16 rounded-full"
            disabled={isLoading}
          >
            7
          </Button>
          <Button
            onClick={() => inputNumber('8')}
            className="bg-gray-700 hover:bg-gray-600 text-white text-2xl font-medium h-16 rounded-full"
            disabled={isLoading}
          >
            8
          </Button>
          <Button
            onClick={() => inputNumber('9')}
            className="bg-gray-700 hover:bg-gray-600 text-white text-2xl font-medium h-16 rounded-full"
            disabled={isLoading}
          >
            9
          </Button>
          <Button
            onClick={() => handleOperator('subtract')}
            className="bg-orange-500 hover:bg-orange-400 text-white text-2xl font-medium h-16 rounded-full"
            disabled={isLoading}
          >
            -
          </Button>

          {/* Row 3 */}
          <Button
            onClick={() => inputNumber('4')}
            className="bg-gray-700 hover:bg-gray-600 text-white text-2xl font-medium h-16 rounded-full"
            disabled={isLoading}
          >
            4
          </Button>
          <Button
            onClick={() => inputNumber('5')}
            className="bg-gray-700 hover:bg-gray-600 text-white text-2xl font-medium h-16 rounded-full"
            disabled={isLoading}
          >
            5
          </Button>
          <Button
            onClick={() => inputNumber('6')}
            className="bg-gray-700 hover:bg-gray-600 text-white text-2xl font-medium h-16 rounded-full"
            disabled={isLoading}
          >
            6
          </Button>
          <Button
            onClick={() => handleOperator('add')}
            className="bg-orange-500 hover:bg-orange-400 text-white text-2xl font-medium h-16 rounded-full"
            disabled={isLoading}
          >
            +
          </Button>

          {/* Row 4 */}
          <Button
            onClick={() => inputNumber('1')}
            className="bg-gray-700 hover:bg-gray-600 text-white text-2xl font-medium h-16 rounded-full"
            disabled={isLoading}
          >
            1
          </Button>
          <Button
            onClick={() => inputNumber('2')}
            className="bg-gray-700 hover:bg-gray-600 text-white text-2xl font-medium h-16 rounded-full"
            disabled={isLoading}
          >
            2
          </Button>
          <Button
            onClick={() => inputNumber('3')}
            className="bg-gray-700 hover:bg-gray-600 text-white text-2xl font-medium h-16 rounded-full"
            disabled={isLoading}
          >
            3
          </Button>
          <Button
            onClick={calculate}
            className="bg-orange-500 hover:bg-orange-400 text-white text-2xl font-medium h-16 rounded-full row-span-2"
            disabled={isLoading}
          >
            =
          </Button>

          {/* Row 5 */}
          <Button
            onClick={() => inputNumber('0')}
            className="bg-gray-700 hover:bg-gray-600 text-white text-2xl font-medium h-16 rounded-full col-span-2"
            disabled={isLoading}
          >
            0
          </Button>
          <Button
            onClick={inputDecimal}
            className="bg-gray-700 hover:bg-gray-600 text-white text-2xl font-medium h-16 rounded-full"
            disabled={isLoading}
          >
            .
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;

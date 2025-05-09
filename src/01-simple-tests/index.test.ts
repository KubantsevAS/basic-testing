// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const getRandomNumber = () => {
  const MAX_VALUE = 9;
  const MIN_VALUE = 1;

  return Math.floor(Math.random() * MAX_VALUE) + MIN_VALUE;
};

describe('simpleCalculator tests', () => {
  const firstNumber = getRandomNumber();
  const secondNumber = getRandomNumber();

  test('should add two numbers', () => {
    const rawInput = {
      a: firstNumber,
      b: secondNumber,
      action: Action.Add,
    };
    const actualResult = firstNumber + secondNumber;
    const result = simpleCalculator(rawInput);

    expect(result).toBe(actualResult);
  });

  test('should subtract two numbers', () => {
    const rawInput = {
      a: firstNumber,
      b: secondNumber,
      action: Action.Subtract,
    };
    const actualResult = firstNumber - secondNumber;
    const result = simpleCalculator(rawInput);

    expect(result).toBe(actualResult);
  });

  test('should multiply two numbers', () => {
    const rawInput = {
      a: firstNumber,
      b: secondNumber,
      action: Action.Multiply,
    };
    const actualResult = firstNumber * secondNumber;
    const result = simpleCalculator(rawInput);

    expect(result).toBe(actualResult);
  });

  test('should divide two numbers', () => {
    const rawInput = {
      a: firstNumber,
      b: secondNumber,
      action: Action.Divide,
    };
    const actualResult = firstNumber / secondNumber;
    const result = simpleCalculator(rawInput);

    expect(result).toBe(actualResult);
  });

  test('should exponentiate two numbers', () => {
    const rawInput = {
      a: firstNumber,
      b: secondNumber,
      action: Action.Exponentiate,
    };
    const actualResult = firstNumber ** secondNumber;
    const result = simpleCalculator(rawInput);

    expect(result).toBe(actualResult);
  });

  test('should return null for invalid action', () => {
    const rawInput = {
      a: firstNumber,
      b: secondNumber,
      action: 'invalid action',
    };
    const result = simpleCalculator(rawInput);

    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const rawInput = {
      a: firstNumber,
      b: 'Invalid value',
      action: Action.Add,
    };
    const result = simpleCalculator(rawInput);

    expect(result).toBe(null);
  });
});

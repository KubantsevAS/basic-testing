// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const TEST_VALUE = 7;
    const result = await resolveValue(TEST_VALUE);

    expect(result).toBe(TEST_VALUE);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const message = 'got error';

    expect(() => throwError(message)).toThrow(/^got error$/);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow(/^Oops!$/);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});

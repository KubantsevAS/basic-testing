import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fsPromises from 'fs/promises';
import fs from 'fs';
import path from 'path';

const TIMER = 1000;

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timer = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, TIMER);

    expect(timer).toHaveBeenCalledWith(callback, TIMER);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();

    expect(callback).not.toHaveBeenCalled();

    doStuffByTimeout(callback, TIMER);

    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, TIMER);

    expect(interval).toHaveBeenCalledWith(callback, TIMER);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, TIMER);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(TIMER);

    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(TIMER * 2);

    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const PATH_FOR_TEST = 'path/to/join';

  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');

    await readFileAsynchronously(PATH_FOR_TEST);
    expect(joinSpy).toHaveBeenCalledWith(__dirname, PATH_FOR_TEST);
  });

  test('should return null if file does not exist', async () => {
    const existsSyncSpy = jest.spyOn(fs, 'existsSync');

    existsSyncSpy.mockImplementationOnce(() => false);

    const result = await readFileAsynchronously(PATH_FOR_TEST);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const FILE_CONTENT = 'Test Content';

    const readFileSpy = jest.spyOn(fsPromises, 'readFile');
    const existsSyncSpy = jest.spyOn(fs, 'existsSync');

    existsSyncSpy.mockImplementationOnce(() => true);
    readFileSpy.mockImplementationOnce(async () => FILE_CONTENT);

    const result = await readFileAsynchronously(PATH_FOR_TEST);

    expect(result).toBe(FILE_CONTENT);
  });
});

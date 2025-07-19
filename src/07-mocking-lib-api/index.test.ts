import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const RELATIVE_PATH = '/posts';
const mockResponse = {
  data: {
    result: [{ title: 'Lorem ipsum' }],
  },
};

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const axiosCreateSpy = jest.spyOn(axios, 'create');
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValue(mockResponse),
    } as unknown as AxiosInstance;

    axiosCreateSpy.mockReturnValue(mockAxiosInstance);

    await throttledGetDataFromApi(RELATIVE_PATH);

    expect(axiosCreateSpy).toHaveBeenCalledWith({ baseURL: BASE_URL });
  });

  test('should perform request to correct provided url', async () => {
    const axiosCreateSpy = jest.spyOn(axios, 'create');
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValue(mockResponse),
    } as unknown as AxiosInstance;

    axiosCreateSpy.mockReturnValue(mockAxiosInstance);

    await throttledGetDataFromApi(RELATIVE_PATH);
    await jest.runAllTimersAsync();

    expect(mockAxiosInstance.get).toHaveBeenCalledWith(RELATIVE_PATH);
  });

  test('should return response data', async () => {
    const axiosCreateSpy = jest.spyOn(axios, 'create');
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValue(mockResponse),
    } as unknown as AxiosInstance;

    axiosCreateSpy.mockReturnValue(mockAxiosInstance);

    const result = await throttledGetDataFromApi(RELATIVE_PATH);
    await jest.runAllTimersAsync();

    expect(result).toBe(mockResponse.data);
  });
});

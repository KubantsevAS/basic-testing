import { getBankAccount } from '.';

describe('BankAccount', () => {
  const SYNCHRONIZATION_ERROR = 'Synchronization failed';
  const INSUFFICIENT_ERROR = 'Insufficient funds';
  const MORE_THAN_BALANCE = 40000;
  const SUM_TO_EXCHANGE = 2000;
  const INIT_BALANCE = 36000;
  const MOCK_BALANCE = 50;
  const ZERO_BALANCE = 0;
  const account = getBankAccount(INIT_BALANCE);
  const targetAccount = getBankAccount(ZERO_BALANCE);

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(INIT_BALANCE);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(MORE_THAN_BALANCE)).toThrow(
      INSUFFICIENT_ERROR,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(MORE_THAN_BALANCE, targetAccount)).toThrow(
      Error,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(INIT_BALANCE, account)).toThrow(Error);
  });

  test('should deposit money', () => {
    expect(account.deposit(SUM_TO_EXCHANGE).getBalance()).toBe(
      INIT_BALANCE + SUM_TO_EXCHANGE,
    );
  });

  test('should withdraw money', () => {
    expect(account.withdraw(SUM_TO_EXCHANGE).getBalance()).toBe(INIT_BALANCE);
  });

  test('should transfer money', () => {
    account.transfer(SUM_TO_EXCHANGE, targetAccount);
    expect(targetAccount.getBalance()).toBe(SUM_TO_EXCHANGE);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(MOCK_BALANCE);
    const fetchResult = await account.fetchBalance();

    expect(typeof fetchResult).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(MOCK_BALANCE);

    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(MOCK_BALANCE);
    expect(account.getBalance()).not.toBe(0);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    expect(async () => await account.synchronizeBalance()).rejects.toThrow(
      SYNCHRONIZATION_ERROR,
    );
  });
});

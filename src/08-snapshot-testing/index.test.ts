import { generateLinkedList } from './index';

const mockTree = {
  value: '1',
  next: {
    value: '2',
    next: {
      value: '3',
      next: {
        value: null,
        next: null,
      },
    },
  },
};

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const tree = generateLinkedList(['1', '2', '3']);

    expect(tree).toStrictEqual(mockTree);
  });

  test('should generate linked list from values 2', () => {
    const tree = generateLinkedList(['2', '3']);

    expect(tree).toMatchSnapshot();
  });
});

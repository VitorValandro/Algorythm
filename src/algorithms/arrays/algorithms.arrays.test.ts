import { QuickSort } from './QuickSort';

const ARRAY = [...Array(20)].map(() => { return Math.floor(Math.random() * 100) });
const sorted_array = [...ARRAY].sort((a, b) => { return a - b });

describe("Testing array's algorithms", () => {
  test('Quick sort', () => {
    expect(QuickSort.sort(ARRAY)).toEqual(sorted_array);
  })
})
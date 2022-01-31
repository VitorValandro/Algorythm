import { QuickSort } from './QuickSort';
import { BucketSort } from './BucketSort';
import { CountingSort } from './CountingSort';
import { HeapSort } from './HeapSort';

const ARRAY = [...Array(20)].map(() => { return Math.floor(Math.random() * 100) });
const sorted_array = [...ARRAY].sort((a, b) => { return a - b });

describe("Testing array's algorithms", () => {
  test('Quick sort', () => {
    expect(QuickSort.sort(ARRAY)).toEqual(sorted_array);
  })

  test('Bucket sort', () => {
    expect(BucketSort.sort(ARRAY)).toEqual(sorted_array);
  })

  test('Counting sort', () => {
    expect(CountingSort.sort(ARRAY)).toEqual(sorted_array);
  })

  test('Heap sort', () => {
    expect(HeapSort.sort(ARRAY)).toEqual(sorted_array);
  })
})
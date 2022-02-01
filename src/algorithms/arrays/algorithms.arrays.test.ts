import { QuickSort } from './QuickSort';
import { BucketSort } from './BucketSort';
import { CountingSort } from './CountingSort';
import { HeapSort } from './HeapSort';

import { BinarySearch } from './BinarySearch';
import { InterpolationSearch } from './InterpolationSearch';

import { FisherYates } from './FisherYates';

const ARRAY = [...Array(20)].map(() => { return Math.floor(Math.random() * 100) });
const randomValue = ARRAY[Math.floor(Math.random() * (ARRAY.length - 1) + 1)];
const randomValueIndex = QuickSort.sort(ARRAY).indexOf(randomValue);
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

  test('Binary Search', () => {
    expect(BinarySearch.search(ARRAY, randomValue)).toEqual(randomValueIndex);
  })

  test('Interpolation Search', () => {
    expect(InterpolationSearch.search(ARRAY, randomValue)).toEqual(randomValueIndex);
  })

  test('Fisher Yates Shuffle', () => {
    const shuffled = FisherYates.shuffle(ARRAY);
    expect(shuffled.length).toEqual(ARRAY.length);
    expect(shuffled).toEqual(expect.arrayContaining(ARRAY));
  })
})
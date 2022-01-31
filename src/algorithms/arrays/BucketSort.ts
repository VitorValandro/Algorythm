/*
* Time complexity:
*   - Best cases: O(n+k)
*   - Average cases: O(n+k)
*   - Worst cases: O(n²)
*/

import { QuickSort } from "./QuickSort";

export class BucketSort {
  static sort(array: number[], bucketSize = 5) {
    if (array.length < 2) {
      return array;
    }
    const buckets = BucketSort.createBuckets(array, bucketSize);
    return BucketSort.sortBuckets(buckets);
  }

  static createBuckets(array: number[], bucketSize: number): number[][] {
    let minValue = array[0];
    let maxValue = array[0];

    for (let i = 1; i < array.length; i++) {
      if (array[i] < minValue) {
        minValue = array[i];
      }
      else if (array[i] > maxValue) {
        maxValue = array[i];
      }
    }

    const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    const buckets: number[][] = [];

    for (let i = 0; i < bucketCount; i++) {
      buckets[i] = [];
    }

    for (let i = 0; i < array.length; i++) {
      const bucketIndex = Math.floor((array[i] - minValue) / bucketSize);
      buckets[bucketIndex].push(array[i]);
    }
    return buckets;
  }

  static sortBuckets(buckets: number[][]) {
    const sortedArray: number[] = [];
    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i] != null) {
        QuickSort.sort(buckets[i]);
        sortedArray.push(...buckets[i]);
      }
    }
    return sortedArray;
  }
}
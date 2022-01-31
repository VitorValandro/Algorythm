/*
* Time complexity:
*   - Best cases: O(n log(n))
*   - Average cases: O(n log(n))
*   - Worst cases: O(n log(n))
*/

import { swap } from '../../utils/utils';

export class HeapSort {
  static sort(array: number[]) {
    let heapSize = array.length;

    // creates a max heap with the original array
    HeapSort.buildMaxHeap(array)
    // now, the first value is the max
    while (heapSize > 1) {
      // swap the first value (the biggest) with the last, so the last element will be the biggest
      swap(array, 0, --heapSize); // reduce by one the heapSize (to ignore the current biggest)
      // sift down the heap to make the root the biggest value again
      HeapSort.heapify(array, 0, heapSize);

      // repeat until all elements are ordered
    }
    return array;
  }

  static buildMaxHeap(array: number[]) {
    // Method to turn the original array into a Heap tree
    for (let i = Math.floor(array.length / 2); i >= 0; i -= 1) {
      HeapSort.heapify(array, i, array.length);
    }
    return array;
  }

  static heapify(array: number[], index: number, heapSize: number) {
    // method identical to Heap's sift down, to reorder the heap tree
    let largest = index;

    const left = (2 * index) + 1;
    const right = (2 * index) + 2;

    if (left < heapSize && array[left] > array[index]) {
      largest = left;
    }

    if (right < heapSize && array[right] > array[largest]) {
      largest = right;
    }

    if (largest !== index) {
      swap(array, index, largest);
      HeapSort.heapify(array, largest, heapSize);
    }
  }
}
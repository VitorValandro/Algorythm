/*
* Just like merge sort, the quick sort algorithm uses the divide and rule strategy to sort an array.
* In this algorithm, we start with a pivot in the middle index of array, an then we put one pointer
* in the left [0] and other in the right [array.length -1]. Then, we move the left pointer until find
* a value that is bigger than the pivot; we also move the right pointer until find a value that is
* smaller than the pivot. Then we swap this two values and repeat the process.
*
* Time complexity:
*   - Best cases: O(n log(n))
*   - Average cases: O(n log(n))
*   - Worst cases: O(n²)
*/

import { swap } from '../../utils/utils';

export class QuickSort {
  static sort(array: number[]) {
    // calls a recursive function
    return QuickSort.quick(array, 0, array.length - 1)
  }

  static quick(array: number[], left: number, right: number) {
    // Recursive function to actually sort the array

    // this index will separate the array into subarrays
    // so we can call quick() in the subarray until we get all elements sorted
    let index;
    if (array.length > 1) {
      // get the index value
      index = QuickSort.partition(array, left, right);
      // split the subarray from the left pointer to index - 1
      if (left < index - 1) {
        // sort this subarray
        this.quick(array, left, index - 1);
      }
      // split the subarray from index to the right pointer
      if (index < right) {
        // sort this subarray
        this.quick(array, index, right);
      }
    }
    return array; // return the sorted array
  }

  static partition(array: number[], left: number, right: number) {
    // Function to help split the array and order subarrays

    // pivot = value in the middle of the list
    const pivot = array[Math.floor((right + left) / 2)];
    let i = left; // i = left pointer
    let j = right; // j = right pointer
    while (i <= j) { // while left and right pointer doesn't cross

      // while element in the left pointer is smaller than the pivot
      while (array[i] < pivot) {
        // move the pointer to next index
        i++;
      }

      // while element in right pointer is bigger than the pivot
      while (array[j] > pivot) {
        // move the pointer to previous index
        j--;
      }

      if (i <= j) {
        // swap the elements in left pointer and right pointer
        swap(array, i, j);
        i++;
        j--;
      }
    }
    return i;
  }
}
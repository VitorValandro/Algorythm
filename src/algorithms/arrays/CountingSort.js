/*
* Time complexity:
*   - Best cases: O(n+k)
*   - Average cases: O(n+k)
*   - Worst cases: O(n+k)
*/

class CountingSort {
  static sort(array) {
    if (array.length < 2) {
      return array;
    }
    // get the max value in the list
    const maxValue = CountingSort.findMaxValue(array);

    // create a tmp array `counts` to store how many times each value appears in the list
    const counts = new Array(maxValue + 1);

    // populate the counts array
    for (let i = 0; i < array.length; i++) {
      // if the element doesn't exists in counts yet, add it with count = 0
      if (!counts[array[i]]) {
        counts[array[i]] = 0;
      }
      // increments the count of this element
      counts[array[i]]++;
    }

    // rebuild the array already sorted
    let sortedIndex = 0;
    for (let j = 0; j < counts.length; j++) {
      // starting from 0, check if the j value was in the original list (count > 0)
      while (counts[j] > 0) {
        // if it was, add it again in the correct position (since we are following a logical order)
        array[sortedIndex++] = j;
        counts[j]--; // decrement the count of this value
      }
    }
    // return the sorted array
    return array;
  }

  static findMaxValue(array) {
    let max = array[0];
    for (let i = 1; i < array.length; i++) {
      if (array[i] > max) {
        max = array[i];
      }
    }
    return max;
  }
}
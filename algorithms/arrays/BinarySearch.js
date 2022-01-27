class BinarySearch {
  static search(array, value) {
    // first, sort the array with ascending values
    const sortedArray = QuickSort.sort(array);

    let low = 0; // define the low pointer as first index
    let high = sortedArray.length - 1; // define high pointer as last index

    while (lesserOrEquals(low, high)) {
      // get the middle index between the two pointers
      const mid = Math.floor((low + high) / 2);
      const element = sortedArray[mid]; // get the middle value
      if (element < value) {
        // if middle element < value, replace the lower pointer to the next index
        low = mid + 1;
      }
      else if (element > value) {
        // if middle element > value, replace the higher pointer to previous index
        high = mid - 1;
      }
      // if element == value, we found our element
      else {
        return mid; // return the index of the searched element
      }
    }
    // element doesn't exists in the list
    return undefined;
  }
}
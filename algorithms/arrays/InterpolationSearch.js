/*
* Time complexity (in sorted Arrays): O(n)
*/

class InterpolationSearch {
  // search for `value` in an `array`
  static search(array, value) {
    const { length } = array;
    let low = 0; // start low pointer as first index
    let high = length - 1; // start high pointer as last index
    // position is the index where we are searching for value
    let position = -1;
    let delta = 1;

    array = QuickSort.sort(array);

    while (
      low <= high
      && biggerOrEquals(value, array[low])
      && lesserOrEquals(value, array[high])
    ) {
      /*
      * this formula to get position works by trying the highest element if value is close 
      * to array[high] or the smallest element if value is close to array[low]
      */
      delta = (value - array[low]) / (array[high] - array[low]);
      position = low + Math.floor((high - low) * delta);
      // value was found
      if (array[position] === value) {
        return position; // return its index
      }
      // if value is before the position
      if (array[position] < value) {
        low = position + 1; // move the low pointer to next index
      }
      else {
        high = position - 1; // move the high pointer to previous index
      }
    }
    // if the element wasn't found
    return undefined;
  }
}
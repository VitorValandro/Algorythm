class MergeSort {
  static merge(left_arr, right_arr, view) {
    // initialize the array that the two lists will merge into
    const merged_arr = [];

    // while are elements in both arrays
    while (left_arr.length > 0 && right_arr.length > 0) {
      // verify what is the bigger element to sorting
      if (left_arr[0] > right_arr[0]) {
        // add element to merged_arr and remove from right_array
        view.swap(view.array.indexOf(left_arr[0]), view.array.indexOf(right_arr[0]));
        merged_arr.push(right_arr.shift());
      }
      else {
        // add element to merged_arr and remove from left_array
        view.swap(view.array.indexOf(right_arr[0]), view.array.indexOf(left_arr[0]));
        merged_arr.push(left_arr.shift());
      }
    }

    // iterates over the elements that doesn't were compared and just add them to merged_arr
    while (left_arr.length > 0) {
      merged_arr.push(left_arr.shift());
    }

    while (right_arr.length > 0) {
      merged_arr.push(right_arr.shift());
    }

    // return a single and sorted array
    return merged_arr;
  }

  static sort(view) {
    view.array = function sorting(array) {
      // if the array can't be splited, return
      if (array.length == 1)
        return array;

      // split the array in two - left and right
      let left_arr = array.slice(0, Math.floor(array.length / 2));
      let right_arr = array.slice(Math.floor(array.length / 2), array.length);

      // recursively sort each one of the splited arrays
      left_arr = sorting(left_arr);
      right_arr = sorting(right_arr);

      // merge two arrays in one
      return MergeSort.merge(left_arr, right_arr, view);
    }(view.array)
  }
}
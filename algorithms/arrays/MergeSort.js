class MergeSort {
  static merge(left_arr, right_arr) {
    const merged_arr = [];

    while (left_arr.length > 0 && right_arr.length > 0) {
      if (left_arr[0] > right_arr[0]) {
        merged_arr.push(right_arr.shift());
      }
      else {
        merged_arr.push(left_arr.shift());
      }
    }

    while (left_arr.length > 0) {
      merged_arr.push(left_arr.shift());
    }

    while (right_arr.length > 0) {
      merged_arr.push(right_arr.shift());
    }

    return merged_arr;
  }

  static sort(array) {
    if (array.length == 1)
      return array;

    let left_arr = array.slice(0, Math.floor(array.length / 2));
    let right_arr = array.slice(Math.floor(array.length / 2), array.length);

    left_arr = MergeSort.sort(left_arr);
    right_arr = MergeSort.sort(right_arr);

    return MergeSort.merge(left_arr, right_arr);
  }
}
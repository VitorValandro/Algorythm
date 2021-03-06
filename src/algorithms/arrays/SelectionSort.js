/*
* Time complexity:
*   - Best cases: O(n²)
*   - Average cases: O(n²)
*   - Worst cases: O(n²)
*/

class SelectionSort {
  static async sort(view) {
    let min; // minimum index

    // for optimization and (n-1) iterations, you can use `view.array.length -1` instead:
    for (let i = 0; i < view.array.length; i++) {
      min = i; // make i the minimum
      for (let j = i + 1; j < view.array.length; j++) {
        // if j < min, make j the new minimum
        if (view.array[j] < view.array[min])
          min = j;
      }
      // color the min bars
      view.bars[min].color = '#27BB65';
      await sleep(250); // animation delay
      await view.swap(min, i)
    }
  }
}
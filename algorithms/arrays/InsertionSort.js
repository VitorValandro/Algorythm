/*
* Time complexity:
*   - Best cases: O(n)
*   - Average cases: O(n²)
*   - Worst cases: O(n²)
*/

class InsertionSort {
  static async sort(view) {
    // start key as the second element (i=1)
    for (let i = 1; i < view.array.length; i++) {
      let key = view.array[i];
      let j = i - 1;
      while (j >= 0 && view.array[j] > key) {
        await sleep(500); // animation delay
        await view.swap(j + 1, j);
        view.bars[j + 1].color = '#27BB65';
        j--;
      }
      view.array[j + 1] = key;
    }
    view.bars.forEach(bar => bar.color = '#27BB65')
    view.render();
  }
}
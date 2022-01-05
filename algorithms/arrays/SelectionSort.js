class SelectionSort {
  static async sort(view) {
    let min; // minimum index
    for (let i = 0; i < view.array.length - 1; i++) {
      min = i;
      for (let j = i + 1; j < view.array.length; j++) {
        if (view.array[j] < view.array[min]) {

          min = j;
        }

      }
      // color the min bars
      view.bars[min].color = 'blue';
      await sleep(250);
      await view.swap(i, min)
    }
  }
}
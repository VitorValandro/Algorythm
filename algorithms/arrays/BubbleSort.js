class BubbleSort {
  static async sort(view) {
    let swapped;

    // iter through all elements
    for (let i = 0; i < view.array.length - 1; i++) {
      swapped = false;

      // continue itering, but ignore the last i elements cause they're already in place
      for (let j = 0; j < view.array.length - i - 1; j++) {
        if (view.array[j] > view.array[j + 1]) {
          await sleep(250);
          await view.swap(j, j + 1, view);
          swapped = true;
        }
      }

      view.bars[view.array.length - i - 1].color = '#27BB65' // color the sorted bars
      if (swapped == false)
        break;
    }
  }
}
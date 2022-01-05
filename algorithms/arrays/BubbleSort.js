class BubbleSort {
  static swap(a, b, view) {
    // a is bigger than b

    let temp = view.array[a];
    view.array[a] = view.array[b];
    view.array[b] = temp;
    view.swap(view.bars[b], view.bars[a]);
  }

  static async sort(arrayView) {
    let swapped;

    for (let i = 0; i < arrayView.array.length - 1; i++) {
      swapped = false;

      for (let j = 0; j < arrayView.array.length - i - 1; j++) {

        if (arrayView.array[j] > arrayView.array[j + 1]) {
          await sleep(750);
          BubbleSort.swap(j, j + 1, arrayView);
          swapped = true;
        }
      }
      if (swapped == false)
        break;
    }
  }
}
function randomArray(length) {
  let arr = [];
  for (let i = 0; i < length; i++) {
    let random = Math.floor(Math.random() * (99 - 10)) + 10;
    arr.push(random)
  }
  return arr;
}

const LIST = randomArray(10);

let bubbleSort_array = new ArrayView(LIST, 500, document.getElementById("bubbleSort_canvas"));
bubbleSort_array.render();

let insertionSort_array = new ArrayView(LIST, 500, document.getElementById("insertionSort_canvas"));
insertionSort_array.render();

let selectionSort_array = new ArrayView(LIST, 500, document.getElementById("selectionSort_canvas"));
selectionSort_array.render();
//BubbleSort.sort(array);
//SelectionSort.sort(array);
//InsertionSort.sort(array);
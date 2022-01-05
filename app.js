function randomArray(length) {
  let arr = [];
  for (let i = 0; i < length; i++) {
    let random = Math.floor(Math.random() * (99 - 10)) + 10;
    arr.push(random)
  }
  return arr;
}

const array = new ArrayView(randomArray(10), 500);
array.render(document.getElementById("tempboilerplate"));

let barA = array.bars[0]
let barB = array.bars[1]
BubbleSort.sort(array);
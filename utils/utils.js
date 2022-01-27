function loadImages(element, path, images) {
  images.forEach(image => {
    const img = document.createElement("img");
    img.src = path + image;
    element.appendChild(img);
  })
};

function isArrayEquals(arr1, arr2) {
  // it works only in 1d arrays without nested arrays
  if (!arr1 || !arr2)
    return false;

  if (arr1.length != arr2.length)
    return false;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] != arr2[i])
      return false
  }
  return true;
}

function shuffle(array) {
  // an implementation of Fisher-Yates shuffle algorithm
  let currentIndex = array.length, randomIndex;

  // while there remain elements to shuffle
  while (currentIndex != 0) {

    // pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // swap it with the current element
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function randomChoice(array) {
  // allows to get one random element in a list
  return array[Math.floor(Math.random() * array.length)];
}

function swap(array, a, b) {
  const tmp = array[a];
  array[a] = array[b];
  array[b] = tmp;
}

function removeItem(array, item) {
  let index = array.indexOf(item);
  if (index !== -1) {
    array.splice(index, 1);
  }
  return array;
}

function lesserOrEquals(a, b) {
  return a < b || a === b;
}

function biggerOrEquals(a, b) {
  return a > b || a === b;
}

function sleep(ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}
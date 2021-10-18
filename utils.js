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


function sleep(ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}
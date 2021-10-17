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

function sleep(ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}
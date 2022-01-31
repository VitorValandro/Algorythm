export function loadImages(element: HTMLElement, path: string, images: string[]) {
  images.forEach(image => {
    const img = document.createElement("img");
    img.src = path + image;
    element.appendChild(img);
  })
};

export function isArrayEquals(arr1: [], arr2: []) {
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

export function randomChoice(array: []) {
  // allows to get one random element in a list
  return array[Math.floor(Math.random() * array.length)];
}

export function swap(array: any[], a: number, b: number) {
  const tmp = array[a];
  array[a] = array[b];
  array[b] = tmp;
}

export function removeItem(array: [], item: never) {
  let index = array.indexOf(item);
  if (index !== -1) {
    array.splice(index, 1);
  }
  return array;
}

export function lesserOrEquals(a: number, b: number) {
  return a < b || a === b;
}

export function biggerOrEquals(a: number, b: number) {
  return a > b || a === b;
}

export function sleep(ms: number) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}
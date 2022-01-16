Array.prototype._push = function (element) {
  // the Array.push() method implementation
  this[this.length] = element;
  return this;
}

Array.prototype._unshift = function (element) {
  // the Array._unshift() method implementation
  for (let i = this.length; i >= 0; i--) {
    this[i] = this[i - 1];
  }
  this[0] = element;
  return this;
}

Array.prototype._shift = function () {
  // the Array._shift() method implementation
  const element = this[0];
  for (let i = 0; i < this.length; i++) {
    this[i] = this[i + 1];
  }
  this.length--;
  return element;
}

Array.prototype._pop = function () {
  // the Array.pop() method implementation
  const element = this[this.length - 1];
  this.length--;
  return element;
}

Array.prototype._indexOf = function (element) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] == element)
      return i
  }
  return -1;
}

Array.prototype._slice = function (start = 0, end = this.length) {
  let arr = [];
  if (start < 0)
    start += this.length;
  for (let i = start; i < end; i++) {
    arr.push(this[i]);
  }
  return arr;
}
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
}
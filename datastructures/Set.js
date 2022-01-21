/*
* The Set data structure follow the rules of a mathematical set.
* A set is a sequencial and sorted collection with no repeated elements.
*/

class Set {
  constructor() {
    this.items = {};
  }

  add(element) {
    // adds an new element in the set
    if (!this.has(element)) {
      this.items[element] = element;
      return true;
    }
    return false;
  }

  delete(element) {
    // removes an element of the set
    if (this.has(element)) {
      delete this.items[element];
      return true;
    }
    return false;
  }

  has(element) {
    // check if an element is in the set (boolean)
    return Object.prototype.hasOwnProperty.call(this.items, element);
  }

  clear() {
    // removes all elements and reset the set
    this.items = {};
  }

  size() {
    // returns the amount of elements in the set
    let count = 0;
    for (let key in this.items) {
      if (this.items.hasOwnProperty(key)) {
        count++;
      }
    }
    return count;
  }

  values() {
    // returns an array with all elements of the set
    let values = [];
    for (let key in this.items) {
      if (this.items.hasOwnProperty(key)) {
        values.push(key);
      }
    }
    return values;
  }
}
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

  union(otherSet) {
    // Union operation with sets. 
    // Given two sets A and B, the union is a set with all elements of A and B.
    const unionSet = new Set(); // start a new set

    this.values().forEach(item => unionSet.add(item)); // add to new set all elements of A
    otherSet.values().forEach(item => unionSet.add(item)); // add to new set all elements of B

    return unionSet;
  }

  intersection(otherSet) {
    // Intersection operation with sets.
    // Given two sets A and B, the intersection is a set with elements in common between A and B.
    const intersectionSet = new Set();
    const values = this.values();
    const otherValues = otherSet.values();

    let smallerSet = values;
    let biggerSet = otherValues;

    if (otherValues.length - values.length > 0) {
      biggerSet = otherValues;
      smallerSet = values;
    }

    // iterate over the smaller set to get the lower n for O(n)
    smallerSet.forEach(item => {
      if (biggerSet.includes(item)) {
        intersectionSet.add(item);
      }
    });

    return intersectionSet;
  }
}
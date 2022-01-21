/*
* The Set data structure follow the rules of a mathematical set.
* A set is a sequencial and sorted collection with no repeated elements.
*
* The javascript ES2015 already have a built-in set data structure, but it
* don't have the mathematical operations of sets, like Union, Intersection and Difference.
* However, we can easily implement it using other array functions of ES6 and the spread operator:
*
* Union           ->    new Set([...setA, ...setB]);
* Intersection    ->    new Set([...setA].filter(x => setB.has(x)))
* Difference      ->    new Set([...setA].filter(x => !setB.has(x)))
*
* Here, for learning purpose, I will implement all of this methods and operations of sets from scratch.
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

  difference(otherSet) {
    // Difference operation with sets.
    // Given two sets A and B, the difference is a set with elements of A that isn't in B.
    const differenceSet = new Set();
    const values = this.values();
    for (let i = 0; i < values.length; i++) {
      if (!otherSet.has(values[i])) {
        differenceSet.add(values[i])
      }
    }
    return differenceSet;
  }

  isSubsetOf(otherSet) {
    // Returns if this set is a subset of other set (boolean).
    // A set is a subset of other set if all elements in A are present in B.

    // if the size of this set is bigger than the other, it isn't a subset
    if (this.size() > otherSet.size()) {
      return false;
    }

    for (let i = 0, values = this.values(); i < values.length; i++) {
      if (!otherSet.has(values[i])) {
        return false;
      }
    }
    return true;
  }
}
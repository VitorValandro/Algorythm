/*
* Sorted Linked Lists are like simple Linked Lists, but all elements in the list
* are always sorted. At every push or insertion of items, this data structure place
* the element in the right position in the list, with no need for sorting algorithms.
*/

class SortedLinkedList extends LinkedList {
  constructor() {
    super();
    this.compare = (a, b) => {
      if (a === b) {
        return 0;
      }
      return a < b ? -1 : 1;
    }

  }

  push(element) {
    // adds a new element in the right sorted position
    if (this.isEmpty()) {
      super.push(element);
    }

    else {
      const index = this.getIndexNextSortedElement(element);
      super.insert(element, index);
    }
  }

  insert(element, index = 0) {
    // adds a new element in the right sort position
    if (this.isEmpty()) {
      return super.insert(element, index === 0 ? index : 0);
    }

    const pos = this.getIndexNextSortedElement(element);
    return super.insert(element, pos);
  }

  getIndexNextSortedElement(element) {
    // check elements for sorting
    let current = this._head;
    let i = 0;

    for (; i < this.size() && current; i++) {
      const comp = this.compare(element, current.element);
      if (comp === -1) {
        return i;
      }
      current = current.next;
    }
    return i;
  }
}
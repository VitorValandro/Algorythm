/*
* Linked Lists are dynamics arrays.
* In javascript we can't tell the difference clearly, but the definition of Array data structure
* says that an array is a collection of one single type of value and with limited and defined size.
*
* So, in Linked Lists we can have various different data types, and there is not a limited number
* of elements in collections. We can also insert or remove items in any index of the list.
*
* This gives a lot more freedom to work with, but it is also more costly than Queue, Stacks or Arrays
* in terms of complexity.
*
* While in an array we have all elements in a sequence in the computer memory, in Linked Lists we
* have items of the list in various places, and each element saves a pointer that leads to the next
* object in the next index.
*/

class Node {
  constructor(element) {
    this.element = element;
    this.next = undefined;
  }
}

class LinkedList {
  constructor() {
    this.count = 0;
    this._head = undefined;
  }

  get head() {
    return this._head;
  }

  push(element) {
    // adds a new element in the end of the list
    const node = new Node(element);

    // check if ihe list has no element yet
    if (this._head == null) {
      this._head = node;
    }

    else {
      // start the iteration from the first element
      let current = this._head;
      while (current.next != null) {
        // get every element after head until reach the last one
        current = current.next;
      }
      // link the current last element to the new pushed element
      current.next = node;
    }

    this.count++;
  }

  insert(element, index) {
    // inserts a new element in a specific index

    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      // check if the specified index is the first one
      if (index === 0) {
        // make the new node the head of the list
        node.next = this._head;
        this._head = node;
      }

      else {
        // get the element in the previous index and in the current index
        const previous = this.getElementAt(index - 1);
        const current = previous.next;

        // link the new node to the current element in the specified index
        node.next = current;
        // link the previous node to the new one
        previous.next = node;
      }
      this.count++; // update the size of list
      return true;
    }
    return false; // return false if no insertion happened
  }

  getElementAt(index) {
    // returns the element in a specific index

    if (index >= 0 && index <= this.count) {
      // starts from the first element
      let current = this._head;

      // iterate over linked nodes until reach the specified index
      for (let i = 0; i < index && current != null; i++) {
        current = current.next;
      }
      return current;
    }
    return undefined
  }

  remove(element) {
    // removes an element of the list by its value
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  indexOf(element) {
    // returns the first index of a specific element
    let current = this._head;
    // iterate over all linked nodes
    for (let i = 0; i < this.count && current != null; i++) {
      // compare the element with the node value
      if (element === current.element) {
        // if found, return the index
        return i;
      }
      current = current.next;
    }
    return -1; // if the element wasn't found, return -1
  }

  removeAt(index) {
    // removes an item of a specific index
    if (index >= 0 && index < this.count) {
      let current = this._head;
      // check if we want remove the first element
      if (index === 0) {
        this._head = current.next;
      }

      else {
        const previous = this.getElementAt(index - 1);
        current = previous.next;

        // jumps the current node by linking the previous node with the next node
        // without a reference pointint to it, the current node is deleted
        previous.next = current.next;
      }

      this.count--;
      return current.element;
    }

    return undefined;
  }

  isEmpty() {
    // returns if the list is empty (boolean)
    return this.size() === 0;
  }

  size() {
    // returns the amount of elements in the list
    return this.count;
  }

  clear() {
    // resets the list
    this.head = undefined;
    this.count = 0;
  }

  toString() {
    // returns a string representation of the list
    if (this._head == null) {
      return '';
    }

    let string = `${this._head.element}`;
    let current = this._head.next;
    for (let i = 0; i < this.size() && current != null; i++) {
      string = `${string},${current.element}`;
      current = current.next;
    }

    return string;
  }
}
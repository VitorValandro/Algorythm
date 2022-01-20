class Node {
  constructor(element) {
    this.element = element;
    this.pointer = undefined;
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
      while (current.pointer != null) {
        // get every element after head until reach the last one
        current = current.pointer;
      }
      // link the current last element to the new pushed element
      current.pointer = node;
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
        node.pointer = this._head;
        this._head = node;
      }

      else {
        // get the element in the previous index and in the current index
        const previous = this.getElementAt(index - 1);
        const current = previous.pointer;

        // link the new node to the current element in the specified index
        node.pointer = current;
        // link the previous node to the new one
        previous.pointer = node;
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
        current = current.pointer;
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
      current = current.pointer;
    }
    return -1; // if the element wasn't found, return -1
  }

  removeAt(index) {
    // removes an item of a specific index
    if (index >= 0 && index < this.count) {
      let current = this._head;
      // check if we want remove the first element
      if (index === 0) {
        this._head = current.pointer;
      }

      else {
        const previous = this.getElementAt(index - 1);
        current = previous.pointer;

        // jumps the current node by linking the previous node with the next node
        // without a reference pointint to it, the current node is deleted
        previous.pointer = current.pointer;
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

  toString() {
    // returns a string representation of the list
    if (this.head == null) {
      return '';
    }

    let string = `${this.head.element}`;
    let current = this.head.pointer;
    for (let i = 0; i < this.size() && current != null; i++) {
      string = `${string},${current.element}`;
      current = current.pointer;
    }

    return string;
  }
}
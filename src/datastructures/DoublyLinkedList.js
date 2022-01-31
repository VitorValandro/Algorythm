/*
* Double Linked Lists are like simple Linked Lists, but besides track the head of list
* it also keep track of the list's tail.
*
* The tail allows double access to the elements of the list, by its start or by its end.
* With that, we can improve our performance and efficient of this data structure.
* Tracking the tail, operations like insertion, pushing and removing reduce their Big O complexity
* from O(n) in conventional Linked Lists to O(1) in doubly linked lists.
*/

class DoublyNode extends Node {
  constructor(element, next, prev) {
    super(element, next);
    this.prev = prev;
  }
}

class DoublyLinkedList extends LinkedList {
  constructor() {
    super();
    this._tail = undefined;
  }

  get tail() {
    return this._tail;
  }

  push(element) {
    /* 
    * Adds a new element in the end of the list
    * Note that this push is O(1), when the simple Linked List's push is O(n)
    */
    const node = new DoublyNode(element);

    // check if ihe list has no element yet
    if (this._head == null) {
      this._head = node;
      this._tail = node;
    }

    else {
      // link the current last element to the new pushed element
      this._tail.next = node;
      node.prev = this._tail;
      this._tail = node;
    }
    this.count++;
  }

  insert(element, index) {
    // inserts a new element in a specific index

    if (index >= 0 && index <= this.count) {
      const node = new DoublyNode(element);
      let current = this._head;

      // if the specified index is the first one
      if (index === 0) {
        if (this._head == null) {
          // make the new node the head and the tail of the list
          this._head = node;
          this._tail = node;
        }

        else {
          // make the new node the head of the list and pushes the current head to next index
          node.next = this._head;
          this._head.prev = node;
          this._head = node;
        }
      }

      // if the specified index is the last one
      else if (index === this.count) {
        // make the new node the tail of the list and pushes the current tail to previous index
        current = this._tail;
        current.next = node;
        node.prev = current;
        this._tail = node;
      }

      // if the specified index is inside of list (not head nor tail)
      else {
        const previous = this.getElementAt(index - 1); // get node in previous index

        // place the new node between the previous node and the current node in that index
        current = previous.next;
        node.next = current;
        previous.next = node;
        current.prev = node;
        node.prev = previous;
      }

      this.count++; // increment the size of list
      return true;
    }
    return false; // return false if no insertion happened
  }

  removeAt(index) {
    // removes an item of a specific index
    if (index >= 0 && index < this.count) {
      let current = this._head;

      // if we want to remove the first element
      if (index === 0) {
        this._head = this._head.next;
        // if there is only one item we update tail as well
        if (this.count === 1) {
          this._tail = undefined;
        }

        else {
          this._head.prev = undefined;
        }
      }

      // if we want to remove the last item
      else if (index === this.count - 1) {
        // note that in the simple Linked List, removing the last item is O(n), here is O(1)
        current = this._tail;
        this._tail = current.prev;
        this._tail.next = undefined;
      }

      // if we want remove an element inside the list (not first nor last)
      else {
        current = this.getElementAt(index); // O(n)
        const previous = current.prev;

        // jumps the current node by linking the previous node with the next node
        // without a reference pointint to it, the current node is deleted
        previous.next = current.next;
        current.next.prev = previous;
      }

      this.count--; // decreases the list size
      return current.element;
    }
    return undefined;
  }

  indexOf(element) {
    // returns the first index of a specific element
    let current = this._head;
    let index = 0;

    while (current != null) {
      if (element === current.element) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  }

  clear() {
    // clear all elements in list
    super.clear();
    this._tail = undefined;
  }

  toString() {
    // string representation of list
    if (this._head == null) {
      return '';
    }

    let string = `${this._head.element}`;
    let current = this._head.next;

    while (current != null) {
      string = `${string},${current.element}`;
      current = current.next;
    }

    return string;
  }

  inverseToString() {
    // string representation of inversed list
    if (this._tail == null) {
      return '';
    }

    let string = `${this._tail.element}`;
    let previous = this._tail.prev;

    while (previous != null) {
      string = `${string},${previous.element}`;
      previous = previous.prev;
    }

    return string;
  }
}
/*
* Circular Linked Lists are like simple Linked Lists, but the last element (tail) of the list
* points to the start (head) of the list, creating a circle collection.
* 
* In a Circular Linked List tail.next points to head and head.prev points to tail.
*/

class CircularLinkedList extends LinkedList {
  constructor() {
    super();
  }

  push(element) {
    // adds a new element in the end of the list
    const node = new Node(element);
    let current;

    if (this._head == null) {
      this._head = node;
    }

    else {
      current = this.getElementAt(this.size() - 1);
      current.next = node;
    }
    // set node.next to head - to have circular list
    node.next = this._head;
    this.count++;
  }

  insert(element, index) {
    // inserts a new element in a specific index
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      let current = this._head;

      // check if the specified index is the first one
      if (index === 0) {
        if (this._head == null) {
          // if no node in list
          this._head = node;
          node.next = this._head;
        }

        else {
          node.next = current;
          current = this.getElementAt(this.size());
          // update last element
          this._head = node;
          current.next = this._head;
        }
      }

      else {
        const previous = this.getElementAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }

      this.count++;
      return true;
    }
    return false;
  }

  removeAt(index) {
    // removes an item of a specific index
    if (index >= 0 && index < this.count) {
      let current = this._head;

      if (index === 0) {
        if (this.size() === 1) {
          this._head = undefined;
        }

        else {
          const removed = this._head;
          current = this.getElementAt(this.size() - 1);
          this._head = this._head.next;
          current.next = this._head;
          current = removed;
        }
      }

      else {
        // no need to update last element for circular list
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }

      this.count--;
      return current.element;
    }
    return undefined;
  }
}
class Deque {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  addFront(element) {
    // add element in front of the Deque

    // deque is empty
    if (this.isEmpty()) {
      this.addBack(element);
    }

    // the first element isn't in the first index
    else if (this.lowestCount > 0) {
      this.lowestCount--;
      this.items[this.lowestCount] = element;
    }

    // the first element is in the first index
    else {
      /*
      * This isn't the most effective approach 
      * To make it O(1) we would need to use negative indexes
      */
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.count++;
      this.lowestCount = 0;
      this.items[0] = element;
    }
  }

  addBack(element) {
    // same implementation of enqueue() method from Queue class

    // adds element to the end of the queue
    this.items[this.count] = element;
    this.count++;
  }

  removeFront() {
    // same implementation of dequeue() method from Queue class

    // removes and returns the first element of the queue
    if (this.isEmpty()) {
      return undefined;
    }
    const first = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return first
  }

  removeBack() {
    // same implementation of pop() method from Stack class

    // removes element from the top of stack
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const last = this.items[this.count];
    delete this.items[this.count];
    return last;
  }

  peekFront() {
    // same implementation of peek() method from Queue class

    // returns (no removing) the first element of the queue
    return this.items[this.lowestCount];
  }

  peekBack() {
    // same implementation of peek() method from Stack class

    // returns the item on the top of stack (don't removes it, just returns)
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.size - 1];
  }

  isEmpty() {
    // returns if the deque is empty (boolean)
    return this.count - this.lowestCount === 0;
  }

  size() {
    // returns the current amount of elements in the deque
    return this.count - this.lowestCount;
  }

  clear() {
    // clear current values and reset the deque
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  toString() {
    // defines how the deque will be represented as string
    if (this.isEmpty()) {
      return '';
    }
    let string = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      string = `${string},${this.items[i]}`;
    }
    return string;
  }
}
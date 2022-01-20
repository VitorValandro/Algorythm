/*
* The queue datastructure.
* Queues are arrays that follow the FIFO (First In First Out) rule.
* Here we use javascript objects in place of arrays, to have O(1) instead O(n) complexity.
*/

class Queue {
  constructor() {
    this.count = 0;
    this.lowestCount = 0; // saves the index of first element
    this.items = {};
  }

  enqueue(element) {
    // adds element to the end of the queue
    this.items[this.count] = element;
    this.count++;
  }

  dequeue() {
    // removes and returns the first element of the queue
    if (this.isEmpty()) {
      return undefined;
    }
    const first = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return first
  }

  peek() {
    // returns (no removing) the first element of the queue
    return this.items[this.lowestCount];
  }

  isEmpty() {
    // returns if the queue is empty (boolean)
    return this.count - this.lowestCount === 0;
  }

  size() {
    // returns the current amount of elements in the queue
    return this.count - this.lowestCount;
  }

  clear() {
    // clear current values and reset the queue
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  toString() {
    // defines how queue will be represented as string
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
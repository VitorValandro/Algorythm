/* 
* The stack data structure. 
* Stacks are arrays that follow the LIFO (Last In First Out) rule.
* Here we use javascript objects in place of arrays, to have O(1) instead O(n) complexity
*
* Time complexity:
*   Average cases:
*     - Insertion:  O(1)
*     - Removal:    O(1)
*     - Search:     O(n)
*   Worst cases:
*     - Insertion:  O(1)
*     - Removal:    O(1)
*     - Search:     O(n)
*/

class Stack {
  constructor() {
    this.count = 0;
    this.items = {};
  }

  get size() {
    return this.count;
  }

  push(element) {
    // adds element to the top of stack
    this.items[this.count] = element;
    this.count++;
  }

  pop() {
    // removes element from the top of stack
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const last = this.items[this.count];
    delete this.items[this.count];
    return last;
  }

  peek() {
    // returns the item on the top of stack (don't removes it, just returns)
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.size - 1];
  }

  isEmpty() {
    // returns if stack is empty (boolean)
    return this.count === 0;
  }

  clear() {
    // removes all items of stack
    this.items = {};
    this.count = 0;
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }
    let string = `${this.items[0]}`;
    for (let i = 1; i < this.size; i++) {
      string = `${string}, ${this.items[i]}`;
    }
    return string;
  }
} 
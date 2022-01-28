/*
* Heap is a data structure derived from binary tree.
* The binary heap is famous by its efficiency in fast extract min and max values.
* 
* For a tree to be a binary heap, there are two basic rules:
*   1. A heap is a complete binary tree. This means that all levels of tree has left AND right childs,
*      and in the last level all childs are at left. This is called shape property.
*   2. A binary heap is a min heap or a max heap. This is called heap property.
*
* Unlike we did in BST and AVL tree, here in heap we will use arrays indexes (and not pointers 
* in objects) to represent our tree. This will change the logic and introduce a new example
* of tree data structure representation.
*
* Time complexity:
*   Average cases:
*     - Insertion:  O(log(n))
*     - Removal:    O(log(n))
*     - Search:     O(1)
*   Worst cases:
*     - Insertion:  O(log(n))
*     - Removal:    O(log(n))
*     - Search:     O(1)
*/

class MinHeap {
  /*
  * In this case, we have a min heap, so all parent nodes are smaller than or equal to their child nodes and
  * we can quickly extract the min value of the tree.
  * The root value of the tree is always the min heap.
  */
  constructor() {
    this.heap = [];
    this.compare = (a, b) => {
      if (a === b) {
        return Compare.EQUALS;
      }
      return a < b ? -1 : 1;
    }
  }

  getLeftIndex(index) {
    // returns the index of left child
    return 2 * index + 1;
  }

  getRightIndex(index) {
    // returns the index of right child
    return 2 * index + 2;
  }

  getParentIndex(index) {
    // returns the index of parent node
    if (index === 0) {
      return undefined;
    }
    return Math.floor((index - 1) / 2);
  }

  insert(value) {
    // inserts a value into the tree (returns true if success, false if not)

    if (value != null) {
      // inserts the value in the end of tree
      this.heap._push(value);
      // sift up the value from the end of the array until parent < value (min) or parent > value (max)
      this.siftUp(this.heap.length - 1);
      return true;
    }
    return false;
  }

  siftUp(index) {
    /* 
    * Method to help insertion of new elements in the tree.
    * It works swapping the new value with its parent until parent < new value (for
    * min heap) or parent > new value (for max heap).
    * This maintains the tree correctly ordered.
    * Also known as up head, percolate up, bubble up, heapify up and cascade up.
    */

    let parent = this.getParentIndex(index);
    while (index > 0 && this.compare(this.heap[parent], this.heap[index]) === 1) {
      // swap the parent with the new value
      swap(this.heap, parent, index);
      index = parent;
      parent = this.getParentIndex(index);
    }
  }

  extract(value) {
    // removes and returns the min or max heap of the tree
    if (this.isEmpty()) {
      return undefined;
    }
    if (this.size() === 1) {
      return this.heap._shift();
    }
    // if the heap has more than 1 value, we need to remove it
    const removedValue = this.heap[0];
    this.heap[0] = this.heap._pop(); // pop the last value to the first index
    // and then reorder the heap tree
    this.siftDown(0);
    // so we can return the removed value
    return removedValue;
  }

  siftDown(index) {
    /*
    * Method to help removal of elements in the tree.
    * It works reordering the tree after the element be removed.
    * The operation is swap the removed element with its smaller (min heap) or its bigger 
    * (max heap) child until it gets to correct position.
    * Also known as sink down, percolate down, bubble down, heapify down and cascade down
    */

    let element = index;

    const left = this.getLeftIndex(index);
    const right = this.getRightIndex(index);
    const size = this.size();

    if (left < size && this.compare(this.heap[element], this.heap[left]) === 1) {
      element = left;
    }

    if (right < size && this.compare(this.heap[element], this.heap[right]) === 1) {
      element = right;
    }

    if (index !== element) {
      swap(this.heap, index, element);
      this.siftDown(element);
    }
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.size === 0;
  }

  findMinimum() {
    // returns the min value (min heap) or the max value (max heap) of the tree without removing it

    // once the min heap is always the root, the min or max is in first index
    return this.isEmpty() ? undefined : this.heap[0];
  }
}

class MaxHeap extends MinHeap {
  /*
  * In this case, we have a max heap, so all parent nodes are bigger than or equal to their child nodes and
  * we can quickly extract the max value of the tree.
  * The root value of the tree is always the max heap.
  * 
  * This is essentialy the exactly same implementation of MinHeap, but here the value comparison is 
  * for the bigger, not for the smaller.
  */

  constructor() {
    super();
    // change the compare function from `a < b` to `a > b`
    this.compare = (a, b) => {
      if (a === b) {
        return Compare.EQUALS;
      }
      return a > b ? -1 : 1;
    }
  }
}
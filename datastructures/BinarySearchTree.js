class Node {
  constructor(key) {
    this.key = key; // node value
    this.left = null; // reference to the left child
    this.right = null; // reference to the right child
  }
}

class BinarySearchTree {
  constructor() {
    // store the root node
    this.root = null;
    // function to compare the node values (in this case, numbers)
    this.compare = (a, b) => {
      if (a === b) {
        return 0;
      }
      return a < b ? -1 : 1;
    }
  }

  insert(key) {
    // insert a new node in the tree

    if (this.root == null) {
      // if the tree has no root, make it the root
      this.root = new Node(key);
    } else {
      // if a root already exists, call insertNode method to place it properly into the tree
      this.insertNode(this.root, key);
    }
  }

  insertNode(node, key) {
    /*
    * This is a recursive method to insert node in the ordered place.
    * The first function call is with node = root, so we check if the key will be placed
    * in the right (key > root.key) or in the left (key < root.key).
    * 
    * After that, we check if the right or left child of root is empty, if not, we call
    * inserNode again with node equals the current node, until find a available node to place the key.
    */

    // check if it is lesser or bigger than the current node
    if (this.compare(key, node.key) === -1) {
      // check if the node is empty
      if (node.left == null) {
        // if it is, place the key here
        node.left = new Node(key);
      }
      else {
        // if not, call insertNode again with the current node
        this.insertNode(node.left, key);
      }
    }
    // if is bigger than the current node
    else {
      // check if the node is empty
      if (node.right == null) {
        // if it is, place the key here
        node.right = new Node(key);
      }
      else {
        // if not, call insertNode again with the current node
        this.insertNode(node.right, key);
      }
    }
  }

  search(key) {
    // searchs for the key in the tree. Return true if it exists and false if not (boolean)
  }

  inOrderTraverse() {
    // travel through all tree nodes using a in-order route
  }

  preOrderTraverse() {
    // travel through all tree nodes using a pre-order route
  }

  postOrderTraverse() {
    // travel through all tree nodes using a post-order route
  }

  min() {
    // returns the min key of the tree
  }

  max() {
    // returns the max key of the tree
  }

  remove(key) {
    // removes the specified key from the tree
  }
}
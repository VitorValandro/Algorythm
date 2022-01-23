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
    if (key < node.key) {
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
    // Searchs for the key in the tree. Return true if it exists and false if not (boolean)
    return this.searchNode(this.root, key);
  }

  searchNode(node, key) {
    // This is a recursive function to search for a specified value in the tree.

    // node == null is the base case
    if (node == null) {
      return false;
    }
    // if the searching value is lesser than the current node value
    if (key < node.key) {
      // search in the left nodes
      return this.searchNode(node.left, key);
    }
    // if the searching value is bigger than the current node value
    else if (key > node.key) {
      // search in the right nodes
      return this.searchNode(node.right, key);
    }
    // if isn't lesser nor bigger, it is equals -> found the key
    else {
      return true;
    }
  }

  inOrderTraverse(callback) {
    /* 
    * Travel through all tree nodes using a in-order route.
    * A in-order route is an ascending order path, where we travel from the smallest 
    * to the biggest value.
    */

    // call the inOrderTraverseNode recursive method passing the root and a callback function.
    this.inOrderTraverseNode(this.root, callback);
  }

  inOrderTraverseNode(node, callback) {
    /*
    * This is a recursive method to iter through all nodes in the three in an ascending order.
    * It starts from the node specified in params, and execute the callback function over each 
    * node visited.
    * 
    * An example of callback: 
    * 
    * printNode = (value) => console.log(value);
    * 
    * It will print all node values of the tree in ascending order.
    */

    // node == null is the base case
    if (node != null) {
      // first, iterates over all left nodes (from the smallest to the biggest)
      this.inOrderTraverseNode(node.left, callback);
      // call the callback for each node
      callback(node.key);
      // iterates over all right nodes (from the smallest to the biggest)
      this.inOrderTraverseNode(node.right, callback);
    }
  }

  preOrderTraverse(callback) {
    /*
    * Travel through all tree nodes using a pre-order route.
    * A pre-order route is almost the same of the in-order route (ascending path), but here
    * the root will always be the first visited.
    */

    // calls the preOrderTraverseNode recursive method passing the root and a callback function
    this.preOrderTraverseNode(this.root, callback);
  }

  preOrderTraverseNode(node, callback) {
    // node == null is the base case
    if (node != null) {
      // first it execute the callback function in the root node
      callback(node.key);
      // then it iter over all left child nodes
      this.preOrderTraverseNode(node.left, callback);
      // then it iter over all right child nodes
      this.preOrderTraverseNode(node.right, callback);
    }
  }

  postOrderTraverse() {
    /* 
    * Travel through all tree nodes using a post-order route. 
    * A post-order route is a path that start from the childs, and then go to the root.
    */

    // calls the postOrderTraverseNode recursive method passing the root and a callback function
    this.postOrderTraverseNode(this.root, callback)
  }

  postOrderTraverseNode(node, callback) {
    // node == null is the base case
    if (node != null) {
      // first it iter over all left child nodes
      this.postOrderTraverseNode(node.left, callback);
      // then it iter over all right child nodes
      this.postOrderTraverseNode(node.right, callback);
      // finally, it executes the callback in the root node
      callback(node.key);
    }
  }

  min() {
    /* 
    * Search for and returns the min (smallest) key of the tree.
    * Calls the minNode method from the root, to get the min key of complete tree.
    * An other "private" method minNode is used.
    */

    return this.minNode(this.root);
  }

  minNode(node) {
    // The min key of a tree is always the last node in the left of the tree.

    let current = node;
    // iterate over the most left nodes until reach the last one
    while (current != null && current.left != null) {
      current = current.left;
    }
    // return the most left node
    return current;
  }

  max() {
    // Search for and returns the max (biggest) key of the tree.

    return this.maxNode(this.root);
  }

  maxNode(node) {
    // The max key of a tree is always the last node in the right of the tree.

    let current = node;
    // iterate over the most right nodes until reach the last one
    while (current != null && current.right != null) {
      current = current.right;
    }
    // return the most right node
    return current;
  }

  remove(key) {
    // removes the specified key from the tree
  }
}
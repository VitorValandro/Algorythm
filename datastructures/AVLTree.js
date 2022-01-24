/*
* The Adelson-Velskii and Landi tree (AVL Tree) is an auto balanced tree.
* It means that the tree always try to balance itself after a node be removed or inserted.
* A balanced tree is a tree where the height of left or right subtrees differ at most in 1.
*/

class AVLTree extends BinarySearchTree {
  constructor() {
    super();
  }

  getNodeHeight(node) {
    /* 
    * Method to get the height of a specified node. 
    * The height of a node is the max number of edges from the node to any of its leafs.
    */

    // node == null is the base case
    if (node == null) {
      return -1;
    }
    // call getNodeHeight recursively until reach the last leaf, and then sum +1
    return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
  }

  getBalanceFactor(node) {
    /* 
    * Method to get the height difference in unbalanced trees.
    * The Balace Factor will define how we will balance the tree (rotation operations).
    * Rotation operations are position changes of nodes, basically changing the root to a value
    * that its subtree keep balanced or, at most, with 1 height difference between nodes.
    */
    const BalanceFactor = {
      UNBALANCED_RIGHT: 1,
      SLIGHTLY_UNBALANCED_RIGHT: 2,
      BALANCED: 3,
      SLIGHTLY_UNBALANCED_LEFT: 4,
      UNBALANCED_LEFT: 5
    };

    const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalanceFactor.UNBALANCED_LEFT;
      default:
        return BalanceFactor.BALANCED;
    }
  }

  rotationLL(node) {
    /*
    * This is a method to balance unbalanced trees.
    * The Left Left Rotation is a simple rotation to the RIGHT.
    * It is used when the height of the left child is bigger than the right child,
    * so the tree is unbalanced to the left.
    */

    // Make the left child of root the new root
    const tmp = node.left;
    // Make the right child of current root (tmp) the left child of old root (node)
    node.left = tmp.right;
    // Make the old root and its subtree the right child of the new root
    tmp.right = node;
    return tmp;
  }

  rotationRR(node) {
    /*
    * This is a method to balance unbalanced trees.
    * The Right Right Rotation is a simple rotation to the LEFT.
    * It is used when the height of the right child is bigger than the left child,
    * so the tree is unbalanced to the right. 
    */

    // Make the right child of root the new root
    const tmp = node.right;
    // Make the left child of current root (tmp) the right child of old root (node)
    node.right = tmp.left;
    // Make the old root and its subtree the left child of the new root
    tmp.left = node;
    return tmp;
  }

  rotationLR(node) {
    /*
    * This is a method to balance unbalanced trees.
    * The Left Right Rotation is a double rotation, first to the left and then to the right.
    * This algorithm is used when the left child height are bigger than the right child's, and
    * the left child has its subtree unbalanced to the right.
    */

    // Make a left rotation in the left child's subtree (make the unbalance linear)
    node.left = this.rotationRR(node.left);
    // Now it's a simple case, just make a right rotation from the root node to balance the tree
    return this.rotationLL(node);
  }

  rotationRL(node) {
    /*
    * This is a method to balance unbalanced trees. It is the inverse of rotationLR().
    * The Right Left rotation is a double rotation, first to the right and then to the left.
    * This algorithm is used when the right child height are bigger than the left child's, and
    * the right child has its subtree unbalanced to the left.
    */

    // Make a right rotation in the right child's subtree (make the unbalance linear)
    node.right = this.rotationLL(node.right);
    // Now it's a simple case, just make a left rotation from the root node to balance the tree
    return this.rotationRR(node);
  }

  insert(key) {
    this.root = this.insertNode(this.root, key);
  }

  insertNode(node, key) {
    // This insertion step is like BST's insertion.
    if (node == null) {
      return new Node(key);
    }
    else if (key < node.key) {
      node.left = this.insertNode(node.left, key);
    }
    else if (key > node.key) {
      node.right = this.insertNode(node.right, key);
    }
    else {
      return node;
    }

    // After insertion, balance the tree if necessary
    const balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      if (key < node.left.key) {
        node = this.rotationLL(node);
      }
      else {
        return this.rotationLR(node);
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      if (key > node.right.key) {
        node = this.rotationRR(node);
      }
      else {
        return this.rotationRL(node);
      }
    }
    return node;
  }

  removeNode(node, key) {
    // Calls the BST remove method to remove the node
    node = super.removeNode(node, key);

    // If the return is null, no need for balance
    if (node == null) {
      return node;
    }

    // After removing, balance the tree if necessary
    const balanceFactor = this.getBalanceFactor(node);

    // The tree is unbalanced to the left
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      const balanceFactorLeft = this.getBalanceFactor(node.left);
      // Check if it needs a simple rotation
      if (
        balanceFactorLeft === BalanceFactor.BALANCED ||
        balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      ) {
        return this.rotationLL(node);
      }
      // Or if it needs a double rotation
      if (balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        return this.rotationLR(node.left)
      }
    }

    // The tree is unbalanced to the right
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      const balanceFactorRight = this.getBalanceFactor(node.right);
      // Check if it needs a simple rotation
      if (
        balanceFactorRight === BalanceFactor.BALANCED ||
        balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      ) {
        return this.rotationRR(node);
      }
      // Or if it needs a double rotation
      if (balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        return this.rotationRL(node.right);
      }
    }

    return node;
  }
}
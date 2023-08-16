import Node from "./node.js";

export default class Tree {
  constructor(arr) {
    this.root = null;
    this.buildTree(arr);
  }

  buildTree(arr, startOriginal, endOriginal) {
    const newArr = [...new Set(arr)]; // remove duplicate values from array
    newArr.sort((a, b) => a - b); // sort array numerically

    // assign start and end arguments if undefined
    // end value based on length of array of unique numbers)
    let start = startOriginal;
    if (startOriginal === undefined) start = 0;
    let end = endOriginal;
    if (endOriginal === undefined) {
      end = newArr.length - 1;
    }

    if (start > end) {
      return null;
    }

    const midIndex = parseInt((start + end) / 2, 10); // get middle index
    const rootNode = new Node(newArr[midIndex]);

    rootNode.left = this.buildTree(arr, start, midIndex - 1);
    rootNode.right = this.buildTree(arr, midIndex + 1, end);

    this.root = rootNode;

    return rootNode;
  }

  insert(data, root = this.root) {
    // base case
    if (root == null) {
      root = new Node(data); // eslint-disable-line no-param-reassign
      this.root = root;
      return root;
    }

    if (data < root.data) {
      root.left = this.insert(data, root.left); // eslint-disable-line no-param-reassign
    } else if (data > root.data) {
      root.right = this.insert(data, root.right); // eslint-disable-line no-param-reassign
    }

    this.root = root;

    return root;
  }

  delete(data, root = this.root) {
    // base case
    if (root === null) {
      return root;
    }

    // recursively traverse BST
    if (data < root.data) {
      root.left = this.delete(data, root.left); // eslint-disable-line no-param-reassign
      return root;
    }
    if (data > root.data) {
      root.right = this.delete(data, root.right); // eslint-disable-line no-param-reassign
      return root;
    }

    // this code runs only if root is the node to be deleted (data === root.data)
    if (root.left === null) { // if one child is null
      const temp = root.right;
      return temp;
    }
    if (root.right === null) { // if one child is null
      const temp = root.left;
      return temp;
    }
    // if both child nodes exist
    let succParent = root;
    let succ = root.right; // find successor
    while (succ.left !== null) { // traverse to left-most node of right subtree
      succParent = succ;
      succ = succ.left;
    }
    // delete successor
    if (succParent !== root) {
      succParent.left = succ.right;
    } else {
      succParent.right = succ.right;
    }
    // copy successor data to root
    root.data = succ.data; // eslint-disable-line no-param-reassign
    return root;
  }

  find(data, root = this.root) {
    // base case
    if (root === null) {
      return false;
    }
    if (data === root.data) {
      return root;
    }

    if (data < root.data) {
      return this.find(data, root.left);
    }
    if (data > root.data) {
      return this.find(data, root.right);
    }
  }

  levelOrderIterative(func, root = this.root, arr = [root]) {
    if (root === null) return [];

    if (!func) {
      const arrValues = [];
      arrValues.push(root.data);
      let n = 0;
      while (n <= arr.length - 1) {
        const current = arr[n];
        if (current.left !== null) {
          arr.push(current.left);
          arrValues.push(current.left.data);
        }
        if (current.right !== null) {
          arr.push(current.right);
          arrValues.push(current.right.data);
        }
        n++;
      }
      return arrValues;
    }

    // let arrValuesFunc = []
    while (arr.length) {
      const current = arr.shift();
      if (current.left !== null) arr.push(current.left);
      if (current.right !== null) arr.push(current.right);
      // func(current)
      const result = func(current);
      console.log(result);

      // arrValuesFunc.push(result)
    }
    // return arrValuesFunc
  }

  inorder(func, root = this.root, arr = []) {
    if (root === null) {
      return;
    }

    if (!func) {
      this.inorder(null, root.left, arr);
      arr.push(root.data);
      this.inorder(null, root.right, arr);
      return arr;
    }

    this.inorder(func, root.left);
    console.log(func(root));
    this.inorder(func, root.right);
  }

  preorder(func, root = this.root, arr = []) {
    if (root === null) {
      return;
    }

    if (!func) {
      arr.push(root.data);
      this.preorder(null, root.left, arr);
      this.preorder(null, root.right, arr);
      return arr;
    }

    console.log(func(root));
    this.preorder(func, root.left);
    this.preorder(func, root.right);
  }

  postorder(func, root = this.root, arr = []) {
    if (root === null) {
      return;
    }

    if (!func) {
      this.postorder(null, root.left, arr);
      this.postorder(null, root.right, arr);
      arr.push(root.data);
      return arr;
    }

    this.postorder(func, root.left);
    this.postorder(func, root.right);
    console.log(func(root));
  }

  height(node = this.root) {
    // base case
    if (node === null) { // empty BST
      return 0;
    }
    if (node.left === null && node.right === null) { // leaf node (includes BST with single node)
      return 0;
    }

    const heightLeft = this.height(node.left) + 1;
    const heightRight = this.height(node.right) + 1;
    const maxHeight = Math.max(heightLeft, heightRight);
    return maxHeight;
  }

  depth(node = this.root) {
    return this.height() - this.height(node);
  }

  isBalanced(root = this.root) {
    if (root === null) {
      return true;
    }

    const heightLeft = this.height(root.left);
    const heightRight = this.height(root.right);
    const heightDiff = Math.abs(heightLeft - heightRight);
    if (heightDiff > 1) {
      return false;
    }

    return this.isBalanced(root.left) && this.isBalanced(root.right);
  }

  rebalance() {
    const arr = this.inorder();
    this.root = null;
    this.buildTree(arr);
  }
}

import Node from "./node.js"

export default class Tree {
  constructor(arr) {
    this.root = null
    this.buildTree(arr)
  }

  buildTree(arr, start = 0, endOriginal) {
    let newArr = [...new Set(arr)] // remove duplicate values from array
    newArr.sort( (a, b) => a - b ) // sort array numerically
    
    let end = endOriginal
    if (endOriginal === undefined) {
      end = newArr.length - 1 // this allows initial function call with just the 'arr' argument (start and end set by default based on length of array of unique numbers)
    }

    if (start > end) {
      return null
    }

    const midIndex = parseInt((start + end) / 2) // get middle index
    const rootNode = new Node(newArr[midIndex])

    rootNode.left = this.buildTree(arr, start, midIndex - 1)
    rootNode.right = this.buildTree(arr, midIndex + 1, end)

    this.root = rootNode

    return rootNode
  }

  insert(data, root = this.root) {
    // base case
    if (root == null) {
      root = new Node(data)
      this.root = root
      return root
    }

    if (data < root.data) {
        root.left = this.insert(data, root.left)
    } else if (data > root.data) {
        root.right = this.insert(data, root.right)
    }

    this.root = root

    return root
  }

  delete(data, root = this.root) {
    // base case
    if (root === null) {
      return root
    }

    // recursively traverse BST
    if (data < root.data) {
      root.left = this.delete(data, root.left)
      return root
    } else if (data > root.data) {
      root.right = this.delete(data, root.right)
      return root
    }

    // this code runs only if root is the node to be deleted (data === root.data)
    if (root.left === null) { // if one child is null
      let temp = root.right
      return temp
    } else if (root.right === null) { // if one child is null
      let temp = root.left
      return temp
    } else { // if both child nodes exist
      let succParent = root
      let succ = root.right // find successor
      while (succ.left !== null) { // traverse to left-most node of right subtree
        succParent = succ
        succ = succ.left
      }
      // delete successor
      if (succParent !== root) {
        succParent.left = succ.right
      } else {
        succParent.right = succ.right
      }
      root.data = succ.data // copy successor data to root
      return root
    }
  }

  find(data, root = this.root) {
    // base case
    if (root === null) {
      return false
    } else if (data === root.data) {
      return root
    }

    if (data < root.data) {
      return this.find(data, root.left)
    } else if (data > root.data) {
      return this.find(data, root.right)
    }
  }

  levelOrderIterative(func, root = this.root, arr = [root]) {
    if (root === null) return []

    if (!func) {
      let arrValues = []
      arrValues.push(root.data)
      let n = 0
      while (n <= arr.length - 1) {
        const current = arr[n]
        if (current.left !== null) {
          arr.push(current.left)
          arrValues.push(current.left.data)
        }
        if (current.right !== null) {
          arr.push(current.right)
          arrValues.push(current.right.data)
        }
        n++
      }
      return arrValues
    }

    // let arrValuesFunc = []
    while (arr.length) {
      let current = arr.shift()
      if (current.left !== null) arr.push(current.left)
      if (current.right !== null) arr.push(current.right)
      // func(current)
      const result = func(current)
      console.log(result);
      
      // arrValuesFunc.push(result)
    }
    // return arrValuesFunc
  }

  inorder(func, root = this.root, arr = []) {
    if (root === null) {
      return
    }

    if (!func) {
      this.inorder(null, root.left, arr)
      arr.push(root.data)
      this.inorder(null, root.right, arr)
      return arr
    } else {
      this.inorder(func, root.left)
      console.log(func(root));
      this.inorder(func, root.right)
    }
  }

  preorder(func, root = this.root, arr = []) {
    if (root === null) {
      return
    }

    if (!func) {
      arr.push(root.data)
      this.preorder(null, root.left, arr)
      this.preorder(null, root.right, arr)
      return arr
    } else {
      console.log(func(root));
      this.preorder(func, root.left)
      this.preorder(func, root.right)
    }
  }

  postorder(func, root = this.root, arr = []) {
    if (root === null) {
      return
    }

    if (!func) {
      this.postorder(null, root.left, arr)
      this.postorder(null, root.right, arr)
      arr.push(root.data)
      return arr
    } else {
      this.postorder(func, root.left)
      this.postorder(func, root.right)
      console.log(func(root));
    }
  }

  height(node = this.root) {
    // base case
    if (node === null) { // empty BST
      return 0
    } else if (node.left === null && node.right === null) { // leaf node (includes BST with only a single node)
      return 0
    }

    const heightLeft = this.height(node.left) + 1
    const heightRight = this.height(node.right) + 1
    const maxHeight = Math.max(heightLeft, heightRight)
    return maxHeight
  }

  depth(node = this.root) {
    return this.height() - this.height(node)
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
    const arr = this.inorder()
    this.root = null
    this.buildTree(arr)
  }

}
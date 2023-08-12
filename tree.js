import Node from "./node.js"
import { prettyPrint } from "./pretty.js"

export default class Tree {
  constructor(arr) {
    this.arr = arr || null
    this.root = null
  }

  buildTree(arr, start, end) {
    let newArr = [...new Set(arr)] // remove duplicate values from array
    newArr.sort( (a, b) => a - b ) // sort array numerically
    
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

}


const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
let cleanedArr = [...new Set(arr)].sort( (a, b) => a - b );
const n = cleanedArr.length
// console.log(cleanedArr);

const tree = new Tree()
tree.buildTree(arr, 0, n - 1)

tree.insert(2)
tree.insert(43)
tree.insert(6)
tree.insert(1)
tree.delete(4)
tree.delete(23)
tree.delete(67)
console.log(tree.find(1))

prettyPrint(tree.root)

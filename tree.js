import Node from "./node.js"
import { prettyPrint } from "./pretty.js"

export default class Tree {
  constructor(arr) {
    this.arr = arr || null
    this.rootNode = null
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

    this.rootNode = rootNode

    return rootNode
  }

  insert(data, root = this.rootNode) {
    // base case
    if (root == null) {
      root = new Node(data)
      return root
    }

    if (data < root.data) {
        root.left = this.insert(data, root.left)
    } else if (data > root.data) {
        root.right = this.insert(data, root.right)
    }

    return root
  }

  // delete(data, root = this.rootNode) {
  //   // base case
  //   if (root == null) {
  //     return root
  //   }

  //   // recursively traverse BST
  //   if (data < root.data) {
  //     root.left = delete(data, root.left)
  //     return root
  //   } else if (data > root.data) {
  //     root.right = delete(data, root.right)
  //     return root
  //   }

  //   // if one child is null
  //   if (root.left == null) {
  //     let temp = root.right
  //     // delete root
  //     return temp
  //   } else if (root.right == null) {
  //     let temp = root.left
  //     // delete root
  //     return temp
  //   } else { // if both child nodes exist
  //     let succParent = root
  //     let succ = root.right // find successor
  //     while (succ.left !== null) {
  //       succParent = succ
  //       succ = succ.left
  //     }
  //     // delete successor
  //     if (succParent !== root) {
  //       succParent.left = succ.right
  //     } else {
  //       succParent.right = succ.right
  //     }
  //     root.data = succ.data // copy successor data to root
  //     // delete succ
  //     return root
  //   }
  // }

}


const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
let cleanedArr = [...new Set(arr)].sort( (a, b) => a - b );
const n = cleanedArr.length
// console.log(cleanedArr);

const tree = new Tree()
const root = tree.buildTree(arr, 0, n - 1)

console.log(tree.insert(2))
// console.log(tree.delete(7))
// console.log(tree.delete(9))

console.log(tree.rootNode.left.left.right.left);
prettyPrint(root)

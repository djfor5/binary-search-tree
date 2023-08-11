import Node from "./node.js"
import { prettyPrint } from "./pretty.js"

export default class Tree {
  constructor(arr) {
    this.arr = arr || null
    // root
  }

  buildTree(arr, start, end) {
    let newArr = [...new Set(arr)] // remove duplicate values from array
    newArr.sort( (a, b) => a - b ) // sort array numerically
    
    if (start > end) {
      return null
    }

    const midIndex = parseInt((start + end) / 2) // get middle index
    let rootNode = new Node(newArr[midIndex])

    rootNode.left = this.buildTree(arr, start, midIndex - 1)
    rootNode.right = this.buildTree(arr, midIndex + 1, end)

    return rootNode
  }

}


const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
let cleanedArr = [...new Set(arr)].sort( (a, b) => a - b );
const n = cleanedArr.length
console.log(cleanedArr);

const tree = new Tree()
const root = tree.buildTree(arr, 0, n - 1)

console.log(root);
prettyPrint(root)
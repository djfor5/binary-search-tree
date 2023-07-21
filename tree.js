import Node from "./node.js"
import { prettyPrint } from "./pretty.js"

export default class Tree {
  constructor(arr) {
    this.arr = arr || null
    // root
  }

  buildTree(arr) {
    // let newArr = [...new Set(arr)].sort((a, b) => a-b)
    let newArr = Array.from(arr)
    console.log(newArr);
    
    let nodeArr = []
    // const rootIndex = Math.round((arr.length - 1) / 2) // get middle index
    let rootIndex = 0
    let rootNode = new Node(newArr[rootIndex])
    nodeArr.push(rootNode)
    
    let currentNode = rootNode
    for (let i = 0; i < newArr.length; i++) {
      if (i === rootIndex) continue
      
      let isNull = false
      const newNode = new Node(newArr[i])
      console.log('\nindex', i);
      do {
        if (newNode.data < currentNode.data) {
          if (currentNode.left !== null) {
            currentNode = currentNode.left // traverse to left is there is an existing child node
          } else {
            currentNode.left = newNode
            console.log('newNode', newNode);
            console.log('currentNode', currentNode);
            isNull = true
          }
        } else if (newNode.data >= currentNode.data) {
          if (currentNode.right !== null) {
            currentNode = currentNode.right // traverse to right is there is an existing child node
          } else {
            currentNode.right = newNode
            console.log('newNode', newNode);
            console.log('currentNode', currentNode);
            isNull = true
          }
        }
        nodeArr.push(newNode)
      } while (!isNull)
    }
    return rootNode
  }
}


const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const tree = new Tree()
const root = tree.buildTree(arr)
prettyPrint(root)
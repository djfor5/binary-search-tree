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
// console.log(tree.find(1))
// tree.levelOrderIterative((x)=>{console.log(2*x.data)})
// tree.levelOrderIterative(func1)
// tree.levelOrderIterative((x)=>{(2*x.data)})
function func1(x) {
  return 2 * x.data
}
// console.log(tree.levelOrderIterative())
// console.log(tree.inorder())
// console.log(tree.inorder(func1))
console.log(tree.preorder())
console.log(tree.preorder(func1))

prettyPrint(tree.root)

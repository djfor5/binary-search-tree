import Tree from "./tree.js"
import { prettyPrint } from "./pretty.js"

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
let cleanedArr = [...new Set(arr)].sort( (a, b) => a - b );
const n = cleanedArr.length
// console.log(cleanedArr);

const tree = new Tree()
// const tree = new Tree(arr)
// tree.buildTree(arr, 0, n - 1)
tree.buildTree(arr)

// tree.insert(2)
// tree.insert(43)
// tree.insert(6)
// tree.insert(1)
tree.insert(10000)
tree.insert(100000)
tree.insert(1000000)
tree.insert(10000000)

// tree.delete(4)
// tree.delete(23)
// tree.delete(67)

// console.log(tree.find(1))

function func1(x) {
  return 2 * x.data
}
// console.log(tree.levelOrderIterative())
// tree.levelOrderIterative(func1)
// tree.levelOrderIterative((x)=>{(2*x.data)})
// tree.levelOrderIterative((x)=>{console.log(2*x.data)})

// console.log(tree.inorder())
// console.log(tree.inorder(func1))

// console.log(tree.preorder())
// console.log(tree.preorder(func1))

// console.log(tree.postorder())
// console.log(tree.postorder(func1))

// console.log(tree.height())
// console.log(tree.height(tree.root))

// console.log(tree.depth())
// console.log(tree.depth(tree.root.right.right))

console.log(tree.isBalanced())


// console.log(tree.height(tree.root.right))

prettyPrint(tree.root)

console.log(tree.rebalance())

prettyPrint(tree.root)


class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.arr = this.sort(this.removeDuplicates(arr));
    this.root = this.buildTree(this.arr, 0, this.arr.length - 1);
  }

  buildTree(array, low, high) {
    let root = new Node(null);

    // // remove duplicates
    // array = this.removeDuplicates(array);

    // // sort array
    // array = this.sort(array);

    // build tree from array

    let mid = Math.floor((low + high) / 2);
    root.data = array[mid];

    if (low > high) {
      return null;
    } else {
      root.left = this.buildTree(array, low, mid - 1);
      root.right = this.buildTree(array, mid + 1, high);
      return root;
    }
  }

  removeDuplicates(array) {
    return [...new Set(array)];
  }

  sort(array) {
    array.sort(function (a, b) {
      return a - b;
    });
    return array;
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value) {
    const root = this.root;
    let duplicateFound = false;

    if (root.data == value) {
      duplicateFound = true;
    } else {
      let currentNode = root;
      while (true) {
        if (value < currentNode.data) {
          if (currentNode.left != null) {
            currentNode = currentNode.left;
            // console.log("f");
          } else {
            let newNode = new Node(value);
            currentNode.left = newNode;
            break;
          }
        } else if (value > currentNode.data) {
          if (currentNode.right != null) {
            currentNode = currentNode.right;
            // console.log("a");
          } else {
            let newNode = new Node(value);
            currentNode.right = newNode;
            break;
          }
        } else {
          duplicateFound = true;
          break;
        }
      }
    }

    if (duplicateFound) {
      return "Duplicate Found. Cannot insert value.";
    } else {
      return "Value inserted";
    }
  }

  find(value) {
    const root = this.root;

    let currentNode = root;
    while (true) {
      if (value < currentNode.data) {
        if (currentNode.left != null) {
          currentNode = currentNode.left;
        } else {
          return "Not Found!";
        }
      } else if (value > currentNode.data) {
        if (currentNode.right != null) {
          currentNode = currentNode.right;
        } else {
          return "Not Found!";
        }
      } else {
        return "Found!";
      }
    }
  }
}

let arr1 = [11, 22, 44, 6, 32, 63, 12, 34];
let t = new Tree(arr1);

t.prettyPrint(t.root);

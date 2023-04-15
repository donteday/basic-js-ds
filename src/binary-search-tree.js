const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {
  constructor() {
    this.radix = null;
  }

  root() {
    return this.radix;
  }

  add(data) {
    let newNode = new Node(data);

    if (this.radix === null) {
      this.radix = newNode;
      return this;
    }

    let current = this.radix;

    while (current) {
      if (data === current.data) return undefined;

      if (data < current.data) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }


  has(data) {
    return scanTree(this.radix, data);

    function scanTree(unit, data) {
      if (!unit) return false;

      if (unit.data === data) return true;

      return data < unit.data ? scanTree(unit.left, data) : scanTree(unit.right, data);
    };
  }

  find(data) {
    if (!this.radix) return false;

    let current = this.radix;

    let detected = false;

    while (current && !detected) {
      if (data < current.data) {
        current = current.left
      } else if (data > current.data) {
        current = current.right;
      } else {
        detected = current;
      }
    }

    if (!detected) return null;
    return detected;

  }

  remove(data) {
    this.radix = removeUnit(this.radix, data);

    function removeUnit(unit, data) {
      if (!unit) return null;
      
      if (data < unit.data) {
        unit.left = removeUnit(unit.left, data);
        return unit;
      } else if (data > unit.data) {
        unit.right = removeUnit(unit.right, data);
        return unit;
      } else {
        if (!unit.left && !unit.right) return null;

        if (!unit.left) return unit = unit.right;

        if (!unit.right) return unit = unit.left;

        let minRightUnit = unit.right;
        
        while(minRightUnit.left) {
          minRightUnit = minRightUnit.left;
        }
        unit.data = minRightUnit.data;

        unit.right = removeUnit(unit.right, minRightUnit.data);

        return unit;

      }
    }
  }

  min() {
    if (!this.radix) return;

    let unit = this.radix;
    while (unit.left) {
      unit = unit.left
    }

    return unit.data;
  }

  max() {
    if (!this.radix) return;

    let unit = this.radix;
    while (unit.right) {
      unit = unit.right
    }

    return unit.data;
  }
}

module.exports = {
  BinarySearchTree
};
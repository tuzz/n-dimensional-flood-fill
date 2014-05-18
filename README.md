## floodFill.js

A non-recursive, n-dimensional implementation of flood fill.

## Usage

Let's say we'd like to call the flood fill algorithm on a two-dimensional data structure.

```javascript
// Some data structure that we'd like to flood fill.
var data = [
  [0, 0, 1],
  [0, 1, 1],
  [1, 1, 0]
];

// Define our getter for accessing the data structure.
var getter = function (x, y) {
  return data[y][x];
};

// Choose a start node.
var seed = [1, 1];

// Flood fill over the data structure.
var result = floodFill({
  getter: getter,
  seed: seed
});

// Get the flooded nodes from the result.
result.flooded
```

Flooded nodes are returned as a nested array of arguments:

```javascript
[[1, 1], [2, 1], [2, 0], [1, 2], [0, 2]]
```

## onFlood

You can call a function when a node is flooded with the 'onFlood' option.

It is important that you do not modifying the data structure that floodFill is iterating over. Instead, make a copy first:

```javascript
var copy = data.slice(0);

floodFill({
  getter: getter,
  seed: seed,
  onFlood: function (x, y) {
    copy[y][x] = 5;
  }
});
```

The copied data structure would now look like this:

```javascript
[
  [0, 0, 5],
  [0, 5, 5],
  [5, 5, 0]
];
```

## n-dimensions
You can use floodFill in any number of dimensions:

```javascript
var data = [0, 0, 1, 1, 0, 1];

var result = floodFill({
  getter: function (x) { return data[x]; },
  seed: [3]
});

result.flooded; // [[3], [2]];
```

The number of dimensions will be inferred from your seed.

## Equivalence

If you're equivalence relation is more complicated, you can set it with the 'equals' option.

```javascript
var data = [
  ["foo", "bar"],
  ["qux", "baz"]
];

// Flood cells start with the same letter.
var equals = function (a, b) {
  return a[0] === b[0];
};

var result = floodFill({
  getter: getter,
  seed: [1, 1],
  equals: equals
});

result.flooded; // [[1, 1], [1, 0]]
```

## Boundaries

You can capture or call a function when a boundary between a flooded and non-flooded cell is reached.

This includes cells at the edges of your data structure.

```javascript
var data = [0, 0, 1, 1, 1, 1, 1];

var result = floodFill({
  getter: function (x) { return data[x]; },
  seed: [3],
  onBoundary: function (x) {
    console.log(x, " is a boundary.");
  }
});

result.boundaries; // [[6], [2]]
```

## Diagonals

By default, floodFill will not visit diagonal nodes.

If you started in the middle of the following data structure, the top-left node would not be included.

```
1 0 0
0 1 1
0 1 1
```

You can change this behaviour with the 'diagonals' option.

```javascript
floodFill({
  getter: getter,
  seed: seed,
  diagonals: true
});
```

This will work for any number of dimensions.

## Contribution

Please send a pull request or open an issue.

You should follow me on [twitter](https://twitter.com/cpatuzzo).

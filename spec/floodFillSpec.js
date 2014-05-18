test("it works for the 'Usage' example in the readme", function () {
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
  var expectation = [[1, 1], [2, 1], [2, 0], [1, 2], [0, 2]];
  deepEqual(result.flooded, expectation);
});

test("it works for the 'onFlood' example in the readme", function () {
  var data = [
    [0, 0, 1],
    [0, 1, 1],
    [1, 1, 0]
  ];

  var getter = function (x, y) {
    return data[y][x];
  };

  var seed = [1, 1];

  var copy = data.slice(0);

  floodFill({
    getter: getter,
    seed: seed,
    onFlood: function (x, y) {
      copy[y][x] = 5;
    }
  });

  var expectation = [
    [0, 0, 5],
    [0, 5, 5],
    [5, 5, 0]
  ];

  deepEqual(copy, expectation);
});

test("it works for the 'n-dimensions' example in the readme", function () {
  var data = [0, 0, 1, 1, 0, 1];

  var result = floodFill({
    getter: function (x) { return data[x]; },
    seed: [3]
  });

  var expectation = [[3], [2]];
  deepEqual(result.flooded, expectation);
});

test("it works for the 'Equivalence' example in the readme", function () {
  var data = [
    ["foo", "bar"],
    ["qux", "baz"]
  ];

  var getter = function (x, y) {
    return data[y][x];
  };

  // Flood cells start with the same letter.
  var equals = function (a, b) {
    return a[0] === b[0];
  };

  var result = floodFill({
    getter: getter,
    seed: [1, 1],
    equals: equals
  });

  deepEqual(result.flooded, [[1, 1], [1, 0]]);
});

test("it works for the 'Boundaries' example in the readme", function () {
  var data = [0, 0, 1, 1, 1, 1, 1];
  var capturedBoundaries = [];

  var result = floodFill({
    getter: function (x) { return data[x]; },
    seed: [3],
    onBoundary: function (x) {
      capturedBoundaries.push(x);
    }
  });

  var expectation = [[2], [6]];
  deepEqual(result.boundaries, expectation);

  var expectation = [2, 6];
  deepEqual(capturedBoundaries, expectation);
});

test("it works for the 'Diagonals' example in the readme", function () {
  var data = [
    [1, 0, 0]
    [0, 1, 1]
    [0, 1, 1]
  ];

  var getter = function (x, y) {
    return data[y][x];
  };

  var seed = [1, 1];

  var result = floodFill({
    getter: getter,
    seed: seed,
    diagonals: true
  });

  var expectation = [[1, 1], [2, 1], [2, 2], [1, 2], [0, 0]];
  deepEqual(result.flooded, expectation);
});

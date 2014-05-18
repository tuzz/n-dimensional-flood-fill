test("it floods in one dimension", function () {
  var data = [0, 1, 1, 0];
  var getter = function (x) { return data[x]; }
  var seed = [1];

  var result = floodFill({
    getter: getter,
    seed: seed,
  });

  deepEqual(result.flooded, [[1], [2]]);
});

test("it floods in two dimensions", function () {
  var data = [
    [0, 1, 0],
    [1, 1, 0],
    [0, 0, 0]
  ];

  var getter = function (x, y) {
    return data[y][x];
  };

  var seed = [1, 1];

  var result = floodFill({
    getter: getter,
    seed: seed,
  });

  var expectation = [[1, 1], [1, 0], [0, 1]];
  deepEqual(result.flooded, expectation);
});

test("it floods in three dimensions", function () {
  var cube = [
    [
      [1, 0, 0], // ---
      [1, 0, 1], // ---, 9th
      [0, 0, 1]  // 8th
    ],
    [
      [0, 1, 0], // 2nd
      [0, 1, 0], // 1st
      [0, 0, 1]  // 7th
    ],
    [
      [0, 1, 1], // 3rd, 4th
      [0, 0, 1], // 5th
      [0, 0, 1]  // 6th
    ]
  ];

  var getter = function (x, y, z) {
    return cube[z][y][x];
  };

  var result = floodFill({
    getter: getter,
    seed: [1, 1, 1]
  });

  var expectation = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 2],
    [2, 0, 2],
    [2, 1, 2],
    [2, 2, 2],
    [2, 2, 1],
    [2, 2, 0],
    [2, 1, 0]
  ];
  deepEqual(result.flooded, expectation);
});

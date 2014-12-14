"use strict";

describe("diagonals", function () {
  it("can be flooded diagonally", function () {
    var data = [
      [1, 0],
      [0, 1]
    ];

    var getter = function (x, y) {
      return data[y][x];
    };

    var result = floodFill({
      getter: getter,
      seed: [0, 0],
      diagonals: true
    });

    expect(result.flooded).toEqual([[0, 0], [1, 1]]);
  });
});

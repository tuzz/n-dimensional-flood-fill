"use strict";

describe("boundaries", function () {
  it("does not duplicate boundaries", function () {
    var data = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0]
    ];

    var getter = function (x, y) {
      return data[y][x];
    };

    var result = floodFill({
      getter: getter,
      seed: [1, 1]
    });

    expect(result.boundaries).toEqual([[1, 1]]);
  });
});

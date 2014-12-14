"use strict";

module.exports = function (options) {
  var getter,
      seed,
      onFlood,
      onBoundary,
      equals,
      diagonals,
      startNode,
      permutations,
      stack,
      flooded,
      visits,
      bounds;

  var initialize = function () {
    getter       = options.getter;
    seed         = options.seed;
    onFlood      = options.onFlood    || noop;
    onBoundary   = options.onBoundary || noop;
    equals       = options.equals     || defaultEquals;
    diagonals    = options.diagonals  || false;
    startNode    = get(seed);
    permutations = prunedPermutations();
    stack        = [];
    flooded      = [];
    visits       = {};
    bounds       = {};
  };

  var main = function () {
    stack.push({ currentArgs: seed });

    while (stack.length > 0) {
      flood(stack.pop());
    }

    return {
      flooded: flooded,
      boundaries: boundaries()
    };
  };

  var flood = function (job) {
    var getArgs  = job.currentArgs;
    var prevArgs = job.previousArgs;

    if (visited(getArgs)) {
      return;
    }
    markAsVisited(getArgs);

    if (member(getArgs)) {
      markAsFlooded(getArgs);
      pushAdjacent(getArgs);
    }
    else {
      markAsBoundary(prevArgs);
    }
  };

  var visited = function (key) {
    return visits[key] === true;
  };

  var markAsVisited = function (key) {
    visits[key] = true;
  };

  var member = function (getArgs) {
    var node = safely(get, [getArgs]);
    return safely(equals, [node, startNode]);
  };

  var markAsFlooded = function (getArgs) {
    flooded.push(getArgs);
    onFlood.apply(undefined, getArgs);
  };

  var markAsBoundary = function (prevArgs) {
    bounds[prevArgs] = prevArgs;
    onBoundary.apply(undefined, prevArgs);
  };

  var pushAdjacent = function (getArgs) {
    for (var i = 0; i < permutations.length; i += 1) {
      var perm = permutations[i];
      var nextArgs = getArgs.slice(0);

      for (var j = 0; j < getArgs.length; j += 1) {
        nextArgs[j] += perm[j];
      }

      stack.push({
        currentArgs: nextArgs,
        previousArgs: getArgs
      });
    }
  };

  var get = function (getArgs) {
    return getter.apply(undefined, getArgs);
  };

  var safely = function (f, args) {
    try { return f.apply(undefined, args); } catch (error) {}
  };

  var noop = function () {};

  var defaultEquals = function (a, b) {
    return a === b;
  };

  var prunedPermutations = function () {
    var permutations = permute(seed.length);

    return permutations.filter(function (perm) {
      var count = countNonZeroes(perm);
      return (count !== 0) && (count === 1 || diagonals);
    });
  };

  var permute = function (length) {
    var perms = [];

    var permutation = function (string) {
      return string.split("").map(function (c) {
        return parseInt(c, 10) - 1;
      });
    };

    for (var i = 0; i < Math.pow(3, length); i += 1) {
      var string = lpad(i.toString(3), "0", length);
      perms.push(permutation(string));
    }

    return perms;
  };

  var lpad = function (string, character, length) {
    var array = new Array(length + 1);
    var pad = array.join(character);
    return (pad + string).slice(-length);
  };

  var countNonZeroes = function (array) {
    var count = 0;

    for (var i = 0; i < array.length; i += 1) {
      if (array[i] !== 0) {
        count += 1;
      }
    }

    return count;
  };

  var boundaries = function () {
    var array = [];

    for (var key in bounds) {
      if (bounds.hasOwnProperty(key)) {
        array.unshift(bounds[key]);
      }
    }

    return array;
  };

  initialize();
  return main();
};

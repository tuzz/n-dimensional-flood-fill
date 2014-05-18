var floodFill = function (options) {
  var getter, seed, startNode, stack, visits, flooded, onFlood;

  var initialize = function () {
    getter    = options.getter;
    seed      = options.seed;
    onFlood   = options.onFlood || noop;
    equals    = options.equals  || defaultEquals;
    startNode = get(seed);
    stack     = [];
    flooded   = [];
    visits    = {};
  };

  var main = function () {
    stack.push(seed);

    while (stack.length > 0) {
      flood(stack.pop());
    }

    return {
      flooded: flooded
    }
  };

  var flood = function (getArgs) {
    if (visited(getArgs)) {
      return;
    }
    markAsVisited(getArgs);

    if (member(getArgs)) {
      markAsFlooded(getArgs);
      pushAdjacent(getArgs);
    }
  };

  var visited = function (key) {
    return visits[key] === true
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

  var pushAdjacent = function (getArgs) {
    for (var i = 0; i < getArgs.length; i++) {
      for (var j = -1; j <= 1; j += 2) {
        var nextArgs = getArgs.slice(0);
        nextArgs[i] = nextArgs[i] + j;

        stack.push(nextArgs);
      }
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

  initialize();
  return main();
};

var floodFill = function (options) {
  var getter, seed, startNode, stack, visits, flooded;

  var initialize = function () {
    getter    = options.getter;
    seed      = options.seed;
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
      flooded.push(getArgs);
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
    var node = getSafely(getArgs);
    return node === startNode;
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

  var getSafely = function (getArgs) {
    try { return get(getArgs); } catch (error) {}
  };

  initialize();
  return main();
};

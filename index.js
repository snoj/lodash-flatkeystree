var _ = require('lodash');

function keysDeep(obj, depth) {
  depth || (depth = 1);
  var r = {};
  var objTraversed = [];
  function keysDeepInternal(o, treepath) {
    if(o.__keysDeepTraversed == 0) {
      return;
    }


    if(o.__keysDeepTraversed == -1)
      o.__keysDeepTraversed = depth;

    if(typeof o.__keysDeepTraversed == 'undefined')
      Object.defineProperty(o, '__keysDeepTraversed', {enumerable:false, value: depth, writable: true});

    o.__keysDeepTraversed--;

    objTraversed.push(o);

    treepath || (treepath = "");

    _.each(o, function(v, k) {
      var nk = (treepath.length > 0 ? treepath + "." : "") + k;
      switch(true) {
        case typeof v == 'string':
        case typeof v == 'number':
        case typeof v == 'function':
        case typeof v == 'boolean':
        case typeof v == 'undefined':
        case v instanceof RegExp:
        case v instanceof Promise:
        case v === null:
          r[nk] = v;
          return;
      }
      keysDeepInternal(v, nk);
    });
  }
  keysDeepInternal(obj, "");

  //cleanup traversal flag
  _.each(objTraversed, function(o) {
    o.__keysDeepTraversed = -1;
  });

  return _.keys(r);
}

module.exports = {keysDeep: keysDeep};

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
    //console.log(typeof o.__keysDeepTraversed, o.__keysDeepTraversed);
    o.__keysDeepTraversed = -1;
  });

  //obj.__keysDeepTraversed = 0;
  return _.keys(r);
}

module.exports = {keysDeep: keysDeep};

/*_.mixin({
  keysDeep:
});

var recurseObj = {
  a: { level: {d:1, b: 2}},
  b: [1,2,34,5,6],
  pt: Promise.resolve("a resolved promise")
};
recurseObj.a.level.deeper = recurseObj;
recurseObj.b.push(recurseObj);
recurseObj.b.push({a: recurseObj, b:7});

var te = {
  lvl1: {o:544, k: {test: [1,2,3,4,5,{inserted:false}]}, p: ["gasg", {y:1, n: null}]}, "another": {tree:0}, arr: [1,2,3,4], u : (undefined)
};

console.log(JSON.stringify(_.keysDeep(te), null, "  "));
console.log(JSON.stringify(_.keysDeep(recurseObj, 2), null, "  "));
*/

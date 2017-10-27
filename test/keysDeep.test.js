var assert = require('assert');
var _ = require('lodash');
var keysDeep = require('../index.js');

_.mixin(keysDeep);


describe("_.keysDeep mixin", function() {

  it("mixin success", function() {
    assert(typeof _.keysDeep, 'function');
  });

  it("throw error if __keysDeepTraversed isn't -1", function(done) {
    var o = {a:1, b:2};
    _.keysDeep(o);
    assert.equal(o.__keysDeepTraversed, -1);
    done()
  })

  it("No circulars", function() {
    var circularObject = {
      a: [1,2,3,4,5],
      b: { b2: 1 }
    };

    circularObject.a.push(circularObject);
    circularObject.b.cir = circularObject;
    circularObject.cir = circularObject;
    circularObject.c = {o: 1, cir: circularObject.b};
    circularObject.c.cir.test = 5;

    var flattenedKeys = _.keysDeep(circularObject, 1);

    assert(_.includes(flattenedKeys, 'a.2'));
    assert(_.includes(flattenedKeys, 'b.test'));
    assert(!_.includes(flattenedKeys, 'a.5.a.0'));
    assert(!_.includes(flattenedKeys, 'c.cir'));
  });

  it("Depth > 1", function() {
    var circularObject = {
      a: [1,2,3,4,5],
      b: { b2: 1 }
    };

    circularObject.a.push(circularObject);
    circularObject.b.cir = circularObject;
    circularObject.cir = circularObject;

    var flattenedKeys = _.keysDeep(circularObject, 2);

    assert(_.includes(flattenedKeys, 'a.2'));
    assert(_.includes(flattenedKeys, 'a.5.a.0'));
    assert.equal(typeof _.get(circularObject, 'a.5.a.0'), 'number');
    assert.equal(_.get(circularObject, 'a.5.a.0'), 1);
  });
});

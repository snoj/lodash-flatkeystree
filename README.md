# Install
npm install lodash-flatkeystree

# Purpose

Need a way to get all the key paths in an object? Look no further.

Also ignores circular references in an object.

# _.keysDeep(object, [depth = 1])

#### Arguments

* object: The object to get keys from
* depth: The number of circular objects to traverse/include. (default 1)

# Use

```js
var _ = require('lodash'), keysDeep = require('lodash-flatkeystree');

_.mixin(keysDeep);

var obj = {
  a: {tree: ['that', 'goes', {deep: '!'}]},
  b: [1,2,3,5,8,13, {another: {key: [13,8,5,3,2,1]}}]
};

_.keysDeep(obj);

[ 'a.tree.0',
  'a.tree.1',
  'a.tree.2.deep',
  'b.0',
  'b.1',
  'b.2',
  'b.3',
  'b.4',
  'b.5',
  'b.6.another.key.0',
  'b.6.another.key.1',
  'b.6.another.key.2',
  'b.6.another.key.3',
  'b.6.another.key.4',
  'b.6.another.key.5' ];

```

#### Circular with depth > 1
```js
var circularObj = {
  a: {tree: ['that', 'goes', {deep: '!'}]},
  b: [1,2,3,5,8,13, {another: {key: [13,8,5,3,2,1]}}]
};

circularObj.c = {
  cir: circularObj.a,
  something: 'else'
};

_.keysDeep(circularObj, 2);

[ 'a.tree.0',
  'a.tree.1',
  'a.tree.2.deep',
  'b.0',
  'b.1',
  'b.2',
  'b.3',
  'b.4',
  'b.5',
  'b.6.another.key.0',
  'b.6.another.key.1',
  'b.6.another.key.2',
  'b.6.another.key.3',
  'b.6.another.key.4',
  'b.6.another.key.5',
  'c.cir.tree.0',
  'c.cir.tree.1',
  'c.cir.tree.2.deep',
  'c.something' ]

```

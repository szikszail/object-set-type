# object-set-type

![Downloads](https://img.shields.io/npm/dw/object-set-type?style=flat-square)
![Version@npm](https://img.shields.io/npm/v/object-set-type?label=version%40npm&style=flat-square)
![Version@git](https://img.shields.io/github/package-json/v/szikszail/object-set-type/master?label=version%40git&style=flat-square)

A Set implementation which supports **Objects** and **custom conditions**.

## Usage

```javascript
'use strict';

const ObjectSet = require('object-set-type');

const set = new ObjectSet();
set.add(1);
set.add('Hello');
set.add({
    a: 1
});
set.add({
    a: 1
});

console.log(set.size); // 3
Array.from(set); // 1, "Hello", {a: 1}
```

## Custom uniqueness logic

The `equals(a,b)` method of the instance is responsible for comparing two items, and the set logic is based on this. This method can be overwritten to support custom uniqueness logic, e.g. handle objects, but compare only certain properties.

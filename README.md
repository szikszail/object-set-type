# object-set-type

A Set implementation which supports Objects.

## Usage

```javascript
'use strict';

const ObjectSet = require('object-set-type');

const set = new ObjectSet();
set.add(1);
set.add('Hello');
set.add({a: 1});
set.add({a: 1});

console.log(set.size); // 3
Array.from(set); // 1, "Hello", {a: 1}
```
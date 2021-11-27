# object-set-type

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

## Custom conditions

The `equals(a,b)` method of the instance is responsible for comparing two items, and the set logic is based on this. This method can be overwritten to support custom logic.

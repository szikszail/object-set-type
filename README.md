# object-set-type

[![Build Status](https://travis-ci.org/szikszail/object-set.svg?branch=master)](https://travis-ci.org/szikszail/object-set) [![dependency Status](https://david-dm.org/szikszail/object-set.svg)](https://david-dm.org/szikszail/object-set) [![devDependency Status](https://david-dm.org/szikszail/object-set/dev-status.svg)](https://david-dm.org/szikszail/object-set#info=devDependencies) [![Coverage Status](https://coveralls.io/repos/github/szikszail/object-set/badge.svg?branch=master)](https://coveralls.io/github/szikszail/object-set?branch=master)

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
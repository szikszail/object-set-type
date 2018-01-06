'use strict';

const deepEqual = require('deep-eql');

class ObjectSet extends Set {
    has(needle) {
        for (let item of this) {
            if (deepEqual(needle, item)) {
                return true;
            }
        }
        return false;
    }

    add(item) {
        if (!this.has(item)) {
            return super.add(item);
        }
        return this;
    }
}

module.exports = ObjectSet;
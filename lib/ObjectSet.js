'use strict';

const deepEqual = require('deep-eql');

const ENTRIES = Symbol('entries');

class ObjectSet extends Set {
    constructor(iterable) {
        super();
        this[ENTRIES] = [];

        if (iterable) {
            for (const item of iterable) {
                this.add(item);
            }
        }
    }

    equals(a, b) {
        return deepEqual(a, b);
    }

    has(needle) {
        for (let item of this[ENTRIES]) {
            if (this.equals(needle, item)) {
                return true;
            }
        }
        return false;
    }

    get size() {
        return this[ENTRIES].length;
    }

    delete(item) {
        for (let i = 0; i < this.size; ++i) {
            if (this.equals(item, this[ENTRIES][i])) {
                this[ENTRIES].splice(i, 1);
                return true;
            }
        }
        return false;
    }

    add(item) {
        if (typeof item === 'undefined') {
            return this;
        }
        if (!this.has(item)) {
            return this[ENTRIES].push(item);
        }
        return this;
    }

    clear() {
        this[ENTRIES] = [];
    }

    [Symbol.iterator]() {
        return this[ENTRIES][Symbol.iterator]();
    }

    keys() {
        return this[Symbol.iterator]();
    }

    values() {
        return this[Symbol.iterator]();
    }

    *entries() {
        for (const e of this[ENTRIES]) {
            yield [e, e];
        }
    }

    forEach(callbackFn, thisArg) {
        for (const e of this[ENTRIES]) {
            if (thisArg) {
                callbackFn.call(thisArg, e);
            } else {
                callbackFn(e);
            }
        }
    }
}

module.exports = ObjectSet;
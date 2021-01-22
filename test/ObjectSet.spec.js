'use strict';

const ObjectSet = require('../lib/ObjectSet');
const expect = require('chai').expect;

function checkIterator(iterator, expected) {
    const items = Array.from(iterator);
    expect(items).to.have.lengthOf(expected.length);
    expect(items).to.eql(expected);
}

describe('ObjectSet', () => {
    let set;

    beforeEach(() => {
        set = new ObjectSet();
    });

    it('should be a Set', () => {
        expect(set).to.be.instanceOf(Set);
    });

    describe('constructor', () => {
        it('should make empty set', () => {
            expect(set.size).to.equal(0);
        });

        it('should handle object in constructor too', () => {
            set = new ObjectSet([{ a: 1 }, { a: 1 }]);

            expect(set.size).to.equal(1);
        });
    });

    describe('.add, .has', () => {
        it('should add simple value', () => {
            set.add(1);
            set.add(2);

            expect(set.has(1)).to.be.true;
            expect(set.has(2)).to.be.true;
        });

        it('should not add an item twice', () => {
            set.add(1);
            set.add(1);

            expect(set.size).to.equal(1);
        });

        it('should not add object value twice', () => {
            set.add({ a: 1 });
            set.add({ a: 1 });

            expect(set.size).to.equal(1);
        });

        it('should not add empty value', () => {
            set.add();

            expect(set.size).to.equal(0);
        });
    });

    describe('.delete', () => {
        it('should delete object', () => {
            set.add({ a: 1 });
            set.add({ b: 2 });

            expect(set.delete({ a: 1 })).to.be.true;
            expect(set.size).to.equal(1);
        });

        it('should not delete not existing', () => {
            set.add({ a: 1 });

            expect(set.delete({ a: 2 })).to.be.false;
            expect(set.size).to.equal(1);
        });
    });

    describe('.clear', () => {
        it('should clear set', () => {
            set.add({ a: 1 });

            expect(set.size).to.equal(1);

            set.clear();

            expect(set.size).to.equal(0);
        });
    });

    describe('@@iterator', () => {
        it('should iterate over all values', () => {
            set.add(1);
            set.add(2);

            checkIterator(set, [1, 2]);
        });

        it('should iterate over empty set', () => {
            checkIterator(set, []);
        });
    });

    describe('.values', () => {
        it('should iterate over all values', () => {
            set.add(1);
            set.add(2);

            checkIterator(set.values(), [1, 2]);
        });

        it('should iterate over empty set', () => {
            checkIterator(set.values(), []);
        });
    });

    describe('.keys', () => {
        it('should iterate over all values', () => {
            set.add(1);
            set.add(2);

            checkIterator(set.keys(), [1, 2]);
        });

        it('should iterate over empty set', () => {
            checkIterator(set.keys(), []);
        });
    });

    describe('.entries', () => {
        it('should iterate over all values', () => {
            set.add(1);
            set.add(2);

            checkIterator(set.entries(), [[1, 1], [2, 2]]);
        });

        it('should iterate over empty set', () => {
            checkIterator(set.entries(), []);
        });
    });

    describe('.forEach', () => {
        it('should work without this', () => {
            set.add(1);
            set.add(2);

            const items = [];
            set.forEach(v => {
                items.push(v);
            });
            expect(items).to.have.lengthOf(2);
            expect(items).to.eql([1, 2]);
        });

        it('should work with thisArg', () => {
            set.add(1);
            set.add(2);

            const items = [];
            set.forEach(function (v) {
                this.push(v);
            }, items);
            expect(items).to.have.lengthOf(2);
            expect(items).to.eql([1, 2]);
        });
    });
});
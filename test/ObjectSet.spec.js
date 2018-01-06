'use strict';

const ObjectSet = require('../index');
const expect = require('chai').expect;

describe('ObjectSet', () => {
    let set;

    beforeEach(() => {
        set = new ObjectSet();
    });

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
        set.add({a : 1});
        set.add({a : 1});

        expect(set.size).to.equal(1);
    });

    it('should handle object in constructor too', () => {
        set = new ObjectSet([{a: 1}, {a: 1}]);

        expect(set.size).to.equal(1);
    });
})
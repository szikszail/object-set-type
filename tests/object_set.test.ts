import ObjectSet from "../src";

function checkIterator(iterator: Iterable<any>, expected: any[]) {
  const items = Array.from(iterator);
  expect(items).toHaveLength(expected.length);
  expect(items).toEqual(expected);
}

class CustomSet extends ObjectSet<number> {
  equals(a: number, b: number) {
    return a % 2 == b % 2;
  }
}

describe("ObjectSet", () => {
  let set: ObjectSet;

  beforeEach(() => {
    set = new ObjectSet();
  });

  it("should be a Set", () => {
    expect(set).toBeInstanceOf(Set);
  });

  describe("constructor", () => {
    it("should make empty set", () => {
      expect(set.size).toEqual(0);
    });

    it("should handle object in constructor too", () => {
      set = new ObjectSet([{ a: 1 }, { a: 1 }]);

      expect(set.size).toEqual(1);
    });
  });

  describe(".equals", () => {
    it("should support custom comparator", () => {
      const customSet = new CustomSet([1, 2, 3, 4]);
      expect(customSet.size).toEqual(2);
      expect(customSet.has(1)).toEqual(true);
      expect(customSet.has(2)).toEqual(true);
    });
  });

  describe(".add, .has", () => {
    it("should add simple value", () => {
      set.add(1);
      set.add(2);

      expect(set.has(1)).toEqual(true);
      expect(set.has(2)).toEqual(true);
    });

    it("should not add an item twice", () => {
      set.add(1);
      set.add(1);

      expect(set.size).toEqual(1);
    });

    it("should not add object value twice", () => {
      set.add({ a: 1 });
      set.add({ a: 1 });

      expect(set.size).toEqual(1);
    });

    it("should not add empty value", () => {
      set.add();

      expect(set.size).toEqual(0);
    });
  });

  describe(".delete", () => {
    it("should delete object", () => {
      set.add({ a: 1 });
      set.add({ b: 2 });

      expect(set.delete({ a: 1 })).toEqual(true);
      expect(set.size).toEqual(1);
    });

    it("should not delete not existing", () => {
      set.add({ a: 1 });

      expect(set.delete({ a: 2 })).toEqual(false);
      expect(set.size).toEqual(1);
    });
  });

  describe(".clear", () => {
    it("should clear set", () => {
      set.add({ a: 1 });

      expect(set.size).toEqual(1);

      set.clear();

      expect(set.size).toEqual(0);
    });
  });

  describe("@@iterator", () => {
    it("should iterate over all values", () => {
      set.add(1);
      set.add(2);

      checkIterator(set, [1, 2]);
    });

    it("should iterate over empty set", () => {
      checkIterator(set, []);
    });
  });

  describe(".values", () => {
    it("should iterate over all values", () => {
      set.add(1);
      set.add(2);

      checkIterator(set.values(), [1, 2]);
    });

    it("should iterate over empty set", () => {
      checkIterator(set.values(), []);
    });
  });

  describe(".keys", () => {
    it("should iterate over all values", () => {
      set.add(1);
      set.add(2);

      checkIterator(set.keys(), [1, 2]);
    });

    it("should iterate over empty set", () => {
      checkIterator(set.keys(), []);
    });
  });

  describe(".entries", () => {
    it("should iterate over all values", () => {
      set.add(1);
      set.add(2);

      checkIterator(set.entries(), [
        [1, 1],
        [2, 2],
      ]);
    });

    it("should iterate over empty set", () => {
      checkIterator(set.entries(), []);
    });
  });

  describe(".forEach", () => {
    it("should work without this", () => {
      set.add(1);
      set.add(2);

      const items: number[] = [];
      set.forEach((v) => {
        items.push(v);
      });
      expect(items).toHaveLength(2);
      expect(items).toEqual([1, 2]);
    });

    it("should work with thisArg", () => {
      set.add(1);
      set.add(2);

      const items: number[] = [];
      set.forEach(function (v) {
        this.push(v);
      }, items);
      expect(items).toHaveLength(2);
      expect(items).toEqual([1, 2]);
    });
  });

  describe(".copy", () => {
    it("should copy simple sets", () => {
      set.add(1);
      set.add(2);

      const copy = set.copy();
      expect(copy).toContain(1);
      expect(copy).toContain(2);
    });

    it("should copy custom sets", () => {
      const cset = new CustomSet();

      cset.add(1);
      cset.add(3);

      const copy = cset.copy();
      expect(copy.size).toBe(1);
      expect(copy).toContain(1);
    });
  });

  describe(".difference", () => {
    it("should calculate difference", () => {
      set.add({ a: 1 });

      const set2 = new ObjectSet();
      set2.add({ a: 2 });
      set2.add(2);

      const diff = set.difference(set2);
      console.log(diff);
    });
  });
});

import deepEqual from "deep-eql";

const ENTRIES = Symbol("entries");

/**
 * Extended implementation of Set, to support
 * objects and custom comparison logic.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set}
 */
export class ObjectSet<T = any> extends Set<T> {
  private [ENTRIES]: T[];

  constructor(iterable?: Iterable<T>) {
    super();
    this[ENTRIES] = [];

    if (iterable) {
      for (const item of iterable) {
        this.add(item);
      }
    }
  }

  public copy() {
    const Constructor: new (iterable?: Iterable<T>) => this = this.constructor as any;
    return new Constructor(this.values());
  }

  public equals(a: T, b: T): boolean {
    return deepEqual(a, b);
  }

  public has(needle: T): boolean {
    for (const item of this[ENTRIES]) {
      if (this.equals(needle, item)) {
        return true;
      }
    }
    return false;
  }

  public delete(item: T): boolean {
    for (let i = 0; i < this.size; ++i) {
      if (this.equals(item, this[ENTRIES][i])) {
        this[ENTRIES].splice(i, 1);
        return true;
      }
    }
    return false;
  }

  public add(item?: T) {
    if (typeof item !== "undefined" && !this.has(item)) {
      this[ENTRIES].push(item);
    }
    return this;
  }

  public clear(): void {
    this[ENTRIES] = [];
  }

  public [Symbol.iterator]() {
    return this[ENTRIES][Symbol.iterator]();
  }

  public keys(): SetIterator<T> {
    return this[Symbol.iterator]();
  }

  public values(): SetIterator<T> {
    return this[Symbol.iterator]();
  }

  public *entries(): SetIterator<[T, T]> {
    for (const e of this[ENTRIES]) {
      yield [e, e];
    }
  }

  get size() {
    return this[ENTRIES].length;
  }

  public forEach(callbackfn: (value: T, value2: T, set: ObjectSet<T>) => void, thisArg?: any): void {
    for (const e of this[ENTRIES]) {
      if (thisArg) {
        callbackfn.call(thisArg, e, e, this);
      } else {
        callbackfn(e, e, this);
      }
    }
  }
}

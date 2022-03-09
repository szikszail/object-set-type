import "./type.d.ts";
import deepEqual = require('deep-eql');

const ENTRIES = Symbol('entries');

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
    if (typeof item !== 'undefined' && !this.has(item)) {
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

  public keys(): IterableIterator<T> {
    return this[Symbol.iterator]();
  }

  public values(): IterableIterator<T> {
    return this[Symbol.iterator]();
  }

  public * entries(): IterableIterator<[T, T]> {
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
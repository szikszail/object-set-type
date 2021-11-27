class ObjectSet<T> {
    constructor(iterable: Iterable<T>);
    public equals(a: T, b: T): boolean;
    public has(needle: T): boolean;
    public delete(item: T): boolean;
    public add(item?: T): ObjectSet<T>
    public clear(): void;
    public [Symbol.iterator](): Iterator<T>;
    public keys(): Iterator<T>;
    public values(): Iterator<T>;
    public entries(): Iterator<[T, T]>;
    public forEach(callbackFn: (item: T, i: number, items: T[]) => void, thisArg: ObjectSet<T>): void;

    get size(): number;

}

export = ObjectSet;
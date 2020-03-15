export class TypedMap {
    private readonly dat: Int32Array;
    private readonly max: number;

    constructor(size: number) {
        this.max = size;
        this.dat = new Int32Array(size);
    }

    //
    // set {key, val} into stack.
    // returns true if successful.
    set(key: number, val: number): boolean {
        if (0 <= key && key < this.max) {
            this.dat[key] = val;
            return true;
        }
        return false;
    }

    //
    // get val using key.
    // if an invalid key is given, it returns undefined.
    get(key: number): number | undefined {
        if (0 <= key && key < this.max) {
            return this.dat[key];
        }
        return undefined;
    }
}

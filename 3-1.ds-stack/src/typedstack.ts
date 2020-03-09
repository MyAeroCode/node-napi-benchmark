export class TypedStack {
    private readonly dat: Int32Array;
    private readonly max: number;
    private idx: number = 0;

    constructor(size: number) {
        this.max = size;
        this.dat = new Int32Array(size);
    }

    push(val: number): boolean {
        if (this.idx !== this.max) {
            this.dat[this.idx++] = val;
            return true;
        }
        return false;
    }

    pop(): boolean {
        if (this.idx !== 0) {
            --this.idx;
            return true;
        }
        return false;
    }

    top(): number | undefined {
        if (this.idx === 0) return undefined;
        return this.dat[this.idx - 1];
    }

    empty(): boolean {
        return this.idx === 0;
    }

    size(): number {
        return this.idx;
    }
}

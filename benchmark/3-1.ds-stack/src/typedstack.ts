export class TypedStack {
    private readonly dat: Int32Array;
    private readonly max: number;
    private idx: number = 0;

    constructor(size: number) {
        this.max = size;
        this.dat = new Int32Array(size);
    }

    //
    // push val into stack.
    // returns false if no more elements can be inserted.
    push(val: number): boolean {
        if (this.idx !== this.max) {
            this.dat[this.idx++] = val;
            return true;
        }
        return false;
    }

    //
    // pop val from stack.
    // returns false if the stack is empty.
    // otherwise returns true.
    pop(): boolean {
        if (this.idx !== 0) {
            --this.idx;
            return true;
        }
        return false;
    }

    //
    // return top value of stack.
    // return undefined if the stack is empty.
    top(): number | undefined {
        if (this.idx === 0) return undefined;
        return this.dat[this.idx - 1];
    }

    //
    // return stack is empty.
    empty(): boolean {
        return this.idx === 0;
    }

    //
    // return size of stack.
    size(): number {
        return this.idx;
    }
}

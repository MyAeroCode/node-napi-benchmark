type TypedArray = Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array;
type TypedArrayConstructor = {
    new (size: number): TypedArray;
};

export class MyDeque {
    private typedArray: TypedArray;
    private front: number = 0;
    private rear: number = 0;
    private capacity: number = 0;
    constructor(typedArray: TypedArrayConstructor, size: number) {
        this.typedArray = new typedArray(size + 1);
        this.capacity = size + 1;
    }

    private _cursor(cursor: number): number {
        if (cursor < 0) cursor += this.capacity;
        if (cursor >= this.capacity) cursor -= this.capacity;
        return cursor;
    }

    isEmpty() {
        return this.front === this.rear;
    }

    isFull() {
        return this.front === this._cursor(this.rear + 1);
    }

    push_front(val: number) {
        if (this.isFull()) {
            throw new Error("deque is full");
        }
        this.typedArray[this.front] = val;
        this.front = this._cursor(this.front - 1);
    }

    push_back(val: number) {
        if (this.isFull()) {
            throw new Error("deque is full");
        }
        this.typedArray[this._cursor(this.rear + 1)] = val;
        this.rear = this._cursor(this.rear + 1);
    }

    pop_front() {
        if (this.isEmpty()) {
            throw new Error("deque is empty");
        }
        this.front = this._cursor(this.front + 1);
    }

    pop_back() {
        if (this.isEmpty()) {
            throw new Error("deque is empty");
        }
        this.rear = this._cursor(this.rear - 1);
    }

    peek_front(): number | undefined {
        if (this.isEmpty()) return undefined;
        return this.typedArray[this._cursor(this.front + 1)];
    }

    peek_back(): number | undefined {
        if (this.isEmpty()) return undefined;
        return this.typedArray[this.rear];
    }
}

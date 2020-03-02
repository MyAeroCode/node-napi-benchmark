type TypedArray = Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array;
type TypedArrayConstructor = {
    new (size: number): TypedArray;
};

export class MyStack {
    private typedArray: TypedArray;
    private size: number = 0;
    private capacity: number = 0;
    constructor(typedArray: TypedArrayConstructor, size: number) {
        this.capacity = size;
        this.typedArray = new typedArray(this.capacity);
    }

    isEmpty() {
        return this.size === 0;
    }

    isFull() {
        return this.size === this.capacity;
    }

    push(val: number) {
        if (this.isFull()) {
            throw new Error("stack is full");
        }
        this.typedArray[this.size++] = val;
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error("deque is empty");
        }
        --this.size;
    }

    top(): number {
        if (this.isEmpty()) {
            throw new Error("deque is empty");
        }
        return this.typedArray[this.size - 1];
    }
}

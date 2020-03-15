### Data Structure - Stack

**c++ :**

use `Napi::ObjectWrap`.

**node :**

use `Array` or

```ts
class TypedStack {
    private dat : Int32Array;
    private idx : number;

    ...
}
```

### Benchmark

> Measure the average of 1,000 times.

![](./resource/benchmark.png)

---

### Conclusion

The reason why the addon stack performed the worst was because of the cost of `NAPI call`.

`Array` performance isn't bad either, but if you can use `TypedArray`, you'll get better performance.

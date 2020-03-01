### How to build it?

**pre-build**

1. `npm install -g windows-build-tools` in admin mode.

**build**

1. `npm install`
2. `npm run build`
3. `npm run start`

---

### Math bit

**Addon :**

```cpp
Napi::Object bit(const Napi::CallbackInfo& info)
{
    ...

    int64_t result = 0;
    for (int64_t i = 0; i < N; i++) {
        result |= i;
        result &= i;
        result <<= 1;
        result = ~result;
        result >>= 1;
    }

    ...
}
```

**Node :**

```ts
function bit({ N }) {
    let result = 0;
            for (let i = 0; i < N; i++) {
                result |= i;
                result &= i;
                result <<= 1;
                result = ~result;
                result >>= 1;
            }

    ...
}
```

---

### Benchmark

> Measure the average of 10,000 times.

![](./resource/benchmark.png)

### How to build it?

**pre-build**

1. `npm install -g windows-build-tools` in admin mode.

**build**

1. `npm install`
2. `npm run build`
3. `npm run start`

---

### Math mul

**Addon :**

```cpp
Napi::Object mul(const Napi::CallbackInfo& info)
{
    ...

    int64_t lastSqure = 0;
    for (int64_t i = 0; i < N; i++) {
        lastSqure = i * i;
    }

    ...
}
```

**Node :**

```ts
function mul({ N }) {
    let lastSqure = 0;
    for (let i = 0; i < N; i++) {
        lastSqure = i * i;
    }

    ...
}
```

---

### Benchmark

> Measure the average of 10,000 times.

![](./resource/benchmark.png)

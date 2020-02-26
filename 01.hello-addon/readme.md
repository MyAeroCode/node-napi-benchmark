### How to build it?

**pre-build**

1. `npm install -g windows-build-tools` in admin mode.

**build**

1. `npm install`
2. `npm run build`
3. `npm run start`

---

### Hello, World!

**Addon :**

```cpp
void helloWorld(int64_t cnt){
    for(int64_t i=0; i<cnt; i++){
        printf("Hello, World!\n");
    }
}
```

**Addon Implemation :**

```cpp
void helloWorld(const Napi::CallbackInfo& info)
{
    //
    // Get first argument as int64_t.
    int64_t cnt = info[0].As<Napi::Number>().Int64Value();

    //
    // Say hello.
    for (int64_t i = 0; i < cnt; i++) {
        printf("Hello, World!\n");
    }
}
```

**Node :**

```ts
function helloWorld(cnt: number) {
    for (let i = 0; i < cnt; i++) {
        console.log("Hello, World!");
    }
}
```

---

### Benchmark

![](./images/benchmark.png)

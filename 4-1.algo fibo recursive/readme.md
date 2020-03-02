### How to build it?

**pre-build**

1. `npm install -g windows-build-tools` in admin mode.

**build**

1. `npm install`
2. `npm run build`
3. `npm run start`

---

### Algolithm Recursive fibo

**Common :**

```ts
function fibo(n: number): number {
    if (n === 1) return 0;
    if (n === 2) return 1;
    if (n === 3) return 1;
    return fibo(n - 1) + fibo(n - 2);
}
```

---

### Benchmark back - Memory O(n)

> Measure the average of 10,000 times.

![](./resource/benchmark.png)

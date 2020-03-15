### String - write each char

Given a string of `zeros` or `only` ones, switch each character.

**example)**

-   11001 >> 00110

**c++ :**

```cpp
for(char &ch : str){
    ch = (ch == '0' ? '1' : '0');
}
```

**node :**

```ts
const arr = [];
const len = str.length;
for (let i = 0; i < len; i++) {
    //
    // In JavaScript, strings are immutable,
    // so you should create a new string for each character.
    const ch = str.charAt(i);
    arr.push(ch === "0" ? "1" : "0");
}

//
// Array.prototype.join() is most effective for combining strings.
str = arr.join();
```

```ts
const buf = Buffer.from(str);
const ch0 = "0".charCodeAt(0);
const ch1 = "1".charCodeAt(0);
for(let i=0; i<buf.length; i++){
    buf[i] = (buf[i] === ch0) ? ch1 : ch0;
}
buf.toString();
```

### Benchmark

> Measure the average of 10,000 times.

![](./resource/benchmark.png)

---

### Conclusion

If you need to perform each character-wise operation, it is better to convert it to `Buffer` before proceeding.

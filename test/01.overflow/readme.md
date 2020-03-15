### Overflow test

-   Try cast a very large value to `int32_t` in `NAPI`.
-   Try generating a very large value in `NAPI`.

---

### Test code

```ts
/*
    cast to int32_t.

    0x1234567890

               31
    0001 0010 / 0011 0100 0101 0110 0111 1000 1001 0000

                878082192
*/
addon.consume(0x1234567890); // 878082192

/*
    cast to int32_t.
    
    0xb4567890

    1001 0100 0101 0110 0111 1000 1001 0000

    bit : 1 (negative)
    ~0xb4567890 + 1 : 1269401456
*/
addon.consume(0xb4567890); // -1269401456

/*
    generate max of int64_t.

    C++  : 9'223'372'036'854'775'807
    NODE : 9'223'372'036'854'776'000

    Precision decreases.
*/
console.log(addon.product()); // 9223372036854776000
```

---

### Conclusion

-   `NAPI::Number::Int32Value` uses the lower 32 bits.
-   If you get a large value from `NAPI`, the precision decreases.

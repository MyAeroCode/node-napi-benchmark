### Memory modification test

Manipulate the `TypedArray` or `string` at the buffer level.
Then, test if the side effects have occurred on the `NodeJS`.

---

### Test Result.

TypedArray

-   befo : [ 0, 0, 0, 0, 0 ]
-   aftr : [ 1, 2, 3, 4, 5 ]

string

-   befo : "Hi!!"
-   aftr : "Hi!!" // We expect "Bye!".

---

### Conclusion

`Strings` are `immutable` in `NodeJS`, so operations at the buffer level don't have side effect.

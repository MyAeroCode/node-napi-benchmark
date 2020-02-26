### How to build it?

**pre-build**

1. `npm install -g windows-build-tools` in admin mode.

**build**

1. `npm install`
2. `npm run build`
3. `npm run start`

---

### String Array Join

![](./images/summation-general-formular.png)

**Addon :**

```cpp
string join(vector<string> arr, string separator){
    stringstream ss;
    size_t arrlen = arr.size();
    for(size_t i=0; i<arrlen; i++){
        ss << arr[i] << separator;
    }
    return ss.str();
}
```

**Addon implemation :**

```cpp
Napi::String join(const Napi::CallbackInfo& info)
{
    Napi::Env env = info.Env();

    //
    // Get first argument as Array.
    Napi::Array arr = info[0].As<Napi::Array>();

    //
    // Get second argument as string.
    std::string separator = info[1].ToString().Utf8Value();

    //
    // Append to string-stream.
    std::stringstream ss;
    uint32_t arrlen = arr.Length();
    for (uint32_t i = 0; i < arrlen; i++) {
        Napi::String str = arr.Get(i).As<Napi::String>();
        ss << str.Utf8Value() << separator;
    }

    //
    // Return as String.
    return Napi::String::New(env, ss.str());
}
```

**Node using array.join() :**

```ts
function join_v1(arr: string[], separator: string): string {
    return arr.join(separator);
}
```

**Node using str += str :**

```ts
function join_v2(arr: string[], separator: string): string {
    let joined = "";
    for (let i = 0; i < arr.length; i++) {
        joined += arr[i] + separator;
    }
    return joined;
}
```

---

### Benchmark

![](./images/benchmark.png)

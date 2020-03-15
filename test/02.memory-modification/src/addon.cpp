#include <napi.h>

///
/// Modify memory of TypedArray.
void modifyTypedArray(const Napi::CallbackInfo& info)
{
    auto arr = info[0].As<Napi::Int32Array>();
    auto mem = arr.Data();
    auto len = arr.ElementLength();
    for(size_t i=0; i<len; i++){
        mem[i] = i;
    }
}

///
/// Modify memory of string.
void modifyString(const Napi::CallbackInfo& info)
{
    auto str = info[0].As<Napi::String>().Utf8Value();
    str[0] = 'B';
    str[1] = 'y';
    str[2] = 'e';
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("modifyTypedArray", Napi::Function::New(env, modifyTypedArray));
    exports.Set("modifyString", Napi::Function::New(env, modifyString));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
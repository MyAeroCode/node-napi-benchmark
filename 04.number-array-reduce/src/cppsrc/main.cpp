#include <napi.h>
#include <sstream>
#include <stdio.h>

Napi::Number reduce_v1(const Napi::CallbackInfo& info)
{
    Napi::Env env = info.Env();

    //
    // Get first argument as Object.
    Napi::Object obj = info[0].As<Napi::Object>();

    //
    // Parse arguments from object.
    Napi::Array numarr = obj.Get("numarr").As<Napi::Array>();

    int64_t sum = 0;
    uint32_t arrlen = numarr.Length();
    for (uint32_t i = 0; i < arrlen; i++) {
        int64_t num = numarr.Get(i).As<Napi::Number>().Int64Value();
        sum += num;
    }

    //
    // Return as Number.
    return Napi::Number::New(env, sum);
}

Napi::Number reduce_v2(const Napi::CallbackInfo& info)
{
    Napi::Env env = info.Env();

    //
    // Get first argument as Object.
    Napi::Object obj = info[0].As<Napi::Object>();

    //
    // Parse arguments from object.
    int64_t N = obj.Get("n").As<Napi::Number>().Int64Value();

    int64_t sum = 0;
    for (uint32_t i = 0; i < N; i++) {
        sum += i;
    }

    //
    // Return as Number.
    return Napi::Number::New(env, sum);
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("reduce_v1", Napi::Function::New(env, reduce_v1));
    exports.Set("reduce_v2", Napi::Function::New(env, reduce_v2));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
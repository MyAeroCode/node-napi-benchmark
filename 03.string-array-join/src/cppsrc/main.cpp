#include <napi.h>
#include <sstream>
#include <stdio.h>

Napi::String join(const Napi::CallbackInfo& info)
{
    Napi::Env env = info.Env();

    //
    // Get first argument as Object.
    Napi::Object obj = info[0].As<Napi::Object>();

    //
    // Parse arguments from object.
    Napi::Array strarr = obj.Get("strarr").As<Napi::Array>();

    //
    // Append to string.
    std::string joined;
    uint32_t arrlen = strarr.Length();
    for (uint32_t i = 0; i < arrlen; i++) {
        std::string word = strarr.Get(i).As<Napi::String>().Utf8Value();
        joined += word;
    }

    //
    // Return as String.
    return Napi::String::New(env, joined);
}

Napi::String nothing(const Napi::CallbackInfo& info)
{
    Napi::Env env = info.Env();

    //
    // Get first argument as Object.
    Napi::Object obj = info[0].As<Napi::Object>();

    //
    // Parse arguments from object.
    Napi::Array strarr = obj.Get("strarr").As<Napi::Array>();

    //
    // Append to string.
    std::string joined;
    uint32_t arrlen = strarr.Length();
    for (uint32_t i = 0; i < arrlen; i++) {
        std::string word = strarr.Get(i).As<Napi::String>().Utf8Value();
        //
    }

    //
    // Return as String.
    return Napi::String::New(env, joined);
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("join", Napi::Function::New(env, join));
    exports.Set("nothing", Napi::Function::New(env, nothing));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
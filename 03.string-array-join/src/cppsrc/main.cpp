#include <napi.h>
#include <sstream>
#include <stdio.h>

Napi::String join(const Napi::CallbackInfo& info)
{
    Napi::Env env = info.Env();

    //
    // Get first argument as Array.
    Napi::Array strarr = info[0].As<Napi::Array>();

    //
    // Get second argument as string.
    std::string separator = info[1].ToString().Utf8Value();

    //
    // Append to string-stream.
    std::stringstream ss;
    uint32_t arrlen = strarr.Length();
    for (uint32_t i = 0; i < arrlen; i++) {
        Napi::String str = strarr.Get(i).As<Napi::String>();
        ss << str.Utf8Value() << separator;
    }

    //
    // Return as String.
    return Napi::String::New(env, ss.str());
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("join", Napi::Function::New(env, join));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
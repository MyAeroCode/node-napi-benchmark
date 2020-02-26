#include <napi.h>
#include <stdio.h>

Napi::Number summation(const Napi::CallbackInfo& info)
{
    Napi::Env env = info.Env();
    int64_t n = info[0].As<Napi::Number>().Int64Value();
    int64_t sum = 0;
    for (int64_t i = 0; i <= n; i++) {
        sum += i;
    }
    return Napi::Number::New(env, sum);
}
Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("summation", Napi::Function::New(env, summation));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
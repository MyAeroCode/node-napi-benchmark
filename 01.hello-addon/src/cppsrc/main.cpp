#include <napi.h>
#include <stdio.h>

void helloWorld(const Napi::CallbackInfo& info)
{
    printf("Hello, World!");
}

void helloWorld_benchmark(const Napi::CallbackInfo& info)
{
    int64_t cnt = info[0].As<Napi::Number>().Int64Value();
    for (int64_t i = 0; i < cnt; i++) {
        printf("Hello, World!\n");
    }
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("helloWorld", Napi::Function::New(env, helloWorld));
    exports.Set("helloWorld_benchmark", Napi::Function::New(env, helloWorld_benchmark));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
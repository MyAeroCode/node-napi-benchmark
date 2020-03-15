#include <napi.h>
#include <stdio.h>

///
/// Cast a number from JavaScript to a 32-bit integer.
void consume(const Napi::CallbackInfo& info)
{
    int32_t num = info[0].ToNumber().Int32Value();
    printf("[addon] rx : %d \n", num);
}

///
/// It generates 64-bit integers that JavaScript cannot handle.
Napi::Number product(const Napi::CallbackInfo& info)
{
    auto env = info.Env();
    
    //
    // Maximum of 64-bit signed integer.
    int64_t num = 9'223'372'036'854'775'807LL;
    return Napi::Number::New(env, num);
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("consume", Napi::Function::New(env, consume));
    exports.Set("product", Napi::Function::New(env, product));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
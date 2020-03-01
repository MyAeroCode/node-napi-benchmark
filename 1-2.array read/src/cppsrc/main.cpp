#include <chrono>
#include <napi.h>
#include <sstream>
#include <stdio.h>

Napi::Object arrayReadArr(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::steady_clock::time_point> time;

    //
    // get argument.
    auto env = info.Env();
    auto obj = info[0].As<Napi::Object>();
    int32_t num = 0;

    //
    // read array.
    time.push_back(std::chrono::high_resolution_clock::now());
    auto arr = obj.Get("arr").As<Napi::Array>();
    auto len = arr.Length();
    for (uint32_t i = 0; i < len; i++) {
        num = arr.Get(i).ToNumber().Int32Value();
    }
    time.push_back(std::chrono::high_resolution_clock::now());

    //
    // return last number.
    auto ans = Napi::Object::New(env);
    auto statics = Napi::Object::New(env);
    ans["ans"] = num;
    ans["statics"] = statics;
    statics["read array"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    return ans;
}

Napi::Object arrayReadTrr(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::steady_clock::time_point> time;

    //
    // get argument.
    auto env = info.Env();
    auto obj = info[0].As<Napi::Object>();
    int32_t num = 0;

    //
    // read array.
    time.push_back(std::chrono::high_resolution_clock::now());
    auto trr = obj.Get("trr").As<Napi::TypedArrayOf<int32_t>>();
    auto len = trr.ElementLength();
    for (int32_t i = 0; i < len; i++) {
        num = trr[i];
    }
    time.push_back(std::chrono::high_resolution_clock::now());

    //
    // return last number.
    auto ans = Napi::Object::New(env);
    auto statics = Napi::Object::New(env);
    ans["ans"] = num;
    ans["statics"] = statics;
    statics["read array"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    return ans;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("arrayReadArr", Napi::Function::New(env, arrayReadArr));
    exports.Set("arrayReadTrr", Napi::Function::New(env, arrayReadTrr));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
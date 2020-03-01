#include <chrono>
#include <napi.h>
#include <sstream>
#include <stdio.h>

Napi::Object arrayWriteArr(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::steady_clock::time_point> time;

    //
    // get argument.
    auto env = info.Env();
    auto obj = info[0].As<Napi::Object>();
    auto end = obj.Get("end").ToNumber().Int64Value();

    //
    // create array.
    time.push_back(std::chrono::high_resolution_clock::now());
    auto array = Napi::Array::New(env, end);
    for (int32_t i = 0; i < end; i++) {
        array[i] = i;
    }
    time.push_back(std::chrono::high_resolution_clock::now());

    //
    // return array.
    auto ans = Napi::Object::New(env);
    auto statics = Napi::Object::New(env);
    ans["ans"] = array;
    ans["statics"] = statics;
    statics["create array"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    return ans;
}

Napi::Object arrayWriteTrr(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::steady_clock::time_point> time;

    //
    // get argument.
    auto env = info.Env();
    auto obj = info[0].As<Napi::Object>();
    auto end = obj.Get("end").ToNumber().Int64Value();

    //
    // create array.
    time.push_back(std::chrono::high_resolution_clock::now());
    auto array = Napi::TypedArrayOf<int32_t>::New(env, end);
    for (int32_t i = 0; i < end; i++) {
        array[i] = i;
    }
    time.push_back(std::chrono::high_resolution_clock::now());

    //
    // return array.
    auto ans = Napi::Object::New(env);
    auto statics = Napi::Object::New(env);
    ans["ans"] = array;
    ans["statics"] = statics;
    statics["create array"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    return ans;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("arrayWriteArr", Napi::Function::New(env, arrayWriteArr));
    exports.Set("arrayWriteTrr", Napi::Function::New(env, arrayWriteTrr));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
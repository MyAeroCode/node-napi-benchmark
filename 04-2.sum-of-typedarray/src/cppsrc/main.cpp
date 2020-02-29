#include <chrono>
#include <iostream>
#include <napi.h>
#include <sstream>
#include <stdio.h>

Napi::Object getSumOfArray(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::steady_clock::time_point> time;

    //
    // get argument.
    auto env = info.Env();
    auto obj = info[0].As<Napi::Object>();
    auto numarr = obj.Get("numarr").As<Napi::TypedArrayOf<int32_t>>(); // or As<Napi::TypedArrayOf<int64_t>>()
    auto arrlen = numarr.ElementLength();

    /* ------------------------------------
     *  Section : calc sum of array.
     * ------------------------------------ */
    time.push_back(std::chrono::high_resolution_clock::now());
    int64_t sum = 0;
    for (uint32_t i = 0; i < arrlen; i++) {
        sum += numarr[i];
    }
    time.push_back(std::chrono::high_resolution_clock::now());

    //
    // Return ans.
    auto ans = Napi::Object::New(env);
    auto statics = Napi::Object::New(env);
    ans["ans"] = Napi::Number::New(env, sum);
    ans["statics"] = statics;
    statics["calc sum of array"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    return ans;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("getSumOfArray", Napi::Function::New(env, getSumOfArray));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
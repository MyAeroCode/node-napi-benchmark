#include <chrono>
#include <napi.h>
#include <sstream>
#include <stdio.h>

Napi::Object getSumOfArray(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::steady_clock::time_point> time;

    /* ------------------------------------
     *  Section : read data.
     * ------------------------------------ */
    time.push_back(std::chrono::high_resolution_clock::now());
    //
    // get argument.
    auto env = info.Env();
    auto obj = info[0].As<Napi::Object>();
    auto numarr = obj.Get("numarr").As<Napi::Array>();

    //
    // assign argument to vector.
    uint32_t arrlen = numarr.Length();
    std::vector<int64_t> vec;
    vec.reserve(arrlen);
    for (uint32_t i = 0; i < arrlen; i++) {
        int64_t num = numarr.Get(i).As<Napi::Number>().Int64Value();
        vec.push_back(num);
    }
    time.push_back(std::chrono::high_resolution_clock::now());

    /* ------------------------------------
     *  Section : calc sum of array.
     * ------------------------------------ */
    time.push_back(std::chrono::high_resolution_clock::now());
    uint64_t sum = 0;
    for (uint32_t i = 0; i < arrlen; i++) {
        sum += vec[i];
    }
    time.push_back(std::chrono::high_resolution_clock::now());

    //
    // Return ans.
    auto ans = Napi::Object::New(env);
    auto statics = Napi::Object::New(env);
    ans["ans"] = Napi::Number::New(env, sum);
    ans["statics"] = statics;
    statics["read data"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    statics["calc sum of array"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[3] - time[2]).count();
    return ans;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("getSumOfArray", Napi::Function::New(env, getSumOfArray));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
#include <chrono>
#include <napi.h>
#include <sstream>
#include <stdio.h>

Napi::Object joinStringArray(const Napi::CallbackInfo& info)
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
    auto strarr = obj.Get("strarr").As<Napi::Array>();

    //
    // assign argument to vector.
    uint32_t arrlen = strarr.Length();
    std::vector<std::string> vec;
    vec.reserve(arrlen);
    for (uint32_t i = 0; i < arrlen; i++) {
        std::string str = strarr.Get(i).As<Napi::String>().Utf8Value();
        vec.push_back(str);
    }
    time.push_back(std::chrono::high_resolution_clock::now());

    /* ------------------------------------
     *  Section : calc sum of array.
     * ------------------------------------ */
    time.push_back(std::chrono::high_resolution_clock::now());
    std::string joined = "";
    for (uint32_t i = 0; i < arrlen; i++) {
        joined += vec[i];
    }
    time.push_back(std::chrono::high_resolution_clock::now());

    //
    // Assign result to ans.
    auto ans = Napi::Object::New(env);
    auto statics = Napi::Object::New(env);
    ans["ans"] = Napi::String::New(env, joined);
    ans["statics"] = statics;
    statics["join"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[3] - time[2]).count();
    statics["read"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    return ans;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("joinStringArray", Napi::Function::New(env, joinStringArray));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
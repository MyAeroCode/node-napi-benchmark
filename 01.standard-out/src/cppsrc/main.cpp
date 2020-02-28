#include <chrono>
#include <napi.h>
#include <sstream>
#include <stdio.h>

Napi::Object standardOut(const Napi::CallbackInfo& info)
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
    auto cnt = obj.Get("cnt").ToNumber().Int64Value();
    auto str = obj.Get("str").ToString().Utf8Value();
    time.push_back(std::chrono::high_resolution_clock::now());

    /* ------------------------------------
     *  Section : calc sum of array.
     * ------------------------------------ */
    time.push_back(std::chrono::high_resolution_clock::now());
    for (uint32_t i = 0; i < cnt; i++) {
        printf("%s\r", str.c_str());
    }
    time.push_back(std::chrono::high_resolution_clock::now());

    //
    // Assign result to ans.
    auto ans = Napi::Object::New(env);
    auto statics = Napi::Object::New(env);
    ans["ans"] = env.Null();
    ans["statics"] = statics;
    statics["print"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[3] - time[2]).count();
    statics["read"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    return ans;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("standardOut", Napi::Function::New(env, standardOut));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
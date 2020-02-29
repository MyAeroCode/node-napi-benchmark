#include <chrono>
#include <napi.h>
#include <sstream>
#include <stdio.h>

Napi::Object createRange(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::steady_clock::time_point> time;

    //
    // get argument.
    auto env = info.Env();
    auto obj = info[0].As<Napi::Object>();
    auto end = obj.Get("end").ToNumber().Int64Value();

    //
    // create range
    time.push_back(std::chrono::high_resolution_clock::now());
    auto range = Napi::Array::New(env, end);
    for (uint32_t i = 0; i < end; i++) {
        range[i] = i;
    }
    time.push_back(std::chrono::high_resolution_clock::now());

    //
    // Return ans.
    auto ans = Napi::Object::New(env);
    auto statics = Napi::Object::New(env);
    ans["ans"] = range;
    ans["statics"] = statics;
    statics["create range"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    return ans;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("createRange", Napi::Function::New(env, createRange));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
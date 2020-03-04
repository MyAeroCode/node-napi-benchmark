#include <chrono>
#include <napi.h>
#include <sstream>
#include <stdio.h>

Napi::Object mul(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::steady_clock::time_point> time;

    //
    // get argument.
    auto env = info.Env();
    auto obj = info[0].As<Napi::Object>();
    auto N = obj.Get("N").ToNumber().Int64Value();

    //
    // read array.
    time.push_back(std::chrono::high_resolution_clock::now());
    int64_t lastSqure = 0;
    for (int64_t i = 0; i < N; i++) {
        lastSqure = i * i;
    }
    time.push_back(std::chrono::high_resolution_clock::now());

    //
    // return null.
    auto ans = Napi::Object::New(env);
    auto statics = Napi::Object::New(env);
    ans["ans"] = lastSqure;
    ans["statics"] = statics;
    statics["read array"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    return ans;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("mul", Napi::Function::New(env, mul));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
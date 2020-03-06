#include <chrono>
#include <napi.h>
#include <iostream>

Napi::Object stringCreate(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::steady_clock::time_point> time;

    //
    // get argument.
    auto env = info.Env();
    auto obj = info[0].As<Napi::Object>();
    auto N = obj.Get("N").ToNumber().Int32Value();
    auto arr = Napi::Array::New(env, N);

    //
    // create.
    time.push_back(std::chrono::high_resolution_clock::now());
    for (auto i = 0; i < N; i++) {
        arr[i] = std::to_string(i);
    }
    time.push_back(std::chrono::high_resolution_clock::now());

    //
    // return null.
    auto ans = Napi::Object::New(env);
    auto statics = Napi::Object::New(env);
    ans["ans"] = arr;
    ans["statics"] = statics;
    statics["calc"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    return ans;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("stringCreate", Napi::Function::New(env, stringCreate));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
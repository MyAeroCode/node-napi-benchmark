#include <chrono>
#include <napi.h>
#include <iostream>

Napi::Object stringRepeat(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::steady_clock::time_point> time;

    //
    // get argument.
    auto env = info.Env();
    auto obj = info[0].As<Napi::Object>();
    auto str = obj.Get("str").ToString().Utf8Value();
    auto N = obj.Get("N").ToNumber().Int32Value();

    //
    // repeat.
    time.push_back(std::chrono::high_resolution_clock::now());
    std::string ret = "";
    ret.reserve(str.size() * N);
    for (auto i = 0; i < N; i++) {
        ret += str;
    }
    time.push_back(std::chrono::high_resolution_clock::now());

    //
    // return null.
    auto ans = Napi::Object::New(env);
    auto statics = Napi::Object::New(env);
    ans["ans"] = ret;
    ans["statics"] = statics;
    statics["calc"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    return ans;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("stringRepeat", Napi::Function::New(env, stringRepeat));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
#include <chrono>
#include <napi.h>
#include <sstream>
#include <stdio.h>

Napi::Object arraySortTrr(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::steady_clock::time_point> time;

    //
    // get argument.
    auto env = info.Env();
    auto obj = info[0].As<Napi::Object>();
    auto trr = obj.Get("trr").As<Napi::TypedArrayOf<int32_t>>();

    //
    // sort array.
    time.push_back(std::chrono::high_resolution_clock::now());
    auto data = trr.Data();
    auto len = trr.ElementLength();
    std::sort(data, data + len);
    time.push_back(std::chrono::high_resolution_clock::now());

    //
    // return array.
    auto ans = Napi::Object::New(env);
    auto statics = Napi::Object::New(env);
    ans["ans"] = trr;
    ans["statics"] = statics;
    statics["create array"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    return ans;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("arraySortTrr", Napi::Function::New(env, arraySortTrr));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
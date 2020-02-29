#include <chrono>
#include <napi.h>
#include <sstream>
#include <stdio.h>

Napi::Object sort(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::steady_clock::time_point> time;

    //
    // get array.
    auto env = info.Env();
    auto obj = info[0].As<Napi::Object>();
    auto numarr = obj.Get("numarr").As<Napi::TypedArrayOf<int32_t>>();
    auto data = numarr.Data();
    auto elemCnt = numarr.ElementLength();

    //
    // sort.
    time.push_back(std::chrono::high_resolution_clock::now());
    std::sort(data, data + elemCnt);
    time.push_back(std::chrono::high_resolution_clock::now());

    //
    // return ans.
    auto ans = Napi::Object::New(env);
    auto statics = Napi::Object::New(env);
    ans["ans"] = numarr;
    ans["statics"] = statics;
    statics["sort"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    return ans;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("sort", Napi::Function::New(env, sort));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
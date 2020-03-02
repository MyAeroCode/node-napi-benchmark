#include <chrono>
#include <map>
#include <napi.h>
#include <sstream>
#include <stdio.h>

Napi::Object testMap(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::steady_clock::time_point> time;

    //
    // get argument.
    auto env = info.Env();
    auto obj = info[0].As<Napi::Object>();
    auto N = obj.Get("N").ToNumber().Int32Value();
    std::map<int32_t, int32_t> m;

    //
    // write.
    time.push_back(std::chrono::high_resolution_clock::now());
    for (auto i = 0; i < N; i++) {
        m[i] = i;
    }
    time.push_back(std::chrono::high_resolution_clock::now());

    //
    // read.
    time.push_back(std::chrono::high_resolution_clock::now());
    int32_t lastNum = 0;
    for (auto cur = m.begin(); cur != m.end(); cur++) {
        lastNum = cur->second;
    }
    lastNum += 1;
    time.push_back(std::chrono::high_resolution_clock::now());

    //
    // erase.
    time.push_back(std::chrono::high_resolution_clock::now());
    auto it = m.begin();
    while (it != m.end()) {
        m.erase(it++);
    }
    time.push_back(std::chrono::high_resolution_clock::now());

    //
    // return null.
    auto ans = Napi::Object::New(env);
    auto statics = Napi::Object::New(env);
    ans["ans"] = env.Undefined();
    ans["statics"] = statics;
    statics["w"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    statics["r"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[3] - time[2]).count();
    statics["d"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[5] - time[4]).count();
    return ans;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("testMap", Napi::Function::New(env, testMap));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
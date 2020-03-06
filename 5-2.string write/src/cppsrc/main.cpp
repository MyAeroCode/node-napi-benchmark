#include <chrono>
#include <napi.h>
#include <iostream>

Napi::Object stringWrite(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::steady_clock::time_point> time;

    //
    // get argument.
    auto env = info.Env();
    auto obj = info[0].As<Napi::Object>();
    auto str = obj.Get("str").ToString().Utf8Value();

    //
    // write.
    time.push_back(std::chrono::high_resolution_clock::now());
    uint64_t sum = 0;
    for (char& ch : str) {
        ch = (ch == '0' ? '1' : '0');
    }
    time.push_back(std::chrono::high_resolution_clock::now());

    //
    // return null.
    auto ans = Napi::Object::New(env);
    auto statics = Napi::Object::New(env);
    ans["ans"] = str;
    ans["statics"] = statics;
    statics["calc"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    return ans;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("stringWrite", Napi::Function::New(env, stringWrite));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
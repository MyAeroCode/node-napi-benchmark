#include <chrono>
#include <map>
#include <napi.h>
#include <sstream>
#include <stdio.h>

Napi::Object fileRead(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::steady_clock::time_point> time;

    //
    // get argument.
    auto env = info.Env();
    auto obj = info[0].As<Napi::Object>();
    auto N = obj.Get("N").ToNumber().Int64Value();

    //
    // read.
    auto file = fopen(("file_napi" + std::to_string(N)).c_str(), "rb");
    auto buf = Napi::Uint8Array::New(env, N);
    time.push_back(std::chrono::high_resolution_clock::now());
    fread(buf.Data(), sizeof(uint8_t), N, file);
    time.push_back(std::chrono::high_resolution_clock::now());
    fclose(file);

    //
    // return null.
    auto ans = Napi::Object::New(env);
    auto statics = Napi::Object::New(env);
    ans["ans"] = buf;
    ans["statics"] = statics;
    statics["calc"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    return ans;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("fileRead", Napi::Function::New(env, fileRead));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
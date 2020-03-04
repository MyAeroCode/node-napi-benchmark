#include <chrono>
#include <map>
#include <napi.h>
#include <sstream>
#include <stdio.h>

Napi::Object fileWrite(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::steady_clock::time_point> time;

    //
    // get argument.
    auto env = info.Env();
    auto obj = info[0].As<Napi::Object>();
    auto dat = obj.Get("dat").As<Napi::Uint8Array>();

    //
    // write.
    auto file = fopen((std::string("file_napi") + std::to_string(dat.ByteLength())).c_str(), "wb");
    time.push_back(std::chrono::high_resolution_clock::now());
    fwrite(dat.Data(), sizeof(uint8_t), dat.ByteLength(), file);
    time.push_back(std::chrono::high_resolution_clock::now());
    fclose(file);

    //
    // return null.
    auto ans = Napi::Object::New(env);
    auto statics = Napi::Object::New(env);
    ans["ans"] = env.Undefined();
    ans["statics"] = statics;
    statics["calc"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    return ans;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("fileWrite", Napi::Function::New(env, fileWrite));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
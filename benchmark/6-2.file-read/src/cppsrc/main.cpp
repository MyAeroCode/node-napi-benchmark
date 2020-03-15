#include <chrono>
#include <napi.h>
#include <stdio.h>

Napi::Object fileRead(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::_V2::system_clock::time_point> time;

    auto env = info.Env();

    /*
        info[0] : {
            N : number;
        }
    */
    auto obj = info[0].ToObject();
    auto N = obj.Get("N").ToNumber().Uint32Value();
    auto buf = Napi::Uint8Array::New(env, N);
    std::string filename = "file_" + std::to_string(N);

    /*
        work here.
    */
    time.push_back(std::chrono::high_resolution_clock::now());
    auto file = fopen(filename.c_str(), "rb");
    fread(buf.Data(), sizeof(uint8_t), N, file);
    fclose(file);
    time.push_back(std::chrono::high_resolution_clock::now());

    /*
        create information to return.

        ans : {
            ans : any;
            statics : {
                [key: string] : number;
            }
        }
    */
    auto ans = Napi::Object::New(env);
    auto statics = Napi::Object::New(env);
    ans["ans"] = buf;
    ans["statics"] = statics;
    statics["write"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    return ans;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("fileRead", Napi::Function::New(env, fileRead));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
#include <chrono>
#include <napi.h>
#include <stdio.h>

inline void work(const uint8_t *data, const size_t &N){
    std::string filename = ("napi" + std::to_string(N));
    auto file = fopen(filename.c_str(), "wb");
    fwrite(data, sizeof(uint8_t), N, file);
    freopen(filename.c_str(), "wb", file);
    fclose(file);
}


Napi::Object fileWrite(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::_V2::system_clock::time_point> time;

    auto env = info.Env();

    /*
        info[0] : {
            dat : Uint8Array;
        }
    */
    auto obj = info[0].ToObject();
    auto dat = obj.Get("dat").As<Napi::Uint8Array>();
    
    /*
        work here.
    */
    time.push_back(std::chrono::high_resolution_clock::now());
    work(dat.Data(), dat.ElementLength());
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
    ans["ans"] = env.Undefined();
    ans["statics"] = statics;
    statics["write"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    return ans;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("fileWrite", Napi::Function::New(env, fileWrite));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
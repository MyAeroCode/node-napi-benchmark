#include <chrono>
#include <napi.h>
#include <stdio.h>
#include <utility>

inline void work(std::string str, size_t N, std::string &out){
    out = "";
    while(N != 0){
        if(N & 1) {
            // out += str;
            out.append(str);
        }
        str += str;
        N >>= 1;
    }
}

Napi::Object stringRepeat(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::_V2::system_clock::time_point> time;

    auto env = info.Env();

    /*
        info[0] : {
            str : string;
            N : number;
        }
    */
    auto obj = info[0].ToObject();
    auto str = obj.Get("str").ToString().Utf8Value();
    auto N = obj.Get("N").ToNumber().Int32Value();
    
    /*
        work here.
    */
    time.push_back(std::chrono::high_resolution_clock::now());
    std::string repeated;
    work(str, N, repeated);
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
    ans["ans"] = Napi::String::New(env, repeated);
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
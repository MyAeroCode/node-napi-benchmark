#include <chrono>
#include <napi.h>
#include <sstream>
#include <stdio.h>

inline void work(const Napi::Env& env, Napi::Value& out, const Napi::Value& in){
    auto N = in.ToNumber().Int32Value();
    int64_t total = 0;
    for(int32_t i=0; i<N; i++){
        total += i;
    }
    out = Napi::Number::New(env, total);
}


Napi::Object mathAdd(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::_V2::system_clock::time_point> time;

    auto env = info.Env();

    /*
        info[0] : {
            N :number
        }
    */
    auto obj = info[0].ToObject();
    
    /*
        get sum of [0...N)
    */
    time.push_back(std::chrono::high_resolution_clock::now());
    Napi::Value val = env.Undefined();
    work(env, val, obj.Get("N"));
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
    ans["ans"] = val;
    ans["statics"] = statics;
    statics["calc"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    return ans;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("mathAdd", Napi::Function::New(env, mathAdd));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
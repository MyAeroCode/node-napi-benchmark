#include <chrono>
#include <napi.h>
#include <sstream>
#include <stdio.h>

inline void work(const Napi::Env& env, Napi::Value& out, const Napi::Object& in){
    auto N = in.Get("N").ToNumber().Int64Value();
    auto typedArray = in.Get("typedArray").As<Napi::TypedArrayOf<int32_t>>().Data();
    for(int64_t i=0; i<N; i++){
        typedArray[i] = i * 1.5;
    }
    out = env.Undefined();
}


Napi::Object mathMul(const Napi::CallbackInfo& info)
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
        calc each square.
    */
    time.push_back(std::chrono::high_resolution_clock::now());
    Napi::Value val = env.Undefined();
    work(env, val, obj);
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
    exports.Set("mathMul", Napi::Function::New(env, mathMul));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
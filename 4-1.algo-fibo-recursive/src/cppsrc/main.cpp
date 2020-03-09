#include <chrono>
#include <napi.h>
#include <stdio.h>

int64_t fibo(int64_t n){
    if(n == 0) return 0;
    if(n == 1) return 1;
    if(n == 2) return 1;
    return fibo(n-1) + fibo(n-2);
}

inline void work(const Napi::Env& env, Napi::Value& out, const Napi::Value& in){
    auto N = in.ToNumber().Int64Value();
    auto ans = fibo(N);
    out = Napi::Number::New(env, ans);
}


Napi::Object mathMod(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::_V2::system_clock::time_point> time;

    auto env = info.Env();

    /*
        info[0] : {
            N :number;
        }
    */
    auto obj = info[0].ToObject();
    
    /*
        calc n-th fibo.
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
    exports.Set("mathMod", Napi::Function::New(env, mathMod));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
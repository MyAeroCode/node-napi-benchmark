#include <chrono>
#include <napi.h>
#include <stdio.h>

inline void work(const Napi::Env& env, Napi::Value& out, const Napi::Value& in){
    auto trr = in.As<Napi::Int32Array>();
    auto len = (int32_t) trr.ElementLength();
    auto ans = Napi::Int32Array::New(env, len);
    for(int32_t i = 0; i < len; i++){
        int32_t v = i;
        v |= i;
        v &= i;
        v <<= 1;
        v = ~v;
        v >>= 1;
        ans[i] = v;
    }
    out = ans;
}


Napi::Object mathMod(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::_V2::system_clock::time_point> time;

    auto env = info.Env();

    /*
        info[0] : {
            trr : Int32Array;
        }
    */
    auto obj = info[0].ToObject();
    
    /*
        calc each modulo 7.
    */
    time.push_back(std::chrono::high_resolution_clock::now());
    Napi::Value val = env.Undefined();
    work(env, val, obj.Get("trr"));
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
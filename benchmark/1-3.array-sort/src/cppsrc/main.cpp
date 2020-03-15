#include <chrono>
#include <napi.h>
#include <sstream>
#include <stdio.h>

enum SEL {
    ARRAY = 0,
    TYPED_ARRAY = 1
};

inline void work_with_array(const Napi::Env& env, const Napi::Value& in){
    auto arr = in.As<Napi::Array>();
    auto len = arr.Length();

    std::vector<int32_t> vec;
    vec.reserve(arr.Length());
    for(uint32_t i=0; i<len; i++){
        vec.emplace_back(arr.Get(i).ToNumber().Int32Value());
    }
    std::sort(vec.begin(), vec.end());
}

inline void work_with_typed_array(const Napi::Env& env, const Napi::Value& in){
    auto arr = in.As<Napi::Int32Array>();
    auto len = arr.ElementLength();
    auto dat = arr.Data();
    std::sort(dat, dat+len);
}


Napi::Object arraySort(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::_V2::system_clock::time_point> time;

    auto env = info.Env();

    /*
        get request-info from fisrt argument.

        info[0] : {
            arr : number[];
            trr : Uint32Array;
        },
        info[1] : SEL;
    */
    auto obj = info[0].ToObject();
    auto sel = info[1].ToNumber().Uint32Value();
    
    /*
        sort dummy array.
    */
    time.push_back(std::chrono::high_resolution_clock::now());
    Napi::Value val = env.Undefined();
    switch (sel)
    {
        case SEL::ARRAY :
            work_with_array(env, obj.Get("arr"));
            break;

        case SEL::TYPED_ARRAY :
            work_with_typed_array(env, obj.Get("trr"));
            break;

        default:
            break;
    }
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
    statics["read array"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    return ans;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("arraySort", Napi::Function::New(env, arraySort));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
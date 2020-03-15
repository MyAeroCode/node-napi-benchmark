#include <chrono>
#include <napi.h>
#include <sstream>
#include <stdio.h>

enum SEL {
    ARRAY = 0,
    TYPED_ARRAY = 1
};

inline void work_with_array(const Napi::Env& env, Napi::Value& val, uint32_t end){
    auto arr = Napi::Array::New(env, end);
    for(uint32_t i=0; i<end; i++){
        arr[i] = i;
    }
    val = arr;
}

inline void work_with_typed_array(const Napi::Env& env, Napi::Value& val, uint32_t end){
    auto arr = Napi::Int32Array::New(env, end);
    for(uint32_t i=0; i<end; i++){
        arr[i] = i;
    }
    val = arr;
}


Napi::Object arrayWrite(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::_V2::system_clock::time_point> time;

    auto env = info.Env();

    /*
        get request-info from fisrt argument.

        info[0] : {
            end : number;
        },
        info[1] : SEL;
    */
    auto obj = info[0].ToObject();
    auto sel = info[1].ToNumber().Uint32Value();
    auto end = obj.Get("end").ToNumber().Uint32Value();
    
    /*
        create dummy array. [0...end)
    */
    time.push_back(std::chrono::high_resolution_clock::now());
    Napi::Value val;
    switch (sel)
    {
        case SEL::ARRAY :
            work_with_array(env, val, end);
            break;

        case SEL::TYPED_ARRAY :
            work_with_typed_array(env, val, end);
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
    statics["create array"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    return ans;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("arrayWrite", Napi::Function::New(env, arrayWrite));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
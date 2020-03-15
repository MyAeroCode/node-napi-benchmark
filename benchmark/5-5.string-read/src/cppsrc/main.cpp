#include <chrono>
#include <napi.h>
#include <sstream>
#include <stdio.h>

enum SEL {
    STRING = 0,
    TYPED_ARRAY_1 = 1,
    TYPED_ARRAY_2 = 2
};

Napi::Object stringRead(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::_V2::system_clock::time_point> time;

    auto env = info.Env();

    /*
        get request-info from fisrt argument.

        info[0] : {
            str : string;
            trr : Uint8Array;
        },
        info[1] : SEL;
    */
    auto obj = info[0].ToObject();
    auto sel = info[1].ToNumber().Uint32Value();
    
    /*
        create dummy array. [0...end)
    */
    time.push_back(std::chrono::high_resolution_clock::now());
    std::string str;
    char* c_str = nullptr;
    switch (sel)
    {
        case SEL::STRING :
            str = std::move(obj.Get("str").ToString().Utf8Value());
            break;

        case SEL::TYPED_ARRAY_1 :
            str = std::string((char*) obj.Get("trr").As<Napi::Uint8Array>().Data());
            break;
        
        case SEL::TYPED_ARRAY_2 :
            c_str = (char*) obj.Get("trr").As<Napi::Uint8Array>().Data();
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
    switch (sel)
    {
        case SEL::STRING :
            ans["ans"] = str;
            break;

        case SEL::TYPED_ARRAY_1 :
            ans["ans"] = str;
            break;
        
        case SEL::TYPED_ARRAY_2 :
            ans["ans"] = c_str;
            break;

        default:
            break;
    }
    ans["statics"] = statics;
    statics["read"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    return ans;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("stringRead", Napi::Function::New(env, stringRead));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
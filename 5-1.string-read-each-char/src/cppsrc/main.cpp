#include <chrono>
#include <napi.h>
#include <stdio.h>

inline size_t work(const std::string& str){
    size_t charSum = 0;
    for(const char &ch: str){
        charSum += ch;
    }
    return charSum;
}


Napi::Object stringReadEachChar(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::_V2::system_clock::time_point> time;

    auto env = info.Env();

    /*
        info[0] : {
            str : string;
        }
    */
    auto obj = info[0].ToObject();
    auto str = obj.Get("str").ToString().Utf8Value();
    
    /*
        calc n-th fibo.
    */
    time.push_back(std::chrono::high_resolution_clock::now());
    const size_t charSum = work(str);
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
    ans["ans"] = Napi::Number::New(env, charSum);
    ans["statics"] = statics;
    statics["calc"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    return ans;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("stringReadEachChar", Napi::Function::New(env, stringReadEachChar));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
#include <chrono>
#include <napi.h>
#include <stdio.h>

inline void work(std::string& str){
    for(char &ch: str){
        ch = (ch == '0' ? '1' : '0'); 
    }
}


Napi::Object stringWrite(const Napi::CallbackInfo& info)
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
    work(str);
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
    ans["ans"] = Napi::String::New(env, str);
    ans["statics"] = statics;
    statics["calc"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    return ans;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("stringWrite", Napi::Function::New(env, stringWrite));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
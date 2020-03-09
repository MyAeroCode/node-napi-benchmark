#include <chrono>
#include <napi.h>
#include <stdio.h>

Napi::Object stringCreate(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::_V2::system_clock::time_point> time;

    auto env = info.Env();

    /*
        info[0] : {
            N : number;
        }
    */
    auto obj = info[0].ToObject();
    auto N = obj.Get("N").ToNumber().Int32Value();
    std::vector<std::string> tmp1;
    std::vector<Napi::String> tmp2;
    tmp1.reserve(N);
    tmp2.reserve(N);
    
    /*
        work here.
    */
    time.push_back(std::chrono::high_resolution_clock::now());
    for(auto i=0; i<N; i++){
        tmp1.emplace_back(std::to_string(i));
    }
    time.push_back(std::chrono::high_resolution_clock::now());

    time.push_back(std::chrono::high_resolution_clock::now());
    for(auto i=0; i<N; i++){
        tmp2.emplace_back(Napi::String::New(env, tmp1[i]));
    }
    time.push_back(std::chrono::high_resolution_clock::now());

    time.push_back(std::chrono::high_resolution_clock::now());
    auto arr = Napi::Array::New(env, N);
    for(auto i=0; i<N; i++){
        arr[i] = tmp2[i];
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
    ans["ans"] = arr;
    ans["statics"] = statics;
    statics["create"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    statics["castin"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[3] - time[2]).count();
    statics["assign"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[5] - time[4]).count();
    return ans;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("stringCreate", Napi::Function::New(env, stringCreate));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
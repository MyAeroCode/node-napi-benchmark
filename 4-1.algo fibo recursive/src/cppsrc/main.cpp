#include <chrono>
#include <map>
#include <napi.h>
#include <sstream>
#include <stdio.h>

int64_t _fibo(int64_t n)
{
    if (n == 1)
        return 0;
    if (n == 2)
        return 1;
    if (n == 3)
        return 1;
    return _fibo(n - 1) + _fibo(n - 2);
}

Napi::Object fibo(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::steady_clock::time_point> time;

    //
    // get argument.
    auto env = info.Env();
    auto obj = info[0].As<Napi::Object>();
    auto N = obj.Get("N").ToNumber().Int32Value();

    //
    // write.
    time.push_back(std::chrono::high_resolution_clock::now());
    auto nth_fibo = _fibo(N);
    time.push_back(std::chrono::high_resolution_clock::now());

    //
    // return null.
    auto ans = Napi::Object::New(env);
    auto statics = Napi::Object::New(env);
    ans["ans"] = nth_fibo;
    ans["statics"] = statics;
    statics["calc"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    return ans;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("fibo", Napi::Function::New(env, fibo));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
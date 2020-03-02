#include <chrono>
#include <napi.h>
#include <sstream>
#include <stack>
#include <stdio.h>

Napi::Object testStack1(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::steady_clock::time_point> time;

    //
    // get argument.
    auto env = info.Env();
    auto obj = info[0].As<Napi::Object>();
    auto N = obj.Get("N").ToNumber().Int32Value();
    std::stack<int32_t> s;

    //
    // simulate.
    time.push_back(std::chrono::high_resolution_clock::now());
    for (auto i = 0; i < N; i++) {
        s.push(i);
        s.pop();
    }
    time.push_back(std::chrono::high_resolution_clock::now());

    //
    // return null.
    auto ans = Napi::Object::New(env);
    auto statics = Napi::Object::New(env);
    ans["ans"] = env.Undefined();
    ans["statics"] = statics;
    statics["calc"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    return ans;
}

Napi::Object testStack2(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::steady_clock::time_point> time;

    //
    // get argument.
    auto env = info.Env();
    auto obj = info[0].As<Napi::Object>();
    auto N = obj.Get("N").ToNumber().Int32Value();
    auto stack = new int32_t[N];
    auto cursor = 0;

    //
    // simulate.
    time.push_back(std::chrono::high_resolution_clock::now());
    for (auto i = 0; i < N; i++) {
        stack[cursor++] = i;
        --cursor;
    }
    time.push_back(std::chrono::high_resolution_clock::now());

    //
    // return null.
    auto ans = Napi::Object::New(env);
    auto statics = Napi::Object::New(env);
    ans["ans"] = env.Undefined();
    ans["statics"] = statics;
    statics["calc"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();

    //
    // free memory.
    delete stack;
    return ans;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("testStack1", Napi::Function::New(env, testStack1));
    exports.Set("testStack2", Napi::Function::New(env, testStack2));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
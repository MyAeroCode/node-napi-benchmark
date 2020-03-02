#include "mydeque.cpp"
#include <chrono>
#include <deque>
#include <napi.h>
#include <sstream>
#include <stdio.h>

Napi::Object testDeque1(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::steady_clock::time_point> time;

    //
    // get argument.
    auto env = info.Env();
    auto obj = info[0].As<Napi::Object>();
    auto N = obj.Get("N").ToNumber().Int32Value();
    std::deque<int32_t> deq;

    //
    // simulate.
    time.push_back(std::chrono::high_resolution_clock::now());
    for (auto i = 0; i < N; i++) {
        deq.push_front(i);
        deq.pop_front();
    }
    time.push_back(std::chrono::high_resolution_clock::now());

    //
    // return null.
    auto ans = Napi::Object::New(env);
    auto statics = Napi::Object::New(env);
    if (deq.empty())
        ans["ans"] = env.Undefined();
    else
        ans["ans"] = deq.front();
    ans["statics"] = statics;
    statics["calc"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    return ans;
}

Napi::Object testDeque2(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::steady_clock::time_point> time;

    //
    // get argument.
    auto env = info.Env();
    auto obj = info[0].As<Napi::Object>();
    auto N = obj.Get("N").ToNumber().Int32Value();
    MyDeque<int32_t> deq(N);

    //
    // simulate.
    time.push_back(std::chrono::high_resolution_clock::now());
    for (auto i = 0; i < N; i++) {
        deq.push_front(i);
        deq.pop_front();
    }
    time.push_back(std::chrono::high_resolution_clock::now());

    //
    // return null.
    auto ans = Napi::Object::New(env);
    auto statics = Napi::Object::New(env);
    if (deq.isEmpty())
        ans["ans"] = env.Undefined();
    else
        ans["ans"] = deq.peek_front();
    ans["statics"] = statics;
    statics["calc"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    return ans;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("testDeque1", Napi::Function::New(env, testDeque1));
    exports.Set("testDeque2", Napi::Function::New(env, testDeque2));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
#include <String>
#include <chrono>
#include <curl/curl.h>
#include <future>
#include <iostream>
#include <napi.h>
#include <stdio.h>
#include <thread>

// for sleepSync
void sleep_(const Napi::CallbackInfo& info)
{
    auto ms = info[0].ToNumber().Uint32Value();
    Sleep(ms);
}

size_t CurlWrite_CallbackFunc_StdString(void* contents, size_t size, size_t nmemb, std::string* s)
{
    size_t newLength = size * nmemb;
    s->append((char*)contents, newLength);
    return newLength;
}

void networkGet_impl(const std::string& url, std::string* docBody)
{
    //
    // response holder.
    std::string body = "";

    //
    // get.
    CURL* ctx = curl_easy_init();
    curl_easy_setopt(ctx, CURLOPT_URL, url.c_str());
    curl_easy_setopt(ctx, CURLOPT_BUFFERSIZE, CURL_MAX_READ_SIZE);
    curl_easy_setopt(ctx, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_2);
    curl_easy_setopt(ctx, CURLOPT_SSL_VERIFYPEER, 0L);
    curl_easy_setopt(ctx, CURLOPT_SSL_VERIFYHOST, 0L);
    curl_easy_setopt(ctx, CURLOPT_WRITEFUNCTION, CurlWrite_CallbackFunc_StdString);
    curl_easy_setopt(ctx, CURLOPT_WRITEDATA, &body);
    curl_easy_setopt(ctx, CURLOPT_USERAGENT,
                     "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) "
                     "Chrome/75.0.3770.100 Safari/537.36");
    CURLcode res = curl_easy_perform(ctx);
    if (res == CURLE_OK) {
        *docBody = body;
    }
    else {
        printf("%s \n", curl_easy_strerror(res));
    }
    curl_easy_cleanup(ctx);
}

Napi::Object networkGet_1(const Napi::CallbackInfo& info)
{
    //
    // get argument.
    auto env = info.Env();
    auto obj = info[0].As<Napi::Object>();
    std::string url = obj.Get("url").ToString().Utf8Value();
    int32_t parallel = obj.Get("parallel").ToNumber().Int32Value();
    //
    // send request.
    curl_global_init(CURL_GLOBAL_ALL);
    //
    // response holder.
    std::string body = "";

    //
    // get.
    CURL* ctx = curl_easy_init();
    curl_easy_setopt(ctx, CURLOPT_URL, url.c_str());
    curl_easy_setopt(ctx, CURLOPT_BUFFERSIZE, CURL_MAX_READ_SIZE);
    curl_easy_setopt(ctx, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_2);
    curl_easy_setopt(ctx, CURLOPT_SSL_VERIFYPEER, 0L);
    curl_easy_setopt(ctx, CURLOPT_SSL_VERIFYHOST, 0L);
    curl_easy_setopt(ctx, CURLOPT_WRITEFUNCTION, CurlWrite_CallbackFunc_StdString);
    curl_easy_setopt(ctx, CURLOPT_WRITEDATA, &body);
    curl_easy_setopt(ctx, CURLOPT_USERAGENT,
                     "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) "
                     "Chrome/75.0.3770.100 Safari/537.36");
    CURLcode res = curl_easy_perform(ctx);
    if (res != CURLE_OK) {
        printf("%s \n", curl_easy_strerror(res));
    }
    curl_easy_cleanup(ctx);
    curl_global_cleanup();

    auto ans = Napi::Object::New(env);
    auto statics = Napi::Object::New(env);
    ans["ans"] = body;
    ans["statics"] = statics;
    return ans;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("networkGet_1", Napi::Function::New(env, networkGet_1));
    exports.Set("sleepSync", Napi::Function::New(env, sleep_));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
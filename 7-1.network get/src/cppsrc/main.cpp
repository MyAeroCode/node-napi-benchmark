#include <chrono>
#include <curl/curl.h>
#include <iostream>
#include <napi.h>
#include <stdio.h>

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

Napi::Object networkGet(const Napi::CallbackInfo& info)
{
    std::vector<std::chrono::steady_clock::time_point> time;

    //
    // get argument.
    auto env = info.Env();
    auto obj = info[0].As<Napi::Object>();
    std::string url = obj.Get("url").ToString().Utf8Value();

    //
    // response holder.
    std::string body;
    std::string statString;
    uint32_t statCode = 0;

    //
    // get.
    time.push_back(std::chrono::high_resolution_clock::now());
    curl_global_init(CURL_GLOBAL_ALL);
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
    curl_easy_getinfo(ctx, CURLINFO_HTTP_CODE, &statCode);
    curl_easy_getinfo(ctx, CURLINFO_CONTENT_TYPE, &statString);
    time.push_back(std::chrono::high_resolution_clock::now());

    //
    // clean up.
    curl_easy_cleanup(ctx);
    curl_global_cleanup();

    //
    // return null.
    auto ans = Napi::Object::New(env);
    auto statics = Napi::Object::New(env);
    ans["ans"] = body;
    ans["statics"] = statics;
    statics["calc"] = std::chrono::duration_cast<std::chrono::nanoseconds>(time[1] - time[0]).count();
    return ans;
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    exports.Set("networkGet", Napi::Function::New(env, networkGet));
    exports.Set("sleepSync", Napi::Function::New(env, sleep_));
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
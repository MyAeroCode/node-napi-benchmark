#include <napi.h>

class AddonMap : public Napi::ObjectWrap<AddonMap> {
    private:
        int32_t *dat = nullptr;
        int32_t max = 0;

        static Napi::FunctionReference constructor;

        //
        // set {key, val} into stack.
        // returns true if successful.
        Napi::Value set(const Napi::CallbackInfo &info){
            auto env = info.Env();
            auto key = info[0].ToNumber().Int32Value();
            auto val = info[1].ToNumber().Int32Value();

            if(0 <= key && key < max) {
                dat[key] = val;
                return Napi::Boolean::New(env, true);
            }
            return Napi::Boolean::New(env, false);
        };

        //
        // get val using key.
        // if an invalid key is given, it returns undefined.
        Napi::Value get(const Napi::CallbackInfo &info){
            auto env = info.Env();
            auto key = info[0].ToNumber().Int32Value();

            if(0 <= key && key < max) {
                return Napi::Number::New(env, dat[key]);
            }
            return env.Undefined();
        };

    public:
    
        //
        // Insert this class to exports.
        static Napi::Object Init(Napi::Env env, Napi::Object exports){
            Napi::Function func = DefineClass(env, "AddonMap", {
                InstanceMethod("set", &AddonMap::set),
                InstanceMethod("get", &AddonMap::get),
            });

            // constructor = Napi::Persistent(func);
            // constructor.SuppressDestruct();
            exports.Set("AddonMap", func);
            return exports;
        };

        //
        // Constructor.
        AddonMap(const Napi::CallbackInfo &info) : Napi::ObjectWrap<AddonMap>(info){
            auto max = info[0].ToNumber().Uint32Value();
            this->max = max;
            this->dat = new int32_t[max]{0};
        };

        //
        // Destructor.
        ~AddonMap(){
            delete dat;
        };
};

//
// Init addon.
Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    AddonMap::Init(env, exports);
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
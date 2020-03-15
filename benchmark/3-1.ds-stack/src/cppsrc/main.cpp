#include <napi.h>

class AddonStack : public Napi::ObjectWrap<AddonStack> {
    private:
        int32_t *dat = nullptr;
        size_t idx = 0;
        size_t max = 0;

        static Napi::FunctionReference constructor;

        //
        // push val into stack.
        // returns false if no more elements can be inserted.
        Napi::Value push(const Napi::CallbackInfo &info){
            auto env = info.Env();
            auto val = info[0].ToNumber().Int32Value();

            if(idx != max){
                dat[idx++] = val;
                return Napi::Boolean::New(env, true);
            }
            return Napi::Boolean::New(env, false);
        };

        //
        // pop val from stack.
        // returns false if the stack is empty.
        // otherwise returns true.
        Napi::Value pop(const Napi::CallbackInfo &info){
            auto env = info.Env();
            if(idx != 0) {
                --idx;
                return Napi::Boolean::New(env, true);
            }
            return Napi::Boolean::New(env, false);
        };

        //
        // return top value of stack.
        // return undefined if the stack is empty.
        Napi::Value top(const Napi::CallbackInfo &info){
            auto env = info.Env();
            if(idx != 0) {
                return Napi::Number::New(env, dat[idx-1]);
            }
            return env.Undefined();
        };

        //
        // return stack is empty.
        Napi::Value empty(const Napi::CallbackInfo &info){
            auto env = info.Env();
            return Napi::Boolean::New(env, idx == 0);
        };

        //
        // return size of stack.
        Napi::Value size(const Napi::CallbackInfo& info){
            auto env = info.Env();
            return Napi::Number::New(env, idx);
        };

    public:
    
        //
        // Insert this class to exports.
        static Napi::Object Init(Napi::Env env, Napi::Object exports){
            Napi::Function func = DefineClass(env, "AddonStack", {
                InstanceMethod("push", &AddonStack::push),
                InstanceMethod("pop", &AddonStack::pop),
                InstanceMethod("top", &AddonStack::top),
                InstanceMethod("empty", &AddonStack::empty),
                InstanceMethod("size", &AddonStack::size),
            });

            // constructor = Napi::Persistent(func);
            // constructor.SuppressDestruct();
            exports.Set("AddonStack", func);
            return exports;
        };

        //
        // Constructor.
        AddonStack(const Napi::CallbackInfo &info) : Napi::ObjectWrap<AddonStack>(info){
            auto max = info[0].ToNumber().Uint32Value();
            this->max = max;
            this->dat = new int32_t[max];
        };

        //
        // Destructor.
        ~AddonStack(){
            delete dat;
        };
};

//
// Init addon.
Napi::Object InitAll(Napi::Env env, Napi::Object exports)
{
    AddonStack::Init(env, exports);
    return exports;
}

NODE_API_MODULE(testaddon, InitAll)
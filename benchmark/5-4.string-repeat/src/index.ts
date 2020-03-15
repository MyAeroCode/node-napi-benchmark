import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: (arg) => addon.stringRepeat(arg),
        name: "napi/string-repeat-logn"
    },
    {
        func: function({ str, N }) {
            let repeated = "";
            for (let i = 0; i < N; i++) {
                repeated += str;
            }
            return {
                ans: repeated,
                statics: {}
            };
        },
        name: "node/string-repeat-n"
    },
    {
        func: function({ str, N }) {
            let repeated = "";
            while (N !== 0) {
                if (N & 1) {
                    repeated += str;
                }
                str += str;
                N >>= 1;
            }
            return {
                ans: repeated,
                statics: {}
            };
        },
        name: "node/string-repeat-logn"
    },
    {
        func: function({ str, N }) {
            return {
                ans: str.repeat(N),
                statics: {}
            };
        },
        name: "node/string-repeat-builtin"
    }
];

//
// define TestCase supplier.
function createParam(N: number): AddonParamType {
    return {
        str: "Hello, World!",
        N
    };
}

//
// start benchmark.
const strcnt = [2, 3, 4].map((n) => Math.pow(10, n));
const repeat = 10000;
strcnt.forEach((n) => {
    const param = createParam(n);
    benchmark(targets, param, repeat, `N: ${n}`);
});

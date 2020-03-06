import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: addon.stringRepeat,
        name: "napi/string-repeat"
    },
    {
        func: function({ str, N }) {
            return {
                ans: str.repeat(N),
                statics: {}
            };
        },
        name: "node/string-repeat-repeat"
    },
    {
        func: function({ str, N }) {
            let arr: string[] = [];
            for (let i = 0; i < N; i++) {
                arr.push(str);
            }
            return {
                ans: "".concat(...arr),
                statics: {}
            };
        },
        name: "node/string-repeat-concat"
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
const strcnt = [2, 3, 4].map((v) => Math.pow(10, v));
const repeat = 10000;
strcnt.forEach((n) => {
    const param = createParam(n);
    benchmark(targets, param, repeat, `N: ${n}`);
});

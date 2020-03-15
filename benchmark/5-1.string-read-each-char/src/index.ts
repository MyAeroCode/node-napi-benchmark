import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: (arg) => addon.stringReadEachChar(arg),
        name: "napi/string-read"
    },
    {
        func: function ({ str }) {
            const len = str.length;
            let charSum = 0;
            for (let i = 0; i < len; i++) {
                charSum += str.charCodeAt(i);
            }

            return {
                ans: charSum,
                statics: {}
            };
        },
        name: "node/string-read"
    }
];

//
// define TestCase supplier.
function createParam(N: number): AddonParamType {
    const arr: number[] = [];
    for (let i = 0; i < N; i++) {
        arr.push(i);
    }
    return {
        str: arr.join("")
    };
}

//
// start benchmark.
const strcnt = [2, 4, 6].map((n) => Math.pow(10, n));
const repeat = 10000;
strcnt.forEach((n) => {
    const param = createParam(n);
    benchmark(targets, param, repeat, `N: ${n}`);
});

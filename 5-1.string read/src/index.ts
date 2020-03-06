import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: addon.stringRead,
        name: "napi/string-read"
    },
    {
        func: function createString({ str }) {
            let sum: number = 0;
            for (let i = 0; i < str.length; i++) {
                sum += str.charCodeAt(i);
            }
            return {
                ans: sum,
                statics: {}
            };
        },
        name: "node/string-read"
    }
];

//
// define TestCase supplier.
function createParam(N: number): AddonParamType {
    let arr: number[] = [];
    for (let i = 0; i < N; i++) {
        arr.push(i);
    }
    return {
        str: arr.join()
    };
}

//
// start benchmark.
const strcnt = [1, 2, 3].map((v) => Math.pow(10, v));
const repeat = 10000;
strcnt.forEach((n) => {
    const param = createParam(n);
    benchmark(targets, param, repeat, `N: ${n}`);
});

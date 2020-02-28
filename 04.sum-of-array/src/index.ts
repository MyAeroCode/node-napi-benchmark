import { benchmark, BenchmarkTarget } from "./benchmark";
import { addon, AddonParamType, AddonReturnType } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTarget<AddonReturnType>[] = [
    {
        func: addon.getSumOfArray,
        name: "napi/sum-of-array"
    },
    {
        func: function getSumOfArray({ numarr }) {
            let sum = 0;
            for (let i = 0; i < numarr.length; i++) {
                sum += numarr[i];
            }
            return {
                ans: sum,
                statics: {}
            };
        },
        name: "node/sum-of-array"
    }
];

//
// define TestCase supplier.
function createParam(N: number): AddonParamType {
    const arr: number[] = [];
    for (let i = 0; i < N; i++) {
        arr.push(Math.round(Math.random() * 100000));
    }
    return {
        numarr: arr
    };
}

//
// start benchmark.
const strcnt = [4, 5, 6].map((n) => Math.pow(10, n));
const repeat = 10000;
strcnt.forEach((n) => {
    const param = createParam(n);
    benchmark(targets, param, repeat, `N: ${n}`);
});

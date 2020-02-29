import { benchmark, BenchmarkTarget } from "./benchmark";
import { addon, AddonParamType, AddonReturnType } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTarget<AddonReturnType>[] = [
    {
        func: addon.sort,
        name: "napi/sort"
    },
    {
        func: function sort({ numarr }) {
            return {
                ans: numarr.sort(),
                statics: {}
            };
        },
        name: "node/sort"
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
const strcnt = [2, 3, 4, 5].map((n) => Math.pow(10, n));
const repeat = 10000;
strcnt.forEach((n) => {
    const param = createParam(n);
    benchmark(targets, param, repeat, `N: ${n}`);
});

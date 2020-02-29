import { benchmark, BenchmarkTarget } from "./benchmark";
import { addon, AddonParamType, AddonReturnType } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTarget<AddonReturnType>[] = [
    {
        func: addon.createRange,
        name: "napi/sort"
    },
    {
        func: function createRange({ end }) {
            const range: number[] = [];
            for (let i = 0; i < end; i++) {
                range.push(i);
            }
            return {
                ans: range,
                statics: {}
            };
        },
        name: "node/sort"
    }
];

//
// define TestCase supplier.
function createParam(N: number): AddonParamType {
    return {
        end: N
    };
}

//
// start benchmark.
const strcnt = [3, 4, 5].map((n) => Math.pow(10, n));
const repeat = 10000;
strcnt.forEach((n) => {
    const param = createParam(n);
    benchmark(targets, param, repeat, `N: ${n}`);
});

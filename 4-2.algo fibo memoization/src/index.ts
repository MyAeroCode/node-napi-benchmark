import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";
import { fibo, cache } from "./algo";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: addon.fibo,
        name: "napi/fibo-memoization"
    },
    {
        func: function fiboMemoization({ N }) {
            cache.clear();
            return {
                ans: fibo(N),
                statics: {}
            };
        },
        name: "node/fibo-memoization"
    }
];

//
// define TestCase supplier.
function createParam(N: number): AddonParamType {
    return {
        N
    };
}

//
// start benchmark.
const strcnt = [20, 45, 70];
const repeat = 10000;
strcnt.forEach((n) => {
    const param = createParam(n);
    benchmark(targets, param, repeat, `N: ${n}`);
});

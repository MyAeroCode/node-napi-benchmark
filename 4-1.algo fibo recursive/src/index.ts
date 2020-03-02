import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";
import { fibo } from "./algo";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: addon.fibo,
        name: "napi/fibo-recursive"
    },
    {
        func: function testMapTrr({ N }) {
            return {
                ans: fibo(N),
                statics: {}
            };
        },
        name: "node/fibo-recursive"
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
const strcnt = [20, 30, 40];
const repeat = 10000;
strcnt.forEach((n) => {
    const param = createParam(n);
    benchmark(targets, param, repeat, `N: ${n}`);
});

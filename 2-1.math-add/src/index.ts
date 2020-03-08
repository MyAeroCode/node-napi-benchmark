import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: (arg) => addon.mathAdd(arg),
        name: "napi/math-read"
    },
    {
        func: function({ N }) {
            let total = 0;
            for (let i = 0; i < N; i++) {
                total += i;
            }
            return {
                ans: total,
                statics: {}
            };
        },
        name: "node/math-read"
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
const strcnt = [4, 5, 6].map((n) => Math.pow(10, n));
const repeat = 10000;
strcnt.forEach((n) => {
    const param = createParam(n);
    benchmark(targets, param, repeat, `N: ${n}`);
});

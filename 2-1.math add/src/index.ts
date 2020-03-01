import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: addon.sum,
        name: "napi/math-sum"
    },
    {
        func: function sum({ N }) {
            let lastDouble = 0;
            for (let i = 0; i < N; i++) {
                lastDouble = i + i;
            }

            return {
                ans: lastDouble,
                statics: {}
            };
        },
        name: "node/math-sum"
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
const strcnt = [5, 6, 7].map((n) => Math.pow(10, n));
const repeat = 10000;
strcnt.forEach((n) => {
    const param = createParam(n);
    benchmark(targets, param, repeat, `N: ${n}`);
});

import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: addon.bit,
        name: "napi/math-bit"
    },
    {
        func: function bit({ N }) {
            let result = 0;
            for (let i = 0; i < N; i++) {
                result |= i;
                result &= i;
                result <<= 1;
                result = ~result;
                result >>= 1;
            }

            return {
                ans: result,
                statics: {}
            };
        },
        name: "node/math-bit"
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

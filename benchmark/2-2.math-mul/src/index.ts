import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: (arg) => addon.mathMul(arg),
        name: "napi/math-mul"
    },
    {
        func: function({ N }) {
            let lastSqure = 1;
            for (let i = 0; i < N; i++) {
                lastSqure = i * i;
            }
            return { 
                ans: lastSqure,
                statics: {}
            };
        },
        name: "node/math-mul"
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

import { benchmark, BenchmarkTarget } from "./benchmark";
import { addon, AddonParamType, AddonReturnType } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTarget<AddonReturnType>[] = [
    {
        func: addon.getSumOfRange,
        name: "napi"
    },
    {
        func: function getSumOfRange({ end }) {
            let sumOfRange = 0;
            for (let i = 0; i < end; i++) {
                sumOfRange += i;
            }
            return {
                ans: sumOfRange,
                statics: {}
            };
        },
        name: "node"
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
const strcnt = [6, 7, 8].map((n) => Math.pow(10, n));
const repeat = 10000;
strcnt.forEach((n) => {
    const param = createParam(n);
    benchmark(targets, param, repeat, `N: ${n}`);
});

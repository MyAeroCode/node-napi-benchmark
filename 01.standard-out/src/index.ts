import { benchmark, BenchmarkTarget } from "./benchmark";
import { addon, AddonParamType, AddonReturnType } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTarget<AddonReturnType>[] = [
    {
        func: addon.standardOut,
        name: "napi"
    },
    {
        func: function standardOut({ cnt, str }) {
            for (let i = 0; i < cnt; i++) {
                process.stdout.write(`${str}\r`);
            }
            return {
                ans: null,
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
        cnt: N,
        str: "Hello, World!"
    };
}

//
// start benchmark.
const strcnt = [1, 2, 3].map((n) => Math.pow(10, n));
const repeat = 10000;
strcnt.forEach((n) => {
    const param = createParam(n);
    benchmark(targets, param, repeat, `N: ${n}`);
});

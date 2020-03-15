import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: (arg) => addon.stringCreate(arg),
        name: "napi/string-create"
    },
    {
        func: function({ N }) {
            const arr: string[] = [];
            for (let i = 0; i < N; i++) {
                arr[i] = String(i);
            }
            return {
                ans: arr,
                statics: {}
            };
        },
        name: "node/string-create"
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
const strcnt = [2, 3, 4].map((n) => Math.pow(10, n));
const repeat = 10000;
strcnt.forEach((n) => {
    const param = createParam(n);
    benchmark(targets, param, repeat, `N: ${n}`);
});

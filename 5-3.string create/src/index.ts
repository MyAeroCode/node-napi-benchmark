import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: addon.stringCreate,
        name: "napi/string-create"
    },
    {
        func: function({ N }) {
            const arr: string[] = [];
            for (let i = 0; i < N; i++) {
                arr.push(String(i));
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
const strcnt = [1, 2, 3].map((v) => Math.pow(10, v));
const repeat = 10000;
strcnt.forEach((n) => {
    const param = createParam(n);
    benchmark(targets, param, repeat, `N: ${n}`);
});

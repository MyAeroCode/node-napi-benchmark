import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: addon.arrayReadArr,
        name: "napi/array-read-arr"
    },
    {
        func: addon.arrayReadTrr,
        name: "addon/array-read-trr"
    },
    {
        func: function arrayReadArr({ arr }) {
            let num = 0;
            for (let i = 0; i < arr.length; i++) {
                num = arr[i];
            }

            return {
                ans: num,
                statics: {}
            };
        },
        name: "node/array-read-arr"
    },
    {
        func: function arrayReadTrr({ trr }) {
            let num = 0;
            for (let i = 0; i < trr.length; i++) {
                num = trr[i];
            }

            return {
                ans: num,
                statics: {}
            };
        },
        name: "node/array-read-trr"
    }
];

//
// define TestCase supplier.
function createParam(N: number): AddonParamType {
    const arr = [];
    const trr = new Int32Array(N);
    for (let i = 0; i < N; i++) {
        arr[i] = i;
        trr[i] = i;
    }

    return {
        arr,
        trr
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

import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: addon.arraySortTrr,
        name: "addon/array-sort-trr"
    },
    {
        func: function arraySortArr({ arr }) {
            return {
                ans: arr.sort(),
                statics: {}
            };
        },
        name: "node/array-sort-arr"
    },
    {
        func: function arraySortTrr({ trr }) {
            return {
                ans: trr.sort(),
                statics: {}
            };
        },
        name: "node/array-sort-trr"
    }
];

//
// define TestCase supplier.
function createParam(N: number): AddonParamType {
    const arr = [];
    const trr = new Int32Array(N);
    for (let i = 0; i < N; i++) {
        const num = i;
        arr[i] = num;
        trr[i] = num;
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

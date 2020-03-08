import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType, SEL } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: (arg) => addon.arraySort(arg, SEL.ARRAY),
        name: "napi/array-sort-arr"
    },
    {
        func: (arg) => addon.arraySort(arg, SEL.TYPED_ARRAY),
        name: "addon/array-sort-trr"
    },
    {
        func: function({ arr }) {
            arr.sort();
            return {
                ans: undefined,
                statics: {}
            };
        },
        name: "node/array-sort-arr"
    },
    {
        func: function({ trr }) {
            trr.sort();
            return {
                ans: undefined,
                statics: {}
            };
        },
        name: "node/array-sort-trr"
    }
];

//
// define TestCase supplier.
function createParam(N: number): AddonParamType {
    const arr: number[] = [];
    const trr: Int32Array = new Int32Array(N);
    for (let i = 0; i < N; i++) {
        const num = Math.floor(Math.random() * 1000000);
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
const strcnt = [2, 3, 4].map((n) => Math.pow(10, n));
const repeat = 10000;
strcnt.forEach((n) => {
    const param = createParam(n);
    benchmark(targets, param, repeat, `N: ${n}`);
});

import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType, SEL } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: (arg) => addon.arrayRead(arg, SEL.ARRAY),
        name: "napi/array-read-arr"
    },
    {
        func: (arg) => addon.arrayRead(arg, SEL.TYPED_ARRAY),
        name: "addon/array-read-trr"
    },
    {
        func: function({ arr }) {
            let lastNum = 0;
            for(let i=0; i<arr.length; i++){
                lastNum = arr[i];
            }

            return {
                ans: lastNum,
                statics: {}
            };
        },
        name: "node/array-read-arr"
    },
    {
        func: function({ trr }) {
            let lastNum = 0;
            for(let i=0; i<trr.length; i++){
                lastNum = trr[i];
            }

            return {
                ans: lastNum,
                statics: {}
            };
        },
        name: "node/array-read-trr"
    }
];

//
// define TestCase supplier.
function createParam(N: number): AddonParamType {
    const arr : number[] = [];
    const trr : Int32Array = new Int32Array(N);
    for(let i=0; i<N; i++){
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
const strcnt = [2, 3, 4].map((n) => Math.pow(10, n));
const repeat = 10000;
strcnt.forEach((n) => {
    const param = createParam(n);
    benchmark(targets, param, repeat, `N: ${n}`);
});

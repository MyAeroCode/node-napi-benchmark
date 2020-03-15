import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType, SEL } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: (arg) => addon.arrayWrite(arg, SEL.ARRAY),
        name: "napi/array-write-arr"
    },
    {
        func: (arg) => addon.arrayWrite(arg, SEL.TYPED_ARRAY),
        name: "addon/array-write-trr"
    },
    {
        func: function({ end }) {
            const array: number[] = [];
            for (let i = 0; i < end; i++) {
                array[i] = i;
            }

            return {
                ans: array,
                statics: {}
            };
        },
        name: "node/array-write-arr"
    },
    {
        func: function({ end }) {
            const array = new Int32Array(end);
            for (let i = 0; i < end; i++) {
                array[i] = i;
            }

            return {
                ans: array,
                statics: {}
            };
        },
        name: "node/array-write-trr"
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
const strcnt = [2, 3, 4].map((n) => Math.pow(10, n));
const repeat = 10000;
strcnt.forEach((n) => {
    const param = createParam(n);
    benchmark(targets, param, repeat, `N: ${n}`);
});

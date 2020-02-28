import { benchmark, BenchmarkTarget } from "./benchmark";
import { addon, AddonParamType, AddonReturnType } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTarget<AddonReturnType>[] = [
    {
        func: addon.joinStringArray,
        name: "napi/join-string-array"
    },
    {
        func: function joinStringArrayByStrPlus({ strarr }) {
            let joined = "";
            for (let i = 0; i < strarr.length; i++) {
                joined += strarr[i];
            }
            return {
                ans: joined,
                statics: {}
            };
        },
        name: "node/join-string-array-strplus"
    },
    {
        func: function joinStringArrayByArrJoin({ strarr }) {
            return {
                ans: strarr.join(),
                statics: {}
            };
        },
        name: "node/join-string-array-arrjoin"
    }
];

//
// define TestCase supplier.
function createParam(N: number): AddonParamType {
    const arr: string[] = [];
    for (let i = 0; i < N; i++) {
        arr.push("-".repeat(Math.round(Math.random() * 100)));
    }
    return {
        strarr: arr
    };
}

//
// start benchmark.
const strcnt = [2, 3, 4, 5, 6].map((n) => Math.pow(10, n));
const repeat = 10000;
strcnt.forEach((n) => {
    const param = createParam(n);
    benchmark(targets, param, repeat, `N: ${n}`);
});

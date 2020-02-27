import { benchmark, BenchmarkTarget } from "./benchmark";
import { addon, ParamType } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTarget[] = [
    {
        func: addon.reduce_v1,
        name: "napi/reduce_v1"
    },
    {
        func: addon.reduce_v2,
        name: "napi/reduce_v2"
    },
    {
        func: ({ numarr }) => {
            let sum = 0;
            for (let i = 0; i < numarr!!.length; i++) {
                sum += numarr!![i];
            }
            return sum;
        },
        name: "node/reduce_v1"
    },
    {
        func: ({ n }) => {
            let sum = 0;
            for (let i = 0; i < n!!; i++) {
                sum += i;
            }
            return sum;
        },
        name: "node/reduce_v2"
    }
];

//
// define TestCase supplier.
function createParam(N: number): ParamType {
    const arr: number[] = [];
    for (let i = 0; i < N; i++) {
        arr.push(i);
    }
    return {
        numarr: arr,
        n: N
    };
}

//
// start benchmark.
const strcnt = [5, 6, 7].map((n) => Math.pow(10, n));
const repeat = 1000;
strcnt.forEach((n) => {
    const param = createParam(n);
    benchmark(targets, param, repeat, `N: ${n}`);
});

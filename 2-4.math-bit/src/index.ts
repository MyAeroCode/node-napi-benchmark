import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: (arg) => addon.mathMod(arg),
        name: "napi/math-bit"
    },
    {
        func: function({ trr }) {
            const len = trr.length;
            const ans = new Int32Array(len);
            for (let i = 0; i < len; i++) {
                let v = i;
                v |= i;
                v &= i;
                v <<= 1;
                v = ~v;
                v >>= 1;
                ans[i] = v;
            }

            return { 
                ans: ans,
                statics: {}
            };
        },
        name: "node/math-bit"
    }
];

//
// define TestCase supplier.
function createParam(N: number): AddonParamType {
    const trr = new Int32Array(N);
    for(let i=0; i<N; i++){
        trr[i] = i;
    }

    return {
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

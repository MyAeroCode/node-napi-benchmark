import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: (arg) => addon.mathMod(arg),
        name: "napi/math-mod"
    },
    {
        func: function({ trr }) {
            const len = trr.length;
            const ans = new Int32Array(len);
            for(let i=0; i<len; i++){
                ans[i] = trr[i] % 7;
            }
            return { 
                ans: ans,
                statics: {}
            };
        },
        name: "node/math-mod"
    }
];

//
// define TestCase supplier.
function createParam(N: number): AddonParamType {
    const trr = new Int32Array(N);
    for(let i=0; i<N; i++){
        trr[i] = Math.floor(Math.random() * 10000);
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

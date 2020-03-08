import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: (arg) => addon.mathMod(arg),
        name: "napi/algo-fibo-recursive"
    },
    {
        func: function({ N }) {
            function fibo(n : number) : number{
                if(n === 1) return 0;
                if(n === 2) return 1;
                if(n === 3) return 1;
                return fibo(n-1) + fibo(n-2);
            }

            return { 
                ans: fibo(N),
                statics: {}
            };
        },
        name: "node/algo-fibo-recursive"
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
const strcnt = [20, 25, 30]; //.map((n) => Math.pow(10, n));
const repeat = 10000;
strcnt.forEach((n) => {
    const param = createParam(n);
    benchmark(targets, param, repeat, `N: ${n}`);
});

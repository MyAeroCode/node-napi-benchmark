import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: addon.stringWrite,
        name: "napi/string-read"
    },
    {
        func: function({ str }) {
            //
            // In javascript, strings are immutable.
            let buf = Array.from(str);
            for (let i = 0; i < str.length; i++) {
                buf[i] = buf[i] === "0" ? "1" : "0";
            }
            return {
                ans: buf.join(""),
                statics: {}
            };
        },
        name: "node/string-read"
    }
];

//
// define TestCase supplier.
function createParam(N: number): AddonParamType {
    let arr: number[] = [];
    for (let i = 0; i < N; i++) {
        arr.push(Math.random() > 0.5 ? 0 : 1);
    }
    return {
        str: arr.join()
    };
}

//
// start benchmark.
const strcnt = [1, 2, 3, 4, 5, 6].map((v) => Math.pow(10, v));
const repeat = 10000;
strcnt.forEach((n) => {
    const param = createParam(n);
    benchmark(targets, param, repeat, `N: ${n}`);
});

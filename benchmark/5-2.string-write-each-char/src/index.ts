import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: (arg) => addon.stringWriteEachChar(arg),
        name: "napi/string-write"
    },
    {
        func: function ({ str }) {
            const arr: string[] = [];
            const len = str.length;
            for (let i = 0; i < len; i++) {
                const ch = str.charAt(i);
                arr.push(ch === "0" ? "1" : "0");
            }
            return {
                ans: arr.join(""),
                statics: {}
            };
        },
        name: "node/string-write"
    },
    {
        func: function ({ str }) {
            const buf = Buffer.from(str);
            const zero = "0".charCodeAt(0);
            const one = "1".charCodeAt(0);
            for (let i = 0; i < buf.length; i++) {
                buf[i] = buf[i] == zero ? one : zero;
            }
            return {
                ans: buf.toString(),
                statics: {}
            };
        },
        name: "node/buffer-write"
    }
];

//
// define TestCase supplier.
function createParam(N: number): AddonParamType {
    const arr: number[] = [];
    for (let i = 0; i < N; i++) {
        arr[i] = i % 2;
    }
    return {
        str: arr.join("")
    };
}

//
// start benchmark.
const strcnt = [3, 4, 5].map((n) => Math.pow(10, n));
const repeat = 10000;
strcnt.forEach((n) => {
    const param = createParam(n);
    benchmark(targets, param, repeat, `N: ${n}`);
});

import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";
import { writeFileSync } from "fs";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: (arg) => addon.fileWrite(arg),
        name: "napi/file-write"
    },
    {
        func: function({ dat }) {
            const filename = "node" + dat.length;
            writeFileSync(filename, dat);
            writeFileSync(filename, new Uint8Array(0));
            return {
                ans: undefined,
                statics: {}
            };
        },
        name: "node/file-write"
    }
];

//
// define TestCase supplier.
function createParam(N: number): AddonParamType {
    const dat = new Uint8Array(N);
    dat.fill(" ".charCodeAt(0));
    return {
        dat
    };
}

//
// start benchmark.
const strcnt = [3, 6, 9].map((n) => Math.pow(10, n));
const repeat = 1000;
strcnt.forEach((n) => {
    const param = createParam(n);
    benchmark(targets, param, repeat, `N: ${n}`);
});

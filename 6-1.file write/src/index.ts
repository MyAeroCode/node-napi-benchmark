import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";
import { writeFileSync } from "fs";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: addon.fileWrite,
        name: "napi/file-write"
    },
    {
        func: function fileWrite({ dat }) {
            writeFileSync("file_node", dat);
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
    const buf = new Uint8Array(N);
    const dot = ".".charCodeAt(0);
    buf.fill(dot);
    return {
        dat: buf
    };
}

//
// start benchmark.
const strcnt = [1, 2, 3].map((n) => Math.pow(1024, n));
const repeat = 10000;
strcnt.forEach((n) => {
    const param = createParam(n);
    benchmark(targets, param, repeat, `N: ${n}`);
});

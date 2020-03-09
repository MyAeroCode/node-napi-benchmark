import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";
import { writeFileSync, readFileSync } from "fs";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: (arg) => addon.fileRead(arg),
        name: "napi/file-read"
    },
    {
        func: function({ N }) {
            const filename = "file_" + N;
            const buf = readFileSync(filename);
            return {
                ans: buf,
                statics: {}
            };
        },
        name: "node/file-read"
    }
];

//
// define TestCase supplier.
function createParam(N: number): AddonParamType {
    const dat = new Uint8Array(N);
    dat.fill(" ".charCodeAt(0));
    writeFileSync("file_" + N, dat);
    return {
        N
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

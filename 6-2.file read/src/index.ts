import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";
import { writeFileSync, readFileSync } from "fs";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: (arg) => {
            let rawAns = addon.fileRead(arg);
            return rawAns;
            // {
            //     ans: Buffer.from(rawAns.ans),
            //     statics: rawAns.statics
            // };
        },
        name: "napi/file-read"
    },
    {
        func: function fileRead({ N }) {
            let file = readFileSync("file_node" + N);
            return {
                ans: file,
                statics: {}
            };
        },
        name: "node/file-read"
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
const strcnt = [1, 2, 3].map((n) => Math.pow(1024, n));
const repeat = 100;
strcnt.forEach((n) => {
    const param = createParam(n);
    benchmark(targets, param, repeat, `N: ${n}`);
});

import { benchmark, BenchmarkTarget } from "./benchmark";
import { addon, ParamType } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTarget[] = [
    {
        func: addon.nothing,
        name: "napi/nothing"
    },
    {
        func: addon.join,
        name: "napi/concat"
    },
    {
        func: ({ strarr }) => {
            let joined = "";
            for (let i = 0; i < strarr.length; i++) {
                joined += strarr[i];
            }
            return joined;
        },
        name: "node/concat"
    },
    {
        func: ({ strarr }) => strarr.join(),
        name: "node/join"
    }
];

//
// define TestCase supplier.
function createParam(strCnt: number, strLen: number): ParamType {
    const arr: string[] = [];
    for (let i = 0; i < strCnt; i++) {
        let word: string = "-".repeat(strLen);
        arr.push(word);
    }
    return {
        strarr: arr
    };
}

//
// start benchmark.
const strcnt = [3, 4, 5].map((n) => Math.pow(10, n));
const biglen = 1000;
const smllen = 10;
const repeat = 1000;

console.log(`\n#1 - wordlen:${biglen}`);
strcnt.forEach((n) => {
    const param = createParam(n, biglen);
    benchmark(targets, param, repeat, `wordCnt: ${n}`);
});

console.log(`\n#2 - wordlen:${smllen}`);
strcnt.forEach((n) => {
    const param = createParam(n, smllen);
    benchmark(targets, param, repeat, `wordCnt: ${n}`);
});

console.log(`\n#3 - wordlen:${999999}`);
[1, 10, 100].forEach((n) => {
    const param = createParam(n, 999999);
    benchmark(targets, param, repeat, `wordCnt: ${n}`);
});

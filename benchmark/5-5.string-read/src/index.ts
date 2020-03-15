import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType, SEL } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    // {
    //     func: (arg) => addon.stringRead(arg, SEL.STRING),
    //     name: "napi/string-read-as-string"
    // },
    {
        func: (arg) => addon.stringRead(arg, SEL.TYPED_ARRAY_1),
        name: "napi/string-read-as-typed-1"
    },
    {
        func: (arg) => addon.stringRead(arg, SEL.TYPED_ARRAY_2),
        name: "napi/string-read-as-typed-2"
    }
];

//
// define TestCase supplier.
function createParam(N: number): AddonParamType {
    const arr: number[] = [];
    for (let i = 0; i < N; i++) {
        arr.push(i);
    }
    const str = arr.join("");
    const buf = Buffer.from(str);

    return {
        str,
        trr: buf
    };
}

//
// start benchmark.
const strcnt = [4, 5, 6].map((n) => Math.pow(10, n));
const repeat = 10000;
strcnt.forEach(convert2bufferTest);
strcnt.forEach((n) => {
    const param = createParam(n);
    benchmark(targets, param, repeat, `N: ${n}`);
});

function convert2bufferTest(N: number) {
    const arr: number[] = [];
    for (let i = 0; i < N; i++) {
        arr.push(i);
    }
    const str = arr.join("");

    let total = 0;
    for (let i = 0; i < repeat; i++) {
        const srt = process.hrtime();
        const buf = Buffer.from(str);
        const end = process.hrtime(srt);
        total += end[0] * 1e9 + end[1];
    }
    console.log(`cast to buffer elpased : ${total / 1e4 / 1e3} us`);
}

import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType, SEL } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: (arg) => addon.stringRead(arg, SEL.STRING),
        name: "napi/string-read-as-string"
    },
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
    const trr = Uint8Array.from(Buffer.from(str));

    return {
        str,
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

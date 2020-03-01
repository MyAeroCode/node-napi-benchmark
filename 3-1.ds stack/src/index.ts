import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: addon.testStack1,
        name: "napi/ds-std-stack"
    },
    {
        func: addon.testStack2,
        name: "napi/ds-arr-stack"
    },
    {
        func: function testStackTrr({ input }) {
            const len = input.length;
            const stack = new Int32Array(len);
            let cur = 0;
            for (let i = 0; i < len; i++) {
                const thisNum = input[i];
                if (thisNum < 0) cur = cur === 0 ? 0 : cur - 1;
                else stack[cur++] = thisNum;
            }
            return {
                ans: cur === 0 ? undefined : stack[cur - 1],
                statics: {}
            };
        },
        name: "node/ds-test-stack-arr"
    },
    {
        func: function testStackArr({ input }) {
            const len = input.length;
            const stack = [];
            for (let i = 0; i < len; i++) {
                const thisNum = input[i];
                if (thisNum < 0) stack.pop();
                else stack.push(thisNum);
            }
            return {
                ans: stack.pop(),
                statics: {}
            };
        },
        name: "node/ds-test-stack-trr"
    }
];

//
// define TestCase supplier.
function createParam(N: number): AddonParamType {
    const input = new Int32Array(N);
    for (let i = 0; i < N; i++) {
        const num = Math.floor(Math.random() * 1e3);
        input[i] = num < 200 ? -1 : num;
    }
    return {
        input
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

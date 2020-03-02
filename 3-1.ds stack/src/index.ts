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
        func: function testStackTrr({ N }) {
            const stack = new Int32Array(N);
            let cur = 0;
            for (let i = 0; i < N; i++) {
                stack[cur++] = i;
                --cur;
            }
            return {
                ans: cur === 0 ? undefined : stack[cur - 1],
                statics: {}
            };
        },
        name: "node/ds-test-stack-arr"
    },
    {
        func: function testStackArr({ N }) {
            const stack = [];
            for (let i = 0; i < N; i++) {
                stack.push(N);
                stack.pop();
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
    return {
        N
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

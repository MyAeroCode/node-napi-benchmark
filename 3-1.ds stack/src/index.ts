import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";
import { MyStack } from "./mystack";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: addon.testStack1,
        name: "napi/ds-std-stack"
    },
    {
        func: addon.testStack2,
        name: "napi/ds-my-stack"
    },
    {
        func: function testStackTrr({ N }) {
            const stack = new MyStack(Int32Array, N);
            for (let i = 0; i < N; i++) {
                stack.push(N);
            }
            for (let i = 0; i < N; i++) {
                stack.pop();
            }
            return {
                ans: stack.isEmpty() ? undefined : stack.top(),
                statics: {}
            };
        },
        name: "node/ds-my-stack"
    },
    {
        func: function testStackArr({ N }) {
            const stack = [];
            for (let i = 0; i < N; i++) {
                stack.push(N);
            }
            for (let i = 0; i < N; i++) {
                stack.pop();
            }
            return {
                ans: stack.pop(),
                statics: {}
            };
        },
        name: "node/ds-array-stack"
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

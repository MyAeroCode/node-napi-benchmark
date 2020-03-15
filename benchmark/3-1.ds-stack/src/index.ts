import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";
import { TypedStack } from "./typedstack";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: function({ N }) {
            const { AddonStack } = addon;
            const addonStack = new AddonStack(N);
            for (let i = 0; i < N; i++) {
                addonStack.push(i);
                addonStack.top();
            }

            return {
                ans: undefined,
                statics: {}
            };
        },
        name: "napi/ds-addon-stack"
    },
    {
        func: function({ N }) {
            const arrayStack = [];
            for (let i = 0; i < N; i++) {
                arrayStack.push(i);
                arrayStack[i];
            }

            return {
                ans: undefined,
                statics: {}
            };
        },
        name: "node/ds-array-stack"
    },
    {
        func: function({ N }) {
            const typedStack = new TypedStack(N);
            for (let i = 0; i < N; i++) {
                typedStack.push(i);
                typedStack.top();
            }

            return {
                ans: undefined,
                statics: {}
            };
        },
        name: "node/ds-typed-stack"
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
const strcnt = [2, 3, 4].map((n) => Math.pow(10, n));
const repeat = 10000;
strcnt.forEach((n) => {
    const param = createParam(n);
    benchmark(targets, param, repeat, `N: ${n}`);
});

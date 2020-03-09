import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";
import { TypedMap } from "./typedmap";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: function({ N }) {
            const { AddonMap: AddonStack } = addon;
            const addonStack = new AddonStack(N);
            for (let i = 0; i < N; i++) {
                addonStack.set(i, i);
                addonStack.get(i);
            }

            return {
                ans: undefined,
                statics: {}
            };
        },
        name: "napi/ds-addon-map"
    },
    {
        func: function({ N }) {
            const builtinMap = new Map<number, number>();
            for (let i = 0; i < N; i++) {
                builtinMap.set(i, i);
                builtinMap.get(i);
            }

            return {
                ans: undefined,
                statics: {}
            };
        },
        name: "node/ds-builtin-map"
    },
    {
        func: function({ N }) {
            const objectMap: any = {};
            for (let i = 0; i < N; i++) {
                objectMap[i] = i;
                objectMap[i];
            }

            return {
                ans: undefined,
                statics: {}
            };
        },
        name: "node/ds-object-map"
    },
    {
        func: function({ N }) {
            const typedMap = new TypedMap(N);
            for (let i = 0; i < N; i++) {
                typedMap.set(i, i);
                typedMap.get(i);
            }

            return {
                ans: undefined,
                statics: {}
            };
        },
        name: "node/ds-typed-map"
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

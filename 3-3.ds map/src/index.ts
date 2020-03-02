import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: addon.testMap,
        name: "napi/ds-std-map"
    },
    {
        func: function testMapTrr({ N }) {
            const map = new Map<number, number>();

            const writeSrt = process.hrtime();
            for (let i = 0; i < N; i++) {
                map.set(i, i);
            }
            const writeElapsed = process.hrtime(writeSrt);

            const readSrt = process.hrtime();
            let lastNum = 0;
            for (let e of map.values()) {
                lastNum = e;
            }
            lastNum += 1;
            const readElapsed = process.hrtime(readSrt);

            const deleteSrt = process.hrtime();
            for (let k of map.keys()) {
                map.delete(k);
            }
            const deleteElapsed = process.hrtime(deleteSrt);

            return {
                ans: undefined,
                statics: {
                    w: writeElapsed[0] * 1e9 + writeElapsed[1],
                    r: readElapsed[0] * 1e9 + readElapsed[1],
                    d: deleteElapsed[0] * 1e9 + deleteElapsed[1]
                }
            };
        },
        name: "node/ds-std-map"
    },
    {
        func: function testmapArr({ N }) {
            const map: { [key: number]: number } = {};

            const writeSrt = process.hrtime();
            for (let i = 0; i < N; i++) {
                map[i] = i;
            }
            const writeElapsed = process.hrtime(writeSrt);

            const readSrt = process.hrtime();
            let lastNum = 0;
            for (let k in map) {
                lastNum = map[k];
            }
            lastNum += 1;
            const readElapsed = process.hrtime(readSrt);

            const deleteSrt = process.hrtime();
            for (let k in map) {
                delete map[k];
            }
            const deleteElapsed = process.hrtime(deleteSrt);

            return {
                ans: undefined,
                statics: {
                    w: writeElapsed[0] * 1e9 + writeElapsed[1],
                    r: readElapsed[0] * 1e9 + readElapsed[1],
                    d: deleteElapsed[0] * 1e9 + deleteElapsed[1]
                }
            };
        },
        name: "node/ds-obj-map"
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
const strcnt = [3, 4, 5].map((n) => Math.pow(10, n));
const repeat = 10000;
strcnt.forEach((n) => {
    const param = createParam(n);
    benchmark(targets, param, repeat, `N: ${n}`);
});

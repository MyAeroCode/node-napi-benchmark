import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";
import { MyDeque } from "./mydeque";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: addon.testDeque1,
        name: "napi/ds-std-deque"
    },
    {
        func: addon.testDeque2,
        name: "napi/ds-my-deque"
    },
    {
        func: function testDequeTrr({ N }) {
            const deque = new MyDeque(Int32Array, N);
            for (let i = 0; i < N; i++) {
                deque.push_front(i);
                deque.pop_front();
            }
            return {
                ans: deque.peek_front(),
                statics: {}
            };
        },
        name: "node/ds-my-deque"
    },
    {
        func: function testDequeArr({ N }) {
            const deque = [];
            for (let i = 0; i < N; i++) {
                deque.unshift(i);
                deque.shift();
            }
            return {
                ans: deque[0],
                statics: {}
            };
        },
        name: "node/ds-arr-deque"
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

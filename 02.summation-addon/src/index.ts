//
// for require alias.
require("module-alias/register");

/**
 * import addon module.
 */
interface MyModule {
    summation: (n: number) => number;
}
const myModule: MyModule = require("@addon/my-addon.node");

/**
 * Returns the execution time of a given function.
 */
function getExecutionTime(func: () => any): number {
    const srt = Date.now();
    func();
    const end = Date.now();
    return end - srt;
}

/**
 * addon version function.
 */
function function_addon(n: number): number {
    return myModule.summation(n);
}

/**
 * node version function.
 */
function function_node(n: number): number {
    let sum = 0;
    for (let i = 0; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/**
 * benchmark function.
 */
export function benchmark(n: number, repeat: number) {
    let avg_time_addon = 0;
    let avg_time_node = 0;
    for (let i = 0; i < repeat; i++) avg_time_addon += getExecutionTime(() => function_addon(n));
    for (let i = 0; i < repeat; i++) avg_time_node += getExecutionTime(() => function_node(n));

    console.log("----------------------------------");
    console.log(`cnt: ${n}, repeat: ${repeat}`);
    console.log(`addon : ${avg_time_addon / repeat} ms`);
    console.log(`node  : ${avg_time_node / repeat} ms`);
}

//
// start benchmark.
let testcase = [4, 5, 6, 7, 8].map((n) => Math.pow(10, n));
testcase.forEach((n) => benchmark(n, 1000));

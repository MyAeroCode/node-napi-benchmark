//
// for require alias.
require("module-alias/register");

/**
 * import addon module.
 */
interface MyModule {
    join: (strarr: string[], separator: string) => string;
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
function function_addon(strarr: string[], separator: string): string {
    return myModule.join(strarr, separator);
}

/**
 * node version function.
 */
function function_node_v1(strarr: string[], separator: string): string {
    return strarr.join(separator);
}

/**
 * node version function.
 */
function function_node_v2(strarr: string[], separator: string): string {
    let joined = "";
    for (let i = 0; i < strarr.length; i++) {
        joined += strarr[i] + separator;
    }
    return joined;
}

/**
 * benchmark function.
 */
export function benchmark(n: number, repeat: number) {
    let avg_time_addon = 0;
    let avg_time_node1 = 0;
    let avg_time_node2 = 0;

    let separator: string = String(n);
    let strarr: string[] = [];
    for (let i = 0; i < n; i++) {
        strarr.push(String(i));
    }

    for (let i = 0; i < repeat; i++) avg_time_addon += getExecutionTime(() => function_addon(strarr, separator));
    for (let i = 0; i < repeat; i++) avg_time_node1 += getExecutionTime(() => function_node_v1(strarr, separator));
    for (let i = 0; i < repeat; i++) avg_time_node2 += getExecutionTime(() => function_node_v2(strarr, separator));

    console.log("----------------------------------");
    console.log(`n: ${n}, repeat: ${repeat}`);
    console.log(`addon : ${avg_time_addon / repeat} ms`);
    console.log(`node1 : ${avg_time_node1 / repeat} ms`);
    console.log(`node2 : ${avg_time_node2 / repeat} ms`);
}

//
// start benchmark.
let testcase = [3, 4, 5].map((n) => Math.pow(10, n));
testcase.forEach((n) => benchmark(n, 1000));

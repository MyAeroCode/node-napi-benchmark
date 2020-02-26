//
// for require alias.
require("module-alias/register");

/**
 * import addon module.
 */
interface MyModule {
    join: (strarr: string[], separator: string) => string;
    nothing: (strarr: string[], separator: string) => string;
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
 * addon version function. myModule.join()
 */
function function_addon_v1(strarr: string[], separator: string): string {
    return myModule.join(strarr, separator);
}

/**
 * addon version function. myModule.nothing()
 */
function function_addon_v2(strarr: string[], separator: string): string {
    return myModule.nothing(strarr, separator);
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
function benchmark1(n: number, repeat: number) {
    let avg_time_addon = 0;
    let avg_time_node1 = 0;
    let avg_time_node2 = 0;

    let separator: string = String(n);
    let strarr: string[] = [];
    for (let i = 0; i < n; i++) {
        strarr.push(String(i));
    }

    for (let i = 0; i < repeat; i++) avg_time_addon += getExecutionTime(() => function_addon_v1(strarr, separator));
    for (let i = 0; i < repeat; i++) avg_time_node1 += getExecutionTime(() => function_node_v1(strarr, separator));
    for (let i = 0; i < repeat; i++) avg_time_node2 += getExecutionTime(() => function_node_v2(strarr, separator));

    console.log("----------------------------------");
    console.log(`n: ${n}, repeat: ${repeat}`);
    console.log(`addon : ${avg_time_addon / repeat} ms`);
    console.log(`node1 : ${avg_time_node1 / repeat} ms`);
    console.log(`node2 : ${avg_time_node2 / repeat} ms`);
}

/**
 * benchmark function.
 */
function benchmark2(n: number, repeat: number) {
    let avg_time_addon1 = 0;
    let avg_time_addon2 = 0;

    let separator: string = String(n);
    let strarr: string[] = [];
    for (let i = 0; i < n; i++) {
        strarr.push(String(i));
    }

    for (let i = 0; i < repeat; i++) avg_time_addon1 += getExecutionTime(() => function_addon_v1(strarr, separator));
    for (let i = 0; i < repeat; i++) avg_time_addon2 += getExecutionTime(() => function_addon_v2(strarr, separator));

    console.log("----------------------------------");
    console.log(`n: ${n}, repeat: ${repeat}`);
    console.log(`addon1 : ${avg_time_addon1 / repeat} ms`);
    console.log(`addon2 : ${avg_time_addon2 / repeat} ms`);
}

//
// start benchmark.
let testcase = [3, 4, 5].map((n) => Math.pow(10, n));
testcase.forEach((n) => benchmark1(n, 1000));
testcase.forEach((n) => benchmark2(n, 1000));

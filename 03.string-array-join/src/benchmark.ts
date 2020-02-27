import { ParamType } from "./addon";

/**
 * Returns the execution time of a given function.
 */
function getExecutionTime(func: (arg: void) => void): number {
    const srt = process.hrtime();
    func();
    const dif = process.hrtime(srt);
    return dif[0] * 1e9 + dif[1];
}

/**
 * Information of the function to perform the benchmark.
 */
export interface BenchmarkTarget {
    func: (arg: ParamType) => any;
    name: string;
}

/**
 * Measure the execution time of the given benchmark targets.
 */
export function benchmark(targets: BenchmarkTarget[], arg: ParamType, repeat: number, tag?: string): void {
    //
    // display tag.
    console.log("----------------------------------");
    console.group(tag ? `* ${tag}` : "");

    //
    // start benchmark.
    for (const target of targets) {
        let totalExecutionTime: number = 0;
        for (let i = 0; i < repeat; i++) {
            totalExecutionTime += getExecutionTime(() => target.func(arg));
        }
        let averageExecutionTime: number = totalExecutionTime / repeat;

        console.log(`[${target.name}] ${averageExecutionTime / 1e3} us`);
    }
    console.groupEnd();
}

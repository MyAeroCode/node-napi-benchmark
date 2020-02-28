import { AddonParamType } from "./addon";

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
 * Return type of benchmark target function.
 */
export interface BenchmarkTargetFunctionReturn<T> {
    ans: T;
    statics: {
        [key: string]: number;
    };
}

/**
 * Information of the function to perform the benchmark.
 */
export interface BenchmarkTarget<T> {
    func: (arg: AddonParamType) => BenchmarkTargetFunctionReturn<T>;
    name: string;
}

/**
 * Measure the execution time of the given benchmark targets.
 */
export function benchmark<T>(targets: BenchmarkTarget<T>[], arg: AddonParamType, repeat: number, tag?: string): void {
    //
    // display tag.
    console.log("----------------------------------");
    console.group(tag ? `* ${tag}` : "");

    //
    // start benchmark.
    for (const target of targets) {
        let statics: any = {};
        let totalExecutionTime: number = 0;
        for (let i = 0; i < repeat; i++) {
            //
            // prints the progress.
            process.stdout.write(`Test in progress... ${i} / ${repeat}\r`);

            //
            // execute function then save into "thisTestOutput".
            let thisTestOutput: BenchmarkTargetFunctionReturn<T> | undefined;
            totalExecutionTime += getExecutionTime(() => {
                thisTestOutput = target.func(arg);
            });

            //
            // get internal time information.
            for (const key in thisTestOutput?.statics) {
                if (statics[key] === undefined) statics[key] = 0;
                statics[key] += thisTestOutput?.statics[key];
            }
        }

        //
        // Print result.
        let etc = totalExecutionTime / repeat / 1e3;
        console.log(`[${target.name}] ${etc} us`);
        console.group();
        for (const key in statics) {
            const thisPhaseExecutionTime = statics[key] / repeat / 1e3;
            etc -= thisPhaseExecutionTime;
            console.log(`> ${key} : ${thisPhaseExecutionTime} us`);
        }
        console.log(`> etc : ${etc} us`);
        console.groupEnd();
    }
    console.groupEnd();
}

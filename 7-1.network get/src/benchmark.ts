import { AddonParamType, addon } from "./addon";

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
    func: (arg: AddonParamType) => BenchmarkTargetFunctionReturn<T> | Promise<BenchmarkTargetFunctionReturn<T>>;
    name: string;
}

/**
 * Define group of benchmark target.
 */
export type BenchmarkTargetGroup = BenchmarkTarget<any>[];

/**
 * Measure the execution time of the given benchmark targets.
 */
export async function benchmark<T>(targets: BenchmarkTarget<T>[], arg: AddonParamType, repeat: number, tag?: string) {
    //
    // display tag.
    console.log("----------------------------------");
    console.group(tag ? `* ${tag}` : "");

    //
    // store answer.
    // let ans;

    //
    // start benchmark.
    for (const target of targets) {
        let statics: any = {};
        let totalExecutionTime: number = 0;
        for (let i = 0; i < repeat; i++) {
            addon.sleepSync(2500);

            //
            // prints the progress.
            process.stdout.write(`Test in progress... ${i + 1} / ${repeat}                    \r`);

            //
            // execute function then save into "thisTestOutput".
            let thisTestOutput: BenchmarkTargetFunctionReturn<T> | undefined;
            totalExecutionTime += await (async function() {
                const isAsync: boolean = /return __awaiter/.test(target.func.toString());
                const srt = process.hrtime();
                if (isAsync) {
                    thisTestOutput = await target.func(arg);
                } else {
                    thisTestOutput = target.func(arg) as BenchmarkTargetFunctionReturn<T>;
                }
                const dif = process.hrtime(srt);
                return dif[0] * 1e9 + dif[1];
            })();

            //
            // get internal time information.
            for (const key in thisTestOutput?.statics) {
                if (statics[key] === undefined) statics[key] = 0;
                statics[key] += thisTestOutput?.statics[key];
            }

            // console.log(thisTestOutput?.ans);

            //
            // save answer.
            // if (ans === undefined) ans = thisTestOutput!!.ans;
            // else if (ans !== thisTestOutput!!.ans) {
            //     throw new Error(`Answer mismatch`);
            // }
        }

        //
        // Print result.
        let etc = totalExecutionTime / repeat / 1e6;
        let subCnt = 0;
        console.log(`[${target.name}] ${etc} ms`);
        console.group();
        for (const key in statics) {
            const thisPhaseExecutionTime = statics[key] / repeat / 1e6;
            etc -= thisPhaseExecutionTime;
            subCnt++;
            console.log(`> ${key} : ${thisPhaseExecutionTime} ms`);
        }
        if (subCnt !== 0) {
            console.log(`> etc : ${etc} ms`);
        }
        // console.log(`ans : ${ans}`);
        console.groupEnd();
    }
    console.groupEnd();
}

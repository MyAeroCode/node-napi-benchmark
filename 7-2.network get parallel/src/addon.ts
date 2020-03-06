import { BenchmarkTargetFunctionReturn } from "./benchmark";

/**
 * for require alias.
 */
require("module-alias/register");

/**
 * define paramType of function.
 */
export type AddonParamType = {
    url: string;
    parallel: number;
};

/**
 * declare Addon Module Interface.
 */
interface AddonModuleInterface {
    networkGet_n: (param: AddonParamType) => BenchmarkTargetFunctionReturn<string[]>;
    networkGet_1: (param: AddonParamType) => BenchmarkTargetFunctionReturn<string>;
    sleepSync: (ms: number) => void;
}

/**
 * export addon.
 */
export const addon: AddonModuleInterface = require(process.argv.indexOf("--addon-debug") >= 0
    ? "@addon-debug/my-addon.node"
    : "@addon-release/my-addon.node");

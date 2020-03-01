import { BenchmarkTargetFunctionReturn } from "./benchmark";

/**
 * for require alias.
 */
require("module-alias/register");

/**
 * define paramType of function.
 */
export type AddonParamType = {
    arr: number[];
    trr: Int32Array;
};

/**
 * declare Addon Module Interface.
 */
interface AddonModuleInterface {
    arrayReadArr: (param: AddonParamType) => BenchmarkTargetFunctionReturn<number>;
    arrayReadTrr: (param: AddonParamType) => BenchmarkTargetFunctionReturn<number>;
}

/**
 * export addon.
 */
export const addon: AddonModuleInterface = require("@addon/my-addon.node");

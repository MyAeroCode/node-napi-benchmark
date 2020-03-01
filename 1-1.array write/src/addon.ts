import { BenchmarkTargetFunctionReturn } from "./benchmark";

/**
 * for require alias.
 */
require("module-alias/register");

/**
 * define paramType of function.
 */
export type AddonParamType = {
    end: number;
};

/**
 * declare Addon Module Interface.
 */
interface AddonModuleInterface {
    arrayWriteArr: (param: AddonParamType) => BenchmarkTargetFunctionReturn<number[]>;
    arrayWriteTrr: (param: AddonParamType) => BenchmarkTargetFunctionReturn<Int32Array>;
}

/**
 * export addon.
 */
export const addon: AddonModuleInterface = require("@addon/my-addon.node");

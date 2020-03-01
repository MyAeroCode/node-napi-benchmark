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
    arraySortTrr: (param: AddonParamType) => BenchmarkTargetFunctionReturn<Int32Array>;
}

/**
 * export addon.
 */
export const addon: AddonModuleInterface = require("@addon/my-addon.node");

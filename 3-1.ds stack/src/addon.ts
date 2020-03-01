import { BenchmarkTargetFunctionReturn } from "./benchmark";

/**
 * for require alias.
 */
require("module-alias/register");

/**
 * define paramType of function.
 */
export type AddonParamType = {
    input: Int32Array;
};

/**
 * declare Addon Module Interface.
 */
interface AddonModuleInterface {
    testStack1: (param: AddonParamType) => BenchmarkTargetFunctionReturn<number>;
    testStack2: (param: AddonParamType) => BenchmarkTargetFunctionReturn<number>;
}

/**
 * export addon.
 */
export const addon: AddonModuleInterface = require("@addon/my-addon.node");

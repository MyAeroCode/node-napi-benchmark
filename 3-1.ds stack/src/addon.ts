import { BenchmarkTargetFunctionReturn } from "./benchmark";

/**
 * for require alias.
 */
require("module-alias/register");

/**
 * define paramType of function.
 */
export type AddonParamType = {
    N: number;
};

/**
 * declare Addon Module Interface.
 */
interface AddonModuleInterface {
    testStack1: (param: AddonParamType) => BenchmarkTargetFunctionReturn<undefined>;
    testStack2: (param: AddonParamType) => BenchmarkTargetFunctionReturn<undefined>;
}

/**
 * export addon.
 */
export const addon: AddonModuleInterface = require("@addon/my-addon.node");

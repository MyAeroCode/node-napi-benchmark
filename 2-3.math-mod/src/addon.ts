import { BenchmarkTargetFunctionReturn } from "./benchmark";

/**
 * for require alias.
 */
require("module-alias/register");

/**
 * define paramType of function.
 */
export type AddonParamType = {
    trr: Int32Array,
};

/**
 * declare Addon Module Interface.
 */
interface AddonModuleInterface {
    mathMod: (param: AddonParamType) => BenchmarkTargetFunctionReturn;
}

/**
 * export addon.
 */
export const addon: AddonModuleInterface = require("@addon/my-addon.node");

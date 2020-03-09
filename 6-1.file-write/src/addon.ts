import { BenchmarkTargetFunctionReturn } from "./benchmark";

/**
 * for require alias.
 */
require("module-alias/register");

/**
 * define paramType of function.
 */
export type AddonParamType = {
    dat: Uint8Array;
};

/**
 * declare Addon Module Interface.
 */
interface AddonModuleInterface {
    fileWrite: (param: AddonParamType) => BenchmarkTargetFunctionReturn;
}

/**
 * export addon.
 */
export const addon: AddonModuleInterface = require("@addon/my-addon.node");

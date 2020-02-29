import { BenchmarkTargetFunctionReturn } from "./benchmark";

/**
 * for require alias.
 */
require("module-alias/register");

/**
 * define paramType of function.
 */
export type AddonParamType = {
    numarr: Int32Array;
};

/**
 * define returnType of function.
 */
export type AddonReturnType = Int32Array;

/**
 * declare Addon Module Interface.
 */
interface AddonModuleInterface<T> {
    sort: (param: AddonParamType) => BenchmarkTargetFunctionReturn<T>;
}

/**
 * export addon.
 */
export const addon: AddonModuleInterface<AddonReturnType> = require("@addon/my-addon.node");

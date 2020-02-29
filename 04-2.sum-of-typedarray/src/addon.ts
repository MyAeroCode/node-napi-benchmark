import { BenchmarkTargetFunctionReturn } from "./benchmark";

/**
 * for require alias.
 */
require("module-alias/register");

/**
 * define paramType of function.
 */
export type AddonParamType = {
    numarr: BigUint64Array;
};

/**
 * define returnType of function.
 */
export type AddonReturnType = number;

/**
 * declare Addon Module Interface.
 */
interface AddonModuleInterface<T> {
    getSumOfArray: (param: AddonParamType) => BenchmarkTargetFunctionReturn<T>;
}

/**
 * export addon.
 */
export const addon: AddonModuleInterface<AddonReturnType> = require("@addon/my-addon.node");

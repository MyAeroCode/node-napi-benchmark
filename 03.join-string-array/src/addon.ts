import { BenchmarkTargetFunctionReturn } from "./benchmark";

/**
 * for require alias.
 */
require("module-alias/register");

/**
 * define paramType of function.
 */
export type AddonParamType = {
    strarr: string[];
};

/**
 * define returnType of function.
 */
export type AddonReturnType = string;

/**
 * declare Addon Module Interface.
 */
interface AddonModuleInterface<T> {
    joinStringArray: (param: AddonParamType) => BenchmarkTargetFunctionReturn<T>;
}

/**
 * export addon.
 */
export const addon: AddonModuleInterface<AddonReturnType> = require("@addon/my-addon.node");

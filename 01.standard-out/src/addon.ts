import { BenchmarkTargetFunctionReturn } from "./benchmark";

/**
 * for require alias.
 */
require("module-alias/register");

/**
 * define paramType of function.
 */
export type AddonParamType = {
    cnt: number;
    str: string;
};

/**
 * define returnType of function.
 */
export type AddonReturnType = null;

/**
 * declare Addon Module Interface.
 */
interface AddonModuleInterface<T> {
    standardOut: (param: AddonParamType) => BenchmarkTargetFunctionReturn<T>;
}

/**
 * export addon.
 */
export const addon: AddonModuleInterface<AddonReturnType> = require("@addon/my-addon.node");

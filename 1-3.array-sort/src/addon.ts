import { BenchmarkTargetFunctionReturn } from "./benchmark";

/**
 * for require alias.
 */
require("module-alias/register");

export enum SEL {
    ARRAY = 0,
    TYPED_ARRAY = 1
}

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
    arraySort: (param: AddonParamType, sel: SEL) => BenchmarkTargetFunctionReturn;
}

/**
 * export addon.
 */
export const addon: AddonModuleInterface = require("@addon/my-addon.node");

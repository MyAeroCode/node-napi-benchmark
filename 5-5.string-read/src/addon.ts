import { BenchmarkTargetFunctionReturn } from "./benchmark";

/**
 * for require alias.
 */
require("module-alias/register");

export enum SEL {
    STRING = 0,
    TYPED_ARRAY_1 = 1,
    TYPED_ARRAY_2 = 2
}

/**
 * define paramType of function.
 */
export type AddonParamType = {
    str: string;
    trr: Uint8Array;
};

/**
 * declare Addon Module Interface.
 */
interface AddonModuleInterface {
    stringRead: (param: AddonParamType, sel: SEL) => BenchmarkTargetFunctionReturn;
}

/**
 * export addon.
 */
export const addon: AddonModuleInterface = require("@addon/my-addon.node");

/**
 * for require alias.
 */
require("module-alias/register");

/**
 * define paramType of function.
 */
export type ParamType = {
    numarr?: number[];
    n?: number;
};

/**
 * declare Addon Module Interface.
 */
interface AddonModuleInterface {
    reduce_v1: (param: ParamType) => any;
    reduce_v2: (param: ParamType) => any;
}

/**
 * export addon.
 */
export const addon: AddonModuleInterface = require("@addon/my-addon.node");

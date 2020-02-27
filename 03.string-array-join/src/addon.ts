/**
 * for require alias.
 */
require("module-alias/register");

/**
 * define paramType of function.
 */
export type ParamType = {
    strarr: string[];
};

/**
 * declare Addon Module Interface.
 */
interface AddonModuleInterface {
    join: (param: ParamType) => any;
    nothing: (param: ParamType) => any;
}

/**
 * export addon.
 */
export const addon: AddonModuleInterface = require("@addon/my-addon.node");

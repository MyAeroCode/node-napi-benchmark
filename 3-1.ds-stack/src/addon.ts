/**
 * for require alias.
 */
require("module-alias/register");

/**
 * define paramType of function.
 */
export type AddonParamType = {
    N: number;
};

/**
 * declare Addon Module Interface.
 */
interface AddonModuleInterface {
    AddonStack: {
        new (size: number): {
            push: (val: number) => boolean;
            pop: () => boolean;
            top: () => number | undefined;
            size: () => number;
            empty: () => boolean;
        };
    };
}

/**
 * export addon.
 */
export const addon: AddonModuleInterface = require("@addon/my-addon.node");

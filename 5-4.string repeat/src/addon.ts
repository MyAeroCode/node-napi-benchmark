import { BenchmarkTargetFunctionReturn } from "./benchmark";

/**
 * for require alias.
 */
require("module-alias/register");

/**
 * define paramType of function.
 */
export type AddonParamType = {
    str: string;
    N: number;
};

/**
 * declare Addon Module Interface.
 */
interface AddonModuleInterface {
    stringRepeat: (param: AddonParamType) => BenchmarkTargetFunctionReturn<string>;
}

/**
 * export addon.
 */
export const addon: AddonModuleInterface = require(process.argv.indexOf("--addon-debug") >= 0
    ? "@addon-debug/my-addon.node"
    : "@addon-release/my-addon.node");

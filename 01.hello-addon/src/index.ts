//
// for require alias.
require("module-alias/register");

import { MyModule } from "./interface";
const myModule: MyModule = require("@addon/my-addon.node");
myModule.helloWorld();

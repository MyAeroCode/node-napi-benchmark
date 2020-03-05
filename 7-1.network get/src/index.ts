import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";
import request from "sync-request";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: addon.networkGet,
        name: "napi/network-get"
    },
    {
        func: function networkGet({ url }) {
            const res = request("GET", url);
            const str = Buffer.from(res.body);
            return {
                ans: str,
                statics: {}
            };
        },
        name: "node/network-get"
    }
];

//
// define TestCase supplier.
function createParam(url: string): AddonParamType {
    return {
        url
    };
}

//
// start benchmark.
const strcnt = ["https://www.whitehouse.gov/", "https://en.wikipedia.org/wiki/Main_Page", "https://www.amazon.com/"];

const repeat = 100;
strcnt.forEach((url) => {
    const param = createParam(url);
    benchmark(targets, param, repeat, `url: ${url}`);
});

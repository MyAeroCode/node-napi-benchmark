import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";
import Axios from "axios";
import SyncRequest from "sync-request";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: addon.networkGet_1,
        name: "napi/network-get-libcurl"
    },
    {
        func: async function networkGet({ url }) {
            const res = SyncRequest("GET", url);
            const str = res.body.toString();
            return {
                ans: str,
                statics: {}
            };
        },
        name: "node/network-get-syrq"
    },
    {
        func: async function networkGet({ url }) {
            const res = await Axios.get(url);
            const str = res.data as string;
            return {
                ans: str,
                statics: {}
            };
        },
        name: "node/network-get-axios"
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
async function bootstrap() {
    // cn
    const urls = ["https://www.baidu.com/", "https://www.sogou.com/"];
    const repeat = 5;
    for (let i = 0; i < urls.length; i++) {
        const param = createParam(urls[i]);
        await benchmark(targets, param, repeat, `url: ${urls[i]}`);
    }
}
bootstrap();

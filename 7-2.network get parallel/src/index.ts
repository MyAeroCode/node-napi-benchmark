import { benchmark, BenchmarkTargetGroup } from "./benchmark";
import { addon, AddonParamType } from "./addon";
import Axios from "axios";
import SyncRequest from "sync-request";

//
// define BenchmarkTarget.
const targets: BenchmarkTargetGroup = [
    {
        func: addon.networkGet_n,
        name: "napi/network-get-n*1"
    },
    {
        func: async function networkGet({ url, parallel }) {
            const promises: Promise<string>[] = [];
            for (let i = 0; i < parallel; i++) {
                promises.push(
                    (async function() {
                        return addon.networkGet_1({ url, parallel }).ans;
                    })()
                );
            }
            const res = await Promise.all(promises);
            return {
                ans: res,
                statics: {}
            };
        },
        name: "napi/network-get-1*n"
    },
    {
        func: async function networkGet({ url, parallel }) {
            const promises: Promise<string>[] = [];
            for (let i = 0; i < parallel; i++) {
                promises.push(
                    (async function() {
                        const res = SyncRequest("GET", url);
                        const str = res.body.toString();
                        return str;
                    })()
                );
            }
            const res = await Promise.all(promises);
            return {
                ans: res,
                statics: {}
            };
        },
        name: "node/network-get-syrq"
    },
    {
        func: async function networkGet({ url, parallel }) {
            const promises: Promise<string>[] = [];
            for (let i = 0; i < parallel; i++) {
                promises.push(
                    (async function() {
                        const res = await Axios.get(url);
                        const str = res.data as string;
                        return str;
                    })()
                );
            }
            const res = await Promise.all(promises);
            return {
                ans: res,
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
        url,
        parallel: 5
    };
}

//
// start benchmark.
async function bootstrap() {
    const urls = ["https://www.baidu.com/", "https://www.sogou.com/"];
    const repeat = 3;
    for (let i = 0; i < urls.length; i++) {
        const param = createParam(urls[i]);
        await benchmark(targets, param, repeat, `url: ${urls[i]}`);
    }
}
bootstrap();

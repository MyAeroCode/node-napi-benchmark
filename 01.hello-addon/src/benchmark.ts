import { MyModule } from "./interface";

const myModule: MyModule = require("@addon/my-addon.node");

function getExecutionTime(func: () => any): number {
    const srt = Date.now();
    func();
    const end = Date.now();
    return end - srt;
}

function hello_addon(cnt: number) {
    myModule.helloWorld_benchmark(cnt);
}

function hello_node(cnt: number) {
    for (let i = 0; i < cnt; i++) {
        console.log("Hello, World!");
    }
}

export function benchmark(cnt: number, repeat: number) {
    let avg_time_addon = 0;
    let avg_time_node = 0;
    for (let i = 0; i < repeat; i++) avg_time_addon += getExecutionTime(() => hello_addon(cnt));
    for (let i = 0; i < repeat; i++) avg_time_node += getExecutionTime(() => hello_node(cnt));
    console.log(`cnt: ${cnt}, repeat: ${repeat}`);
    console.log(`addon : ${avg_time_addon / repeat} ms`);
    console.log(`node  : ${avg_time_node / repeat} ms`);
}

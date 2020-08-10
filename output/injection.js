"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const container_1 = require("./container");
const INJECT_PROPS_KEY = "injected-props";
function inject() {
    return (target, key) => {
        const type = Reflect.getMetadata("design:type", target, key);
        const props = Reflect.getMetadata(INJECT_PROPS_KEY, target.constructor) || [];
        props.push({ key, type });
        Reflect.defineMetadata(INJECT_PROPS_KEY, props, target.constructor);
        // console.log(`inject-> target:${JSON.stringify(target)} key:${key} type:${type}`)
    };
}
exports.inject = inject;
function injectable() {
    return (target) => {
        // console.log(`injectable-> target:${target}`)
        const props = Reflect.getMetadata(INJECT_PROPS_KEY, target);
        const container = container_1.Container.getInstance();
        container.register(target, target, props);
        // console.log(props)
    };
}
exports.injectable = injectable;

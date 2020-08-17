import "reflect-metadata";
import { Container } from "./container";

const INJECT_PROPS_KEY = "injected-props";
export function inject() {
    return (target, key) => {
        const type = Reflect.getMetadata("design:type", target, key); // 获取属性类型
        const props = Reflect.getMetadata(INJECT_PROPS_KEY, target.constructor) || [];
        props.push({ key, type });
        Reflect.defineMetadata(INJECT_PROPS_KEY, props, target.constructor); // 定义元数据
        // console.log(`inject-> target:${JSON.stringify(target)} key:${key} type:${type}`)
    };
}

export function injectable() {
    return (target) => {
        // console.log(`injectable-> target:${target}`)
        const props = Reflect.getMetadata(INJECT_PROPS_KEY, target);    // 获取上面定义的元数据
        const container = Container.getInstance();
        container.register(target, target, props);  // 注册容器中
        // console.log(props)

    };
}
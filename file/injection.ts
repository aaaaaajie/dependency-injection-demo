import "reflect-metadata";
import injectConfig from "./index.config";

class Mapping {

    ctor: Function;
    props: string[];
    instance: Object;
    ctorParams: [];

    constructor(ctor, ctorParams, instance) {
        this.ctor = ctor;
        this.props = [];
        this.ctorParams = ctorParams;
        this.instance = instance;
    }
}

interface Bean {
    id: string;
    className: string;
    path: string;
    dependency: Bean[];
    constructorArgs: { prop: string, value: any; }[];
}

export class Container {

    public map: Map<Function, Mapping>;
    constructor() {
        this.map = new Map();
    }

    private getConstructorParams(ctor) {
        // console.log(ctor.toString());
        const ctorArgs = ctor.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
        return ctorArgs[1] ? ctorArgs[1].split(',') : [];
    }

    private constructorParamsByArgs(ctor, args: Bean["constructorArgs"]) {

        const params = this.getConstructorParams(ctor);
        const retParams = [];
        if (args) {
            for (let i = 0; i < params.length; i++) {
                for (let j = 0; j < args.length; j++) {
                    if (params[i].trim() === args[j].prop) {
                        retParams.push(args[j].value);
                    }
                }
            }
        }
        return retParams;
    }

    async getRootInstances() {
        const results = await this.inject();
        return results.filter(result => result.isRoot && result.instance);
    }

    private async inject(
        beans = injectConfig.Roots as Bean[],
        instances: { instance, id, parentType, isRoot; }[] = [],
        parentType?: Function,
        isRoot: boolean = true
    ) {

        for (const bean of beans) {
            const { id, className, constructorArgs, dependency, path } = bean;

            // 验证该module下是否有配置里的类
            const module = await import(path);
            const types = Object.getOwnPropertyNames(module);
            if (!types.includes(className)) {
                throw Error(`Cannot find module: ${className}`);
            }

            const ctor = module[className];
            // 根据 config 的 constructorArgs 和 构造函数的参数 得到 最终需要注入的值
            const ctorParams = this.constructorParamsByArgs(ctor, constructorArgs);
            // console.log(`params：${ctorParams}`);
            let instance, props = [];
            if (!this.map.has(ctor)) {
                // 创建实例
                instance = new (ctor)(...ctorParams);
                const mapping = new Mapping(ctor, ctorParams, instance);
                this.map.set(ctor, mapping);
            } else {
                instance = this.map.get(ctor).instance;
                props = this.map.get(ctor).props;
            }

            if (Array.isArray(dependency) && dependency.length) {
                let results = await this.inject(dependency, instances, ctor, false);
                results.forEach(result => result.parentType === ctor && (instance[result.id] = result.instance));
            }
            props.push(id);
            instances.push({ instance, id, parentType, isRoot });
        }
        return instances;
    }
}
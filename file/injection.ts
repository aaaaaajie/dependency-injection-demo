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
    constructorArgs: { name: string, value: any; }[];
}

export class Container {

    public map: Map<Function, Mapping>;
    constructor() {
        this.map = new Map();
    }

    private getConstructorParams(ctor) {
        const ctorArgs = ctor.toString().split(/constructor\s*[^\(]*\(\s*([^\)]*)\)/m);
        return ctorArgs[1] ? ctorArgs[1].split(',') : [];
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
            const module = await import(path);
            const types = Object.getOwnPropertyNames(module);
            if (!types.includes(className)) {
                throw Error(`Cannot find module: ${className}`);
            }
            const ctor = module[className];
            const ctorParams = this.getConstructorParams(ctor);
            // console.log(`params：${ctorParams}`);
            let instance, props = [];
            if (!this.map.has(ctor)) {
                instance = new (ctor)(constructorArgs.values());
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
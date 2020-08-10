import "reflect-metadata"
import Path from "path"
import { Roots } from "./ioc.json"


// //注册该类进入容器
// export function Injectable() {
//     return (_constructor: Function) => {
//         let paramTypes: Array<Function> = Reflect.getMetadata('design:paramtypes', _constructor)
//         //已注册
//         if (classPool.indexOf(_constructor) != -1) return;
//         for (let val of paramTypes) {
//             if (val === _constructor) throw new Error('不能依赖自己')
//             else if (classPool.indexOf(val) == -1) throw new Error(`${val}没有被注册`)
//         }
//         //注册
//         classPool.push(_constructor);
//     }
// }

// //实例化工厂
// export function classFactory<T>(_constructor: { new(...args: Array<any>): T }): T {
//     let paramTypes: Array<Function> = Reflect.getMetadata('design:paramtypes', _constructor)
//     //参数实例化
//     let paramInstance = paramTypes.map((val: Function) => {
//         //依赖的类必须全部进行注册
//         if (classPool.indexOf(val) == -1) throw new Error(`${val}没有被注册`)
//         //参数还有依赖
//         else if (val.length) {
//             return classFactory(val as any);
//         }
//         //没有依赖直接创建实例
//         else {
//             return new (val as any)();
//         }
//     })
//     return new _constructor(...paramInstance);
// }

// export function injectable() {
//     // Reflect.
//     Root.id
// }

class IOC {
    public id: string
    public path: string
    public class: string
    public dependency: IOC[]
    public constructorArgs: object[]
}

class Container {
    private map: Map<string, object>
    constructor() {
        this.map = new Map()
    }
    getDependencyIds(dependencies: Partial<IOC>[][]) {
        const ids = []
        for (const dependency of dependencies) {
            if (Array.isArray(dependency)) {
                ids.push(...dependency.map(x => x.id))
            } else {
                ids.push(null)
            }
        }
        return ids
    }

    async init() {
        return await this.resolve(Roots as Partial<IOC>[]/* , this.getDependencyIds(Roots.map((x => x.dependency))) */)
    }

    async resolve(beans: Partial<IOC>[]/* , propertyNames: string[] = [] */) {
        for (let i = 0; i < beans.length; i++) {
            const bean = beans[i]
            const path = Path.resolve(bean.path)
            const module = await import(path)
            // console.log("module", module)
            const modulePropNames = Object.getOwnPropertyNames(module)
            // console.log("propNames", propNames)
            if (!modulePropNames.includes(bean.class)) {
                throw new Error(`Cannot find module ${bean.class}`)
            }

            if (bean.dependency.length) {
                const instance = new (module[bean.class])()
                const childInstance = await this.resolve(bean.dependency/* , this.getDependencyIds(bean.dependency.map((x => x.dependency))) */)
                let lock = false
                for (const [k, v] of this.map) {
                    if (k === childInstance.type) {
                        instance[childInstance.prop] = v
                        lock = true
                    }
                }
                if (!lock) {
                    instance[childInstance.prop] = childInstance.instance
                    this.map.set(childInstance.type, instance)
                }
                // if (this.map.has(childInstance.type)) {
                //     // propertyNames.length && (instance[propertyNames[i]] = childInstance)
                //     instance[childInstance.prop] = this.map.get(childInstance.type)
                // } else {
                //     instance[childInstance.prop] = childInstance.instance
                //     this.map.set(childInstance.type, instance)
                // }
                return { instance, prop: bean.id, type: module[bean.class] }
            } else {
                return { instance: new (module[bean.class])(), prop: bean.id, type: module[bean.class] }
            }
        }
    }
}


new Container().init().then(result => {
    console.log(result)
    result.instance.sayHi()
})

// {
//     "name": "name",
//     "value": "阿杰"
// },
// {
//     "name": "age",
//     "value": 25
// }

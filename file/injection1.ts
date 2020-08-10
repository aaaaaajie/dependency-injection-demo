import injectConfig from "./index.config";

class Resolver {
    props: string[]
    instance: Object
    constructor() {
        this.props = []
        this.instance = null
    }

    addProps(prop) {
        if (this.props.includes(prop)) {
            throw Error(`Don't add repeat prop!`)
        }
        this.props.push(prop)
    }
}

interface Bean {
    id: string;
    type: string;
    path: string;
    dependency: Bean[];
    constructorArgs: string[]
}

class Container {

    public map: Map<Function, Resolver>
    constructor() {
        this.map = new Map()
    }

    init() {
        for (const root of injectConfig.Roots) {
            this.registry(root.dependency as Bean[])
        }

    }
    async registry(beans: Bean[], resolver = new Resolver()) {
        for (const bean of beans) {
            const { id, path, type, dependency } = bean
            const module = await import(path)
            const types = Object.getOwnPropertyNames(module)
            if (!types.includes(type)) {
                throw Error(`Cannot find module: ${type}`)
            }

            const T = module[type]
            if (!this.map.has(T)) {
                const instance = new (T)()
                resolver.addProps(id)
                resolver.instance = instance

                dependency && Array.isArray(dependency) && await this.registry(dependency)
                this.map.set(T, resolver)
            } else {
                resolver = this.map.get(T)
                resolver.props.push(id)
            }
        }
    }

    // injectProps() {
    //     for (const [type, resolver] of this.map) {
    //         for (const prop of resolver.props) {
    //             resolver.instance[prop] = 
    //         }
    //     }
    // }

}

const container = new Container()
container.init()
console.log(container.map)
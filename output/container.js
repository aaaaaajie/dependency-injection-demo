"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Resolver {
    constructor(ctor, handleFunction, props) {
        this._ctor = ctor;
        this._handleFunction = handleFunction;
        this._props = props;
        this._object = null;
    }
    resolve() {
        // 保证单例
        if (!this._object) {
            this._object = new this._ctor();
        }
        // 注入属性
        if (this._props) {
            for (const { key, type } of this._props) {
                const instance = this._handleFunction && this._handleFunction(type);
                this._object[key] = instance;
            }
        }
        return this._object;
    }
}
let instance;
class Container {
    constructor() {
        this._resolver = new Map();
    }
    register(type, ctor, props) {
        const resolver = new Resolver(ctor, this.resolve.bind(this), props);
        this._resolver.set(type, resolver);
    }
    resolve(type) {
        const resolver = this._resolver.get(type);
        if (resolver) {
            return resolver.resolve();
        }
    }
    static getInstance() {
        if (!instance)
            instance = new Container();
        return instance;
    }
}
exports.Container = Container;

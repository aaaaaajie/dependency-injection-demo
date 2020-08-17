import "reflect-metadata";
//ioc容器
let classPool: Array<Function> = [];

//注册该类进入容器
export function Injectable() {
    return (_constructor: Function) => {
        let paramTypes: Array<Function> = Reflect.getMetadata('design:paramtypes', _constructor);
        //已注册
        if (classPool.indexOf(_constructor) != -1) return;
        for (let val of paramTypes) {
            if (val === _constructor) throw new Error('不能依赖自己');
            else if (classPool.indexOf(val) == -1) throw new Error(`${val}没有被注册`);
        }
        //注册
        classPool.push(_constructor);
    };
}

//实例化工厂
export function classFactory<T>(_constructor: { new(...args: Array<any>): T; }): T {
    let paramTypes: Array<Function> = Reflect.getMetadata('design:paramtypes', _constructor);
    //参数实例化
    let paramInstance = paramTypes.map((val: Function) => {
        //依赖的类必须全部进行注册
        if (classPool.indexOf(val) == -1) throw new Error(`${val}没有被注册`);
        //参数还有依赖
        else if (val.length) {
            return classFactory(val as any);
        }
        //没有依赖直接创建实例
        else {
            return new (val as any)();
        }
    });
    console.log(paramInstance);
    return new _constructor(...paramInstance);
}
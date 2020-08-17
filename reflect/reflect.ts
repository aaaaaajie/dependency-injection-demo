import "reflect-metadata";
import { inject } from "../decorator/injection";
function Injectable() {
    return (target) => {
        console.log(target);
        const paramTypes = Reflect.getMetadata("design:paramtypes", target);
        console.log(paramTypes);
    };
}
function Inject() {
    return (target, key) => {
        const propType = Reflect.getMetadata("design:type", target, key);
        console.log(propType);
    };
}


@Injectable()
class A {
    constructor(name: string) {

    }
    @Inject()
    private age: number;
}
class B {

    @inject()
    private a : A;
} 
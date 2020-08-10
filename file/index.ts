import { Container } from "./injection";

export class TestEntity {
    private age: number;
    constructor(public name: string = 'hsj', age) {
        this.age = age;
    }
}

export class TestService {

    private testEntity: TestEntity;
    private testEntity1: TestEntity;

    sayHi() {
        console.log(this.testEntity === this.testEntity1);
        // console.log("entity", this.testEntity);
        console.log(`hello! my name is ${this.testEntity.name}`);
    }
}


export class Root {

    private testService: TestService;

    sayHi() {
        console.log("service", this.testService);
        this.testService.sayHi();
    }
}
function main() {
    const container = new Container();
    container.getRootInstances().then(results => {
        const instance = results[0].instance;
        // console.log(instance);
        instance.sayHi();
    });
}
main();

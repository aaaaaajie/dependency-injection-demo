import { Container } from "./injection";

export class TestEntity {
    public age: number;
    public name: string;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

export class TestService {

    private testEntity: TestEntity;
    private testEntity1: TestEntity;

    sayHi() {
        console.log(this.testEntity === this.testEntity1);
        // console.log("entity", this.testEntity);
        console.log(`hello! my name is ${this.testEntity.name}, age is ${this.testEntity.age}`);
    }
}


export class Root {

    private testService: TestService;

    sayHi() {
        this.testService.sayHi();
    }
}
function main() {
    const container = new Container();
    container.getRootInstances().then(results => {
        console.log(results);
        const instance = results[0].instance;
        // console.log(instance);
        instance.sayHi();
    });
}
main();

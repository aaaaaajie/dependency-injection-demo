import { injectable, inject } from "./injection";   // 1
import { Container } from "./container";

@injectable()   // 3
class TestEntity {  // 1

    constructor(public name: string = 'hsj' /* 2 */) { // 1

    }
}

@injectable()
class TestService {

    @inject()  // 2
    private testEntity: TestEntity;
    @inject()  // 2
    private testEntity1: TestEntity;
    constructor(public age: number = 26) {

    }

    sayHi() { // 2
        // 5
        console.log(this.testEntity === this.testEntity1);
        console.log(`hello! my name is ${this.testEntity.name}`);
        return this.testEntity;
    }
}


@injectable()
class Root {

    @inject()
    private testService: TestService;

    @inject()
    private testEntity: TestEntity;

    sayHi() {
        // 5
        const test = this.testService.sayHi();
        console.log(this.testEntity.name);
        console.log(test === this.testEntity)
    }

}

const root = Container.getInstance().resolve(Root); // 4
console.log(root); // 4
root.sayHi();      // 4

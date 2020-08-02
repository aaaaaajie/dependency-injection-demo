import { injectable, inject } from "./injection";
import { Container } from "./container";

@injectable()
class TestEntity {
    constructor(public name: string = 'hsj') {

    }
}

@injectable()
class TestService {

    @inject()
    private testEntity: TestEntity;
    @inject()
    private testEntity1: TestEntity;

    sayHi() {
        console.log(this.testEntity === this.testEntity1)
        console.log(`hello! my name is ${this.testEntity.name}`)
    }
}


@injectable()
class Root {

    @inject()
    private testService: TestService;

    sayHi() {
        this.testService.sayHi()
    }

}

const root = Container.getInstance().resolve(Root)
console.log(root)
root.sayHi()

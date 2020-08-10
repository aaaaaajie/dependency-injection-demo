export class TestEntity {  // 1
    constructor(public name: string = 'hsj' /* 2 */) { // 1

    }
}

export class TestService {

    private testEntity: TestEntity;
    private testEntity1: TestEntity;

    sayHi() { // 2
        // 5
        console.log(this.testEntity === this.testEntity1)
        console.log("entity", this.testEntity)
        console.log(`hello! my name is ${this.testEntity.name}`)
    }
}


export class Root {

    private testService: TestService;

    sayHi() {
        // 5
        console.log("service", this.testService)
        this.testService.sayHi()
    }

}

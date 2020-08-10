"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const injection_1 = require("./injection"); // 1
const container_1 = require("./container");
let TestEntity = class TestEntity {
    constructor(name = 'hsj' /* 2 */) {
        this.name = name;
    }
};
TestEntity = __decorate([
    injection_1.injectable() // 3
    ,
    __metadata("design:paramtypes", [String])
], TestEntity);
let TestService = class TestService {
    sayHi() {
        // 5
        console.log(this.testEntity === this.testEntity1);
        console.log(`hello! my name is ${this.testEntity.name}`);
    }
};
__decorate([
    injection_1.inject() // 2
    ,
    __metadata("design:type", TestEntity)
], TestService.prototype, "testEntity", void 0);
__decorate([
    injection_1.inject() // 2
    ,
    __metadata("design:type", TestEntity)
], TestService.prototype, "testEntity1", void 0);
TestService = __decorate([
    injection_1.injectable()
], TestService);
let Root = class Root {
    sayHi() {
        // 5
        this.testService.sayHi();
    }
};
__decorate([
    injection_1.inject(),
    __metadata("design:type", TestService)
], Root.prototype, "testService", void 0);
Root = __decorate([
    injection_1.injectable()
], Root);
const root = container_1.Container.getInstance().resolve(Root); // 4
console.log(root); // 4
root.sayHi(); // 4

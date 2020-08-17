import { resolve } from "path";

export default [
    {
        id: "testEntity",
        className: "TestEntity",
        path: resolve("./file/index.ts"),
        constructorArgs: [{ prop: "age", value: 25 }, { prop: "name", value: "hsj" }],
        dependency: []
    },
    {
        id: "testEntity1",
        className: "TestEntity",
        path: resolve("./file/index.ts"),
        dependency: []
    }
];
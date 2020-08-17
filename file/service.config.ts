import { resolve } from "path";
import Dependency from "./entity.config";
export default [
    {
        id: "testService",
        className: "TestService",
        path: resolve("./file/index.ts"),
        constructorArgs: [],
        dependency: Dependency
    },
    {
        id: "testService1",
        className: "TestService",
        path: resolve("./file/index.ts"),
        dependency: Dependency
    }
];
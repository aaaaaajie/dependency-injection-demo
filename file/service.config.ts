import { resolve } from "path";
import Dependency from "./entity.config";
export default [
    {
        id: "testService",
        type: "TestService",
        path: resolve("./file/index.ts"),
        dependency: Dependency
    },
    {
        id: "testService1",
        type: "TestService",
        path: resolve("./file/index.ts"),
        dependency: Dependency
    }
]
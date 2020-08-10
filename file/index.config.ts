// export default
import { resolve } from "path";
import Dependency from "./service.config";
export default {
    "Roots": [
        {
            id: "root",
            isRoot: true,
            className: "Root",
            path: resolve("./file/index.ts"),
            constructorArgs: [],
            dependency: Dependency
        }
    ]
};

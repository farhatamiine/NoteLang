import {dirname} from "path";
import {fileURLToPath} from "url";
import {FlatCompat} from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.config({
        extends: ["next/core-web-vitals", "next/typescript"],
        "plugins": ["@tanstack/query"],
        "rules": {
            "@tanstack/query/exhaustive-deps": "error",
            "@tanstack/query/no-deprecated-options": "error",
            "@tanstack/query/prefer-query-object-syntax": "error",
            "@tanstack/query/stable-query-client": "error"
        }
    })
];

export default eslintConfig;

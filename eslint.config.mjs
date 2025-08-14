import {dirname} from "path";
import {fileURLToPath} from "url";
import {FlatCompat} from "@eslint/eslintrc";
import pluginQuery from "@tanstack/eslint-plugin-query";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});
const eslintConfig = [
    ...pluginQuery.configs['flat/recommended'],
    ...compat.config({
        extends: ["next/core-web-vitals", "next/typescript", "next"],
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/ban-ts-comment": "off",
            " @typescript-eslint/no-wrapper-object-types": "off",
            "@typescript-eslint/no-unused-vars": "off",
            // "@typescript-eslint/ban-types": "off" // if this is what you meant
        }
    })
];
export default eslintConfig;

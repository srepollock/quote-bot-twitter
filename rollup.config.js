import typescript from 'rollup-plugin-typescript2';
import builtins from "rollup-plugin-node-builtins";
import globals from "rollup-plugin-node-globals";
import pkg from "./package.json";

let override = { compilerOptions: { declaration: false } };

export default [
    {
        input: "./src/index.ts",
        plugins: [
            globals(),
            builtins(),
            typescript({tsconfigOverride: override}),
        ],
        output: [
            {
                file: pkg.module,
                format: "es"
            },
            {
                file: pkg.main,
                name: "main",
                format: "umd"
            }
        ]
    }
]

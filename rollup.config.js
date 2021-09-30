import {terser} from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";
import nodeResolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import replaceHtmlVars from 'rollup-plugin-replace-html-vars';

const plugins = [
    replace({
        exclude: 'node_modules/**',
        preventAssignment: true,
        values: {
            'ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }
    }),
    replaceHtmlVars({
        files: '**/index.html',
        from: /\.\/\w+\/\w+\.\w+.\w+\?v=\d+/g,
        to: './dist/app.min.js?v=' + Date.now(),
    }),
    nodeResolve({
        browser: true
    })
];
if (process.env.NODE_ENV !== 'production') {
    plugins.push(
        serve({
            open: true,
            openPage: 'debug.html',
            port: 10001,
        }),
    );
}
/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
    input: './js/app.js',
    output: [
        {
            file: './dist/app.js'
        },
        {
            file: './dist/app.min.js',
            plugins: [terser()]
        }
    ],
    inlineDynamicImports: true,
    plugins
};

export default config;

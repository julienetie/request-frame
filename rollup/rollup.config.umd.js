import babel from 'rollup-plugin-babel';

export default {
    moduleName: 'requestFrame',
    entry: './src/request-frame.js',
    plugins: [babel({
        babelrc: false,
        presets: ["es2015-rollup"]
    })],
    format: 'umd',
    dest: './dist/request-frame.js'
};

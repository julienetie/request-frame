import babel from 'rollup-plugin-babel';

export default {
    moduleName: 'requestFrame',
    entry: 'src/request-frame.js',
    plugins: [babel({
        babelrc: false,
        exclude: 'node_modules/**'
    })],
    format: 'es',
    dest: 'dist/request-frame.es.js'
};

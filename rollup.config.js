import babel from 'rollup-plugin-babel';

export default {
    moduleName: 'requestFrame',
    entry: 'src/request-frame.js',
    plugins: [babel()],
    format: 'es',
    targets: [
        {
            format: 'umd',
            dest: 'dist/request-frame.js'
        },
      	{
    		format: 'es',
    		dest: 'dist/request-frame.es.js'
    	}
    ]
};

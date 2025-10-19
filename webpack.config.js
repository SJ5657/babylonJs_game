const path = require('path');

module.exports = {
    entry: './client/index.js',
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'public'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.css$/, 
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(glb|gltf|bin)$/i,
                type: 'asset/resource',
                generator:{
                    filename: 'assets/[name][hash][ext][query]',
                }
            }    
        ],
    },
    mode: 'development',
    devtool: 'source-map'
}
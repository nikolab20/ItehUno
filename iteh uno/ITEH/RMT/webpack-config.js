module.exports = {
    devtool: 'source-map',
    entry: "./index.tsx",
    mode: "development",
    output: {
        filename: "./app-bundle.js"
    },
    resolve: {
        extensions: ['.Webpack.js', '.web.js', '.ts', '.js', '.jsx', '.tsx', '.css']
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|jfif)$/,
                loader: 'url-loader'
            },
            {
                test: /\.tsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'ts-loader'
                },
            },
            {
                test: /\.css$/,
                loader: 'style-loader'
            },
            {
                test: /\.css$/,
                loader: 'css-loader',
                query: {
                    modules: true,
                }
            },
            {
                test: /\.(js|jsx)?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: [
                        "babel-plugin-transform-class-properties"
                    ]
                }
            }
        ]
    }
}
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
function __config(entry, output, mode){
    const cacheGroups = {};
    Object.keys(entry).forEach((key) => {
        cacheGroups[key] = {
            name: key,
            type: "css/mini-extract",
            chunks: (chunk) => {
                return chunk.name === key;
            },
            enforce: true
        };
    });
    return {
        mode: mode ?? "production",
        devtool: "source-map",
        entry,
        output,
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css",
            }),
        ],
        optimization: {
            splitChunks: {
                cacheGroups
            }
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.(css|scss|sass)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader",
                    ],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|svg|png|jpg|jpeg)$/,
                    use: {
                        loader: 'url-loader',
                    },
                }
            ],
        }
    };
}

module.exports = __config;
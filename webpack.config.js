const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

const sourceMapLoader = require.resolve( 'source-map-loader' );

module.exports = {
    ...defaultConfig,
    devtool: "source-map",
    module: {
        ...defaultConfig.module,
        rules: [
            {
                test: /\.js$/,
                exclude: [ /node_modules/ ],
                use: sourceMapLoader,
                enforce: 'pre',
            },
            ...defaultConfig.module.rules.filter( (rule) => rule.use !== sourceMapLoader )
        ]
    },
    plugins: [
        ...defaultConfig.plugins.filter( ( plugin ) => plugin.constructor.name !== 'DependencyExtractionWebpackPlugin' ),
        new DependencyExtractionWebpackPlugin( { injectPolyfill: false } ),
    ],
};
const defaults = require( '@wordpress/scripts/config/webpack.config' );
const sourceMapLoader = require.resolve( 'source-map-loader' );

// if you want source maps in production then set the below to true
const productionSourceMaps = false;
if ( productionSourceMaps ){
    defaults.devtool = "source-map";
    defaults.module = {
        ...defaults.module,
        rules: [
            {
                test: /\.js$/,
                exclude: [ /node_modules/ ],
                use: sourceMapLoader,
                enforce: 'pre',
            },
            ...defaults.module.rules.filter( (rule) => rule.use !== sourceMapLoader )
        ]
    };
}

const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );

//if you want to remove wp-polyfill being included for every script (including empty scripts) set the below to true
const removePolyfill = false;
if ( removePolyfill ){
    defaults.plugins = [
        ...defaults.plugins.filter( ( plugin ) => plugin.constructor.name !== 'DependencyExtractionWebpackPlugin' ),
        new DependencyExtractionWebpackPlugin( { injectPolyfill: false } ),
    ];
}

function __config(entry, output, mode){
    return {
        ...defaults,
        entry,
        output,
        mode: mode ?? "production"
    }
}

module.exports = __config;
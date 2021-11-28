const defaults = require( '@wordpress/scripts/config/webpack.config' );

function __config(entry, output, mode){
    return {
        ...defaults,
        entry,
        output,
        mode: mode ?? "production"
    }
}

module.exports = __config;
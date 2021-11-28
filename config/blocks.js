const __config = require("./__wp-scripts");
const path = require("path");
module.exports = __config({
    "foobox.wordpress": "./src/blocks/index.js"
}, {
    path: path.resolve(__dirname, "../assets/blocks"),
    filename: '[name].js'
}, "development");
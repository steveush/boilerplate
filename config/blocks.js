const __config = require("./__wp-scripts");
const path = require("path");
module.exports = __config({
    "core": "./src/blocks/index.js"
}, {
    path: path.resolve(__dirname, "../assets/blocks"),
    filename: '[name].js'
}, "development");
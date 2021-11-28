const __config = require("./__wp-scripts");
const path = require("path");
module.exports = __config({
    "core": "./src/blocks/__pro/index.js"
}, {
    path: path.resolve(__dirname, "../pro/assets/blocks"),
    filename: '[name].js'
});
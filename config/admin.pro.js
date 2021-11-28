const __config = require("./__wp-scripts");
const path = require("path");
module.exports = __config({
    "admin": "./src/admin/__pro/index.js",
    "admin.help": "./src/admin/__pro/help/index.js",
    "admin.settings": "./src/admin/__pro/settings/index.js",
}, {
    path: path.resolve(__dirname, "../pro/assets/admin"),
    filename: '[name].js'
}, "development");
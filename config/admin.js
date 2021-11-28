const __config = require("./__wp-scripts");
const path = require("path");
module.exports = __config({
    "admin": "./src/admin/index.js",
    "admin.help": "./src/admin/help/index.js",
    "admin.settings": "./src/admin/settings/index.js",
}, {
    path: path.resolve(__dirname, "../assets/admin"),
    filename: '[name].js'
}, "development");
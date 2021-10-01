const path = require("path");
const config = require("./webpack.config");
module.exports = {
    ...config,
    entry: {
        "admin": "./src/admin/index.js",
        "admin.help": "./src/admin/help.js",
        "admin.settings": "./src/admin/settings.js",
        "blocks": "./src/blocks/index.js",
        "public": "./src/public/index.js"
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "assets")
    }
};
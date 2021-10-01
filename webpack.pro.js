const path = require("path");
const config = require("./webpack.config");
module.exports = {
    ...config,
    entry: {
        "admin": "./src/admin/pro/index.js",
        "admin.help": "./src/admin/pro/help.js",
        "admin.settings": "./src/admin/pro/settings.js",
        "blocks": "./src/blocks/pro/index.js",
        "public": "./src/public/pro/index.js"
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "pro/assets/generated")
    }
};
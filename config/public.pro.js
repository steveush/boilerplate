const __config = require("./__webpack");
const path = require("path");
module.exports = __config({
    "core": "./src/public/__pro/core/index.js",
    "core.wordpress": {
        import: "./src/public/__pro/wordpress/index.js",
        dependOn: "core"
    },
    "core.ready": {
        import: "./src/public/__pro/ready.js",
        dependOn: "core"
    }
}, {
    path: path.resolve(__dirname, "../pro/assets/public"),
    filename: '[name].js'
});
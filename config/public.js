const __config = require("./__webpack");
const path = require("path");
module.exports = __config({
    "core": "./src/public/core/index.js",
    "core.wordpress": {
        import: "./src/public/wordpress/index.js",
        dependOn: "core"
    },
    "core.ready": {
        import: "./src/public/ready.js",
        dependOn: "core"
    }
}, {
    path: path.resolve(__dirname, "../assets/public"),
    filename: '[name].js'
});
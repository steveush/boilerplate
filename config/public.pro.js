const __config = require("./__webpack");
const path = require("path");
module.exports = __config({
    "foobox": "./src/public/__pro/core/index.js",
    "foobox.wordpress": {
        import: "./src/public/__pro/wordpress/index.js",
        dependOn: "foobox"
    },
    "foobox.ready": {
        import: "./src/public/__pro/ready.js",
        dependOn: "foobox"
    }
}, {
    path: path.resolve(__dirname, "../pro/assets/public"),
    filename: '[name].js'
});
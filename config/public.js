const __config = require("./__webpack");
const path = require("path");
module.exports = __config({
    "foobox": "./src/public/core/index.js",
    "foobox.wordpress": {
        import: "./src/public/wordpress/index.js",
        dependOn: "foobox"
    },
    "foobox.ready": {
        import: "./src/public/ready.js",
        dependOn: "foobox"
    }
}, {
    path: path.resolve(__dirname, "../assets/public"),
    filename: '[name].js'
});
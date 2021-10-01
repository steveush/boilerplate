const gulp = require("gulp");
const gulpWpPot = require("gulp-wp-pot");
const gulpZip = require("gulp-zip");
const gulpFreemius = require("gulp-freemius-deploy");
const del = require("del");
const pkg = require("./package.json");

const freemiusConfig = require("./fs-config.json");

// register the freemius-deploy task
gulpFreemius(gulp, {
    ...freemiusConfig,
    zip_name: `${pkg.name}.v${pkg.version}.zip`,
    zip_path: "./releases/",
    add_contributor: true
});

// clean up the files created by the tasks
function clean(){
    return del([
        `./languages/${pkg.name}.pot`,
        `./releases/${pkg.name}.v${pkg.version}.zip`
    ]);
}

// extract a .pot file from all PHP files excluding those in the node_modules dir
function translate(){
    return gulp.src("**/!node_modules/*.?.php")
        .pipe(gulpWpPot({
            "domain": `${pkg.name}`,
            "package": `${pkg.title}`,
            "bugReport": `${pkg.bugs}`,
            "team": `${pkg.author}`
        }))
        .pipe(gulp.dest(`./languages/${pkg.name}.pot`));
}

// create a .zip containing just the production code for the plugin
function zip(){
    return gulp.src([
            "**/*",
            "!package*.json",
            "!./{node_modules,node_modules/**/*}",
            "!./{releases,releases/**/*}",
            "!./{src,src/**/*}",
            "!fs-config.json",
            "!composer.json",
            "!composer.lock",
            "!gulpfile*.js",
            "!webpack*.js",
            "!./{gulpfile.js,gulpfile.js/**/*}"
        ])
        .pipe(gulpZip(`${pkg.name}.v${pkg.version}.zip`))
        .pipe(gulp.dest("./releases"));
}

exports.default = gulp.series(clean, translate, zip);
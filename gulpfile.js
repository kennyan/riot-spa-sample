var gulp = require('gulp');
var webpack = require('gulp-webpack');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
var sourcemap = require('gulp-sourcemaps');
var mergeJson = require('gulp-merge-json');
var jsonminify = require('gulp-jsonminify')
var gmincss = require('gulp-minify-css')
var licenseFind = require('gulp-license-finder');


/*
 * bundles
 ********************************************/

var WEBPACK_RESOUCES = [
  "src/**/*"
]
var WEBPACK_HTML = [
  "src/**/*.html"
]
var WEBPACK_LOCALES = [
  "src/locales/**/*"
]
var WEBPACK_IMAGES = [
  "src/images/**/*"
]
var WEBPACK_JSONS = [
  "src/json/**/*"
]


/*
 * vendor CSS
 ********************************************/
var VENDOR_CSS = [
  "node_modules/bootstrap/dist/css/bootstrap.css",
];




/*
 * watch
 ********************************************/
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(WEBPACK_RESOUCES, ['app.webpack'])
  gulp.watch(WEBPACK_RESOUCES, function(file) {
    livereload.changed(file.path);
  });
});




/*
 * vendor css concat
 ********************************************/
gulp.task('css.vendor.concat', function() {
  return gulp.src(VENDOR_CSS)
  .pipe(plumber())
  .pipe(sourcemap.init())
  .pipe(concat("vendor.css"))
  .pipe(gmincss().on('error', gutil.log))
  .pipe(sourcemap.write("./"))
  .pipe(gulp.dest("www/dist/css"));
});




/*
 * app bulid task
 ********************************************/
gulp.task('app.webpack', function() {
  gulp.src(WEBPACK_RESOUCES)
    .pipe(webpack( require('./webpack.config.js')))
    .pipe(gulp.dest('./www/dist/js'))
  gulp.src(WEBPACK_HTML).pipe(gulp.dest('./www/'))
  gulp.src(WEBPACK_IMAGES).pipe(gulp.dest('./www/dist/images'))
  gulp.src(WEBPACK_LOCALES)
    .pipe(mergeJson("locales.json"))
    .pipe(jsonminify())
    .pipe(gulp.dest('./www/dist/locales'))
  gulp.src(WEBPACK_JSONS).pipe(gulp.dest('./www/dist/json'))
  return
})





/*
 * default
 ********************************************/
gulp.task('default', ['watch', 'app.webpack', 'css.vendor.concat']);





/*
 * app build
 ********************************************/
gulp.task('build', ['app.webpack', 'css.vendor.concat']);

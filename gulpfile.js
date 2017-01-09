var gulp  = require('gulp'),
    connect  = require('gulp-connect'),
    less = require('gulp-less'),
    path = require('path'),
    config = require("./gulp.config"),
    runSequence = require("run-sequence"),
    rename = require("gulp-rename"),
    inject = require("gulp-inject"),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean');

gulp.task("copy-html", function () {
    gulp.src(config.app.baseHtml)
        .pipe(rename("index.html"))
        .pipe(gulp.dest(config.dist.base));
});

gulp.task("copy-assets", function(){
    gulp.src(config.app.assets)
        .pipe(gulp.dest(config.dist.assets));
});

gulp.task("compile-scripts", function(){
    gulp.src(config.app.scripts)
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.dist.scripts));
});

gulp.task("compile-libs", function(){
    gulp.src(config.app.compiledLibsStyles)
        .pipe(concat('libs.min.css'))
        .pipe(gulp.dest(config.dist.libs));

    gulp.src(config.app.compiledLibsScripts)
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest(config.dist.libs));
})

 gulp.task("compile-styles", function(){
    return gulp.src(config.app.less)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest(config.dist.base))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(config.dist.base));
});

/* INJECT */
gulp.task('inject', function () {
    var target = gulp.src(config.dist.indexHtml);
    var sources = gulp.src(config.dist.compiledSources, {read: false});
    var stream = target.pipe(inject(sources, { relative: true }))
              .pipe(gulp.dest("dist"));
    return stream;
});


gulp.task('compile', function(callback){
  runSequence(
            ["copy-html", "compile-libs" , "copy-assets", "compile-scripts",  "compile-styles"],
            "inject",
            callback);
});

gulp.task('clean', function(){
    return gulp.src(config.dist.base, {read: false})
        .pipe(clean());
})

gulp.task('serve', ['compile'], function(){
  connect.server({
      name: 'Dev App',
      root: ['dist', 'tmp'],
      port: 8086,
      livereload: true
    });
});

gulp.task('default', function() {
  console.log('Gulp is running!')
});
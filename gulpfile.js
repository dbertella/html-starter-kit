var gulp = require('gulp'),
	connect = require('gulp-connect'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer');

var errorHandler = function(err) {
    var filename = (err.fileName || 'file');
    console.log('[ \x1b[31m!ERROR\x1b[0m ] ' + (!!err.plugin ? 'Plugin ' + err.plugin : 'Main task') + ': \x1b[35m' + filename + '\x1b[0m \x1b[31m' + err.message + '\x1b[0m' + (!!err.lineNumber ? ' At line: ' + err.lineNumber : '0') );
};
var path = {
  ALL: ['./app/js/**/*.js', './scss/**/*.scss', './app/*.html'],
  HTML: './app/*.html',
  JS: ['./app/js/*.js', './app/js/**/*.js'],
  SCSS: './scss/**/*.scss',
  DEST_CSS: './app/css',
  DEST_JS: './app/js'
};

gulp.task('connect', function() {
  connect.server({
    root: './app',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src(path.HTML)
    .pipe(connect.reload());
});

gulp.task('sass', function () {
    gulp.src(path.SCSS)
        .pipe(sass())
        .on('error', errorHandler)
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 8'],
            cascade: false
        }))
        .on('error', errorHandler)
        .pipe(gulp.dest(path.DEST_CSS));
});

gulp.task('watch', function () {
  gulp.watch(path.HTML, ['html']);
  gulp.watch(path.SCSS, ['sass']);

});
gulp.task('default', ['connect', 'watch']);
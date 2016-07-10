var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var streamify = require('gulp-streamify');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var rename = require("gulp-rename");
var babelify = require('babelify');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var livereload = require('gulp-livereload');
var csso = require('gulp-csso');
var htmlreplace = require('gulp-html-replace');
var autoprefixer = require('gulp-autoprefixer');
var exorcist    = require('exorcist');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var browserSyncCreate = browserSync.create();


gulp.task('server', function (cb) {

	var exec = require('child_process').exec;

	exec('node app.js', function (err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});

})


gulp.task('copy', function(){
	gulp.src('index.html')
		.pipe(gulp.dest('./build/'));
});

// Input file.
watchify.args.debug = true;
var bundler = watchify(browserify('./src/js/entry.js', watchify.args));


// Babel transform
bundler.transform(babelify.configure({
	sourceMapRelative: './src/js'
}));


// On updates recompile
bundler.on('update', bundle);

function bundle() {

	console.log('JS inggg')

	return bundler.bundle()
		.on('error', function (err) {
			gutil.log(err.message);
			browserSyncCreate.notify("Browserify Error!");
			this.emit("end");
		})
		.pipe(exorcist('./build/bundle.js.map'))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./build'))
		.pipe(browserSyncCreate.stream({once: true}));
}

/**
* Gulp task alias
*/
gulp.task('bundle', function () {
	return bundle();
});


gulp.task('serve', ['sass', 'bundle'], function() {

	browserSync({
		proxy: "http://localhost:8081",
		files: ["src/scss/**/*.scss", "src/js/**/*.js"],
		browser: "google chrome",
		//logConnections: true,
		//port: 3001,
		open: false
	});

	gulp.watch("./src/scss/**/*.scss", ['sass'])
	gulp.watch('./views/*.ejs').on('change', reload);

});





gulp.task('images', function(){
    return gulp.src('./src/images/**')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
});


gulp.task('sass', function() {

	return gulp.src("./src/scss/**/*.scss")
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(concatCss('styles.css'))
		.pipe(csso({
			restructure: false,
			sourceMap: true,
			debug: true
		}))
		.pipe(gulp.dest("./build/"))
		.pipe(reload({stream: true}));

});

gulp.task('sass-build', function() {

	return gulp.src("./src/scss/**/*.scss")
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(concatCss('styles.css'))
		.pipe(csso())
		.pipe(gulp.dest("./build/"))

});

gulp.task('replaceHTML', function(){
	gulp.src('index.html')
	.pipe(htmlreplace({
		'css': 'style.min.css',
		'js': 'bundle.min.js'
	}))
	.pipe(gulp.dest('./build/'));
});

gulp.task('build', ['sass-build', 'replaceHTML', 'copy']);

gulp.task('default', ['serve', 'server']);

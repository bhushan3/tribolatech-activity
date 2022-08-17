// Node packages / dependencies.
const { task, series, watch, src, dest } = require( 'gulp' );
const autoprefixer = require( 'autoprefixer' );
const babel = require( 'gulp-babel' );
const browserSync = require( 'browser-sync' ).create();
const postCSS = require( 'gulp-postcss' );
const sass = require( 'gulp-sass' )( require( 'node-sass' ) );

// Compile SASS.
task( 'sass', function() {
	return src( 'src/style.scss' )
		.pipe( sass( { outputStyle: 'expanded' } ).on( 'error', sass.logError ) )
		.pipe( postCSS( [ autoprefixer() ] ) )
		.pipe( browserSync.stream() )
		.pipe( dest( 'public' ) );
} );

// Compile and bundle JS files.
task( 'js', function() {
	return src( 'src/script.js' )
		.pipe( babel() )
		.pipe( browserSync.stream() )
		.pipe( dest( 'public' ) );
} );

// Watch files changes and perform the task and reload the browser.
task( 'serve', function() {
	browserSync.init( {
		open: true,
		startPath: 'public',
		server: './',
	} );
	watch( 'src/**/*.scss', series( 'sass' ) );
	watch( 'src/**/*.js', series( 'js' ) );
	watch( 'public/index.html' ).on( 'change', browserSync.reload );
} );


// Prepare all for production.
task( 'build', series( 'sass', 'js' ) );

// Default gulp task.
task( 'default', series( 'build', 'serve' ) );

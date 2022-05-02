const {src,dest,watch,parallel,series} = require('gulp');

//css

const plumber = require('gulp-plumber')
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const notify = require('gulp-notify')

//Javascript

const terser = require('gulp-terser-js');

function css() {
    return src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
            .pipe(plumber())
            // .pipe(sass().on('error', sass.logError))
            .pipe(sass())
            .pipe(postcss([autoprefixer(),cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe( dest('build/css'))

    
}

function image(){
    return src('src/img/**/*')
    .pipe(cache(imagemin({optimizationLevel: 3})))
    .pipe(dest('build/img'))
    .pipe(notify({message:'Imagen Completada'}))

}

function javascript() {
    return src('src/js/**/*.js')
        // .pipe(sourcemaps.init())
            .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'))

    
}

function dev(){
    watch('src/scss/**/*.scss',css);
    watch('src/js/**/*.js',javascript);
    watch('src/img/**/*',imagemin)
    
}


// exports.css = css;

// exports.dev = dev;

exports.default = parallel(css,javascript,image,dev);


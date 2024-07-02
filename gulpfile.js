const { src, dest, watch, series, parallel } = require('gulp');

// Dependencias CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

// img
async function imagenes(done) {
    const { default: imagemin } = await import('gulp-imagemin');

    src('src/img/**/*')
        .pipe(imagemin({ optimizationlevel: 3 }))
        .pipe(dest('build/img'));

    done();
}
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function webpTask() {
    const opciones = {
        quality: 50
    };
    return src('src/img/**/*.{jpg,png}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'));
}

function versionAvif() {
    const opciones = {
        quality: 50
    };
    return src('src/img/**/*.{jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
}

function css(done) {
    // Compilar SASS
    src('src/scss/app.scss')
        .pipe(sass())
        .pipe(dest('build/css'))
        .pipe(postcss([autoprefixer()]))

    done();
}

function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.webpTask = webpTask;
exports.versionAvif = versionAvif;
exports.default = series(imagenes, webpTask, versionAvif, css, dev);
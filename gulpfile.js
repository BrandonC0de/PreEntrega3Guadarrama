const { src, dest, watch, series, parallel } = require('gulp')

//Dependencias CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

//img
async function imagenes(done) {
    const { default: imagemin } = await import('gulp-imagemin'); // Importación dentro de la función
  
    src('src/img/**/*')
      .pipe(imagemin({ optimizationlevel: 3 }))
      .pipe(dest('build/img'));
  
    done();
  }

function css(done) {
    // Compilar SASS
    // Step 1: Identificar archivos. Step 2: Compilar. Step 3: Guardar el .css
    src('src/scss/app.scss')
        .pipe(sass())
        .pipe(dest('build/css'))
        .pipe(postcss([autoprefixer()]))

    done();
}

exports.css = css;
function dev() {
    watch('src/scss/**/*.scss', (cb) => {
        css(cb); // Llama a la función css y pasa la devolución de llamada
    });
    watch('src/img/**/*', imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.default = series(imagenes, css, dev);

// series -  Se inicia una tarea y cuando termina, inica la siguiente
// pararell - Todas las tareas inician al mismo tiempo
const {src, dest, watch, series, parallel} = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat')

// Utilidades CSS - 19/Mayo no se pueden utilizar por vulnerabilidades 
// const autoprefixer = require('autoprefixer');
// const postcss = require('gulp-postcss');


// Funcion que compila SASS

const paths = {
    imagenes: 'src/img/**/*', 
    scss: 'src/scss/**/*.scss', 
    js:'src/JS/**/*.js'
}

function css(){
    return src(paths.scss) 
        .pipe(sass())
        .pipe(dest("./build/css"))
}

function minificarCSS(){
    return src(paths.scss) 
    .pipe(sass({
        outputStyle: 'compressed' //Para poder darle mantenimiento hay que cambiar 'compressed' a 'expanded'
    }))
    .pipe(dest("./build/css"))
}

function javascript(){
    return src(paths.js)
        .pipe(concat('bundle.js'))
        .pipe(dest('./build/JS'))
}

function imagenes(){
    return src(paths.imagenes)
        .pipe(imagemin())
        .pipe(dest("./build/img"))
        .pipe(notify({message: 'Imagen minificada'}))
}

function versionWebp(){
    return src(paths.imagenes)
        .pipe(webp())
        .pipe(dest("./build/img"))
        .pipe(notify({message: 'Version Webp Lista'}))
}

function watchArchivos(){
    watch(paths.scss, css); // El * dice que escuche los cambios de todos los archivos con extension .scss
    watch(paths.js, javascript)
}

// Para entrar en modo watch hay que correr el codigo en la terminal. Si se quiere terminar con la tarea hay que ingredar 'ctrl+c'

exports.css = css;
exports.minificarCSS = minificarCSS;
exports.watchArchivos = watchArchivos;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;

exports.default = series(css, javascript, imagenes, versionWebp, watchArchivos)
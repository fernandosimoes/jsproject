import autoprefixer from 'gulp-autoprefixer';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';

const compileCSS = (enviroment) => {

  let options = {};
  let isDev = true;

  const optionsPrefixer = {
    cascade: false,
    "browsers": [
      "> 1%",
      "last 2 versions",
      "ie 10",
      "Safari >= 8"
    ]
  };
  const vendorPaths = [
    'node_modules/alertifyjs/build/css/',
  ];


  if (enviroment === 'prod') {
    isDev = false;
    options = {
      outputStyle: 'compressed',
      includePaths: vendorPaths
    }
  } else {
    isDev = true;
    options = {
      errLogToConsole: true,
      outputStyle: 'expanded',
      includePaths: vendorPaths
    }
  }
  return gulp
    .src(`./src/scss/**/*.scss`)
    .pipe(gulpif(isDev, sourcemaps.init()))
    .pipe(sass(options).on('error', sass.logError))
    .pipe(autoprefixer(optionsPrefixer))
    .pipe(gulpif(isDev, sourcemaps.write()))
    .pipe(gulp.dest(`./dist/css/`))
};

export default compileCSS;

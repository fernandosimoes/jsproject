'use strict';

// Core imports
import gulp from 'gulp';

// Modules imports
import compileCSS from './.gulp/compileCSS';
import cssWatch from './.gulp/cssWatch';
import browserSync from 'browser-sync';
import fs from 'fs';
import htmlreplace from 'gulp-html-replace';
import clean from 'gulp-clean';

gulp.task('sass', () => compileCSS('prod'));
gulp.task('sass:dev', () => compileCSS('dev'));
gulp.task('sass:watch', () => cssWatch());


gulp.task('clean', function () {
  return gulp.src('./dist', { read: false })
    .pipe(clean());
});


gulp.task('default', ['sass']);
gulp.task('build', ['clean', 'sass', 'filecopy']);
gulp.task('watch', ['sass:watch', 'filecopy', 'copy']);
gulp.task('dev', ['sass:dev', 'filecopy']);


gulp.task('copy', function () {
  var jsFiles = fs.readdirSync('./dist/js/');
  var filesWithoutMap = [];
  var routes = '';
  jsFiles.forEach(jsfile => {
    if (jsfile.indexOf(".map") == -1) {
      if (jsfile == 'routes.js') {
        routes = '/js/' + jsfile;
      } else {
        filesWithoutMap.push('./js/' + jsfile);
      }
    }
  });
  filesWithoutMap.push(routes);
  var cssFiles = fs.readdirSync('./dist/css/');
  var cssFilesWithoutMap = [];

  cssFiles.forEach(file => {
    if (file.indexOf(".map") == -1 && file != "component" && file != "config") {
      cssFilesWithoutMap.push('/css/' + file);
    }
  });

  var start = './src/html/index.html'
  gulp.src(start)
    .pipe(htmlreplace({
      'css': cssFilesWithoutMap,
      'js': filesWithoutMap
    }))
    .pipe(gulp.dest('./dist/'))
});

var destination = './dist/img/';
gulp.task('filecopy', () => {
  gulp.src('./src/img/*')
  .pipe(gulp.dest(destination))
})


gulp.task('server', () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
  gulp.watch('src/**/*').on('change', browserSync.reload);
  gulp.watch('dist/js/*', ['copy']).on('change', browserSync.reload);


  gulp.watch('src/html/*', ['copy']);
  gulp.watch('src/img/*', ['filecopy']);

  gulp.watch('src/scss/**/*.scss', ['sass', 'copy']).on('change', browserSync.reload)
})

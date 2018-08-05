import gulp from 'gulp';
import gutil from 'gulp-util';
import { exec } from 'child_process';

const cssWatch = () => {
  gulp.watch(`./src/scss/**/*.scss`, ['sass:dev'])
  .on('change', (file) => {
    exec(`sass-lint -v -q ${file.path}`, function (err, stdout, stderr) {
      if (stdout !== '') {
        console.log(stdout);
      } else {
        gutil.log(gutil.colors.green('sass linted'));
      }
    });
  });
};

export default cssWatch;

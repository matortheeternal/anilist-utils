const childProcess = require('child_process');
const electron = require('electron');
const gulp = require('gulp');

function runElectron(done) {
  childProcess.spawn(electron, ['.'], { stdio: 'inherit' })
      .on('close', () => {
        // User closed the app. Kill the host process.
        process.exit();
        done();
      });
}

gulp.task('start', gulp.series('build', runElectron));

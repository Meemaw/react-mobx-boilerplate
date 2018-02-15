const gulp = require('gulp')
const run = require('gulp-run')
const rename = require('gulp-rename')
const runSequence = require('run-sequence')
const template = require('gulp-template')
const clean = require('gulp-clean')
const gutil = require('gulp-util')
const ftp = require('vinyl-ftp')
const notify = require('gulp-notify')

const moment = require('moment')
const time = moment().format('YYYY-MM-DD HH:mm:ss')

const ENVIRONMENTS = {
  DEV: 'dev',
  TEST: 'test',
  PROD: 'production',
}

gulp.task('clean', function() {
  return gulp.src(['.env'], { read: false }).pipe(clean())
})

gulp.task('dev', function() {
  runSequence('clean', 'setDev')
})

gulp.task('setDev', () =>
  gulp
    .src('./templates/.env.template')
    .pipe(template({ time, env: ENVIRONMENTS.DEV }))
    .pipe(rename('.env'))
    .pipe(gulp.dest('./'))
)

gulp.task('test', function() {
  runSequence('clean', 'setTest', 'build')
})

gulp.task('setTest', () =>
  gulp
    .src('./templates/.env.template')
    .pipe(template({ time, env: ENVIRONMENTS.TEST }))
    .pipe(rename('.env'))
    .pipe(gulp.dest('./'))
)

gulp.task('setProd', () =>
  gulp
    .src('./templates/.env.template')
    .pipe(template({ time, env: ENVIRONMENTS.PROD }))
    .pipe(rename('.env'))
    .pipe(gulp.dest('./'))
)

gulp.task('prod', function() {
  runSequence('clean', 'setProd', 'build')
})

gulp.task('build', function() {
  return run('yarn build').exec()
})

gulp.task('deploy', function() {
  const env = require('dotenv').config().parsed
  const distDir = env.REACT_APP_ENV === 'production' ? '/TODO/' : '/test/TODO/'
  const desination = `${distDir}${env.REACT_APP_NAME}`

  const conn = ftp.create({
    host: 'xx-ssh.xx.com',
    user: 'xx',
    password: 'xx',
    log: gutil.log,
    parallel: 8,
  })

  const globs = ['./build/**']
  return gulp
    .src(globs, { base: './build', buffer: false })
    .pipe(conn.newerOrDifferentSize(desination))
    .pipe(conn.dest(desination))
    .pipe(
      notify({
        message: 'Finished deployment.',
        onLast: true,
      })
    )
})

gulp.task('default', ['dev'])

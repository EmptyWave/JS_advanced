let gulp = require('gulp'), //Сам gulp
    sass = require('gulp-sass'), // компиляция sass
    uglifyJs = require('gulp-uglifyes'), // минификация js
    autoPrefixer = require('gulp-autoprefixer'), // Вендорные префиксы
    concat = require('gulp-concat'), // Конкатенация
    bs = require('browser-sync'), // Сервер
    htmlMin = require('gulp-htmlmin'), // Минификация html
    rename = require('gulp-rename'), // Переименование
    delFiles = require('del'), // Удаление файлов
    cssMinify = require('gulp-csso'), // Минификация css
    babel = require('gulp-babel'), // Babel
    pug = require('gulp-pug'); // Pug

// Методы gulp
// gulp.task() - создание задачи
// gulp.src() - выбор файла
// gulp.dest() - сохранение
// gulp.parallel() - параллельный запуск задач
// gulp.series() - последовательный запуск задач
// gulp.watch() - следить за файлами

gulp.task('html', () => {
    return gulp.src('app/html/**/*.html') // Выбор файла
        .pipe(htmlMin({collapseWhitespace: true})) //Сжатие файла
        .pipe(gulp.dest('dist')); // сохранение файла
});

gulp.task('clean', () => {
    return delFiles(['dist/**', '!dist']);
});

gulp.task('sass', () => {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass())
        .pipe(autoPrefixer())
        .pipe(cssMinify())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('img', () => {
  return gulp.src('app/img/**/*.+(png|jpg|gif|svg)')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('img_css', () => {
return gulp.src('app/sass/img/**/*.+(png|jpg|gif|svg)')
  .pipe(gulp.dest('dist/css/img'));
});

gulp.task('json', () => {
  return gulp.src('app/json/**/*.json')
    .pipe(gulp.dest('dist'));
});

gulp.task('js:es6', () => {
   return gulp.src('app/js/**/*.js')
       .pipe(uglifyJs())
       .pipe(rename({suffix: '.min'}))
       .pipe(gulp.dest('dist/js'));
});

gulp.task('babel', () => {
    return gulp.src('app/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename({suffix: '.es5'}))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('server', () => {
   return bs({
       browser: 'chrome',
       server: {
           baseDir: 'dist'
       }
   })
});
gulp.task('html:watch', () => {
  return gulp.watch('app/html/**/*.html', gulp.series('html', (done) => {
    bs.reload();
    done();
  }))
});
gulp.task('sass:watch', () => {
   return gulp.watch('app/sass/**/*.sass', gulp.series('sass', (done) => {
       bs.reload();
       done();
   }))
});
gulp.task('js:watch', () => {
    return gulp.watch('app/js/**/*.js', gulp.series('js:es6', (done) => {
        bs.reload();
        done();
    }))
});

gulp.task(
  'default',
  gulp.series(
    'clean' ,
    gulp.parallel(
      'html',
      'sass',
      'img',
      'img_css',
      'json',
      'js:es6',
      'babel'
    ),
    gulp.parallel(
      'html:watch',
      'sass:watch',
      'js:watch',
      'server'
    )
  )
);
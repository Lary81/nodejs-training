var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var inject = require('gulp-inject');

var buildDir = 'dist';

var css = [
    'bower_components/bootstrap/dist/css/bootstrap.css',
    'bower_components/bootstrap/dist/css/bootstrap-theme.css',
    'assets/css/*.css'
];

var scripts = [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'bower_components/es6-promise-polyfill/promise.js',
    'bower_components/mustache.js/mustache.js',
    'assets/js/library.js',
    'assets/js/library-*.js',
    'app/*.js'
];


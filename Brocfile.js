/* global require, module */

var BS_FONT_PATH = 'bower_components/bootstrap-sass/assets/fonts/bootstrap';
var BS_FONT_FILES = [
  'glyphicons-halflings-regular.eot',
  'glyphicons-halflings-regular.svg',
  'glyphicons-halflings-regular.ttf',
  'glyphicons-halflings-regular.woff',
  'glyphicons-halflings-regular.woff2'
];
var BS_JS_PATH = 'bower_components/bootstrap-sass/assets/javascripts/bootstrap';
var BS_JS_FILES = [
  'affix',
  'alert',
  'button',
  //'carousel',
  'collapse',
  'dropdown',
  'tab',
  //'transition',
  //'scrollspy',
  //'modal',
  'tooltip',
  'popover'
];

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

BS_FONT_FILES.forEach(function (file) {
  app.import(BS_FONT_PATH + '/' + file, {destDir: 'assets/fonts'});
});
BS_JS_FILES.forEach(function (file) {
  app.import(BS_JS_PATH + '/' + file + '.js');
});

// marked lib
app.import('bower_components/marked/lib/marked.js');

// highlight.js
app.import('vendor/highlight.js/default.css');
app.import('vendor/highlight.js/highlight.pack.js');


module.exports = app.toTree();

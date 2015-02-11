/* jshint node: true */

var NPM_JSON = require('../package.json');
var BOWER_JSON = require('../bower.json');

module.exports = function (environment) {
  var ENV = {
    modulePrefix: 'huafu-homepage',
    environment:  environment,
    baseURL:      process.env.EMBER_CLI_BASE_URL || '/',
    // for github page to work correctly, it needs a hash location type
    locationType: process.env.EMBER_CLI_LOCATION_TYPE || 'hash',

    poweredBy: {
      npm: NPM_JSON.devDependencies,
      bower: BOWER_JSON.dependencies
    },

    version: NPM_JSON.version,

    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src':  "'self' 'unsafe-inline' 'unsafe-eval' *.googleapis.com maps.gstatic.com gist.github.com cdnjs.cloudflare.com",
      'font-src':    "'self' fonts.gstatic.com",
      'connect-src': "'self' api.github.com npm-registry-cors-proxy.herokuapp.com npm-stat.com", //"registry.npmjs.org",
      'img-src':     "'self' *.gstatic.com *.googleapis.com s.gravatar.com nodei.co raw.githubusercontent.com travis-ci.org api.travis-ci.org",
      'style-src':   "'self' 'unsafe-inline' gist-assets.github.com fonts.googleapis.com cdnjs.cloudflare.com",
      'frame-src':   "ghbtns.com platform.twitter.com www.facebook.com"
    },

    marked: {
      // marked settings
      //version: '0.3.2', // default version, used when the js is not specified
      js:          false, // disable inclusion of the javascript (can be the URL to some other CDN)

      // highlight.js settings
      highlightjs: { // <== set to false to disable totally the inclusion of highlightjs
        //version: '8.3', // default version, used when the js and/or css are not specified
        js:  false, // disable inclusion of the javascript (can be the URL to some other CDN)
        css: false // disable inclusion of the css (can be the URL to some other CDN)
      }
    },

    devFixtures: true,

    googleMap: {
      lazyLoad: true
    },

    imgManager: {
      loadingSrc: '/assets/images/loading.gif',
      errorSrc: '/assets/images/no-image.png'
    },

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
        //'ember-htmlbars': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};

import Ember from 'ember';
import computed from '../utils/computed';
import ENV from '../config/environment';

var on = Ember.on;
var $ = Ember.$;
var run = Ember.run;
var scheduleOnce = run.scheduleOnce;
var bind = run.bind;

// to enable bootstrap related stuffs
Ember.View.reopen({

  /**
   * Removes the application loader once we get into the DOM
   *
   * @method removeApplicationLoadingDiv
   */
  removeApplicationLoadingDiv: on('didInsertElement', function () {
    var $loading = $('#application-loader');
    $loading.fadeOut(bind($loading, 'remove'));
  }),


  /**
   * Setup TBS
   *
   * @method setupTwitterBootstrap
   */
  setupTwitterBootstrap:  on('didInsertElement', function () {
    scheduleOnce('afterRender', this, '_setupTwitterBootstrap');
  }),
  _setupTwitterBootstrap: function () {
    this.$('[title][data-toggle!="popover"]').tooltip();
    this.$('[data-toggle="popover"]').popover();
  },

  /**
   * Teardown TBS
   *
   * @method teardownTwitterBootstrap
   */
  teardownTwitterBootstrap: on('willDestroyElement', function () {
    this.$('[data-toggle="popover"]').popover('destroy');
    this.$('[title][data-toggle!="popover"]').tooltip('destroy');
  })
});

/**
 * @class ApplicationView
 * @extends Ember.View
 */
export default Ember.View.extend({
  /**
   * @inheritDoc
   */
  classNameBindings: ['routeClasses'],

  /**
   * The version of our app
   * @property version
   * @type {string}
   */
  version: ENV.version,

  /**
   * Classes for the current route
   * @property routeClasses
   * @type {string}
   */
  routeClasses: computed('controller.currentPath', function () {
    var route = this.get('controller.currentPath') || 'index';
    return 'route-' + route.split('.').join('_');
  })
});

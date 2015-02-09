import Ember from 'ember';
import computed from '../utils/computed';

// to enable bootstrap related stuffs
Ember.View.reopen({
  /**
   * Setup TBS
   *
   * @method setupTwitterBootstrap
   */
  setupTwitterBootstrap:  Ember.on('didInsertElement', function () {
    Ember.run.scheduleOnce('afterRender', this, '_setupTwitterBootstrap');
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
  teardownTwitterBootstrap: Ember.on('willDestroyElement', function () {
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
   * Classes for the current route
   * @property routeClasses
   * @type {string}
   */
  routeClasses: computed('controller.currentPath', function () {
    var route = this.get('controller.currentPath') || 'index';
    return 'route-' + route.split('.').join('$');
  })
});

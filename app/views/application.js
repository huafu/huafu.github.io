import Ember from 'ember';
import computed from '../utils/computed';

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

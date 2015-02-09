import Ember from 'ember';
import computed from '../../utils/computed';

/**
 * @class NpmPackageItemController
 * @extends Ember.ObjectController
 */
export default Ember.ObjectController.extend({
  /**
   * Is highlighted?
   * @property isHighlighted
   * @type {boolean}
   */
  isHighlighted: computed('name', 'parentController.highlightedName', function () {
    return this.get('name') === this.get('parentController.highlightedName');
  })
});

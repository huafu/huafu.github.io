import Ember from 'ember';
import DS from 'ember-data';

/**
 * @mixin ModelWithCuDatesMixin
 * @extension ModelWithCuDatesMixin
 */
export default Ember.Mixin.create({
  /**
   * Creation date
   * @property createdAt
   * @type {Date}
   */
  createdAt: DS.attr('date'),

  /**
   * Update date
   * @property updatedAt
   * @type {Date}
   */
  updatedAt: DS.attr('date')

});

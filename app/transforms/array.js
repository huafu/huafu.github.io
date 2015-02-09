import Ember from 'ember';
import DS from 'ember-data';

/**
 * @class ArrayTransform
 * @extends DS.Transform
 */
export default DS.Transform.extend({
  /**
   * @inheritDoc
   */
  deserialize: function (serialized) {
    return Ember.A(serialized || []);
  },

  /**
   * @inheritDoc
   */
  serialize: function (deserialized) {
    return Ember.A(deserialized || []).toArray();
  }
});

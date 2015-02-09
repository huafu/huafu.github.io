import Ember from 'ember';
import DS from 'ember-data';

var underscore = Ember.String.underscore;
var pluralize = Ember.String.pluralize;

/**
 * @class NpmSerializer
 * @extends DS.ActiveModelSerializer
 */
export default DS.ActiveModelSerializer.extend({
  /**
   * @inheritDoc
   */
  extractArray: function (store, primaryType, payload) {
    var normalized = {};
    normalized[pluralize(underscore(primaryType.typeKey))] = payload;
    return this._super(store, primaryType, normalized);
  },

  /**
   * @inheritDoc
   */
  extractSingle: function (store, primaryType, payload, recordId) {
    var normalized = {};
    normalized[underscore(primaryType.typeKey)] = payload;
    return this._super(store, primaryType, normalized, recordId);
  }

});

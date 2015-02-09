import Ember from 'ember';
import DS from 'ember-data';

var underscore = Ember.String.underscore;

/**
 * @class NpmPackageDownloadSerializer
 * @extends DS.ActiveModelSerializer
 */
export default DS.ActiveModelSerializer.extend({

  /**
   * @inheritDoc
   */
  extractSingle: function (store, primaryType, payload, recordId) {
    var normalized = {};
    normalized[underscore(primaryType.typeKey)] = payload;
    return this._super(store, primaryType, normalized, recordId);
  },

  /**
   * @inheritDoc
   */
  normalize: function (type, hash/*, prop*/) {
    // add the required id
    hash.id = hash.package + ':' + hash.start + ':' + hash.end;
    hash.npm_package_id = hash.package;
    delete hash.package;
    return this._super.apply(this, arguments);
  }
});

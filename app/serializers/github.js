import Ember from 'ember';
import DS from 'ember-data';

var forEach = Ember.EnumerableUtils.forEach;
var underscore = Ember.String.underscore;
var pluralize = Ember.String.pluralize;

/**
 * @class GithubSerializer
 * @extends DS.ActiveModelSerializer
 */
export default DS.ActiveModelSerializer.extend({
  /**
   * The ignored attributes when normalizing links
   * @property linksIgnoredAttrs
   * @type {Array.<string>}
   */
  linksIgnoredAttrs: Ember.computed(function () {
    var attrs, names = [];
    attrs = this.attrs || {};
    forEach(Ember.keys(attrs), function (name) {
      if (typeof attrs[name] === 'object' && attrs[name].isLink === false) {
        names.push(attrs[name].key || underscore(name + '_url'));
      }
    });
    return names;
  }),

  /**
   * @inheritDoc
   */
  normalizeLinks: function (data) {
    var keys = Ember.keys(data), links = {}, ignore = this.get('linksIgnoredAttrs'), attrs = this.attrs;
    ignore = ignore || [];
    forEach(keys, function (key) {
      var newKey;
      if (/_url$/.test(key) && ignore.indexOf(key) === -1) {
        newKey = key.replace(/_url$/, '');
        links[newKey] = data[key];
        if (attrs && attrs[newKey] && attrs[newKey].queryParams) {
          links[newKey] += '?' + Ember.$.param(attrs[newKey].queryParams);
        }
        delete data[key];
      }
    }, this);
    data.links = links;
    return this._super.apply(this, arguments);
  },

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

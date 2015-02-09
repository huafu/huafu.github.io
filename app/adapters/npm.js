import Ember from 'ember';
import DS from 'ember-data';

/**
 * @class NpmAdapter
 * @extends DS.ActiveModelAdapter
 */
export default DS.ActiveModelAdapter.extend({
  /**
   * @inheritDoc
   */
  defaultSerializer: '-npm',

  /**
   * @inheritDoc
   */
  host: 'http://npm-registry-cors-proxy.herokuapp.com',
  //host: 'https://registry.npmjs.org',

  /**
   * @inheritDoc
   */
  pathForType: function (/*type*/) {
    return '';
  },

  /**
   * @inheritDoc
   */
  buildURL: function () {
    return this._super.apply(this, arguments).replace(/([^:\/])\/{2,}/g, '$1/');
  },

  /**
   * @inheritDoc
   */
  ajax: function () {
    return this._super.apply(this, arguments)
      .then(function (response) {
        var error;
        if (response.error === 'not_found') {
          error = new Error('Not Found');
          Ember.merge(error, {
            status:       404,
            statusText:   'Not Found',
            responseJSON: response,
            responseText: JSON.stringify(response)
          });
          error.prototype = Error.prototype;
          error.constructor = Error;
          return Ember.RSVP.reject(error);
        }
        return response;
      });
  }
});

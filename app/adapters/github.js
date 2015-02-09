import DS from 'ember-data';

/**
 * @class GithubAdapter
 * @extends DS.ActiveModelAdapter
 */
export default DS.ActiveModelAdapter.extend({
  /**
   * @inheritDoc
   */
  defaultSerializer: '-github',

  /**
   * @inheritDoc
   */
  host: '//api.github.com',

  /**
   * @inheritDoc
   */
  pathForType: function (type) {
    return this._super(type.replace(/^github([A-Z])/, function (dummy, letter) {
      return letter.toLowerCase();
    }));
  }

});

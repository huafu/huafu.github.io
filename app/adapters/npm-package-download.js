import DS from 'ember-data';

/**
 * @class NpmPackageDownloadAdapter
 * @extends DS.ActiveModelAdapter
 */
export default DS.ActiveModelAdapter.extend({
  /**
   * @inheritDoc
   */
  defaultSerializer: '-npm-package-download',

  /**
   * @inheritDoc
   */
  host: 'http://npm-stat.com/downloads', // /range/2008-02-07:2015-02-07/ember-google-map',

  /**
   * @inheritDoc
   */
  pathForType: function (/*type*/) {
    return 'range';
  },

  /**
   * @inheritDoc
   */
  buildURL: function (type, id, record) {
    var newId, name;
    if (id && typeof id === 'string') {
      newId = id.split(':');
      name = newId.shift();
      newId = newId.join(':') + '/' + name;
    }
    return this._super(type, newId ? '__id__' : id, record).replace('__id__', newId);
  }

});

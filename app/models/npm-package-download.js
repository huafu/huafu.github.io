import DS from 'ember-data';

/**
 * @class NpmPackageDownload
 * @extends DS.Model
 */
export default DS.Model.extend({
  /**
   * Download count
   * @property downloads
   * @type {number}
   */
  downloads: DS.attr('npm-package-downloads'),

  /**
   * The related package
   * @property npmPackage
   * @type {NpmPackage}
   */
  npmPackage: DS.belongsTo('npm-package')
});

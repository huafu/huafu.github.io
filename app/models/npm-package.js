import DS from 'ember-data';
import ModelWithCuDatesMixin from '../mixins/model-with-cu-dates';
import computed from '../utils/computed';
import ENV from '../config/environment';

/**
 * @class NpmPackage
 * @extends DS.Model
 * @uses ModelWithCuDatesMixin
 */
export default DS.Model.extend(ModelWithCuDatesMixin, {
  /**
   * Revision HASH
   * @property revision
   * @type {string}
   */
  revision: DS.attr('string'),

  /**
   * Name
   * @property name
   * @type {string}
   */
  name: DS.attr('string'),

  /**
   * Description
   * @property description
   * @type {string}
   */
  description: DS.attr('string'),

  /**
   * Latest version
   * @property latestVersion
   * @type {string}
   */
  latestVersion: DS.attr('string'),

  /**
   * Content of the readme
   * @property readme
   * @type {string}
   */
  readme: DS.attr('string'),

  /**
   * Homepage URL
   * @property homepageUrl
   * @type {string}
   */
  homepageUrl: DS.attr('string'),

  /**
   * The URL for this package
   * @property url
   * @type {string}
   */
  url: DS.attr('string'),

  /**
   * Homepage URL or URL
   * @property homepageOrNpmUrl
   * @type {string}
   */
  homepageOrNpmUrl: computed.any('homepageUrl', 'url'),

  /**
   * Keywords
   * @property keywords
   * @type {Array.<String>}
   */
  keywords: DS.attr('array'),

  /**
   * License
   * @property license
   * @type {string}
   */
  license: DS.attr('string'),

  /**
   * Github repository
   * @property githubRepo
   * @type {GithubRepo}
   */
  //githubRepo: DS.belongsTo('github-repo', {async: true}),

  /**
   * Downloads
   * @property downloadStats
   * @type {NpmPackageDownload}
   */
  downloadStats: DS.belongsTo('npm-package-download', {async: true}),

  /**
   * Total number of downloads
   * @property downloadsTotal
   * @type {number}
   */
  downloadsTotal: computed.readOnly('downloadStats.downloads.total'),

  /**
   * Total number of downloads last 7 days
   * @property downloadsLastSevenDays
   * @type {number}
   */
  downloadsLastSevenDays: computed.readOnly('downloadStats.downloads.lastSevenDays'),

  /**
   * Total number of downloads last 30 days
   * @property downloadsLastThirtyDays
   * @type {number}
   */
  downloadsLastThirtyDays: computed.readOnly('downloadStats.downloads.lastThirtyDays'),

  /**
   * Is it an ember addon
   * @property isEmberAddon
   * @type {boolean}
   */
  isEmberAddon: computed.contains('keywords', 'ember-addon'),

  /**
   * Version powering this website
   * @property versionPoweringApp
   * @type {string}
   */
  versionPoweringApp: computed('name', function () {
    return ENV.poweredBy.npm[this.get('name')] || null;
  }),

  /**
   * Is it used on this website?
   * @property isPoweringApp
   * @type {boolean}
   */
  isPoweringApp: computed.bool('versionPoweringApp')
});

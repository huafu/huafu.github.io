import Ember from 'ember';
import computed from '../utils/computed';

var filter = Ember.EnumerableUtils.filter;

/**
 * @class NpmPackageComponent
 * @extends Ember.Component
 */
export default Ember.Component.extend({
  /**
   * @inheritDoc
   */
  classNames: ['npm-package'],

  /**
   * @inheritDoc
   */
  classNameBindings: ['isCollapsed:is-collapsed:isnt-collapsed'],

  /**
   * The title property to use
   * @property titleProperty
   * @type {string}
   */
  titleProperty: computed(function (key, value) {
    if (this._titleBinding) {
      this._titleBinding.disconnect();
    }
    if (value) {
      this._titleBinding = Ember.Binding.from(value).to('_title');
      this._titleBinding.connect(this);
    }
    return value;
  }),

  /**
   * Title from the title property
   * @property _title
   * @type {string}
   * @private
   */
  _title: null,

  /**
   * Wrap the title into different spans depending on this value
   * @property wrapTitleFor
   * @type {string}
   */
  wrapTitleFor: null,

  /**
   * The title
   * @property title
   * @type {string}
   */
  title: computed('_title', 'wrapTitleFor', function (key, value) {
    var wrapper;
    if (arguments.length > 1) {
      this._forcedTitle = value;
    }
    else {
      value = this._forcedTitle;
      if (value === undefined) {
        value = this.get('_title') || '';
        wrapper = this.get('wrapTitleFor');
        if (wrapper === 'ember') {
          value = value.replace(/(\W|^)(ember(?:\-cli)?)(\W|$)/g, function (dummy, pre, text, post) {
            return pre + '<span class="wrapped">' + text + post + '</span>';
          });
          value = Ember.String.htmlSafe(value);
        }
      }
    }
    return value;
  }),

  /**
   * Ignored tags
   * @property ignoreTags
   * @type {string|Array.<string>}
   */
  ignoreTags: computed(function (key, value) {
    if (arguments.length > 1) {
      if (typeof value === 'string') {
        value = value.replace(/(?:^\s+|\s+$)/g, '').split(/\s*,\s*/g);
      }
      else if (!Ember.isArray(value)) {
        value = [];
      }
      return filter(value, Boolean);
    }
  }),

  /**
   * Best URL
   * @property bestUrl
   * @type {string}
   */
  bestUrl: computed.any('repo.url', 'pkg.homepageOrUrl'),

  /**
   * The package
   * @property pkg
   * @type {NpmPackage}
   */
  pkg: null,

  /**
   * The repository
   * @property repo
   * @type {GithubRepo}
   */
  repo: null,

  /**
   * Are we collapsed?
   * @property isCollapsed
   * @type {boolean}
   */
  isCollapsed: true,

  /**
   * Number of stars
   * @property starsCount
   * @type {number}
   */
  starsCount: computed.reads('repo.stargazersCount'),

  /**
   * Number of downloads
   * @property downloadsCount
   * @type {number}
   */
  downloadsCount: computed.reads('pkg.downloadsTotal'),

  /**
   * The tags (keywords)
   * @property tags
   * @type {Array.<string>}
   */
  tags: computed('pkg.keywords', 'ignoreTags', function () {
    var ignored = this.get('ignoreTags');
    return Ember.A(this.get('pkg.keywords')).filter(function (tag) {
      return Boolean(tag) && ignored.indexOf(tag) === -1;
    });
  }),

  /**
   * @inheritDoc
   */
  init: function () {
    this._super.apply(this, arguments);
    if (!this.get('titleProperty')) {
      this.set('titleProperty', 'pkg.name');
    }
  },


  /**
   * @inheritDoc
   */
  actions: {
    /**
     * Toggle show details
     *
     * @method toggleCollapse
     */
    toggleCollapse: function () {
      this.toggleProperty('isCollapsed');
    }
  }

});

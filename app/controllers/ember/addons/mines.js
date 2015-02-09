import Ember from 'ember';
import computed from '../../../utils/computed';

var IGNORED_ADDONS = ['ember-img-cache'];

/**
 * @class EmberAddonsMinesController
 * @extends Ember.ArrayController
 */
export default Ember.ArrayController.extend({
  /**
   * @inheritDoc
   */
  queryParams: {
    highlightedName: 'name'
  },

  /**
   * Name of the package highlighted
   * @property name
   * @type {string}
   */
  highlightedName: null,

  /**
   * @inheritDoc
   */
  repoItemController: 'npm-package/item',

  /**
   * Filter addons
   * @property repos
   * @type {Ember.Array.<GithubRepo>}
   */
  repos: computed.filter('model', 'isFork', 'isEmberAddon', 'name', function (repo) {
    var name = repo.get('name') || '';
    return !repo.get('isFork') && repo.get('isEmberAddon') && IGNORED_ADDONS.indexOf(name) === -1;
  }),

  /**
   * The descriptor used to sort the repos
   * @property repoSortingDesc
   * @type {Array.<string>}
   */
  repoSortingDesc: ['emberCleanedName'],

  /**
   * Sorted repo
   * @property sortedRepos
   * @type {Ember.Array<GithubRepo>}
   */
  sortedRepos: computed.sort('repos', 'repoSortingDesc'),

  /**
   * @inheritDoc
   */
  actions: {
    /**
     * Handle the expansion of a package
     *
     * @method packageExpanded
     * @param {NpmPackageComponent} pkgComponent
     */
    packageExpanded: function (pkgComponent) {
      this.set('highlightedName', pkgComponent.get('repo.name'));
    },

    /**
     * Handle the collapse of a package
     *
     * @method packageCollapsed
     * @param {NpmPackageComponent} pkgComponent
     */
    packageCollapsed: function (pkgComponent) {
      if (this.get('highlightedName') === pkgComponent.get('repo.name')) {
        this.set('highlightedName', null);
      }
    }
  }
});

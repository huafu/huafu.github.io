import Ember from 'ember';

/**
 * @class EmberAddonsMinesRoute
 * @extends Ember.Route
 */
export default Ember.Route.extend({
  /**
   * Did we load our records yet?
   * @property hasLoadedGithubRepos
   * @type {boolean}
   */
  hasLoadedGithubRepos: false,


  /**
   * @inheritDoc
   */
  model: function () {
    return this.store.find('github-user', 'huafu')
      .then(function (user) {
        // load the repositories
        return user.get('repos');
      });
  }

});

import GithubSerializer from './github';
import computed from '../utils/computed';

/**
 * @class GithubRepoSerializer
 * @extends GithubSerializer
 */
export default GithubSerializer.extend({
  /**
   * @inheritDoc
   */
  attrs: {
    isPrivate: 'private',
    isFork:    'fork',
    url:       {key: 'html_url', isLink: false},
    gitUrl:    {isLink: false},
    sshUrl:    {isLink: false},
    cloneUrl:  {isLink: false},
    svnUrl:    {isLink: false}
  },

  /**
   * @inheritDoc
   */
  normalize: function (type, hash/*, prop*/) {
    hash.github_id = hash.id;
    hash.id = hash.full_name;
    // handle the owner.type
    if (hash.owner && hash.owner.type) {
      this.get('githubUserSerializer').normalize(
        this.store.modelFor('github-user'),
        hash.owner,
        'owner'
      );
      hash.owner.type = 'github_user';
    }
    // remove unused keys
    delete hash.open_issues;
    delete hash.watchers;
    delete hash.forks;
    // guess and add the link to the npm package in case JS is the main language
    if (hash.language === 'JavaScript') {
      hash.npm_package_id = hash.name;
    }
    return this._super.apply(this, arguments);
  },

  /**
   * The github user serializer
   * @property githubUserSerializer
   * @type {GithubUserSerializer}
   */
  githubUserSerializer: computed(function () {
    return this.container.lookup('serializer:github-user');
  })
});

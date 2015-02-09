import GithubSerializer from './github';

/**
 * @class GithubUserSerializer
 * @extends GithubSerializer
 */
export default GithubSerializer.extend({
  /**
   * @inheritDoc
   */
  attrs: {
    avatarUrl:        {key: 'avatar_url', isLink: false},
    url:              {key: 'html_url', isLink: false},
    repos:            {queryParams: {per_page: 100}},
    isSiteAdmin:      'site_admin',
    blogUrl:          'blog',
    isHireable:       'hireable',
    publicReposCount: 'public_repos',
    publicGistsCount: 'public_gists',
    followersCount:   'followers',
    followingsCount:  'following'
  },

  /**
   * @inheritDoc
   */
  normalize: function (type, hash/*, prop*/) {
    hash.github_id = hash.id;
    hash.id = hash.login;
    return this._super.apply(this, arguments);
  }
});

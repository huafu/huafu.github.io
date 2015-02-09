import DS from 'ember-data';
import ModelWithCuDatesMixin from '../mixins/model-with-cu-dates';

/**
 * @class GithubUser
 * @extends DS.Model
 * @uses ModelWithCuDatesMixin
 */
export default DS.Model.extend(ModelWithCuDatesMixin, {
  /**
   * Login
   * @property login
   * @type {string}
   */
  login: DS.attr('string'),

  /**
   * The github internal id
   * @property githubId
   * @type {string}
   */
  githubId: DS.attr('number'),

  /**
   * Avatar URL
   * @property avatarUrl
   * @type {string}
   */
  avatarUrl: DS.attr('string'),

  /**
   * Gravatar ID
   * @property gravatarId
   * @type {string}
   */
  gravatarId: DS.attr('string'),

  /**
   * URL
   * @property url
   * @type {string}
   */
  url: DS.attr('string'),

  /**
   * Followers
   * @property followers
   * @type {GithubUser}
   */
  followers: DS.hasMany('github-user', {async: true}),

  /**
   * Repositories
   * @property repos
   * @type {GithubRepo}
   */
  repos: DS.hasMany('github-repo', {async: true, inverse: 'owner'}),

  /**
   * Is site admin
   * @property isSiteAdmin
   * @type {boolean}
   */
  isSiteAdmin: DS.attr('boolean'),

  /**
   * Name of the user
   * @property name
   * @type {string}
   */
  name: DS.attr('string'),

  /**
   * Company
   * @property company
   * @type {string}
   */
  company: DS.attr('string'),

  /**
   * Blog URL
   * @property blogUrl
   * @type {string}
   */
  blogUrl: DS.attr('string'),

  /**
   * Location
   * @property location
   * @type {string}
   */
  location: DS.attr('string'),

  /**
   * Email address
   * @property email
   * @type {string}
   */
  email: DS.attr('string'),

  /**
   * Is he hireable
   * @property isHireable
   * @type {boolean}
   */
  isHireable: DS.attr('boolean'),

  /**
   * Bio
   * @property bio
   * @type {string}
   */
  bio: DS.attr('string'),

  /**
   * Public repositories
   * @property publicReposCount
   * @type {number}
   */
  publicReposCount: DS.attr('number'),

  /**
   * Public gists count
   * @property publicGistsCount
   * @type {number}
   */
  publicGistsCount: DS.attr('number'),

  /**
   * Followers count
   * @property followersCount
   * @type {number}
   */
  followersCount: DS.attr('number'),

  /**
   * Following users count
   * @property followingsCount
   * @type {number}
   */
  followingsCount: DS.attr('number')
});

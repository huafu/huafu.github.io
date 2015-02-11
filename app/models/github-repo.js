import DS from 'ember-data';
import ModelWithCuDatesMixin from '../mixins/model-with-cu-dates';
import computed from '../utils/computed';

/**
 * @class GithubRepo
 * @extends DS.Model
 * @uses ModelWithCuDatesMixin
 */
export default DS.Model.extend(ModelWithCuDatesMixin, {
  /**
   * Name
   * @property name
   * @type {string}
   */
  name: DS.attr('string'),

  /**
   * Full name
   * @property fullName
   * @type {string}
   */
  fullName: DS.attr('string'),

  /**
   * The github internal id
   * @property githubId
   * @type {string}
   */
  githubId: DS.attr('number'),

  /**
   * Owner
   * @property owner
   * @type {GithubUser}
   */
  owner: DS.belongsTo('github-user', {inverse: 'repos'}),

  /**
   * Is private?
   * @property isPrivate
   * @type {boolean}
   */
  isPrivate: DS.attr('boolean'),

  /**
   * The URL
   * @property url
   * @type {string}
   */
  url: DS.attr('string'),

  /**
   * Description
   * @property description
   * @type {string}
   */
  description: DS.attr('string'),

  /**
   * Is it a fork?
   * @property isFork
   * @type {boolean}
   */
  isFork: DS.attr('boolean'),

  /**
   * The forks
   * @property forks
   * @type {GithubRepo}
   */
  forks: DS.hasMany('github-repo', {async: true}),

  /**
   * When has it been pushed the first time
   * @property pushedAt
   * @type {Date}
   */
  pushedAt: DS.attr('date'),

  /**
   * Git URL
   * @property gitUrl
   * @type {string}
   */
  gitUrl: DS.attr('string'),

  /**
   * SSH URL
   * @property sshUrl
   * @type {string}
   */
  sshUrl: DS.attr('string'),

  /**
   * Clone URL
   * @property cloneUrl
   * @type {string}
   */
  cloneUrl: DS.attr('string'),

  /**
   * SVN URL
   * @property svnUrl
   * @type {string}
   */
  svnUrl: DS.attr('string'),

  /**
   * Homepage
   * @property homepage
   * @type {string}
   */
  homepage: DS.attr('string'),

  /**
   * The size of the repo
   * @property size
   * @type {number}
   */
  size: DS.attr('number'),

  /**
   * Stars
   * @property stargazersCount
   * @type {number}
   */
  stargazersCount: DS.attr('number'),

  /**
   * Watchers count
   * @property watchersCount
   * @type {number}
   */
  watchersCount: DS.attr('number'),

  /**
   * Language
   * @property language
   * @type {string}
   */
  language: DS.attr('string'),

  /**
   * Has issues
   * @property hasIssues
   * @type {boolean}
   */
  hasIssues: DS.attr('boolean'),

  /**
   * Has downloads
   * @property hasDownloads
   * @type {boolean}
   */
  hasDownloads: DS.attr('boolean'),

  /**
   * Has wiki
   * @property hasWiki
   * @type {boolean}
   */
  hasWiki: DS.attr('boolean'),

  /**
   * Has pages
   * @property hasPages
   * @type {boolean}
   */
  hasPages: DS.attr('boolean'),

  /**
   * Number of forks
   * @property forksCount
   * @type {number}
   */
  forksCount: DS.attr('number'),

  /**
   * Number of open issues
   * @property openIssuesCount
   * @type {number}
   */
  openIssuesCount: DS.attr('number'),

  /**
   * The default branch
   * @property defaultBranch
   * @type {string}
   */
  defaultBranch: DS.attr('string'),

  /**
   * NPM package
   * @property npmPackage
   * @type {NpmPackage}
   */
  npmPackage: DS.belongsTo('npm-package', {async: true}),

  /**
   * The URL to the issues
   * @property issuesUrl
   * @type {string}
   */
  issuesUrl: computed.fmt('https://github.com/%@/issues', 'fullName'),

  /**
   * The URL to create a new issue
   * @property newIssueUrl
   * @type {string}
   */
  newIssueUrl: computed.fmt('https://github.com/%@/issues/new', 'fullName'),

  /**
   * Add star URL
   * @property stargazeUrl
   * @type {string}
   */
  stargazeUrl: computed.fmt('https://github.com/%@', 'fullName'),

  /**
   * The icon of the repository
   * @property iconUrl
   * @type {string}
   */
  iconUrl: computed.fmt('https://raw.githubusercontent.com/%@/master/icon.png', 'fullName'),

  /**
   * Ember cleaned name
   * @property emberCleanedName
   * @type {string}
   */
  emberCleanedName: computed('name', function () {
    return (this.get('name') || '').replace(/(\W|^)ember(?:\-cli)?(\W)/g, '$1');
  }),

  /**
   * Is an Ember addon?
   * @property isEmberAddon
   * @type {boolean}
   */
  isEmberAddon: computed.readOnly('npmPackage.isEmberAddon')

});

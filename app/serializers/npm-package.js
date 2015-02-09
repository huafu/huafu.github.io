import NpmSerializer from './npm';

var now = new Date();
function pad2(num) {
  var str = '' + num;
  if (str.length < 2) {
    str = '0' + str;
  }
  return str;
}
function day(date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return date.getFullYear() + '-' + pad2(date.getMonth() + 1) + '-' + pad2(date.getDate());
}

/**
 * @class NpmPackageSerializer
 * @extends NpmSerializer
 */
export default NpmSerializer.extend({
  /**
   * @inheritDoc
   */
  attrs: {
    homepageUrl: 'homepage',
    revision:    '_rev'
  },

  /**
   * @inheritDoc
   */
  normalize: function (type, hash/*, prop*/) {
    var repo, match;
    hash.links = {};
    // move the _id to id
    hash.id = hash._id;
    delete hash._id;
    // define deep properties
    hash.created_at = hash.time.created;
    hash.updated_at = hash.time.modified;
    hash.latest_version = hash['dist-tags'].latest;
    hash.download_stats_id = hash.name + ':' + day(hash.time.created) + ':' + day(now);
    hash.url = 'https://www.npmjs.com/package/' + hash.name;
    // add github repository if any
    if (hash.repository) {
      repo = hash.repository;
      if (typeof repo !== 'string') {
        repo = repo.url;
      }
      if ((match = repo.match(/github\.com[:\/]([^\/]+)\/(.+)(?:\.git|$|\/)/))) {
        hash.github_repo_id = match[1] + '/' + match[2];
      }
    }
    return this._super.apply(this, arguments);
  }
});

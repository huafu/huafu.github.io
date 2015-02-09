import Ember from 'ember';
import DS from 'ember-data';

import computed from '../utils/computed';

var forEach = Ember.EnumerableUtils.forEach;

/**
 * @class DownloadStats
 * @extends Ember.Object
 */
var DownloadStat = Ember.Object.extend({
  /**
   * The data
   * @property data
   * @type {Array.<{day: string, downloads: number}>}
   */
  data: computed(function (key, value) {
    var days, monthsIndex, yearsIndex, months, years, total, weekStart, monthStart, last7Days, last30Days;
    days = [];
    months = [];
    years = [];
    monthsIndex = {};
    yearsIndex = {};
    total = 0;
    last7Days = 0;
    last30Days = 0;
    weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);
    monthStart = new Date();
    monthStart.setDate(monthStart.getDate() - 30);
    if (arguments.length > 1) {
      forEach(value, function (day) {
        var date, downloads, monthKey, yearKey, yearDate, monthDate;
        date = new Date(day.day);
        downloads = day.downloads;
        monthKey = (monthDate = new Date(date.getFullYear(), date.getMonth(), 1)).toISOString();
        yearKey = (yearDate = new Date(date.getFullYear(), 0, 1)).toISOString();
        days.push({date: date, downloads: downloads});
        if (!monthsIndex[monthKey]) {
          months.push(monthsIndex[monthKey] = {date: monthDate, downloads: 0});
        }
        monthsIndex[monthKey].downloads += downloads;
        if (!yearsIndex[yearKey]) {
          years.push(yearsIndex[yearKey] = {date: yearDate, downloads: 0});
        }
        yearsIndex[yearKey].downloads += downloads;
        total += downloads;
        if (date >= weekStart) {
          last7Days += downloads;
        }
        if (date >= monthStart) {
          last30Days += downloads;
        }
      });
      this.setProperties({
        days:           Ember.A(days),
        months:         Ember.A(months),
        years:          Ember.A(years),
        total:          total,
        lastSevenDays:  last7Days,
        lastThirtyDays: last30Days
      });
    }
  }),

  /**
   * Per year stats
   * @property years
   * @type {Ember.Array.<{date: Date, downloads: number}>}
   */
  years: null,

  /**
   * Per month stats
   * @property months
   * @type {Ember.Array.<{date: Date, downloads: number}>}
   */
  months: null,

  /**
   * Per day stats
   * @property days
   * @type {Ember.Array.<{date: Date, downloads: number}>}
   */
  days: null,

  /**
   * Total number of downloads
   * @property total
   * @type {number}
   */
  total: null,

  /**
   * Total number of downloads in the last 7 days
   * @property lastSevenDays
   * @type {number}
   */
  lastSevenDays: null,

  /**
   * Total number of downloads in the last 30 days
   * @property lastThirtyDays
   * @type {number}
   */
  lastThirtyDays: null

});


/**
 * @class NpmPackageDownloadsTransform
 * @extends DS.Transform
 */
export default DS.Transform.extend({
  /**
   * @inheritDoc
   */
  deserialize: function (serialized) {
    return DownloadStat.create({data: serialized});
  },

  /**
   * @inheritDoc
   */
  serialize: function (deserialized) {
    return deserialized ? deserialized.serialize() : deserialized;
  }
});

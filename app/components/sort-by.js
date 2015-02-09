import Ember from 'ember';
import computed from '../utils/computed';

var NO_ACTION_URL = ['javascript', '://'].join('');

/**
 * @class SortByComponent
 * @extends Ember.Component
 */
export default Ember.Component.extend({
  /**
   * @inheritDoc
   */
  classNames: ['sort-by'],

  /**
   * @inheritDoc
   */
  tagName: 'a',

  /**
   * @inheritDoc
   */
  attributeBindings: ['href'],

  /**
   * Our href, just used to disable
   * @property href
   * @type {string}
   */
  href: NO_ACTION_URL,

  /**
   * The property holding the sort by property name (key)
   * @property value
   * @type {Array.<string>}
   */
  value: null,

  /**
   * The name of the key that we handle
   * @property key
   * @type {string}
   */
  key: null,

  /**
   * By default, should we sort in desc?
   * @property desc
   * @type {boolean}
   */
  desc: false,

  /**
   * The key currently sorted
   * @property currentKey
   * @type {string}
   */
  currentKey: computed('value.@each', function () {
    return ((this.get('value') || [])[0] || '').split(':').shift();
  }).readOnly(),

  /**
   * The order currently sorted by
   * @property isAscending
   * @type {boolean}
   */
  isAscending: computed('value.@each', function () {
    return ((this.get('value') || [])[0] || '').split(':').slice(1).pop() !== 'desc';
  }).readOnly(),

  /**
   * Is our value related to us?
   * @property isSorted
   * @type {boolean}
   */
  isSorted: computed('currentKey', 'key', function () {
    return this.get('currentKey') === this.get('key');
  }).readOnly(),

  /**
   * @inheritDoc
   */
  click: function () {
    this.toggle();
  },

  /**
   * Toggle the sort order
   *
   * @method toggle
   */
  toggle: function () {
    var newValue = this.get('key');
    if (!this.get('isSorted')) {
      if (this.get('desc')) {
        newValue += ':desc';
      }
    }
    else {
      if (this.get('isAscending')) {
        newValue += ':desc';
      }
    }
    this.set('value', [newValue]);
    this.sendAction('sorted');
  }
});

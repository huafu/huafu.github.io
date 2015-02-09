import Ember from 'ember';
import computed from '../utils/computed';

/**
 * @class BsPanelComponent
 * @extends Ember.Component
 */
export default Ember.Component.extend({
  /**
   * @inheritDoc
   */
  classNames: ['panel'],

  /**
   * @inheritDoc
   */
  classNameBindings: ['typeClass'],

  /**
   * The type of panel
   * @property type
   * @type {string}
   */
  type: 'default',

  /**
   * Type class name
   * @property typeClass
   * @type {string}
   */
  typeClass: computed.fmt('panel-%@', 'type'),

  /**
   * The title of the panel if any
   * @property title
   * @type {string}
   */
  title: null
});

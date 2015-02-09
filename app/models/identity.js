import DS from 'ember-data';
import ModelWithCuDatesMixin from '../mixins/model-with-cu-dates';

/**
 * @class Identity
 * @extends DS.Model
 * @uses ModelWithCuDatesMixin
 */
export default DS.Model.extend(ModelWithCuDatesMixin, {
  /**
   * The owner of the identity
   * @property person
   * @type {Person}
   */
  person: DS.belongsTo('person'),

  /**
   * The type of identity
   * @property type
   * @type {string}
   */
  type: DS.attr('string'),

  /**
   * The value of the identity
   * @property value
   * @type {string}
   */
  value: DS.attr('string'),

  /**
   * The kind of identity (work, personal, ...)
   * @property kind
   * @type {boolean}
   */
  kind: DS.attr('string')
});

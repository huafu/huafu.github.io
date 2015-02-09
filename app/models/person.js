import DS from 'ember-data';
import computed from '../utils/computed';
import ModelWithCuDatesMixin from '../mixins/model-with-cu-dates';


/**
 * @class Person
 * @extends Ember.Model
 * @uses ModelWithCuDatesMixin
 */
export default DS.Model.extend(ModelWithCuDatesMixin, {
  /**
   * The displayed name of this person
   * @property displayName
   * @type {string}
   */
  displayName: DS.attr('string'),

  /**
   * Identities
   * @property identities
   * @type {DS.RecordArray.<Identity>}
   */
  identities: DS.hasMany('identity'),

  /**
   * Birth date
   * @property wasBornAt
   * @type {Date}
   */
  wasBornAt: DS.attr('date'),

  /**
   * Photo
   * @property photo
   * @type {Identity}
   */
  photo: computed.findBy('identities', 'type', 'photo'),

  /**
   * Photo URL
   * @property photoUrl
   * @type {string}
   */
  photoUrl: computed.alias('photo.value'),

  /**
   * Avatar
   * @property avatar
   * @type {Identity}
   */
  avatar: computed.findBy('identities', 'type', 'avatar'),

  /**
   * Avatar URL
   * @property avatarUrl
   * @type {string}
   */
  avatarUrl: computed.alias('avatar.value'),

  /**
   * Email
   * @property email
   * @type {Identity}
   */
  email: computed.findBy('identities', 'type', 'email'),

  /**
   * Email address
   * @property emailAddress
   * @type {string}
   */
  emailAddress: computed.alias('email.value'),

  /**
   * Address
   * @property address
   * @type {Identity}
   */
  address: computed.findBy('identities', 'type', 'address'),

  /**
   * Address text
   * @property addressText
   * @type {string}
   */
  addressText: computed.alias('address.value')
});

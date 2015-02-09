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
   * Email address URL (with `malto:`)
   * @property emailUrl
   * @type {string}
   */
  emailUrl: computed.fmt('mailto:%@', 'emailAddress'),

  /**
   * Phone
   * @property phone
   * @type {Identity}
   */
  phone: computed.findBy('identities', 'type', 'phone'),

  /**
   * Phone number
   * @property phoneNumber
   * @type {string}
   */
  phoneNumber: computed.alias('phone.value'),

  /**
   * Phone number URL (with `tel:`)
   * @property phoneUrl
   * @type {string}
   */
  phoneUrl: computed.fmt('tel:%@', 'phoneNumber'),

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
  addressText: computed.alias('address.value'),

  /**
   * Twitter
   * @property twitter
   * @type {Identity}
   */
  twitter: computed.findBy('identities', 'type', 'twitter'),

  /**
   * Twitter URL
   * @property twitterUrl
   * @type {string}
   */
  twitterUrl: computed.fmt('https://twitter.com/%@', 'twitter.value'),

  /**
   * GitHub
   * @property github
   * @type {Identity}
   */
  github: computed.findBy('identities', 'type', 'github'),

  /**
   * GitHub URL
   * @property githubUrl
   * @type {string}
   */
  githubUrl: computed.fmt('https://github.com/%@', 'github.value'),

  /**
   * Facebook
   * @property facebook
   * @type {Identity}
   */
  facebook: computed.findBy('identities', 'type', 'facebook'),

  /**
   * Facebook URL
   * @property facebookUrl
   * @type {string}
   */
  facebookUrl: computed.fmt('https://www.facebook.com/%@', 'facebook.value'),

  /**
   * LinkedIn
   * @property linkedin
   * @type {Identity}
   */
  linkedin: computed.findBy('identities', 'type', 'linkedin'),

  /**
   * LinkedIn URL
   * @property linkedinUrl
   * @type {string}
   */
  linkedinUrl: computed.fmt('https://www.linkedin.com/in/%@', 'linkedin.value')
});

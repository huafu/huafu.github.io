import DS from 'ember-data';
import ModelWithCuDatesMixin from '../mixins/model-with-cu-dates';

/**
 * @class EmberAddon
 * @extends DS.Model
 * @uses ModelWithCuDatesMixin
 */
export default DS.Model.extend(ModelWithCuDatesMixin, {

});

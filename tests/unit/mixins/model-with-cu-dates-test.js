import Ember from 'ember';
import ModelWithCuDatesMixin from 'huafu-homepage/mixins/model-with-cu-dates';

module('ModelWithCuDatesMixin');

// Replace this with your real tests.
test('it works', function() {
  var ModelWithCuDatesObject = Ember.Object.extend(ModelWithCuDatesMixin);
  var subject = ModelWithCuDatesObject.create();
  ok(subject);
});

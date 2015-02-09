import Ember from 'ember';

/**
 * @class EmberAddonsMinesView
 * @extends Ember.View
 */
export default Ember.View.extend({
  /**
   * Schedule the scroll to the actually highlighted package
   *
   * @method scheduleScrollToHighlighted
   */
  scheduleScrollToHighlighted: Ember.observer(
    'controller.sortedRepos.length', 'controller.highlightedName', function () {
      Ember.run.debounce(this, 'scrollToHighlighted', 1000);
    }
  ).on('didInsertElement'),

  /**
   * Scroll to the highlighted package
   *
   * @method scrollToHighlighted
   */
  scrollToHighlighted: function () {
    var highlighted, $pkg;
    if (this.isDestroying || this.isDestroyed || this._state !== 'inDOM') {
      return;
    }
    highlighted = this.get('controller.highlightedName');
    if (highlighted) {
      $pkg = this.$('[data-package-name="' + highlighted + '"]');
      if ($pkg.length) {
        Ember.$('html,body').animate({
          scrollTop: $pkg.offset().top - Ember.$('#navbar').height()
        }, 500);
      }
      else {
        this.scheduleScrollToHighlighted();
      }
    }
  }
});

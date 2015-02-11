import config from './config/environment';
import route from 'ember-enhanced-router/route';
import GooglePageviewMixin from './mixins/google-pageview';

export default route(null, '@huafu_g\'s').routes(
  route('home@/', false),

  route('ember', 'EmberJS').routes(
    route('addons@/', false).routes(
      route('mines@/', 'My Addons'),
      route('show@:npm_package_id', '{{name}}')
    )
  ),

  route('contact'),

  route('catchall@*', 'Nothing Here!')
).toRouter(
  GooglePageviewMixin, {
    location: config.locationType
  }
);



// =======================================================================================
// ==================== provided so that `ember g route` doesn't fail ====================
// =======================================================================================
var Router = {
  map: function () {
  }
};
Router.map(function () {
});

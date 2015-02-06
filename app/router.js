import Ember from 'ember';
import config from './config/environment';
import route from 'ember-enhanced-router/route';

export default route(null, 'Ember Enhanced Router').routes(

  route('home@/', false),

  route('ember', 'EmberJS').routes(
    route('addons', false).routes(
      route('mine', 'My Addons').routes(
        route('google-map'),
        route('enhanced-router'),
        route('marked'),
        route('img-manager'),
        route('dev-fixtures')
      )
    )
  ),

  route('about', 'About myself'),

  route('catchall@*', 'Nothing Here!')

).toRouter({location: config.locationType});

export function initialize(container, application) {
  application.deferReadiness();
  container.lookup('store:main').find('person', 1).then(function (me) {
    container.register('me:main', me, {instantiate: false});
    application.inject('controller', 'me', 'me:main');
    application.advanceReadiness();
  });
}

export default {
  name:       'me',
  initialize: initialize,
  after:      'dev-fixtures'
};

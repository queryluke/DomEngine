export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('domengine', {
      url: '/',
      template: '<domengine></domengine>'
    })
    .state('inventory', {
      url: '/inventory',
      template: '<inventory></inventory>'
    });
}

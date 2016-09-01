export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('welcome', {
      url: '/',
      template: '<welcome></welcome>'
    })
    .state('inventory', {
      url: '/inventory',
      template: '<inventory></inventory>'
    })
    .state('advancedOptions', {
      url: '/advanced-options',
      template: '<advanced-options config="$ctrl.$storage.config"></advanced-options>'
    })
    .state('playset', {
      url: '/playset',
      template: '<playset playset="$ctrl.$storage.playset"></playset>'
    });

}

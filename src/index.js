import angular from 'angular';

// Containers
import {DomEngine} from './app/containers/DomEngine';
import {Inventory} from './app/containers/Inventory';

// Services
import {DomEngineService} from './app/DomEngineService';

// Components
import {Card} from './app/components/Card';
import {CardList} from './app/components/CardList';
import {Nav} from './app/components/Nav';
import {SearchForm} from './app/components/SearchForm';
import {Welcome} from './app/components/Welcome';
import {BuildForm} from './app/components/BuildForm';
import {AdvancedOptions} from './app/components/AdvancedOptions';
import {Playset} from './app/components/Playset';

// Directives
import CheckLoaded from './app/directives/CheckLoaded';

// Routing
import 'angular-ui-router';
import 'angular-animate';
import 'ngstorage'
import routesConfig from './routes';

// Styles
import './scss/index.scss';

angular
  .module('app', ['ui.router', 'ngAnimate', 'ngStorage'])
  .config(routesConfig)
  .service('DomEngineService', DomEngineService)
  .component('domengine', DomEngine)
  .component('inventory', Inventory)
  .component('domengineNav', Nav)
  .component('cardList', CardList)
  .component('dominionCard', Card)
  .component('searchForm', SearchForm)
  .component('buildForm', BuildForm)
  .component('advancedOptions', AdvancedOptions)
  .component('welcome', Welcome)
  .component('playset', Playset)
  .directive('checkLoaded', CheckLoaded)
  .run( [ '$rootScope', function ($rootScope) {
    $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
      $rootScope.$state = to.name;
      $rootScope.$previousState = from.name;
    });
  }]);

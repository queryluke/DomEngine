import angular from 'angular';

// Containers
import {DomEngine} from './app/containers/DomEngine';

// Services
import {DomEngineService} from './app/DomEngineService';

// Components
import {Card} from './app/components/Card';
import {CardList} from './app/components/CardList';
import {Inventory} from './app/components/Inventory';
import {Nav} from './app/components/Nav';
import {SearchForm} from './app/components/SearchForm';
import {Welcome} from './app/components/Welcome';
import {AdvancedOptions} from './app/components/AdvancedOptions';
import {Playset} from './app/components/Playset';
import {ExpansionList} from './app/components/ExpansionList';
import {About} from './app/components/About';

// Directives
import CheckLoaded from './app/directives/CheckLoaded';

// Other
import 'angular-ui-router';
import 'angular-animate';
import 'ngstorage';
import 'angularjs-slider';
import routesConfig from './routes';

// Styles
import './scss/index.scss';

angular
  .module('app', ['ui.router', 'ngAnimate', 'ngStorage', 'rzModule'])
  .config(routesConfig)
  .service('DomEngineService', DomEngineService)
  .component('domengine', DomEngine)
  .component('inventory', Inventory)
  .component('domengineNav', Nav)
  .component('cardList', CardList)
  .component('dominionCard', Card)
  .component('searchForm', SearchForm)
  .component('advancedOptions', AdvancedOptions)
  .component('welcome', Welcome)
  .component('playset', Playset)
  .component('expansionList', ExpansionList)
  .component('about', About)
  .directive('checkLoaded', CheckLoaded)
  .run($rootScope => {
    $rootScope.$on('$stateChangeSuccess', (event, to, toParams, from) => {
      $rootScope.$state = to.name;
      $rootScope.$previousState = from.name;
    });
  });

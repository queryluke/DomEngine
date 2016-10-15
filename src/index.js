import angular from 'angular';

// Containers
import {DomEngine} from './app/containers/DomEngine';

// Services
import {DomEngineService} from './app/DomEngineService';

// Components
import {About} from './app/components/About';
import {AdvancedOptions} from './app/components/AdvancedOptions';
import {Card} from './app/components/Card';
import {CardList} from './app/components/CardList';
import {ExpansionList} from './app/components/ExpansionList';
import {Inventory} from './app/components/Inventory';
import {Nav} from './app/components/Nav';
import {Playmat} from './app/components/Playmat';
import {SearchForm} from './app/components/SearchForm';
import {Welcome} from './app/components/Welcome';

// Directives
import CheckLoaded from './app/directives/CheckLoaded';

// Other
import 'angular-ui-router';
import 'angular-animate';
import 'ngstorage';
import 'angularjs-slider';
import routesConfig from './routes';
import runConfig from './run';

// Styles
import './scss/index.scss';

angular
  .module('app', ['ui.router', 'ngAnimate', 'ngStorage', 'rzModule'])
  .config(routesConfig)
  .service('DomEngineService', DomEngineService)
  .component('about', About)
  .component('advancedOptions', AdvancedOptions)
  .component('cardList', CardList)
  .component('domengine', DomEngine)
  .component('domengineNav', Nav)
  .component('dominionCard', Card)
  .component('expansionList', ExpansionList)
  .component('inventory', Inventory)
  .component('playmat', Playmat)
  .component('searchForm', SearchForm)
  .component('welcome', Welcome)
  .directive('checkLoaded', CheckLoaded)
  .run(runConfig);

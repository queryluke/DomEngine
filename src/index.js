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

// Directives
import CheckLoaded from './app/directives/CheckLoaded';

// Routing
import 'angular-ui-router';
import routesConfig from './routes';

// Styles
import './scss/index.scss';

angular
  .module('app', ['ui.router'])
  .config(routesConfig)
  .service('DomEngineService', DomEngineService)
  .component('domengine', DomEngine)
  .component('inventory', Inventory)
  .component('domengineNav', Nav)
  .component('cardList', CardList)
  .component('dominionCard', Card)
  .component('searchForm', SearchForm)
  .directive('checkLoaded', CheckLoaded);

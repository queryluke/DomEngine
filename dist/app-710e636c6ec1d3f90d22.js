webpackJsonp([1],[,function(t,n,e){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}var s=e(0),r=a(s);r["default"].module("app").run(["$templateCache",function(t){t.put("app/components/AdvancedOptions.html",'<div class="pt-page-content" id="advanced-option-page">\n    <div class="container m-t-1">\n        <div class="row">\n            <div class="col-xs-12 text-xs-center">\n                <h1>Advanced Options</h1>\n                <button class="btn btn-outline-warning" ng-click="$ctrl.resetOptions()">Reset Options</button>\n            </div>\n            <div class="col-xs-12 text-xs-center">\n            </div>\n        </div>\n        <div class="row">\n\n            <!-- Attacks -->\n            <div class="form-group col-xs-12 col-sm-4 col-md-3">\n                <label for="maxAttacks">Max Attacks\n                    <span class="text-info">\n                        <i class="fa fa-question-circle-o" aria-hidden="true" ng-click="$ctrl.onShowHelpText(\'maxAttacks\')"></i>\n                    </span>\n                </label>\n                <input class="form-control" type="number" id="maxAttacks" ng-model="$ctrl.config.attackLimit">\n            </div>\n\n            <!-- Attack / Reaction Ratio -->\n            <div class="form-group col-xs-12 col-sm-4 col-md-3">\n                <label for="reactRatio">\n                    Attack / Reaction Ratio\n                    <span class="text-info">\n                        <i class="fa fa-question-circle-o" aria-hidden="true" ng-click="$ctrl.onShowHelpText(\'reactRatio\')"></i>\n                    </span>\n                </label>\n                <input class="form-control" type="text" id="reactRatio" ng-model="$ctrl.config.reactRatio">\n            </div>\n\n            <!-- Lower Bound -->\n            <div class="form-group col-xs-12 col-sm-4 col-md-3">\n                <label for="lowerBound">\n                    Lower Bound\n                    <span class="text-info">\n                        <i class="fa fa-question-circle-o" aria-hidden="true" ng-click="$ctrl.onShowHelpText(\'lowerBound\')"></i>\n                    </span>\n                </label>\n                <input class="form-control" type="text" id="lowerBound" ng-model="$ctrl.config.lowerBound">\n            </div>\n\n            <!-- Upper Bound -->\n            <div class="form-group col-xs-12 col-sm-4 col-md-3">\n                <label for="upperBound">\n                    Upper Bound\n                    <span class="text-info">\n                        <i class="fa fa-question-circle-o" aria-hidden="true" ng-click="$ctrl.onShowHelpText(\'upperBound\')"></i>\n                    </span>\n                </label>\n                <input class="form-control" type="text" id="upperBound" ng-model="$ctrl.config.upperBound">\n            </div>\n        </div>\n    </div>\n</div>\n<div id="helpText" ng-class="{show: $ctrl.showHelpText}">\n    <button class="btn btn-outline-secondary close-button" ng-click="$ctrl.onHideHelpText()">\n        <i class="fa fa-times" aria-hidden="true"></i>\n        <span class="sr-only">Close</span>\n    </button>\n    <div class="container text-xs-center" style="margin-top: 20px">\n        <div class="row">\n            <div class="col-xs-12">\n                <h3>{{ $ctrl.selectedHelp.title }}</h3>\n                <p>{{ $ctrl.selectedHelp.text }}</p>\n            </div>\n        </div>\n    </div>\n</div>\n'),t.put("app/components/Card.html",'<div class="dom-card">\n    <img class="card-image" ng-src="{{ $ctrl.card.image }}" alt="{{ $ctrl.card.name }}" ng-if="$ctrl.$storage.useImages">\n    <div class="card-desc" ng-show="!$ctrl.$storage.useImages">\n        <h4 class="card-title">{{ $ctrl.card.name }}</h4>\n        <p class="card-text" ng-repeat="text in $ctrl.card.text track by $index">{{ text }}</p>\n    </div>\n</div>\n'),t.put("app/components/CardList.html",'<div class="flex-container">\n    <dominion-card ng-repeat="card in $ctrl.cards | filter:{show: true} track by $index" card="card"></dominion-card>\n</div>\n'),t.put("app/components/Inventory.html",'<div class="pt-page-content">\n    <div class="container">\n        <div class="row">\n            <div class="col-xs-12">\n                <h1>DomEngine Database</h1>\n                <p>Search the through the database of Dominion Cards</p>\n            </div>\n        </div>\n        <div class="row">\n            <div class="col-xs-12">\n                <h2 ng-if="$ctrl.results.length">{{ $ctrl.results.length }} card<span ng-if="$ctrl.results.length > 1">s</span> found</h2>\n                <h2 ng-if="!$ctrl.results.length">No results found!</h2>\n            </div>\n        </div>\n        <div class="row">\n            <div class="col-xs-12">\n                <search-form search-params="$ctrl.searchParams" on-search="$ctrl.search($event)"></search-form>\n            </div>\n        </div>\n        <div class="row" style="margin-top: 20px">\n            <div class="col-xs-12">\n                <card-list cards="$ctrl.results"></card-list>\n            </div>\n        </div>\n    </div>\n</div>\n'),t.put("app/components/Nav.html",'<nav class="stretchy-nav" ng-class="{\'nav-open\': $ctrl.showMenu}">\n    <a class="nav-trigger" ng-click="$ctrl.showMenu = !$ctrl.showMenu">\n        <span class="sr-only">Menu</span>\n        <span aria-hidden="true"></span>\n    </a>\n\n    <ul class="list-unstyled">\n        <li><a href="playset">\n            <span class="text-xs-center icon-wrapper">\n                <i class="fa fa-gamepad fa-lg" aria-hidden="true"></i>\n            </span>\n            <span class="menu-text">Playset</span></a>\n        </li>\n        <li><a ng-href="advanced-options">\n            <span class="text-xs-center icon-wrapper">\n                <i class="fa fa-cogs fa-lg" aria-hidden="true"></i>\n            </span>\n            <span class="menu-text">Options</span></a>\n        </li>\n        <li><a ng-href="inventory">\n            <span class="text-xs-center icon-wrapper">\n                <i class="fa fa-cubes fa-lg" aria-hidden="true"></i>\n            </span>\n            <span class="menu-text">Inventory</span></a>\n        </li>\n        <li><a href="#">\n            <span class="text-xs-center icon-wrapper">\n                <i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>\n            </span>\n            <span class="menu-text">About</span></a>\n        </li>\n        <li><a href="#">\n            <span class="text-xs-center icon-wrapper">\n                <i class="fa fa-github fa-lg" aria-hidden="true"></i>\n            </span>\n            <span class="menu-text">Github</span></a>\n        </li>\n        <li><a href="#" ng-click="$ctrl.$storage.useImages = !$ctrl.$storage.useImages">\n            <span class="text-xs-center icon-wrapper">\n                <i class="fa fa-picture-o fa-lg" aria-hidden="true"></i>\n            </span>\n            <span class="menu-text">Use Card Images</span></a>\n        </li>\n    </ul>\n\n    <span aria-hidden="true" class="stretchy-nav-bg"></span>\n</nav>'),t.put("app/components/Playset.html",'<div class="pt-page-content">\n    <div class="container">\n        <div class="row">\n        </div>\n        <div class="row">\n            <div class="col-xs-12 hidden-sm-up text-xs-center">\n                <h1>Playset</h1>\n            </div>\n            <div class="col-xs-12 col-sm-4">\n                <button class="btn btn-outline-primary" ng-click="$ctrl.onBuild()"><i class="fa fa-refresh"></i> Re-build</button>\n            </div>\n            <div class="col-xs-12 hidden-xs-down col-sm-4 text-xs-center">\n                <h1>Playset</h1>\n            </div>\n            <div class="col-xs-12 col-sm-4 text-sm-right">\n                <a ng-href="advanced-options" class="btn btn-outline-secondary"><i class="fa fa-cogs"></i> Build Options</a>\n            </div>\n        </div>\n        <div class="row">\n            <div class="col-xs-12 m-t-1">\n                <div class="alert alert-danger" ng-if="$ctrl.errors.length">\n                    <h3>Oops, something went wrong</h3>\n                    <ul>\n                        <li ng-repeat="error in $ctrl.errors track by $index">{{ error }}</li>\n                    </ul>\n                </div>\n                <div class="well text-xs-center">\n                    <h2>Kingdom Cards</h2>\n                    <card-list cards="$ctrl.playset.cards"></card-list>\n                    <h2>Supply Cards</h2>\n                    <card-list cards="$ctrl.treasure"></card-list>\n                    <card-list cards="$ctrl.victory"></card-list>\n                    <card-list cards="$ctrl.ruins"></card-list>\n                    <h2 ng-if="$ctrl.playset.requiredCards.other.length">Additional Required Cards</h2>\n                    <card-list cards="$ctrl.playset.requiredCards.other"></card-list>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n'),t.put("app/components/SearchForm.html",'<form class="form" ng-submit="$ctrl.onSubmit()">\n    <div class="form-group">\n        <input type="text" class="form-control" id="cardName" ng-model="$ctrl.searchParams.name">\n    </div>\n    <div class="form-group">\n        <legend>Types</legend>\n        <label ng-repeat="(type,value) in $ctrl.searchParams.types" for="{{ type }}" class="form-check-inline">\n            <input type="checkbox" id="{{ type }}" ng-model="$ctrl.searchParams.types[type]" class="form-check-input">\n            {{ type }}\n        </label>\n    </div>\n    <div class="form-group">\n        <legend>Expansions</legend>\n        <label for="{{ set.name }}" class="custom-control custom-checkbox form-check-inline" ng-repeat="(k, set) in $ctrl.searchParams.expansions track by $index">\n            <input type="checkbox" class="custom-control-input" id="{{ set.name }}" ng-model="set.use">\n            <span class="custom-control-indicator"></span>\n            <span class="custom-control-description">{{ set.name }}</span>\n        </label>\n    </div>\n    <div class="form-group">\n        <legend>Cost</legend>\n        <div class="row">\n            <div class="col-xs-12">\n                <input type="number" class="form-control" id="costL" ng-model="$ctrl.searchParams.costL">\n            </div>\n            <div class="col-xs-12">\n                <input type="number" class="form-control" id="costG" ng-model="$ctrl.searchParams.costG">\n            </div>\n        </div>\n    </div>\n    <button type="submit" class="btn btn-primary">Search</button>\n</form>\n'),t.put("app/components/Welcome.html",'<div class="pt-page-content">\n    <div class="welcome-tron">\n        <h1>DomEngine</h1>\n        <p class="text">An attempt to make randomizing Dominion playsets easy</p>\n\n        <div class="build-form">\n            <h2>Choose Your Expansions</h2>\n            <div class="row set-selection-row">\n                <label for="{{ set.name }}" class="custom-control custom-checkbox form-check-inline" ng-repeat="(k, set) in $ctrl.expansions track by $index">\n                    <input type="checkbox" class="custom-control-input" id="{{ set.name }}" ng-model="set.use">\n                    <span class="custom-control-indicator"></span>\n                    <span class="custom-control-description">{{ set.name }}</span>\n                </label>\n            </div>\n            <div class="row">\n                <button class="btn btn-primary" id="build" ng-click="$ctrl.handleBuild()">Build a Playset</button>\n                <p style="margin-top:10px"><a ng-href="advanced-options"><small>Advanced Options</small></a></p>\n            </div>\n        </div>\n    </div>\n    <div class="welcome-footer text-xs-center">\n        <p class="text">\n            <small style="line-height: .5rem">\n                All images served from the\n                <a href="http://wiki.dominionstrategy.com/index.php/Main_Page" target="blank">Dominion Strategy Wiki</a>,\n                and are available under\n                <a href="http://creativecommons.org/licenses/by-nc-sa/3.0/" target="_blank">\n                    Creative Commons Attribution Non-Commercial Share Alike\n                </a>\n            </small>\n        </p>\n    </div>\n</div>\n'),t.put("app/containers/DomEngine.html",'<domengine-nav on-build="$ctrl.onBuild()"></domengine-nav>\n<div id="pt-main" class="pt-perspective">\n    <ui-view id="{{$root.$state}}" class="{{$root.$previousState}} pt-page"></ui-view>\n</div>\n\n')}])},function(t,n,e){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}var s=e(0),r=a(s),i=e(17),o=e(8),l=e(10),c=e(11),u=e(12),d=e(13),p=e(15),h=e(16),f=e(9),y=e(14),v=e(18),m=a(v);e(5),e(4),e(20);var g=e(19),b=a(g);e(7),r["default"].module("app",["ui.router","ngAnimate","ngStorage"]).config(b["default"]).service("DomEngineService",o.DomEngineService).component("domengine",i.DomEngine).component("inventory",u.Inventory).component("domengineNav",d.Nav).component("cardList",c.CardList).component("dominionCard",l.Card).component("searchForm",p.SearchForm).component("advancedOptions",f.AdvancedOptions).component("welcome",h.Welcome).component("playset",y.Playset).directive("checkLoaded",m["default"]).run(function(t){t.$on("$stateChangeSuccess",function(n,e,a,s){t.$state=e.name,t.$previousState=s.name})})},,,,,function(t,n){},function(t,n){"use strict";function e(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function t(t,n){for(var e=0;e<n.length;e++){var a=n[e];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(n,e,a){return e&&t(n.prototype,e),a&&t(n,a),n}}();n.DomEngineService=function(){function t(n){e(this,t),this.$http=n}return t.$inject=["$http"],a(t,[{key:"getCards",value:function(){function t(t){return t.data}function n(t){console.log("XHR Failed for getCards."),console.log(t.data)}return this.$http.get("data/cards.json").then(t)["catch"](n)}},{key:"getSets",value:function(){function t(t){return t.data}function n(t){console.log("XHR Failed for getSets."),console.log(t.data)}return this.$http.get("data/sets.json").then(t)["catch"](n)}},{key:"getSupplyCards",value:function(){function t(t){return t.data}function n(t){console.log("XHR Failed for getSets."),console.log(t.data)}return this.$http.get("data/supplyCards.json").then(t)["catch"](n)}},{key:"bootstrapDomEngine",value:function(){function t(t){return t}function n(t){console.log("XHR Failed for bootstrapDomEngine."),console.log(t)}return Promise.all([this.getSets(),this.getCards(),this.getSupplyCards()]).then(t)["catch"](n)}}]),t}()},function(t,n){"use strict";function e(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function t(t,n){for(var e=0;e<n.length;e++){var a=n[e];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(n,e,a){return e&&t(n.prototype,e),a&&t(n,a),n}}(),s=function(){function t(){e(this,t)}return a(t,[{key:"$onInit",value:function(){this.showHelpText=!1,this.selectedHelp={},this.helpBlocks={maxAttacks:{title:"Max Attack Cards",text:"Set the max number of Action-Attack cards."},reactRatio:{title:"Action-Reaction Ratio",text:"The number of attack cards that, if drawn, will require a Reaction card to negate attack cards. e.g.,\n        If set to 2, if 2 Action-Attack cards are drawn, 1 Reaction card will be included in the playset."},lowerBound:{title:"Lower Bound",text:"DomEngine builds a playset by running the build phase twice. During the first build phase, the total cost\n        of cards cannot exceed the lower bound. Based on the recommended playsets of the Dominion Strategy Wiki, 42 is the\n        average upper bound. So a lower bound of 1/2 that is the default."},upperBound:{title:"Upper Bound",text:"DomEngine builds a playset by running the build phase twice. During the second build phase, the total cost\n        of cards cannot exceed the upper bound. Based on the recommended playsets of the Dominion Strategy Wiki, 42 is the\n        average upper bound."}}}},{key:"onShowHelpText",value:function(t){this.showHelpText=!0,this.selectedHelp=this.helpBlocks[t]}},{key:"onHideHelpText",value:function(){this.showHelpText=!1}},{key:"handleResetOptions",value:function(){this.resetOptions()}}]),t}();n.AdvancedOptions={templateUrl:"app/components/AdvancedOptions.html",controller:s,bindings:{config:"<",resetOptions:"&"}}},function(t,n){"use strict";function e(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var a=["$localStorage",function s(t){e(this,s),this.$storage=t}];n.Card={templateUrl:"app/components/Card.html",controller:a,bindings:{card:"<"}}},function(t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.CardList={templateUrl:"app/components/CardList.html",bindings:{cards:"<"}}},function(t,n){"use strict";function e(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function t(t,n){for(var e=0;e<n.length;e++){var a=n[e];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(n,e,a){return e&&t(n.prototype,e),a&&t(n,a),n}}(),s=function(){function t(){e(this,t),this.searchParams={name:"",types:this.cardTypes,costL:0,costG:100,expansions:this.expansions},this.results=[]}return a(t,[{key:"$onInit",value:function(){this.search(this.searchParams)}},{key:"$onChanges",value:function(t){t.cardTypes&&(this.searchParams.types=Object.assign({},this.cardTypes)),t.expansions&&(this.searchParams.expansions=Object.assign([],this.expansions)),t.inventory&&(this.inventory=Object.assign([],this.inventory))}},{key:"search",value:function(t){var n=t.searchParams;if(n){this.searchParams=n,console.log(n);var e=this.inventory;n.name&&!function(){var t=new RegExp(n.name,"gi");e=e.filter(function(n){return t.test(n.name.concat(n.text.join()))===!0})}();var a=[];for(var s in n.types)n.types[s]&&a.push(s);a.length>0&&(e=e.filter(function(t){var n=0,e=!0,s=!1,r=void 0;try{for(var i,o=a[Symbol.iterator]();!(e=(i=o.next()).done);e=!0){var l=i.value;n=t.types.includes(l)?n+1:n}}catch(c){s=!0,r=c}finally{try{!e&&o["return"]&&o["return"]()}finally{if(s)throw r}}return n>0}));var r=[],i=!0,o=!1,l=void 0;try{for(var c,u=n.expansions[Symbol.iterator]();!(i=(c=u.next()).done);i=!0){var d=c.value;d.use&&r.push(d.name)}}catch(p){o=!0,l=p}finally{try{!i&&u["return"]&&u["return"]()}finally{if(o)throw l}}r.length>0&&(e=e.filter(function(t){var n=0,e=!0,a=!1,s=void 0;try{for(var i,o=r[Symbol.iterator]();!(e=(i=o.next()).done);e=!0){var l=i.value;n=t.set===l?n+1:n}}catch(c){a=!0,s=c}finally{try{!e&&o["return"]&&o["return"]()}finally{if(a)throw s}}return n>0})),e=e.filter(function(t){return parseInt(t.cost.coin,10)>=n.costL}),e=e.filter(function(t){return parseInt(t.cost.coin,10)<=n.costG}),this.results=e}}}]),t}();n.Inventory={templateUrl:"app/components/Inventory.html",controller:s,bindings:{expansions:"<",inventory:"<",cardTypes:"<"}}},function(t,n){"use strict";function e(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function t(t,n){for(var e=0;e<n.length;e++){var a=n[e];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(n,e,a){return e&&t(n.prototype,e),a&&t(n,a),n}}(),s=function(){function t(n){e(this,t),this.$storage=n}return t.$inject=["$localStorage"],a(t,[{key:"$onInit",value:function(){this.$storage.useImages=!1,console.log(this.$storage.useImages),this.showNav=!1}},{key:"handleBuild",value:function(){console.log("build"),this.onBuild()}}]),t}();n.Nav={templateUrl:"app/components/Nav.html",controller:s,bindings:{onBuild:"&"}}},function(t,n){"use strict";function e(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function t(t,n){for(var e=0;e<n.length;e++){var a=n[e];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(n,e,a){return e&&t(n.prototype,e),a&&t(n,a),n}}(),s=function(){function t(){e(this,t)}return a(t,[{key:"$onInit",value:function(){this.setSupplyCards()}},{key:"$onChanges",value:function(t){t.playset&&this.setSupplyCards()}},{key:"setSupplyCards",value:function(){this.treasure=this.filterByType(this.playset.requiredCards.supply,"Treasure"),this.victory=this.filterByType(this.playset.requiredCards.supply,"Victory"),this.ruins=this.filterByType(this.playset.requiredCards.supply,"Ruins")}},{key:"filterByType",value:function(t,n){return t.filter(function(t){return t.types.includes(n)})}}]),t}();n.Playset={templateUrl:"app/components/Playset.html",controller:s,bindings:{playset:"<",onBuild:"&",errors:"<"}}},function(t,n){"use strict";function e(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function t(t,n){for(var e=0;e<n.length;e++){var a=n[e];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(n,e,a){return e&&t(n.prototype,e),a&&t(n,a),n}}(),s=function(){function t(){e(this,t)}return a(t,[{key:"$onInit",value:function(){this.onSubmit()}},{key:"onSubmit",value:function(){this.onSearch({$event:{searchParams:this.searchParams}})}}]),t}();n.SearchForm={bindings:{searchParams:"<",searchTypes:"<",onSearch:"&"},templateUrl:"app/components/SearchForm.html",controller:s}},function(t,n){"use strict";function e(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function t(t,n){for(var e=0;e<n.length;e++){var a=n[e];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(n,e,a){return e&&t(n.prototype,e),a&&t(n,a),n}}(),s=function(){function t(){e(this,t)}return a(t,[{key:"handleBuild",value:function(){console.log("build"),this.onBuild()}}]),t}();n.Welcome={templateUrl:"app/components/Welcome.html",controller:s,bindings:{onBuild:"&",expansions:"<"}}},function(t,n){"use strict";function e(t){if(Array.isArray(t)){for(var n=0,e=Array(t.length);n<t.length;n++)e[n]=t[n];return e}return Array.from(t)}function a(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var s=function(){function t(t,n){for(var e=0;e<n.length;e++){var a=n[e];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(n,e,a){return e&&t(n.prototype,e),a&&t(n,a),n}}(),r=function(){function t(n,e,s){a(this,t),this._ds=s,this.$storage=n,this.$state=e}return t.$inject=["$localStorage","$state","DomEngineService"],s(t,[{key:"$onInit",value:function(){var t=this;this.errors=[],this.baseConfig={lowerBound:21,upperBound:42,adds:{action:{min:3,max:6},coin:{min:1,max:6},buy:{min:1,max:3},draw:{min:2,max:4}},limits:{attack:2,treasure:1,victory:1,duration:1,reaction:1,curse:1},requireAttackCounter:!0,expansions:{}},this.supplyCards=[],this.expansions=[],this.cardTypes={},this.inventory=[],this._ds.bootstrapDomEngine().then(function(n){t.baseConfig.expansions=n[0],t.expansions=n[0],t.cards=n[1],t.supplyCards=n[2],t.inventory=n[1].concat(n[2]),t.cardTypes=t.getTypes(t.inventory)}),0===this.$storage.config.length&&(this.$storage.config=this.baseConfig)}},{key:"getTypes",value:function(t){var n={},e=!0,a=!1,s=void 0;try{for(var r,i=t[Symbol.iterator]();!(e=(r=i.next()).done);e=!0){var o=r.value,l=!0,c=!1,u=void 0;try{for(var d,p=o.types[Symbol.iterator]();!(l=(d=p.next()).done);l=!0){var h=d.value;h in n||(n[h]=!1)}}catch(f){c=!0,u=f}finally{try{!l&&p["return"]&&p["return"]()}finally{if(c)throw u}}}}catch(f){a=!0,s=f}finally{try{!e&&i["return"]&&i["return"]()}finally{if(a)throw s}}return n}},{key:"onBuild",value:function(){var t=[];this.errors=[];var n=!0,e=!1,a=void 0;try{for(var s,r=this.$storage.config.expansions[Symbol.iterator]();!(n=(s=r.next()).done);n=!0){var i=s.value;i.use&&t.push(i.name)}}catch(o){e=!0,a=o}finally{try{!n&&r["return"]&&r["return"]()}finally{if(e)throw a}}console.log(t);var l=[],c=!0,u=!1,d=void 0;try{for(var p,h=this.cards[Symbol.iterator]();!(c=(p=h.next()).done);c=!0){var f=p.value;t.indexOf(f.set)!==-1&&l.push(f)}}catch(o){u=!0,d=o}finally{try{!c&&h["return"]&&h["return"]()}finally{if(u)throw d}}this.getPlayset(l,this.$storage.config),console.log(this.playset),this.errors.length?this.playset={}:(this.$storage.playset=this.playset,console.log(this.$storage.playset),this.$storage.playset.cards.sort(function(t,n){var e=t.cost.coin?parseInt(t.cost.coin.replace(/[\D]/gi,""),10):1,a=n.cost.coin?parseInt(n.cost.coin.replace(/[\D]/gi,""),10):1;return e<a?-1:e>a?1:0})),console.log(this.$storage.playset),this.$state.transitionTo("playset")}},{key:"getPlayset",value:function(t,n){this.playset={cards:[],attack:0,duration:0,reaction:0,treasure:0,victory:0,curse:0,buy:0,action:0,draw:0,coin:0,totalCost:0},this.getMinimumNeededCards(t,n),console.log(this.playset);for(var e=0;this.playset.cards.length<10;)this.getPlaysetCard(t,n),e+=1,11===e&&this.playset.cards.length<10&&this.getPlaysetCard(t,n,!0);this.setRequiredCards()}},{key:"getPlaysetCard",value:function(t,n){var e=!(arguments.length<=2||void 0===arguments[2])&&arguments[2],a=t.length,s=this.playset.cards.length>=5?n.upperBound:n.lowerBound;e&&(s=100);for(var r=0;r<1;){var i=this.randomNumber(a),o=t.splice(i,1);if(0===o.length){this.errors.push("Cannot meet the option requirements");break}o=o[0];var l=o.cost.coin?parseInt(o.cost.coin.replace(/[\D]/gi,""),10):1,c=o.types.includes("Attack")?1:0,u=o.types.includes("Treasure")?1:0,d=o.types.includes("Victory")?1:0,p=o.types.includes("Duration")?1:0,h=o.types.includes("Reaction")?1:0,f=o.requires.includes("Curse")?1:0,y=o.adds.buy,v=o.adds.draw,m=o.adds.action,g=o.adds.coin;this.playset.cards.indexOf(o)===-1&&this.playset.attack+c<=n.limits.attack&&this.playset.treasure+u<=n.limits.treasure&&this.playset.victory+d<=n.limits.victory&&this.playset.duration+p<=n.limits.duration&&this.playset.reaction+h<=n.limits.reaction&&this.playset.curse+f<=n.limits.curse&&this.playset.buy+y<=n.adds.buy.max&&this.playset.draw+v<=n.adds.draw.max&&this.playset.coin+g<=n.adds.coin.max&&this.playset.action+m<=n.adds.action.max&&this.playset.totalCost+l<=s&&(this.playset.cards.push(o),this.playset.attack+=c,this.playset.treasure+=u,this.playset.victory+=d,this.playset.duration+=p,this.playset.reaction+=h,this.playset.curse+=f,this.playset.buy+=y,this.playset.draw+=v,this.playset.coin+=g,this.playset.action+=m,this.playset.totalCost+=l,r++)}}},{key:"getMinimumNeededCards",value:function(t,n){var e=this,a=function(a){if(n.adds[a].min>0)for(var s=t.filter(function(t){return t.adds[a]>0});e.playset[a]<n.adds[a].min;){var r=e.randomNumber(s.length),i=s.splice(r,1);if(0===i.length||10===e.playset.cards.length){e.errors.push("Cannot find required cards for minimum: "+a);break}i=i[0],e.playset.cards.indexOf(i)===-1&&(e.playset.cards.push(i),e.playset[a]+=i.adds[a])}};for(var s in n.adds)a(s)}},{key:"setRequiredCards",value:function(){var t=new Set,n=new Set;t.add(this.getCard("Copper",this.supplyCards)),t.add(this.getCard("Silver",this.supplyCards)),t.add(this.getCard("Gold",this.supplyCards)),t.add(this.getCard("Estate",this.supplyCards)),t.add(this.getCard("Duchy",this.supplyCards)),t.add(this.getCard("Province",this.supplyCards));var a=!0,s=!1,r=void 0;try{for(var i,o=this.playset.cards[Symbol.iterator]();!(a=(i=o.next()).done);a=!0){var l=i.value,c=!0,u=!1,d=void 0;try{for(var p,h=l.requires[Symbol.iterator]();!(c=(p=h.next()).done);c=!0){var f=p.value,y=this.getCard(f,this.supplyCards);y?y.types.indexOf("Supply")===-1?n.add(y):t.add(y):(console.log("Cannot find required card"),console.log(f))}}catch(v){u=!0,d=v}finally{try{!c&&h["return"]&&h["return"]()}finally{if(u)throw d}}}}catch(v){s=!0,r=v}finally{try{!a&&o["return"]&&o["return"]()}finally{if(s)throw r}}this.playset.requiredCards={supply:[].concat(e(t)),other:[].concat(e(n))}}},{key:"getCard",value:function(t,n){var e=!0,a=!1,s=void 0;try{for(var r,i=n[Symbol.iterator]();!(e=(r=i.next()).done);e=!0){var o=r.value;if(o.name===t)return o}}catch(l){a=!0,s=l}finally{try{!e&&i["return"]&&i["return"]()}finally{if(a)throw s}}}},{key:"randomNumber",value:function(t){return Math.floor(Math.random()*t)}},{key:"resetOptions",value:function(){console.log("resetting"),this.$storage.config=this.baseConfig}}]),t}();n.DomEngine={templateUrl:"app/containers/DomEngine.html",controller:r}},function(t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=function(){return{restrict:"A",link:function(t,n){var e=function(){n.parent().children().css({display:"inline-block"}),n.css({display:"none"})};n.on("error",function(){return e()})}}};n["default"]=e},function(t,n){"use strict";function e(t,n,e){e.html5Mode(!0).hashPrefix("!"),n.otherwise("/"),t.state("welcome",{url:"/",template:'<welcome on-build="$ctrl.onBuild()" expansions="$ctrl.$storage.config.expansions"></welcome>'}).state("inventory",{url:"/inventory",template:'<inventory expansions="$ctrl.expansions" inventory="$ctrl.inventory" card-types="$ctrl.cardTypes"></inventory>'}).state("advancedOptions",{url:"/advanced-options",template:'<advanced-options config="$ctrl.$storage.config" reset-options="$ctrl.resetOptions()"></advanced-options>'}).state("playset",{url:"/playset",template:'<playset playset="$ctrl.$storage.playset" on-build="$ctrl.onBuild()" errors="$ctrl.errors"></playset>'})}e.$inject=["$stateProvider","$urlRouterProvider","$locationProvider"],Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=e},,function(t,n,e){e(2),t.exports=e(1)}],[21]);
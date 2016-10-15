import buildConfig from '../constants/buildConfig';
import Playset from '../models/playset';

class DomEngineController {
  /** @ngInject */
  constructor($localStorage, $state, DomEngineService, $log) {
    this._ds = DomEngineService;
    this.$storage = $localStorage;
    this.$state = $state;
    this.$log = $log;
  }

  $onInit() {
    this.baseConfig = JSON.parse(JSON.stringify(buildConfig));
    this.errors = [];
    this.warning = [];
    this.supplyCards = [];
    this.expansions = [];
    this.cardTypes = {};
    this.inventory = [];

    this._ds.bootstrapDomEngine().then(response => {
      this.baseConfig.expansions = response[0];
      this.$storage.expansions = response[0];
      this.expansions = response[0];
      this.cards = response[1];
      this.supplyCards = response[2];
      this.inventory = response[1].concat(response[2]);
      this.cardTypes = this.getTypes(this.inventory);

      if (this.$state.params.p) {
        const playset = new Playset();
        this.$storage.playset = playset.importPlayset(this.$state.params.p, this.inventory);
      }
    });

    if (this.$storage.config === undefined) {
      this.$storage.config = this.baseConfig;
    }
  }

  getTypes(cards) {
    const types = {};

    for (const card of cards) {
      for (const type of card.types) {
        if (!(type in types)) {
          types[type] = false;
        }
      }
    }

    return types;
  }

  onBuild() {
    const useSets = [];
    this.errors = [];
    this.warning = [];

    for (const set of this.$storage.config.expansions) {
      if (set.use) {
        useSets.push(set.name);
      }
    }

    this.$log.debug(useSets);

    if (useSets.length === 0) {
      return;
    }

    const useCards = [];

    for (const card of this.cards) {
      if (useSets.indexOf(card.set) !== -1) {
        useCards.push(card);
      }
    }

    this.createPlayset(useCards, this.$storage.config);

    if (this.errors.length) {
      this.playset = new Playset();
    } else {
      this.playset.setRequiredCards(this.supplyCards);
      this.playset.sortCards();
      this.$state.transitionTo('playset', {p: this.playset.getPlaysetId()});
      this.$storage.playset = this.playset;
    }
  }

  createPlayset(useCards, config) {
    this.$log.debug('generating playset');
    this.playset = new Playset();

    // minimum attribute cards
    this.getMinimumNeededCards(useCards, config);
    if (this.errors.length > 0) {
      return;
    }

    // all other cards
    let attempts = 0;
    while (this.playset.cards.length < 10) {
      attempts += 1;
      this.addPlaysetCard(useCards, config);
      if (attempts > 11 && this.playset.cards.length < 10) {
        this.addPlaysetCard(useCards, config, true);
      }
    }
    if (this.errors.length > 0) {
      return;
    }

    this.$log.debug('playset built');
    this.$log.debug(this.playset);
  }

  addPlaysetCard(useCards, config, infBound = false) {
    const bound = infBound ? 100 : config.cost;
    const cardSet = Object.assign([], useCards);
    let i = 0;

    while (i < 1) {
      // console.log(`length of card set: ${cardSet.length}`);
      if (cardSet.length === 0) {
        this.errors.push('Cannot meet the option requirements');
        break;
      } else {
        const num = this.randomNumber(cardSet.length);
        // console.log(`random number: ${num}`);
        const card = cardSet.splice(num, 1)[0];
        // console.log(`trying ${card.name}`);

        if (this.checkValidCard(card, config, bound)) {
          // console.log(`adding ${card.name}`);
          this.playset.addCard(card);
          // Remove card from use cards
          useCards.splice(num, 1);
          i++;
        } else {
          // console.log(`not adding ${card.name}`);
        }
      }
    }
  }

  getMinimumNeededCards(cards, config) {
    for (const req in config.adds) {
      if (config.adds[req].min !== 0 && config.adds[req].max !== 0) {
        let attempts = 1;
        const playsetAttrCounter = this.playset.adds[req];

        this.$log.debug(`${req.toUpperCase()} - Minimum:${config.adds[req].min} | Current:${this.playset[req]}`);
        while (attempts < 6) {
          this.$log.debug(`attempt #${attempts} for ${req}`);

          // reset the added array
          const addedSet = [];
          // reset the playset counter
          this.playset.adds[req] = playsetAttrCounter;
          // reset the match card subset
          const subset = cards.filter(card => card.adds[req] > 0);

          while (this.playset.adds[req] < config.adds[req].min) {
            this.$log.debug(`length of the ${req} subset: ${subset.length}`);

            if (subset.length === 0 || this.playset.length > 10) {
              this.$log.debug(`cannot find set for ${req} on attempt ${attempts}`);
              // remove the cards that have been added to start again
              for (const card of addedSet) {
                this.playset.removeCard(card);
              }
              break;
            } else {
              const random = this.randomNumber(subset.length);
              this.$log.debug(`random number: ${random}`);

              const neededCard = subset.splice(random, 1)[0];
              this.$log.debug(`trying ${neededCard.name}`);

              if (this.checkValidCard(neededCard, config, config.cost)) {
                addedSet.push(neededCard);
                this.playset.addCard(neededCard);
              }

              this.$log.debug(`total playset ${req} is ${this.playset[req]}, need ${config.adds[req].min - this.playset[req]} more ${req}s`);
              this.$log.debug(`not adding ${neededCard.name}`);
            }
          }

          if (this.playset.adds[req] >= config.adds[req].min) {
            attempts = 10;
          } else {
            attempts++;
          }
        }

        if (attempts === 10) {
          this.$log.debug(`FINISHED - ${req.toUpperCase()} Total ${req} is ${this.playset[req]}, required was ${config.adds[req].min}`);
          // this.playset.cards = this.playset.cards.concat(requiredSet);
        } else {
          this.$log.debug(`Too many attempts to match the ${req} requirement`);
          this.errors.push(`Too many attempts to match the ${req} requirement`);
          return;
        }
      }
    }

    for (const attr in config.adds) {
      if (this.playset.adds[attr] > config.adds[attr].max) {
        config.adds[attr].max = this.playset.adds[attr];
        this.warning.push(`Had to increase ${attr} max limit`);
      }
    }

    this.$log.debug(`FINISHED - ATTRMIN - Current playset cards is ${this.playset.cards.length}`);
  }

  checkValidCard(card, config, bound) {
    // Adds
    const max = {};
    max.buy = config.adds.buy.max === 0 ? 100 : config.adds.buy.max;
    max.draw = config.adds.draw.max === 0 ? 100 : config.adds.draw.max;
    max.action = config.adds.action.max === 0 ? 100 : config.adds.action.max;
    max.coin = config.adds.coin.max === 0 ? 100 : config.adds.coin.max;

    let debug = '';

    // In Set
    if (this.playset.cards.indexOf(card) === -1) {
      debug = `${card.name} NOT in the playset`;
    } else {
      debug = `${card.name} IN the playset`;
      return false;
    }
    this.$log.debug(debug);

    // Cost
    const cost = card.cost.coin ? parseInt(card.cost.coin.replace(/[\D]/gi, ''), 10) : 1;
    if (this.playset.cost + cost <= bound) {
      debug = `Add ${card.name}: cost -> ${cost} + ${this.playset.cost} < ${bound}`;
    } else {
      debug = `Skip ${card.name}: cost -> ${cost}, + ${this.playset.cost} > ${bound}`;
      return false;
    }
    this.$log.debug(debug);

    // Curse
    const curse = card.requires.includes('Curse') ? 1 : 0;
    if (this.playset.curse + curse <= config.limits.curse) {
      debug = `Add ${card.name}: curse -> ${curse} + ${this.playset.curse} < ${config.limits.curse}`;
    } else {
      debug = `Skip ${card.name}: curse -> ${curse}, + ${this.playset.curse} > ${config.limits.curse}`;
      return false;
    }
    this.$log.debug(debug);

    // Types
    for (const type in this.playset.types) {
      if ({}.hasOwnProperty.call(this.playset.types, type)) {
        const typeTest = card.types.includes(type) ? 1 : 0;
        if (this.playset.types[type] + typeTest <= config.limits[type]) {
          debug = `Add ${card.name}: ${type} -> ${typeTest} + ${this.playset.types[type]} < ${config.limits[type]}`;
        } else {
          debug = `Skip ${card.name}: ${type} -> ${typeTest}, + ${this.playset.types[type]} > ${config.limits[type]}`;
          return false;
        }
        this.$log.debug(debug);
      }
    }

    // Adds
    for (const add in this.playset.adds) {
      if ({}.hasOwnProperty.call(this.playset.adds, add)) {
        const addTest = card.adds[add];
        if (this.playset.adds[add] + addTest <= max[add]) {
          debug = `Add ${card.name}: ${add} -> ${addTest} + ${this.playset.adds[add]} < ${max[add]}`;
        } else {
          debug = `Skip ${card.name}: ${add} -> ${addTest} + ${this.playset.adds[add]} > ${max[add]}`;
          return false;
        }
        this.$log.debug(debug);
      }
    }

    this.$log.debug(`Adding ${card.name}, passes all requirements`);
    return true;
  }

  randomNumber(max) {
    return Math.floor(Math.random() * max);
  }

  resetOptions() {
    this._ds.getSets().then(response => {
      const newConfig = JSON.parse(JSON.stringify(buildConfig));
      newConfig.expansions = response;
      this.$storage.config = newConfig;
    });
  }
}

export const DomEngine = {
  templateUrl: 'app/containers/DomEngine.html',
  controller: DomEngineController
};

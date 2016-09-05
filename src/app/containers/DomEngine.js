import buildConfig from '../constants/buildConfig';

class DomEngineController {
  /** @ngInject */
  constructor($localStorage, $state, DomEngineService) {
    this._ds = DomEngineService;
    this.$storage = $localStorage;
    this.$state = $state;
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

    console.log(useSets);

    if (useSets.length === 0) {
      return;
    }

    const useCards = [];

    for (const card of this.cards) {
      if (useSets.indexOf(card.set) !== -1) {
        useCards.push(card);
      }
    }

    this.getPlayset(useCards, this.$storage.config);

    if (this.errors.length) {
      this.playset = {};
    } else {
      this.$storage.playset = this.playset;
      console.log(this.$storage.playset);

      // Sort the cards
      this.$storage.playset.cards.sort((a, b) => {
        const aCost = a.cost.coin ? parseInt(a.cost.coin.replace(/[\D]/gi, ''), 10) : 1;
        const bCost = b.cost.coin ? parseInt(b.cost.coin.replace(/[\D]/gi, ''), 10) : 1;

        if (aCost < bCost) {
          return -1;
        }
        if (aCost > bCost) {
          return 1;
        }
        return 0;
      });
    }

    console.log(this.$storage.playset);

    this.$state.transitionTo('playset');
  }

  getPlayset(useCards, config) {
    this.playset = {
      cards: [],
      attack: 0,
      duration: 0,
      reaction: 0,
      treasure: 0,
      victory: 0,
      curse: 0,
      buy: 0,
      action: 0,
      draw: 0,
      coin: 0,
      cost: 0
    };

    // minimum attribute cards
    this.getMinimumNeededCards(useCards, config);
    if (this.errors.length > 0) {
      return;
    }

    // all other cards
    let attempts = 0;
    while (this.playset.cards.length < 10) {
      attempts += 1;
      this.getPlaysetCard(useCards, config);
      if (attempts > 11 && this.playset.cards.length < 10) {
        this.getPlaysetCard(useCards, config, true);
      }
    }
    if (this.errors.length > 0) {
      return;
    }

    // required cards
    this.setRequiredCards();
  }

  getPlaysetCard(useCards, config, infBound = false) {
    const bound = infBound ? 100 : config.cost;
    const cardSet = Object.assign([], useCards);
    let i = 0;

    while (i < 1) {
       console.log(`length of card set: ${cardSet.length}`);
      if (cardSet.length === 0) {
        this.errors.push('Cannot meet the option requirements');
        break;
      } else {
        const num = this.randomNumber(cardSet.length);
        // console.log(`random number: ${num}`);
        const card = cardSet.splice(num, 1)[0];
        // console.log(`trying ${card.name}`);

        if (this.checkValidCard(card, config, bound, true)) {
          // console.log(`adding ${card.name}`);
          this.addCardToPlayset(card);
          // Remove card from use cards
          useCards.splice(num, 1);
          i++;
        } else {
          console.log(`not adding ${card.name}`);
        }
      }
    }
  }

  getMinimumNeededCards(cards, config) {
    for (const req in config.adds) {
      if (config.adds[req].min !== 0 && config.adds[req].max !== 0) {
        let attempts = 1;
        const playsetAttrCounter = this.playset[req];

        // console.log(`${req.toUpperCase()} - Minimum:${config.adds[req].min} | Current:${this.playset[req]}`);
        while (attempts < 6) {
          // console.log(`attempt #${attempts} for ${req}`);

          // reset the added array
          let addedSet = [];
          // reset the playset counter
          this.playset[req] = playsetAttrCounter;
          // reset the match card subset
          const subset = cards.filter(card => card.adds[req] > 0);

          while (this.playset[req] < config.adds[req].min) {
            // console.log(`length of the ${req} subset: ${subset.length}`);

            if (subset.length === 0 || this.playset.length > 10) {
              // console.log(`cannot find set for ${req} on attempt ${attempts}`);
              // remove the cards that have been added to start again
              for (const card of addedSet) {
                this.removeCardFromPlayset(card);
              }
              break;
            } else {
              const random = this.randomNumber(subset.length);
              // console.log(`random number: ${random}`);

              let neededCard = subset.splice(random, 1)[0];
              // console.log(`trying ${neededCard.name}`);

              if (this.checkValidCard(neededCard, config, config.cost, true)) {
                addedSet.push(neededCard);
                this.addCardToPlayset(neededCard);
              }

              // console.log(`total playset ${req} is ${this.playset[req]}, need ${config.adds[req].min - this.playset[req]} more ${req}s`);
              // console.log(`not adding ${neededCard.name}`);
            }
          }

          if (this.playset[req] >= config.adds[req].min) {
            attempts = 10;
          } else {
            attempts++;
          }
        }

        if (attempts === 10) {
          console.log(`FINISHED - ${req.toUpperCase()} Total ${req} is ${this.playset[req]}, required was ${config.adds[req].min}`);
          //this.playset.cards = this.playset.cards.concat(requiredSet);
        } else {
          // console.log(`Too many attempts to match the ${req} requirement`);
          this.errors.push(`Too many attempts to match the ${req} requirement`);
          return;
        }
      }
    }

    //console.log(this.playset);
    for (const attr in config.adds) {
      if (this.playset[attr] > config.adds[attr].max) {
        config.adds[attr].max = this.playset[attr];
        this.warning.push(`Had to increase ${attr} max limit`);
      }
    }

    console.log(`FINISHED - ATTRMIN - Current playset cards is ${this.playset.cards.length}`)
  }

  checkValidCard(card, config, bound, debug = false) {
    //Adds
    const maxBuy = config.adds.buy.max === 0 ? 100 : config.adds.buy.max;
    const maxDraw = config.adds.draw.max === 0 ? 100 : config.adds.draw.max;
    const maxAction = config.adds.action.max === 0 ? 100 : config.adds.action.max;
    const maxCoin = config.adds.coin.max === 0 ? 100 : config.adds.coin.max;

    // In Set
    if (debug) {
      if (this.playset.cards.indexOf(card) === -1) {
       console.log(`${card.name} NOT in the playset`)
      } else {
        console.log(`${card.name} IN the playset`)
      }
    }

    // Cost
    const cost = card.cost.coin ? parseInt(card.cost.coin.replace(/[\D]/gi, ''), 10) : 1;
    if(debug) {
      if (this.playset.cost + cost <= bound) {
        console.log(`Add ${card.name}: Cost -> ${cost} + ${this.playset.cost} < ${bound}`);
      } else {
        console.log(`Skip ${card.name}: Cost -> ${cost}, + ${this.playset.cost} > ${bound}`);
      }
    }

    //Types
    const attack = card.types.includes('Attack') ? 1 : 0;
    if (debug) {
      if (this.playset.attack + attack <= config.limits.attack) {
        console.log(`Add ${card.name}: Attack -> ${attack} + ${this.playset.attack} < ${config.limits.attack}`);
      } else {
        console.log(`Skip ${card.name}: Attack -> ${attack}, + ${this.playset.attack} > ${config.limits.attack}`);
      }
    }

    const treasure = card.types.includes('Treasure') ? 1 : 0;
    if (debug) {
      if (this.playset.treasure + treasure <= config.limits.treasure) {
        console.log(`Add ${card.name}: treasure -> ${treasure} + ${this.playset.treasure} < ${config.limits.treasure}`);
      } else {
        console.log(`Skip ${card.name}: treasure -> ${treasure}, + ${this.playset.treasure} > ${config.limits.treasure}`);
      }
    }

    const victory = card.types.includes('Victory') ? 1 : 0;
    if (debug) {
      if (this.playset.victory + victory <= config.limits.victory) {
        console.log(`Add ${card.name}: victory -> ${victory} + ${this.playset.victory} < ${config.limits.victory}`);
      } else {
        console.log(`Skip ${card.name}: victory -> ${victory}, + ${this.playset.victory} > ${config.limits.victory}`);
      }
    }

    const duration = card.types.includes('Duration') ? 1 : 0;
    if (debug) {
      if (this.playset.duration + duration <= config.limits.duration) {
        console.log(`Add ${card.name}: duration -> ${duration} + ${this.playset.duration} < ${config.limits.duration}`);
      } else {
        console.log(`Skip ${card.name}: duration -> ${duration}, + ${this.playset.duration} > ${config.limits.duration}`);
      }
    }

    const reaction = card.types.includes('Reaction') ? 1 : 0;
    if (debug) {
      if (this.playset.reaction + reaction <= config.limits.reaction) {
        console.log(`Add ${card.name}: reaction -> ${reaction} + ${this.playset.reaction} < ${config.limits.reaction}`);
      } else {
        console.log(`Skip ${card.name}: reaction -> ${reaction}, + ${this.playset.reaction} > ${config.limits.reaction}`);
      }
    }

    const curse = card.requires.includes('Curse') ? 1 : 0;
    if (debug) {
      if (this.playset.curse + curse <= config.limits.curse) {
        console.log(`Add ${card.name}: curse -> ${curse} + ${this.playset.curse} < ${config.limits.curse}`);
      } else {
        console.log(`Skip ${card.name}: curse -> ${curse}, + ${this.playset.curse} > ${config.limits.curse}`);
      }
    }

    // Adds
    const buys = card.adds.buy;
    if (debug) {
      if (this.playset.buy + buys <= config.adds.buy.max) {
        console.log(`Add ${card.name}: buy -> ${buys} + ${this.playset.buy} < ${config.adds.buy.max}`);
      } else {
        console.log(`Skip ${card.name}: buy -> ${buys} + ${this.playset.buy} > ${config.adds.buy.max}`);
      }
    }

    const draws = card.adds.draw;
    if (debug) {
      if (this.playset.draw + draws <= config.adds.draw.max) {
        console.log(`Add ${card.name}: draw -> ${draws} + ${this.playset.draw} < ${config.adds.draw.max}`);
      } else {
        console.log(`Skip ${card.name}: draw -> ${draws} + ${this.playset.draw} > ${config.adds.draw.max}`);
      }
    }

    const actions = card.adds.action;
    if (debug) {
      if (this.playset.action + actions <= config.adds.action.max) {
        console.log(`Add ${card.name}: action -> ${actions} + ${this.playset.action} < ${config.adds.action.max}`);
      } else {
        console.log(`Skip ${card.name}: action -> ${actions} + ${this.playset.action} > ${config.adds.action.max}`);
      }
    }

    const coins = card.adds.coin;
    if (debug) {
      if (this.playset.coin + coins <= config.adds.coin.max) {
        console.log(`Add ${card.name}: coin -> ${coins} + ${this.playset.coin} < ${config.adds.coin.max}`);
      } else {
        console.log(`Skip ${card.name}: coin -> ${coins} + ${this.playset.coin} > ${config.adds.coin.max}`);
      }
    }

    return this.playset.cards.indexOf(card) === -1 &&
      // Check Types
    this.playset.attack + attack <= config.limits.attack &&
    this.playset.treasure + treasure <= config.limits.treasure &&
    this.playset.victory + victory <= config.limits.victory &&
    this.playset.duration + duration <= config.limits.duration &&
    this.playset.reaction + reaction <= config.limits.reaction &&
    this.playset.curse + curse <= config.limits.curse &&
      // Check Adds
    this.playset.buy + buys <= maxBuy &&
    this.playset.draw + draws <= maxDraw &&
    this.playset.action + actions <= maxAction &&
    this.playset.coin + coins <= maxCoin &&
      // Check Cost
    this.playset.cost + cost <= bound;
  }

  addCardToPlayset(card) {
    // cost
    const cost = card.cost.coin ? parseInt(card.cost.coin.replace(/[\D]/gi, ''), 10) : 1;
    //Types
    const attack = card.types.includes('Attack') ? 1 : 0;
    const treasure = card.types.includes('Treasure') ? 1 : 0;
    const victory = card.types.includes('Victory') ? 1 : 0;
    const duration = card.types.includes('Duration') ? 1 : 0;
    const reaction = card.types.includes('Reaction') ? 1 : 0;
    const curse = card.requires.includes('Curse') ? 1 : 0;
    // console.log(`adding ${card.name}`);
    // Push card
    this.playset.cards.push(card);
    // Inc Types
    this.playset.attack += attack;
    this.playset.treasure += treasure;
    this.playset.victory += victory;
    this.playset.duration += duration;
    this.playset.reaction += reaction;
    this.playset.curse += curse;
    // Inc Adds
    this.playset.buy += card.adds.buy;
    this.playset.draw += card.adds.draw;
    this.playset.coin += card.adds.coin;
    this.playset.action += card.adds.action;
    // Inc Cost
    this.playset.cost += cost;
  }

  removeCardFromPlayset(card) {
    // cost
    const cost = card.cost.coin ? parseInt(card.cost.coin.replace(/[\D]/gi, ''), 10) : 1;
    //Types
    const attack = card.types.includes('Attack') ? 1 : 0;
    const treasure = card.types.includes('Treasure') ? 1 : 0;
    const victory = card.types.includes('Victory') ? 1 : 0;
    const duration = card.types.includes('Duration') ? 1 : 0;
    const reaction = card.types.includes('Reaction') ? 1 : 0;
    const curse = card.requires.includes('Curse') ? 1 : 0;
    // console.log(`adding ${card.name}`);
    // Push card
    this.playset.cards.splice(this.playset.cards.indexOf(card), 1);
    // Inc Types
    this.playset.attack -= attack;
    this.playset.treasure -= treasure;
    this.playset.victory -= victory;
    this.playset.duration -= duration;
    this.playset.reaction -= reaction;
    this.playset.curse -= curse;
    // Inc Adds
    this.playset.buy -= card.adds.buy;
    this.playset.draw -= card.adds.draw;
    this.playset.coin -= card.adds.coin;
    this.playset.action -= card.adds.action;
    // Inc Cost
    this.playset.cost -= cost;
  }

  setRequiredCards() {
    const supply = new Set();
    const other = new Set();
    let prosperityCount = 0;

    supply.add(this.getCard('Copper', this.supplyCards));
    supply.add(this.getCard('Silver', this.supplyCards));
    supply.add(this.getCard('Gold', this.supplyCards));
    supply.add(this.getCard('Estate', this.supplyCards));
    supply.add(this.getCard('Duchy', this.supplyCards));
    supply.add(this.getCard('Province', this.supplyCards));

    for (const card of this.playset.cards) {
      if (card.set === 'Prosperity') {
        prosperityCount++;
      }
      for (const rCard of card.requires) {
        const requiredCard = this.getCard(rCard, this.supplyCards);
        if (requiredCard) {
          if (requiredCard.types.indexOf('Supply') === -1) {
            other.add(requiredCard);
          } else {
            supply.add(requiredCard);
          }
        } else {
          console.log(`Cannot find required card ${rCard.name}`);
          this.errors.push(`Cannot find required card ${rCard.name}`);
        }
      }
    }

    if (prosperityCount > 5) {
      supply.add(this.getCard('Colony', this.supplyCards));
      supply.add(this.getCard('Platinum', this.supplyCards));
    }

    this.playset.requiredCards = {
      supply: [...supply],
      other: [...other]
    };
  }

  getCard(cardName, cards) {
    for (const card of cards) {
      if (card.name === cardName) {
        return card;
      }
    }
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

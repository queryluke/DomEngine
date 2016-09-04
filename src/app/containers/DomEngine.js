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
    console.log(this.playset);

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

    this.getMinimumNeededCards(useCards, config);
    console.log(this.playset);
    let attempts = 0;
    while (this.playset.cards.length < 10) {
      this.getPlaysetCard(useCards, config);
      attempts += 1;
      if (attempts === 11 && this.playset.cards.length < 10) {
        this.getPlaysetCard(useCards, config, true);
      }
    }
    this.setRequiredCards();
  }

  getPlaysetCard(useCards, config, infUpperBound = false) {
    const max = useCards.length;
    if (infUpperBound) {
      bound = 100;
    }
    let i = 0;

    while (i < 1) {
      const num = this.randomNumber(max);
      let card = useCards.splice(num, 1);

      if (card.length === 0) {
        this.errors.push('Cannot meet the option requirements');
        break;
      } else {
        card = card[0];
        // Cost
        const cost = card.cost.coin ? parseInt(card.cost.coin.replace(/[\D]/gi, ''), 10) : 1;
        // Types
        const attack = card.types.includes('Attack') ? 1 : 0;
        const treasure = card.types.includes('Treasure') ? 1 : 0;
        const victory = card.types.includes('Victory') ? 1 : 0;
        const duration = card.types.includes('Duration') ? 1 : 0;
        const reaction = card.types.includes('Reaction') ? 1 : 0;
        const curse = card.requires.includes('Curse') ? 1 : 0;
        // Adds
        const buys = card.adds.buy;
        const draws = card.adds.draw;
        const actions = card.adds.action;
        const coins = card.adds.coin;

        if (this.playset.cards.indexOf(card) === -1 &&
          // Check Types
          this.playset.attack + attack <= config.limits.attack &&
          this.playset.treasure + treasure <= config.limits.treasure &&
          this.playset.victory + victory <= config.limits.victory &&
          this.playset.duration + duration <= config.limits.duration &&
          this.playset.reaction + reaction <= config.limits.reaction &&
          this.playset.curse + curse <= config.limits.curse &&
          // Check Adds
          this.playset.buy + buys <= config.adds.buy.max &&
          this.playset.draw + draws <= config.adds.draw.max &&
          this.playset.coin + coins <= config.adds.coin.max &&
          this.playset.action + actions <= config.adds.action.max &&
          // Check Cost
          this.playset.cost + cost <= config.cost) {
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
          this.playset.buy += buys;
          this.playset.draw += draws;
          this.playset.coin += coins;
          this.playset.action += actions;
          // Inc Cost
          this.playset.cost += cost;
          i++;
        }
      }
    }
  }

  getMinimumNeededCards(cards, config) {
    for (const req in config.adds) {
      if (config.adds[req].min > 0) {
        const subset = cards.filter(card => card.adds[req] > 0);

        while (this.playset[req] < config.adds[req].min) {
          const random = this.randomNumber(subset.length);
          let neededCard = subset.splice(random, 1);

          if (neededCard.length === 0 || this.playset.cards.length === 10) {
            this.errors.push(`Cannot find required cards for minimum: ${req}`);
            break;
          } else {
            neededCard = neededCard[0];
            if (this.playset.cards.indexOf(neededCard) === -1) {
              this.playset.cards.push(neededCard);
              this.playset[req] += neededCard.adds[req];
            }
          }
        }
      }
    }
  }

  setRequiredCards() {
    const supply = new Set();
    const other = new Set();

    supply.add(this.getCard('Copper', this.supplyCards));
    supply.add(this.getCard('Silver', this.supplyCards));
    supply.add(this.getCard('Gold', this.supplyCards));
    supply.add(this.getCard('Estate', this.supplyCards));
    supply.add(this.getCard('Duchy', this.supplyCards));
    supply.add(this.getCard('Province', this.supplyCards));

    for (const card of this.playset.cards) {
      for (const rCard of card.requires) {
        const requiredCard = this.getCard(rCard, this.supplyCards);
        if (requiredCard) {
          if (requiredCard.types.indexOf('Supply') === -1) {
            other.add(requiredCard);
          } else {
            supply.add(requiredCard);
          }
        } else {
          console.log('Cannot find required card');
          console.log(rCard);
        }
      }
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
    this.$storage.config = JSON.parse(JSON.stringify(buildConfig));
  }
}

export const DomEngine = {
  templateUrl: 'app/containers/DomEngine.html',
  controller: DomEngineController
};

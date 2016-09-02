class DomEngineController {
  /** @ngInject */
  constructor(DomEngineService, $localStorage, $state) {
    this._ds = DomEngineService;
    this.$storage = $localStorage;
    this.$state = $state;
  }

  $onInit() {
    this.baseConfig = {
      attackLimit: 2,
      reactRatio: 2,
      lowerBound: 21,
      upperBound: 42,
      expansions: {}
    };
    this.supplyCards = [];
    this.expansions = [];
    this.cardTypes = {};
    this.inventory = [];

    this._ds.bootstrapDomEngine().then(response => {
      this.baseConfig.expansions = response[0];
      this.expansions = response[0];
      this.cards = response[1];
      this.supplyCards = response[2];
      this.inventory = response[1].concat(response[2]);
      this.cardTypes = this.getTypes(this.inventory);
    });

    if (angular.isUndefined(this.$storage.config)) {
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

    for (const set of this.$storage.config.expansions) {
      if (set.use) {
        useSets.push(set.name);
      }
    }

    console.log(useSets);

    const useCards = [];

    for (const card of this.cards) {
      if (useSets.indexOf(card.set) !== -1) {
        useCards.push(card);
      }
    }

    this.$storage.playset = this.getPlayset(useCards, this.$storage.config);

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

    console.log(this.$storage.playset);

    this.$state.transitionTo('playset');
  }

  getPlayset(useCards, config) {
    let playset = {
      cards: [],
      totalAttacks: 0,
      totalCost: 0
    };

    playset = this.getSet(useCards, config, playset, 5);
    playset = this.getSet(useCards, config, playset);
    if (playset.cards.length < 10) {
      config.upperBound = 100;
      playset = this.getSet(useCards, config, playset);
    }

    playset = this.setRequiredCards(playset);

    return playset;
  }

  getSet(useCards, config, playset, groupLimit = 5) {
    const max = useCards.length;
    const remaining = 10 - playset.cards.length;
    const bound = remaining >= 5 ? config.upperBound : config.lowerBound;
    const limit = remaining < groupLimit ? remaining : groupLimit;
    let i = 0;
    let attempts = 0;

    while (i < limit) {
      const num = this.randomNumber(max);
      // console.log('rand is '+num);
      const card = useCards[num];
      // console.log('testing '+card.name);
      // const testCard = playset.cards.indexOf(card);
      // console.log('card exists? '+testCard);
      const cost = card.cost.coin ? parseInt(card.cost.coin.replace(/[\D]/gi, ''), 10) : 1;
      // console.log('it costs '+ cost);
      // console.log('total cost is '+(playset.totalCost + cost));
      const attack = parseInt(card.types.indexOf('Attack'), 10) > -1 ? 1 : 0;
      // console.log('it\'s attack is '+attack);
      // console.log('total attack is '+(playset.totalAttacks + attack));
      attempts++;
      if (attempts > useCards.length) {
        break;
      }
      if (playset.cards.indexOf(card) === -1 &&
        playset.totalAttacks + attack <= config.attackLimit &&
        playset.totalCost + cost <= bound) {
        playset.cards.push(card);
        playset.totalAttacks += attack;
        playset.totalCost += cost;
        i++;
      }
    }
    return playset;
  }

  setRequiredCards(playset) {
    const supply = new Set();
    const other = new Set();

    supply.add(this.getCard('Copper', this.supplyCards));
    supply.add(this.getCard('Silver', this.supplyCards));
    supply.add(this.getCard('Gold', this.supplyCards));
    supply.add(this.getCard('Estate', this.supplyCards));
    supply.add(this.getCard('Duchy', this.supplyCards));
    supply.add(this.getCard('Province', this.supplyCards));

    for (const card of playset.cards) {
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

    playset.requiredCards = {
      supply: [...supply],
      other: [...other]
    };

    return playset;
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
    console.log('resetting');
    this.$storage.config = $this.baseConfig;
  }
}

export const DomEngine = {
  templateUrl: 'app/containers/DomEngine.html',
  controller: DomEngineController
};

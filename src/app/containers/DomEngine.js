import expansions from '../constants/expansions';

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
      lowerBound: 25,
      upperBound: 42,
      expansions
    };

    if (this.$storage.config.length === 0) {
      this.$storage.config = this.baseConfig;
    }

    this.cards = [];
    this.allSupplyCards = [];
  }

  onBuild() {
    const useSets = [];

    for (const set in this.$storage.config.expansions) {
      if (this.$storage.config.expansions[set].use) {
        useSets.push(set);
      }
    }

    console.log(useSets);

    this._ds.getCards().then(response1 => {
      this.cards = response1;

      return this._ds.getSupplyCards();
    }).then(response2 => {
      const useCards = [];
      this.allSupplyCards = response2;

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
    });
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

    supply.add(this.getCard('Copper', this.allSupplyCards));
    supply.add(this.getCard('Silver', this.allSupplyCards));
    supply.add(this.getCard('Gold', this.allSupplyCards));
    supply.add(this.getCard('Estate', this.allSupplyCards));
    supply.add(this.getCard('Duchy', this.allSupplyCards));
    supply.add(this.getCard('Province', this.allSupplyCards));

    for (const card of playset.cards) {
      for (const rCard of card.requires) {
        const requiredCard = this.getCard(rCard, this.allSupplyCards);
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
    this.$storage.config = $this.baseConfig;
  }
}

export const DomEngine = {
  templateUrl: 'app/containers/DomEngine.html',
  controller: DomEngineController
};

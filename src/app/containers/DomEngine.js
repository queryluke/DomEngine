class DomEngineController {
  /** @ngInject */
  constructor(DomEngineService, $localStorage) {
    this._ds = DomEngineService;
    this.$storage = $localStorage;
  }

  $onInit() {
    this.sets = [];
    this.config = {
      attackLimit: 2,
      reactRatio: 2,
      lowerBound: 25,
      upperBound: 42
    };
    this.$storage.domengineConfig = this.config;
    this._ds.getSets().then(response => {
      this.sets = response;
    });

    this.cards = [];
    this.show = 'welcome';
    this.showPrevious = 'welcome';
    this.allSupplyCards = [];
  }

  onBuild() {
    this.showPrevious = 'playset';
    const useSets = [];

    for (const set of this.sets) {
      if (set.use) {
        useSets.push(set.name);
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

      this.$storage.playSet = this.getPlayset(useCards, this.config);

      // Sort the cards
      this.$storage.playSet.cards.sort((a, b) => {
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

      console.log(this.$storage.playSet);
    });
  }

  getPlayset(useCards, config) {
    let playSet = {
      cards: [],
      totalAttacks: 0,
      totalCost: 0
    };

    playSet = this.getSet(useCards, config, playSet, 5);
    playSet = this.getSet(useCards, config, playSet);
    if (playSet.cards.length < 10) {
      config.upperBound = 100;
      playSet = this.getSet(useCards, config, playSet);
    }

    playSet = this.setRequiredCards(playSet);

    return playSet;
  }

  getSet(useCards, config, playSet, groupLimit = 5) {
    const max = useCards.length;
    const remaining = 10 - playSet.cards.length;
    const bound = remaining >= 5 ? config.upperBound : config.lowerBound;
    const limit = remaining < groupLimit ? remaining : groupLimit;
    let i = 0;
    let attempts = 0;

    while (i < limit) {
      const num = this.randomNumber(max);
      // console.log('rand is '+num);
      const card = useCards[num];
      // console.log('testing '+card.name);
      // const testCard = playSet.cards.indexOf(card);
      // console.log('card exists? '+testCard);
      const cost = card.cost.coin ? parseInt(card.cost.coin.replace(/[\D]/gi, ''), 10) : 1;
      // console.log('it costs '+ cost);
      // console.log('total cost is '+(playSet.totalCost + cost));
      const attack = parseInt(card.types.indexOf('Attack'), 10) > -1 ? 1 : 0;
      // console.log('it\'s attack is '+attack);
      // console.log('total attack is '+(playSet.totalAttacks + attack));
      attempts++;
      if (attempts > useCards.length) {
        break;
      }
      if (playSet.cards.indexOf(card) === -1 &&
        playSet.totalAttacks + attack <= config.attackLimit &&
        playSet.totalCost + cost <= bound) {
        playSet.cards.push(card);
        playSet.totalAttacks += attack;
        playSet.totalCost += cost;
        i++;
      }
    }
    return playSet;
  }

  setRequiredCards(playSet) {
    const supply = new Set();
    const other = new Set();

    supply.add(this.getCard('Copper', this.allSupplyCards));
    supply.add(this.getCard('Silver', this.allSupplyCards));
    supply.add(this.getCard('Gold', this.allSupplyCards));
    supply.add(this.getCard('Estate', this.allSupplyCards));
    supply.add(this.getCard('Duchy', this.allSupplyCards));
    supply.add(this.getCard('Province', this.allSupplyCards));

    for (const card of playSet.cards) {
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

    playSet.requiredCards = {
      supply: [...supply],
      other: [...other]
    };

    return playSet;
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

  onChangeShown({show}) {
    this.show = show === 'previous' ? this.showPrevious : show;
  }
}

export const DomEngine = {
  templateUrl: 'app/containers/DomEngine.html',
  controller: DomEngineController
};

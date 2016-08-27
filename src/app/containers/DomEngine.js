class DomEngineController {
  /** @ngInject */
  constructor(DomEngineService) {
    this._ds = DomEngineService;
  }

  $onInit() {
    this.sets = [];
    this.config = {
      attackLimit: 2,
      // reactRatio: '3:1',
      lowerBound: 35,
      upperBound: 42
    };
    this._ds.getSets().then(response => {
      this.sets = response;
    });
  }

  buildPlayset() {
    const useSets = [];

    for (const set of this.sets) {
      if (set.use) {
        useSets.push(set.name);
      }
    }

    console.log(useSets);

    this._ds.getCards().then(response => {
      const useCards = [];

      for (const card of response) {
        if (useSets.indexOf(card.set) !== -1) {
          useCards.push(card);
        }
      }

      console.log(useCards);

      this.playSet = this.getPlayset(useCards, this.config);

      this.playSet.cards.sort((a, b) => {
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

      console.log(this.playSet);
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

    return playSet;
  }

  getSet(useCards, config, playSet, groupLimit = 5) {
    const max = useCards.length;
    const remaining = 10 - playSet.cards.length;
    const bound = remaining >= 5 ? config.upperBound : config.lowerBound;
    const limit = remaining < groupLimit ? remaining : groupLimit;
    let i = 0;

    while (i < limit) {
      const num = this.randomNumber(max);
      // console.log('rand is '+num);
      const card = useCards[num];
      // console.log('testing '+card.name);
      // const testCard = playSet.cards.indexOf(card);
      // console.log('card exists? '+testCard);
      const cost = card.cost.coin ? parseInt(card.cost.coin.replace(/[\D]/gi, ''), 10) : 1;
      // console.log('it costs '+ cost);
      // console.log('total cost is '+playSet.totalCost + cost);
      const attack = parseInt(card.types.indexOf('Attack'), 10) > -1 ? 1 : 0;
      // console.log('it\'s attack is '+attack);
      // console.log('total attack is '+playSet.totalAttacks + attack);
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

  randomNumber(max) {
    return Math.floor(Math.random() * max);
  }
}

export const DomEngine = {
  templateUrl: 'app/containers/DomEngine.html',
  controller: DomEngineController
};

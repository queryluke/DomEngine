class InventoryController {
  /** @ngInject */
  constructor(DomEngineService) {
    this._ds = DomEngineService;
  }

  $onInit() {
    this.cards = [];
    this.searchParams = {
      name: '',
      types: {},
      costL: 0,
      costG: 100
    };

    this._ds.getSets().then(response => {
      this.searchParams.expansions = response;
      for (const set of this.searchParams.expansions) {
        set.use = true;
      }
    });

    this._ds.getCards().then(response => {
      this.searchParams.types = this.setTypes(response);
      this.cards = response;
    });


  }

  setTypes(cards) {
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

  search({searchParams}) {
    if (!searchParams) {
      return;
    }

    this.searchParams = searchParams;

    for (const card of this.cards) {
      let matches = true;
      // Filter by string
      if (searchParams.name && matches) {
        let stringMatches = 0;
        const re = new RegExp(searchParams.name, "gi");
        if (card.name.match(re)) {
          stringMatches += 1;
        } else {
          for (const text of card.text) {
            if (text.match(re)) {
              stringMatches += 1;
            }
          }
        }
        matches = stringMatches > 0;
      }

      // Filter by types
      const filterByMatches = [];
      for (const type in searchParams.types) {
        if (searchParams.types[type]) {
          filterByMatches.push(type);
        }
      }
      if (matches && filterByMatches.length > 0) {
        let typeMatches = 0;
        for (const type of filterByMatches) {
          typeMatches = card.types.indexOf(type) > -1 ? typeMatches + 1 : typeMatches;
        }
        matches = typeMatches > 0;
      }

      // Filter by expansions
      const filterByExpansions = [];
      for (const set of searchParams.expansions) {
        if(set.use) {
          filterByExpansions.push(set.name)
        }
      }
      if (matches && filterByExpansions.length < this.searchParams.expansions.length && filterByExpansions.length > 0) {
        let setMatches = 0;
        for (const set of filterByExpansions) {
          setMatches = card.set === set ? setMatches + 1 : setMatches;
        }
        matches = setMatches > 0;
      }

      // Filter by cost
      if(matches && searchParams.costL > 0 && searchParams.costG < 100) {
        let cost = parseInt(card.cost.coin,10);
        console.log('testing' + card.name);
        console.log('cost' + cost);
        matches = cost >= searchParams.costL && cost <= searchParams.costG;
        console.log(matches);
      }

      card.show = matches;
    }
  }
}

export const Inventory = {
  templateUrl: 'app/containers/Inventory.html',
  controller: InventoryController
};

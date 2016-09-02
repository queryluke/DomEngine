class InventoryController {
  /** @ngInject */
  constructor() {
    this.searchParams = {
      name: '',
      types: this.cardTypes,
      costL: 0,
      costG: 100,
      expansions: this.expansions
    };
    this.results = [];
  }

  $onInit() {
    this.search(this.searchParams);
  }

  $onChanges(changes) {
    if (changes.cardTypes) {
      this.searchParams.types = Object.assign({}, this.cardTypes);
    }

    if (changes.expansions) {
      this.searchParams.expansions = Object.assign([], this.expansions);
    }

    if (changes.inventory) {
      this.inventory = Object.assign([], this.inventory);
    }
  }

  search({searchParams}) {
    if (!searchParams) {
      return;
    }

    this.searchParams = searchParams;
    console.log(searchParams);

    let results = this.inventory;

    // Filter by string
    if (searchParams.name) {
      const REGEX = new RegExp(searchParams.name, "gi");
      results = results.filter(card => REGEX.test(card.name.concat(card.text.join())) === true);
    }

    // Filter by types
    const filterByTypes = [];
    for (const type in searchParams.types) {
     if (searchParams.types[type]) {
       filterByTypes.push(type);
     }
    }
    if(filterByTypes.length > 0) {
      results = results.filter(card => {
        let match = 0;
        for (const type of filterByTypes) {
          match = card.types.includes(type) ? match + 1 : match;
        }
        return match > 0;
      });
    }

    // Filter by expansions
    const filterByExpansions = [];
    for (const expac of searchParams.expansions) {
      if(expac.use) {
        filterByExpansions.push(expac.name)
      }
    }
    if (filterByExpansions.length > 0) {
      results = results.filter(card => {
        let match = 0;
        for (const expac of filterByExpansions) {
          match = card.set === expac ? match + 1 : match;
        }
        return match > 0;
      });
    }

    // Filter by cost
    results = results.filter(card => parseInt(card.cost.coin, 10) >= searchParams.costL);
    results = results.filter(card => parseInt(card.cost.coin, 10) <= searchParams.costG);

    this.results = results;
  }
}

export const Inventory = {
  templateUrl: 'app/components/Inventory.html',
  controller: InventoryController,
  bindings: {
    expansions: '<',
    inventory: '<',
    cardTypes: '<'
  }
};

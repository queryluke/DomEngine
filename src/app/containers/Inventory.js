class InventoryController {
  /** @ngInject */
  constructor(DomEngineService) {
    this._ds = DomEngineService;
  }

  $onInit() {
    this.cards = [];
    this.searchParams = {
      name: '',
      types: []
    };

    this._ds.getCards(this.searchParams).then(response => {
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
      if (matches) {
        let typeMatches = 0;
        for (const type in searchParams.types) {
          if (searchParams.types[type]) {
            typeMatches = card.types.indexOf(type) > -1 ? typeMatches + 1 : typeMatches;
          }
        }
        matches = typeMatches > 0;
      }
      card.show = matches;
    }
  }
}

export const Inventory = {
  templateUrl: 'app/containers/Inventory.html',
  controller: InventoryController
};

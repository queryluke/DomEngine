class PlaymatController {
  /** @ngInject */
  constructor($localStorage) {
    this.$storage = $localStorage;
  }

  $onInit() {
    this.setSupplyCards();
  }

  $onChanges(changes) {
    if (changes.playset) {
      this.setSupplyCards();
    }
  }

  setSupplyCards() {
    this.treasure = this.filterByType(this.playset.requiredCards.supply, 'Treasure');
    this.victory = this.filterByType(this.playset.requiredCards.supply, 'Victory');
    this.ruins = this.filterByType(this.playset.requiredCards.supply, 'Ruins');
  }

  filterByType(cards, type) {
    return cards.filter(card => card.types.includes(type));
  }
}

export const Playmat = {
  templateUrl: 'app/components/Playmat.html',
  controller: PlaymatController,
  bindings: {
    playset: '<',
    onBuild: '&',
    errors: '<',
    warning: '<',
    toggleShare: '&',
    shareOpen: '<'
  }
};

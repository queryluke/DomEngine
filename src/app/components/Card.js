class CardController {
  /** @ngInject */
  constructor($localStorage) {
    this.$storage = $localStorage;
  }
}

export const Card = {
  templateUrl: 'app/components/Card.html',
  controller: CardController,
  bindings: {
    card: '<'
  }
};

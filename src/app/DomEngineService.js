export class DomEngineService {
  /** @ngInject */
  constructor($http) {
    this.$http = $http;
  }
  getCards() {
    return this.$http.get('/data/cards.json')
      .then(getCardsComplete)
      .catch(getCardsFailed);

    function getCardsComplete(response) {
      return response.data;
    }

    function getCardsFailed(error) {
      console.log('XHR Failed for getCards.');
      console.log(error.data);
    }
  }

  getSets() {
    return this.$http.get('/data/sets.json')
      .then(getSetsComplete)
      .catch(getSetsFailed);

    function getSetsComplete(response) {
      return response.data;
    }

    function getSetsFailed(error) {
      console.log('XHR Failed for getSets.');
      console.log(error.data);
    }
  }
}

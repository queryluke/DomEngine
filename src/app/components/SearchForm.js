class SearchFormController {
  /** @ngInject */
  constructor($timeout) {
    this.$timeout = $timeout;
    this.delay = 0;
  }
  onSubmit() {
    this.onSearch();
  }
  $onChanges(changes){
    console.log(changes);
  }

  costSubmit(low,high) {
    console.log(low);
  }
}

export const SearchForm = {
  bindings: {
    searchParams: '<',
    onSearch: '&'
  },
  templateUrl: 'app/components/SearchForm.html',
  controller: SearchFormController
};

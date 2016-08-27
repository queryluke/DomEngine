class SearchFormController {
  onSubmit() {
    this.onSearch({
      $event: {
        searchParams: this.searchParams
      }
    });
  }
}

export const SearchForm = {
  bindings: {
    searchParams: '<',
    searchTypes: '<',
    onSearch: '&'
  },
  templateUrl: 'app/components/SearchForm.html',
  controller: SearchFormController
};

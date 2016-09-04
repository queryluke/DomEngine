class NavController {
  /** @ngInject */
  constructor($localStorage) {
    this.$storage = $localStorage;
  }

  $onInit() {
    this.$storage.useImages = false;
    console.log(this.$storage.useImages);
    this.showNav = false;
  }

  handleBuild() {
    console.log('build');
    this.onBuild();
  }
}

export const Nav = {
  templateUrl: 'app/components/Nav.html',
  controller: NavController,
  bindings: {
    onBuild: '&'
  }
};

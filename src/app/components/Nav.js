class NavController {
  constructor() {}

  $onInit() {
    this.showNav = false;
  }
}

export const Nav = {
  templateUrl: 'app/components/Nav.html',
  bindings: {
    onBuild: '&'
  }
};

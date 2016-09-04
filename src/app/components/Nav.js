class NavController {
  $onInit() {
    this.showNav = false;
  }
}

export const Nav = {
  templateUrl: 'app/components/Nav.html',
  controller: NavController,
  bindings: {
    onBuild: '&'
  }
};

class BuildFormController {
  handleBuild() {
    console.log('build');
    this.onBuild();
  }
}

export const BuildForm = {
  templateUrl: 'app/components/BuildForm.html',
  controller: BuildFormController,
  bindings: {
    expansions: '<',
    onBuild: '&'
  }
};

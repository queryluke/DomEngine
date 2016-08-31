class BuildFormController {
  handleBuild() {
    this.onBuild();
  }
}

export const BuildForm = {
  templateUrl: 'app/components/BuildForm.html',
  controller: BuildFormController,
  bindings: {
    sets: '<',
    onBuild: '&',
  }
};

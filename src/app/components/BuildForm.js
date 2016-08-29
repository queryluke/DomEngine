class BuildFormController {

  handleShowAdvancedOptions() {
    const show = this.show === 'advancedOptions' ? 'previous' : 'advancedOptions';
    this.onChangeShown({
      $event: {
        show
      }
    });
  }

  handleBuild() {
    this.onBuild();
    this.onChangeShown({
      $event: {
        show: 'playset'
      }
    });
  }

}

export const BuildForm = {
  templateUrl: 'app/components/BuildForm.html',
  controller: BuildFormController,
  bindings: {
    sets: '<',
    onChangeShown: '&',
    onBuild: '&',
    show: '@'
  }
};

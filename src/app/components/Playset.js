class PlaysetController {
  handleChangeShown() {
    this.onChangeShown({
      $event: {
        show: 'welcome'
      }
    });
  }
}

export const Playset = {
  templateUrl: 'app/components/Playset.html',
  controller: PlaysetController,
  bindings: {
    playset: '<',
    onChangeShown: '&',
    show: '@'
  }
};

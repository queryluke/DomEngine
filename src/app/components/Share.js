class ShareController {
  /** @ngInject */
  constructor($state) {
    this.$state = $state;
  }

  getShareUrl() {
    return this.$state.href('playset', {}, {absolute: true});
  }
}

export const Share = {
  templateUrl: 'app/components/Share.html',
  controller: ShareController,
  bindings: {
    open: '<',
    toggleShare: '&'
  }
};


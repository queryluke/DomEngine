import expansions from '../constants/expansions';

class DomEngineController {
  /** @ngInject */
  constructor(DomEngineService, $localStorage) {
    this._ds = DomEngineService;
    this.$storage = $localStorage;
  }

  $onInit() {
    this.baseConfig = {
      attackLimit: 2,
      reactRatio: 2,
      lowerBound: 25,
      upperBound: 42,
      expansions
    };

    if (this.$storage.config.length === 0) {
      this.$storage.config = this.baseConfig;
    }
  }

  resetOptions() {
    this.$storage.config = $this.baseConfig;
  }
}

export const DomEngine = {
  templateUrl: 'app/containers/DomEngine.html',
  controller: DomEngineController
};

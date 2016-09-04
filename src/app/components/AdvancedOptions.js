class AdvancedOptionsController {

  $onInit() {
    this.showHelpText = false;
    this.selectedHelp = {};
    this.helpBlocks = {
      typeLimits: {
        title: 'Limit Number of Card Types',
        text: `For each slider, set the max number of that type you want in your playset.
         For a 100% random playset, (without any balancing) set all values to 10`
      },
      maxCost: {
        title: 'Max Playset Cost',
        text: `The total cost of all Kingdom Cards. 39, 42, and 49 are great starting points.
        <br><strong>Note:</strong> For Prosperity, it's recommended to use the max setting of 73.
        <br><strong>Caveat:</strong> Occasionally, DomEngine cannot find a card below the required cost. For example, if the max
        cost is 39, and the first 9 Kingdom Cards total 38 (there are no 1 cost cards). In this instance, the last card
        in will be fetched without a max limit. Something that will be remedied in later versions.`
      },
      cardAbilities: {
        title: 'Card Abilities',
        text: ``
      }
    };
  }

  onShowHelpText(help) {
    this.showHelpText = true;
    this.selectedHelp = this.helpBlocks[help];
  }

  onHideHelpText() {
    this.showHelpText = false;
  }

  change() {
    //this.resetOptions();
  }

  handleResetOptions() {
    this.resetOptions();
  }

  handleBuild() {
    this.onBuild();
  }
}

export const AdvancedOptions = {
  templateUrl: 'app/components/AdvancedOptions.html',
  controller: AdvancedOptionsController,
  bindings: {
    config: '<',
    resetOptions: '&',
    onBuild: '&'
  }
};

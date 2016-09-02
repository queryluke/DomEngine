class AdvancedOptionsController {

  $onInit() {
    this.showHelpText = false;
    this.selectedHelp = {};
    this.helpBlocks = {
      maxAttacks: {
        title: 'Max Attack Cards',
        text: 'Set the max number of Action-Attack cards.'
      },
      reactRatio: {
        title: 'Action-Reaction Ratio',
        text: `The number of attack cards that, if drawn, will require a Reaction card to negate attack cards. e.g.,
        If set to 2, if 2 Action-Attack cards are drawn, 1 Reaction card will be included in the playset.`
      },
      lowerBound: {
        title: 'Lower Bound',
        text: `DomEngine builds a playset by running the build phase twice. During the first build phase, the total cost
        of cards cannot exceed the lower bound. Based on the recommended playsets of the Dominion Strategy Wiki, 42 is the
        average upper bound. So a lower bound of 1/2 that is the default.`
      },
      upperBound: {
        title: 'Upper Bound',
        text: `DomEngine builds a playset by running the build phase twice. During the second build phase, the total cost
        of cards cannot exceed the upper bound. Based on the recommended playsets of the Dominion Strategy Wiki, 42 is the
        average upper bound.`
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

  handleResetOptions() {
    console.log('reset');
    this.resetOptions();
  }
}

export const AdvancedOptions = {
  templateUrl: 'app/components/AdvancedOptions.html',
  controller: AdvancedOptionsController,
  bindings: {
    config: '<',
    resetOptions: '&'
  }
};

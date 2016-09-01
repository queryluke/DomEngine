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
}

export const AdvancedOptions = {
  templateUrl: 'app/components/AdvancedOptions.html',
  controller: AdvancedOptionsController,
  bindings: {
    config: '<'
  }
};

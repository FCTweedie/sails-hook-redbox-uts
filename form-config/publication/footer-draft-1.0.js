module.exports = [
  {
    class: "ButtonBarContainer",
    compClass: "ButtonBarContainerComponent",
    definition: {
      fields: [{
          class: "TabNavButton",
          definition: {
            id: 'mainTabNav',
            prevLabel: "@tab-nav-previous",
            nextLabel: "@tab-nav-next",
            targetTabContainerId: "mainTab",
            cssClasses: 'btn btn-primary',
            endDisplayMode: 'hidden'
          }
        },
        {
          class: "Spacer",
          definition: {
            width: '50px',
            height: 'inherit'
          }
        },
        {
          class: "SaveButton",
          definition: {
            label: 'Save',
            cssClasses: 'btn-success',
            disabledExpression: '<%= _.isEmpty(relatedRecordId) %>'
          }
        },
        {
          class: "SaveButton",
          definition: {
            label: 'Save & Close',
            closeOnSave: true,
            redirectLocation: '/@branding/@portal/dashboard/dataPublication',
            disabledExpression: '<%= _.isEmpty(relatedRecordId) %>'
          },
          variableSubstitutionFields: ['redirectLocation']
        },
        {
          class: "SaveButton",
          definition: {
            label: '@dataPublication-submit-for-review',
            closeOnSave: true,
            redirectLocation: '/@branding/@portal/dashboard/dataPublication',
            targetStep: 'reviewing',
            disabledExpression: '<%= _.isEmpty(relatedRecordId) %>'
          },
          variableSubstitutionFields: ['redirectLocation']
        },
        {
          class: "CancelButton",
          definition: {
            label: 'Close',
          }
        }
      ]
    }
  },
  {
    class: "Container",
    definition: {
      id: "form-render-complete",
      label: "Test",
      fields: [{
        class: 'Container',
        compClass: 'TextBlockComponent',
        definition: {
          value: 'will be empty',
          type: 'span'
        }
      }]
    }
  }
];

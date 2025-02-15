module.exports = [
  // -------------------------------------------------------------------
  // Citation Tab
  // -------------------------------------------------------------------
  {
    class: "Container",
    definition: {
      id: "citation",
      label: "@dataPublication-citation-tab",
      fields: [
        {
          class: 'Container',
          compClass: 'TextBlockComponent',
          definition: {
            value: "@dataPublication-citation-tab-heading",
            type: 'h3'
          }
        },
        {
          class: 'TextField',
          definition: {
            name: 'title',
            label: '@dataPublication-citation-title',
            help: '@dataPublication-citation-title-help',
            type: 'text',
            required: true,
            disabledExpression: '<%= _.isEmpty(relatedRecordId) %>',
            subscribe: {
              'dataRecordGetter': {
                onValueUpdate: [{
                  action: 'utilityService.getPropertyFromObject',
                  field: 'title'
                }]
              }
            }
          }
        },
// remember that we disposed of citation-title
        {
          class: 'RepeatableContributor',
          compClass: 'RepeatableContributorComponent',
          definition: {
            name: "creators",
            canSort: true,
            skipClone: ['showHeader', 'initialValue'],
            disabledExpression: '<%= _.isEmpty(relatedRecordId) %>',
            forceClone: [{
                field: 'vocabField',
                skipClone: ['injector']
              }
            ],
            fields: [{
              class: 'ContributorField',
              showHeader: true,
              definition: {
                required: false,
                label: '@dataPublication-creators',
                help: '@dataPublication-creators-help',
                freeText: true,
                splitNames: true,
                familyNameHdr: '@dmpt-people-family-hdr',
                givenNameHdr: '@dmpt-people-given-hdr',
                nameColHdr: '@dmpt-people-tab-name-hdr',
                emailColHdr: '@dmpt-people-tab-email-hdr',
                orcidColHdr: '@dmpt-people-tab-orcid-hdr',
                publish: {
                  onValueUpdate: {
                    modelEventSource: 'valueChanges'
                  }
                },
                activeValidators: {}
              }
            }],
            subscribe: {
              'dataRecordGetter': {
                onValueUpdate: [{
                  action: 'utilityService.getPropertyFromObjectConcat',
                  field: ['contributor_ci', 'contributor_data_manager', 'contributors', 'contributor_supervisors']
                }]
              }
            }
          }
        },
        {
          class: 'TextField',
          definition: {
            name: 'citation_publisher',
            label: '@dataPublication-citation-publisher',
            help: '@dataPublication-citation-publisher-help',
            defaultValue: '@dataPublication-citation-publisher-default',
            type: 'text',
            required: true,
            disabledExpression: '<%= _.isEmpty(relatedRecordId) %>'
          }
        },
        {
          class: 'LinkValueComponent',
          definition: {
            name: 'citation_url',
            label: '@dataPublication-citation-url',
            help: '@dataPublication-citation-url-help',
            type: 'text',
            disabledExpression: '<%= _.isEmpty(relatedRecordId) %>'
          }
        },
        {
          class: 'DateTime',
          definition: {
            name: "citation_publication_date",
            label: "@dataPublication-citation-publication-date",
            help: '@dataPublication-citation-publication-datel-help',
            datePickerOpts: {
              format: 'dd/mm/yyyy',
              icon: 'fa fa-calendar',
              autoclose: true
            },
            timePickerOpts: false,
            hasClearButton: false,
            valueFormat: 'YYYY-MM-DD',
            displayFormat: 'L',
            disabledExpression: '<%= _.isEmpty(relatedRecordId) %>',
            subscribe: {
              'dataRecordGetter': {
                onValueUpdate: [{
                  action: 'utilityService.todaysDate',
                  format: 'YYYY-MM-DD'
                }]
              }
            }
          }
        },
        {
          class: 'TextField',
          definition: {
            name: 'citation_doi',
            label: '@dataPublication-citation-identifier',
            type: 'text',
            readOnly:true,
            subscribe: {
              'form': {
                onValueChange: [
                  {
                    action: 'utilityService.runTemplate',
                    template: '<%= _.join(_.map(_.filter(_.get(data, "creators"), (c) => {return !_.isEmpty(c.family_name) || !_.isEmpty(c.given_name)}), (c)=> {return !_.isEmpty(c.family_name) || !_.isEmpty(c.given_name) ? ((c.family_name ? c.family_name : "") + ", " + (c.given_name ? c.given_name : "")) : "" }), "; ") + " ("+ moment(_.get(data, "citation_publication_date")).format("YYYY") + "): " + _.get(data, "title") + ". " + _.get(data, "citation_publisher") + ". {ID_WILL_BE_HERE}" %>'
                  }
                ]
              }
            }
          }
        },
        {
          class: 'HiddenValue',
          compClass: 'HiddenValueComponent',
          definition: {
            name: 'dataowner_name',
            subscribe: {
              'dataRecordGetter': {
                onValueUpdate: [{
                  action: 'utilityService.getPropertyFromObject',
                  field: 'dataowner_name'
                }]
              }
            }
          }
        },
        {
          class: 'HiddenValue',
          compClass: 'HiddenValueComponent',
          definition: {
            name: 'dataowner_email',
            subscribe: {
              'dataRecordGetter': {
                onValueUpdate: [{
                  action: 'utilityService.getPropertyFromObject',
                  field: 'dataowner_email'
                }]
              }
            }
          }
        },
        {
          class: 'HiddenValue',
          compClass: 'HiddenValueComponent',
          definition: {
            name: 'contributor_ci',
            subscribe: {
              'dataRecordGetter': {
                onValueUpdate: [{
                  action: 'utilityService.getPropertyFromObject',
                  field: 'contributor_ci'
                }]
              }
            }
          }
        },
        {
          class: 'HiddenValue',
          compClass: 'HiddenValueComponent',
          definition: {
            name: 'contributor_data_manager',
            subscribe: {
              'dataRecordGetter': {
                onValueUpdate: [{
                  action: 'utilityService.getPropertyFromObject',
                  field: 'contributor_data_manager'
                }]
              }
            }
          }
        },
        {
          class: 'HiddenValue',
          compClass: 'HiddenValueComponent',
          definition: {
            name: 'contributor_supervisors',
            subscribe: {
              'dataRecordGetter': {
                onValueUpdate: [{
                  action: 'utilityService.getPropertyFromObject',
                  field: 'contributor_supervisors'
                }]
              }
            }
          }
        }
      ]
    }
  }
];

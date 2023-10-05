# ctw-component-library

## 1.69.1

### Patch Changes

- 55dc4609: Fix casing for adt table.
- dfe0cdfb: Show patient subscription information on summary tab. Also fix an issue with not showing observations in diagnostic search results.

## 1.69.0

### Minor Changes

- 039bc97f: Add to ADT Table drawer, an Encounters & Notes section to display the CommonWell/Carequality version of the ADT encounter.

## 1.68.14

### Patch Changes

- 09d6e295: Add ability to filter by location.

## 1.68.13

### Patch Changes

- 95bab4b0: Fix issue with observations not showing up in drawer for diagnostic result search results.

## 1.68.12

### Patch Changes

- 5f1a2c2b: Fix type issue where type is incorrect.

## 1.68.11

### Patch Changes

- 9dd57fdf: IFrame theme is passed to iframe with CTWProviderProps to fix a UX bug caused by the iframe ZAPs ThemeProvider having different context value than the parent window ThemeProvider.

## 1.68.10

### Patch Changes

- 84eeab06: Fix bug where ccda date is off by one day.

## 1.68.9

### Patch Changes

- e457472f: Add Overview tab for users with access to search.

## 1.68.8

### Patch Changes

- ac4e23c8: Update patient-history endpoint

## 1.68.7

### Patch Changes

- 8886a7f9: Fix issue where having no UPID causes clients apps to crash.

## 1.68.6

### Patch Changes

- e52111ac: Fix status check on immunizations and improving de-duping logic for care team.

## 1.68.5

### Patch Changes

- 70d85f63: Update care team component and only show completed immunizations.
- f6e870f2: Show clinical notes in document details drawer.

## 1.68.4

### Patch Changes

- 3f7593fb: Refactor data access for diagnostic reports.
- 3e4345bd: Refactor data access for encounters and documents.

## 1.68.3

### Patch Changes

- f5b0236a: Add ability to show dismissed records via filter.

## 1.68.2

### Patch Changes

- 3804825f: Adds ability to read and dismiss records.

## 1.68.1

### Patch Changes

- d2946def: Fix whitespace breaking on "add filter" dropdown.

## 1.68.0

### Minor Changes

- dac8f017: Styled ZAP and Drawer for sub 400px viewports.

### Patch Changes

- ea8ecddb: Add tracking events for the ADT table.

## 1.67.4

### Patch Changes

- 835209e8: Fix issue with condition drawer in search results

## 1.67.3

### Patch Changes

- fb673842: Fix relevant content where spans are empty

## 1.67.2

### Patch Changes

- a17eb193: Fix use patient query by only running it if patientId is provided.
- f4dab1c5: Code refactoring to make resource drawers more extensible.
- 71d1bb55: Add diagnostic reports to search results.
- 34bd51dc: Move search to a tab in the ZAP.
- 934f9696: Enable semantic and generative AI search results.

## 1.67.1

### Patch Changes

- e5f85d1e: Export fhir action helper.

## 1.67.0

### Minor Changes

- f3ecf16f: Add filtering capablities to ADT table.

### Patch Changes

- d7e31e4d: Display 'Sourced from EHR Network' instead of 'Unknown' for third party data that doesn't have a manging org.

## 1.66.0

### Minor Changes

- dd0758b6: Remove version history from resource history drawer

## 1.65.17

### Patch Changes

- 27d54932: Fix sorting logic for document dates
- 2eadd9cb: Update to display in encounters & documents components.

## 1.65.16

### Patch Changes

- 007a1ee9: Add full pagination to ADT table.
- 4a9d23e1: Add letterSpacing and fontWeight to iframeTheme Props

## 1.65.15

### Patch Changes

- b3c0a641: Fix error state in search component.
- aba449c6: Address various clinical note rendering issues

## 1.65.14

### Patch Changes

- 056c8e8d: Fixed issue where clinical notes were not visible

## 1.65.13

### Patch Changes

- 856d6bae: Show discharge disposition in encounter table if available
- d37007a6: Adds default sort and sorting settings to the ADT table

## 1.65.12

### Patch Changes

- 5d8b5aa2: Improvements to search UI

## 1.65.11

### Patch Changes

- 44d0a431: Refactored out redundant useEffect in PatientSearch.

## 1.65.10

### Patch Changes

- f7e85a43: Fix ADT table empty message and animation for opening drawers.
- d19aab56: Transpose wide tables in drawer for better readability
- 889464f1: Only show one date if encounter start and end dates are the same

## 1.65.9

### Patch Changes

- 97e6ca6d: Wrapped SearchPatientRecords onSubmit handler in useCallback.

## 1.65.8

### Patch Changes

- 893da9a1: Dedupe ADT table.

## 1.65.7

### Patch Changes

- abbe7f1a: Refactor and add relative time based views to the ADT table.

## 1.65.6

### Patch Changes

- 03975654: Add ability to override zus aggregate profile header with more config options.

## 1.65.5

### Patch Changes

- 704420ab: Add some missing spaces in the ADT drawer table.

## 1.65.4

### Patch Changes

- 871a76eb: Exports the ADT drawer.

## 1.65.3

### Patch Changes

- f5689b7d: Export encounterModel.

## 1.65.2

### Patch Changes

- 2c18ca57: Update encountermodel and table.

## 1.65.1

### Patch Changes

- 2973ed1c: ZusIcon viewport dynamically adjusts based on whether "zus" text is visible.

## 1.65.0

### Minor Changes

- e19cb86f: ZusIcon includes zus name only with prop "includeZusText"

## 1.64.0

### Minor Changes

- 78c716a4: Export ZusIcon

### Patch Changes

- 63554009: Fix display of delete confirmation modal.
- 232a8f56: Add columns to ADT table

## 1.63.1

### Patch Changes

- e2eb5cd9: Show empty table if test patient and no pt hx requests have been made
- 37e7e3bb: Hide last patient history request for test patients

## 1.63.0

### Minor Changes

- 0fedb2ff: Support onRecordSave for medications components in the iframe ZAP.

## 1.62.0

### Minor Changes

- e3e05117: Rewire the table to read from snowflake data.

### Patch Changes

- 1ca4d013: Add more user interaction tracking.

## 1.61.2

### Patch Changes

- 2b6bfc42: Fix medications search result width

## 1.61.1

### Patch Changes

- c44b9d55: Fixed PatientRecordSearch results heading and vertical spacing styles.

## 1.61.0

### Minor Changes

- 965ec255: Added AISearch poc component

## 1.60.5

### Patch Changes

- 85b80dca: Export fqs client.

## 1.60.4

### Patch Changes

- e1dd6592: Display notes more securely and scroll upon overflow in a note.
- 51d268af: Expose use-ctw hook.
- 069f5c3b: Increase security for displaying CCDA docs.

## 1.60.3

### Patch Changes

- 32fc03d7: Remove sanitize-html in favor of DOMPurify

## 1.60.2

### Patch Changes

- 678c7b82: Fix open_drawer analytic to send drawer name.

## 1.60.1

### Patch Changes

- fccfad34: Dedupes encounters.

## 1.60.0

### Minor Changes

- 5964ff23: Added Note Type filtering to Encounters

## 1.59.0

### Minor Changes

- 78dae2fc: CTWProvider theme now accepts optional `iframe` theming to support custom fonts for the embedded ZAP.

## 1.58.1

### Patch Changes

- fbaf450e: Add export capablities for the table.

## 1.58.0

### Minor Changes

- 2aceeb90: Adding an ADT alert table for patients that were recently discharged.

## 1.57.3

### Patch Changes

- 9c04fbb4: Add 100 percent height to fix height issue in iframe.

## 1.57.2

### Patch Changes

- 444b9953: Allow the unread encounters notification icon to show up outside of the components.
- aa1e7b1f: Address issue where observations with a value of 0 do not render

## 1.57.1

### Patch Changes

- 7d61f31c: Remove default filter from the Conditions table that shows all conditions.

## 1.57.0

### Minor Changes

- 23f153ca: Introduce a med dispense component that dictates refill pickup.

## 1.56.3

### Patch Changes

- 6bf2611d: Bump @storybook/test-runner from 0.11.0 to 0.13.0

## 1.56.2

### Patch Changes

- 55e9da0b: Resolved issue with encounters showing "no data" before data was requested
- 14f93046: Updated "Add Filters" button to take up as much space as the dropdown menu it opens

## 1.56.1

### Patch Changes

- abb36563: Fix dropdown alignment bug in ZAP.
- 1e570c05: Added AnalyticsProvider and useAnalytics hook.
- 76fcb62f: For conditions table, add time-based view and a status filter that adjusts its options based on that.

## 1.56.0

### Minor Changes

- 19a3e19c: Updated Medication Last Fill Date sort text
- 2863f8d1: Add telemetry metrics for source document and notes

## 1.55.2

### Patch Changes

- e38a1b5e: Resolved various responsive styling issues with the sort + filter bar

## 1.55.1

### Patch Changes

- fc3118b3: Fix double loading encounters from FQS in both ZAP and Encounters & Notes component
- ed1bbd4f: Use deepClone to copy function param so they can be modified
- c3bce7fc: export resource table-actions component.

## 1.55.0

### Minor Changes

- 69338e37: Update date range and remove type field for encounters details drawer
- b66d2fc7: Filter out 'empty' clinical notes from Encounters & Notes component
- 63e3cfa0: Add functionality to Encounters & Notes table, including unread notifactions and the ability to dismiss or mark as viewed.
  Additionally, makes the "Mark as Viewed" button appear disabled to Zus employees.

### Patch Changes

- 97528b07: Add speciality to the encounter provider column.

## 1.54.0

### Minor Changes

- 03b766ed: Remove ODS related queries for upid-based fetching for all resources.

### Patch Changes

- 1407148e: Fixed flexbox table width bug in Firefox

## 1.53.1

### Patch Changes

- 4ef61e93: Unit tests for whether a resource has a renderable document.

## 1.53.0

### Minor Changes

- 832faab1: Added analytics reporting to Telemetry class

## 1.52.0

### Minor Changes

- 0c2d0fe6: Update telemetry metrics to support Encounters & Notes monitoring

## 1.51.0

### Minor Changes

- c5e680ad: Remove beta indicator for Encounters & Notes

### Patch Changes

- ff1103c0: In drawers, do not show the Source Document link when the document is not renderable.
- 22e68219: Show all "Show Document" buttons even if unrenderable, to prevent bug where the button does not appear for renderable documents.

## 1.50.1

### Patch Changes

- 6fde67b7: In drawers, do not show the Source Document link when the document is not renderable.

## 1.50.0

### Minor Changes

- b08c9b43: Rename ZusAggregatedProfileIframe to ZusAggregatedProfileIFrame

## 1.49.0

### Minor Changes

- d4a0645c: Added component ZusAggregatedProfileIframe.
  Addressed SSR telemetry issue.
  Fixed theme bug where sometimes CSS vars --ctw-white and --ctw-black had NaN in them.
- 00414ce7: Update index.ts

## 1.48.0

### Minor Changes

- 1e4ba69f: Create new Encounters & Notes component and remove Timeline from MegaZAP

## 1.47.4

### Patch Changes

- 53762c16: Add ability to track trend activity.

## 1.47.3

### Patch Changes

- 17f20e11: The dropdown for hidden tabs will re-align themselves if there's no room to their right.

## 1.47.2

### Patch Changes

- c69c3cf5: Improve appearance of ZAP's "More" button, disallowing wrapping and enforcing font size consistency with the tabs.

## 1.47.1

### Patch Changes

- fa136b59: Add more labs for the trending feature.

## 1.47.0

### Minor Changes

- 41d766bb: Add ability to link the respective observation that is found in the trending feature.

## 1.46.0

### Minor Changes

- a0782f7e: No longer show incorrectly coded glucose trends

## 1.45.8

### Patch Changes

- 84717c08: Added support for contained resources to Diagnostics Report Drawer

## 1.45.7

### Patch Changes

- b4911c58: Add date range view to medications component

## 1.45.6

### Patch Changes

- 21fb1c67: Remove the beta label from timeline.

## 1.45.5

### Patch Changes

- cf13358b: Update the loinc codes for more trending features.
- 1bc578eb: Add support for more observation value types.

## 1.45.4

### Patch Changes

- 2a5b770e: Fix capitalization logic for resource table titles.
- 0875afdd: Fix show all for the diagnostic report.

## 1.45.3

### Patch Changes

- e2b39aa0: Updated trending indicator display on small breakpoints

## 1.45.2

### Patch Changes

- 7c75a854: Add trending feature to lipid data.

## 1.45.1

### Patch Changes

- 0ba334f0: Reverted "Remove the load more feature in the diagnostic report drawer."

## 1.45.0

### Minor Changes

- 6d287e57: Added trend indicator to Diagnostic Report component results

## 1.44.2

### Patch Changes

- 91643026: Remove the load more feature in the diagnostic report drawer.

## 1.44.1

### Patch Changes

- e613bd0f: Add table row actions to details drawer (dismiss/add/mark as new/etc).

## 1.44.0

### Minor Changes

- f65b1625: Add ability to remove title and border from patient history table.

## 1.43.0

### Minor Changes

- c57bc0e2: Display records never requested

### Patch Changes

- 03fbf338: Fix diagnostic-trend click count.
- 1320ddc6: Only toggle read when adding a condition or medication if the record is not yet marked as having been read.

## 1.42.0

### Minor Changes

- 4b9e56a8: Removed beta label from Diagnostic Report tab in ZAP

## 1.41.0

### Minor Changes

- 271a3355: Added user_id to telemetry metrics

### Patch Changes

- 2fd3affc: Add click count for diagnostic reports.
- 93d86d3c: Cleanup of telemetry namespace dataset attributes

## 1.40.0

### Minor Changes

- f67aeb59: Add empty state to care team component

## 1.39.1

### Patch Changes

- c7e5bba9: Updated trending labs logic to include Patients created on 07/19/2023

## 1.39.0

### Minor Changes

- a1f9114f: Add unique session tracking whenever an interaction is made.
  Track drawer opens metrics by drawer type.

## 1.38.0

### Minor Changes

- 0394910b: Only fetch trend data when a Patient was created after 07/19/2023

## 1.37.2

### Patch Changes

- 2df4dd3d: Switched ctw urls to use app.zushealth.com.

## 1.37.1

### Patch Changes

- 0743ae85: Updated Observations query to filter by system/code
- a7d34bd5: Show number of results available for diagnostic reports.

## 1.37.0

### Minor Changes

- bba15492: Updated FQS Observations query to include filtering by code

### Patch Changes

- 34f1deee: Set default resources for ZAP.
- 56aaa434: Make unknown condition type display as "Unknown".
- 0a8aa100: Improve responsiveness of ZAP tabs to collapse overflowed tabs into a more menu.

## 1.36.1

### Patch Changes

- 417bd27d: Resolved issue where empty filter made Observation request invalid

## 1.36.0

### Minor Changes

- 5a05fd21: Removed first-party filter from FQS request when fetching observations and cleaned up corresponding telemetry

### Patch Changes

- 8d6795d8: Add DD metric logging.

## 1.35.4

### Patch Changes

- 6eaf775d: Updated Observation trend value to be bold for currently selected trend

## 1.35.3

### Patch Changes

- e0c0a713: Export types for CTWProvider and PatientProvider props.

## 1.35.2

### Patch Changes

- 6e5fd6a2: Add filter for condition CCI code

## 1.35.1

### Patch Changes

- eb22eabb: Resolved bug with lab trend values

## 1.35.0

### Minor Changes

- 8c9d03c6: Update the diagnostic report component with deduping logic.

## 1.34.1

### Patch Changes

- bd191657: Add UnreadRecordsNotification to alert users if there are any unread records for a patient across multiple resource types.

## 1.34.0

### Minor Changes

- 2ac573b7: Added trend data to Glucose and A1C labs

### Patch Changes

- e9b13066: Remove role field from dropdown and default to SNOMED 158965000 for role.

## 1.33.0

### Minor Changes

- 54703a9b: Add empty state to new conditions and meds components

## 1.32.1

### Patch Changes

- b9f02c2c: Update sorting for document component.
- 922acdaf: Improve surfacing category text/display and avoid showing category codes.

## 1.32.0

### Minor Changes

- b40d007c: Expand empty table display to include requesting records
- 783ce18c: Update storybook tests to include FQS queries.

### Patch Changes

- fd0c38fe: Update condition history details and history card null states.
- ce476a80: Change default colors to use Zus theme.

## 1.31.1

### Patch Changes

- 664f7764: Increase specificity of unread/dismiss selectors.
- dd32be7b: Fix issues with new meds component read/dismiss as well as capitalization of medication display

## 1.31.0

### Minor Changes

- 3dc690c4: Add a request header to FQS requests.

## 1.30.2

### Patch Changes

- 781bd9e3: Use semibold for unread records.
- 8ff01263: Add PatientMedicationsAll component which displays builder and outside medications in the same table.

## 1.30.1

### Patch Changes

- 4d8085d3: Specify zap tab ordering.

## 1.30.0

### Minor Changes

- 9b9cebdc: Add diagnostic reports component and drop observation components.

### Patch Changes

- 8384f06a: Add dismissed records filter for documents component.
- 3239a51d: Add PatientConditionsAll component which displays builder and outside conditions in the same table.
- b2f4745a: Fix document details list style (force disc/bullets).

## 1.29.0

### Minor Changes

- 953f2ce5: Update empty display for immunizations component

### Patch Changes

- 577e6ab8: Fixed FQS-based Diagnostic Reports "all" query

## 1.28.5

### Patch Changes

- 1d3a4524: Revamp documents component (add sort, encounter date, cleanup details).
- 2fa31cb7: Add encounter date to dedupe document logic.

## 1.28.4

### Patch Changes

- 4a50eab0: Resolved incorrect fqs tags on some component metrics

## 1.28.3

### Patch Changes

- 2ae44af3: Add UnreadDocumentsNotification to exported components.

## 1.28.2

### Patch Changes

- b55c825d: Refactor unread notifications and expose className.
- ab6088ed: Making "View FHIR" button a generic feature in ResourceTable and adding the functionality for documents.

## 1.28.1

### Patch Changes

- c4976b13: Add className for UnreadNotification component.

## 1.28.0

### Minor Changes

- d25aa290: Update empty table displays to differentiate between no queried data vs no data due to filters

### Patch Changes

- f5cc3711: Remove padding from top of allergies/documents/immunizations/timeline.
- d1c49cdb: Making "View FHIR" button a generic feature in ResourceTable.

## 1.27.10

### Patch Changes

- 4428ba51: Use matching unleash environment.

## 1.27.9

### Patch Changes

- 63ce552f: Forcing medication history results to be sorted by resource ID before de-duplicating.
- 06196609: Add not authorized error message.

## 1.27.8

### Patch Changes

- b6e8c774: Fix careteams drawer issue.

## 1.27.7

### Patch Changes

- 6f3c58c8: Pull the dispense request performing organization data in medication request FQS query

## 1.27.6

### Patch Changes

- 778bafb1: Fix issue where patient history table crashes due to patients being deleted.

## 1.27.5

### Patch Changes

- 3cc59c28: Expand the medication prescriber reference in medication request FQS query

## 1.27.4

### Patch Changes

- b79b0e4a: Export unread allergy/immunization indicators"

## 1.27.3

### Patch Changes

- b69fa916: Fix cache issue for outside medications history requests
- a48e3d51: Add hostname to feature-flag context.

## 1.27.2

### Patch Changes

- ecaca91f: Update immunization component - read/unread, dismiss, updates to columns, default sort, additional data in details drawer.
- cbca00c3: Fix errors in medication administration FQS query
- ce82c34c: Bump prettier-plugin-tailwindcss from 0.1.13 to 0.3.0

## 1.27.1

### Patch Changes

- c08c83c5: Fix styling on notification icons.

## 1.27.0

### Minor Changes

- 8856e90b: Use data from FQS queries that return errors and data

### Patch Changes

- 56ca29a6: Prevent non-builder users from being able to mark records as read in production.

## 1.26.5

### Patch Changes

- e01d88e3: Fetch all types of values for observations from FQS. This fixes an issue where some diagnostic report observations don't show any results.

## 1.26.4

### Patch Changes

- 21a83a76: Add notification to allergy tab in ZAP indicating unread allergies. Modify outside conditions/medications count badge to display notification.

## 1.26.3

### Patch Changes

- a718e438: Fix provenance query for FQS in the drawer.

## 1.26.2

### Patch Changes

- 3bd05c15: Distinguish builder and outside data in allergy component. Add "Dismiss" and "Mark as Read" functionality to allergy component.

## 1.26.1

### Patch Changes

- 061b48b0: Update graphql queries to include extensions.

## 1.26.0

### Minor Changes

- bc3fe1dc: Rewire the careteams component with FQS.

### Patch Changes

- b426028f: Update provenance to handle post-kludge data.

## 1.25.0

### Minor Changes

- a33f1f2b: Add useHistory variant to useHistory hook for enabling FQS.

## 1.24.0

### Minor Changes

- 4d77b89b: Add managing organization to medication statement FQS queries
- 45c813ee: Use summary tag in medication lens query instead of ActiveMedication tag

### Patch Changes

- a0e46a38: Enable fetching provenances from FQS if "provenances" feature-flag variant is enabled.
- e10b3e9a: Don't filter out resources without dates

## 1.23.4

### Patch Changes

- b0dc8817: Bump @storybook/test-runner from 0.10.0 to 0.11.0
- 19cd88c0: Update conditionHistory entries to contain ManagingOrganization.

## 1.23.3

### Patch Changes

- 860bb086: Alter filtering for allergies client side instead of server side temporarily.

## 1.23.2

### Patch Changes

- 7297d2fc: Add `unleash-proxy-client` to deps. It was previously listed as peer dep.

## 1.23.1

### Patch Changes

- 5706ff6d: Refactored FQS vs ODS query logic and removed all "drawer" specific feature variants. We'll instead use resource specific variants, regardless of which components do the data fetching.
- 7bb72d33: Fetch timeline data (encounters, diagnostic reports, observations) from FQS. This is behind a feature flag, default is to still fetch from ODS.

## 1.23.0

### Minor Changes

- 43f0a786: Allergies drawer requests use a separate toggle variant than the allergies table requests
- 4b2a7e0f: Conditions drawer requests use a separate toggle variant than the conditions table requests
- 4ef870b4: Medications drawer requests uses a separate toggle variant than medications table requests
- bf9cb114: Updated Immunizations component list view to pull feature flags directly from Unleash
- 773d86c4: Update useHistory hook to work with FQS. Additionally, rewire the versionsHistory to use FQS as well.

## 1.22.0

### Minor Changes

- d4e933a5: Updated medication components to read FQS feature flags directly from Unleash

## 1.21.0

### Minor Changes

- 0ad09ace: Updated usePatientDocument hook to fetch FQS feature flag directly from Unleash

### Patch Changes

- 61bfb6d6: Add text to codeable concepts in graphql queries"

## 1.20.0

### Minor Changes

- bc8f8c3c: Updated allergy components to read FQS feature flags directly from Unleash

### Patch Changes

- c56ccc70: Add ability to fetch provenances from FQS, currently disabled.

## 1.19.2

### Patch Changes

- 0616c5bb: Show documents with no creation date

## 1.19.1

### Patch Changes

- 2aba3de4: Bump vitest from 0.29.8 to 0.32.2
- 679a085d: Fix issue where no documents were rendered due to missing creation date

## 1.19.0

### Minor Changes

- 570a075e: Use FQS to fetch medication history data

### Patch Changes

- 84a202f6: Fixed issue where Unleash client was sometimes taking too long to load flags

## 1.18.1

### Patch Changes

- 8eef5459: Fixed race condition when fetching feature flags

## 1.18.0

### Minor Changes

- a0457d1a: Patient Conditions components now reach out to Unleash directly for feature flags

## 1.17.6

### Patch Changes

- d40f48dd: Pin @radix-ui/react-dropdown-menu to exact version.

## 1.17.5

### Patch Changes

- a5802742: Pin @radix-ui/react-dropdown-menu to patch version

## 1.17.4

### Patch Changes

- 05e81164: Downgrade radix to fix issue build issue. https://github.com/radix-ui/primitives/issues/2192

## 1.17.3

### Patch Changes

- f027eacf: alias @radix-ui/react-dropdown-menu to @zus/react-dropdown-menu to avoid install issues when clients have the library as well.

## 1.17.2

### Patch Changes

- b85e7dd8: Bump @storybook/addon-links from 7.0.18 to 7.0.20
- 81d56ae4: Export additional helpers to aid in creating new components
- 9094bb5d: Fixed medication sort directions for date based sorts.

## 1.17.1

### Patch Changes

- 4bfb2d04: Add metric for tracking FQS latency across all resources.

## 1.17.0

### Minor Changes

- 43de95c5: Add onResourceSave callback to CTWProvider context which will get called anytime a resource is modified (edited or created).

### Patch Changes

- 6a203085: List only renderable documents in document component

## 1.16.1

### Patch Changes

- 141411f6: Fix managingOrganization field for FQS enabled queries.

## 1.16.0

### Minor Changes

- 0982035c: Documents can now read from FQS with the new enableFQS prop.

### Patch Changes

- fbe56830: Fixed missing medicationLastPrescriber data when fetching medications from FQS
- c49023fc: Bump @kensho-technologies/eslint-config from 26.1.1 to 26.1.2

## 1.15.1

### Patch Changes

- 863181ea: Support "read-your-writes" from FQS by long-polling from FQS until it has the updated resource. This fixes a bug where we would refetch after a write but fetch stale data from FQS. For example, adding a new condition or editing an existing condition.

## 1.15.0

### Minor Changes

- e3f827ab: Update Allergies to utilize FQS.

### Patch Changes

- 892fecfa: Use document date before binary creation date when defining document's creation date

## 1.14.0

### Minor Changes

- c751a3b8: Update the diagnosticReport table to use FQS.
- f8d6be46: Update MedicationStatement queries to use FQS
- 2f1187de: Update the Immunizations component with FQS.

### Patch Changes

- a93e5269: fix: use rainbow cutover date to determine whether to show document
- f2b3832a: Bump postcss from 8.4.23 to 8.4.24
- 4c848fff: Bump @radix-ui/react-dropdown-menu from 2.0.4 to 2.0.5
- 210fdcea: Resolved issue where dismissed conditions running in FQS mode could never be restored

## 1.13.1

### Patch Changes

- fa1fb932: Fix bug when trying to save or update resources fetched from FQS.

## 1.13.0

### Minor Changes

- 4ac4c517: Add view filtering by date for timeline, documents, and outside medication components.

## 1.12.0

### Minor Changes

- 57e03269: Added `fhirWriteBackClient` to proxy creation of new FHIR resources through the ehr-data-integration server.

### Patch Changes

- 88c8d13c: Update some dependencies
- bdc77c6f: Fix case where CCDA viewer crashes

## 1.11.0

### Minor Changes

- de1c2c88: Add feature flag option to use FQS (Zus's GraphQL Fast-Query-Service) for fetching conditions.

### Patch Changes

- b411c5f3: Fix issue with superclusters loading too much data when FQS is enabled

## 1.10.4

### Patch Changes

- 5edc56c2: Dissmissing meds will now continue to show loading spinner until the meds data has been refreshed. This fixes a bug where we briefly show the stale, non-dismissed, state.

## 1.10.3

### Patch Changes

- f2b696a3: Fix issue with patient history api status box where date shows up in the past.

## 1.10.2

### Patch Changes

- 3e5dce3e: ProgressIcon uses ctw-animate-spin class

## 1.10.1

### Patch Changes

- a41a8101: Fix issue when patient history request recieves a number for last retrieved.

## 1.10.0

### Minor Changes

- 050753be: TimelineV2 is now Timeline and dropped V1
- 95ebb96b: Refactor CTWProvider context for readability

### Patch Changes

- f5b6ae07: Bump tsc-alias from 1.8.5 to 1.8.6
- 050753be: Rework storybook examples to show data again
- c278dde6: Don't count dismissed outside resources in badges

## 1.9.3

### Patch Changes

- 64f76b55: Bump postcss from 8.4.21 to 8.4.23
- f2809f21: Fix bug with dismiss/restore
- 2c6c9455: Bump i18next from 22.4.14 to 22.4.15

## 1.9.2

### Patch Changes

- 74deb10d: Fix issue where falling back to ODS does not occur when a FQS query fails

## 1.9.1

### Patch Changes

- fb89405a: Fix situation where FQS binary queries may fail

## 1.9.0

### Minor Changes

- 4111721e: Show spinner when dismissing or restoring outside conditions and medications

### Patch Changes

- b81c51a7: Use FQS for Binary Lookups
- 41379b19: Fix bug with fhir client base URL

## 1.8.0

### Minor Changes

- fcde05f4: Add a beta label to Care Team tab in ZAP

## 1.7.15

### Patch Changes

- 7f0f5093: Add target date to patient history table.

## 1.7.14

### Patch Changes

- 9c891d63: Update the details card for labs drawer.

## 1.7.13

### Patch Changes

- 96bd13b2: Updates labs drawer with changes.

## 1.7.12

### Patch Changes

- 4493ba77: Update Observation drawer table.

## 1.7.11

### Patch Changes

- 26181d8b: Sort patient list by last name.

## 1.7.10

### Patch Changes

- 4094dbd6: Add version to metrics so we can track what versions are being used.

## 1.7.9

### Patch Changes

- 7dbea9a2: Preserving server side total in response from searchBuilderRecords

## 1.7.8

### Patch Changes

- 6b9630e0: Add optional ehr to metrics.

## 1.7.7

### Patch Changes

- 4034716a: Fix display and date for diagnostic reports in table view

## 1.7.6

### Patch Changes

- 3a83c88c: Fixes issue with missing builder filter.

## 1.7.5

### Patch Changes

- 9b803fd4: Adjust metrics to distinguish record counts from timing.

## 1.7.4

### Patch Changes

- 6915e674: Add a way to invalidate all queries in the cache.

## 1.7.3

### Patch Changes

- f18efed5: Add beta label to timeline and fix timeline drawer bug.

## 1.7.2

### Patch Changes

- 2c5127d6: Add metrics for components crashing and stats on record counts.

## 1.7.1

### Patch Changes

- 54589e98: Some style fixes around patient history table.
- 48fc83c3: Fix issue where error occurred when patient had never made any patient history requests.
- 20622f0e: Improve condition history drawer load time

## 1.7.0

### Minor Changes

- b4c1056e: Revert metric updates.

## 1.6.1

### Patch Changes

- 88aad92b: Fix bug where in_progress and done_with_errors don't filter correctly in patient history table.

## 1.6.0

### Minor Changes

- 2c61eeed: Convert to all patient history requests to new JSON compliant api endpoints. Fix bug where not all patient history results came back due to looping over patients first instead of messages. UI fixes for patient history table.

### Patch Changes

- c4abc11f: Add metrics for loading components, crashed components and record counts in the ZAP.

## 1.5.1

### Patch Changes

- 79d0cceb: Export beta label component

## 1.5.0

### Minor Changes

- e55af4f9: Removed RUM. No longer tracking interactions when someone focuses a form field

## 1.4.2

### Patch Changes

- 025918eb: Fix filtering logic for documentReferences in the table.
- 88300b89: Fixed word break on beta label

## 1.4.1

### Patch Changes

- bcf027f8: Fix date formatting and sorting on patient history requests
- 75146f0e: Update endpoint to schedule patient history jobs to newer JSON compliant endpoint.

## 1.4.0

### Minor Changes

- 64634389: Add beta tags in the ZAP and Patient Timeline V2 dropdown.

## 1.3.7

### Patch Changes

- 5b1c0eb9: Add source document link to observation drawer
- 93406b4c: Update search helpers to support Zus refactoring to store 3rd party data in dedicated builders.
- 17e2143a: Make condition display value bold.

## 1.3.6

### Patch Changes

- 6f957227: Fix deduping on allergies.

## 1.3.5

### Patch Changes

- e38b935b: Fix issue where when there are no messages results were still shown.

## 1.3.4

### Patch Changes

- 66b98a02: use useQueryWithCTW instead of useQueryWithPatient in patient history table.

## 1.3.3

### Patch Changes

- 9bdb7ea0: Use reaction consistently as opposed to manifestation.

## 1.3.2

### Patch Changes

- f2e2e977: Fix issue where allergies were not sorted correctly
- d0610b37: Export patient history table. Add handleClickRow handler to table.
- f62ec0e4: Fix last retrieved date spacing.

## 1.3.1

### Patch Changes

- 65b02800: Remove allergy category based on user feedback

## 1.3.0

### Minor Changes

- 7446b534: Add POC patient history table.

### Patch Changes

- 2665cb84: Sort Allergies by name
- 93284e0f: Fix bug where multiple patient history requests are sent out.

## 1.2.1

### Patch Changes

- fa3f2d01: Fix bug where opening successive drawers outside of zap component causes apps to crash.
- 91c99686: Show patient history status in the ZAP. If an error occurs in the drawer before patient history status is senet off show it before closing drawer.

## 1.2.0

### Minor Changes

- 5ae8eb08: Added prop "includePatientDemographicsForm" to ZAP and Request patient history.
  Added hidden field "id" to patient demographics form which just fills in patient ID.
  Patient history requests now go through EHR-Data proxy.

## 1.1.8

### Patch Changes

- 35ac152c: Fix bug with source document for care teams and immunizations.

## 1.1.7

### Patch Changes

- 61fed282: Update a few packages, including storybook to 7.0.
- 3c2140bf: Fix linting issues.
- ac3406e5: Update allergies table/drawers/history.
- fc95c908: Fix lock file build issues

## 1.1.6

### Patch Changes

- 00d01a45: Refactors medication details drawer and cleans up UI.
- 813a8e30: Fix source document linking issue.

## 1.1.5

### Patch Changes

- 685808fd: Adjust storybook/addon-actions to be dev dependency.

## 1.1.4

### Patch Changes

- 53e4d005: Move patch-package from devDependencies to dependencies.

## 1.1.3

### Patch Changes

- 6f6498c6: Fix graphql dependencies to work for SSR.
- 0402578c: Show request records button in top right of ZAP.
  Fix issue where tables show infinite loading spinner when patient is not found.
- c3d7fb5b: Rework how we attach modals/drawers to the document. We now setup headlessui-portal-root to be a direct child of body instead of a child of CTWProvider.
- eb9941d9: CareTeamPractitionerModel now uses "key" for table row identification.

## 1.1.2

### Patch Changes

- 207f994f: Remove relative deps from package json.
- 4973f8e3: Add flag to enable FQS on allergies.

## 1.1.1

### Patch Changes

- 4b55b511: Cleanup condition details/history drawer UI and fix a few minor bugs w.r.t "entered-in-error" conditions. This also sets up a generic details & history drawer to standardize other resource components.
- eb02baaa: Add export for timeline.

## 1.1.0

### Minor Changes

- bbe3c9ab: Add Multi-resource timeline component.

## 1.0.0

### Major Changes

- 8f638ef9: Given where we are with maturity and stability we are now ready to release 1.0!

## 0.51.1

### Patch Changes

- a2451acb: Tweak "Show Dismissed Records" filter to be below divider and to then show up as "Hide Dismissed Records" when it has been applied.

## 0.51.0

### Minor Changes

- 0aeecb51: Refactor medication components. PatientMedications is now PatientMedicationsProfile which will show both the patient record and the outside medication tables.

### Patch Changes

- 0aeecb51: Patient medications now has a "view" selector where you can view "Current", "Past", or "All" medications.
- 1b819762: Added ctw-scrollable-pass-through-height class to medications component.
- 0aeecb51: Dismissed conditions will now render faded and still show their original status (e.g. "Active").
- bd4e3503: Request records now appears in empty table state when patient has never made request to patient history api.
- 0aeecb51: Medication tables will now show all information when stacked view for responsive/small width.

## 0.50.4

### Patch Changes

- e8455bcd: Add PatientObservations component (POC)
- 6f9aaf18: Added .ctw-scrollable-pass-through-height and .ctw-scrollable-content classes.
  Added scrolling to all current components used in ZusAggregatedProfile.
- e8455bcd: Cleanup refactor of Observations POC

## 0.50.3

### Patch Changes

- 2355541e: Change allergy label and add option to override outside medications tab name
- aa249a7c: Fix bug where patient list wasn't always showing all patients for some consumers.
- 81e86724: Fix the use of tag:not filtering for resources.

## 0.50.2

### Patch Changes

- 54c1bbdf: Filter builder tagged records client side in bid to improve performance.
- bd7be90e: Add PatientObservations component (POC)
- 148b35ad: Add rule to sort nodash exports

## 0.50.1

### Patch Changes

- 99427304: Fix view fhir to default to false.

## 0.50.0

### Minor Changes

- d5270538: Update CareTeams to each row being an individual practitioner and then the drawer having details about the practitioner.

### Patch Changes

- bf27c1ed: Add all condition statuses as filter options and ensure we can filter on "Unknown" status for both patient records and outside records.

## 0.49.8

### Patch Changes

- 97724c64: Fix a few more style issues for filters.

## 0.49.7

### Patch Changes

- d96d0513: Initial setup of i18n using the i18next library. At first, we allow overwriting the term "condition" via the new "locals" prop on `CTWProvider`. Future versions will allow for more customizations around text/copy/strings.
- da22b889: Clean up sort & filter dropdown UI. Align styles across dropdowns, switch icons, and a handful of general cleanup tweaks.
- 487f0ed2: Allow phone numbers to have a leading 1 and country codes.

## 0.49.6

### Patch Changes

- 1cfea1b5: Display Zus status instead of clinical and verification status.

## 0.49.5

### Patch Changes

- c60802d1: Re-add builder `_tag` to filters to fix issue with CPR records being duplicated.

## 0.49.4

### Patch Changes

- 0db1341a: Remove condition display from dedupe logic in condition history.
- 7ee58623: Fix alignment and size of status dots. Add underline on display when hovering on items in medication table.
- 46e0288d: Minor ui changes to patient search.
- df8be0d2: Disable metrics to ctw from localhost:3000.

## 0.49.3

### Patch Changes

- cfdca38a: Adjust display values for columns in conditions component.

## 0.49.2

### Patch Changes

- cb384ccf: Paginate metric is not unique by page

## 0.49.1

### Patch Changes

- 6b704286: Fix CSS issue in Safari that prevented certain buttons/links from being visible (like the "Add Patient" link).
- a6d57c50: Cache requests for authTokenURL. This fixes a race condition where on page load we could send multiple redundant requests.

## 0.49.0

### Minor Changes

- a174c79d: Large refactor of conditions component using new naming scheme and a few generic helpers.

#### Breaking Changes

`PatientConditions` component has been renamed `PatientConditionsProfile`. This component shows two tabs, one for patient record and one for outside records. To get a table of just the patient record, you can now use the new `PatientConditions` component.

### Patch Changes

- 0b4cc18c: Add new method to `Telemetry.reportMetric` that will send metrics with tags to CTW /report/metric endpoint.Add async wrapper `withTimerMetric` that will report the performance of an async function.

## 0.48.8

### Patch Changes

- 830f888e: Lock headless ui version.

## 0.48.7

### Patch Changes

- 105211fc: Remove total from patient search. Fix minor style errors in patient search.
- e3c22aed: Remove builder tag from `_tag` filters.

## 0.48.6

### Patch Changes

- e842bfcf: Add more info the options in patient search. Expose prop needed to make patient search work.

## 0.48.5

### Patch Changes

- 2ab8798f: Remove Graphql to avoid build errors.
- 97c1a1db: Add ability to manage feature toggles via ctw provider.

## 0.48.4

### Patch Changes

- cb98edb6: Export patientSearch component.

## 0.48.3

### Patch Changes

- d9191657: Add patient search component.

## 0.48.2

### Patch Changes

- 01c1d0f7: Fix request records logic.
- a51b4046: Add Request Records to ZAP and conditions components.

## 0.48.1

### Patch Changes

- 20b95783: Add ZusAggregatedProfile component.

## 0.48.0

### Minor Changes

- 3ec7dba7: Create careTeam component.
- 949cb7c8: Remove old conditions & medications components in favor of new design with tabs for patient records and other provider records.

### Patch Changes

- be808188: Add generic sort button. Add sort button to medications component.

## 0.47.2

### Patch Changes

- ef176fcc: Set x padding on tabs component buttons

## 0.47.1

### Patch Changes

- f2277a2b: Telemetry wrapper on Allergies, Immunizations and Documents.
  Remove heading titles from Immunizations and Documents.
  Remove inner padding on PatientsTable.
- 17c3c9bd: Fix bug where default sort was not sorting correctly.

## 0.47.0

### Minor Changes

- 6f5345c9: Create component to show documents and their associated binaries for the patient.

### Patch Changes

- b3b0768d: Add headers to patient timeline columns. Adjust data displayed, particularly how "Type" is computed.
- 59d3808f: Storybook mocked requests cleanup after themselves.
- 57651b56: Add logging when our form fails our validation, so that consumers of library can debug better.

## 0.46.9

### Patch Changes

- 1d38ec5e: Flatten sorts object.
- b4a317d6: Create generic filter utility.
- b4a317d6: Automatically open select and checkbox filters when adding from filter button.
- 2aefff35: Remove padding that is added by default.

## 0.46.8

### Patch Changes

- 8ebcdc1a: Expose `DrawerFormWithFields`.

## 0.46.7

### Patch Changes

- 0e5fa73f: Added firstparty search parameter for supported resource types

## 0.46.6

### Patch Changes

- 838c3956: Use prod datadog account for everything besides local development.
  Use normalized environment names (prod, dev).
- e40e1d90: Add medication button uses same css classes as Add conditions button
- e40e1d90: Small button style changes
- b9d4c0de: Fix bug around borders in table. Fix intermittent failing tests.

## 0.46.5

### Patch Changes

- fd266008: Add prop for hiding builder owned records in conditions component.

## 0.46.4

### Patch Changes

- 385304f1: Miscellaneous style fixes.
- 0da295fc: RUM views will now use component names instead of url path name.

## 0.46.3

### Patch Changes

- 95895cef: Expose functions that run when opening a drawer.

## 0.46.2

### Patch Changes

- b035d8f7: Add filters to condtions 2.0.

## 0.46.1

### Patch Changes

- 3db87fc5: Add flag to enable FQS on allergies.
- 75f2dfaa: Added `isDate` bool to sortIndices for table to fix a bug where dates do not sort correctly. Also fixed a bug where react-query errors if the use-patient-history-details hook returned empty

## 0.46.0

### Minor Changes

- 67ab76e1: Fix issue with incorrect patient reference being passed when reconciling existing medications.

### Patch Changes

- ae8f7a7b: SideEffects set to prevent css from being tree-shaken by webpack. Upgraded storybook to 7.0.0-beta.45

## 0.45.7

### Patch Changes

- 1ea52c11: Add header to timeline.

## 0.45.6

### Patch Changes

- 1643187b: Fix types and text on the filter bar. Add icons that are missing.
- 72a214c3: Fix bug for done state when a patient history request is finished"

## 0.45.5

### Patch Changes

- a2448843: Add ability to remove view fhir button from timeline.
- 38b486bd: Add sort dropdown to conditions 2.0.

## 0.45.4

### Patch Changes

- 2c238e88: The OtherProviderMedsTable, along with curated components PatientMedications and PatientMedicationsTabbed now accept an optional prop hideAddToRecord which will omit the "Add to Record" button from other providermedications tables.

## 0.45.3

### Patch Changes

- f3e4ad11: Fix to reduce some vertical spacing and addressing scrollbar that always appears in stacked tables.

## 0.45.2

### Patch Changes

- f0383e2e: Add notification color palette for badge.

## 0.45.1

### Patch Changes

- 35c40132: Add last retrieved date from patient history request to conditions 1.0 and 2.0.

## 0.45.0

### Minor Changes

- d8140291: Add error state banner to drawer component and condition 1.0 and 2.0 tables to indicate when patient history retrieval is in a failed state.

## 0.44.7

### Patch Changes

- ba38340f: Added the FilterBar component. Medications tabbed component now has dismissed filter.

## 0.44.6

### Patch Changes

- a3fcb709: Fix deduping in allergies and immunizations. Fix patient history refresh banner to auto-refresh in drawer and table.

## 0.44.5

### Patch Changes

- a05abcfa: Lower minimum node version to 12

## 0.44.4

### Patch Changes

- edcae3d3: Refactor usePatientHistory hook to open RequestDrawers and pass patientHistory information. Also, resolves a few bugs regarding empty states while opening drawers in patient history.

## 0.44.3

### Patch Changes

- 3f99b04f: Add patient managing organization to medication statement cards in history.

## 0.44.2

### Patch Changes

- 06a43794: Fix date to be in MM/DD/YYYY format.

## 0.44.1

### Patch Changes

- ba10f383: Simplify authTokenURL use by relying on exp from access token itself.

## 0.44.0

### Minor Changes

- 9700e631: Add progress banner and last retrieved date to other provider recorder table.

### Patch Changes

- 1ace695f: For overriding the opening of drawer to add new medication when using "Add to Record", we may now pass a function as
  prop `handleAddToRecord` to the `PatientMedicationsTabbed` component.

  The medications tables no longer use the ellipsis dropdown for row actions.
  Instead they use buttons that appear on hover.

  Tabs and buttons for meds now capitalize using the "ctw-capitalize" CSS class
  rather than explicitly using uppercase lettering in the tsx.

  Medications table stacked view shows only medication name and dosage.

## 0.43.1

### Patch Changes

- eea869eb: Add new usePatientHistory hook which can be used to open the patient history request drawer from anywhere.
- eea869eb: Update form field error color and add generic message to drawer form footer, indicating the form has errors.
- 002d4099: Add hideRequestRecords prop to conditions 1.0 component.

## 0.43.0

### Minor Changes

- 255feb05: Add progress bar in patient history drawer.

## 0.42.1

### Patch Changes

- 3e40c2b5: Change font size of rendered react-jason FHIR resources for readability. Also added fhir icon to "view FHIR" button.
- a6d5303d: Created the PatientMedicationsTabbed component and stories.
- 0f15d8b9: Add empty state for patient conditions (2.0 component).

## 0.42.0

### Minor Changes

- e2d7ffef: Dedupe allergies and add manifestation column.

## 0.41.1

### Patch Changes

- 775adf6f: Fix immunization query key.

## 0.41.0

### Minor Changes

- 51bdf383: Add a View FHIR button to Allergies, Immunization, and Timeline components.

## 0.40.3

### Patch Changes

- 448c21f7: Add immunization component
- 6a913ad2: Add diagnosis and more info to patient timeline table.
- 72350620: Add source documents to patient timeline / encounter details.

## 0.40.2

### Patch Changes

- 43b5ddd8: Forgot to export the Allergies component

## 0.40.1

### Patch Changes

- ecf3e710: Added PatientAllergies component

## 0.40.0

### Minor Changes

- 2b15a12c: Update styling and layout for conditions 2.0.

### Patch Changes

- be32d6a9: Added `data-test-id` to form elements to target them easier in tests.
- c26aebc7: Fix spacing on tabs.
- d126ec06: Add more form validations to patient history request form.

## 0.39.6

### Patch Changes

- 2ab4de50: Created "@/utils/nodash" and "@/utils/nodash/fp" modules to replace all
  usage of lodash in the project. The reason for this is because vite is
  unable to properly tree-shake lodash when functions are imported from
  the global "lodash" package. This change should yield a smaller build and
  more importantly it won't clobber `window._` with the lodash library.

## 0.39.5

### Patch Changes

- 768389cd: Do not default to Select One but instead to Unknown.

## 0.39.4

### Patch Changes

- 44b6b89a: Updating logic for getting identifying RxNorm on a medication.
- 837ed00c: Fix z-index with radix dropdown menu. Change background color of condition 2.0 to white, to better reflect design.

## 0.39.3

### Patch Changes

- 20bb079: Do not fetch condition history for conditions with verification status of entered-in-error. Also do not remove entered-in-error from conditions with entered-in-error from the audit trail.
- 19f396c: Display status will now show the correct display status.

## 0.39.2

### Patch Changes

- f4aa1b2: Timeline now shows all 3rd party encounters.
- 21646b0: Reordered the buttons in action list so secondary action comes after primary

## 0.39.1

### Patch Changes

- a4ff125: Update 3rd party tag for quest.

## 0.39.0

### Minor Changes

- a0a85b6: Update text and button styling for pagination.

### Patch Changes

- d4c1a61: ActionList supports a secondary action. Added a `useDismissMedication` callback hook that creates a reusable dismiss medications function.

## 0.38.3

### Patch Changes

- ac97c42: Add query invalidation helpers for both internal and external use

## 0.38.2

### Patch Changes

- 3bf7f39: Update CCDA viewer with download xml functionality and styling features.

## 0.38.1

### Patch Changes

- 4600f9b: Add encounter class to encounter details drawer.
- 2ff4690: More explicitly targeting SCD on summary med

## 0.38.0

### Minor Changes

- 96485e3: Added an action to dismiss records from other provider medications table.

### Patch Changes

- 3a1ea81: WIP: New patient timeline (encounters) table.
- 8a8d85f: Change deduping logic in history drawer so that enriched records will now no longer cause dupes to show.
- 5d90126: Add timeline/encounter details.
- d56f3b5: Updating list of 3rd party tags

## 0.37.1

### Patch Changes

- 696dc1a: Add work around for CJS compile issue.

## 0.37.0

### Minor Changes

- 6abda51: Support audit trail in condition history. Only fetch binary document when clicking on the source document button.

### Patch Changes

- 395501b: Fix how archive/unarchive actions are recorded. We still use a FHIR Basic resource, but we now use a code instead of a meta.tag.
- e462acc: Fix logic for Pending case in verification status.
- ad761f9: Fix bug where details are not showing when there are not history records present.

## 0.36.4

### Patch Changes

- 2832c31: Rename Archive button to Dismiss. Rename Un-Archive button to Restore.
- 6b02042: Made the date field "hidden" on the Add Medication form. Additionally added toLower to the status field or it doesn't match a status value

## 0.36.3

### Patch Changes

- c590ef9: Handful of bug fixes for future conditions 2.0 component + some code cleanups.
- a792a47: Fix condition 2.0 hover button styles to work better when table is stacked.

## 0.36.2

### Patch Changes

- e610ced: Revert date changes to custom date functions.

## 0.36.1

### Patch Changes

- b9696f1: When adding medication to record from the other provider table:

  - Asserted Date will now be set as the current date rather than the original medication statement date asserted.
  - The display text is now also properly set on the medication resources `medicationCodeableConcept` value.
  - When using "Add to Record" button from Storybook, the mocked response is now intercepting `POST /fhir` rather than `/fhir/MedicationStatement` to reflect that medication statements from this form are now created in a Bundle-transaction.

- a25be80: Fix viewing the source document for other provider record conditions.

## 0.36.0

### Minor Changes

- 9eff6c1: Now displaying medications without an RxNorm code in builder medications list.

### Patch Changes

- f73a54c: Remove `react-pdf-viewer` and `react-json-view` to fix server rendering issues.

## 0.35.0

### Minor Changes

- 58b80c0: Update edit/add conditions panel to automatically fill in verification and clinical status based on the status value in the dropdown.
- e6c12ec: Add hover actions for other provider conditions.

### Patch Changes

- 2f07125: Simplify condition history component.

## 0.34.1

### Patch Changes

- 5dec6e1: Fix react-json-view library to be compatible

## 0.34.0

### Minor Changes

- be72b6a: Add CCDA document viewer to conditions in condition history that have these binary documents.

## 0.33.0

### Minor Changes

- 13c80ac: Add hover actions in conditons 2.0.

## 0.32.1

### Patch Changes

- 4357de1: Code cleanup.
- 71d4eae: Adding patient UPID to queries for medication data that may span builders, this triggers "CPR mode" in ODS.

## 0.32.0

### Minor Changes

- e00310c: Created an "Add to Record" button in the hamburger menu of <OtherProviderMedsTable/>
- 9d13865: <PatientsTable /> and <Pagination /> components added. Previous pagination component which didn't feature lazy loading and paging backwards is now named <PaginationList />

## 0.31.2

### Patch Changes

- ad8fe61: Fix bug where medications couldnt be added without dosage.

## 0.31.1

### Patch Changes

- 223e5f4: Automatically categorizes new conditions as problem list item.

## 0.31.0

### Minor Changes

- 2abe043: Add medications autocomplete component and remove note field from add medication.

### Patch Changes

- f7f2fe9: Fix issue where builderId is passed in even when logged in as non-super user.

## 0.30.4

### Patch Changes

- dba5946: Adds builder identification to all requests to Zus services.

## 0.30.3

### Patch Changes

- 63e3cd0: Add error message at bottom of drawer in addition to top of drawer.

## 0.30.2

### Patch Changes

- beab220: Fix the conditions other providers table so that the table headers also sort, and fix the sorting order of status to match what is displayed.
- f85a962: Re-add header that indicates the source of outgoing requests.
- fc726fc: Add label "History" to history records.
- 512c20f: Automatically categorizes new conditions as problem list items.
- f85a962: Remove header indicating source of requests.

## 0.30.1

### Patch Changes

- d6a684e: Actions will now catch unhandled errors.
- 9811178: Revert the additional header to avoid a CORS error.

## 0.30.0

### Minor Changes

- 0c2c349: Create a newly redesigned conditions component.

### Patch Changes

- 7f81bfc: Adds a header to outgoing requests indicating the component library as the source.

## 0.29.7

### Patch Changes

- 7079391: Edit patient resource directly to avoid losing patient information.

## 0.29.6

### Patch Changes

- 3c30570: Add ability to archive other provider records.

## 0.29.5

### Patch Changes

- 54347e8: Add use official when updating a patient.

## 0.29.4

### Patch Changes

- 8e49707: Condition sorting now allows all columns to be sortable. Sort primarily defaults to be by last recorded date and condition name.

## 0.29.3

### Patch Changes

- 78526f1: Add consent to patient history schedule request.

## 0.29.2

### Patch Changes

- 263a97d: Change logic around showing empty "request records" box in other providers to only show if `clinicalHistoryExists` OR patient has no other provider records.

## 0.29.1

### Patch Changes

- 86bc233: Add onPatientSave to PatientProvider that allows users of the library to override default onPatientSave functionality.

## 0.29.0

### Minor Changes

- e59c99f: Add ability to include multiple elements in one row in forms.

## 0.28.5

### Patch Changes

- 209c427: Modified logic for displaying "Confirmed Medications" so that the display name for builder-owned resources is preferred over the display name of the corresponding lens resource and so that builder-owned medications are still displayed even if there is any lens latency.

## 0.28.4

### Patch Changes

- fd4bdb6: Fix bug where capital "Active" conditions were not showing up in the active conditions view. We now correctly filter based on the "code" and proper "system" of the clinicalStatus codings.
- 6e8e663: Show other provider records if patient history messages exists, otherwise show empty state with request records button.

## 0.28.3

### Patch Changes

- 4087c00: ActionList onAction and actionText props are now optional. Added classname ctw-drawer-title to the Drawers h2 tag.

## 0.28.2

### Patch Changes

- bd7df29: Remove patientID prop from generic drawer components.
- 74d991a: The title header atop Drawers (medications, conditions or otherwise) now has a full width bottom border. This is a border between fixed content and scrolling content so it makes more sense that the divider spans the full width of the drawer.

## 0.28.1

### Patch Changes

- 162a65b: Conditionally add managing organization when editing a patient.

## 0.28.0

### Minor Changes

- 73417ac: Add ability to edit conditions from the history drawer and show condition information in the history drawer.

### Patch Changes

- c2ed272: Do not increment the version number by 1 in provenance and instead use the version id of the response.

## 0.27.0

### Minor Changes

- 51b1b6e: Add patient history request drawer. The patient history request drawer allows users to request patient history and edit demographic information for a patient.

### Patch Changes

- 764a920: Do not show the sorting chevron on hover if a column is unsortable.

## 0.26.2

### Patch Changes

- 6a4d497: Fix issue where if a condition had verification status of entered-in-error in patient record it would not show up in other conditions.
- 1ae68a2: Add storybook tests and a few accessibility tweaks. Fix bug with refetching medications after a create.

## 0.26.1

### Patch Changes

- 845ee67: Provenance now saves which historical version of a resource resulted from an operation, for more thorough tracking of changes.

## 0.26.0

### Minor Changes

- b3dceb5: Conditions are sortable by name and group in ascending and descending order.

### Patch Changes

- 0137b01: Updated date logic for med dispenses and med requests"

## 0.25.0

### Minor Changes

- f10ac5c: Updated medications components to use active medications lens.

### Patch Changes

- 837bf8e: MedicationStatement.lastPrescriber more resilant. This will try to resolve the prescriber name based on a reference from lastPrescriber lens and falling back to the display on the reference if the actual reference cannot be resolved.
- 76efc20: Medication history now supports MedicationAdminstration details.

## 0.24.11

### Patch Changes

- fd5fb9c: Medication details searches through includedResources to find the latest prescriber of a medication.
- bf5caf1: Remove resize handle on date input elements.
- 0d92471: Fix a few minor style bugs with stacked conditions.

## 0.24.10

### Patch Changes

- 6b44387: Fix two minor condition bugs.
- 1e95eee: Show unique condition history entries.

## 0.24.9

### Patch Changes

- 8799a3b: Fix sorting on medications tables to be case-insensitive
- 10b52be: Show medicationStatement.informationSource.display in medication reviewed card
- 843a0c7: Filter out other provider conditions that have the same status as matching conditions in the patient record.
- 19547c1: Minor style changes to the medication drawer and history texts. Added mocked requests to storybook

## 0.24.8

### Patch Changes

- a7d03b6: Filter out other provider records by any matching patient records that are newer, regardless of active/inactive status.
- e3de88f: Adds provenance records when data is added or edited to track changes and add accountability.
- c8ac26a: Delete functionality for validation status now edits to entered-in-error instead of deleting.
- dca390e: Reduce number of options for verification status in add conditions and catch incomplete form field entries.

## 0.24.7

### Patch Changes

- e70a512: Set the missing "ctw-" prefix on "ctw-btn-primary" class in medications drawer component

## 0.24.6

### Patch Changes

- 856bbe0: Re-add display & system to condition schema.

## 0.24.5

### Patch Changes

- 8331a8b: Change title in conditions history to category

## 0.24.4

### Patch Changes

- 1c16fd0: Hotfix to fix autocomplete option not setting correctly.

## 0.24.3

### Patch Changes

- 3f299b9: Another attempt to fix autocomplete.

## 0.24.2

### Patch Changes

- 2fc24ea: Fix issue with autocomplete.
- e08b920: Fix autocomplete display value when making a selection.

## 0.24.1

### Patch Changes

- 06464a3: Attempting to fix weird autocomplete bug.

## 0.24.0

### Minor Changes

- da16b9c: Add new component <ActionList/>

## 0.23.7

### Patch Changes

- 25b3ec3: Clicking add condition from other provider records after clicking edit condition does not result in an error anymore.
- a82ad95: Fixing issue with duplicates showing up in other provider records when common patient record is enabled

## 0.23.6

### Patch Changes

- 39b5746: Capitalize label and fields in detail and history drawers.
- b20e69d: Fix delayed UX when adding condition.

## 0.23.5

### Patch Changes

- b1fab2d: Fix a handful of CSS issues impacting importing of this component library. Additionally get conditions autocomplete options to float (absolute positioning) instead of pushing other content down when options are showed.
- 92afd10: Filter entered-in-error for verfication status in condition history.

## 0.23.4

### Patch Changes

- 811f08f: Adding de-duping logic for medication history

## 0.23.3

### Patch Changes

- 1d5ba82: Exporting Drawer, models and some other core components
- 7e0a205: Hide delete option in Other Patient Records.
- e5170bd: If notes is pre-populated it will now show when editing a condition. Notes can only be resized vertically now.

## 0.23.2

### Patch Changes

- b829a97: set the range for node engine to 16 - 19

## 0.23.1

### Patch Changes

- 112a1c5: Don't error when a reference is not found. This can happen due to permissions and is not a sign of a problem.

## 0.23.0

### Minor Changes

- 483f8e8: Shows additional errors for condition forms that were not shown before, including ones associated with multiple fields and failures with the request or responses from the server.

## 0.22.2

### Patch Changes

- ce1d852: date-fn update

## 0.22.1

### Patch Changes

- 4507cde: Update aggregated from extension system url from http to https

## 0.22.0

### Minor Changes

- 848ed56: Refactors of the Medication history details

## 0.21.3

### Patch Changes

- 86f7794: Adding fields to medication details and updating logic for breaking out "other provider medications"

## 0.21.2

### Patch Changes

- e033e26: Add recorder and notes field to condition history.

## 0.21.1

### Patch Changes

- cdf2037: Fixes the font color styling of the status column.
- 3a1920e: Refactor onset date to only be set if provided and not set directly to today's date.

## 0.21.0

### Minor Changes

- 42e05cc: Update the status column to show both clinical status and verification status.

### Patch Changes

- 6476f27: Updated display labels to use "start case" in FormField. Updates fields in add medication drawer.

## 0.20.1

### Patch Changes

- 393b17f: Fix condition autocomplete to work with proxied auth tokens.
- 086caf8: Fix the condition form to let users set a condition's verification status to "entered-in-error".

## 0.20.0

### Minor Changes

- 03bbc94: - Created <CTWBox.\* /> components.
  - Refactored <PatientMedications/> component into smaller parts so it can be used as a whole component or the inner pieces could be used individually. (which wasn't the case before).
  - Created <Loading /> component and adding loading message to medications tables.

## 0.19.5

### Patch Changes

- acc5077: Update the required fields display and read only content for the Edit/Add Condition forms.

## 0.19.4

### Patch Changes

- ef8e767: Update the sort to sort by year first and move the records with no date to the bottom.

## 0.19.3

### Patch Changes

- 3ecd695: Update the default sort for conditions table to primarily be last recorded date and then the condition name.
- ad7a358: Fixed styling on the <Table /> component so it once again handles responsiveness.

## 0.19.2

### Patch Changes

- 2be890a: Fixed pagination props and styling. Fixed a bug with pagination being wrong after editing records in the table.

## 0.19.1

### Patch Changes

- d921eed: Fixed "add medication" request and removed tabs from the medications drawer

## 0.19.0

### Minor Changes

- 9609302: Add way to display code based on order of preference by system, favoring enrichment. Fix bug around error message in condiiton not being descriptive.
- fc3143b: Allow users to remove conditions from a patient's profile via the delete option from the dropdown menu. This will invoke a confirmation dialog to confirm the deletion of the FHIR resource.
- e051dc9: Dedupe codes in history drawer by system, with enriched records being favored.

### Patch Changes

- f883412: Fix the bug that causes the Condition add/edit form to not recognize a selected condition name.
- be8ce5b: Cleanup react specific errors from the console.
- b4d462b: Update column header names for Patient Record and Other Provider Record tables.
- cf61aa9: Sets verification status to active by default when user adds a condition from another provider, to match user intent.
- bf1013e: Added a PatientMedications component which displays two tables, one with builder prescribed medications and another with all medications for a patient. Additionally there are two new hooks to support these components "useQueryPatientBuilderMeds" and "useQueryPatientLensMeds"
- 1ec1eec: Update error handling to catch future date options and a couple visual style changes.
- 04f91f1: Add word wrap to all cells in tables to avoid content spilling into other cells.
- 7feddd3: Update verification and clinical status to map from level 2 codings to level 1 codings.

## 0.18.1

### Patch Changes

- b25b329: Fix bug where edit conditions wasn't always saving.

## 0.18.0

### Minor Changes

- 8749891: Replace snomed and condition name field with an autocomplete conditions component.

### Patch Changes

- 209ad0e: Allow the overall color scheme to be implemented into borders instead of a generic black color.

## 0.17.0

### Minor Changes

- 293ead2: Add pagination element to the Table component with buttons "Show More", "Show All", and "Reset".
- 791eef6: Add optional builderId prop to CTWProvider. When set, we'll use that builderId for any filtering AND we'll set the Zus-Account header for FHIR requests.
- afb2b48: Add library version to window.CTWComponentLibrary.version variable which allows version to export to dependents.

## 0.16.0

### Minor Changes

- 5bb7428: Add optional "tags" filters to PatientProvider. This allows filtering by any number of meta.tags on the FHIR patient resources.

### Patch Changes

- 46eb897: Remove uncessary code.
- 76f7583: Remove required attributes from input fields and add aria-required attribute to those input fields when adding/editing conditions.
- 5bb7428: Fix condition history bug where conditions without codes would show all conditions in history view.

## 0.15.3

### Patch Changes

- 62dcb25: Remove unnecessary function to convert the date.

## 0.15.2

### Patch Changes

- b4db81c: Fix sorting and styling of dates and labels within the condition history panel.

## 0.15.1

### Patch Changes

- 29185c9: Update null states for condition tables.

## 0.15.0

### Minor Changes

- 33f88e0: Add optional readOnly property to conditions. This will hide the “…” menu and the “add conditions” link.

### Patch Changes

- 9b0b1ff: Limiting lens requests to resources tagged with the callers builder.

## 0.14.2

### Patch Changes

- d91b2b5: Recorder will now be added when adding conditions as well.

## 0.14.1

### Patch Changes

- 04de856: Remove dependency on headlessui-float by replacing custom select field with html native select.

## 0.14.0

### Minor Changes

- 2d00ed0: Simplify the user experience of adding a new condition by pre-populating some fields with practical default values. Additionally hides the reported date field, as the now pre-populated value of today's date should not be tampered with by the user.
- 86ac54f: Add display field to the recorder object when saving a condition.

### Patch Changes

- 3e72ac1: General code cleanup. Remove case where FhirClient must be provided error was thrown.
- 10aae20: Adjust use of portals to inherit proper CSS vars setup by CTWProvider. This fixes a theming bug where drawer and dropdown-menu were not properly themed.
- 02f3aec: Other provider records now correctly shows loading spinner while still waiting for patient records to load.

## 0.13.6

### Patch Changes

- 9e80016: Add “Records with no date” section to condition history.

## 0.13.5

### Patch Changes

- 417d6b6: Condition History now sorts by date and the entries without a date are filtered to the end.

## 0.13.4

### Patch Changes

- 5344fa5: Adds an error display to the conditions table if patient could not be found.

## 0.13.3

### Patch Changes

- ba94843: Alphabetize conditions primarily by CCS grouping and secondarily the condition name so that users can quickly find the conditions by their category.
- 1e346c8: Don't fetch when not on patient provider. Also fixes overfetching

## 0.13.2

### Patch Changes

- b3c68a3: No longer refetch on window focus

## 0.13.1

### Patch Changes

- 9ee5168: Condition history detail card and summary card now have a space between them.

## 0.13.0

### Minor Changes

- 1086140: Condition History Panel now has a stacked UI list detailing previous occurrences of different conditions. There is a preview summary card followed by a detailed card for each of the different conditions that have been recorded.
- fb5fd96: When user edits or adds a condition, practitioner id will now be used to set the recorder field automatically. If no practitioner id is found then recorder will be nulled else the current practitioner id for the user will be used.

### Patch Changes

- 112d3df: Move ctw provider and context into separate files to avoid bug outlined in https://github.com/vitejs/vite/pull/10239

## 0.12.0

### Minor Changes

- 67ddbb0: Manage inconsistent coding in Conditions History Panel. Now supports SNOMED, ICD-10, ICD-10CM, ICD-9, ICD-9CM for code matching. Will now filter out summary and lens tags as well.

## 0.11.0

### Minor Changes

- 047cfeb: Confirmed changes to Patient Record in table label and Not Reviewed changes to Other Provider Records

## 0.10.4

### Patch Changes

- fb028c6: Use more codes to filter out duplicate condition records from notReviewed
- 9e5bb33: Continue enforcing the rule of only showing builder-owned records as confirmed, by covering the new edge case where there are shared resources with other builders. Clients will not need to make any changes.

## 0.10.3

### Patch Changes

- f4f85be: Fix SSR issue by avoiding use of useLayoutEffect directly.

## 0.10.2

### Patch Changes

- 089c06c: Hide condition id from edit and add

## 0.10.1

### Patch Changes

- 075719c: Re-add style.css as a required export for consumers.

## 0.10.0

### Minor Changes

- 6cbb910: Conditions container and table will now switch to a responsive stack layout when container width is less than "breakpoint.sm" pixels (defaults to 640px and can be overwriten via CTWProvider theme).
- 38cfc7e: Switch to dynamic CSS imports (using sass). This is a breaking change in that consuming applications no longer need to import our style.css themselves.

### Patch Changes

- f222c7e: Better support column widths and prepare conditions and tables for responsive design.
- 3e5da9c: Refetches condition when adding new condition or adding condition from not reviewed. Additionally fixes bug when editing condition and date is of bad format

## 0.9.1

### Patch Changes

- f3def6c: In the condition table, column widths were recalculated to add up to 100% to avoid confusion. This will not impact how the table is viewed.

## 0.9.0

### Minor Changes

- 53e07aa: In condition tables, the CCS group of a condition is now displayed as a new column beside the name of the condition. Since some condition names are overly detailed, the CCS group can serve as a more readable description. If a condition does not have a CCS code, it will simply be left blank.

### Patch Changes

- 65c744e: Simplify table component by removing sticky columns. Table will be responsive in the future.

## 0.8.1

### Patch Changes

- 1f5e4ea: Resets history loading state after fetching condition history for a particular condition and increases fetch size for searchAllRecords.

## 0.8.0

### Minor Changes

- 8146b27: Add ability to add not reviewed condition to confirmed condition section, edit confirmed conditions and add new conditions.

## 0.7.0

### Minor Changes

- 7b71ff0: Fix the condition filter to fetch by icd10 and snomed and not just one or the other if both are present.

## 0.6.0

### Minor Changes

- ad56045: Add ability to view condition history.

## 0.5.2

### Patch Changes

- 98d876d: Update how style.css is imported.

## 0.5.1

### Patch Changes

- 7605db1: Use more robust library for dropdown menu and cleanup some styles.

## 0.5.0

### Minor Changes

- 6a8755c: Fixup library packaging, tweak few styles, and make PatientProvider exported.
- 538c409: Adds a PatientProvider that provides a UPID via the user providing either a PatientUPID or a combination of PatientID/SystemUrl.

## 0.4.0

### Minor Changes

- 9d0f29b: Allows the client to pass in a theme object that redefines our overridable CSS variables for more customizability. The client can choose to pass in this obect, or simply make no change to their code and keep the default styling.
- 101ed98: Adds sticky rightmost column that allows consumers to code different actions on a dropdown menu.

### Patch Changes

- 57123f8: Treat more condition statuses as "active".

## 0.3.0

### Minor Changes

- 88d3b2e: Filters out confirmed conditions from not reviewed conditions

## 0.2.0

### Minor Changes

- 497847f: Allow headers to be passed into ctw-provider.

## 0.1.0

### Minor Changes

- d49a70d: Adds className prop added to all components and applied to their top div / element to provide an intuitive way for consumers to apply CSS classes. Consumers can choose to do things like <Conditions className="…">.

## 0.0.4

### Patch Changes

- b38e2a9: Fixes release strategy
- a238bdd: Fix publishing issues
- a238bdd: Update readme and adding changeset to set process

## 0.0.2

### Patch Changes

- 54e83e4: Adds the ability to add changeset to this repo and adds MIT license

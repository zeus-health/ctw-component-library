# ctw-component-library

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

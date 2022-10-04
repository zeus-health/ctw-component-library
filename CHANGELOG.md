# ctw-component-library

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
- 538c409: There's a new PatientProvider that provides a UPID via the user providing either a PatientUPID or a combination of PatientID/SystemUrl.

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

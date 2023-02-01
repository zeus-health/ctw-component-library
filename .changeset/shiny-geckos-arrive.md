---
"@zus-health/ctw-component-library": patch
---

For overriding the opening of drawer to add new medication when using "Add to Record", we may now pass a function as
prop `handleAddToRecord` to the `PatientMedicationsTabbed` component.

The medications tables no longer use the ellipsis dropdown for row actions.
Instead they use buttons that appear on hover.

Tabs and buttons for meds now capitalize using the "ctw-capitalize" CSS class
rather than explicitly using uppercase lettering in the tsx.

Medications table stacked view shows only medication name and dosage.

---
"@zus-health/ctw-component-library": patch
---

When adding medication to record from the other provider table:

- Asserted Date will now be set as the current date rather than the original medication statement date asserted.
- The display text is now also properly set on the medication resources `medicationCodeableConcept` value.
- When using "Add to Record" button from Storybook, the mocked response is now intercepting `POST /fhir` rather than `/fhir/MedicationStatement` to reflect that medication statements from this form are now created in a Bundle-transaction.

---
"@zus-health/ctw-component-library": patch
---

MedicationStatement.lastPrescriber more resilant. This will try to resolve the prescriber name based on a reference from lastPrescriber lens and falling back to the display on the reference if the actual reference cannot be resolved.

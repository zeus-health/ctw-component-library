---
"@zus-health/ctw-component-library": patch
---

Support "read-your-writes" from FQS by long-polling from FQS until it has the updated resource. This fixes a bug where we would refetch after a write but fetch stale data from FQS. For example, adding a new condition or editing an existing condition.

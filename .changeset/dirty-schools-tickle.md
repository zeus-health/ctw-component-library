---
"@zus-health/ctw-component-library": patch
---

Fixed bug in pagination where "Show All" button was shown even if there was no more to show. Also made a "withPagination" HOC so that the component that wants to use pagination component doesn't need to both use that component and manage which records to show

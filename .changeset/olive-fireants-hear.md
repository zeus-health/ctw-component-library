---
"@zus-health/ctw-component-library": patch
---

Cache requests for authTokenURL. This fixes a race condition where on page load we could send multiple redundant requests.

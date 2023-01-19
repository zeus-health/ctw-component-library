---
"@zus-health/ctw-component-library": patch
---

Created "@/utils/nodash" and "@/utils/nodash/fp" modules to replace all
usage of lodash in the project. The reason for this is because vite is
unable to properly tree-shake lodash when functions are imported from
the global "lodash" package. This change should yield a smaller build and
more importantly it won't clobber `window._` with the lodash library.

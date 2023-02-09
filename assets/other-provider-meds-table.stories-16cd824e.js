import{R as o}from"./index-6f814c40.js";import{s as p,p as d,o as m}from"./requests-eeff8fd1.js";import{ap as n,C as c,a as u,S as l}from"./patient-allergies-5c1b9732.js";import"./_commonjsHelpers-042e6b4d.js";import"./action-list-fa5a295c.js";import"./index-74f03c09.js";import"./sortBy-a390368e.js";import"./_baseForOwn-7324d3a8.js";import"./_equalByTag-eda72788.js";import"./_baseIsEqual-7d59e24c.js";import"./_baseToString-7c0e3f59.js";import"./_baseClone-17ec433b.js";import"./_createSet-6ff8e1d4.js";import"./toNumber-d7ce3bd9.js";import"./isPlainObject-f51be120.js";import"./_basePickBy-fa3aec3b.js";import"./mapValues-13598fe6.js";import"./uniq-8676ca12.js";import"./request-47bfd586.js";import"./drawer-39fcad7e.js";import"./index-6de6b113.js";import"./_commonjs-dynamic-modules-302442b1.js";import"./table-bda62b29.js";import"./spinner-66aa4ba7.js";import"./isEqual-298b6ab1.js";import"./data-list-254aa0b0.js";import"./extends-b0154772.js";import"./isString-933c0e0c.js";import"./debounce-5029c56d.js";const j={tags:["autodocs"],component:n,decorators:[(i,{args:a})=>o.createElement(c,{env:"dev",authToken:"ey.12345",builderId:"12345"},o.createElement(u,{patientID:"007",systemURL:l},o.createElement(i,{args:a})))]},r={args:{sortColumn:"display",sortOrder:"asc"},...p({providerMedications:d,otherProviderMedications:m})},t={...r,args:{sortColumn:"display",sortOrder:"asc",hideAddToRecord:!0}};var e;r.parameters={...r.parameters,storySource:{source:`{
  args: {
    sortColumn: "display",
    sortOrder: "asc"
  },
  ...setupMedicationMocks({
    providerMedications,
    otherProviderMedications
  })
}`,...(e=r.parameters)==null?void 0:e.storySource}};var s;t.parameters={...t.parameters,storySource:{source:`{
  ...Basic,
  args: {
    sortColumn: "display",
    sortOrder: "asc",
    hideAddToRecord: true
  }
}`,...(s=t.parameters)==null?void 0:s.storySource}};const q=["Basic","HideAddToRecord"];export{r as Basic,t as HideAddToRecord,q as __namedExportsOrder,j as default};
//# sourceMappingURL=other-provider-meds-table.stories-16cd824e.js.map

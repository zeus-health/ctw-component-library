import{R as t}from"./index-6f814c40.js";import{s as v,p as M,o as g}from"./requests-0af1aebd.js";import{h as H,C as R,a as f,S}from"./patient-allergies-50ce6815.js";import"./_commonjsHelpers-042e6b4d.js";import"./action-list-147315c2.js";import"./index-74f03c09.js";import"./sortBy-d0c06176.js";import"./_baseForOwn-d5bf979e.js";import"./_equalByTag-3aa7c076.js";import"./_baseIsEqual-4b283a92.js";import"./_baseToString-ba0098b0.js";import"./_baseClone-0bdbe065.js";import"./_createSet-823d7c6f.js";import"./toNumber-711c0fc1.js";import"./isPlainObject-7e0f34c5.js";import"./_basePickBy-f94c0374.js";import"./mapValues-80a5786c.js";import"./uniq-1e65cdac.js";import"./request-56e719e0.js";import"./table-76348145.js";import"./spinner-66aa4ba7.js";import"./drawer-5742d187.js";import"./index-6de6b113.js";import"./_commonjs-dynamic-modules-302442b1.js";import"./extends-41c9b0e2.js";import"./isEqual-38ff4822.js";import"./data-list-254aa0b0.js";import"./isString-b8ede3fb.js";import"./debounce-0d3e7ec9.js";const Q={tags:["autodocs"],component:H,decorators:[(l,{args:T})=>t.createElement(R,{env:"dev",authToken:"ey.12345",builderId:"12345"},t.createElement(f,{patientID:"007",systemURL:S},t.createElement(l,{args:T})))],args:{hideAddToRecord:void 0,forceHorizontalTabs:void 0,onAfterOpenHistoryDrawer:void 0,onOpenHistoryDrawer:void 0}},r={...v({providerMedications:M,otherProviderMedications:g})},o={...r,args:{forceHorizontalTabs:!0}},e={...r,args:{hideAddToRecord:!0}};var i,a,s;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  ...setupMedicationMocks({
    providerMedications,
    otherProviderMedications
  })
}`,...(s=(a=r.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};var d,c,p;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  ...Basic,
  args: {
    forceHorizontalTabs: true
  }
}`,...(p=(c=o.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var n,m,u;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  ...Basic,
  args: {
    hideAddToRecord: true
  }
}`,...(u=(m=e.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};const X=["Basic","ForceHorizontalTabs","HideAddToRecord"];export{r as Basic,o as ForceHorizontalTabs,e as HideAddToRecord,X as __namedExportsOrder,Q as default};

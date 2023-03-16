import{R as u}from"./index-6f814c40.js";import{s as b,a as s}from"./allergy-intolerance-a6c7eb15.js";import{s as U}from"./requests-de488e23.js";import{s as x,Z as L,o as t,p as n}from"./requests-339a2b9a.js";import{s as B}from"./requests-c873f775.js";import{s as H}from"./requests-f33b2a30.js";import{s as N,o as a,p as m}from"./requests-92e028a8.js";import{s as V}from"./requests-49708b6a.js";import{C as W,S as Y}from"./patient-helper-da68667d.js";import{P as j}from"./patient-provider-693db1c5.js";import"./_commonjsHelpers-042e6b4d.js";import"./request-5a1df4c1.js";import"./values-0b6ffb91.js";import"./_baseForOwn-d8306f34.js";import"./_equalByTag-aaf39779.js";import"./_baseIsEqual-c150f525.js";import"./_baseToString-4993715b.js";import"./sortBy-919d7262.js";import"./_baseClone-25b1595e.js";import"./_createSet-12ef9b81.js";import"./toNumber-9b8ac844.js";import"./_basePickBy-239377e6.js";import"./mapValues-21907523.js";import"./isPlainObject-8e58b46f.js";import"./uniq-f5468222.js";import"./zus-da29a567.js";import"./use-patient-history-f634413a.js";import"./drawer-form-with-fields-ad12799a.js";import"./drawer-ed34104d.js";import"./index-74f03c09.js";import"./use-watch-a9671586.js";import"./index-6de6b113.js";import"./spinner-66aa4ba7.js";import"./sortBy-be5f7eb4.js";import"./isEmpty-bcd6f1a3.js";import"./observation-2d8eda85.js";import"./sort-b06c39f5.js";import"./isString-35d4a3f2.js";import"./getPrototypeOf-9c757e77.js";import"./uniqWith-f1edcb30.js";import"./null-flavor-38a5094f.js";import"./combobox-field-5e522734.js";import"./debounce-535e186e.js";import"./use-controllable-f15d4b9a.js";import"./calculate-active-index-048f6a58.js";import"./resource-details-drawer-1e919052.js";import"./document-icon-581c51b2.js";import"./collapsible-data-list-details-f7571cef.js";import"./loading-c7ff698a.js";import"./medication-history-f04ff0ab.js";import"./error-boundary-5c048abf.js";import"./use-breakpoints-24354796.js";import"./isEqual-b08f36b0.js";import"./coding-list-1d7c950f.js";import"./patient-observations-47f9d974.js";import"./table-c78fc2eb.js";import"./filter-bar-0a77a815.js";import"./use-filtered-sorted-data-3437a802.js";import"./index-4d501b15.js";import"./extends-98964cd2.js";import"./other-provider-meds-table-81261729.js";import"./use-medications-b1717a0d.js";import"./data-list-254aa0b0.js";import"./patient-allergies-0e5bf650.js";import"./patient-careteam-063662f2.js";import"./view-fhir-1f92e981.js";import"./requests-c91fe411.js";import"./patient-immunizations-faf230dd.js";import"./patient-medications-5f5e659e.js";import"./provider-meds-table-c7933dec.js";import"./patient-timeline-9e81df9d.js";import"./patient-8f4a0ec9.js";import"./_commonjs-dynamic-modules-302442b1.js";function c({allergyIntolerance:d,otherConditions:p,patientConditions:E,providerMedications:Z,otherProviderMedications:T}){const l=b({allergyIntolerance:d}),R=U(),g=x({otherConditions:p,patientConditions:E}),_=B(),D=H(),M=N({providerMedications:Z,otherProviderMedications:T}),O=V();return{decorators:[...l.decorators,...g.decorators,...M.decorators],parameters:{msw:{handlers:{mocks:[...l.parameters.msw.handlers.mocks,...R.parameters.msw.handlers.mocks,...g.parameters.msw.handlers.mocks,..._.parameters.msw.handlers.mocks,...D.parameters.msw.handlers.mocks,...M.parameters.msw.handlers.mocks,...O.parameters.msw.handlers.mocks]}}}}}const ur={tags:["autodocs"],component:L,decorators:[(d,{args:p})=>u.createElement(W,{env:"dev",authToken:"ey.12345",builderId:"12345"},u.createElement(j,{patientID:"007",systemURL:Y},u.createElement(d,{args:p})))],args:{resources:void 0,forceHorizontalTabs:void 0,title:void 0,allergiesProps:void 0,conditionsProps:void 0,conditionsOutsideProps:void 0,documentsProps:void 0,immunizationsProps:void 0,medicationsProps:void 0,medicationsOutsideProps:void 0,removeBranding:void 0}},o={...c({allergyIntolerance:s,otherConditions:t,otherProviderMedications:a,patientConditions:n,providerMedications:m}),args:{resources:["conditions-outside","medications-outside"]}},r={...c({allergyIntolerance:s,otherConditions:t,otherProviderMedications:a,patientConditions:n,providerMedications:m}),args:{resources:["conditions","conditions-outside","medications","medications-outside"]}},e={...c({allergyIntolerance:s,otherConditions:t,otherProviderMedications:a,patientConditions:n,providerMedications:m}),args:{resources:["allergies","conditions","immunizations","documents"]}},i={...c({allergyIntolerance:s,otherConditions:t,otherProviderMedications:a,patientConditions:n,providerMedications:m}),args:{resources:["allergies","conditions","conditions-outside","documents","immunizations","medications","medications-outside","care-team","timelines"]}};var k,v,P;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
  ...setupZusAggregatedProfileMocks({
    allergyIntolerance,
    otherConditions,
    otherProviderMedications,
    patientConditions,
    providerMedications
  }),
  args: {
    resources: ["conditions-outside", "medications-outside"]
  }
}`,...(P=(v=o.parameters)==null?void 0:v.docs)==null?void 0:P.source}}};var h,f,C;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  ...setupZusAggregatedProfileMocks({
    allergyIntolerance,
    otherConditions,
    otherProviderMedications,
    patientConditions,
    providerMedications
  }),
  args: {
    resources: ["conditions", "conditions-outside", "medications", "medications-outside"]
  }
}`,...(C=(f=r.parameters)==null?void 0:f.docs)==null?void 0:C.source}}};var A,y,I;e.parameters={...e.parameters,docs:{...(A=e.parameters)==null?void 0:A.docs,source:{originalSource:`{
  ...setupZusAggregatedProfileMocks({
    allergyIntolerance,
    otherConditions,
    otherProviderMedications,
    patientConditions,
    providerMedications
  }),
  args: {
    resources: ["allergies", "conditions", "immunizations", "documents"]
  }
}`,...(I=(y=e.parameters)==null?void 0:y.docs)==null?void 0:I.source}}};var z,S,w;i.parameters={...i.parameters,docs:{...(z=i.parameters)==null?void 0:z.docs,source:{originalSource:`{
  ...setupZusAggregatedProfileMocks({
    allergyIntolerance,
    otherConditions,
    otherProviderMedications,
    patientConditions,
    providerMedications
  }),
  args: {
    resources: ["allergies", "conditions", "conditions-outside", "documents", "immunizations", "medications", "medications-outside", "care-team", "timelines"]
  }
}`,...(w=(S=i.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};const lr=["OutsideRecords","ConditionsAndMedications","ProblemsAndDocuments","Everything"];export{r as ConditionsAndMedications,i as Everything,o as OutsideRecords,e as ProblemsAndDocuments,lr as __namedExportsOrder,ur as default};

import{R as u}from"./index-6f814c40.js";import{s as b,a as s}from"./allergy-intolerance-a6c7eb15.js";import{s as U}from"./requests-de488e23.js";import{s as x,o as t,p as n}from"./requests-aea20b5f.js";import{s as L}from"./requests-40a6b578.js";import{s as B}from"./requests-f33b2a30.js";import{s as H,o as m,p as a}from"./requests-307688da.js";import{s as N}from"./requests-49708b6a.js";import{Z as V}from"./zus-aggregated-profile-e37b1b73.js";import{C as W,S as Y}from"./patient-helper-dd2ec7e9.js";import{P as j}from"./patient-provider-f0f3476b.js";import"./_commonjsHelpers-042e6b4d.js";import"./request-5a1df4c1.js";import"./values-0b6ffb91.js";import"./_baseForOwn-d8306f34.js";import"./_equalByTag-aaf39779.js";import"./_baseIsEqual-c150f525.js";import"./_baseToString-4993715b.js";import"./sortBy-919d7262.js";import"./_baseClone-25b1595e.js";import"./_createSet-12ef9b81.js";import"./toNumber-9b8ac844.js";import"./_basePickBy-239377e6.js";import"./mapValues-21907523.js";import"./isPlainObject-8e58b46f.js";import"./uniq-f5468222.js";import"./requests-42767b99.js";import"./sortBy-be5f7eb4.js";import"./patient-8f4a0ec9.js";import"./zus-da29a567.js";import"./use-patient-history-a9bfc2a1.js";import"./drawer-form-with-fields-8f8f158e.js";import"./drawer-ed34104d.js";import"./index-74f03c09.js";import"./use-watch-a9671586.js";import"./index-6de6b113.js";import"./spinner-66aa4ba7.js";import"./isEmpty-bcd6f1a3.js";import"./observation-78864c4d.js";import"./sort-1d0e5e85.js";import"./isString-35d4a3f2.js";import"./getPrototypeOf-9c757e77.js";import"./uniqWith-f1edcb30.js";import"./null-flavor-a197b3b2.js";import"./combobox-field-c49df400.js";import"./debounce-535e186e.js";import"./use-controllable-f15d4b9a.js";import"./calculate-active-index-048f6a58.js";import"./resource-details-drawer-f22bda8d.js";import"./document-icon-581c51b2.js";import"./collapsible-data-list-details-f7571cef.js";import"./loading-c7ff698a.js";import"./medication-history-a7a3b9b0.js";import"./error-boundary-00270a2d.js";import"./use-breakpoints-62d00209.js";import"./isEqual-b08f36b0.js";import"./coding-list-1d7c950f.js";import"./patient-observations-67aa0456.js";import"./table-be835e20.js";import"./filter-bar-8cce6d45.js";import"./use-filtered-sorted-data-74cb0f28.js";import"./index-4d501b15.js";import"./extends-98964cd2.js";import"./other-provider-meds-table-a5e46ee2.js";import"./use-medications-a1d4148a.js";import"./data-list-254aa0b0.js";import"./patient-allergies-05b9408b.js";import"./patient-careteam-5b23192a.js";import"./view-fhir-8f4f4169.js";import"./patient-documents-ef39aacc.js";import"./patient-immunizations-23f247d3.js";import"./patient-medications-77cd2b49.js";import"./provider-meds-table-726d9ea0.js";import"./patient-timeline-7c8445ab.js";import"./_commonjs-dynamic-modules-302442b1.js";function c({allergyIntolerance:d,otherConditions:p,patientConditions:E,providerMedications:Z,otherProviderMedications:T}){const l=b({allergyIntolerance:d}),R=U(),g=x({otherConditions:p,patientConditions:E}),_=L(),D=B(),M=H({providerMedications:Z,otherProviderMedications:T}),O=N();return{decorators:[...l.decorators,...g.decorators,...M.decorators],parameters:{msw:{handlers:{mocks:[...l.parameters.msw.handlers.mocks,...R.parameters.msw.handlers.mocks,...g.parameters.msw.handlers.mocks,..._.parameters.msw.handlers.mocks,...D.parameters.msw.handlers.mocks,...M.parameters.msw.handlers.mocks,...O.parameters.msw.handlers.mocks]}}}}}const gr={tags:["autodocs"],component:V,decorators:[(d,{args:p})=>u.createElement(W,{env:"dev",authToken:"ey.12345",builderId:"12345"},u.createElement(j,{patientID:"007",systemURL:Y},u.createElement(d,{args:p})))],args:{resources:void 0,forceHorizontalTabs:void 0,title:void 0,allergiesProps:void 0,conditionsProps:void 0,conditionsOutsideProps:void 0,documentsProps:void 0,immunizationsProps:void 0,medicationsProps:void 0,medicationsOutsideProps:void 0,removeBranding:void 0}},o={...c({allergyIntolerance:s,otherConditions:t,otherProviderMedications:m,patientConditions:n,providerMedications:a}),args:{resources:["conditions-outside","medications-outside"]}},r={...c({allergyIntolerance:s,otherConditions:t,otherProviderMedications:m,patientConditions:n,providerMedications:a}),args:{resources:["conditions","conditions-outside","medications","medications-outside"]}},i={...c({allergyIntolerance:s,otherConditions:t,otherProviderMedications:m,patientConditions:n,providerMedications:a}),args:{resources:["allergies","conditions","immunizations","documents"]}},e={...c({allergyIntolerance:s,otherConditions:t,otherProviderMedications:m,patientConditions:n,providerMedications:a}),args:{resources:["allergies","conditions","conditions-outside","documents","immunizations","medications","medications-outside","care-team","timelines"]}};var k,v,P;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(P=(v=o.parameters)==null?void 0:v.docs)==null?void 0:P.source}}};var f,h,C;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(C=(h=r.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};var A,y,I;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
}`,...(I=(y=i.parameters)==null?void 0:y.docs)==null?void 0:I.source}}};var z,S,w;e.parameters={...e.parameters,docs:{...(z=e.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
}`,...(w=(S=e.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};const Mr=["OutsideRecords","ConditionsAndMedications","ProblemsAndDocuments","Everything"];export{r as ConditionsAndMedications,e as Everything,o as OutsideRecords,i as ProblemsAndDocuments,Mr as __namedExportsOrder,gr as default};

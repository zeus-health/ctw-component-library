import{R as u}from"./index-6f814c40.js";import{s as b,a as s}from"./allergy-intolerance-843c0502.js";import{s as U}from"./requests-de488e23.js";import{s as x,Z as L,o as t,p as n}from"./requests-a055c48d.js";import{s as B}from"./requests-7d227eda.js";import{s as H}from"./requests-f33b2a30.js";import{s as N,o as a,p as m}from"./requests-c380c1df.js";import{s as V}from"./requests-49708b6a.js";import{C as W,S as Y}from"./patient-helper-2c738c95.js";import{P as j}from"./patient-provider-d2b81159.js";import"./_commonjsHelpers-042e6b4d.js";import"./request-5a1df4c1.js";import"./values-c30f357d.js";import"./_baseForOwn-56487e0e.js";import"./_equalByTag-3aa7c076.js";import"./_baseIsEqual-4b283a92.js";import"./_baseToString-ba0098b0.js";import"./sortBy-3860efd7.js";import"./_baseClone-0c3bfcab.js";import"./_createSet-3c80ad01.js";import"./toNumber-e7174cd4.js";import"./_basePickBy-a17ae44f.js";import"./mapValues-fd7519e7.js";import"./isPlainObject-8f51cb87.js";import"./uniq-f1be3f26.js";import"./zus-da29a567.js";import"./use-patient-history-63d810c0.js";import"./drawer-form-with-fields-5cad16b0.js";import"./drawer-ed34104d.js";import"./index-74f03c09.js";import"./use-watch-a9671586.js";import"./index-6de6b113.js";import"./spinner-66aa4ba7.js";import"./sortBy-64fcb484.js";import"./isEmpty-ee15a061.js";import"./observation-01e0cda8.js";import"./sort-b8885781.js";import"./isString-b8ede3fb.js";import"./getPrototypeOf-28a32d6e.js";import"./uniqWith-ade993ae.js";import"./null-flavor-ad182162.js";import"./combobox-field-ad9aa4cf.js";import"./debounce-d7732be0.js";import"./use-controllable-f15d4b9a.js";import"./calculate-active-index-048f6a58.js";import"./resource-details-drawer-9079b2c1.js";import"./document-icon-581c51b2.js";import"./collapsible-data-list-details-f7571cef.js";import"./loading-c7ff698a.js";import"./medication-history-c36c5fa9.js";import"./error-boundary-784d2b69.js";import"./use-breakpoints-04232dc9.js";import"./isEqual-38ff4822.js";import"./coding-list-1d7c950f.js";import"./patient-observations-a72b3226.js";import"./table-0bb423c6.js";import"./filter-bar-4f4b1b5d.js";import"./use-filtered-sorted-data-9e5fa73c.js";import"./index-4d501b15.js";import"./extends-98964cd2.js";import"./other-provider-meds-table-8e14e9c3.js";import"./use-medications-64655112.js";import"./data-list-254aa0b0.js";import"./patient-allergies-33665b1e.js";import"./patient-careteam-d6175954.js";import"./view-fhir-8db710ed.js";import"./requests-b4f1f2fc.js";import"./patient-immunizations-337b4b49.js";import"./patient-medications-f7defcea.js";import"./provider-meds-table-3c3b9e6e.js";import"./patient-timeline-d7416e26.js";import"./patient-8f4a0ec9.js";import"./_commonjs-dynamic-modules-302442b1.js";function c({allergyIntolerance:d,otherConditions:p,patientConditions:E,providerMedications:Z,otherProviderMedications:T}){const l=b({allergyIntolerance:d}),R=U(),g=x({otherConditions:p,patientConditions:E}),_=B(),D=H(),M=N({providerMedications:Z,otherProviderMedications:T}),O=V();return{decorators:[...l.decorators,...g.decorators,...M.decorators],parameters:{msw:{handlers:{mocks:[...l.parameters.msw.handlers.mocks,...R.parameters.msw.handlers.mocks,...g.parameters.msw.handlers.mocks,..._.parameters.msw.handlers.mocks,...D.parameters.msw.handlers.mocks,...M.parameters.msw.handlers.mocks,...O.parameters.msw.handlers.mocks]}}}}}const ur={tags:["autodocs"],component:L,decorators:[(d,{args:p})=>u.createElement(W,{env:"dev",authToken:"ey.12345",builderId:"12345"},u.createElement(j,{patientID:"007",systemURL:Y},u.createElement(d,{args:p})))],args:{resources:void 0,forceHorizontalTabs:void 0,title:void 0,allergiesProps:void 0,conditionsProps:void 0,conditionsOutsideProps:void 0,documentsProps:void 0,immunizationsProps:void 0,medicationsProps:void 0,medicationsOutsideProps:void 0,removeBranding:void 0}},o={...c({allergyIntolerance:s,otherConditions:t,otherProviderMedications:a,patientConditions:n,providerMedications:m}),args:{resources:["conditions-outside","medications-outside"]}},r={...c({allergyIntolerance:s,otherConditions:t,otherProviderMedications:a,patientConditions:n,providerMedications:m}),args:{resources:["conditions","conditions-outside","medications","medications-outside"]}},e={...c({allergyIntolerance:s,otherConditions:t,otherProviderMedications:a,patientConditions:n,providerMedications:m}),args:{resources:["allergies","conditions","immunizations","documents"]}},i={...c({allergyIntolerance:s,otherConditions:t,otherProviderMedications:a,patientConditions:n,providerMedications:m}),args:{resources:["allergies","conditions","conditions-outside","documents","immunizations","medications","medications-outside","care-team","timelines"]}};var k,v,P;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
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

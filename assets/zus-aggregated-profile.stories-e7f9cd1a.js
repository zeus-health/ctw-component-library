import{R as u}from"./index-6f814c40.js";import{s as b,a as i}from"./allergy-intolerance-2d8a37a5.js";import{s as U}from"./requests-de488e23.js";import{s as x,Z as L,o as t,p as n}from"./requests-a44b0011.js";import{s as B}from"./requests-55784193.js";import{s as H}from"./requests-f33b2a30.js";import{s as N,o as a,p as m}from"./requests-5e4f7bc2.js";import{s as V}from"./requests-49708b6a.js";import{C as W,S as Y}from"./patient-helper-4ebe4576.js";import{P as j}from"./patient-provider-f177e905.js";import"./_commonjsHelpers-042e6b4d.js";import"./request-5a1df4c1.js";import"./values-4e3b2a32.js";import"./_baseForOwn-56487e0e.js";import"./_equalByTag-3aa7c076.js";import"./_baseIsEqual-4b283a92.js";import"./_baseToString-ba0098b0.js";import"./sortBy-3860efd7.js";import"./_baseClone-0c3bfcab.js";import"./_createSet-3c80ad01.js";import"./toNumber-e7174cd4.js";import"./_basePickBy-a17ae44f.js";import"./mapValues-fd7519e7.js";import"./isPlainObject-8f51cb87.js";import"./uniq-f1be3f26.js";import"./zus-da29a567.js";import"./use-patient-history-c0063035.js";import"./drawer-form-with-fields-4295704d.js";import"./drawer-ae5dfefa.js";import"./index-74f03c09.js";import"./use-watch-c090a07f.js";import"./index-6de6b113.js";import"./spinner-66aa4ba7.js";import"./sortBy-64fcb484.js";import"./isEmpty-ee15a061.js";import"./conditions-ca51857b.js";import"./medication-history-63c4fdfe.js";import"./collapsible-data-list-details-4804f43b.js";import"./error-boundary-f6e58c27.js";import"./use-breakpoints-6cc97f57.js";import"./pickBy-f8467f8e.js";import"./loading-c7ff698a.js";import"./uniqWith-ade993ae.js";import"./isString-b8ede3fb.js";import"./combobox-field-c570bd32.js";import"./debounce-d7732be0.js";import"./calculate-active-index-dd804c80.js";import"./resource-details-drawer-f54d9874.js";import"./isEqual-38ff4822.js";import"./coding-list-1d7c950f.js";import"./table-0bb423c6.js";import"./patient-medications-23220133.js";import"./other-provider-meds-table-7172d150.js";import"./use-medications-8d9f63cc.js";import"./data-list-254aa0b0.js";import"./provider-meds-table-ed9e0367.js";import"./extends-98964cd2.js";import"./patient-allergies-7f34f336.js";import"./patient-careteam-222dc242.js";import"./view-fhir-2f529bc3.js";import"./requests-ddf3b026.js";import"./patient-immunizations-a3be3675.js";import"./patient-timeline-eb1f7cd0.js";import"./_commonjs-dynamic-modules-302442b1.js";function c({allergyIntolerance:d,otherConditions:p,patientConditions:E,providerMedications:Z,otherProviderMedications:T}){const l=b({allergyIntolerance:d}),R=U(),g=x({otherConditions:p,patientConditions:E}),_=B(),D=H(),M=N({providerMedications:Z,otherProviderMedications:T}),O=V();return{decorators:[...l.decorators,...g.decorators,...M.decorators],parameters:{msw:{handlers:{mocks:[...l.parameters.msw.handlers.mocks,...R.parameters.msw.handlers.mocks,...g.parameters.msw.handlers.mocks,..._.parameters.msw.handlers.mocks,...D.parameters.msw.handlers.mocks,...M.parameters.msw.handlers.mocks,...O.parameters.msw.handlers.mocks]}}}}}const re={tags:["autodocs"],component:L,decorators:[(d,{args:p})=>u.createElement(W,{env:"dev",authToken:"ey.12345",builderId:"12345"},u.createElement(j,{patientID:"007",systemURL:Y},u.createElement(d,{args:p})))],args:{resources:void 0,forceHorizontalTabs:void 0,title:void 0,allergiesProps:void 0,conditionsProps:void 0,conditionsOutsideProps:void 0,documentsProps:void 0,immunizationsProps:void 0,medicationsProps:void 0,medicationsOutsideProps:void 0,removeBranding:void 0}},o={...c({allergyIntolerance:i,otherConditions:t,otherProviderMedications:a,patientConditions:n,providerMedications:m}),args:{resources:["conditions-outside","medications-outside"]}},e={...c({allergyIntolerance:i,otherConditions:t,otherProviderMedications:a,patientConditions:n,providerMedications:m}),args:{resources:["conditions","conditions-outside","medications","medications-outside"]}},s={...c({allergyIntolerance:i,otherConditions:t,otherProviderMedications:a,patientConditions:n,providerMedications:m}),args:{resources:["allergies","conditions","immunizations","documents"]}},r={...c({allergyIntolerance:i,otherConditions:t,otherProviderMedications:a,patientConditions:n,providerMedications:m}),args:{resources:["allergies","conditions","conditions-outside","documents","immunizations","medications","medications-outside","care-team","timelines"]}};var k,v,P;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(P=(v=o.parameters)==null?void 0:v.docs)==null?void 0:P.source}}};var h,f,C;e.parameters={...e.parameters,docs:{...(h=e.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(C=(f=e.parameters)==null?void 0:f.docs)==null?void 0:C.source}}};var A,y,I;s.parameters={...s.parameters,docs:{...(A=s.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
}`,...(I=(y=s.parameters)==null?void 0:y.docs)==null?void 0:I.source}}};var z,S,w;r.parameters={...r.parameters,docs:{...(z=r.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
}`,...(w=(S=r.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};const ie=["OutsideRecords","ConditionsAndMedications","ProblemsAndDocuments","Everything"];export{e as ConditionsAndMedications,r as Everything,o as OutsideRecords,s as ProblemsAndDocuments,ie as __namedExportsOrder,re as default};

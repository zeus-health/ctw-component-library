import{R as u}from"./index-6f814c40.js";import{s as b,a as t}from"./allergy-intolerance-0294babd.js";import{s as U}from"./requests-c48ca9bc.js";import{s as x,Z as L,o as s,p as n}from"./requests-87fbf20a.js";import{s as B}from"./requests-1938be2c.js";import{s as H}from"./requests-fd0d8406.js";import{s as N,o as a,p as m}from"./requests-47e5cb49.js";import{s as V}from"./requests-dda51161.js";import{C as W,S as Y}from"./patient-helper-c5d8ffd5.js";import{P as j}from"./patient-provider-76317411.js";import"./_commonjsHelpers-042e6b4d.js";import"./values-fdc68ea6.js";import"./_baseForOwn-56487e0e.js";import"./_equalByTag-3aa7c076.js";import"./_baseIsEqual-4b283a92.js";import"./_baseToString-ba0098b0.js";import"./sortBy-9842b21c.js";import"./_baseClone-0c3bfcab.js";import"./_createSet-823d7c6f.js";import"./toNumber-711c0fc1.js";import"./_basePickBy-a17ae44f.js";import"./mapValues-fd7519e7.js";import"./isPlainObject-8f51cb87.js";import"./uniq-1e65cdac.js";import"./zus-da29a567.js";import"./use-patient-history-6563fe99.js";import"./drawer-form-with-fields-6b5cedfe.js";import"./drawer-ae5dfefa.js";import"./index-74f03c09.js";import"./use-watch-c090a07f.js";import"./index-6de6b113.js";import"./spinner-66aa4ba7.js";import"./sortBy-6991f27f.js";import"./isEmpty-ee15a061.js";import"./request-6a310bae.js";import"./conditions-a23ac02f.js";import"./medication-history-79fc6d0f.js";import"./collapsible-data-list-details-4804f43b.js";import"./error-boundary-139bb980.js";import"./use-breakpoints-f3785528.js";import"./pickBy-f8467f8e.js";import"./loading-c7ff698a.js";import"./uniqWith-26eb98cb.js";import"./isString-b8ede3fb.js";import"./combobox-field-1ac78f32.js";import"./debounce-0d3e7ec9.js";import"./calculate-active-index-dd804c80.js";import"./resource-details-drawer-86a774c0.js";import"./isEqual-38ff4822.js";import"./coding-list-1d7c950f.js";import"./table-18dfc5b5.js";import"./patient-medications-e76e41eb.js";import"./other-provider-meds-table-62f97d69.js";import"./use-medications-2c60ce55.js";import"./data-list-254aa0b0.js";import"./provider-meds-table-7f405c72.js";import"./extends-98964cd2.js";import"./patient-allergies-180765df.js";import"./patient-careteam-b33eb636.js";import"./view-fhir-c5264c4f.js";import"./requests-edc49a2c.js";import"./patient-immunizations-40e703ef.js";import"./patient-timeline-56355b2f.js";import"./_commonjs-dynamic-modules-302442b1.js";function c({allergyIntolerance:d,otherConditions:p,patientConditions:E,providerMedications:Z,otherProviderMedications:T}){const l=b({allergyIntolerance:d}),R=U(),g=x({otherConditions:p,patientConditions:E}),_=B(),D=H(),M=N({providerMedications:Z,otherProviderMedications:T}),O=V();return{decorators:[...l.decorators,...g.decorators,...M.decorators],parameters:{msw:[...l.parameters.msw,...R.parameters.msw,...g.parameters.msw,..._.parameters.msw,...D.parameters.msw,...M.parameters.msw,...O.parameters.msw]}}}const re={tags:["autodocs"],component:L,decorators:[(d,{args:p})=>u.createElement(W,{env:"dev",authToken:"ey.12345",builderId:"12345"},u.createElement(j,{patientID:"007",systemURL:Y},u.createElement(d,{args:p})))],args:{resources:void 0,forceHorizontalTabs:void 0,title:void 0,allergiesProps:void 0,conditionsProps:void 0,conditionsOutsideProps:void 0,documentsProps:void 0,immunizationsProps:void 0,medicationsProps:void 0,medicationsOutsideProps:void 0,removeBranding:void 0}},o={...c({allergyIntolerance:t,otherConditions:s,otherProviderMedications:a,patientConditions:n,providerMedications:m}),args:{resources:["conditions-outside","medications-outside"]}},e={...c({allergyIntolerance:t,otherConditions:s,otherProviderMedications:a,patientConditions:n,providerMedications:m}),args:{resources:["conditions","conditions-outside","medications","medications-outside"]}},i={...c({allergyIntolerance:t,otherConditions:s,otherProviderMedications:a,patientConditions:n,providerMedications:m}),args:{resources:["allergies","conditions","immunizations","documents"]}},r={...c({allergyIntolerance:t,otherConditions:s,otherProviderMedications:a,patientConditions:n,providerMedications:m}),args:{resources:["allergies","conditions","conditions-outside","documents","immunizations","medications","medications-outside","care-team","timelines"]}};var v,P,f;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(f=(P=o.parameters)==null?void 0:P.docs)==null?void 0:f.source}}};var k,C,h;e.parameters={...e.parameters,docs:{...(k=e.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(h=(C=e.parameters)==null?void 0:C.docs)==null?void 0:h.source}}};var A,y,I;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
}`,...(I=(y=i.parameters)==null?void 0:y.docs)==null?void 0:I.source}}};var z,S,w;r.parameters={...r.parameters,docs:{...(z=r.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
}`,...(w=(S=r.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};const te=["OutsideRecords","ConditionsAndMedications","ProblemsAndDocuments","Everything"];export{e as ConditionsAndMedications,r as Everything,o as OutsideRecords,i as ProblemsAndDocuments,te as __namedExportsOrder,re as default};

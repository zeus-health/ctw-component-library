import{R as i}from"./index-6f814c40.js";import{a as d}from"./chunk-NX5DM7EF-906d95d8.js";import{Z as p}from"./zus-aggregated-profile-56625fab.js";import{s as m,p as l,o as u}from"./requests-7e376b75.js";import{C as c,S as P}from"./patient-helper-9cec045f.js";import{P as f}from"./patient-provider-1d2019d5.js";import"./_commonjsHelpers-042e6b4d.js";import"./zus-0068c570.js";import"./index-74f03c09.js";import"./_baseToString-4993715b.js";import"./_equalByTag-aaf39779.js";import"./sortBy-be5f7eb4.js";import"./sortBy-919d7262.js";import"./_baseForOwn-d8306f34.js";import"./_baseIsEqual-c150f525.js";import"./_baseClone-25b1595e.js";import"./_createSet-12ef9b81.js";import"./toNumber-9b8ac844.js";import"./isPlainObject-8e58b46f.js";import"./debounce-535e186e.js";import"./isEmpty-bcd6f1a3.js";import"./use-controllable-046cc6fb.js";import"./use-watch-a9671586.js";import"./use-patient-history-1b0d79da.js";import"./drawer-ed34104d.js";import"./index-6de6b113.js";import"./spinner-66aa4ba7.js";import"./request-5a1df4c1.js";import"./sort-d9d9545a.js";import"./_basePickBy-239377e6.js";import"./getPrototypeOf-9c757e77.js";import"./uniqWith-f1edcb30.js";import"./uniq-f5468222.js";import"./null-flavor-e3af2468.js";import"./values-6943c5c5.js";import"./mapValues-21907523.js";import"./isString-35d4a3f2.js";import"./resource-details-drawer-d5f4f7b7.js";import"./document-icon-581c51b2.js";import"./collapsible-data-list-details-f7571cef.js";import"./loading-c7ff698a.js";import"./medication-history-9c842180.js";import"./error-boundary-efa22454.js";import"./use-breakpoints-40011340.js";import"./isEqual-b08f36b0.js";import"./coding-list-1d7c950f.js";import"./patient-observations-3e843db7.js";import"./table-8ff108f6.js";import"./index-4d501b15.js";import"./extends-98964cd2.js";import"./data-list-254aa0b0.js";import"./patient-allergies-5f7c3c8d.js";import"./patient-careteam-5cf96f96.js";import"./view-fhir-d8a31a51.js";import"./patient-documents-e467e827.js";import"./patient-immunizations-16df52fc.js";import"./patient-timeline-6198c107.js";import"./patient-8f4a0ec9.js";import"./_commonjs-dynamic-modules-302442b1.js";const t=e=>i.createElement(p,{hideTitle:!0,resources:["medications","medications-outside"],...e,medicationsProps:e,medicationsOutsideProps:e});try{t.displayName="PatientMedicationsProfile",t.__docgenInfo={description:"",displayName:"PatientMedicationsProfile",props:{allergiesProps:{defaultValue:null,description:"",name:"allergiesProps",required:!1,type:{name:"PatientAllergiesProps"}},careTeamProps:{defaultValue:null,description:"",name:"careTeamProps",required:!1,type:{name:"PatientCareTeamProps"}},conditionsProps:{defaultValue:null,description:"",name:"conditionsProps",required:!1,type:{name:"PatientConditionsProps"}},conditionsOutsideProps:{defaultValue:null,description:"",name:"conditionsOutsideProps",required:!1,type:{name:"PatientConditionsOutsideProps"}},documentsProps:{defaultValue:null,description:"",name:"documentsProps",required:!1,type:{name:"PatientDocumentProps"}},immunizationsProps:{defaultValue:null,description:"",name:"immunizationsProps",required:!1,type:{name:"PatientImmunizationsProps"}},medicationsProps:{defaultValue:null,description:"",name:"medicationsProps",required:!1,type:{name:"PatientMedicationsProps"}},medicationsOutsideProps:{defaultValue:null,description:"",name:"medicationsOutsideProps",required:!1,type:{name:"PatientMedicationsOutsideProps"}},observationsProps:{defaultValue:null,description:"",name:"observationsProps",required:!1,type:{name:"PatientObservationsProps"}},observationsOutsideProps:{defaultValue:null,description:"",name:"observationsOutsideProps",required:!1,type:{name:"PatientObservationsOutsideProps"}},timelineProps:{defaultValue:null,description:"",name:"timelineProps",required:!1,type:{name:"PatientTimelineProps"}},forceHorizontalTabs:{defaultValue:null,description:"",name:"forceHorizontalTabs",required:!1,type:{name:"boolean"}},title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}},hideTitle:{defaultValue:null,description:"",name:"hideTitle",required:!1,type:{name:"boolean"}},removeBranding:{defaultValue:null,description:"",name:"removeBranding",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},onOpenHistoryDrawer:{defaultValue:null,description:"",name:"onOpenHistoryDrawer",required:!1,type:{name:"((() => void) & (() => void))"}},onAddToRecord:{defaultValue:null,description:"",name:"onAddToRecord",required:!1,type:{name:"((record: MedicationStatementModel) => void)"}},readOnly:{defaultValue:null,description:"",name:"readOnly",required:!1,type:{name:"boolean"}}}}}catch{}module&&module.hot&&module.hot.decline&&module.hot.decline();const Oe={tags:["autodocs"],component:t,decorators:[(e,{args:s})=>i.createElement(c,{env:"dev",authToken:"ey.12345",builderId:"12345"},i.createElement(f,{patientID:"007",systemURL:P},i.createElement(e,{args:s})))],argTypes:{onOpenHistoryDrawer:{action:"open history drawer"},onAddToRecord:{options:["Drawer","Log Action"],control:"select",mapping:{Drawer:void 0,"Log Action":d("add to record")}}},args:{readOnly:!1,forceHorizontalTabs:!1,onAddToRecord:"Drawer"}},o={...m({providerMedications:l,otherProviderMedications:u})};var r,a,n;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
  ...setupMedicationMocks({
    providerMedications,
    otherProviderMedications
  })
}`,...(n=(a=o.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};const Te=["Basic"];export{o as Basic,Te as __namedExportsOrder,Oe as default};

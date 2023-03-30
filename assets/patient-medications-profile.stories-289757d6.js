import{R as i}from"./index-6f814c40.js";import{a as p}from"./chunk-NX5DM7EF-906d95d8.js";import{Z as d}from"./zus-aggregated-profile-a84b6bd7.js";import{s as m,p as l,o as u}from"./requests-c1194a44.js";import{C as c,S as P}from"./patient-helper-faf3a61f.js";import{P as f}from"./patient-provider-8a86ab30.js";import"./_commonjsHelpers-042e6b4d.js";import"./zus-7ea11dab.js";import"./index-74f03c09.js";import"./_baseToString-2a4c2757.js";import"./_equalByTag-5ee6784b.js";import"./sortBy-1cabbe82.js";import"./sortBy-649a17b3.js";import"./_baseForOwn-54d22bab.js";import"./_baseIsEqual-1cb0d27b.js";import"./_baseClone-184e5c2b.js";import"./_createSet-014fa0cf.js";import"./toNumber-50f0b3d6.js";import"./isPlainObject-bc149fd7.js";import"./debounce-44376e67.js";import"./isEmpty-67f2860b.js";import"./use-controllable-046cc6fb.js";import"./use-watch-a9671586.js";import"./use-patient-history-ba2df887.js";import"./drawer-2856393a.js";import"./transition-19b92c4a.js";import"./index-6de6b113.js";import"./spinner-66aa4ba7.js";import"./request-3ce689a7.js";import"./observation-23ccec5c.js";import"./_basePickBy-53e340c6.js";import"./getPrototypeOf-b690d638.js";import"./details-card-1ac2a254.js";import"./index-4d501b15.js";import"./uniq-789c9501.js";import"./isString-69148acc.js";import"./values-2f84f633.js";import"./mapValues-34771cfa.js";import"./history-16d250d5.js";import"./diagnostic-report-9a098a55.js";import"./extends-98964cd2.js";import"./table-48423089.js";import"./use-breakpoints-37a2de56.js";import"./error-boundary-c91d4794.js";import"./resource-details-drawer-33652b0b.js";import"./loading-c7ff698a.js";import"./isEqual-ee96640d.js";import"./coding-list-1d7c950f.js";import"./encounters-770c1165.js";import"./data-list-254aa0b0.js";import"./medication-history-0dbf603a.js";import"./patient-observations-9732df37.js";import"./patient-allergies-00aa50cb.js";import"./patient-careteam-620f6ea2.js";import"./view-fhir-fe3267db.js";import"./patient-documents-bcdb2ced.js";import"./patient-immunizations-64936618.js";import"./patient-timeline-0989a387.js";import"./medication-request-23eea7be.js";import"./patient-8f4a0ec9.js";import"./_commonjs-dynamic-modules-302442b1.js";const t=e=>i.createElement(d,{hideTitle:!0,resources:["medications","medications-outside"],...e,medicationsProps:e,medicationsOutsideProps:e});try{t.displayName="PatientMedicationsProfile",t.__docgenInfo={description:"",displayName:"PatientMedicationsProfile",props:{allergiesProps:{defaultValue:null,description:"",name:"allergiesProps",required:!1,type:{name:"PatientAllergiesProps"}},careTeamProps:{defaultValue:null,description:"",name:"careTeamProps",required:!1,type:{name:"PatientCareTeamProps"}},conditionsProps:{defaultValue:null,description:"",name:"conditionsProps",required:!1,type:{name:"PatientConditionsProps"}},conditionsOutsideProps:{defaultValue:null,description:"",name:"conditionsOutsideProps",required:!1,type:{name:"PatientConditionsOutsideProps"}},documentsProps:{defaultValue:null,description:"",name:"documentsProps",required:!1,type:{name:"PatientDocumentProps"}},immunizationsProps:{defaultValue:null,description:"",name:"immunizationsProps",required:!1,type:{name:"PatientImmunizationsProps"}},medicationsProps:{defaultValue:null,description:"",name:"medicationsProps",required:!1,type:{name:"PatientMedicationsProps"}},medicationsOutsideProps:{defaultValue:null,description:"",name:"medicationsOutsideProps",required:!1,type:{name:"PatientMedicationsOutsideProps"}},observationsProps:{defaultValue:null,description:"",name:"observationsProps",required:!1,type:{name:"PatientObservationsProps"}},observationsOutsideProps:{defaultValue:null,description:"",name:"observationsOutsideProps",required:!1,type:{name:"PatientObservationsOutsideProps"}},timelineProps:{defaultValue:null,description:"",name:"timelineProps",required:!1,type:{name:"PatientTimelineProps"}},forceHorizontalTabs:{defaultValue:null,description:"",name:"forceHorizontalTabs",required:!1,type:{name:"boolean"}},title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}},hideTitle:{defaultValue:null,description:"",name:"hideTitle",required:!1,type:{name:"boolean"}},removeBranding:{defaultValue:null,description:"",name:"removeBranding",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},onOpenHistoryDrawer:{defaultValue:null,description:"",name:"onOpenHistoryDrawer",required:!1,type:{name:"((() => void) & (() => void))"}},onAddToRecord:{defaultValue:null,description:"",name:"onAddToRecord",required:!1,type:{name:"((record: MedicationStatementModel) => void)"}},readOnly:{defaultValue:null,description:"",name:"readOnly",required:!1,type:{name:"boolean"}}}}}catch{}module&&module.hot&&module.hot.decline&&module.hot.decline();const Me={tags:["autodocs"],component:t,decorators:[(e,{args:s})=>i.createElement(c,{env:"dev",authToken:"ey.12345",builderId:"12345"},i.createElement(f,{patientID:"007",systemURL:P},i.createElement(e,{args:s})))],argTypes:{onOpenHistoryDrawer:{action:"open history drawer"},onAddToRecord:{options:["Drawer","Log Action"],control:"select",mapping:{Drawer:void 0,"Log Action":p("add to record")}}},args:{readOnly:!1,forceHorizontalTabs:!1,onAddToRecord:"Drawer"}},o={...m({providerMedications:l,otherProviderMedications:u})};var r,a,n;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
  ...setupMedicationMocks({
    providerMedications,
    otherProviderMedications
  })
}`,...(n=(a=o.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};const be=["Basic"];export{o as Basic,be as __namedExportsOrder,Me as default};

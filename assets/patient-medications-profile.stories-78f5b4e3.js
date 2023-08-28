import{R as a}from"./index-9f32f44c.js";import{v as T}from"./v4-a960c1f4.js";import{Z as M,C as h,F as E,a as b,b as R,c as I,S}from"./patient-allergies-07dac867.js";import{s as y,p as g,o as O}from"./provider-medications-e795a415.js";import"./_commonjsHelpers-de833af9.js";import"./index-a587463d.js";import"./mapValues-f5c9933d.js";import"./action-list-3a19f227.js";import"./uniq-e6b61686.js";import"./toNumber-e602a9ae.js";import"./isPlainObject-7ebeb0f0.js";import"./request-bddbdd10.js";import"./extends-b0376464.js";import"./index-ac52ee4a.js";import"./index-9c2d1831.js";import"./debounce-9165c1d3.js";import"./spinner-096fc82a.js";import"./data-list-2854f463.js";import"./index-ebe38276.js";import"./medication-request-c9056305.js";import"./basic-83d56891.js";import"./requests-cfedd314.js";import"./types-6e67dc97.js";const s=e=>a.createElement(M,{hideTitle:!0,resources:["medications","medications-outside"],...e,medicationsProps:e,medicationsOutsideProps:e});try{s.displayName="PatientMedicationsProfile",s.__docgenInfo={description:"",displayName:"PatientMedicationsProfile",props:{allergiesProps:{defaultValue:null,description:"",name:"allergiesProps",required:!1,type:{name:"PatientAllergiesProps"}},careTeamProps:{defaultValue:null,description:"",name:"careTeamProps",required:!1,type:{name:"PatientCareTeamProps"}},conditionsProps:{defaultValue:null,description:"",name:"conditionsProps",required:!1,type:{name:"PatientConditionsProps"}},conditionsOutsideProps:{defaultValue:null,description:"",name:"conditionsOutsideProps",required:!1,type:{name:"PatientConditionsOutsideProps"}},conditionsAllProps:{defaultValue:null,description:"",name:"conditionsAllProps",required:!1,type:{name:"PatientConditionsAllProps"}},diagnosticReportsProps:{defaultValue:null,description:"",name:"diagnosticReportsProps",required:!1,type:{name:"PatientDiagnosticReportsProps"}},documentsProps:{defaultValue:null,description:"",name:"documentsProps",required:!1,type:{name:"PatientDocumentsProps"}},immunizationsProps:{defaultValue:null,description:"",name:"immunizationsProps",required:!1,type:{name:"PatientImmunizationsProps"}},medicationsProps:{defaultValue:null,description:"",name:"medicationsProps",required:!1,type:{name:"PatientMedicationsProps"}},medicationsOutsideProps:{defaultValue:null,description:"",name:"medicationsOutsideProps",required:!1,type:{name:"PatientMedicationsOutsideProps"}},medicationsAllProps:{defaultValue:null,description:"",name:"medicationsAllProps",required:!1,type:{name:"PatientMedicationsAllProps"}},timelineProps:{defaultValue:null,description:"",name:"timelineProps",required:!1,type:{name:"PatientTimelineProps"}},encounterProps:{defaultValue:null,description:"",name:"encounterProps",required:!1,type:{name:"PatientEncountersProps"}},forceHorizontalTabs:{defaultValue:null,description:"",name:"forceHorizontalTabs",required:!1,type:{name:"boolean"}},includePatientDemographicsForm:{defaultValue:null,description:"",name:"includePatientDemographicsForm",required:!1,type:{name:"boolean"}},title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}},hideTitle:{defaultValue:null,description:"",name:"hideTitle",required:!1,type:{name:"boolean"}},removeBranding:{defaultValue:null,description:"",name:"removeBranding",required:!1,type:{name:"boolean"}},removeRequestRecords:{defaultValue:null,description:"",name:"removeRequestRecords",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},onOpenHistoryDrawer:{defaultValue:null,description:"",name:"onOpenHistoryDrawer",required:!1,type:{name:"((() => void) & (() => void))"}},onAddToRecord:{defaultValue:null,description:"",name:"onAddToRecord",required:!1,type:{name:"((record: MedicationStatementModel) => void)"}},readOnly:{defaultValue:null,description:"",name:"readOnly",required:!1,type:{name:"boolean"}}}}}catch{}var w="storybook/actions",B=`${w}/action-event`;const{addons:F}=__STORYBOOK_MODULE_PREVIEW_API__;var z={depth:10,clearOnStoryChange:!0,limit:50},v=(e,t)=>{let o=Object.getPrototypeOf(e);return!o||t(o)?o:v(o,t)},j=e=>!!(typeof e=="object"&&e&&v(e,t=>/^Synthetic(?:Base)?Event$/.test(t.constructor.name))&&typeof e.persist=="function"),C=e=>{if(j(e)){let t=Object.create(e.constructor.prototype,Object.getOwnPropertyDescriptors(e));t.persist();let o=Object.getOwnPropertyDescriptor(t,"view"),r=o==null?void 0:o.value;return typeof r=="object"&&(r==null?void 0:r.constructor.name)==="Window"&&Object.defineProperty(t,"view",{...o,value:Object.create(r.constructor.prototype)}),t}return e};function N(e,t={}){let o={...z,...t},r=function(...l){let _=F.getChannel(),A=T(),V=5,d=l.map(C),q=l.length>1?d:d[0],D={id:A,count:0,data:{name:e,args:q},options:{...o,maxDepth:V+(o.depth||3),allowFunction:o.allowFunction||!1}};_.emit(B,D)};return r.isAction=!0,r}const de={tags:["autodocs"],component:s,decorators:[(e,{args:t})=>a.createElement(h,{env:"dev",authToken:E,builderId:b},a.createElement(R,{patientID:I,systemURL:S},a.createElement(e,{args:t})))],argTypes:{onOpenHistoryDrawer:{action:"open history drawer"},onAddToRecord:{options:["Drawer","Log Action"],control:"select",mapping:{Drawer:void 0,"Log Action":N("add to record")}}},args:{readOnly:!1,forceHorizontalTabs:!1,onAddToRecord:"Drawer"}},i={...y({providerMedications:g,otherProviderMedications:O})},n={...y({providerMedications:g,otherProviderMedications:O})};var p,c,u;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`{
  ...setupMedicationMocks({
    providerMedications,
    otherProviderMedications
  })
}`,...(u=(c=i.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var m,P,f;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  ...setupMedicationMocks({
    providerMedications,
    otherProviderMedications
  })
}`,...(f=(P=n.parameters)==null?void 0:P.docs)==null?void 0:f.source}}};const pe=["Basic","BasicFQS"];export{i as Basic,n as BasicFQS,pe as __namedExportsOrder,de as default};

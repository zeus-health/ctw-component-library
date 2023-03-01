import{R as e}from"./index-6f814c40.js";import{P as H,s as L,a as m}from"./allergy-intolerance-60687d5f.js";import{P as W,s as F}from"./requests-2394bc1b.js";import{P as E,B as G,s as Y,o as l,p}from"./requests-abe833c6.js";import{P as j,s as J}from"./requests-dacdf75e.js";import{P as K,s as Q}from"./requests-5c203dd9.js";import{s as X,o as u,p as g}from"./requests-1e8d4ddf.js";import{P as $,s as ee}from"./requests-f5478491.js";import{B as te}from"./other-provider-meds-table-88c5db10.js";import{O as oe}from"./patient-medications-71b6e7ad.js";import{P as ie}from"./provider-meds-table-037316a7.js";import{w as se,T as re}from"./error-boundary-3c619f42.js";import{T as ne}from"./tab-group-e985f29f.js";import{C as ae,S as de}from"./patient-helper-0f09a661.js";import{P as ce}from"./patient-provider-36691a31.js";import"./_commonjsHelpers-042e6b4d.js";import"./values-28adb33b.js";import"./_baseForOwn-03e9c2f3.js";import"./_equalByTag-eda72788.js";import"./_baseIsEqual-7d59e24c.js";import"./_baseToString-7c0e3f59.js";import"./sortBy-ee350c06.js";import"./_baseClone-3ae78372.js";import"./_createSet-6ff8e1d4.js";import"./toNumber-d7ce3bd9.js";import"./_basePickBy-b5376a08.js";import"./mapValues-c63fd567.js";import"./isPlainObject-243fdc78.js";import"./uniq-8676ca12.js";import"./resource-details-drawer-dbf0f9f3.js";import"./modal-ccda-7fef5eea.js";import"./request-5d5ec5f4.js";import"./index-74f03c09.js";import"./sortBy-3347ffe9.js";import"./isEmpty-258cb052.js";import"./collapsible-data-list-details-4a1431c5.js";import"./drawer-ef795dd3.js";import"./index-6de6b113.js";import"./loading-c7ff698a.js";import"./spinner-66aa4ba7.js";import"./table-d8430721.js";import"./isEqual-298b6ab1.js";import"./uniqWith-79e2a4b4.js";import"./use-breakpoints-048d0685.js";import"./view-fhir-225468b4.js";import"./conditions-6b0d63ea.js";import"./sort-618282df.js";import"./isString-933c0e0c.js";import"./pickBy-f6e57f40.js";import"./drawer-form-with-fields-015f9f96.js";import"./badge-048a5819.js";import"./debounce-5029c56d.js";import"./calculate-active-index-415ace96.js";import"./coding-list-1d7c950f.js";import"./dropdown-action-menu-a1855eee.js";import"./extends-98964cd2.js";import"./use-patient-history-2ced0523.js";import"./requests-49796f96.js";import"./use-medications-4de61b0b.js";import"./data-list-254aa0b0.js";import"./_commonjs-dynamic-modules-302442b1.js";const me=""+new URL("zus-e8138a64.svg",import.meta.url).href,le={allergies:(t={})=>({key:"allergies-builder-records",getPanelClassName:()=>"ctw-pt-5",display:()=>"allergy list",render:()=>e.createElement(H,{...t})}),"care-team":(t={})=>({key:"care-team",display:()=>"care team",render:()=>e.createElement(W,{...t})}),conditions:(t={})=>({key:"condition-provider-records",display:()=>"conditions list",render:()=>e.createElement(E,{hideOutsideOwnedRecords:!0,...t})}),"conditions-outside":(t={})=>({key:"condition-outside-records",display:()=>e.createElement(e.Fragment,null,e.createElement("span",{className:"ctw-pr-2 ctw-capitalize"},"outside conditions"),e.createElement(G,null)),render:()=>e.createElement(E,{hideBuilderOwnedRecords:!0,...t})}),documents:(t={})=>({key:"documents",getPanelClassName:()=>"ctw-pt-5",display:()=>"documents",render:()=>e.createElement(j,{...t})}),immunizations:(t={})=>({key:"immunization-outside-records",getPanelClassName:()=>"ctw-pt-5",display:()=>"immunizations",render:()=>e.createElement(K,{...t})}),medications:(t={})=>({key:"medication-builder-records",getPanelClassName:()=>"ctw-pt-5",display:()=>"medication list",render:()=>e.createElement(ie,{...t})}),"medications-outside":(t={})=>({key:"other-provider-records",display:()=>e.createElement(e.Fragment,null,e.createElement("span",{className:"ctw-pr-2 ctw-capitalize"},"outside medications"),e.createElement(te,null)),render:()=>e.createElement(oe,{...t})}),timelines:(t={})=>({key:"timelines",getPanelClassName:()=>"ctw-pt-5",display:()=>"encounter timeline",render:()=>e.createElement($,{...t})})},pe=({forceHorizontalTabs:t=!1,allergiesProps:o,careTeamProps:f,conditionsProps:w,conditionsOutsideProps:y,documentsProps:i,immunizationsProps:v,medicationsProps:s,medicationsOutsideProps:h,timelineProps:b,resources:r,title:M="Outside Records",removeBranding:S=!1})=>{const x={allergies:o,"care-team":f,conditions:w,"conditions-outside":y,documents:i,timelines:b,immunizations:v,medications:s,"medications-outside":h},D=r.map(C=>{const U=x[C]??{};return le[C](U)});return e.createElement("div",{className:"ctw-zus-aggregated-profile ctw-p-5"},e.createElement(re,{className:"ctw-border-b-2 ctw-border-r-0 ctw-border-l-0 ctw-border-t-0 ctw-border-solid ctw-border-divider-light"},e.createElement("h3",{className:"ctw-m-0 ctw-inline-block ctw-p-0 ctw-pb-3 ctw-text-lg ctw-font-medium"},M," ",!S&&e.createElement("span",{className:"ctw-text-sm ctw-font-light ctw-italic ctw-text-content-light"},"Powered by ",e.createElement("img",{src:me,alt:"Zus",className:"-ctw-mb-1.5"})))),e.createElement(ne,{content:D,forceHorizontalTabs:t}))},k=se(pe,"ZusAggregatedProfile");try{k.displayName="ZusAggregatedProfile",k.__docgenInfo={description:`ZusAggregatedProfile allows developers to utilize most of the components
available in this library as a single customizable component with tabbed
navigation. Simply pass an array with the names of the desired resources
to include _(see below)_.

It's possible to set a custom title for the ZusAggregatedProfile component,
making it a single component which can be used to create a handful of
different widgets within an app.

\`\`\`
export const ZusMedsWidget = <ZusAggregatedProfile
  title="Medications"
  resources={["medications", "medications-outside"]}
/>

export const ZusProblemsWidget = <ZusAggregatedProfile
  title="Problems"
  resources={["allergies", "conditions", "conditions-outside"]}
/>
\`\`\`
The complete set of available resources in the ZusAggregatedProfile are
"allergies", "care-team", "conditions", "documents", "conditions-outside",
"immunizations", "medications", "medications-outside" and "timelines".`,displayName:"ZusAggregatedProfile",props:{resources:{defaultValue:null,description:"",name:"resources",required:!0,type:{name:"ZAPResourceName[]"}},forceHorizontalTabs:{defaultValue:{value:"false"},description:"",name:"forceHorizontalTabs",required:!1,type:{name:"boolean"}},title:{defaultValue:{value:"Outside Records"},description:"",name:"title",required:!1,type:{name:"string"}},removeBranding:{defaultValue:{value:"false"},description:"",name:"removeBranding",required:!1,type:{name:"boolean"}},allergiesProps:{defaultValue:null,description:"",name:"allergiesProps",required:!1,type:{name:"PatientAllergiesProps"}},careTeamProps:{defaultValue:null,description:"",name:"careTeamProps",required:!1,type:{name:"PatientCareTeamProps"}},conditionsProps:{defaultValue:null,description:"",name:"conditionsProps",required:!1,type:{name:'Omit<PatientConditionsProps, "hideBuilderOwnedRecords" | "hideOutsideOwnedRecords">'}},conditionsOutsideProps:{defaultValue:null,description:"",name:"conditionsOutsideProps",required:!1,type:{name:'Omit<PatientConditionsProps, "hideBuilderOwnedRecords" | "hideOutsideOwnedRecords">'}},documentsProps:{defaultValue:null,description:"",name:"documentsProps",required:!1,type:{name:"PatientDocumentProps"}},immunizationsProps:{defaultValue:null,description:"",name:"immunizationsProps",required:!1,type:{name:"PatientImmunizationsProps"}},medicationsProps:{defaultValue:null,description:"",name:"medicationsProps",required:!1,type:{name:"ProviderMedsTableProps"}},medicationsOutsideProps:{defaultValue:null,description:"",name:"medicationsOutsideProps",required:!1,type:{name:"OtherProviderMedsTableProps"}},timelineProps:{defaultValue:null,description:"",name:"timelineProps",required:!1,type:{name:"PatientTimelineProps"}}}}}catch{}function P({allergyIntolerance:t,otherConditions:o,patientConditions:f,providerMedications:w,otherProviderMedications:y}){const i=L({allergyIntolerance:t}),v=F(),s=Y({otherConditions:o,patientConditions:f}),h=J(),b=Q(),r=X({providerMedications:w,otherProviderMedications:y}),M=ee();return{decorators:[...i.decorators,...s.decorators,...r.decorators],parameters:{msw:[...i.parameters.msw,...v.parameters.msw,...s.parameters.msw,...h.parameters.msw,...b.parameters.msw,...r.parameters.msw,...M.parameters.msw]}}}const ht={tags:["autodocs"],component:k,decorators:[(t,{args:o})=>e.createElement(ae,{env:"dev",authToken:"ey.12345",builderId:"12345"},e.createElement(ce,{patientID:"007",systemURL:de},e.createElement(t,{args:o})))],args:{resources:void 0,forceHorizontalTabs:void 0,title:void 0,allergiesProps:void 0,conditionsProps:void 0,conditionsOutsideProps:void 0,documentsProps:void 0,immunizationsProps:void 0,medicationsProps:void 0,medicationsOutsideProps:void 0,removeBranding:void 0}},n={...P({allergyIntolerance:m,otherConditions:l,otherProviderMedications:u,patientConditions:p,providerMedications:g}),args:{resources:["conditions-outside","medications-outside"]}},a={...P({allergyIntolerance:m,otherConditions:l,otherProviderMedications:u,patientConditions:p,providerMedications:g}),args:{resources:["conditions","conditions-outside","medications","medications-outside"]}},d={...P({allergyIntolerance:m,otherConditions:l,otherProviderMedications:u,patientConditions:p,providerMedications:g}),args:{resources:["allergies","conditions","immunizations","documents"]}},c={...P({allergyIntolerance:m,otherConditions:l,otherProviderMedications:u,patientConditions:p,providerMedications:g}),args:{resources:["allergies","conditions","conditions-outside","documents","immunizations","medications","medications-outside","care-team","timelines"]}};var z,O,A;n.parameters={...n.parameters,docs:{...(z=n.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
}`,...(A=(O=n.parameters)==null?void 0:O.docs)==null?void 0:A.source}}};var T,Z,R;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(R=(Z=a.parameters)==null?void 0:Z.docs)==null?void 0:R.source}}};var _,N,V;d.parameters={...d.parameters,docs:{...(_=d.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
}`,...(V=(N=d.parameters)==null?void 0:N.docs)==null?void 0:V.source}}};var I,q,B;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
}`,...(B=(q=c.parameters)==null?void 0:q.docs)==null?void 0:B.source}}};const bt=["OutsideRecords","ConditionsAndMedications","ProblemsAndDocuments","Everything"];export{a as ConditionsAndMedications,c as Everything,n as OutsideRecords,d as ProblemsAndDocuments,bt as __namedExportsOrder,ht as default};

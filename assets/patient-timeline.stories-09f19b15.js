var x=Object.defineProperty;var z=(i,s,e)=>s in i?x(i,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[s]=e;var h=(i,s,e)=>(z(i,typeof s!="symbol"?s+"":s,e),e);import{R as o,r as b}from"./index-6f814c40.js";import{c as P}from"./index-74f03c09.js";import{s as q,B as C,V as F,t as N,F as L,M as O,v as I,D as G,E as B,x as M,y as A,z as Q,A as j,G as U,I as V,J as y,K as W,N as H,O as $,U as Y,W as K,R as J,X,C as Z,a as ee,S as te}from"./patient-allergies-71acd740.js";import{a as se,u as ie,i as ae,f as ne}from"./action-list-a695328d.js";import"./_baseForOwn-6ce43847.js";import"./uniqWith-18747e2c.js";import{c as m,a as oe}from"./table-5553b582.js";import"./_baseClone-7e8cfb08.js";import"./_baseIsEqual-2f71925b.js";import"./_baseUniq-cf39c5a7.js";import"./drawer-3e903764.js";import"./spinner-66aa4ba7.js";import{a as p}from"./request-02bc8afe.js";import{m as re,a as ce}from"./medication-request-23eea7be.js";import{p as le,e as de,a as me}from"./provenances-5e8ba162.js";import{c as pe}from"./diagnostic-reports-c00b62df.js";import"./_commonjsHelpers-042e6b4d.js";import"./extends-866f950d.js";import"./_basePickBy-a6d7916f.js";import"./toNumber-6e4e7434.js";import"./uniq-41de9089.js";import"./index-d206d595.js";import"./mapValues-dc8f3697.js";import"./index-6de6b113.js";import"./debounce-5d5a9f7a.js";import"./data-list-254aa0b0.js";import"./isPlainObject-f4e3af75.js";import"./isEqual-dc54df64.js";import"./index-135b3e83.js";import"./faker-42d66913.js";function g(i){const s=[];return s.push({key:"type",type:"checkbox",icon:q,display:"Type",values:se(ie(ae,i.map(e=>e.type?{key:e.type,name:e.type,display:e.beta?o.createElement("span",null,e.type," ",o.createElement(C,null)):void 0}:void 0)))}),s}const E={type:{key:"type",selected:["Medication Fill","Prescription","Encounter","Diagnostic Report"],type:"checkbox"}};try{g.displayName="timelineFilters",g.__docgenInfo={description:"",displayName:"timelineFilters",props:{}}}catch{}const f={display:"Date (New to Old)",sorts:[{key:"date",dir:"desc",isDate:!0}]},ue=[f,{display:"Date (Old to New)",sorts:[{key:"date",dir:"asc",isDate:!0}]}],D=(i=!1)=>{const s=[{title:"Date",widthPercent:10,minWidth:120,dataIndex:"date"},{title:"Type",render:e=>o.createElement("div",null,o.createElement("div",{className:"ctw-font-medium"},e.type),o.createElement("div",null,e.subtype))},{title:"Actor",render:e=>o.createElement(o.Fragment,null,e.actorDetails.map(a=>o.createElement("div",{className:"ctw-capitalize",key:a},a.toLocaleLowerCase())))},{title:"Modifiers",render:e=>o.createElement(N,{items:e.modifiers,limit:3,total:e.modifiers.length})}];return i&&s.push({widthPercent:10,minWidth:200,render:e=>o.createElement(F,{name:"Encounter Resource",resource:e.resource})}),s};try{D.displayName="patientTimelineColumns",D.__docgenInfo={description:"",displayName:"patientTimelineColumns",props:{}}}catch{}class he extends L{constructor(e,a,r){super(e,a,r);h(this,"kind","TimelineEvent");h(this,"model");switch(e.resourceType){case"Encounter":this.model=new B(e,a,r);break;case"DiagnosticReport":this.model=new G(e,a,r);break;case"MedicationRequest":this.model=new I(e,a,r);break;case"MedicationDispense":this.model=new O(e,a,r);break;default:throw new Error("This resource is not in type TimelineEvent")}}get date(){switch(this.model.kind){case"Encounter":return this.model.periodStart;case"DiagnosticReport":return this.model.effectiveStart;case"MedicationRequest":return this.model.authoredOn;case"MedicationDispense":return this.model.whenHandedOver||this.model.whenPrepared;default:return}}get type(){switch(this.model.kind){case"Encounter":return"Encounter";case"DiagnosticReport":return"Diagnostic Report";case"MedicationRequest":return"Prescription";case"MedicationDispense":return"Medication Fill";default:return}}get beta(){switch(this.model.kind){default:return!1}}get subtype(){switch(this.model.kind){case"Encounter":return this.model.typeDisplay;case"DiagnosticReport":return this.model.category;case"MedicationRequest":return this.model.medicationDisplayName;case"MedicationDispense":return this.model.medicationDisplayName;default:return}}get actorDetails(){switch(this.model.kind){case"Encounter":return m([this.model.participants,this.model.location]);case"DiagnosticReport":return m([this.model.performer]);case"MedicationRequest":return m([this.model.includedRequester]);case"MedicationDispense":return m([this.model.performerDetails.name,this.model.performerDetails.address,this.model.performerDetails.telecom]);default:return[]}}get modifiers(){var e,a,r,l;switch(this.model.kind){case"Encounter":return m(this.model.diagnoses);case"DiagnosticReport":return[this.model.results.length>0?`${this.model.results.length} results available`:""];case"MedicationRequest":return m([M((e=this.model.resource.dosageInstruction)==null?void 0:e[0])]);case"MedicationDispense":return m([M((a=this.model.resource.dosageInstruction)==null?void 0:a[0]),(r=this.model.resource.daysSupply)!=null&&r.value?`Days supply: ${this.model.resource.daysSupply.value}`:"",(l=this.model.resource.quantity)!=null&&l.value?`Quantity: ${this.model.resource.quantity.value}`:""]);default:return[]}}}function ye(){const[i,s]=b.useState(),e=A(),a=Q(),r=j(),l=U(),d=[e,a,r,l];b.useEffect(()=>{const _=m(ne(oe(d.map(T=>{var w;return(w=T.data)==null?void 0:w.map(ge)}))));s(V(_,[{dir:"desc",key:"date",isDate:!0},{dir:"desc",key:"type"}]))},[e.data,a.data,r.data,l.data]);const c=y(d,"isLoading"),n=y(d,"isFetching"),t=y(d,"isError");return{isFetching:n,isLoading:c,isError:t,data:i??[]}}const ge=({resource:i,includedResources:s,revIncludes:e})=>new he(i,s,e);function v({className:i}){const s=ye(),{featureFlags:e}=W(),{data:a,setFilters:r,setSort:l}=H({defaultFilters:E,defaultSort:f,records:s.data}),d=$(),c=Y(),n=K();return o.createElement("div",{className:P(i,"ctw-scrollable-pass-through-height")},o.createElement(J,{filterOptions:{onChange:r,defaultState:E,filters:g(s.data)},sortOptions:{defaultSort:f,options:ue,onChange:l}}),o.createElement(X,{showTableHead:!1,isLoading:s.isLoading,data:a,emptyMessage:"There are no timeline records available.",columns:D(e==null?void 0:e.enableViewFhirButton),onRowClick:t=>{switch(t.model.kind){case"Encounter":d(t.model);break;case"DiagnosticReport":c(t.model);break;case"MedicationDispense":case"MedicationRequest":n(t.model);break}}}))}try{v.displayName="PatientTimelineV2",v.__docgenInfo={description:"",displayName:"PatientTimelineV2",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"Argument"}}}}}catch{}const fe={resourceType:"Bundle",id:"f4da1f39-7638-45e4-999b-9ff33d7c5201",meta:{lastUpdated:"2022-11-15T19:37:55.783+00:00"},type:"searchset",total:1,entry:[{resource:{resourceType:"MedicationStatement",id:"0cbb026a-0535-47a1-bbbc-956fcde07dc9",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2023-03-14T02:04:12.070+00:00"}],versionId:"1",lastUpdated:"2023-03-14T02:04:12.313+00:00",source:"#b6a5f8c980f9ac84",tag:[{system:"https://zusapi.com/accesscontrol/owner",code:"builder/b123",display:"Storybook Health"},{system:"https://zusapi.com/lens",code:"ActiveMedications"},{system:"https://zusapi.com/summary",code:"Common"}]},extension:[{url:"https://zusapi.com/lens/extension/aggregatedFrom",extension:[{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/612df454-aea8-4ad7-87c4-fd35ee7ce1e3",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationRequest/104f6928-da8a-4c0c-b4eb-abeb9e4195f0",type:"MedicationRequest"}}]},{url:"https://zusapi.com/lens/extension/medicationLastFillDate",valueDateTime:"2023-02-21"},{url:"https://zusapi.com/lens/extension/medicationLastPrescribedDate",valueDateTime:"2023-02-21"},{url:"https://zusapi.com/lens/extension/medicationQuantity",valueQuantity:{value:14,unit:"days"}},{url:"https://zusapi.com/lens/extension/medicationDaysSupply",valueQuantity:{value:14}},{url:"https://zusapi.com/lens/extension/medicationRefills",valueUnsignedInt:0},{url:"https://zusapi.com/lens/extension/medicationLastPrescriber",valueReference:{reference:"Practitioner/2eb2b8c3-29a3-4d7f-8feb-b8234aa70701",type:"Practitioner",display:"Phyllis Reeves"}},{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"35bf3353-165a-454f-94f4-011227a12e18"}],status:"active",medicationCodeableConcept:{coding:[{system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"1180459"},{system:"http://hl7.org/fhir/sid/ndc",code:"55887023697"},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"Standardization"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"876195",display:"polyethylene glycol 3350 17000 MG Powder for Oral Solution [Miralax]",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ActiveIngredient"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"221147",display:"polyethylene glycol 3350",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"BrandName"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"261575",display:"Miralax",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ClinicalDrug_TTY_SCD"}],system:"http://terminology.hl7.org/CodeSystem/v3-NullFlavor",code:"UNK",display:"unknown",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ClinicalDrug_TTY_SCD"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"876193",display:"polyethylene glycol 3350 17000 MG Powder for Oral Solution",userSelected:!1}],text:"Miralax Oral Product"},subject:{reference:"Patient/a9da7271-99da-42ca-8654-8bea1b2983ca",type:"Patient"},dateAsserted:"2023-02-21",dosage:[{text:"Dissolve 17g in 4–8oz liquid and drink once daily for up to 7 days."}]}}]};function De(){return{parameters:{msw:{handlers:{mocks:ve()}}}}}function ve(){const i=p.rest.get("https://api.dev.zusapi.com/fhir/Patient",(c,n,t)=>n(t.delay(750),t.status(200),t.json(le))),s=p.rest.get("https://api.dev.zusapi.com/fhir/Encounter",(c,n,t)=>n(t.status(200),t.json(de))),e=p.rest.get("https://api.dev.zusapi.com/fhir/MedicationRequest",(c,n,t)=>n(t.status(200),t.json(re))),a=p.rest.get("https://api.dev.zusapi.com/fhir/MedicationDispense",(c,n,t)=>n(t.status(200),t.json(ce))),r=p.rest.get("https://api.dev.zusapi.com/fhir/MedicationStatement",(c,n,t)=>n(t.status(200),t.json(fe))),l=p.rest.get("https://api.dev.zusapi.com/fhir/Provenance?target=Encounter/:Encounter",async(c,n,t)=>n(t.status(200),t.json(me))),d=p.rest.get("https://api.dev.zusapi.com/fhir/DiagnosticReport",(c,n,t)=>n(t.status(200),t.delay(250),t.json(pe())));return[i,s,l,e,a,r,d]}const Je={component:v,tags:["autodocs"],argTypes:{className:{options:["Blank","Fixed Width"],control:"select",mapping:{Blank:"","Fixed Width":"ctw-m-auto ctw-max-w-[600px]"}}},args:{className:"Blank",readOnly:!1},decorators:[(i,{args:s})=>o.createElement(Z,{env:"dev",authToken:"dummy-token",builderId:"b123"},o.createElement(ee,{patientID:"u12345",systemURL:te},o.createElement(i,{args:s})))]},u={...De()};var R,k,S;u.parameters={...u.parameters,docs:{...(R=u.parameters)==null?void 0:R.docs,source:{originalSource:`{
  ...setupTimelineMocks()
}`,...(S=(k=u.parameters)==null?void 0:k.docs)==null?void 0:S.source}}};const Xe=["Basic"];export{u as Basic,Xe as __namedExportsOrder,Je as default};

import{R as i,r as m}from"./index-6f814c40.js";import{u as N,D as M,g as _}from"./modal-ccda-af1c8e9d.js";import{C as x}from"./coding-list-1d7c950f.js";import{B as z,u as L,L as V,J as R,N as q,am as A,af as U,au as v,ai as E,av as C,ag as B,_ as F,aj as H,r as W,aw as k,ax as O,al as j,l as D,C as G,a as J,S as K}from"./patient-allergies-a1481694.js";import{q as T}from"./drawer-39fcad7e.js";import{r as Y,A as Q}from"./action-list-fa5a295c.js";import"./_baseToString-7c0e3f59.js";import{c as l,f as $,o as X,T as Z}from"./table-bda62b29.js";import"./_baseClone-17ec433b.js";import"./sortBy-a390368e.js";import"./_equalByTag-eda72788.js";import"./_baseForOwn-7324d3a8.js";import"./_createSet-6ff8e1d4.js";import"./_commonjsHelpers-042e6b4d.js";import"./request-47bfd586.js";import"./index-74f03c09.js";import"./_commonjs-dynamic-modules-302442b1.js";import"./mapValues-13598fe6.js";import"./isEqual-298b6ab1.js";import"./_baseIsEqual-7d59e24c.js";import"./uniq-8676ca12.js";import"./_basePickBy-fa3aec3b.js";import"./data-list-254aa0b0.js";import"./extends-b0154772.js";import"./spinner-66aa4ba7.js";import"./isString-933c0e0c.js";import"./debounce-5029c56d.js";import"./toNumber-d7ce3bd9.js";import"./index-6de6b113.js";import"./isPlainObject-f51be120.js";function ee(){const{openDrawer:a}=z();return t=>{a({component:e=>i.createElement(f,{encounter:t,...e})})}}function f({encounter:a,className:t,isOpen:e,onClose:n}){const r=N(),[s,o]=m.useState(!0),[c,u]=m.useState(),{getRequestContext:d}=L();return m.useEffect(()=>{async function S(){o(!0);const P=await d(),I=await q(P,[a]);u(_(I,a.id)),o(!1)}S()},[a,d]),i.createElement(T,{className:t,title:"Encounter Details",isOpen:e,onClose:n,showCloseFooter:!0},i.createElement(T.Body,null,i.createElement("div",{className:"ctw-py-2"},i.createElement("div",{className:"ctw-text-2xl"},a.periodStart," - ",a.periodEnd),i.createElement("div",{className:"ctw-text-sm"},a.typeDisplay)),s?i.createElement(V,{message:"Loading encounter data..."}):i.createElement(R,{data:h(a),documentButton:c?i.createElement(M,{onClick:()=>r(c,"Encounter"),text:"Source Document"}):void 0})))}const h=a=>[{label:"Period Start",value:a.periodStart},{label:"Period End",value:a.periodEnd},{label:"Status",value:Y(a.status)},{label:"Class",value:a.class},{label:"Type",value:a.typeCodings.length?i.createElement(x,{codings:a.typeCodings}):void 0},{label:"Location",value:a.location},{label:"Participants",value:a.participants},{label:"Reason",value:a.reason},{label:"Diagnosis",value:a.diagnosis},{label:"Discharge Disposition",value:a.dischargeDisposition}];try{f.displayName="EncounterDetailsDrawer",f.__docgenInfo={description:"",displayName:"EncounterDetailsDrawer",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},encounter:{defaultValue:null,description:"",name:"encounter",required:!0,type:{name:"EncounterModel"}},isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}}}}}catch{}try{h.displayName="encounterData",h.__docgenInfo={description:"",displayName:"encounterData",props:{class:{defaultValue:null,description:"",name:"class",required:!0,type:{name:"string | undefined"}},diagnosis:{defaultValue:null,description:"",name:"diagnosis",required:!0,type:{name:"string | undefined"}},dischargeDisposition:{defaultValue:null,description:"",name:"dischargeDisposition",required:!0,type:{name:"string | undefined"}},location:{defaultValue:null,description:"",name:"location",required:!0,type:{name:"string | undefined"}},participants:{defaultValue:null,description:"",name:"participants",required:!0,type:{name:"string | undefined"}},periodEnd:{defaultValue:null,description:"",name:"periodEnd",required:!0,type:{name:"string | undefined"}},periodStart:{defaultValue:null,description:"",name:"periodStart",required:!0,type:{name:"string | undefined"}},reason:{defaultValue:null,description:"",name:"reason",required:!0,type:{name:"string | undefined"}},status:{defaultValue:null,description:"",name:"status",required:!0,type:{name:"enum",value:[{value:'"entered-in-error"'},{value:'"unknown"'},{value:'"planned"'},{value:'"arrived"'},{value:'"triaged"'},{value:'"in-progress"'},{value:'"onleave"'},{value:'"finished"'},{value:'"cancelled"'}]}},typeCodings:{defaultValue:null,description:"",name:"typeCodings",required:!0,type:{name:"Coding[]"}},typeDisplay:{defaultValue:null,description:"",name:"typeDisplay",required:!0,type:{name:"string | undefined"}},resource:{defaultValue:null,description:"",name:"resource",required:!0,type:{name:"Encounter"}},includedResources:{defaultValue:null,description:"",name:"includedResources",required:!1,type:{name:"ResourceMap"}},revIncludes:{defaultValue:null,description:"",name:"revIncludes",required:!1,type:{name:"Resource[]"}},id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"string"}},isSummaryResource:{defaultValue:null,description:"",name:"isSummaryResource",required:!0,type:{name:"boolean"}},resourceType:{defaultValue:null,description:"",name:"resourceType",required:!0,type:{name:"string"}},getBasicResourceByAction:{defaultValue:null,description:"",name:"getBasicResourceByAction",required:!0,type:{name:"(profileAction: string) => Basic | undefined"}},toString:{defaultValue:null,description:"",name:"toString",required:!1,type:{name:"() => string"}}}}}catch{}const p=({className:a,items:t,limit:e,total:n})=>i.createElement("div",{className:a},t.slice(0,e).map((r,s)=>i.createElement("div",{key:r+s},i.createElement("div",null,r))),n>e&&i.createElement("div",{className:"ctw-font-medium"},"+ ",n-e," more"));try{p.displayName="SimpleMoreList",p.__docgenInfo={description:"",displayName:"SimpleMoreList",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},items:{defaultValue:null,description:"",name:"items",required:!0,type:{name:"string[]"}},limit:{defaultValue:null,description:"",name:"limit",required:!0,type:{name:"number"}},total:{defaultValue:null,description:"",name:"total",required:!0,type:{name:"number"}}}}}catch{}const g=(a=!0)=>{const t=[{widthPercent:20,minWidth:150,render:e=>i.createElement("div",null,i.createElement("div",{className:"ctw-cell-title group-hover:ctw-underline"},e.periodStart),i.createElement("div",null,e.typeDisplay))},{widthPercent:30,minWidth:250,render:e=>{const{participant:n}=e.resource;if(!n||n.length===0)return null;const r=n.map(s=>{var u,d;const o=((u=s.individual)==null?void 0:u.display)??"";let c=((d=s.type)==null?void 0:d[0].text)??"";return["noinformation","unk"].includes(c.toLowerCase())&&(c=""),o&&c?`${o} (${c})`:o||c});return i.createElement("div",null,i.createElement("div",{className:"ctw-cell-title"},e.location),i.createElement(p,{items:r,limit:3,total:n.length}))}},{widthPercent:40,minWidth:200,render:e=>{const{diagnosis:n}=e.resource;return!n||n.length===0?null:i.createElement("div",null,i.createElement("div",{className:"ctw-cell-title"},"Diagnosis"),i.createElement(p,{items:n.map(r=>r.condition.display??""),limit:3,total:n.length}))}}];return a&&t.push({widthPercent:10,minWidth:200,render:e=>i.createElement(A,{name:"Encounter Resource",resource:e.resource})}),t};try{g.displayName="patientTimelineColumns",g.__docgenInfo={description:"",displayName:"patientTimelineColumns",props:{}}}catch{}class te extends U{get class(){const{display:t,code:e}=this.resource.class;return t??e!=="UNK"?e:void 0}get diagnosis(){var e;const t=l((e=this.resource.diagnosis)==null?void 0:e.map(n=>n.condition.display));return t.length?t.join(", "):void 0}get dischargeDisposition(){var t;return v((t=this.resource.hospitalization)==null?void 0:t.dischargeDisposition)}get location(){var e;const t=l((e=this.resource.location)==null?void 0:e.map(n=>n.location.display));return t.length?t.join(", "):void 0}get participants(){var e;const t=l((e=this.resource.participant)==null?void 0:e.map(n=>{var r;return(r=n.individual)==null?void 0:r.display}));return t.length?t.join(", "):void 0}get periodEnd(){var t;return E((t=this.resource.period)==null?void 0:t.end)}get periodStart(){var t;return E((t=this.resource.period)==null?void 0:t.start)}get reason(){var e;const t=l((e=this.resource.reasonCode)==null?void 0:e.map(n=>v(n)));return t.length?t.join(", "):void 0}get status(){return this.resource.status}get typeCodings(){var t;return l(Q((t=this.resource.type)==null?void 0:t.map(e=>e.coding)))}get typeDisplay(){const t=$(this.resource.type,{coding:[{system:C}]}),e=B(C,t);return(e==null?void 0:e.display)||(e==null?void 0:e.code)}}function ae(){return F(k,[],async(a,t)=>{try{const{bundle:e,resources:n}=await H("Encounter",a,{patientUPID:t.UPID});return ie(n,e)}catch(e){throw W.logError(e,"Failed fetching timeline information for patient"),new Error(`Failed fetching timeline information for patient: ${e}`)}})}function ie(a,t){const e=O(t);return a.map(n=>new te(n,void 0,e.get(n.id??"")))}function b({className:a,includeViewFhirResource:t}){const e=ae(),n=ee(),r=X(e.data??[],[s=>{var o;return((o=s.resource.period)==null?void 0:o.start)??""}],["desc"]);return i.createElement("div",{className:a},i.createElement(j,{title:"Encounter Timeline"}),i.createElement(Z,{className:"-ctw-mx-px !ctw-rounded-none",showTableHead:!1,isLoading:e.isLoading,records:r,columns:g(t),handleRowClick:s=>n(s)}))}try{b.displayName="PatientTimeline",b.__docgenInfo={description:"",displayName:"PatientTimeline",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},includeViewFhirResource:{defaultValue:null,description:"",name:"includeViewFhirResource",required:!0,type:{name:"boolean"}}}}}catch{}const ne={resourceType:"Bundle",id:"4b58609b-b4c2-43bb-81de-21b9a02fa62f",meta:{lastUpdated:"2023-01-03T22:30:53.366+00:00"},type:"searchset",total:6,entry:[{fullUrl:"https://api.dev.zusapi.com/fhir/Encounter/5af9550a-f9c7-4ca6-86b2-ecdb4c164ec3",resource:{resourceType:"Encounter",id:"5af9550a-f9c7-4ca6-86b2-ecdb4c164ec3",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2023-01-03T20:11:44.150+00:00"}],versionId:"1",lastUpdated:"2023-01-03T20:11:44.232+00:00",source:"#GKzYTPJnzCuiBU0w",tag:[{system:"https://zusapi.com/thirdparty/source",code:"commonwell"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/d037b2ef-66d6-4fcc-b228-2bc748ce4d0e",display:"CTW Health"}]},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"7bd02b95-a275-485b-8053-2ef190d2d86a"}],status:"finished",class:{system:"http://terminology.hl7.org/CodeSystem/v3-NullFlavor",code:"UNK"},type:[{coding:[{system:"http://www.ama-assn.org/go/cpt",code:"99203",display:"Office Visit"},{system:"urn:oid:1.2.840.114350.1.13.418.2.7.4.698084.30",code:"101"},{system:"urn:oid:2.16.840.1.113883.5.4",code:"AMB"},{system:"urn:oid:1.2.840.114350.1.72.1.30",code:"101"},{system:"urn:oid:1.2.840.114350.1.72.1.30.1",code:"4"}],text:"Office Visit"}],subject:{reference:"Patient/6e6ea727-a7ac-47d0-96b8-536e1073826c",type:"Patient"},participant:[{type:[{coding:[{display:"MinuteClinic"},{system:"urn:oid:1.2.840.114350.1.13.418.2.7.10.836982.1050",code:"175",display:"MinuteClinic"}],text:"MinuteClinic"}],individual:{reference:"Practitioner/8653ba26-4f9e-48f6-b3a5-a386345bc990",type:"Practitioner",display:"Mary Jane Wilson NP"}}],period:{start:"2018-09-08T09:55:00-05:00",end:"2018-09-08T11:29:32-05:00"},length:{value:94,unit:"minute",system:"http://unitsofmeasure.org",code:"min"},diagnosis:[{condition:{reference:"Condition/a73a7f57-cc74-4165-ab7b-5d8e43e71f6d",type:"Condition",display:"COPD with acute exacerbation"}},{condition:{reference:"Condition/5687dd21-523e-425e-8f76-e3410339aaba",type:"Condition",display:"Upper respiratory infection, acute"}},{condition:{reference:"Condition/12345",type:"Condition",display:"Difficulty breathing"}},{condition:{reference:"Condition/12345",type:"Condition",display:"Infection"}}],location:[{location:{reference:"Location/e85b4d87-2cbd-4ab3-b842-a821cde3d339",type:"Location",display:"MinuteClinic OH4304"}}]},search:{mode:"match"}},{fullUrl:"https://api.dev.zusapi.com/fhir/Encounter/77190d01-91ef-4dbd-8af2-8183ed9a40d3",resource:{resourceType:"Encounter",id:"77190d01-91ef-4dbd-8af2-8183ed9a40d3",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2023-01-03T20:11:47.096+00:00"}],versionId:"1",lastUpdated:"2023-01-03T20:11:47.145+00:00",source:"#vpjWA3FgSp4rbi6v",tag:[{system:"https://zusapi.com/thirdparty/source",code:"commonwell"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/d037b2ef-66d6-4fcc-b228-2bc748ce4d0e",display:"CTW Health"}]},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"7bd02b95-a275-485b-8053-2ef190d2d86a"}],status:"finished",class:{system:"urn:oid:2.16.840.1.113883.5.4",code:"IMP"},subject:{reference:"Patient/6e6ea727-a7ac-47d0-96b8-536e1073826c",type:"Patient"},participant:[{type:[{coding:[{display:"Physical Medicine and Rehab"},{system:"urn:oid:1.2.840.114350.1.72.1.7.7.10.688867.4160",code:"86",display:"Physical Medicine and Rehab"},{system:"urn:oid:1.2.840.114350.1.13.535.2.7.10.836982.1050",code:"33",display:"Physical Medicine and Rehab"}],text:"Physical Medicine and Rehab"}],individual:{reference:"Practitioner/2c77e583-3dd3-45dd-888e-a31a8f3645f5",type:"Practitioner",display:"David Lee"}}],period:{start:"2019-01-09T21:49:00-05:00",end:"2019-01-18T12:17:00-04:00"},length:{value:12328,unit:"minute",system:"http://unitsofmeasure.org",code:"min"},diagnosis:[{condition:{reference:"Condition/5a7a7ddc-fafe-46eb-9ea4-0d1191603334",type:"Condition",display:"AIDP (acute inflammatory demyelinating polyneuropathy)"}}],hospitalization:{dischargeDisposition:{coding:[{system:"urn:oid:1.2.840.114350.1.13.535.2.7.4.698084.18888",code:"1",display:"Home or Self Care"}],text:"Home or Self Care"}},location:[{location:{reference:"Location/71c90541-0b1a-4bc3-a227-6787e72a11f9",type:"Location",display:"ABC 17 REHAB"}}]},search:{mode:"match"}},{fullUrl:"https://api.dev.zusapi.com/fhir/Encounter/c76550d6-3a5b-4fdc-91f7-f77ba29a6ce0",resource:{resourceType:"Encounter",id:"c76550d6-3a5b-4fdc-91f7-f77ba29a6ce0",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2023-01-03T20:11:44.673+00:00"}],versionId:"1",lastUpdated:"2023-01-03T20:11:44.747+00:00",source:"#2AhmrNrpGVMXgGuM",tag:[{system:"https://zusapi.com/thirdparty/source",code:"commonwell"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/d037b2ef-66d6-4fcc-b228-2bc748ce4d0e",display:"CTW Health"}]},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"7bd02b95-a275-485b-8053-2ef190d2d86a"}],status:"finished",class:{system:"http://terminology.hl7.org/CodeSystem/v3-NullFlavor",code:"UNK"},type:[{coding:[{system:"http://www.ama-assn.org/go/cpt",display:"Jerry Mason MD"},{system:"urn:oid:2.16.840.1.113883.4.391.23603",display:"(TEL)"}],text:"Jerry L Mason MD"}],subject:{reference:"Patient/6e6ea727-a7ac-47d0-96b8-536e1073826c",type:"Patient"},participant:[{type:[{coding:[{system:"http://terminology.hl7.org/CodeSystem/v3-NullFlavor",code:"NI",display:"NoInformation"}],text:"NoInformation"}],individual:{reference:"Practitioner/fc7ee8d7-6ad3-47a4-ab40-88f07bf7e2fa",type:"Practitioner",display:"Jerry Mason"}}],period:{start:"2020-01-14"},location:[{location:{reference:"Location/85b347e8-bee1-40fc-bd07-799f0a0c4d74",type:"Location",display:"Jerry Mason MD"}}]},search:{mode:"match"}},{fullUrl:"https://api.dev.zusapi.com/fhir/Encounter/a108bf4e-7791-4f23-9a6e-ab9aabf1467e",resource:{resourceType:"Encounter",id:"a108bf4e-7791-4f23-9a6e-ab9aabf1467e",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2023-01-03T20:11:48.071+00:00"}],versionId:"1",lastUpdated:"2023-01-03T20:11:48.074+00:00",source:"#AwOEd1w67hUQRVXU",tag:[{system:"https://zusapi.com/thirdparty/source",code:"commonwell"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/d037b2ef-66d6-4fcc-b228-2bc748ce4d0e",display:"CTW Health"}]},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"7bd02b95-a275-485b-8053-2ef190d2d86a"}],status:"finished",class:{system:"http://terminology.hl7.org/CodeSystem/v3-NullFlavor",code:"UNK"},subject:{reference:"Patient/6e6ea727-a7ac-47d0-96b8-536e1073826c",type:"Patient"},period:{start:"2020-05-07T09:17:39+00:00"},diagnosis:[{condition:{reference:"Condition/17c54947-3fa4-42af-b6ce-2c187b4c774a",type:"Condition",display:"Sheltered homelessness"}}],location:[{location:{reference:"Location/53600c9e-e46a-4f2d-912e-859aac128942",type:"Location",display:"ST. JOSEPH HHS"}}]},search:{mode:"match"}},{fullUrl:"https://api.dev.zusapi.com/fhir/Encounter/fc6cf519-2991-4fec-98ec-4c81ec0a0f02",resource:{resourceType:"Encounter",id:"fc6cf519-2991-4fec-98ec-4c81ec0a0f02",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2023-01-03T20:11:45.647+00:00"}],versionId:"1",lastUpdated:"2023-01-03T20:11:45.824+00:00",source:"#dVeLKurdCrwFBuZR",tag:[{system:"https://zusapi.com/thirdparty/source",code:"commonwell"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/d037b2ef-66d6-4fcc-b228-2bc748ce4d0e",display:"CTW Health"}]},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"7bd02b95-a275-485b-8053-2ef190d2d86a"}],status:"finished",class:{system:"urn:oid:2.16.840.1.113883.5.4",code:"EMER"},type:[{coding:[{system:"urn:oid:2.16.840.1.113883.5.4",code:"EMER",display:"Emergency"},{system:"urn:oid:1.2.840.114350.1.13.140.2.7.4.698084.30",code:"3"},{system:"urn:oid:1.2.840.114350.1.72.1.30",code:"3"},{system:"urn:oid:1.2.840.114350.1.72.1.30.1",code:"0"}],text:"Emergency"}],subject:{reference:"Patient/6e6ea727-a7ac-47d0-96b8-536e1073826c",type:"Patient"},participant:[{type:[{coding:[{display:"Emergency Medicine"},{system:"urn:oid:1.2.840.114350.1.72.1.7.7.10.688867.4160",code:"17",display:"Emergency Medicine"},{system:"urn:oid:1.2.840.114350.1.13.140.2.7.10.836982.1050",code:"49",display:"Emergency Medicine"}],text:"Emergency Medicine"}],individual:{reference:"Practitioner/f21f7b83-c187-4164-bc6a-0ac08f8da22b",type:"Practitioner",display:"Minosh Madria"}}],period:{start:"2022-01-29T13:31:59-06:00",end:"2022-01-29T15:02:31-06:00"},length:{value:90,unit:"minute",system:"http://unitsofmeasure.org",code:"min"},reasonCode:[{coding:[{system:"http://snomed.info/sct",code:"404684003",display:"Clinical finding (finding)"}],text:"Clinical finding"}],diagnosis:[{condition:{reference:"Condition/e1af6029-4ac3-43b9-9802-48c65d064e24",type:"Condition",display:"Tooth pain"}}],hospitalization:{dischargeDisposition:{coding:[{system:"urn:oid:1.2.840.114350.1.13.140.2.7.4.698084.18888",code:"01",display:"Discharged to home or self care (routine discharge)"}],text:"Discharged to home or self care (routine discharge)"}},location:[{location:{reference:"Location/543c2893-1ec5-45d5-9664-9d1a23d3c2b9",type:"Location",display:"ABCD Emergency Department"}}]},search:{mode:"match"}},{fullUrl:"https://api.dev.zusapi.com/fhir/Encounter/6b77e120-04b4-4cd6-8f0b-3543767cd51f",resource:{resourceType:"Encounter",id:"6b77e120-04b4-4cd6-8f0b-3543767cd51f",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2023-01-03T20:11:46.265+00:00"}],versionId:"1",lastUpdated:"2023-01-03T20:11:46.271+00:00",source:"#F03sLYfdmocPYxKx",tag:[{system:"https://zusapi.com/thirdparty/source",code:"commonwell"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/d037b2ef-66d6-4fcc-b228-2bc748ce4d0e",display:"CTW Health"}]},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"7bd02b95-a275-485b-8053-2ef190d2d86a"}],status:"finished",class:{system:"http://terminology.hl7.org/CodeSystem/v3-NullFlavor",code:"UNK"},type:[{coding:[{system:"http://www.ama-assn.org/go/cpt",display:"CARLINGSBAD FAMILY MEDICINE"},{system:"urn:oid:2.16.840.1.113883.4.391.142",display:"(TEL)"}],text:"CARLINGSBAD FAMILY MEDICINE"}],subject:{reference:"Patient/6e6ea727-a7ac-47d0-96b8-536e1073826c",type:"Patient"},participant:[{type:[{coding:[{system:"http://terminology.hl7.org/CodeSystem/v3-NullFlavor",code:"NI",display:"NoInformation"}],text:"NoInformation"}],individual:{reference:"Practitioner/26da410b-44d7-49ec-9827-26fc34f8aad7",type:"Practitioner",display:"Michael Morris, MD"}},{individual:{reference:"Practitioner/12345",type:"Practitioner",display:"Jenny Morris, MD"}},{individual:{reference:"Practitioner/12345",type:"Practitioner",display:"Rose Donald"}},{individual:{reference:"Practitioner/12345",type:"Practitioner",display:"Al Bundy"}}],period:{start:"2020-03-14"},location:[{location:{reference:"Location/02b760b4-f898-4aad-a075-0c2ba1a7d1a9",type:"Location",display:"CARLINGSBAD FAMILY MEDICINE"}}]},search:{mode:"match"}}]},re={resourceType:"Bundle",id:"f4da1f39-7638-45e4-999b-9ff33d7c5201",meta:{lastUpdated:"2022-11-15T19:37:55.783+00:00"},type:"searchset",entry:[{resource:{resourceType:"Patient",id:"1",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2022-11-10T19:37:12.106+00:00"}],versionId:"2",lastUpdated:"2022-11-10T19:37:12.363+00:00",source:"#8409b0f1adee8ee2",security:[{system:"http://terminology.hl7.org/CodeSystem/v3-ActReason",code:"HTEST"}],tag:[{system:"https://zusapi.com/accesscontrol/owner",code:"builder/123",display:"Storybook Medical - Test Customer"}]},identifier:[{system:"https://example.com/patient-id",value:"001"},{system:"https://zusapi.com/fhir/identifier/universal-id",value:"u12345"}],name:[{family:"Marsden",given:["Penny"]}],telecom:[{system:"email",value:"penny.marsden@example.com"},{system:"phone",value:"555-030-6283",use:"home"},{system:"phone",value:"555-348-9139",use:"mobile"},{system:"phone",value:"555-516-4894",use:"work"}],gender:"female",birthDate:"1980-09-03",address:[{line:["469 SHADOW LN"],city:"LAS VEGAS",state:"NV",postalCode:"89106-4119"}],maritalStatus:{coding:[{system:"http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",code:"S",display:"Single"}],text:"Single"},contact:[{relationship:[{coding:[{system:"http://terminology.hl7.org/CodeSystem/v2-0131",code:"C",display:"Emergency contact"}],text:"Emergency contact"}],name:{family:"Marsden",given:["Jeffrey"]},telecom:[{system:"phone",value:"555-402-8964",use:"home"},{system:"email",value:"jeffrey.marsden@example.com"}]}],managingOrganization:{reference:"Organization/09ab9086-6dfc-4dc9-b040-1520aa4fea92"}},search:{mode:"match"}},{resource:{resourceType:"Organization",id:"09ab9086-6dfc-4dc9-b040-1520aa4fea92",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2022-11-10T19:37:09.031+00:00"}],versionId:"1",lastUpdated:"2022-11-10T19:37:09.032+00:00",source:"#RdK4JAWrQkSRa9Qw",tag:[{system:"https://zusapi.com/accesscontrol/owner",code:"builder/b123",display:"Storybook Medical - Test Customer"}]},name:"Demo Health"},search:{mode:"include"}}]},se=D.rest.get("https://api.dev.zusapi.com/fhir/Patient",(a,t,e)=>t(e.delay(750),e.status(200),e.json(re))),oe=D.rest.get("https://api.dev.zusapi.com/fhir/Encounter",(a,t,e)=>t(e.status(200),e.json(ne))),Ue={component:b,tags:["autodocs"],argTypes:{className:{options:["Blank","Fixed Width"],control:"select",mapping:{Blank:"","Fixed Width":"ctw-m-auto ctw-max-w-[600px]"}}},args:{className:"Blank",readOnly:!1,includeViewFhirResource:!1},decorators:[(a,{args:t})=>i.createElement(G,{env:"dev",authToken:"dummy-token",builderId:"b123"},i.createElement(J,{patientID:"u12345",systemURL:K},i.createElement(a,{args:t})))]},y={parameters:{msw:[se,oe]}};var w;y.parameters={...y.parameters,storySource:{source:`{
  parameters: {
    msw: [mockPatientGet, mockEncounterGet]
  }
}`,...(w=y.parameters)==null?void 0:w.storySource}};const Be=["Basic"];export{y as Basic,Be as __namedExportsOrder,Ue as default};
//# sourceMappingURL=patient-timeline.stories-4d722fcd.js.map

import{R as n,r as f}from"./index-6f814c40.js";import{c as y}from"./index-74f03c09.js";import{u as h}from"./resource-details-drawer-0824ed1a.js";import{w as _}from"./error-boundary-a8316818.js";import{T as A}from"./table-6b14d129.js";import{f as b,a as i,m as D,F as E,c as o,w,s as I,Q as P}from"./patient-helper-9ca0101c.js";import"./_baseToString-ba0098b0.js";import"./_equalByTag-3aa7c076.js";import"./_baseClone-7982cf45.js";import"./sortBy-8d97dd92.js";import"./_baseForOwn-2ea4fe61.js";import"./mergeWith-9910f455.js";import{i as R}from"./isEqual-38ff4822.js";import"./_createSet-3c80ad01.js";import{u as T}from"./uniqWith-ade993ae.js";import{u as v}from"./patient-provider-bbc62e03.js";import{o as F}from"./values-e0b170db.js";import{u as N}from"./use-breakpoints-8921c18b.js";const q=[{title:"Onset",render:e=>n.createElement("div",{className:"group-hover:ctw-underline"},e.onset)},{title:"Description",dataIndex:"display"},{title:"Type",dataIndex:"type"},{title:"Category",dataIndex:"categories"},{title:"Manifestations",dataIndex:"manifestations"}];function x(e){var t,a;return e.onsetAge?b(e.onsetAge):e.onsetDateTime?i(e.onsetDateTime):e.onsetPeriod?i(e.onsetPeriod.start):e.onsetRange?i((a=(t=e.onsetRange.low)==null?void 0:t.value)==null?void 0:a.toString()):D(e.onsetString)}class S extends E{get categories(){var t;return(t=this.resource.category)==null?void 0:t.join(", ")}get clinicalStatus(){return o(this.resource.clinicalStatus)}get display(){return o(this.resource.code)}get manifestations(){var a;const t=[];return(a=this.resource.reaction)==null||a.forEach(s=>s.manifestation.forEach(r=>t.push(o(r)))),t.join(", ")}get onset(){return x(this.resource)}get type(){return this.resource.type??""}}const l=e=>{const t=e.map(s=>new S(s));return T(t,(s,r)=>R(c(s),c(r)))},c=e=>[e.categories,e.clinicalStatus,e.display,e.manifestations,e.onset,e.type];try{l.displayName="applyAllergyFilters",l.__docgenInfo={description:"",displayName:"applyAllergyFilters",props:{}}}catch{}function C(e=!1){return v(P,[],w(async(t,a)=>{try{const r=(await I("AllergyIntolerance",t,{patientUPID:a.UPID})).resources;return F(l(r),"onset",["desc"])}catch{throw new Error(`Failed fetching allergies information for patient ${a.UPID}`)}},"req.patient_allergies"))}function L({className:e,enableFqs:t}){const a=f.useRef(null),s=N(a),r=C(t),m=h({header:g=>g.display,details:M}),d=r.data??[],{isLoading:u}=r;return n.createElement("div",{className:y(e,"ctw-scrollable-pass-through-height"),ref:a,"data-zus-telemetry-namespace":"Allergies"},n.createElement("div",{className:"ctw-scrollable-pass-through-height"},n.createElement(A,{stacked:s.sm,isLoading:u,records:d,columns:q,handleRowClick:m})))}const p=_(L,"PatientAllergies"),M=e=>[{label:"Onset",value:e.onset},{label:"Description",value:e.display},{label:"Type",value:e.type},{label:"Category",value:e.categories},{label:"Manifestations",value:e.manifestations}];try{p.displayName="PatientAllergies",p.__docgenInfo={description:"",displayName:"PatientAllergies",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},enableFqs:{defaultValue:null,description:"",name:"enableFqs",required:!1,type:{name:"boolean"}}}}}catch{}export{p as P};

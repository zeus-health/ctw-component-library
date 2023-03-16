import{R as n,r as g}from"./index-6f814c40.js";import{u as y}from"./resource-details-drawer-9079b2c1.js";import{w as h}from"./error-boundary-784d2b69.js";import{T as _}from"./table-0bb423c6.js";import{f as A,a as i,m as D,F as E,c as o,w as b,s as w,Q as I}from"./patient-helper-2c738c95.js";import"./_baseToString-ba0098b0.js";import{o as P}from"./sortBy-64fcb484.js";import"./_baseClone-0c3bfcab.js";import"./sortBy-3860efd7.js";import"./_equalByTag-3aa7c076.js";import"./_baseForOwn-56487e0e.js";import{i as v}from"./isEqual-38ff4822.js";import"./_createSet-3c80ad01.js";import{u as R}from"./uniqWith-ade993ae.js";import{u as T}from"./patient-provider-d2b81159.js";import{u as F}from"./use-breakpoints-04232dc9.js";const N=[{title:"Onset",render:e=>n.createElement("div",{className:"group-hover:ctw-underline"},e.onset)},{title:"Description",dataIndex:"display"},{title:"Type",dataIndex:"type"},{title:"Category",dataIndex:"categories"},{title:"Manifestations",dataIndex:"manifestations"}];function q(e){var t,a;return e.onsetAge?A(e.onsetAge):e.onsetDateTime?i(e.onsetDateTime):e.onsetPeriod?i(e.onsetPeriod.start):e.onsetRange?i((a=(t=e.onsetRange.low)==null?void 0:t.value)==null?void 0:a.toString()):D(e.onsetString)}class S extends E{get categories(){var t;return(t=this.resource.category)==null?void 0:t.join(", ")}get clinicalStatus(){return o(this.resource.clinicalStatus)}get display(){return o(this.resource.code)}get manifestations(){var a;const t=[];return(a=this.resource.reaction)==null||a.forEach(s=>s.manifestation.forEach(r=>t.push(o(r)))),t.join(", ")}get onset(){return q(this.resource)}get type(){return this.resource.type??""}}const l=e=>{const t=e.map(s=>new S(s));return R(t,(s,r)=>v(c(s),c(r)))},c=e=>[e.categories,e.clinicalStatus,e.display,e.manifestations,e.onset,e.type];try{l.displayName="applyAllergyFilters",l.__docgenInfo={description:"",displayName:"applyAllergyFilters",props:{}}}catch{}function x(e=!1){return T(I,[],b(async(t,a)=>{try{const r=(await w("AllergyIntolerance",t,{patientUPID:a.UPID})).resources;return P(l(r),"onset",["desc"])}catch{throw new Error(`Failed fetching allergies information for patient ${a.UPID}`)}},"req.patient_allergies"))}function C({className:e,enableFqs:t}){const a=g.useRef(null),s=F(a),r=x(t),m=y({header:f=>f.display,details:L}),d=r.data??[],{isLoading:u}=r;return n.createElement("div",{className:e,ref:a,"data-zus-telemetry-namespace":"Allergies"},n.createElement("div",{className:"ctw-overflow-hidden"},n.createElement(_,{stacked:s.sm,isLoading:u,records:d,columns:N,handleRowClick:m})))}const p=h(C,"PatientAllergies"),L=e=>[{label:"Onset",value:e.onset},{label:"Description",value:e.display},{label:"Type",value:e.type},{label:"Category",value:e.categories},{label:"Manifestations",value:e.manifestations}];try{p.displayName="PatientAllergies",p.__docgenInfo={description:"",displayName:"PatientAllergies",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},enableFqs:{defaultValue:null,description:"",name:"enableFqs",required:!1,type:{name:"boolean"}}}}}catch{}export{p as P};

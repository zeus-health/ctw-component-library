import{r as g,R as o}from"./index-6f814c40.js";import{u as y}from"./resource-details-drawer-86a774c0.js";import{w as h}from"./error-boundary-139bb980.js";import{T as _}from"./table-18dfc5b5.js";import{f as A,a as i,m as D,F as I,c as l,s as b,Q as E}from"./patient-helper-c5d8ffd5.js";import"./_baseToString-ba0098b0.js";import{o as P}from"./sortBy-6991f27f.js";import"./_baseClone-0c3bfcab.js";import"./sortBy-9842b21c.js";import"./_equalByTag-3aa7c076.js";import"./_baseForOwn-56487e0e.js";import{i as R}from"./isEqual-38ff4822.js";import"./_createSet-823d7c6f.js";import{u as w}from"./uniqWith-26eb98cb.js";import{u as T}from"./patient-provider-76317411.js";import{u as v}from"./use-breakpoints-f3785528.js";const F=[{title:"Onset",dataIndex:"onset"},{title:"Description",dataIndex:"display"},{title:"Type",dataIndex:"type"},{title:"Category",dataIndex:"categories"},{title:"Manifestations",dataIndex:"manifestations"}];function x(e){var t,a;return e.onsetAge?A(e.onsetAge):e.onsetDateTime?i(e.onsetDateTime):e.onsetPeriod?i(e.onsetPeriod.start):e.onsetRange?i((a=(t=e.onsetRange.low)==null?void 0:t.value)==null?void 0:a.toString()):D(e.onsetString)}class N extends I{get categories(){var t;return(t=this.resource.category)==null?void 0:t.join(", ")}get clinicalStatus(){return l(this.resource.clinicalStatus)}get display(){return l(this.resource.code)}get manifestations(){var a;const t=[];return(a=this.resource.reaction)==null||a.forEach(s=>s.manifestation.forEach(r=>t.push(l(r)))),t.join(", ")}get onset(){return x(this.resource)}get type(){return this.resource.type??""}}const c=e=>{const t=e.map(s=>new N(s));return w(t,(s,r)=>R(p(s),p(r)))},p=e=>[e.categories,e.clinicalStatus,e.display,e.manifestations,e.onset,e.type];try{c.displayName="applyAllergyFilters",c.__docgenInfo={description:"",displayName:"applyAllergyFilters",props:{}}}catch{}function S(e=!1){return T(E,[],async(t,a)=>{try{const r=(await b("AllergyIntolerance",t,{patientUPID:a.UPID})).resources;return P(c(r),[n=>n.onset],["desc"])}catch{throw new Error(`Failed fetching allergies information for patient ${a.UPID}`)}})}function q({className:e,enableFqs:t}){const a=g.useRef(null),s=v(a),r=S(t),n=y({header:f=>f.display,details:C}),d=r.data??[],{isLoading:u}=r;return o.createElement("div",{className:e,ref:a,"data-zus-telemetry-namespace":"Allergies"},o.createElement("div",{className:"ctw-overflow-hidden"},o.createElement(_,{stacked:s.sm,isLoading:u,records:d,columns:F,handleRowClick:n})))}const m=h(q,"PatientAllergies"),C=e=>[{label:"Onset",value:e.onset},{label:"Description",value:e.display},{label:"Type",value:e.type},{label:"Category",value:e.categories},{label:"Manifestations",value:e.manifestations}];try{m.displayName="PatientAllergies",m.__docgenInfo={description:"",displayName:"PatientAllergies",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},enableFqs:{defaultValue:null,description:"",name:"enableFqs",required:!1,type:{name:"boolean"}}}}}catch{}export{m as P};

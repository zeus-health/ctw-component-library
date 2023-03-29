import{r as S,R as o}from"./index-6f814c40.js";import{n as x,w as $,aQ as X,aO as Y,h as B,S as G,s as v,I as h,aj as f,az as Q,a4 as j,aD as V,aE as z,e as W,T as k,aR as K,aF as J,aK as Z,aG as ee,aH as te,aI as re,aJ as se,aS as ne}from"./patient-helper-02df47c5.js";import{k as R,l as L,m as y,n as I,q as ae,r as ie,g as l,o as oe,v as ce,w as P,x as _,b as N,y as de,z as ue,A as le,f as b,d as me}from"./values-2f84f633.js";import{H as pe}from"./history-38d3c1cf.js";import{w as fe}from"./error-boundary-38b5f5fe.js";import{L as Me}from"./loading-c7ff698a.js";import{M as D,h as O,s as Ee,j as F,k as q,l as ye,m as Se}from"./observation-62726eb1.js";import{u as Re}from"./patient-provider-8ee675f7.js";import"./_baseToString-2a4c2757.js";import{c as C}from"./sortBy-1cabbe82.js";import"./_baseClone-184e5c2b.js";import{c as w}from"./_basePickBy-53e340c6.js";import"./sortBy-649a17b3.js";import"./_equalByTag-5ee6784b.js";import"./_baseForOwn-54d22bab.js";import"./_createSet-014fa0cf.js";import{u as De}from"./details-card-1ac2a254.js";const ge=e=>{const r=l("resource.medicationCodeableConcept.coding.0",e);return r?`${r.system}_${r.code}`:""},Ie=e=>{const r=new Date(e.dateLocal??0);return x(r)},_e=e=>{const r=new Date(e.date??0);return e.resourceType==="MedicationRequest"?r.getTime()-1:r.getTime()},he=e=>{if(e.length===0)return e;const r=(t,a)=>[t,t.resourceType,a],n=R(L(Ie),y(t=>I(_e,"asc",t)),y(t=>t.map(r)),y(Te))(e);return I(t=>new Date(t).getTime(),"desc",ae(n)).map(t=>n[t]).reduce(ie)};function Te(e=[]){const r=new Map,n=e.map(([s,t,a])=>{const i=ge(s);if(t==="MedicationDispense")r.set(i,a);else if(r.has(i)&&t==="MedicationRequest"){const c=r.get(i);return{model:s,type:t,sortOrder:c-.1}}return{model:s,type:t,sortOrder:a}});return I(l("sortOrder"),"desc",n).map(l("model"))}const g=oe(["informationSourceNot","informationSource"]);function U(e,r={},n=!1){let s=n?Ne(e.resources,e.bundle):e.resources;return r.informationSource&&(s=s.filter(t=>{var a;return((a=t.informationSource)==null?void 0:a.type)===r.informationSource})),r.informationSourceNot&&(s=s.filter(t=>{var a;return((a=t.informationSource)==null?void 0:a.type)!==r.informationSourceNot})),s}async function Ke(e,r,n=[]){const[s={}]=n;try{const t=await W("MedicationStatement",e,{patientUPID:r.UPID,_include:"MedicationStatement:medication",...g(s)}),a=U(t,s,!1);return{bundle:t.bundle,medications:a}}catch(t){throw f("Failed fetching medications for patient",t)}}async function Je(e,r,n=[]){const[s={}]=n;try{const{bundle:t,resources:a}=await v("MedicationRequest",e,{patientUPID:r.UPID,...g(s)});return a.map(i=>new F(i,h(t)))}catch(t){throw f("Failed fetching medication requests for patient",t)}}async function Ze(e,r,n=[]){const[s={}]=n;try{const{bundle:t,resources:a}=await v("MedicationDispense",e,{patientUPID:r.UPID,...g(s),_include:["MedicationRequest:medication","MedicationDispense:performer"]});return a.map(i=>new q(i,h(t)))}catch(t){throw f("Failed fetching medication dispenses for patient",t)}}async function et(e,r,n=[]){const[s]=n;if(!s)return[];try{const{bundle:t,resources:a}=await Q("MedicationStatement",e,{patientUPID:r.UPID,code:`${j}|${s}`});return a.map(i=>new D(i,h(t)))}catch(t){throw f("Failed fetching medication statements for patient",t)}}async function tt(e,r,n=[]){const[s={}]=n;try{const t=k.timeMetric("req.active_medications"),a=await K("MedicationStatement",e,"ActiveMedications",{patientUPID:r.UPID,_include:"MedicationStatement:medication",...g(s)}),i=U(a,s,!0);return t(),{bundle:a.bundle,medications:i}}catch(t){throw f("Failed fetching medications for patient",t)}}function Ne(e,r){const n=ne(r);return e.filter(s=>ye(s,n)!==void 0)}function rt(e,r){const n=e.filter(t=>!r.some(a=>a.rxNorm===t.rxNorm));return{builderMedications:r.map(t=>{var u,m;const a=b(p=>p.rxNorm===t.rxNorm,e);if(!a)return t;const i=w(t.resource),c=[J,Z,ee,te,re,se];i.extension=(u=a.resource.extension)==null?void 0:u.filter(p=>c.includes(p.url));const d=w(b({url:V},a.resource.extension));return d&&(d.url=z,(m=i.extension)==null||m.push(d)),new D(i,t.includedResources,t.revIncludes)}),otherProviderMedications:n}}function H(e){const r=e?new D(e).aggregatedFrom:[],n=R(l("reference"),ce("/"),P),s=R(L(l("type")),y(_(n)))(r);return Re(X,[(e==null?void 0:e.id)||"empty"],$(async(t,a)=>{try{if(!e)return{includedResources:{},medications:[]};const[i,c,d,u]=await Promise.all([E("MedicationStatement",t,a.UPID,s.MedicationStatement),E("MedicationAdministration",t,a.UPID,s.MedicationAdministration),E("MedicationRequest",t,a.UPID,s.MedicationRequest,["MedicationRequest:requester"]),E("MedicationDispense",t,a.UPID,s.MedicationDispense,["MedicationDispense:performer","MedicationDispense:prescription"])]),m=Y(N([i.bundle,c.bundle,d.bundle,u.bundle])),p=N([...i.resources,...c.resources,...d.resources,...u.resources]).map(M=>new O(M,m));return{medications:Ee(De(p,(M,T)=>M.date===T.date&&M.resource.resourceType===T.resource.resourceType),"date","desc",!0),includedResources:m}}catch(i){throw new Error(`Failed fetching medication history for medication ${e==null?void 0:e.id}: ${i}`)}},"req.medication_history"))}function st(e){const[r,n]=S.useState(),s=H(e);return S.useEffect(()=>{const{includedResources:t={},medications:a=[]}=s.data||{};if(r===void 0&&a.length){const i=R(_(l("resource")),de(ue("resourceType","MedicationRequest")),le(c=>Date.parse(c.authoredOn)),_(c=>new O(c,t)),P,l("prescriber"))(a);n(i||"")}},[r,s.data]),{isLoading:s.isFetching,lastPrescriber:r}}function E(e,r,n,s=[],t=[]){return s.length>0?B(e,r,{_id:s.join(","),_include:[`${e}:patient`,`${e}:medication`,...t],"_include:iterate":"Patient:organization","patient.identifier":`${G}|${n}`}):{resources:[],bundle:void 0}}const be=10,A=fe(({medication:e})=>{const[r,n]=S.useState([]),s=H(e.resource),t=s.isLoading;return S.useEffect(()=>{if(s.data){const{medications:a}=s.data;n(he(a).map(Ae))}},[s.data]),t?o.createElement(o.Fragment,null,o.createElement("h2",{className:"ctw-text-lg ctw-font-semibold"},"Medication History"),o.createElement(Me,{message:""})):o.createElement(o.Fragment,null,o.createElement("h2",{className:"ctw-text-lg ctw-font-semibold"},"Medication History"),r.length?o.createElement(pe,{entries:r,limit:be,resourceTypeTitle:e.resourceTypeTitle}):o.createElement("span",null,"No history available for this medication."))},"MedicationHistory");function we(e){var s,t;const r=e.resource,n=new D(r,e.includedResources);return{date:e.dateLocal,id:e.id,title:"Medication Reviewed",hideEmpty:!1,subtitle:(t=(s=n.patient)==null?void 0:s.organization)==null?void 0:t.name,details:[{label:"Status",value:me(n.displayStatus)},{label:"Instructions",value:n.dosage}]}}function Ae(e){if(e.resourceType==="MedicationStatement")return we(e);if(e.resourceType==="MedicationRequest")return ve(e);if(e.resourceType==="MedicationDispense")return Le(e);if(e.resourceType==="MedicationAdministration")return Pe(e);throw new Error(`Unknown medication resource type "${e.resourceType}"`)}function ve(e){const r=e.resource,{prescriber:n}=e,{name:s,address:t,telecom:a}=new F(r,e.includedResources).pharmacy,{numberOfRepeatsAllowed:i="",initialFill:c}=r.dispenseRequest||{},{value:d="",unit:u=""}=(c==null?void 0:c.quantity)||{};return{date:e.dateLocal,id:e.id,title:"Prescription Ordered",subtitle:n,hideEmpty:!1,details:[{label:"Quantity",value:[d,u].join(" ")},{label:"Refills Allowed",value:i},{label:"Instructions",value:e.dosage},{label:"Prescriber",value:n},{label:"Pharmacy",value:o.createElement(o.Fragment,null,s&&o.createElement("div",null,s),t&&o.createElement("div",null,t),a&&o.createElement("div",null,"T: ",a))}]}}function Le(e){const r=e.resource,n=new q(r,e.includedResources),{quantityDisplay:s,supplied:t,performerDetails:a}=n,{name:i,address:c,telecom:d}=a;return{date:e.dateLocal,hideEmpty:!1,id:e.id,title:"Medication Filled",subtitle:C([s,t?`${t} supplied`:null]).join(", "),details:[{label:"Quantity",value:s},{label:"Days supply",value:t},{label:"Pharmacy",value:o.createElement(o.Fragment,null,i&&o.createElement("div",null,i),c&&o.createElement("div",null,c),d&&o.createElement("div",null,"T: ",d))}]}}function Pe(e){const r=e.resource,n=new Se(r,e.includedResources);return{id:e.id,date:e.dateLocal,hideEmpty:!1,title:"Medication Administered",subtitle:C([n.dosageDisplay,n.dosageRoute]).join(", "),details:[{label:"Dosage",value:n.dosageDisplay},{label:"Route",value:n.dosageRoute},{label:"Start Date",value:n.effectivePeriod.start},{label:"End Date",value:n.effectivePeriod.end}]}}try{A.displayName="MedicationHistory",A.__docgenInfo={description:"Displays the history of a medication",displayName:"MedicationHistory",props:{medication:{defaultValue:null,description:"",name:"medication",required:!0,type:{name:"MedicationStatementModel"}}}}}catch{}export{A as M,Ze as a,et as b,Ke as c,tt as d,Je as g,rt as s,st as u};

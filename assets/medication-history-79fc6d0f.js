var de=Object.defineProperty;var le=(s,r,e)=>r in s?de(s,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[r]=e;var C=(s,r,e)=>(le(s,typeof r!="symbol"?r+"":r,e),e);import{r as l,R as o}from"./index-6f814c40.js";import{ae as me,af as pe,G as f,O as A,ag as fe,F as R,a as y,c as w,p as q,ah as k,ai as F,a6 as $,aj as j,ak as U,al as B,am as H,an as z,ao as V,ap as he,P as ge,ad as ye,aq as Ee,h as we,S as Re,u as Me,e as Se,ar as Y,as as be,at as ve}from"./patient-helper-c5d8ffd5.js";import{a as p,h as D,g as m,j as De,e as b,k as Q,m as S,l as N,n as Ne,q as _e,o as Ie,r as Te,v as X,w as _,x as xe,y as Pe,z as Ce,b as Ae}from"./values-fdc68ea6.js";import{c as Oe}from"./index-74f03c09.js";import{a as Le,D as qe}from"./collapsible-data-list-details-4804f43b.js";import{w as ke}from"./error-boundary-139bb980.js";import{L as Fe}from"./loading-c7ff698a.js";import"./_baseToString-ba0098b0.js";import{o as G,d as W}from"./sortBy-6991f27f.js";import"./_baseClone-0c3bfcab.js";import"./sortBy-9842b21c.js";import"./_equalByTag-3aa7c076.js";import{h as $e}from"./_baseForOwn-56487e0e.js";import"./_createSet-823d7c6f.js";import{g as je,f as Ue,c as K,u as Be}from"./patient-provider-76317411.js";import{q as He}from"./request-6a310bae.js";import{c as O}from"./_basePickBy-a17ae44f.js";import{u as ze}from"./uniqWith-26eb98cb.js";import{i as Z}from"./isString-b8ede3fb.js";function Ve(s,r){return l.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2,stroke:"currentColor","aria-hidden":"true",ref:r},s),l.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 5l7 7-7 7"}))}const Ye=l.forwardRef(Ve),Qe=Ye;async function Xe(s,r,e,t){if(!r.id)throw new Error(`Tried to ${t} a resource that hasn't been created yet.`);if(!r.isSummaryResource)throw new Error(`Tried to ${t} a patient record resource.`);const n={resourceType:"Basic",id:s==null?void 0:s.id,code:{coding:[{system:me,code:"adminact",display:"Administrative Activity"},{system:pe,code:t}]},subject:{reference:`${r.resourceType}/${r.id}`,type:r.resourceType},author:await je(e)};if(!(await Ue(n,e)).id)throw new Error(`Failed to ${t} resource with id of ${r.id}`)}const I=({date:s,title:r,subtitle:e,data:t,hideEmpty:n,documentButton:i})=>{const[a,c]=l.useState(!1);return o.createElement("div",{className:"ctw-collapsible-data-list ctw-space-y-1","data-zus-telemetry-namespace":"CollapsibleDataList"},o.createElement(Ge,{date:s,title:r,subtitle:e,isDetailShown:a,setIsDetailShown:c,hasDocument:!!i}),a&&o.createElement(Le,{data:t,hideEmpty:n,documentButton:i}))},Ge=({date:s,title:r,subtitle:e,isDetailShown:t,hasDocument:n=!1,setIsDetailShown:i})=>o.createElement("button",{type:"button","aria-label":"details",onClick:()=>i(!t),"data-zus-telemetry-namespace":"DetailSummary","data-zus-telemetry-click":t?"Collapse":"Expand",className:"ctw-w-full ctw-cursor-pointer ctw-border-none ctw-bg-transparent ctw-p-0 ctw-text-base ctw-outline-none"},o.createElement("div",{className:"ctw-flex ctw-items-center ctw-justify-between ctw-rounded-lg ctw-bg-bg-white ctw-p-3 ctw-text-left ctw-outline ctw-outline-1 ctw-outline-bg-dark"},o.createElement("div",{className:"ctw-flex ctw-space-x-3"},s&&o.createElement("div",{className:"ctw-min-w-[5rem]"},s),o.createElement("div",null,o.createElement("div",{className:"ctw-font-semibold ctw-text-content-black"},r),o.createElement("div",{className:"ctw-text-content-light"},e))),o.createElement("div",{className:"ctw-flex ctw-items-center ctw-space-x-3"},n&&o.createElement(qe,{className:"ctw-fill-content-light hover:ctw-fill-content-light",height:16}),o.createElement("div",{className:"ctw-justify-right ctw-flex"},o.createElement(Qe,{className:Oe("ctw-h-5 ctw-w-5 ctw-text-primary-dark",{"ctw-rotate-90":t})})))));try{I.displayName="CollapsibleDataList",I.__docgenInfo={description:"",displayName:"CollapsibleDataList",props:{id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"string"}},date:{defaultValue:null,description:"",name:"date",required:!1,type:{name:"string"}},title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}},subtitle:{defaultValue:null,description:"",name:"subtitle",required:!1,type:{name:"string"}},data:{defaultValue:null,description:"",name:"data",required:!0,type:{name:"CollapsibleDataListEntry[]"}},hideEmpty:{defaultValue:null,description:"",name:"hideEmpty",required:!1,type:{name:"boolean"}},documentButton:{defaultValue:null,description:"",name:"documentButton",required:!1,type:{name:"ReactNode"}},binaryId:{defaultValue:null,description:"",name:"binaryId",required:!1,type:{name:"string"}}}}}catch{}const T=({entries:s,limit:r})=>{const[e,t]=l.useState(!r||s.length<=r),n=e||!r?s:s.slice(0,r);return o.createElement("div",{className:"ctw-space-y-3","data-zus-telemetry-namespace":"CollapsibleDataListStack"},o.createElement("div",{className:"ctw-text-base ctw-font-medium ctw-uppercase ctw-text-content-light"},"History"),n.map((i,a)=>o.createElement("div",{key:`${i.id}-${a}`},o.createElement(I,{id:i.id,date:i.date,title:i.title,subtitle:i.subtitle,data:i.data,hideEmpty:i.hideEmpty,documentButton:i.documentButton}))),!e&&o.createElement("div",{className:"ctw-text-center"},o.createElement("button",{type:"button",className:"ctw-btn-primary",onClick:()=>t(!0)},"Load ",s.length-r," More")))};try{T.displayName="CollapsibleDataListStack",T.__docgenInfo={description:"",displayName:"CollapsibleDataListStack",props:{entries:{defaultValue:null,description:"",name:"entries",required:!0,type:{name:"CollapsibleDataListStackEntries"}},limit:{defaultValue:null,description:"",name:"limit",required:!1,type:{name:"number"}}}}}catch{}const We={active:"Currently taking","entered-in-error":"Never taken","not-taken":"Prescribed, not taken",completed:"No longer taking","on-hold":"On hold",intended:"Intend to take",stopped:"No longer taking"};function J(s,r){var t;if(s.medicationCodeableConcept)return s.medicationCodeableConcept;const e=f("Medication",s.contained,r,(t=s.medicationReference)==null?void 0:t.reference);return e==null?void 0:e.code}function ee(s,r){var e;return(e=te(s,r))==null?void 0:e.code}function te(s,r){var n,i;const e=J(s,r),t=(n=e==null?void 0:e.coding)==null?void 0:n.find(a=>a.system===A&&a.extension===void 0);return t||((i=e==null?void 0:e.coding)==null?void 0:i.find(a=>{var c;return a.system===A&&((c=a.extension)==null?void 0:c.some(u=>u.url===fe&&u.valueString==="Standardization"))}))}function re(s,r){var t,n,i;let e;switch(s.resourceType){case"MedicationAdministration":case"MedicationDispense":e=(n=(t=s.performer)==null?void 0:t[0])==null?void 0:n.actor;break;case"MedicationRequest":e=s.performer||((i=s.dispenseRequest)==null?void 0:i.performer);break;case"MedicationStatement":default:return}if(e!=null&&e.reference&&e.type==="Organization")return f("Organization",s.contained,r,e.reference)}function Ke(s){return $e(We,s,"")}class se extends R{get dosageDisplay(){const{text:r,route:e,dose:t}=this.resource.dosage||{};return r||p([t==null?void 0:t.value,t==null?void 0:t.unit]).join(" ")}get dosageRoute(){const{route:r}=this.resource.dosage||{};return r==null?void 0:r.text}get effectivePeriod(){const{start:r,end:e}=this.resource.effectivePeriod||{};return{start:r?y(r):"",end:e?y(e):""}}}class ne extends R{get includedPerformer(){var t,n,i,a;const r=(n=(t=this.resource.performer)==null?void 0:t[0])==null?void 0:n.actor.reference,e=f("Practitioner",this.resource.contained,this.includedResources,r);return e?new K(e).fullName:(a=(i=this.resource.performer)==null?void 0:i[0])==null?void 0:a.actor.display}get performer(){return re(this.resource,this.includedResources)}get performerDetails(){var e,t;const{performer:r}=this;return{name:(r==null?void 0:r.name)??"",address:((e=r==null?void 0:r.address)==null?void 0:e[0].text)??"",telecom:((t=r==null?void 0:r.telecom)==null?void 0:t[0].value)??""}}get status(){return this.resource.status}get quantityDisplay(){const{value:r,unit:e="units"}=this.resource.quantity||{};return r?`${r} ${e}`:void 0}get supplied(){const{value:r,unit:e="days"}=this.resource.daysSupply||{};return r?`${r} ${e}`:void 0}}class ie extends R{get includedRequester(){var t,n;const r=(t=this.resource.requester)==null?void 0:t.reference,e=f("Practitioner",this.resource.contained,this.includedResources,r);return e?new K(e).fullName:(n=this.resource.requester)==null?void 0:n.display}get pharmacy(){var n,i,a;const{reference:r,display:e}=((n=this.resource.dispenseRequest)==null?void 0:n.performer)||{},t=f("Organization",this.resource.contained,this.includedResources,r);if(t){const c=(i=t.telecom)==null?void 0:i[0].value,{city:u,state:d,postalCode:h,text:g,line:x=[]}=((a=t.address)==null?void 0:a[0])||{},E=p([u,`${d} ${h}`]).join(", ");return{telecom:c,name:t.name,address:g??p([x,E]).join(`
`)}}return{name:e}}}class v extends R{constructor(){super(...arguments);C(this,"builderPatientRxNormStatus")}get basedOn(){var e,t;return(t=(e=this.resource.basedOn)==null?void 0:e[0])==null?void 0:t.type}get category(){return w(this.resource.category)}get context(){var e;return(e=this.resource.context)==null?void 0:e.display}get dateAsserted(){return y(this.resource.dateAsserted)}set dateAsserted(e){e instanceof Date?this.resource.dateAsserted=q(e):this.resource.dateAsserted=e}get derivedFrom(){var e;return((e=this.resource.derivedFrom)==null?void 0:e.map(({display:t})=>t||""))||[]}get aggregatedFrom(){const e=D(t=>t.url===k||t.url===F,this.resource.extension);return e!=null&&e.extension?p(e.extension.map(m("valueReference"))):p(this.resource.derivedFrom)}get display(){return w(J(this.resource,this.includedResources))}get dosage(){var e,t;return(t=(e=this.resource.dosage)==null?void 0:e[0])==null?void 0:t.text}get effectiveStart(){var e;return y((e=this.resource.effectivePeriod)==null?void 0:e.start)}get identifier(){var e,t;return(t=(e=this.resource.identifier)==null?void 0:e[0])==null?void 0:t.value}get informationSource(){return this.resource.informationSource||void 0}set informationSource(e){this.resource.informationSource=e}get medicationReference(){var e;return(e=this.resource.medicationReference)==null?void 0:e.display}get notesDisplay(){var e;return((e=this.resource.note)==null?void 0:e.map(({text:t})=>t))||[]}get partOf(){var e,t;return(t=(e=this.resource.partOf)==null?void 0:e[0])==null?void 0:t.display}get patientStatus(){var e;return Ke((e=this.builderPatientRxNormStatus)==null?void 0:e[this.rxNorm??""])}get rxNorm(){return ee(this.resource,this.includedResources)}get rxNormCodeableConcept(){const e=te(this.resource,this.includedResources);return{...e??{},display:(e==null?void 0:e.display)??this.display}}get reason(){var e;return w((e=this.resource.reasonCode)==null?void 0:e[0])}get reasonReference(){return this.resource.reasonReference}get isArchived(){return!!this.getBasicResourceByAction("archive")}get isInactive(){return!["active","intended","unknown"].includes(this.status)}get status(){return this.resource.status}get displayStatus(){return this.isArchived?"Dismissed":De(this.resource.status)}get statusReason(){var e;return w((e=this.resource.statusReason)==null?void 0:e[0])}get subject(){return this.resource.subject}get subjectID(){var t;const[,e]=((t=this.resource.subject.reference)==null?void 0:t.split("/"))||[];return e||""}get patient(){const e=f("Patient",this.resource.contained,this.includedResources,this.resource.subject.reference);if(e)return new $(e,this.includedResources)}get lastFillDate(){var e,t;return y((t=(e=this.resource.extension)==null?void 0:e.find(n=>n.url===j))==null?void 0:t.valueDateTime)}get quantity(){var t,n;const e=(n=(t=this.resource.extension)==null?void 0:t.find(i=>i.url===U))==null?void 0:n.valueQuantity;if(e)return`${e.value} ${e.unit||""}`}get daysSupply(){var e,t,n,i;return(i=(n=(t=(e=this.resource.extension)==null?void 0:e.find(a=>a.url===B))==null?void 0:t.valueQuantity)==null?void 0:n.value)==null?void 0:i.toString()}get refills(){var e,t,n;return(n=(t=(e=this.resource.extension)==null?void 0:e.find(i=>i.url===H))==null?void 0:t.valueUnsignedInt)==null?void 0:n.toString()}get lastPrescriber(){var n,i;const e=(i=(n=this.resource.extension)==null?void 0:n.find(a=>a.url===z))==null?void 0:i.valueReference;if(!(e!=null&&e.type)||!e.reference)return;const t=f(e.type,this.resource.contained,this.includedResources,e.reference);if(t!=null&&t.name){if(typeof t.name=="string")return t.name;const{family:a,given:c=[]}=t.name[0];return p([a,c[0]]).join(", ")}return e.display}get lastPrescribedDate(){var e,t;return y((t=(e=this.resource.extension)==null?void 0:e.find(n=>n.url===V))==null?void 0:t.valueDateTime)}}class ae extends R{get performer(){var r;return(r=re(this.resource,this.includedResources))==null?void 0:r.name}get status(){return this.resource.status}get dosage(){var r,e,t;switch(this.resource.resourceType){case"MedicationStatement":return(e=(r=this.resource.dosage)==null?void 0:r[0])==null?void 0:e.text;case"MedicationAdministration":return new se(this.resource,this.includedResources).dosageDisplay;case"MedicationDispense":case"MedicationRequest":return w((t=this.resource.dosageInstruction)==null?void 0:t[0]);default:return""}}get date(){var r,e,t,n,i,a;switch(this.resource.resourceType){case"MedicationStatement":return this.resource.dateAsserted??((r=this.resource.effectivePeriod)==null?void 0:r.start);case"MedicationAdministration":return(e=this.resource.effectivePeriod)==null?void 0:e.start;case"MedicationDispense":return this.resource.whenHandedOver??this.resource.whenPrepared;case"MedicationRequest":return this.resource.authoredOn??((a=(i=(n=(t=this.resource.dosageInstruction)==null?void 0:t[0].timing)==null?void 0:n.repeat)==null?void 0:i.boundsPeriod)==null?void 0:a.start);default:return""}}get dateLocal(){return y(this.date)}get patient(){var e;const r=f("Patient",this.resource.contained,this.includedResources,(e=this.resource.subject)==null?void 0:e.reference);if(r)return new $(r,this.includedResources)}get prescriber(){switch(this.resource.resourceType){case"MedicationStatement":return new v(this.resource,this.includedResources).lastPrescriber;case"MedicationDispense":return new ne(this.resource,this.includedResources).includedPerformer;case"MedicationRequest":return new ie(this.resource,this.includedResources).includedRequester;default:return}}}function Lt(s,r){const e=i=>a=>{const c=a[i];return!Z(c)||!c?0:new Date(c).getTime()},t=[],n=[];return r.forEach(i=>{const{key:a,dir:c,isDate:u}=i;t.push(d=>he(d[a]),u?e(a):a),n.push("asc",c)}),G(s,t,n)}function Ze(s,r,e,t=!1){const n=Z(r)?m(r):r;return t?Je(s,n,e):G(s,r,e)}function Je(s,r,e){return s.sort((t,n)=>{const i=r(t),a=r(n);if(!i&&!a)return 0;if(!i)return e==="asc"?-1:1;if(!a)return e==="asc"?1:-1;const c=new Date(i).getTime(),u=new Date(a).getTime();return e==="asc"?c-u:u-c}),s}const et=s=>{const r=m("resource.medicationCodeableConcept.coding.0",s);return r?`${r.system}_${r.code}`:""},tt=s=>{const r=new Date(s.dateLocal??0);return q(r)},rt=s=>{const r=new Date(s.date??0);return s.resourceType==="MedicationRequest"?r.getTime()-1:r.getTime()},st=s=>{if(s.length===0)return s;const r=(n,i)=>[n,n.resourceType,i],e=b(Q(tt),S(n=>N(rt,"asc",n)),S(n=>n.map(r)),S(nt))(s);return N(n=>new Date(n).getTime(),"desc",Ne(e)).map(n=>e[n]).reduce(_e)};function nt(s=[]){const r=new Map,e=s.map(([t,n,i])=>{const a=et(t);if(n==="MedicationDispense")r.set(a,i);else if(r.has(a)&&n==="MedicationRequest"){const c=r.get(a);return{model:t,type:n,sortOrder:c-.1}}return{model:t,type:n,sortOrder:i}});return N(m("sortOrder"),"desc",e).map(m("model"))}const it=s=>He.invalidateQueries({queryKey:s});function at(){return it([ge])}const ot=async(s,r)=>{const e=await r(),t=s.getBasicResourceByAction("archive");await Xe(t,s,e,"archive"),await at()},oe=Ie(["informationSourceNot","informationSource"]);function ce(s,r={},e=!1){let t=e?ct(s.resources,s.bundle):s.resources;return r.informationSource&&(t=t.filter(n=>{var i;return((i=n.informationSource)==null?void 0:i.type)===r.informationSource})),r.informationSourceNot&&(t=t.filter(n=>{var i;return((i=n.informationSource)==null?void 0:i.type)!==r.informationSourceNot})),t}async function qt(s,r,e=[]){const[t={}]=e;try{const n=await Se("MedicationStatement",s,{patientUPID:r.UPID,_include:"MedicationStatement:medication",...oe(t)}),i=ce(n,t,!1);return{bundle:n.bundle,medications:i}}catch(n){throw Y("Failed fetching medications for patient",n)}}async function kt(s,r,e=[]){const[t={}]=e;try{const n=await be("MedicationStatement",s,"ActiveMedications",{patientUPID:r.UPID,_include:"MedicationStatement:medication",...oe(t)}),i=ce(n,t,!0);return{bundle:n.bundle,medications:i}}catch(n){throw Y("Failed fetching medications for patient",n)}}function ct(s,r){const e=ve(r);return s.filter(t=>ee(t,e)!==void 0)}function Ft(s,r){const e=s.filter(n=>!r.some(i=>i.rxNorm===n.rxNorm));return{builderMedications:r.map(n=>{var d,h;const i=D(g=>g.rxNorm===n.rxNorm,s);if(!i)return n;const a=O(n.resource),c=[j,V,U,B,H,z];a.extension=(d=i.resource.extension)==null?void 0:d.filter(g=>c.includes(g.url));const u=O(D({url:k},i.resource.extension));return u&&(u.url=F,(h=a.extension)==null||h.push(u)),new v(a,n.includedResources,n.revIncludes)}),otherProviderMedications:e}}function ue(s){const r=s?new v(s).aggregatedFrom:[],e=b(m("reference"),Te("/"),X),t=b(Q(m("type")),S(_(e)))(r);return Be(Ee,[(s==null?void 0:s.id)||"empty"],async(n,i)=>{try{if(!s)return{includedResources:{},medications:[]};const[a,c,u,d]=await Promise.all([M("MedicationStatement",n,i.UPID,t.MedicationStatement),M("MedicationAdministration",n,i.UPID,t.MedicationAdministration),M("MedicationRequest",n,i.UPID,t.MedicationRequest,["MedicationRequest:requester"]),M("MedicationDispense",n,i.UPID,t.MedicationDispense,["MedicationDispense:performer","MedicationDispense:prescription"])]),h=ye(p([a.bundle,c.bundle,u.bundle,d.bundle])),g=p([...a.resources,...c.resources,...u.resources,...d.resources]).map(E=>new ae(E,h));return{medications:Ze(ze(g,(E,P)=>E.date===P.date&&E.resource.resourceType===P.resource.resourceType),"date","desc",!0),includedResources:h}}catch(a){throw new Error(`Failed fetching medication history for medication ${s==null?void 0:s.id}: ${a}`)}})}function $t(s){const[r,e]=l.useState(),t=ue(s);return l.useEffect(()=>{const{includedResources:n={},medications:i=[]}=t.data||{};if(r===void 0&&i.length){const a=b(_(m("resource")),xe(Pe("resourceType","MedicationRequest")),Ce(c=>Date.parse(c.authoredOn)),_(c=>new ae(c,n)),X,m("prescriber"))(i);e(a||"")}},[r,t.data]),{isLoading:t.isFetching,lastPrescriber:r}}function M(s,r,e,t=[],n=[]){return t.length>0?we(s,r,{_id:t.join(","),_include:[`${s}:patient`,`${s}:medication`,...n],"_include:iterate":"Patient:organization","patient.identifier":`${Re}|${e}`}):{resources:[],bundle:void 0}}function jt(){const{getRequestContext:s}=Me();return l.useCallback(async r=>{await ot(r,s)},[s])}const ut=10,L=ke(({medication:s})=>{const[r,e]=l.useState([]),t=ue(s.resource),n=t.isLoading;return l.useEffect(()=>{if(t.data){const{medications:i}=t.data;e(st(i).map(lt))}},[t.data]),n?o.createElement(o.Fragment,null,o.createElement("h2",{className:"ctw-text-lg ctw-font-semibold"},"Medication History"),o.createElement(Fe,{message:""})):o.createElement(o.Fragment,null,o.createElement("h2",{className:"ctw-text-lg ctw-font-semibold"},"Medication History"),r.length?o.createElement(T,{entries:r,limit:ut}):o.createElement("span",null,"No history available for this medication."))},"MedicationHistory");function dt(s){var t,n;const r=s.resource,e=new v(r,s.includedResources);return{date:s.dateLocal,id:s.id,title:"Medication Reviewed",hideEmpty:!1,subtitle:(n=(t=e.patient)==null?void 0:t.organization)==null?void 0:n.name,data:[{label:"Status",value:Ae(e.displayStatus)},{label:"Instructions",value:e.dosage}]}}function lt(s){if(s.resourceType==="MedicationStatement")return dt(s);if(s.resourceType==="MedicationRequest")return mt(s);if(s.resourceType==="MedicationDispense")return pt(s);if(s.resourceType==="MedicationAdministration")return ft(s);throw new Error(`Unknown medication resource type "${s.resourceType}"`)}function mt(s){const r=s.resource,{prescriber:e}=s,{name:t,address:n,telecom:i}=new ie(r,s.includedResources).pharmacy,{numberOfRepeatsAllowed:a="",initialFill:c}=r.dispenseRequest||{},{value:u="",unit:d=""}=(c==null?void 0:c.quantity)||{};return{date:s.dateLocal,id:s.id,title:"Prescription Ordered",subtitle:e,hideEmpty:!1,data:[{label:"Quantity",value:[u,d].join(" ")},{label:"Refills Allowed",value:a},{label:"Instructions",value:s.dosage},{label:"Prescriber",value:e},{label:"Pharmacy",value:o.createElement(o.Fragment,null,t&&o.createElement("div",null,t),n&&o.createElement("div",null,n),i&&o.createElement("div",null,"T: ",i))}]}}function pt(s){const r=s.resource,e=new ne(r,s.includedResources),{quantityDisplay:t,supplied:n,performerDetails:i}=e,{name:a,address:c,telecom:u}=i;return{date:s.dateLocal,hideEmpty:!1,id:s.id,title:"Medication Filled",subtitle:W([t,n?`${n} supplied`:null]).join(", "),data:[{label:"Quantity",value:t},{label:"Days supply",value:n},{label:"Pharmacy",value:o.createElement(o.Fragment,null,a&&o.createElement("div",null,a),c&&o.createElement("div",null,c),u&&o.createElement("div",null,"T: ",u))}]}}function ft(s){const r=s.resource,e=new se(r,s.includedResources);return{id:s.id,date:s.dateLocal,hideEmpty:!1,title:"Medication Administered",subtitle:W([e.dosageDisplay,e.dosageRoute]).join(", "),data:[{label:"Dosage",value:e.dosageDisplay},{label:"Route",value:e.dosageRoute},{label:"Start Date",value:e.effectivePeriod.start},{label:"End Date",value:e.effectivePeriod.end}]}}try{L.displayName="MedicationHistory",L.__docgenInfo={description:"Displays the history of a medication",displayName:"MedicationHistory",props:{medication:{defaultValue:null,description:"",name:"medication",required:!0,type:{name:"MedicationStatementModel"}}}}}catch{}export{T as C,v as M,Lt as a,$t as b,L as c,Ft as d,kt as e,qt as g,Xe as r,Ze as s,jt as u};

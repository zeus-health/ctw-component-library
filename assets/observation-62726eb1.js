var se=Object.defineProperty;var ie=(s,i,e)=>i in s?se(s,i,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[i]=e;var l=(s,i,e)=>(ie(s,typeof i!="symbol"?i+"":i,e),e);import{r as x}from"./index-6f814c40.js";import{g as ne,e as U,u as q,c as B}from"./patient-provider-8ee675f7.js";import{ak as oe,n as v,al as T,a2 as Y,am as _,an as I,F as m,a as u,c,a9 as h,ao as k,ap as R,aq as S,ar as ae,as as ce,G as f,at as P,au as g,av as ue,aw as de,ax as le,w as j,e as he,T as E,ay as fe,az as me,ac as ge,a4 as F,aA as ye,aB as L,aC as pe,aD as Se,aE as ve,aF as Ne,aG as Ee,aH as De,aI as Ce,aJ as Ie,aK as Re}from"./patient-helper-02df47c5.js";import"./_baseToString-2a4c2757.js";import{f as N,c as $,i as Me,o as b}from"./sortBy-1cabbe82.js";import"./_baseClone-184e5c2b.js";import{c as X}from"./_basePickBy-53e340c6.js";import"./sortBy-649a17b3.js";import"./_equalByTag-5ee6784b.js";import{b as Te,h as G}from"./_baseForOwn-54d22bab.js";import{p as _e}from"./getPrototypeOf-b690d638.js";import"./_createSet-014fa0cf.js";import{q as M}from"./request-5a1df4c1.js";import{u as Pe}from"./details-card-1ac2a254.js";import{i as Q}from"./isString-69148acc.js";import{g as z,b as y,f as be,h as Oe}from"./values-2f84f633.js";function we(s){return s===void 0}var Ae=we,xe="Expected a function";function ke(s){if(typeof s!="function")throw new TypeError(xe);return function(){var i=arguments;switch(i.length){case 0:return!s.call(this);case 1:return!s.call(this,i[0]);case 2:return!s.call(this,i[0],i[1]);case 3:return!s.call(this,i[0],i[1],i[2])}return!s.apply(this,i)}}var Fe=ke,Le=Te,Ue=Fe,qe=_e;function Be(s,i){return qe(s,Ue(Le(i)))}var Ye=Be;function je(s){return X(s)}const H=s=>{let i="",e="";switch(s){case"Active":i="confirmed",e="active";break;case"Inactive":i="confirmed",e="inactive";break;case"Pending":i="unconfirmed",e="active";break;case"Refuted":i="refuted",e="inactive";break;case"Entered In Error":i="entered-in-error";break;default:throw Error("status is should be of type ConditionStatus")}return Ye({verificationStatus:{coding:[{system:_,code:i}]},...e&&{clinicalStatus:{coding:[{system:I,code:e}]}}},Ae)},Nt=async(s,i,e,t)=>{const r=await t(),n={resourceType:"Condition",id:e.id,recorder:await ne(r),...H(e.status),category:e.id&&s?s.resource.category:[{coding:[{system:oe,code:"problem-list-item",display:"Problem List Item"}]}],code:e.id&&s?s.codings:{coding:[{system:e.condition.system,code:e.condition.code,display:e.condition.display}],text:e.condition.display},...e.abatement&&{abatementDateTime:v(e.abatement)},onsetDateTime:v(e.onset),recordedDate:v(new Date),subject:{type:"Patient",reference:`Patient/${i}`},note:e.note?[{text:e.note}]:void 0},o=await U(n,r);return await Promise.all([M.invalidateQueries([T]),M.invalidateQueries([Y])]),o},$e={INF:{fullName:"Certain Infectious and Parasitic Diseases",shortName:"Infectious and Parasitic Diseases"},NEO:{fullName:"Neoplasms",shortName:"Neoplasms"},BLD:{fullName:"Diseases of the Blood and Blood Forming Organs and Certain Disorders Involving the Immune Mechanism",shortName:"Blood Diseases"},END:{fullName:"Endocrine, Nutritional and Metabolic Diseases",shortName:"Endocrine, Nutritional and Metabolic"},MBD:{fullName:"Mental, Behavioral and Neurodevelopmental Disorders",shortName:"Mental and Behavioral"},NVS:{fullName:"Diseases of the Nervous System",shortName:"Nervous System"},EYE:{fullName:"Diseases of the Eye and Adnexa",shortName:"Eye and Adnexa"},EAR:{fullName:"Diseases of the Ear and Mastoid Process",shortName:"Ear and Mastoid Process"},CIR:{fullName:"Diseases of the Circulatory System",shortName:"Circulatory System"},RSP:{fullName:"Diseases of the Respiratory System",shortName:"Respiratory System"},DIG:{fullName:"Diseases of the Digestive System",shortName:"Digestive System"},SKN:{fullName:"Diseases of the Skin and Subcutaneous Tissue",shortName:"Skin and Subcutaneous Tissue"},MUS:{fullName:"Diseases of the Musculoskeletal System and Connective Tissue",shortName:"Musculoskeletal System"},GEN:{fullName:"Diseases of the Genitourinary System",shortName:"Genitourinary System"},PRG:{fullName:"Pregnancy, Childbirth and the Puerperium",shortName:"Pregnancy & Childbirth"},PNL:{fullName:"Certain Conditions Originating in the Perinatal Period",shortName:"Perinatal Conditions"},MAL:{fullName:"Congenital Malformations, Deformations and Chromosomal Abnormalities",shortName:"Malformations and Chromosomal Abnormalities"},SYM:{fullName:"Symptoms, Signs and Abnormal Clinical and Laboratory Findings",shortName:"Clinical Findings"},INJ:{fullName:"Injury, Poisoning and Certain Other Consequences of External Causes",shortName:"External Causes Injury"},EXT:{fullName:"External Causes of Morbidity",shortName:"External Morbidity"},FAC:{fullName:"Factors Influencing Health Status and Contact with Health Services",shortName:"Health Status Influences"},XXX:{fullName:"Unacceptable principal diagnosis (inpatient data) or first-listed diagnosis (outpatient data)",shortName:"Unacceptable principal diagnosis"}};class Xe extends m{constructor(){super(...arguments);l(this,"kind","Condition")}get abatement(){var e,t,r;return this.resource.abatementAge?(e=this.resource.abatementAge.value)==null?void 0:e.toString():this.resource.abatementDateTime?u(this.resource.abatementDateTime):this.resource.abatementPeriod?u(this.resource.abatementPeriod.start):this.resource.abatementRange?u((r=(t=this.resource.abatementRange.low)==null?void 0:t.value)==null?void 0:r.toString()):this.resource.abatementString}get active(){var t;const e=N((t=this.resource.clinicalStatus)==null?void 0:t.coding,{system:I});return e!=null&&e.code?["active","recurrence","relapse"].includes(e.code):!1}get asserter(){var e;return(e=this.resource.asserter)==null?void 0:e.display}get bodySites(){var e;return((e=this.resource.bodySite)==null?void 0:e.map(t=>c(t)))||[]}get categories(){var e;return((e=this.resource.category)==null?void 0:e.map(t=>c(t)))||[]}get ccsChapter(){var t;const e=this.ccsChapterCode;if(e)return(t=$e[e])==null?void 0:t.shortName}get ccsChapterCode(){var e,t;return(t=(e=h(k,this.resource.code))==null?void 0:e.code)==null?void 0:t.slice(0,3)}get ccsGrouping(){var e;return(e=h(k,this.resource.code))==null?void 0:e.display}get clinicalStatus(){return c(this.resource.clinicalStatus)}get clinicalStatusCode(){var e,t;return(t=N((e=this.resource.clinicalStatus)==null?void 0:e.coding,{system:I}))==null?void 0:t.code}get codings(){return this.resource.code}get display(){var e;return((e=R(C,this.resource.code))==null?void 0:e.display)??c(this.resource.code)}get encounter(){var e;return(e=this.resource.encounter)==null?void 0:e.display}get evidences(){var e;return((e=this.resource.evidence)==null?void 0:e.map(t=>{var r;return c((r=t.code)==null?void 0:r[0])}))||[]}get icd10Code(){var e;return(e=h(S,this.resource.code))==null?void 0:e.code}get icd10System(){var e;return(e=h(S,this.resource.code))==null?void 0:e.system}get icd10Display(){var e;return(e=h(S,this.resource.code))==null?void 0:e.display}get isDeleted(){return this.verificationStatusCode==="entered-in-error"}get knownCodings(){const e=$(C.map(r=>r.checkForEnrichment?ae(r.system,this.resource.code):h(r.system,this.resource.code)));return Pe(e,(r,n)=>r.system===n.system)}knownCodingsMatch(e){return Me(this.knownCodings,e.knownCodings,(t,r)=>t.code===r.code&&t.system===r.system).length>0}get notes(){var e;return((e=this.resource.note)==null?void 0:e.map(t=>t.text))||[]}get onset(){var e,t,r;return this.resource.onsetAge?(e=this.resource.onsetAge.value)==null?void 0:e.toString():this.resource.onsetDateTime?u(this.resource.onsetDateTime):this.resource.onsetPeriod?u(this.resource.onsetPeriod.start):this.resource.onsetRange?u((r=(t=this.resource.onsetRange.low)==null?void 0:t.value)==null?void 0:r.toString()):ce(this.resource.onsetString)}get patient(){const e=f("Patient",this.resource.contained,this.includedResources,this.resource.subject.reference);if(e)return new P(e,this.includedResources)}get preferredCoding(){return R(C,this.resource.code)}get recordedDate(){return u(this.resource.recordedDate)}get recorded(){return u(this.resource.recordedDate)}get recorder(){var e;return(e=this.resource.recorder)==null?void 0:e.display}get severity(){return c(this.resource.severity)}get snomedCoding(){return h(g,this.resource.code)}get snomedCode(){var e;return(e=h(g,this.resource.code))==null?void 0:e.code}get snomedDisplay(){var e;return(e=h(g,this.resource.code))==null?void 0:e.display}get snomedSystem(){var e;return(e=h(g,this.resource.code))==null?void 0:e.system}get stages(){var e;return((e=this.resource.stage)==null?void 0:e.map(t=>{const r=c(t.summary),n=c(t.type);return`Summary: ${r}, Type: ${n}`}))||[]}get displayStatus(){function e(n){switch(n){case"active":case"recurrence":case"relapse":return"Active";case"inactive":case"remission":case"resolved":return"Inactive";default:return""}}function t(n){switch(n){case"confirmed":return"confirmed";case"unconfirmed":case"provisional":case"differential":return"unconfirmed";case"refuted":return"refuted";case"entered-in-error":return"entered-in-error";default:return""}}if(this.isSummaryResource)return e(this.clinicalStatusCode)||"Unknown";switch(t(this.verificationStatusCode)+e(this.clinicalStatusCode).toLowerCase()){case"unconfirmedactive":return"Pending";case"unconfirmedinactive":case"refutedactive":return"Unknown";case"confirmedinactive":return"Inactive";case"confirmedactive":return"Active";case"refutedinactive":return"Refuted";case"entered-in-error":return"Entered in Error";default:return"Unknown"}}get subjectID(){var t;const[,e]=((t=this.resource.subject.reference)==null?void 0:t.split("/"))||[];return e||""}get verificationStatus(){return c(this.resource.verificationStatus)}get verificationStatusCode(){var e,t;return(t=N((e=this.resource.verificationStatus)==null?void 0:e.coding,{system:_}))==null?void 0:t.code}}const Et=["Active","Inactive","Entered in Error","Pending","Refuted","Unknown"],Dt=["Active","Inactive","Unknown"],C=[{system:g,checkForEnrichment:!0},{system:S,checkForEnrichment:!0},{system:g},{system:S},{system:ue},{system:de},{system:le}];function Ct(s){const i={resourceType:"Condition",subject:{type:"Patient",reference:`Patient/${s}`},...H("Active")};return je(i)}function Ge(){return q(T,[],j(async(s,i)=>{try{const{bundle:e,resources:t}=await he("Condition",s,{patientUPID:i.UPID});return V(K(t,e))}catch(e){throw E.logError(e,`Failed fetching conditions for patient: ${i.UPID}`)}},"req.patient_conditions"))}function Qe(){return q(Y,[],j(async(s,i)=>{try{const{bundle:e,resources:t}=await me("Condition",s,{_revinclude:"Basic:subject",patientUPID:i.UPID});return V(K(t,e))}catch(e){throw E.logError(e,`Failed fetching conditions outside for patient: ${i.UPID}`)}},"req.other_provider_conditions"))}function It(){const[s,i]=x.useState([]),e=Ge(),t=Qe();x.useEffect(()=>{const a=e.data??[],d=ze(t.data??[],a,!0);i(d)},[e.data,t.data]);const r=e.isLoading||t.isLoading,n=e.isError||t.isError,o=e.isFetching||t.isFetching;return{isLoading:r,isError:n,isFetching:o,data:s}}function K(s,i){const e=fe(i);return s.map(t=>new Xe(t,void 0,e.get(t.id??"")))}function V(s){return b(s.filter(i=>{var e;return((e=i.resource.asserter)==null?void 0:e.type)!=="Patient"}),["resource.recordedDate","display"],["desc"])}const Rt=async(s,i)=>{if(!s.id)throw new Error("Tried to edit a resource that hasn't been created yet.");const e=X(s);if(e.verificationStatus={coding:[{code:"entered-in-error",system:_}]},delete e.clinicalStatus,(await U(e,i)).id)E.reportActionSuccess("delete_condition");else throw E.reportActionFailure("delete_condition"),new Error(`Failed to edit resource with id of ${s.id}`);await M.invalidateQueries([T])},ze=(s,i,e)=>s.filter(t=>t.isArchived&&!e||["FAC","XXX"].includes(t.ccsChapterCode??"")?!1:!i.some(r=>{const n=t.resource.recordedDate,o=r.resource.recordedDate,a=t.knownCodingsMatch(r),d=r.verificationStatus==="entered-in-error",p=!n||o&&n<=o,D=t.clinicalStatus===r.clinicalStatus;return a&&!d&&(p||D)}));function Mt(s,i){const e=n=>o=>{const a=o[n];return!Q(a)||!a?0:new Date(a).getTime()},t=[],r=[];return i.forEach(n=>{const{key:o,dir:a,isDate:d}=n;t.push(p=>ge(p[o]),d?e(o):o),r.push("asc",a)}),b(s,t,r)}function Tt(s,i,e,t=!1){const r=Q(i)?z(i):i;return t?He(s,r,e):b(s,i,e)}function He(s,i,e){return s.sort((t,r)=>{const n=i(t),o=i(r);if(!n&&!o)return 0;if(!n)return e==="asc"?-1:1;if(!o)return e==="asc"?1:-1;const a=new Date(n).getTime(),d=new Date(o).getTime();return e==="asc"?a-d:d-a}),s}const Ke={active:"Currently taking","entered-in-error":"Never taken","not-taken":"Prescribed, not taken",completed:"No longer taking","on-hold":"On hold",intended:"Intend to take",stopped:"No longer taking"};function O(s,i){var t;if(s.medicationCodeableConcept)return s.medicationCodeableConcept;const e=f("Medication",s.contained,i,(t=s.medicationReference)==null?void 0:t.reference);return e==null?void 0:e.code}function w(s,i){var e;return(e=A(s,i))==null?void 0:e.code}function A(s,i){var r,n;const e=O(s,i),t=(r=e==null?void 0:e.coding)==null?void 0:r.find(o=>o.system===F&&o.extension===void 0);return t||((n=e==null?void 0:e.coding)==null?void 0:n.find(o=>{var a;return o.system===F&&((a=o.extension)==null?void 0:a.some(d=>d.url===ye&&d.valueString==="Standardization"))}))}function W(s,i){var r,n,o,a;const e=A(s,i);if(e!=null&&e.display)return e.display;const t=O(s,i);return t!=null&&t.text?t.text:((n=(r=t==null?void 0:t.coding)==null?void 0:r.find(d=>d.display))==null?void 0:n.display)??`${(o=t==null?void 0:t.coding)==null?void 0:o[0].code} (${(a=t==null?void 0:t.coding)==null?void 0:a[0].system})`}function J(s,i){var t,r,n;let e;switch(s.resourceType){case"MedicationAdministration":case"MedicationDispense":e=(r=(t=s.performer)==null?void 0:t[0])==null?void 0:r.actor;break;case"MedicationRequest":e=s.performer||((n=s.dispenseRequest)==null?void 0:n.performer);break;case"MedicationStatement":default:return}if(e!=null&&e.reference&&e.type==="Organization")return f("Organization",s.contained,i,e.reference)}function Ve(s){return G(Ke,s,"")}const We=s=>typeof s=="string"?s===L:(s==null?void 0:s.system)===L,Je={NI:{display:"NoInformation",level:1},INV:{display:"invalid",level:2},DER:{display:"derived",level:3},OTH:{display:"other",level:3},NINF:{display:"negative infinity",level:4},PINF:{display:"positive infinity",level:4},UNC:{display:"un-encoded",level:3},MSK:{display:"masked",level:2},NA:{display:"not applicable",level:2},UNK:{display:"unknown",level:2},ASKU:{display:"asked but unknown",level:3},NAV:{display:"temporarily unavailable",level:4},NASK:{display:"not asked",level:3},NAVU:{display:"Not available",level:3},QS:{display:"Sufficient Quantity",level:3},TRC:{display:"trace",level:3},NP:{display:"not present",level:1}};class _t extends m{constructor(){super(...arguments);l(this,"kind","DiagnosticReport")}get category(){var r,n,o,a;const e=c((r=this.resource.category)==null?void 0:r[0])||this.reportCategory;if(e)return e;const t=c((n=this.resource.category)==null?void 0:n[0]);return((a=f("Observation",void 0,this.includedResources,(o=this.resource.result)==null?void 0:o[0].reference))==null?void 0:a.category)??`No display value found ${t?" for ":""}${t}`}get displayName(){var r;const{code:e}=this.resource,t=c(e);return We((r=e.coding)==null?void 0:r[0])?G(Je,[t,"display"],"Unknown"):t}get effectiveEnd(){var e;return(e=this.resource.effectivePeriod)!=null&&e.end?u(this.resource.effectivePeriod.end):this.effectiveStart}get identifier(){var e;return((e=this.resource.identifier)==null?void 0:e[0].value)??""}get effectiveStart(){var e;return u(((e=this.resource.effectivePeriod)==null?void 0:e.start)||this.resource.effectiveDateTime)}get performer(){var e,t;return((e=this.organization)==null?void 0:e.display)||((t=this.resource.performer)==null?void 0:t[0].display)}get organization(){const e=this.resource.performer??[];return N(e,{type:"Organization"})}get reportCategory(){var e;return((e=R([{system:pe},{system:g}],this.resource.code))==null?void 0:e.display)??c(this.resource.code)}get results(){return this.resource.result??[]}}class Ze extends m{constructor(){super(...arguments);l(this,"kind","MedicationDispense")}get includedPerformer(){var r,n,o,a;const e=(n=(r=this.resource.performer)==null?void 0:r[0])==null?void 0:n.actor.reference,t=f("Practitioner",this.resource.contained,this.includedResources,e);return t?new B(t).fullName:(a=(o=this.resource.performer)==null?void 0:o[0])==null?void 0:a.actor.display}get performer(){return J(this.resource,this.includedResources)}get performerDetails(){var t,r;const{performer:e}=this;return{name:(e==null?void 0:e.name)??"",address:((t=e==null?void 0:e.address)==null?void 0:t[0].text)??"",telecom:((r=e==null?void 0:e.telecom)==null?void 0:r[0].value)??""}}get status(){return this.resource.status}get quantityDisplay(){const{value:e,unit:t="units"}=this.resource.quantity||{};return e?`${e} ${t}`:void 0}get rxNorm(){return w(this.resource,this.includedResources)}get supplied(){const{value:e,unit:t="days"}=this.resource.daysSupply||{};return e?`${e} ${t}`:void 0}get medicationDisplayName(){return W(this.resource,this.includedResources)}get whenHandedOver(){return u(this.resource.whenHandedOver)}get whenPrepared(){return u(this.resource.whenPrepared)}}class et extends m{constructor(){super(...arguments);l(this,"kind","MedicationAdministration")}get dosageDisplay(){const{text:e,route:t,dose:r}=this.resource.dosage||{};return e||y([r==null?void 0:r.value,r==null?void 0:r.unit]).join(" ")}get dosageRoute(){const{route:e}=this.resource.dosage||{};return e==null?void 0:e.text}get effectivePeriod(){const{start:e,end:t}=this.resource.effectivePeriod||{};return{start:e?u(e):"",end:t?u(t):""}}}class tt extends m{constructor(){super(...arguments);l(this,"kind","MedicationRequest")}get authoredOn(){return u(this.resource.authoredOn)}get includedRequester(){var r,n;const e=(r=this.resource.requester)==null?void 0:r.reference,t=f("Practitioner",this.resource.contained,this.includedResources,e);return t?new B(t).fullName:(n=this.resource.requester)==null?void 0:n.display}get medicationDisplayName(){return W(this.resource,this.includedResources)}get pharmacy(){var n,o,a;const{reference:e,display:t}=((n=this.resource.dispenseRequest)==null?void 0:n.performer)||{},r=f("Organization",this.resource.contained,this.includedResources,e);if(r){const d=(o=r.telecom)==null?void 0:o[0].value,{city:p,state:D,postalCode:Z,text:ee,line:te=[]}=((a=r.address)==null?void 0:a[0])||{},re=y([p,`${D} ${Z}`]).join(", ");return{telecom:d,name:r.name,address:ee??y([te,re]).join(`
`)}}return{name:t}}get rxNorm(){return w(this.resource,this.includedResources)}}class rt extends m{constructor(){super(...arguments);l(this,"kind","MedicationStatement");l(this,"builderPatientRxNormStatus")}get basedOn(){var e,t;return(t=(e=this.resource.basedOn)==null?void 0:e[0])==null?void 0:t.type}get category(){return c(this.resource.category)}get context(){var e;return(e=this.resource.context)==null?void 0:e.display}get dateAsserted(){return u(this.resource.dateAsserted)}set dateAsserted(e){e instanceof Date?this.resource.dateAsserted=v(e):this.resource.dateAsserted=e}get derivedFrom(){var e;return((e=this.resource.derivedFrom)==null?void 0:e.map(({display:t})=>t||""))||[]}get aggregatedFrom(){const e=be(t=>t.url===Se||t.url===ve,this.resource.extension);return e!=null&&e.extension?y(e.extension.map(z("valueReference"))):y(this.resource.derivedFrom)}get display(){return c(O(this.resource,this.includedResources))}get dosage(){var e,t;return(t=(e=this.resource.dosage)==null?void 0:e[0])==null?void 0:t.text}get effectiveStart(){var e;return u((e=this.resource.effectivePeriod)==null?void 0:e.start)}get identifier(){var e,t;return(t=(e=this.resource.identifier)==null?void 0:e[0])==null?void 0:t.value}get informationSource(){return this.resource.informationSource||void 0}set informationSource(e){this.resource.informationSource=e}get medicationReference(){var e;return(e=this.resource.medicationReference)==null?void 0:e.display}get notesDisplay(){var e;return((e=this.resource.note)==null?void 0:e.map(({text:t})=>t))||[]}get partOf(){var e,t;return(t=(e=this.resource.partOf)==null?void 0:e[0])==null?void 0:t.display}get patientStatus(){var e;return Ve((e=this.builderPatientRxNormStatus)==null?void 0:e[this.rxNorm??""])}get rxNorm(){return w(this.resource,this.includedResources)}get rxNormCodeableConcept(){const e=A(this.resource,this.includedResources);return{...e??{},display:(e==null?void 0:e.display)??this.display}}get reason(){var e;return c((e=this.resource.reasonCode)==null?void 0:e[0])}get reasonReference(){return this.resource.reasonReference}get isInactive(){return!["active","intended","unknown"].includes(this.status)}get status(){return this.resource.status}get displayStatus(){return this.isArchived?"Dismissed":Oe(this.resource.status)}get statusReason(){var e;return c((e=this.resource.statusReason)==null?void 0:e[0])}get subject(){return this.resource.subject}get subjectID(){var t;const[,e]=((t=this.resource.subject.reference)==null?void 0:t.split("/"))||[];return e||""}get patient(){const e=f("Patient",this.resource.contained,this.includedResources,this.resource.subject.reference);if(e)return new P(e,this.includedResources)}get lastFillDate(){var e,t;return u((t=(e=this.resource.extension)==null?void 0:e.find(r=>r.url===Ne))==null?void 0:t.valueDateTime)}get quantity(){var t,r;const e=(r=(t=this.resource.extension)==null?void 0:t.find(n=>n.url===Ee))==null?void 0:r.valueQuantity;if(e)return`${e.value} ${e.unit||""}`}get daysSupply(){var e,t,r,n;return(n=(r=(t=(e=this.resource.extension)==null?void 0:e.find(o=>o.url===De))==null?void 0:t.valueQuantity)==null?void 0:r.value)==null?void 0:n.toString()}get refills(){var e,t,r;return(r=(t=(e=this.resource.extension)==null?void 0:e.find(n=>n.url===Ce))==null?void 0:t.valueUnsignedInt)==null?void 0:r.toString()}get lastPrescriber(){var r,n;const e=(n=(r=this.resource.extension)==null?void 0:r.find(o=>o.url===Ie))==null?void 0:n.valueReference;if(!(e!=null&&e.type)||!e.reference)return;const t=f(e.type,this.resource.contained,this.includedResources,e.reference);if(t!=null&&t.name){if(typeof t.name=="string")return t.name;const{family:o,given:a=[]}=t.name[0];return y([o,a[0]]).join(", ")}return e.display}get lastPrescribedDate(){var e,t;return u((t=(e=this.resource.extension)==null?void 0:e.find(r=>r.url===Re))==null?void 0:t.valueDateTime)}}class Pt extends m{constructor(){super(...arguments);l(this,"kind","Medication")}get performer(){var e;return(e=J(this.resource,this.includedResources))==null?void 0:e.name}get status(){return this.resource.status}get dosage(){var e,t,r;switch(this.resource.resourceType){case"MedicationStatement":return(t=(e=this.resource.dosage)==null?void 0:e[0])==null?void 0:t.text;case"MedicationAdministration":return new et(this.resource,this.includedResources).dosageDisplay;case"MedicationDispense":case"MedicationRequest":return c((r=this.resource.dosageInstruction)==null?void 0:r[0]);default:return""}}get date(){var e,t,r,n,o,a;switch(this.resource.resourceType){case"MedicationStatement":return this.resource.dateAsserted??((e=this.resource.effectivePeriod)==null?void 0:e.start);case"MedicationAdministration":return(t=this.resource.effectivePeriod)==null?void 0:t.start;case"MedicationDispense":return this.resource.whenHandedOver??this.resource.whenPrepared;case"MedicationRequest":return this.resource.authoredOn??((a=(o=(n=(r=this.resource.dosageInstruction)==null?void 0:r[0].timing)==null?void 0:n.repeat)==null?void 0:o.boundsPeriod)==null?void 0:a.start);default:return""}}get dateLocal(){return u(this.date)}get patient(){var t;const e=f("Patient",this.resource.contained,this.includedResources,(t=this.resource.subject)==null?void 0:t.reference);if(e)return new P(e,this.includedResources)}get prescriber(){switch(this.resource.resourceType){case"MedicationStatement":return new rt(this.resource,this.includedResources).lastPrescriber;case"MedicationDispense":return new Ze(this.resource,this.includedResources).includedPerformer;case"MedicationRequest":return new tt(this.resource,this.includedResources).includedRequester;default:return}}}class bt extends m{constructor(){super(...arguments);l(this,"kind","Observation")}get category(){var e;return c((e=this.resource.category)==null?void 0:e[0])}get display(){return c(this.resource.code)}get effectiveStart(){var e;return u(((e=this.resource.effectivePeriod)==null?void 0:e.start)||this.resource.effectiveDateTime)}get identifier(){var e;return((e=this.resource.identifier)==null?void 0:e[0].value)??""}get performer(){var e;return(e=this.resource.performer)==null?void 0:e[0].display}get value(){var e,t;return $([(e=this.resource.valueQuantity)==null?void 0:e.value,(t=this.resource.valueQuantity)==null?void 0:t.unit]).join("")}get interpretation(){var e;return c((e=this.resource.interpretation)==null?void 0:e[0])}get notes(){var e;return((e=this.resource.note)==null?void 0:e[0].text)??""}}export{Xe as C,_t as D,rt as M,bt as O,Ct as a,Et as b,Nt as c,Rt as d,It as e,Mt as f,je as g,Pt as h,We as i,tt as j,Ze as k,w as l,et as m,Dt as o,Tt as s,Ge as u};

import{r as M}from"./index-6f814c40.js";import{g as L,f as k,u as I}from"./patient-provider-d2b81159.js";import{r as j}from"./sort-b8885781.js";import{a9 as Q,n as N,aa as b,ab as T,ac as P,ad as E,F as w,a as c,c as n,Z as u,ae as O,af as D,ag as g,ah as A,ai as G,G as B,aj as q,ak as h,al as H,am as X,an as V,w as _,e as F,T as y,a8 as W,ao as z,s as K,ap as J,aq as Z}from"./patient-helper-2c738c95.js";import"./_baseToString-ba0098b0.js";import{f as C,c as S,i as ee,o as te}from"./sortBy-64fcb484.js";import"./_baseClone-0c3bfcab.js";import{c as U}from"./_basePickBy-a17ae44f.js";import"./sortBy-3860efd7.js";import"./_equalByTag-3aa7c076.js";import{b as re,h as se}from"./_baseForOwn-56487e0e.js";import{p as ie}from"./getPrototypeOf-28a32d6e.js";import"./_createSet-3c80ad01.js";import{q as v}from"./request-5a1df4c1.js";import{u as ne}from"./uniqWith-ade993ae.js";import{i as oe,N as ae}from"./null-flavor-ad182162.js";function ce(s){return s===void 0}var ue=ce,de="Expected a function";function le(s){if(typeof s!="function")throw new TypeError(de);return function(){var e=arguments;switch(e.length){case 0:return!s.call(this);case 1:return!s.call(this,e[0]);case 2:return!s.call(this,e[0],e[1]);case 3:return!s.call(this,e[0],e[1],e[2])}return!s.apply(this,e)}}var he=le,me=re,fe=he,ge=ie;function ye(s,e){return ge(s,fe(me(e)))}var pe=ye;function Ce(s){return U(s)}const Y=s=>{let e="",t="";switch(s){case"Active":e="confirmed",t="active";break;case"Inactive":e="confirmed",t="inactive";break;case"Pending":e="unconfirmed",t="active";break;case"Refuted":e="refuted",t="inactive";break;case"Entered In Error":e="entered-in-error";break;default:throw Error("status is should be of type ConditionStatus")}return pe({verificationStatus:{coding:[{system:P,code:e}]},...t&&{clinicalStatus:{coding:[{system:E,code:t}]}}},ue)},je=async(s,e,t,r)=>{const i=await r(),o={resourceType:"Condition",id:t.id,recorder:await L(i),...Y(t.status),category:t.id&&s?s.resource.category:[{coding:[{system:Q,code:"problem-list-item",display:"Problem List Item"}]}],code:t.id&&s?s.codings:{coding:[{system:t.condition.system,code:t.condition.code,display:t.condition.display}],text:t.condition.display},...t.abatement&&{abatementDateTime:N(t.abatement)},onsetDateTime:N(t.onset),recordedDate:N(new Date),subject:{type:"Patient",reference:`Patient/${e}`},note:t.note?[{text:t.note}]:void 0},a=await k(o,i);return await Promise.all([v.invalidateQueries([b]),v.invalidateQueries([T])]),a},Se={INF:{fullName:"Certain Infectious and Parasitic Diseases",shortName:"Infectious and Parasitic Diseases"},NEO:{fullName:"Neoplasms",shortName:"Neoplasms"},BLD:{fullName:"Diseases of the Blood and Blood Forming Organs and Certain Disorders Involving the Immune Mechanism",shortName:"Blood Diseases"},END:{fullName:"Endocrine, Nutritional and Metabolic Diseases",shortName:"Endocrine, Nutritional and Metabolic"},MBD:{fullName:"Mental, Behavioral and Neurodevelopmental Disorders",shortName:"Mental and Behavioral"},NVS:{fullName:"Diseases of the Nervous System",shortName:"Nervous System"},EYE:{fullName:"Diseases of the Eye and Adnexa",shortName:"Eye and Adnexa"},EAR:{fullName:"Diseases of the Ear and Mastoid Process",shortName:"Ear and Mastoid Process"},CIR:{fullName:"Diseases of the Circulatory System",shortName:"Circulatory System"},RSP:{fullName:"Diseases of the Respiratory System",shortName:"Respiratory System"},DIG:{fullName:"Diseases of the Digestive System",shortName:"Digestive System"},SKN:{fullName:"Diseases of the Skin and Subcutaneous Tissue",shortName:"Skin and Subcutaneous Tissue"},MUS:{fullName:"Diseases of the Musculoskeletal System and Connective Tissue",shortName:"Musculoskeletal System"},GEN:{fullName:"Diseases of the Genitourinary System",shortName:"Genitourinary System"},PRG:{fullName:"Pregnancy, Childbirth and the Puerperium",shortName:"Pregnancy & Childbirth"},PNL:{fullName:"Certain Conditions Originating in the Perinatal Period",shortName:"Perinatal Conditions"},MAL:{fullName:"Congenital Malformations, Deformations and Chromosomal Abnormalities",shortName:"Malformations and Chromosomal Abnormalities"},SYM:{fullName:"Symptoms, Signs and Abnormal Clinical and Laboratory Findings",shortName:"Clinical Findings"},INJ:{fullName:"Injury, Poisoning and Certain Other Consequences of External Causes",shortName:"External Causes Injury"},EXT:{fullName:"External Causes of Morbidity",shortName:"External Morbidity"},FAC:{fullName:"Factors Influencing Health Status and Contact with Health Services",shortName:"Health Status Influences"},XXX:{fullName:"Unacceptable principal diagnosis (inpatient data) or first-listed diagnosis (outpatient data)",shortName:"Unacceptable principal diagnosis"}};class ve extends w{get abatement(){var e,t,r;return this.resource.abatementAge?(e=this.resource.abatementAge.value)==null?void 0:e.toString():this.resource.abatementDateTime?c(this.resource.abatementDateTime):this.resource.abatementPeriod?c(this.resource.abatementPeriod.start):this.resource.abatementRange?c((r=(t=this.resource.abatementRange.low)==null?void 0:t.value)==null?void 0:r.toString()):this.resource.abatementString}get active(){var t;const e=C((t=this.resource.clinicalStatus)==null?void 0:t.coding,{system:E});return e!=null&&e.code?["active","recurrence","relapse"].includes(e.code):!1}get isArchived(){return this.getBasicResourceByAction("archive")!==void 0}get asserter(){var e;return(e=this.resource.asserter)==null?void 0:e.display}get bodySites(){var e;return((e=this.resource.bodySite)==null?void 0:e.map(t=>n(t)))||[]}get categories(){var e;return((e=this.resource.category)==null?void 0:e.map(t=>n(t)))||[]}get ccsChapter(){var t;const e=this.ccsChapterCode;if(e)return(t=Se[e])==null?void 0:t.shortName}get ccsChapterCode(){var e,t;return(t=(e=u(O,this.resource.code))==null?void 0:e.code)==null?void 0:t.slice(0,3)}get ccsGrouping(){var e;return(e=u(O,this.resource.code))==null?void 0:e.display}get clinicalStatus(){return n(this.resource.clinicalStatus)}get clinicalStatusCode(){var e,t;return(t=C((e=this.resource.clinicalStatus)==null?void 0:e.coding,{system:E}))==null?void 0:t.code}get codings(){return this.resource.code}get display(){var e;return((e=D(p,this.resource.code))==null?void 0:e.display)??n(this.resource.code)}get encounter(){var e;return(e=this.resource.encounter)==null?void 0:e.display}get evidences(){var e;return((e=this.resource.evidence)==null?void 0:e.map(t=>{var r;return n((r=t.code)==null?void 0:r[0])}))||[]}get icd10Code(){var e;return(e=u(g,this.resource.code))==null?void 0:e.code}get icd10System(){var e;return(e=u(g,this.resource.code))==null?void 0:e.system}get icd10Display(){var e;return(e=u(g,this.resource.code))==null?void 0:e.display}get isDeleted(){return this.verificationStatusCode==="entered-in-error"}get hasEnrichment(){const e=p.filter(r=>r.checkForEnrichment===!0);return S(e.map(r=>A(r.system,this.resource.code))).length>0}get knownCodings(){const e=S(p.map(r=>r.checkForEnrichment?A(r.system,this.resource.code):u(r.system,this.resource.code)));return ne(e,(r,i)=>r.system===i.system)}knownCodingsMatch(e){return ee(this.knownCodings,e.knownCodings,(t,r)=>t.code===r.code&&t.system===r.system).length>0}get notes(){var e;return((e=this.resource.note)==null?void 0:e.map(t=>t.text))||[]}get onset(){var e,t,r;return this.resource.onsetAge?(e=this.resource.onsetAge.value)==null?void 0:e.toString():this.resource.onsetDateTime?c(this.resource.onsetDateTime):this.resource.onsetPeriod?c(this.resource.onsetPeriod.start):this.resource.onsetRange?c((r=(t=this.resource.onsetRange.low)==null?void 0:t.value)==null?void 0:r.toString()):G(this.resource.onsetString)}get patient(){const e=B("Patient",this.resource.contained,this.includedResources,this.resource.subject.reference);if(e)return new q(e,this.includedResources)}get preferredCoding(){return D(p,this.resource.code)}get recordedDate(){return c(this.resource.recordedDate)}get recorded(){return c(this.resource.recordedDate)}get recorder(){var e;return(e=this.resource.recorder)==null?void 0:e.display}get severity(){return n(this.resource.severity)}get snomedCoding(){return u(h,this.resource.code)}get snomedCode(){var e;return(e=u(h,this.resource.code))==null?void 0:e.code}get snomedDisplay(){var e;return(e=u(h,this.resource.code))==null?void 0:e.display}get snomedSystem(){var e;return(e=u(h,this.resource.code))==null?void 0:e.system}get stages(){var e;return((e=this.resource.stage)==null?void 0:e.map(t=>{const r=n(t.summary),i=n(t.type);return`Summary: ${r}, Type: ${i}`}))||[]}get displayStatus(){function e(i){switch(i){case"active":case"recurrence":case"relapse":return"Active";case"inactive":case"remission":case"resolved":return"Inactive";default:return""}}function t(i){switch(i){case"confirmed":return"confirmed";case"unconfirmed":case"provisional":case"differential":return"unconfirmed";case"refuted":return"refuted";case"entered-in-error":return"entered-in-error";default:return""}}if(this.isSummaryResource)return this.isArchived?"Dismissed":e(this.clinicalStatusCode)||"Unknown";switch(t(this.verificationStatusCode)+e(this.clinicalStatusCode).toLowerCase()){case"unconfirmedactive":return"Pending";case"unconfirmedinactive":case"refutedactive":return"Unknown";case"confirmedinactive":return"Inactive";case"confirmedactive":return"Active";case"refutedinactive":return"Refuted";case"entered-in-error":return"Entered in Error";default:return"Unknown"}}get subjectID(){var t;const[,e]=((t=this.resource.subject.reference)==null?void 0:t.split("/"))||[];return e||""}get verificationStatus(){return n(this.resource.verificationStatus)}get verificationStatusCode(){var e,t;return(t=C((e=this.resource.verificationStatus)==null?void 0:e.coding,{system:P}))==null?void 0:t.code}}const Qe=["Active","Inactive","Entered in Error","Pending","Refuted","Unknown"],Ge=["Active","Inactive","Dismissed","Unknown"],p=[{system:h,checkForEnrichment:!0},{system:g,checkForEnrichment:!0},{system:h},{system:g},{system:H},{system:X},{system:V}];function qe(s){const e={resourceType:"Condition",subject:{type:"Patient",reference:`Patient/${s}`},...Y("Active")};return Ce(e)}function Ne(){return I(b,[],_(async(s,e)=>{try{const{bundle:t,resources:r}=await F("Condition",s,{patientUPID:e.UPID});return $(x(r,t))}catch(t){throw y.logError(t,`Failed fetching conditions for patient: ${e.UPID}`)}},"req.patient_conditions"))}function Ee(){return I(T,[],_(async(s,e)=>{try{const{bundle:t,resources:r}=await z("Condition",s,{_revinclude:"Basic:subject",patientUPID:e.UPID});return $(x(r,t))}catch(t){throw y.logError(t,`Failed fetching conditions outside for patient: ${e.UPID}`)}},"req.other_provider_conditions"))}function He(){const[s,e]=M.useState([]),t=Ne(),r=Ee();M.useEffect(()=>{const l=t.data??[],m=be(r.data??[],l,!0);e(m)},[t.data,r.data]);const i=t.isLoading||r.isLoading,o=t.isError||r.isError,a=t.isFetching||r.isFetching;return{isLoading:i,isError:o,isFetching:a,data:s}}const De=s=>({request:{method:"GET",url:`/Condition/${s}/_history`}}),Ie=async(s,e)=>{const r=(await F("Condition",s,e)).resources.map(o=>o.id);if(!r.length)return;const i={resourceType:"Bundle",id:"bundle-history-conditions",type:"batch",entry:r.map(o=>De(o))};return s.fhirClient.batch({body:{...i,type:"batch"}})};function Xe(s){return I(J,[s],_(async(e,t)=>{if(s){if(s.verificationStatus==="entered-in-error")return{conditions:[],bundle:{resourceType:"Bundle",entry:[]}};try{const r=s.knownCodings.map(d=>`${d.system}|${d.code}`),i={patientUPID:t.UPID,_include:["Condition:patient","Condition:encounter"],"_include:iterate":"Patient:organization"};r.length>0?i.code=r.join(","):i._id=s.id;const{resources:o,bundle:a}=await K("Condition",e,i),l=await Ie(e,i),m=[];return l&&l.entry&&l.entry.forEach(d=>{const{resource:f}=d;(f==null?void 0:f.resourceType)==="Bundle"&&f.entry&&m.push(...f.entry)}),{conditions:o.concat(...S(m.map(d=>d.resource))),bundle:a}}catch(r){throw y.logError(r,`Failed fetching condition history for patient: ${t.UPID}}`)}}},"req.condition_history"),!!s)}function x(s,e){const t=W(e);return s.map(r=>new ve(r,void 0,t.get(r.id??"")))}function $(s){return te(s.filter(e=>{var t;return((t=e.resource.asserter)==null?void 0:t.type)!=="Patient"}),["resource.recordedDate","display"],["desc"])}const Ve=async(s,e)=>{const t=s.getBasicResourceByAction("archive")||s.getBasicResourceByAction("unarchive"),r=s.isArchived?"unarchive":"archive";await j(t,s,e,r),await v.invalidateQueries([T])},We=async(s,e)=>{if(!s.id)throw new Error("Tried to edit a resource that hasn't been created yet.");const t=U(s);if(t.verificationStatus={coding:[{code:"entered-in-error",system:P}]},delete t.clinicalStatus,(await k(t,e)).id)y.reportActionSuccess("delete_condition");else throw y.reportActionFailure("delete_condition"),new Error(`Failed to edit resource with id of ${s.id}`);await v.invalidateQueries([b])},be=(s,e,t)=>s.filter(r=>r.isArchived&&!t||["FAC","XXX"].includes(r.ccsChapterCode??"")?!1:!e.some(i=>{const o=r.resource.recordedDate,a=i.resource.recordedDate,l=r.knownCodingsMatch(i),m=i.verificationStatus==="entered-in-error",R=!o||a&&o<=a,d=r.clinicalStatus===i.clinicalStatus;return l&&!m&&(R||d)}));class ze extends w{get category(){var r,i,o,a;const e=n((r=this.resource.category)==null?void 0:r[0])||this.reportCategory;if(e)return e;const t=n((i=this.resource.category)==null?void 0:i[0]);return((a=B("Observation",void 0,this.includedResources,(o=this.resource.result)==null?void 0:o[0].reference))==null?void 0:a.category)??`No display value found ${t?" for ":""}${t}`}get displayName(){var r;const{code:e}=this.resource,t=n(e);return oe((r=e.coding)==null?void 0:r[0])?se(ae,[t,"display"],"Unknown"):t}get effectiveEnd(){var e;return(e=this.resource.effectivePeriod)!=null&&e.end?c(this.resource.effectivePeriod.end):this.effectiveStart}get identifier(){var e;return((e=this.resource.identifier)==null?void 0:e[0].value)??""}get effectiveStart(){var e;return c(((e=this.resource.effectivePeriod)==null?void 0:e.start)||this.resource.effectiveDateTime)}get id(){return this.resource.id??""}get performer(){var e,t;return((e=this.organization)==null?void 0:e.display)||((t=this.resource.performer)==null?void 0:t[0].display)}get organization(){const e=this.resource.performer??[];return C(e,{type:"Organization"})}get reportCategory(){var e;return((e=D([{system:Z},{system:h}],this.resource.code))==null?void 0:e.display)??n(this.resource.code)}get results(){return this.resource.result??[]}}class Ke extends w{get id(){return this.resource.id??""}get category(){var e;return n((e=this.resource.category)==null?void 0:e[0])}get display(){return n(this.resource.code)}get effectiveStart(){var e;return c(((e=this.resource.effectivePeriod)==null?void 0:e.start)||this.resource.effectiveDateTime)}get identifier(){var e;return((e=this.resource.identifier)==null?void 0:e[0].value)??""}get performer(){var e;return(e=this.resource.performer)==null?void 0:e[0].display}get value(){var e,t;return S([(e=this.resource.valueQuantity)==null?void 0:e.value,(t=this.resource.valueQuantity)==null?void 0:t.unit]).join("")}get interpretation(){var e;return n((e=this.resource.interpretation)==null?void 0:e[0])}get note(){var e;return((e=this.resource.note)==null?void 0:e[0].text)??""}}export{ve as C,ze as D,Ke as O,qe as a,Qe as b,je as c,We as d,Ne as e,He as f,Ce as g,Ge as o,Ve as t,Xe as u};

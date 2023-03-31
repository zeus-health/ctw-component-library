var _=Object.defineProperty;var C=(t,r,e)=>r in t?_(t,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[r]=e;var c=(t,r,e)=>(C(t,typeof r!="symbol"?r+"":r,e),e);import{R as o,r as R}from"./index-6f814c40.js";import{c as V}from"./index-74f03c09.js";import{u as w}from"./resource-details-drawer-247d740f.js";import{V as b}from"./view-fhir-fe0a1e0b.js";import{F as v,a as E,c as g,G as h,w as P,H as D,s as N,I,u as O}from"./patient-helper-383c03c6.js";import{T as S}from"./table-e0266844.js";import{c as q,u as k}from"./patient-provider-a75ad76b.js";import"./_baseToString-2a4c2757.js";import{f as B,o as M}from"./sortBy-1cabbe82.js";import"./_baseClone-184e5c2b.js";import"./sortBy-649a17b3.js";import"./_equalByTag-5ee6784b.js";import"./_baseForOwn-54d22bab.js";import"./_createSet-014fa0cf.js";import{i as z}from"./isEqual-ee96640d.js";import{u as W}from"./details-card-1ac2a254.js";import{u as A}from"./use-breakpoints-52f1bcfc.js";const d=(t=!1)=>{const r=[{widthPercent:20,minWidth:150,title:"Practitioner",render:e=>o.createElement(o.Fragment,null,o.createElement("div",null,e.practitionerName),o.createElement("div",null,e.managingOrganization))},{widthPercent:20,minWidth:150,title:"Role",render:e=>o.createElement("div",null,e.role)},{widthPercent:20,minWidth:150,title:"Specialty",render:e=>o.createElement("div",null,e.qualification)},{widthPercent:20,minWidth:150,title:"Noted On",render:e=>o.createElement("div",null,e.effectiveStartDate)}];return t&&r.push({widthPercent:20,minWidth:150,render:e=>o.createElement(b,{name:"CareTeam Resource",resource:e.careTeam})}),r};try{d.displayName="patientCareTeamColumns",d.__docgenInfo={description:"",displayName:"patientCareTeamColumns",props:{}}}catch{}class F extends v{constructor(){super(...arguments);c(this,"kind","CareTeam")}get status(){return this.resource.status}get periodStart(){var e;return E((e=this.resource.period)==null?void 0:e.start)}get periodEnd(){var e;return(e=this.resource.period)==null?void 0:e.end}get particpants(){return this.resource.participant}get careTeamTelecom(){return this.resource.telecom}get managingOrganization(){var a,i;return(i=(a=B(this.resource.participant,"onBehalfOf"))==null?void 0:a.onBehalfOf)==null?void 0:i.display}get role(){var e,a;return g((a=(e=this.resource.participant)==null?void 0:e[0].role)==null?void 0:a[0])}get practitionerQualification(){var i,n,u,s;const e=(u=(n=(i=this.resource.participant)==null?void 0:i[0])==null?void 0:n.member)==null?void 0:u.reference,a=h("Practitioner",this.resource.contained,this.includedResources,e);if(a)return g((s=new q(a).resource.qualification)==null?void 0:s[0].code)}getPractitionerByID(e){return h("Practitioner",this.resource.contained,this.includedResources,e)}}class x extends v{constructor(e,a){super(a);c(this,"kind","CareTeamPractitioner");c(this,"careTeam");this.careTeam=e}get key(){return`${this.careTeam.id}_${this.id}`}get practitionerName(){return new q(this.resource).fullName}get effectiveStartDate(){return this.careTeam.periodStart}get managingOrganization(){return this.careTeam.managingOrganization}get role(){return this.careTeam.role}get qualification(){return this.careTeam.practitionerQualification}get telecom(){return this.careTeam.careTeamTelecom}get status(){return this.careTeam.status}}const Q=(t,r)=>{const e=t.map(n=>new F(n,r)),a=[];e.forEach(n=>{var u;return(u=n.resource.participant)==null?void 0:u.forEach(s=>{var p,f;const l=n.getPractitionerByID((p=s.member)==null?void 0:p.reference);l!=null&&l.id&&((f=s.member)!=null&&f.reference)&&a.push(new x(n,l))})});const i=M(a,["effectiveStartDate","id"],["desc","desc"]);return W(i,(n,u)=>z(y(n),y(u)))},y=t=>[t.effectiveStartDate,t.role,t.qualification,t.practitionerName];function H(){return k(D,[],P(async(t,r)=>{try{const{bundle:e,resources:a}=await N("CareTeam",t,{patientUPID:r.UPID,_include:"CareTeam:participant"}),i=I(e);return Q(a,i)}catch(e){throw new Error(`Failed fetching care team information for patient: ${e}`)}},"req.patient_care_team",[]))}function T({className:t}){const r=R.useRef(null),e=A(r),{featureFlags:a}=O(),i=H(),n=w({header:u=>u.practitionerName,subHeader:u=>u.qualification,details:m});return o.createElement("div",{ref:r,className:V("ctw-scrollable-pass-through-height ctw-border ctw-border-solid ctw-border-divider-light ctw-bg-white",t,{"ctw-stacked":e.sm})},o.createElement(S,{stacked:e.sm,isLoading:i.isLoading,records:i.data??[],columns:d(a==null?void 0:a.enableViewFhirButton),handleRowClick:n}))}const m=t=>[{label:"Organization",value:t.managingOrganization},{label:"CareTeam Telecom",value:t.telecom&&o.createElement("div",null,t.telecom.map((r,e)=>o.createElement("div",{key:e},r.value)))},{label:"Role",value:t.role},{label:"Status",value:t.status}];try{T.displayName="PatientCareTeam",T.__docgenInfo={description:"",displayName:"PatientCareTeam",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}try{m.displayName="careTeamData",m.__docgenInfo={description:"",displayName:"careTeamData",props:{kind:{defaultValue:null,description:"",name:"kind",required:!0,type:{name:'"CareTeamPractitioner"'}},careTeam:{defaultValue:null,description:"",name:"careTeam",required:!0,type:{name:"CareTeamModel"}},key:{defaultValue:null,description:"",name:"key",required:!0,type:{name:"string"}},practitionerName:{defaultValue:null,description:"",name:"practitionerName",required:!0,type:{name:"string"}},effectiveStartDate:{defaultValue:null,description:"",name:"effectiveStartDate",required:!0,type:{name:"string | undefined"}},managingOrganization:{defaultValue:null,description:"",name:"managingOrganization",required:!0,type:{name:"string | undefined"}},role:{defaultValue:null,description:"",name:"role",required:!0,type:{name:"string"}},qualification:{defaultValue:null,description:"",name:"qualification",required:!0,type:{name:"string | undefined"}},telecom:{defaultValue:null,description:"",name:"telecom",required:!0,type:{name:"ContactPoint[] | undefined"}},status:{defaultValue:null,description:"",name:"status",required:!0,type:{name:"enum",value:[{value:"undefined"},{value:'"proposed"'},{value:'"active"'},{value:'"suspended"'},{value:'"inactive"'},{value:'"entered-in-error"'}]}},resource:{defaultValue:null,description:"",name:"resource",required:!0,type:{name:"Practitioner"}},includedResources:{defaultValue:null,description:"",name:"includedResources",required:!1,type:{name:"ResourceMap"}},revIncludes:{defaultValue:null,description:"",name:"revIncludes",required:!1,type:{name:"Resource[]"}},id:{defaultValue:null,description:"",name:"id",required:!0,type:{name:"string"}},versionId:{defaultValue:null,description:"",name:"versionId",required:!0,type:{name:"string"}},isArchived:{defaultValue:null,description:"",name:"isArchived",required:!0,type:{name:"boolean"}},isSummaryResource:{defaultValue:null,description:"",name:"isSummaryResource",required:!0,type:{name:"boolean"}},resourceType:{defaultValue:null,description:"",name:"resourceType",required:!0,type:{name:"string"}},resourceTypeTitle:{defaultValue:null,description:"",name:"resourceTypeTitle",required:!0,type:{name:"string"}},getBasicResourceByAction:{defaultValue:null,description:"",name:"getBasicResourceByAction",required:!0,type:{name:"(profileAction: string) => Basic | undefined"}},isEnriched:{defaultValue:null,description:"",name:"isEnriched",required:!0,type:{name:"() => boolean"}},toString:{defaultValue:null,description:"",name:"toString",required:!1,type:{name:"() => string"}}}}}catch{}export{T as P};

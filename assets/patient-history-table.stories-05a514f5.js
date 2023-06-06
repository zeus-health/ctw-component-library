var D=Object.defineProperty;var q=(e,t,r)=>t in e?D(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var p=(e,t,r)=>(q(e,typeof t!="symbol"?t+"":t,r),r);import{R as a,r as o}from"./index-6f814c40.js";import{c as l}from"./index-74f03c09.js";import{h as L,i as F,j as x,k as M,u as V,l as U,m as B,T as j,Q as z,w as W,n as $,H as K,R as Q,C as Y,F as O,a as J,b as Z,c as G,S as X}from"./patient-allergies-2c658786.js";import"./_baseForOwn-6ce43847.js";import"./uniqWith-bbf3966e.js";import{c as ee,T as te}from"./table-35182169.js";import"./_baseClone-7e8cfb08.js";import"./_baseIsEqual-2f71925b.js";import{u as ae}from"./uniq-41de9089.js";import"./_baseUniq-cf39c5a7.js";import"./action-list-32bd005e.js";import"./drawer-3e903764.js";import"./spinner-66aa4ba7.js";import"./request-ce924112.js";import{s as re}from"./requests-6020da22.js";import"./_commonjsHelpers-042e6b4d.js";import"./extends-ed7e75b0.js";import"./_basePickBy-a6d7916f.js";import"./toNumber-6e4e7434.js";import"./v4-a960c1f4.js";import"./index-d206d595.js";import"./mapValues-dc8f3697.js";import"./index-6de6b113.js";import"./debounce-5d5a9f7a.js";import"./data-list-254aa0b0.js";import"./isEqual-dc54df64.js";import"./isPlainObject-f4e3af75.js";import"./index-135b3e83.js";function se(){const e=[];return e.push({key:"status",type:"select",icon:L,values:["initialize",{key:"in_progress",name:"in progress"},"error","done",{key:"done_with_errors",name:"done with errors "}],display:"status"},{key:"future_jobs",type:"tag",icon:F,display:"Exclude Future Jobs"}),e}const ie={future_jobs:{key:"future_jobs",selected:!0,type:"tag"}};class ne{constructor(t,r){p(this,"kind","PatientHistory");p(this,"historyInfo");p(this,"patient");this.patient=t,this.historyInfo=r}get providers(){var t;return(t=this.historyInfo)==null?void 0:t.attributes.providers}get lastUpdatedAt(){var t;return x(new Date(Number((t=this.historyInfo)==null?void 0:t.attributes.lastUpdatedAt)*1e3),"M/d/yy h:mm a")}get key(){var t;return((t=this.historyInfo)==null?void 0:t.id)||""}get targetDate(){var t;return M((t=this.historyInfo)==null?void 0:t.attributes.targetDate)}get createdAt(){var t;if((t=this.historyInfo)!=null&&t.attributes.createdAt)return x(new Date(Number(this.historyInfo.attributes.createdAt)*1e3),"M/d/yy h:mm a")}}function oe(e,t,r,s){return V(z,[e,t,r,s],async c=>{try{const i=await U({requestContext:c,count:e,offset:t,status:r,excludeFutureJobs:s}),u=ae(ee(i.data.map(n=>n.relationships.patient.data.id)));if(!u.length)return{total:0,patients:[]};const m=await B(c,void 0,u),g=i.data.map(n=>{const w=m.patients.filter(h=>h.id===n.relationships.patient.data.id);return new ne(w[0],n)});return{hasNext:!!i.links.next,total:i.data.length,patients:g}}catch(i){throw j.logError(i,"Failed fetching patient history patients."),new Error(`Failed fetching patient history patients: ${i}`)}})}const N=({setCurrentPage:e,currentPage:t,hasNext:r})=>a.createElement("div",{className:"ctw-simple-pagination ctw-flex ctw-justify-end ctw-space-x-3 ctw-px-6 ctw-py-3","data-zus-telemetry-namespace":"Pagination"},a.createElement(S,{pageToNavigateTo:t-1,setCurrentPage:e,className:l({"ctw-invisible":t===1})},"Prev"),a.createElement(S,{pageToNavigateTo:t+1,setCurrentPage:e,className:l({"ctw-invisible":!r})},"Next")),S=({pageToNavigateTo:e,setCurrentPage:t,children:r,className:s})=>a.createElement("button",{type:"button",className:l("ctw-btn-default",s),"data-zus-telemetry-click":"paginate",onClick:()=>t(e)},r);try{N.displayName="SimplePagination",N.__docgenInfo={description:"",displayName:"SimplePagination",props:{currentPage:{defaultValue:null,description:"",name:"currentPage",required:!0,type:{name:"number"}},isLoading:{defaultValue:null,description:"",name:"isLoading",required:!1,type:{name:"boolean"}},setCurrentPage:{defaultValue:null,description:"",name:"setCurrentPage",required:!0,type:{name:"(n: number) => void"}},hasNext:{defaultValue:null,description:"",name:"hasNext",required:!1,type:{name:"boolean"}}}}}catch{}const v=W(({className:e,handleRowClick:t,pageSize:r=10,title:s="Patient History Request"})=>{const[c,i]=o.useState(1),[u,m]=o.useState([]),[g,n]=o.useState(),[w,h]=o.useState(!0),{data:{patients:E,total:R,hasNext:C}={},isFetching:_,isError:b}=oe(r,c-1,g,w),A=d=>{var P,T;h(!!((P=d.future_jobs)!=null&&P.selected)),(T=d.status)!=null&&T.selected&&typeof d.status.selected=="string"?n(d.status.selected.split(" ").join("_")):n(void 0)};return o.useEffect(()=>{!_&&E&&m(E)},[E,R,b,_]),o.useEffect(()=>{b&&m([])},[b,_]),a.createElement($,{className:l("ctw-patients-table",e),"data-zus-telemetry-namespace":"PatientsTable"},a.createElement(K,{title:s}),a.createElement(Q,{filterOptions:{onChange:A,filters:se(),defaultState:ie},className:"ctw-ml-2"}),a.createElement("div",{className:"ctw-overflow-hidden"},a.createElement(te,{records:u,columns:ce,pageSize:r,handleRowClick:t,hidePagination:!0},a.createElement(N,{currentPage:c,setCurrentPage:i,hasNext:C}))))},"PatientsHistoryTable"),ce=[{title:"Last Queried",render:e=>a.createElement("div",null,e.lastUpdatedAt)},{title:"Target Date",render:e=>a.createElement("div",null,e.targetDate)},{title:"Name",render:e=>a.createElement(le,{data:e})},{title:"Source",render:e=>{var t;return a.createElement("div",{className:"ctw-space-y-2"},(t=e.providers)==null?void 0:t.map(r=>{var s;return a.createElement("div",{key:`${(s=e.historyInfo)==null?void 0:s.id}-${r.service}`},a.createElement("div",{className:"ctw-w-fit  ctw-py-1	ctw-capitalize"},ue(r.service)))}))}},{title:"Status",render:e=>{var t;return a.createElement("div",{className:"ctw-space-y-2"},(t=e.providers)==null?void 0:t.map(r=>a.createElement("div",{key:`${e.key}-${r.service}`},a.createElement("div",{className:"ctw-capitalize"},a.createElement(me,{status:r.status})))))}}],le=({data:e})=>a.createElement("div",{className:"ctw-flex ctw-items-center"},a.createElement("div",null,a.createElement("div",{className:"ctw-flex ctw-space-x-1 ctw-font-medium"},a.createElement("div",{className:"ctw-max-w-xs"},e.patient.fullName),e.patient.resource.gender&&a.createElement("div",{className:"ctw-uppercase"},"(",e.patient.resource.gender[0],")")),a.createElement("div",{className:"ctw-text-content-lighter"},e.patient.dob," (",e.patient.age,")"))),ue=e=>{switch(e.toLowerCase()){case"commonwell":return"EHR Network";case"surescripts":return"Medication History";default:return e}},me=({status:e})=>{switch(e){case"initialize":case"in_progress":return a.createElement(y,{status:e,className:"ctw-bg-caution-light ctw-text-caution-heading"});case"done":return a.createElement(y,{status:e,className:"ctw-bg-success-light ctw-text-success-dark"});case"error":case"done_with_errors":return a.createElement(y,{status:e,className:"ctw-bg-error-light ctw-text-error-text"});default:return a.createElement(y,{status:e})}},y=({status:e,className:t})=>a.createElement("div",{className:l("ctw-w-fit ctw-rounded-2xl ctw-px-3 ctw-py-1 ctw-font-medium",t)},e.split("_").join(" "));try{v.displayName="PatientHistoryTable",v.__docgenInfo={description:"",displayName:"PatientHistoryTable",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"Argument"}},handleRowClick:{defaultValue:null,description:"",name:"handleRowClick",required:!1,type:{name:"((row: PatientHistoryRequestModel) => void)"}},pageSize:{defaultValue:null,description:"",name:"pageSize",required:!1,type:{name:"number"}},title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}},getRowClasses:{defaultValue:null,description:"",name:"getRowClasses",required:!1,type:{name:"((row: PatientModel) => Argument)"}},onRowClick:{defaultValue:null,description:"",name:"onRowClick",required:!1,type:{name:"((row: PatientModel) => void)"}}}}}catch{}const Be={component:v,tags:["autodocs"],args:{},decorators:[(e,{args:t})=>a.createElement(Y,{env:"dev",authToken:O,builderId:J},a.createElement(Z,{patientID:G,systemURL:X},a.createElement(e,{args:t})))]},f={...re()};var k,I,H;f.parameters={...f.parameters,docs:{...(k=f.parameters)==null?void 0:k.docs,source:{originalSource:`{
  ...setupPatientHistoryMocks()
}`,...(H=(I=f.parameters)==null?void 0:I.docs)==null?void 0:H.source}}};const je=["Basic"];export{f as Basic,je as __namedExportsOrder,Be as default};
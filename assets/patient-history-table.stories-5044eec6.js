var C=Object.defineProperty;var D=(e,t,r)=>t in e?C(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var p=(e,t,r)=>(D(e,typeof t!="symbol"?t+"":t,r),r);import{r as l,R as a}from"./index-9f32f44c.js";import{c as S}from"./index-a587463d.js";import{s as F,t as B,v as N,x as L,m as M,y as q,z as U,A as V,B as j,E as z,w as W,G as $,H as K,I as Y,R as J,T as O,J as Q,C as G,F as Z,a as X,b as ee,c as te,S as ae}from"./patient-allergies-aff89e23.js";import"./mapValues-0faaf839.js";import"./action-list-f6838f32.js";import{u as re}from"./uniq-3125a96e.js";import"./request-b0088695.js";import"./spinner-096fc82a.js";import{s as se}from"./requests-4b2f796a.js";import"./_commonjsHelpers-de833af9.js";import"./isPlainObject-5ac64777.js";import"./extends-a9bf1af6.js";import"./index-a6f82bad.js";import"./index-9c2d1831.js";import"./debounce-552511e6.js";import"./toNumber-d641e9d5.js";import"./data-list-2854f463.js";import"./index-87936114.js";import"./requests-68247d58.js";function ie(){const e=[];return e.push({key:"status",type:"select",icon:F,values:["initialize",{key:"in_progress",name:"in progress"},"error","done",{key:"done_with_errors",name:"done with errors "}],display:"status"},{key:"future_jobs",type:"tag",icon:B,display:"Exclude Future Jobs"}),e}const ne={future_jobs:{key:"future_jobs",selected:!0,type:"tag"}};class oe{constructor(t,r){p(this,"kind","PatientHistory");p(this,"historyInfo");p(this,"patient");this.patient=t,this.historyInfo=r}get providers(){var t;return(t=this.historyInfo)==null?void 0:t.attributes.providers}get lastUpdatedAt(){var t;return N(new Date(Number((t=this.historyInfo)==null?void 0:t.attributes.lastUpdatedAt)*1e3),"M/d/yy h:mm a")}get key(){var t;return((t=this.historyInfo)==null?void 0:t.id)||""}get targetDate(){var t;return L((t=this.historyInfo)==null?void 0:t.attributes.targetDate)}get createdAt(){var t;if((t=this.historyInfo)!=null&&t.attributes.createdAt)return N(new Date(Number(this.historyInfo.attributes.createdAt)*1e3),"M/d/yy h:mm a")}}function ce(e,t,r,s){return M(z,[e,t,r,s],async n=>{try{const i=await q({requestContext:n,count:e,offset:t,status:r,excludeFutureJobs:s}),u=re(U(i.data.map(o=>o.relationships.patient.data.id)));if(!u.length)return{total:0,patients:[]};const w=await V(n,void 0,u),d=i.data.map(o=>{const m=w.patients.filter(h=>h.id===o.relationships.patient.data.id);return new oe(m[0],o)});return{hasNext:!!i.links.next,total:i.data.length,patients:d}}catch(i){throw j.logError(i,"Failed fetching patient history patients."),new Error(`Failed fetching patient history patients: ${i}`)}})}const b=W(({className:e,handleRowClick:t,pageSize:r=10,title:s="Patient History Request",includeBorder:n=!0})=>{const[i,u]=l.useState(1),[w,d]=l.useState([]),[o,m]=l.useState(),[h,k]=l.useState(!0),{data:{patients:g,total:x,hasNext:R}={},isFetching:E,isError:_}=ce(r,i-1,o,h),A=c=>{var v,P;k(!!((v=c.future_jobs)!=null&&v.selected)),(P=c.status)!=null&&P.selected&&typeof c.status.selected=="string"?m(c.status.selected.split(" ").join("_")):m(void 0)};return l.useEffect(()=>{!E&&g&&d(g.filter(c=>c.patient))},[g,x,_,E]),l.useEffect(()=>{_&&d([])},[_,E]),a.createElement($,{componentName:"PatientHistoryTable"},a.createElement(K,{className:S("ctw-patients-table-inputs",{"ctw-patients-border":n},e)},s&&a.createElement(Y,{title:s}),a.createElement(J,{filterOptions:{onChange:A,filters:ie(),defaultState:ne},className:"ctw-ml-2"}),a.createElement("div",{className:"ctw-overflow-hidden"},a.createElement(O,{records:w,columns:le,pageSize:r,handleRowClick:t,hidePagination:!0},a.createElement(Q,{currentPage:i,setCurrentPage:u,hasNext:R})))))},"PatientsHistoryTable"),le=[{title:"Last Queried",render:e=>a.createElement("div",null,e.lastUpdatedAt)},{title:"Target Date",render:e=>a.createElement("div",null,e.targetDate)},{title:"Name",render:e=>a.createElement(ue,{data:e})},{title:"Source",render:e=>{var t;return a.createElement("div",{className:"ctw-space-y-2"},(t=e.providers)==null?void 0:t.map(r=>{var s;return a.createElement("div",{key:`${(s=e.historyInfo)==null?void 0:s.id}-${r.service}`},a.createElement("div",{className:"ctw-w-fit  ctw-py-1	ctw-capitalize"},de(r.service)))}))}},{title:"Status",render:e=>{var t;return a.createElement("div",{className:"ctw-space-y-2"},(t=e.providers)==null?void 0:t.map(r=>a.createElement("div",{key:`${e.key}-${r.service}`},a.createElement("div",{className:"ctw-capitalize"},a.createElement(me,{status:r.status})))))}}],ue=({data:e})=>{var t,r,s,n;return a.createElement("div",{className:"ctw-flex ctw-items-center"},a.createElement("div",null,a.createElement("div",{className:"ctw-flex ctw-space-x-1 ctw-font-medium"},a.createElement("div",{className:"ctw-max-w-xs"},(t=e.patient)==null?void 0:t.fullName),((r=e.patient)==null?void 0:r.resource.gender)&&a.createElement("div",{className:"ctw-uppercase"},"(",e.patient.resource.gender[0],")")),a.createElement("div",{className:"ctw-text-content-lighter"},(s=e.patient)==null?void 0:s.dob," (",(n=e.patient)==null?void 0:n.age,")")))},de=e=>{switch(e.toLowerCase()){case"commonwell":return"EHR Network";case"surescripts":return"Medication History";default:return e}},me=({status:e})=>{switch(e){case"initialize":case"in_progress":return a.createElement(y,{status:e,className:"ctw-bg-caution-light ctw-text-caution-heading"});case"done":return a.createElement(y,{status:e,className:"ctw-bg-success-light ctw-text-success-dark"});case"error":case"done_with_errors":return a.createElement(y,{status:e,className:"ctw-bg-error-light ctw-text-error-text"});default:return a.createElement(y,{status:e})}},y=({status:e,className:t})=>a.createElement("div",{className:S("ctw-w-fit ctw-rounded-2xl ctw-px-3 ctw-py-1 ctw-font-medium",t)},e.split("_").join(" "));try{b.displayName="PatientHistoryTable",b.__docgenInfo={description:"",displayName:"PatientHistoryTable",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"Argument"}},handleRowClick:{defaultValue:null,description:"",name:"handleRowClick",required:!1,type:{name:"((row: PatientHistoryRequestModel) => void)"}},pageSize:{defaultValue:null,description:"",name:"pageSize",required:!1,type:{name:"number"}},title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}},includeBorder:{defaultValue:null,description:"",name:"includeBorder",required:!1,type:{name:"boolean"}},getRowClasses:{defaultValue:null,description:"",name:"getRowClasses",required:!1,type:{name:"((row: PatientModel) => Argument)"}},onRowClick:{defaultValue:null,description:"",name:"onRowClick",required:!1,type:{name:"((row: PatientModel) => void)"}}}}}catch{}const Ce={component:b,tags:["autodocs"],args:{},decorators:[(e,{args:t})=>a.createElement(G,{env:"dev",authToken:Z,builderId:X},a.createElement(ee,{patientID:te,systemURL:ae},a.createElement(e,{args:t})))]},f={...se()};var T,H,I;f.parameters={...f.parameters,docs:{...(T=f.parameters)==null?void 0:T.docs,source:{originalSource:`{
  ...setupPatientHistoryMocks()
}`,...(I=(H=f.parameters)==null?void 0:H.docs)==null?void 0:I.source}}};const De=["Basic"];export{f as Basic,De as __namedExportsOrder,Ce as default};

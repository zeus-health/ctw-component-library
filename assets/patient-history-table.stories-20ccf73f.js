var I=Object.defineProperty;var N=(t,e,r)=>e in t?I(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var u=(t,e,r)=>(N(t,typeof e!="symbol"?e+"":e,r),r);import{r as c,R as a}from"./index-6f814c40.js";import{c as _}from"./index-74f03c09.js";import{g as T,h as H,u as S,i as b,j as R,T as k,Q as M,w as C,k as x,H as D,l as A,m as q,C as B,a as V,S as L}from"./patient-allergies-52f5b6fc.js";import"./_baseForOwn-10376b4b.js";import"./_baseIsEqual-a4ed7fae.js";import"./_baseClone-72ef38a3.js";import{c as U}from"./action-list-471edd10.js";import"./sortBy-eef2ec28.js";import{T as F}from"./table-82fc3d88.js";import{u as W}from"./uniq-512c0c4d.js";import"./_createSet-e03e7f83.js";import"./request-02bc8afe.js";import"./drawer-86b55368.js";import"./spinner-66aa4ba7.js";import{s as Y}from"./requests-60702e4a.js";import"./_commonjsHelpers-042e6b4d.js";import"./extends-8de4c56c.js";import"./_basePickBy-8e839ef7.js";import"./toNumber-54b1e0c0.js";import"./index-b03e455b.js";import"./mapValues-0be0e26b.js";import"./index-6de6b113.js";import"./debounce-e90b6304.js";import"./data-list-254aa0b0.js";import"./isPlainObject-832b1a67.js";import"./index-135b3e83.js";class Q{constructor(e,r){u(this,"kind","PatientHistory");u(this,"historyInfo");u(this,"patient");this.patient=e,this.historyInfo=r}get messages(){var e;return(e=this.historyInfo)==null?void 0:e._messages}get key(){var e;return((e=this.historyInfo)==null?void 0:e.uuid)||""}get lastRetrievedAt(){var e;return T((e=this.historyInfo)==null?void 0:e._lastUpdated)}get createdAt(){var e;return H((e=this.historyInfo)==null?void 0:e._createdAt,"MM/dd/yy HH:mm")}get retrievedStatus(){var e;return(e=this.historyInfo)==null?void 0:e.status}}function $(t,e){return S(M,[t,e],async r=>{try{const s=await b(r),o=e*t,f=o+t,l=s.data.slice(o,f),m=W(U(l.map(i=>i.initialData.patientId))),d=(await R(r,void 0,m)).patients.map(i=>{const p=l.filter(n=>n.initialData.patientId===i.id);return new Q(i,p[0])});return{total:s.data.length,patients:d}}catch(s){throw k.logError(s,"Failed fetching patient history patients."),new Error(`Failed fetching patient history patients: ${s}`)}})}const E=C(({className:t,handleRowClick:e,pageSize:r=20,title:s="Patient History Request"})=>{const[o,f]=c.useState(1),[l,m]=c.useState(0),[g,d]=c.useState([]),{data:{patients:i,total:p}={},isFetching:n,isError:h}=$(r,o-1);return c.useEffect(()=>{!n&&i&&(m(p??0),d(i))},[i,p,h,n]),c.useEffect(()=>{h&&(m(0),d([]))},[h,n]),a.createElement(x,{className:_("ctw-patients-table",t),"data-zus-telemetry-namespace":"PatientsTable"},a.createElement(D,{title:s},a.createElement("div",{className:"ctw-relative"},a.createElement("div",{className:"ctw-search-icon-wrapper"},a.createElement(A,{className:"ctw-search-icon"})),a.createElement("input",{type:"text",className:"ctw-patients-table-search",placeholder:"Search",name:"searchPatientName"}))),a.createElement("div",{className:"ctw-overflow-hidden"},a.createElement(F,{records:g,columns:O,pageSize:r,handleRowClick:e,hidePagination:!0},a.createElement(q,{setCurrentPage:f,total:l,currentPage:o,pageSize:r,isLoading:n}))))},"PatientsHistoryTable"),O=[{title:"Name",render:t=>a.createElement(j,{data:t})},{title:"Initiated",render:t=>a.createElement("div",null,t.createdAt)},{title:"Status",render:t=>{var e;return a.createElement(a.Fragment,null,(e=t.messages)==null?void 0:e.map(r=>{var s;return a.createElement("div",{className:"ctw-status-column",key:`${(s=t.historyInfo)==null?void 0:s.uuid}-${r.service}`},a.createElement("div",{className:"ctw-capitalize"},r.service),a.createElement("div",null,"-"),a.createElement("div",null,r.status))}))}}],j=({data:t})=>a.createElement("div",{className:"ctw-flex ctw-items-center"},a.createElement("div",{className:"ctw-ml-4"},a.createElement("div",{className:"ctw-flex ctw-font-medium"},a.createElement("div",{className:"ctw-max-w-xs"},t.patient.fullName),t.patient.resource.gender&&a.createElement("div",{className:"ctw-uppercase"},"(",t.patient.resource.gender[0],")")),a.createElement("div",{className:"ctw-text-content-lighter"},t.patient.dob," (",t.patient.age,")")));try{E.displayName="PatientHistoryTable",E.__docgenInfo={description:"",displayName:"PatientHistoryTable",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"Argument"}},handleRowClick:{defaultValue:null,description:"",name:"handleRowClick",required:!1,type:{name:"((row: PatientHistorytModel) => void)"}},pageSize:{defaultValue:null,description:"",name:"pageSize",required:!1,type:{name:"number"}},title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}},getRowClasses:{defaultValue:null,description:"",name:"getRowClasses",required:!1,type:{name:"((row: PatientModel) => Argument)"}},onRowClick:{defaultValue:null,description:"",name:"onRowClick",required:!1,type:{name:"((row: PatientModel) => void)"}}}}}catch{}const ve={component:E,tags:["autodocs"],args:{},decorators:[(t,{args:e})=>a.createElement(B,{env:"dev",authToken:"dummy-token",builderId:"b123"},a.createElement(V,{patientID:"u12345",systemURL:L},a.createElement(t,{args:e})))]},y={...Y()};var w,P,v;y.parameters={...y.parameters,docs:{...(w=y.parameters)==null?void 0:w.docs,source:{originalSource:`{
  ...setupPatientHistoryMocks()
}`,...(v=(P=y.parameters)==null?void 0:P.docs)==null?void 0:v.source}}};const Ie=["Basic"];export{y as Basic,Ie as __namedExportsOrder,ve as default};

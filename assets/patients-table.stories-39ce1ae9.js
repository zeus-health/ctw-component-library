import{r as n,R as e}from"./index-6f814c40.js";import{s as x}from"./requests-1b612420.js";import{c as T}from"./index-74f03c09.js";import{w as S,S as k,H as M}from"./error-boundary-a8316818.js";import{L as I}from"./loading-c7ff698a.js";import"./_baseToString-ba0098b0.js";import"./_equalByTag-3aa7c076.js";import"./_baseClone-7982cf45.js";import"./sortBy-8d97dd92.js";import"./_baseForOwn-2ea4fe61.js";import"./mergeWith-9910f455.js";import{u as V}from"./uniq-f1be3f26.js";import"./_createSet-3c80ad01.js";import{aO as q,aR as L,aQ as z,C as F}from"./patient-helper-9ca0101c.js";import{T as B}from"./table-6b14d129.js";import{d as O}from"./debounce-d7732be0.js";import"./_commonjsHelpers-042e6b4d.js";import"./request-5a1df4c1.js";import"./faker-8193e1fd.js";import"./values-e0b170db.js";import"./_basePickBy-fdc7faa6.js";import"./_baseIsEqual-4b283a92.js";import"./mapValues-a575304c.js";import"./isPlainObject-a68f056e.js";import"./use-breakpoints-8921c18b.js";import"./getPrototypeOf-5db963cb.js";import"./spinner-66aa4ba7.js";import"./toNumber-e7174cd4.js";import"./_commonjs-dynamic-modules-302442b1.js";function j(t,a){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",ref:a},t),n.createElement("path",{fillRule:"evenodd",d:"M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",clipRule:"evenodd"}))}const A=n.forwardRef(j),$=A;function W(t,a){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",ref:a},t),n.createElement("path",{fillRule:"evenodd",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",clipRule:"evenodd"}))}const H=n.forwardRef(W),Q=H;function K(t,a){return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",ref:a},t),n.createElement("path",{fillRule:"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",clipRule:"evenodd"}))}const U=n.forwardRef(K),Y=U;const b=({currentPage:t,isLoading:a=!1,pageSize:r,setCurrentPage:c,total:l})=>{const o=Math.min(l,(t-1)*r+1),u=Math.min(t*r,l),i=Math.ceil(l/r),E=Math.max(t-1,1),w=Math.min(t+1,i);let m=[1,i];return m.push(t-1,t,t+1),m=V(m.sort((s,d)=>s-d).filter(s=>s>=1&&s<=i)),e.createElement("div",{className:"ctw-flex ctw-justify-between ctw-py-3 ctw-px-6","data-zus-telemetry-namespace":"Pagination"},e.createElement("div",{className:"ctw-text-gray-600 ctw-text-sm"},a?e.createElement(I,null):e.createElement(e.Fragment,null,e.createElement("span",{className:"ctw-font-medium"},o)," to"," ",e.createElement("span",{className:"ctw-font-medium"},u)," of"," ",e.createElement("span",{className:"ctw-font-medium"},l)," results")),i>1&&e.createElement("div",null,e.createElement("nav",{className:"ctw-pagination-nav","aria-label":"Pagination"},e.createElement(g,{page:E,setCurrentPage:c,className:"ctw-pagination-group-start ctw-hover:ctw-bg-gray-50",disabled:t===1},e.createElement("span",{className:"ctw-sr-only"},"Previous"),e.createElement($,{className:"ctw-h-5 ctw-w-5","aria-hidden":"true"})),m.map((s,d)=>{const f=m[d-1]??0,p=s-f-1;return e.createElement(n.Fragment,{key:s},p>1&&e.createElement("span",{className:"ctw-pagination-ellipsis"},"..."),p===1&&e.createElement(g,{page:s-1,setCurrentPage:c,currentPage:t}),e.createElement(g,{setCurrentPage:c,page:s,currentPage:t}))}),e.createElement(g,{page:w,setCurrentPage:c,className:"ctw-pagination-group-end",disabled:t===i},e.createElement("span",{className:"ctw-sr-only"},"Next"),e.createElement(Q,{className:"ctw-h-5 ctw-w-5","aria-hidden":"true"})))))},g=({setCurrentPage:t,page:a,currentPage:r,children:c,className:l,disabled:o=!1})=>{const u=a===r;return e.createElement("button",{type:"button",disabled:o,onClick:()=>t(a),className:T(l,"ctw-pagination-page-btn",{active:u,disabled:o}),"data-zus-telemetry-click":"paginate"},c||a)};try{b.displayName="Pagination",b.__docgenInfo={description:"",displayName:"Pagination",props:{currentPage:{defaultValue:null,description:"",name:"currentPage",required:!0,type:{name:"number"}},isLoading:{defaultValue:{value:"false"},description:"",name:"isLoading",required:!1,type:{name:"boolean"}},pageSize:{defaultValue:null,description:"",name:"pageSize",required:!0,type:{name:"number"}},setCurrentPage:{defaultValue:null,description:"",name:"setCurrentPage",required:!0,type:{name:"(n: number) => void"}},total:{defaultValue:null,description:"",name:"total",required:!0,type:{name:"number"}}}}}catch{}function D(t,a,r){return q(z,[t,a,r],L)}const y=S(({className:t,handleRowClick:a,pageSize:r=5,title:c="Patients"})=>{const[l,o]=n.useState(1),[u,i]=n.useState(0),[E,w]=n.useState([]),[m,s]=n.useState(),{data:{patients:d,total:f}={},isFetching:p,isError:v}=D(r,l-1,m),P=n.useCallback(O(N=>{s(N),o(1),i(0),w([])},100),[]);return n.useEffect(()=>{!p&&d&&(i(f??0),w(d))},[d,f,v,p]),n.useEffect(()=>{v&&(i(0),w([]))},[v,p]),e.createElement(k,{className:T("ctw-patients-table",t),"data-zus-telemetry-namespace":"PatientsTable"},e.createElement(M,{title:c},e.createElement("div",{className:"ctw-relative"},e.createElement("div",{className:"ctw-search-icon-wrapper"},e.createElement(Y,{className:"ctw-search-icon"})),e.createElement("input",{type:"text",className:"ctw-patients-table-search",placeholder:"Search",name:"searchPatientName",onChange:N=>P(N.currentTarget.value)}))),e.createElement("div",{className:"ctw-overflow-hidden"},e.createElement(B,{records:E,columns:G,handleRowClick:a,pageSize:r,hidePagination:!0},e.createElement(b,{setCurrentPage:o,total:u,currentPage:l,pageSize:r,isLoading:p}))))},"PatientsTable"),G=[{title:"Name",render:t=>e.createElement(J,{patient:t})},{title:"Contact",render:({email:t,phoneNumber:a})=>e.createElement(e.Fragment,null,e.createElement("div",{className:"ctw-patients-table-email"},t),e.createElement("div",{className:"ctw-patients-table-phone"},a))}],J=({patient:t})=>e.createElement("div",{className:"ctw-flex ctw-items-center"},e.createElement("div",{className:"ctw-ml-4"},e.createElement("div",{className:"ctw-flex ctw-font-medium"},e.createElement("div",{className:"ctw-max-w-xs"},t.fullName),t.gender&&e.createElement("div",{className:"ctw-uppercase"}," (",t.gender[0],")")),e.createElement("div",{className:"ctw-text-content-lighter"},t.dob," (",t.age,")")));try{y.displayName="PatientsTable",y.__docgenInfo={description:"PatientsTable displays a paginated list of all patients for a builder. In\naddition to having configurable page size, lazy loading and name search, the\ncomponent accepts an `onRowClick` prop so developers can add their own\nlogic when a row is clicked. The `onRowClick` receives the targeted\n`PatientModel` as its sole argument, which contains the underlying FHIR\nobject as `.resource`.",displayName:"PatientsTable",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"Argument"}},handleRowClick:{defaultValue:null,description:"",name:"handleRowClick",required:!0,type:{name:"(row: PatientModel) => void"}},pageSize:{defaultValue:null,description:"",name:"pageSize",required:!1,type:{name:"number"}},title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"string"}},getRowClasses:{defaultValue:null,description:"",name:"getRowClasses",required:!1,type:{name:"((row: PatientModel) => Argument)"}},onRowClick:{defaultValue:null,description:"",name:"onRowClick",required:!1,type:{name:"((row: PatientModel) => void)"}}}}}catch{}const X=17,xe={tags:["autodocs"],component:y,decorators:[(t,{args:a})=>e.createElement(F,{env:"dev",authToken:"ey.12345",builderId:"12345"},e.createElement(t,{args:a}))],...x(X)},h={};var R,C,_;h.parameters={...h.parameters,docs:{...(R=h.parameters)==null?void 0:R.docs,source:{originalSource:"{}",...(_=(C=h.parameters)==null?void 0:C.docs)==null?void 0:_.source}}};const Se=["Basic"];export{h as Basic,Se as __namedExportsOrder,xe as default};

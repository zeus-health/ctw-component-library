import{r as n,R as e}from"./index-6f814c40.js";import{w as S,Z as v,j as y,L as x,k as b,m as N,Q as _,C}from"./patient-allergies-50ce6815.js";import{s as P}from"./requests-76e9debc.js";import"./_commonjsHelpers-042e6b4d.js";import"./request-56e719e0.js";import"./index-74f03c09.js";import"./_baseToString-ba0098b0.js";import"./_equalByTag-3aa7c076.js";import"./table-76348145.js";import"./spinner-66aa4ba7.js";import"./sortBy-d0c06176.js";import"./_baseForOwn-d5bf979e.js";import"./_baseIsEqual-4b283a92.js";import"./_baseClone-0bdbe065.js";import"./_createSet-823d7c6f.js";import"./toNumber-711c0fc1.js";import"./isPlainObject-7e0f34c5.js";import"./action-list-147315c2.js";import"./_basePickBy-f94c0374.js";import"./mapValues-80a5786c.js";import"./uniq-1e65cdac.js";import"./drawer-5742d187.js";import"./index-6de6b113.js";import"./_commonjs-dynamic-modules-302442b1.js";import"./extends-41c9b0e2.js";import"./isEqual-38ff4822.js";import"./data-list-254aa0b0.js";import"./isString-b8ede3fb.js";import"./debounce-0d3e7ec9.js";function T(t,a,c){return b(_,[t,a,c],N,!!c)}const p=S(({pageSize:t=250,removeBranding:a=!1,onSearchClick:c})=>{const[w,l]=n.useState([]),[E,h]=n.useState(),{data:{patients:i,total:g}={},isFetching:s,isError:m}=T(t,0,E);return n.useEffect(()=>{!s&&i&&l(i)},[i,g,m,s]),n.useEffect(()=>{m&&l([])},[m,s]),e.createElement("div",{className:"ctw-max-w-3xl ctw-space-y-5 ctw-text-center"},e.createElement("h3",{className:"ctw-my-0"},"Search for a Patient"),!a&&e.createElement("span",{className:"ctw-block ctw-space-x-2 ctw-text-sm ctw-font-light ctw-italic ctw-text-content-light"},e.createElement("span",null,"Powered by"),e.createElement("img",{src:v,alt:"Zus",className:"-ctw-mb-1.5"})),e.createElement(y,{enableSearchIcon:!0,options:w.map(r=>({value:r,label:r.fullName,key:r.id})),readonly:!1,isLoading:s,name:"patient-search",defaultSearchTerm:"",onCustomSelectChange:c,renderCustomOption:r=>e.createElement(k,{option:r}),onSearchChange:r=>{h(r),l([])},defaultValue:{}}))},"PatientsSearch"),k=({option:t})=>e.createElement(x.Option,{value:t.label,className:({active:a})=>`ctw-relative ctw-flex ctw-cursor-default ctw-select-none ctw-space-x-2 ctw-py-2 ctw-pr-4 ctw-pl-4 ${a?"ctw-bg-primary-light ctw-text-primary-dark":"ctw-text-content-black"}`},e.createElement("div",{className:"ctw-space-x-1"},e.createElement("span",{className:"ctw-font-medium"},t.value.fullName),e.createElement("span",{className:"ctw-font-medium"},t.value.gender&&`(${t.value.gender[0].toUpperCase()})`)),e.createElement("div",{className:"ctw-font-medium"},t.value.officialOrUsualIdentifier),e.createElement("div",{className:"ctw-space-x-1"},e.createElement("span",null,t.value.dob),e.createElement("span",null,t.value.age&&`(${t.value.age})`)));try{p.displayName="PatientSearch",p.__docgenInfo={description:"",displayName:"PatientSearch",props:{pageSize:{defaultValue:null,description:"",name:"pageSize",required:!1,type:{name:"number"}},removeBranding:{defaultValue:null,description:"",name:"removeBranding",required:!1,type:{name:"boolean"}},onSearchClick:{defaultValue:null,description:"",name:"onSearchClick",required:!1,type:{name:"((e: unknown) => void)"}}}}}catch{}const B=17,ne={tags:["autodocs"],component:p,decorators:[(t,{args:a})=>e.createElement(C,{env:"dev",authToken:"ey.12345",builderId:"12345"},e.createElement(t,{args:a}))],...P(B)},o={};var u,d,f;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:"{}",...(f=(d=o.parameters)==null?void 0:d.docs)==null?void 0:f.source}}};const oe=["Basic"];export{o as Basic,oe as __namedExportsOrder,ne as default};

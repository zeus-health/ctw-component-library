import{r as d,d as e}from"./index.68c597bb.js";import{c as g}from"./index.d3b8680b.js";import{u as S,c as P,g as A,d as O,e as N,T,D as R,f as b,B as k,h as I,i as H,j as L,k as B,a as F,P as D,S as j}from"./index.8fc91b8e.js";import{l as p,T as V}from"./table.1dcd0a23.js";import"./action-list.dbde1bfa.js";import{s as W,o as q,p as Y}from"./requests.072fa45f.js";import"./iframe.70e42b1e.js";import"./index.899a5313.js";import"./drawer.676ac87e.js";import"./index.e2186c3d.js";import"./spinner.209a3b7d.js";import"./extends.946277fc.js";import"./data-list.276f63d1.js";function K(t,n){return d.exports.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2,stroke:"currentColor","aria-hidden":"true",ref:n},t),d.exports.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4v16m8-8H4"}))}const M=d.exports.forwardRef(K),U=M;function C({hideAdd:t,onToggleShowHistoric:n}){var u,l;const s=(l=(u=S().data)==null?void 0:u.id)!=null?l:"",[a,i]=d.exports.useState(!1),c=new P(A(s)),r=O({condition:c}),m=p.exports.curry(N)(c,s);return e.createElement("div",{className:"ctw-flex ctw-items-center ctw-justify-end ctw-space-x-2 ctw-border-0 ctw-border-t ctw-border-solid ctw-border-divider-light ctw-py-5 ctw-px-4"},e.createElement(T,{name:"historic",text:"Show Historic",onChange:n}),!t&&e.createElement("button",{type:"button",className:"ctw-btn-icon",onClick:()=>i(!0)},e.createElement(U,{className:"ctw-h-4 ctw-w-4"})),e.createElement(R,{title:"Add Condition",action:m,data:r,schema:b,isOpen:a,onClose:()=>i(!1)}))}try{C.displayName="PatientConditionsActions",C.__docgenInfo={description:"",displayName:"PatientConditionsActions",props:{hideAdd:{defaultValue:null,description:"",name:"hideAdd",required:!0,type:{name:"boolean"}},onToggleShowHistoric:{defaultValue:null,description:"",name:"onToggleShowHistoric",required:!0,type:{name:"() => void"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/components/content/conditions/patient-conditions-actions.tsx#PatientConditionsActions"]={docgenInfo:C.__docgenInfo,name:"PatientConditionsActions",path:"src/components/content/conditions/patient-conditions-actions.tsx#PatientConditionsActions"})}catch{}function $(t){switch(t){case"Active":return"ctw-text-success-main";case"Pending":return"ctw-text-caution-main";default:return"ctw-text-content-lighter"}}const Q=[{widthPercent:30,minWidth:320,render:t=>e.createElement("div",null,e.createElement("div",{className:"ctw-pc-title"},t.display),e.createElement("div",{className:"ctw-pc-chapter"},t.ccsChapter))},{render:t=>{var n,o;return e.createElement("div",{className:"ctw-pc-status-container"},e.createElement("div",{className:g("ctw-pc-status-dot",$(t.status))},"\u2022"),e.createElement("div",{className:"ctw-pc-status-and-extra"},e.createElement("div",{className:"ctw-pc-status"},t.status),t.isSummaryResource?e.createElement("div",null,p.exports.compact([(o=(n=t.patient)==null?void 0:n.organization)==null?void 0:o.name,t.recordedDate]).join(" ")):e.createElement("div",null,p.exports.compact([t.recorder,t.recordedDate]).join(" "))))},widthPercent:30,minWidth:128},{widthPercent:30,minWidth:132,render:t=>{const n=t.isSummaryResource?"Earliest known onset:":"Onset:";return e.createElement("div",{className:"ctw-pc-onset-notes"},t.onset&&e.createElement("div",null,n," ",t.onset),e.createElement("div",{className:"ctw-pc-notes"},t.notes.join(" ")))}}];function z(){const[t,n]=d.exports.useState({collection:"patient",showHistoric:!1});function o(a){n(p.exports.merge(p.exports.cloneDeep(t),a))}function s(a,i){return(t.collection==="patient"?a:i).filter(r=>t.showHistoric?!0:["Active","Pending"].includes(r.status))}return{filters:t,updateFilters:o,applyFilters:s}}function f({collection:t,otherConditions:n,onCollectionChange:o}){function s(i){return t===i?"ctw-btn-primary":"ctw-btn-default"}const a=n.filter(i=>i.status==="Active").length;return e.createElement("div",{className:"ctw-flex ctw-items-center ctw-justify-between ctw-py-5 ctw-px-4"},e.createElement("div",{className:"ctw-text-xl ctw-font-medium ctw-text-content-black"},"Conditions"),e.createElement("div",{className:"ctw-space-x-2"},e.createElement("button",{type:"button",className:s("patient"),onClick:()=>o("patient")},"Patient Record"),e.createElement("button",{type:"button",className:g(s("other"),"ctw-space-x-2"),onClick:()=>o("other")},e.createElement("span",null,"Other Provider Records"),e.createElement(k,{text:`${a}`,color:"gray"}))))}try{f.displayName="PatientConditionsHeader",f.__docgenInfo={description:"",displayName:"PatientConditionsHeader",props:{collection:{defaultValue:null,description:"",name:"collection",required:!0,type:{name:"enum",value:[{value:'"patient"'},{value:'"other"'}]}},otherConditions:{defaultValue:null,description:"",name:"otherConditions",required:!0,type:{name:"ConditionModel[]"}},onCollectionChange:{defaultValue:null,description:"",name:"onCollectionChange",required:!0,type:{name:"(collection: FilterCollection) => void"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/components/content/conditions/patient-conditions-header.tsx#PatientConditionsHeader"]={docgenInfo:f.__docgenInfo,name:"PatientConditionsHeader",path:"src/components/content/conditions/patient-conditions-header.tsx#PatientConditionsHeader"})}catch{}function h({className:t,readOnly:n=!1}){var _,x;const{filters:o,updateFilters:s,applyFilters:a}=z(),i=d.exports.useRef(null),c=I(i),r=H(),m=L();function u(){const w=r.isLoading,v=w||m.isLoading;return o.collection==="patient"?w:v}const l=(_=r.data)!=null?_:[],E=B((x=m.data)!=null?x:[],l,!0),y=a(l,E);return e.createElement("div",{ref:i,className:g("ctw-patient-conditions",t,{"ctw-patient-conditions-stacked":c.sm})},e.createElement(f,{otherConditions:E,collection:o.collection,onCollectionChange:w=>s({collection:w})}),e.createElement(C,{hideAdd:n||o.collection==="other",onToggleShowHistoric:()=>s({showHistoric:!o.showHistoric})}),e.createElement(V,{stacked:c.sm,className:"-ctw-mx-px !ctw-rounded-none",showTableHead:!1,isLoading:u(),records:y,columns:Q}))}try{h.displayName="PatientConditions",h.__docgenInfo={description:"",displayName:"PatientConditions",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},readOnly:{defaultValue:{value:"false"},description:"",name:"readOnly",required:!1,type:{name:"boolean"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/components/content/conditions/patient-conditions.tsx#PatientConditions"]={docgenInfo:h.__docgenInfo,name:"PatientConditions",path:"src/components/content/conditions/patient-conditions.tsx#PatientConditions"})}catch{}const dt={component:h,tags:["docsPage"],argTypes:{className:{options:["Blank","Fixed Width"],control:"select",mapping:{Blank:"","Fixed Width":"ctw-m-auto ctw-max-w-[600px]"}}},args:{className:"Blank",readOnly:!1},decorators:[(t,{args:n})=>e.createElement(F,{env:"dev",authToken:"dummy-token",builderId:"b123"},e.createElement(D,{patientID:"u12345",systemURL:j},e.createElement(t,{args:n})))]},lt={...W({otherConditions:q,patientConditions:Y})},pt=["Basic"];export{lt as Basic,pt as __namedExportsOrder,dt as default};
//# sourceMappingURL=patient-conditions.stories.913e0c53.js.map

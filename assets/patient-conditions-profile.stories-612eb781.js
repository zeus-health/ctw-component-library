import{R as s}from"./index-6f814c40.js";import{Z as h,C as g,F as R,a as S,b as I,c as k,S as B}from"./patient-allergies-b8267ddd.js";import{e as p}from"./empty-conditions-251825cc.js";import{o as P,p as E}from"./patient-conditions-00afc569.js";import{s as a}from"./requests-0ed9d861.js";import"./_commonjsHelpers-042e6b4d.js";import"./index-74f03c09.js";import"./_baseForOwn-f2991899.js";import"./_baseIsEqual-e6235ae7.js";import"./uniqWith-846ba535.js";import"./_baseClone-02b81a46.js";import"./_baseUniq-b2927ba5.js";import"./toNumber-3f2b4a49.js";import"./table-a290eba5.js";import"./spinner-1fa7ac76.js";import"./isEqual-34296d4e.js";import"./isPlainObject-2a353d7d.js";import"./action-list-c9cb7f1b.js";import"./_basePickBy-43a8adfd.js";import"./mapValues-209dc39b.js";import"./uniq-a8ac11c1.js";import"./request-a5123b8d.js";import"./index-135b3e83.js";import"./extends-10da0781.js";import"./index-5c03ae20.js";import"./drawer-3e903764.js";import"./index-6de6b113.js";import"./debounce-6e9e34d3.js";import"./data-list-254aa0b0.js";import"./basic-ede0bac8.js";import"./v4-a960c1f4.js";import"./requests-7f092f0c.js";import"./types-6e67dc97.js";const n=({hideRequestRecords:o,readOnly:t})=>s.createElement(h,{hideTitle:!0,resources:["conditions","conditions-outside"],conditionsProps:{readOnly:t},conditionsOutsideProps:{hideRequestRecords:o,readOnly:t}});try{n.displayName="PatientConditionsProfile",n.__docgenInfo={description:"",displayName:"PatientConditionsProfile",props:{hideRequestRecords:{defaultValue:null,description:"",name:"hideRequestRecords",required:!1,type:{name:"boolean"}},readOnly:{defaultValue:null,description:"",name:"readOnly",required:!1,type:{name:"boolean"}}}}}catch{}const no={component:n,tags:["autodocs"],argTypes:{className:{options:["Blank","Fixed Width"],control:"select",mapping:{Blank:"","Fixed Width":"ctw-m-auto ctw-max-w-[600px]"}}},args:{className:"Blank",readOnly:!1,hideRequestRecords:!1},decorators:[(o,{args:t})=>s.createElement(g,{env:"dev",authToken:R,builderId:S},s.createElement(I,{patientID:k,systemURL:B},s.createElement(o,{args:t})))]},e={...a({otherConditions:P,patientConditions:E})},i={...a({otherConditions:P,patientConditions:E})},r={...a({otherConditions:p,patientConditions:p})};var m,d,c;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  ...setupConditionMocks({
    otherConditions,
    patientConditions
  })
}`,...(c=(d=e.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var l,u,C;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`{
  ...setupConditionMocks({
    otherConditions,
    patientConditions
  })
}`,...(C=(u=i.parameters)==null?void 0:u.docs)==null?void 0:C.source}}};var _,f,y;r.parameters={...r.parameters,docs:{...(_=r.parameters)==null?void 0:_.docs,source:{originalSource:`{
  ...setupConditionMocks({
    otherConditions: emptyConditions,
    patientConditions: emptyConditions
  })
}`,...(y=(f=r.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};const ao=["Basic","BasicFQS","Empty"];export{e as Basic,i as BasicFQS,r as Empty,ao as __namedExportsOrder,no as default};

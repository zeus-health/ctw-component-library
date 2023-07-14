import{R as s}from"./index-6f814c40.js";import{Z as h,C as g,F as R,a as S,b as I,c as k,S as B}from"./patient-allergies-ec45532a.js";import{e as p}from"./empty-conditions-251825cc.js";import{o as P,p as E}from"./patient-conditions-c069c444.js";import{s as a}from"./requests-7f9f8cbb.js";import"./_commonjsHelpers-042e6b4d.js";import"./index-74f03c09.js";import"./request-a5123b8d.js";import"./index-135b3e83.js";import"./extends-ed7e75b0.js";import"./_baseForOwn-6ce43847.js";import"./_baseIsEqual-2f71925b.js";import"./_basePickBy-a6d7916f.js";import"./_baseClone-7e8cfb08.js";import"./uniqWith-7e1673ff.js";import"./_baseUniq-44d20e17.js";import"./toNumber-6e4e7434.js";import"./table-1111a513.js";import"./spinner-1fa7ac76.js";import"./isEqual-dc54df64.js";import"./isPlainObject-f4e3af75.js";import"./action-list-9f938675.js";import"./mapValues-dc8f3697.js";import"./uniq-ef9e811e.js";import"./index-d206d595.js";import"./drawer-3e903764.js";import"./index-6de6b113.js";import"./debounce-5d5a9f7a.js";import"./data-list-254aa0b0.js";import"./basic-529eda25.js";import"./v4-a960c1f4.js";import"./requests-7f092f0c.js";import"./types-6e67dc97.js";const n=({hideRequestRecords:o,readOnly:t})=>s.createElement(h,{hideTitle:!0,resources:["conditions","conditions-outside"],conditionsProps:{readOnly:t},conditionsOutsideProps:{hideRequestRecords:o,readOnly:t}});try{n.displayName="PatientConditionsProfile",n.__docgenInfo={description:"",displayName:"PatientConditionsProfile",props:{hideRequestRecords:{defaultValue:null,description:"",name:"hideRequestRecords",required:!1,type:{name:"boolean"}},readOnly:{defaultValue:null,description:"",name:"readOnly",required:!1,type:{name:"boolean"}}}}}catch{}const no={component:n,tags:["autodocs"],argTypes:{className:{options:["Blank","Fixed Width"],control:"select",mapping:{Blank:"","Fixed Width":"ctw-m-auto ctw-max-w-[600px]"}}},args:{className:"Blank",readOnly:!1,hideRequestRecords:!1},decorators:[(o,{args:t})=>s.createElement(g,{env:"dev",authToken:R,builderId:S},s.createElement(I,{patientID:k,systemURL:B},s.createElement(o,{args:t})))]},e={...a({otherConditions:P,patientConditions:E})},i={...a({otherConditions:P,patientConditions:E})},r={...a({otherConditions:p,patientConditions:p})};var m,d,c;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
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

import{R as s}from"./index-9f32f44c.js";import{Z as h,C as g,F as R,a as S,b as I,c as k,S as B}from"./patient-allergies-d54ef7fc.js";import{e as p}from"./empty-conditions-251825cc.js";import{o as P,p as E}from"./patient-conditions-379473c6.js";import{s as a}from"./requests-371cdc04.js";import"./_commonjsHelpers-de833af9.js";import"./index-a587463d.js";import"./mapValues-48ee742b.js";import"./action-list-7b71a245.js";import"./uniq-bb48e037.js";import"./toNumber-b496ba6b.js";import"./isPlainObject-304926b1.js";import"./request-bddbdd10.js";import"./extends-5fd370ae.js";import"./index-7761d762.js";import"./index-9c2d1831.js";import"./spinner-096fc82a.js";import"./debounce-c1872aec.js";import"./data-list-2854f463.js";import"./index-30042f7c.js";import"./basic-95e4dba4.js";import"./v4-a960c1f4.js";import"./requests-80da4af5.js";import"./types-6e67dc97.js";const n=({hideRequestRecords:o,readOnly:e})=>s.createElement(h,{hideTitle:!0,resources:["conditions","conditions-outside"],conditionsProps:{readOnly:e},conditionsOutsideProps:{hideRequestRecords:o,readOnly:e}});try{n.displayName="PatientConditionsProfile",n.__docgenInfo={description:"",displayName:"PatientConditionsProfile",props:{hideRequestRecords:{defaultValue:null,description:"",name:"hideRequestRecords",required:!1,type:{name:"boolean"}},readOnly:{defaultValue:null,description:"",name:"readOnly",required:!1,type:{name:"boolean"}}}}}catch{}const J={component:n,tags:["autodocs"],argTypes:{className:{options:["Blank","Fixed Width"],control:"select",mapping:{Blank:"","Fixed Width":"ctw-m-auto ctw-max-w-[600px]"}}},args:{className:"Blank",readOnly:!1,hideRequestRecords:!1},decorators:[(o,{args:e})=>s.createElement(g,{env:"dev",authToken:R,builderId:S},s.createElement(I,{patientID:k,systemURL:B},s.createElement(o,{args:e})))]},t={...a({otherConditions:P,patientConditions:E})},i={...a({otherConditions:P,patientConditions:E})},r={...a({otherConditions:p,patientConditions:p})};var d,c,m;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  ...setupConditionMocks({
    otherConditions,
    patientConditions
  })
}`,...(m=(c=t.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var l,u,C;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`{
  ...setupConditionMocks({
    otherConditions,
    patientConditions
  })
}`,...(C=(u=i.parameters)==null?void 0:u.docs)==null?void 0:C.source}}};var _,f,y;r.parameters={...r.parameters,docs:{...(_=r.parameters)==null?void 0:_.docs,source:{originalSource:`{
  ...setupConditionMocks({
    otherConditions: emptyConditions,
    patientConditions: emptyConditions
  })
}`,...(y=(f=r.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};const X=["Basic","BasicFQS","Empty"];export{t as Basic,i as BasicFQS,r as Empty,X as __namedExportsOrder,J as default};
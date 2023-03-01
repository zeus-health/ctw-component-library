import{R as e}from"./index-6f814c40.js";import{c as u,C,a as y,S as h}from"./patient-allergies-92685dd1.js";import{s as d,o as k,p as E}from"./requests-039d7910.js";import"./_commonjsHelpers-042e6b4d.js";import"./request-8b58a0d5.js";import"./index-74f03c09.js";import"./_baseToString-ba0098b0.js";import"./_equalByTag-3aa7c076.js";import"./table-76348145.js";import"./spinner-66aa4ba7.js";import"./sortBy-d0c06176.js";import"./_baseForOwn-d5bf979e.js";import"./_baseIsEqual-4b283a92.js";import"./_baseClone-0bdbe065.js";import"./_createSet-823d7c6f.js";import"./toNumber-711c0fc1.js";import"./isPlainObject-7e0f34c5.js";import"./action-list-147315c2.js";import"./_basePickBy-f94c0374.js";import"./mapValues-80a5786c.js";import"./uniq-1e65cdac.js";import"./drawer-74d79233.js";import"./index-6de6b113.js";import"./_commonjs-dynamic-modules-302442b1.js";import"./extends-41c9b0e2.js";import"./isEqual-38ff4822.js";import"./data-list-254aa0b0.js";import"./isString-b8ede3fb.js";import"./debounce-0d3e7ec9.js";import"./requests-d6e9eecf.js";const i={resourceType:"Bundle",id:"eacb4f45-4e83-45db-9114-7d3e05eb1fb3",meta:{lastUpdated:"2022-11-16T15:13:00.795+00:00"},type:"searchset",total:0,entry:[]},J={component:u,tags:["autodocs"],argTypes:{className:{options:["Blank","Fixed Width"],control:"select",mapping:{Blank:"","Fixed Width":"ctw-m-auto ctw-max-w-[600px]"}}},args:{className:"Blank",readOnly:!1},decorators:[(c,{args:l})=>e.createElement(C,{env:"dev",authToken:"dummy-token",builderId:"b123"},e.createElement(y,{patientID:"u12345",systemURL:h},e.createElement(c,{args:l})))]},t={...d({otherConditions:k,patientConditions:E})},o={...d({otherConditions:i,patientConditions:i})};var r,n,s;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`{
  ...setupConditionMocks({
    otherConditions,
    patientConditions
  })
}`,...(s=(n=t.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};var a,p,m;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`{
  ...setupConditionMocks({
    otherConditions: emptyConditions,
    patientConditions: emptyConditions
  })
}`,...(m=(p=o.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const K=["Basic","Empty"];export{t as Basic,o as Empty,K as __namedExportsOrder,J as default};

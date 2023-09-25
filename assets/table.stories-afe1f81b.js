import{R as r}from"./index-9f32f44c.js";import{T,C as _,F as D,a as b,b as x,c as A,S as L}from"./patient-allergies-aff89e23.js";import"./_commonjsHelpers-de833af9.js";import"./index-a587463d.js";import"./mapValues-0faaf839.js";import"./action-list-f6838f32.js";import"./uniq-3125a96e.js";import"./toNumber-d641e9d5.js";import"./isPlainObject-5ac64777.js";import"./request-b0088695.js";import"./extends-a9bf1af6.js";import"./index-a6f82bad.js";import"./index-9c2d1831.js";import"./spinner-096fc82a.js";import"./debounce-552511e6.js";import"./data-list-2854f463.js";const z={component:T,tags:["autodocs"],decorators:[(e,{args:N})=>r.createElement(_,{env:"dev",authToken:D,builderId:b},r.createElement(x,{patientID:A,systemURL:L},r.createElement(e,{args:N})))],argTypes:{emptyMessage:{options:["Default","String","ReactElement"],mapping:{Default:void 0,String:"Ain't no records here friend",ReactElement:r.createElement("div",{className:"ctw-space-y-4"},r.createElement("div",{className:"ctw-text-error-main"},"I said ",r.createElement("b",null,"NO RECORDS")," found!"),r.createElement("div",null,"I hope that is OK"))}}},args:{RowActions:void 0,className:void 0,columns:void 0,emptyMessage:void 0,getRowClassName:void 0,handleRowClick:void 0,hidePagination:void 0,isLoading:void 0,records:void 0,showTableHead:void 0,stacked:void 0}},h=[{title:"Id",dataIndex:"key",className:"ctw-w-[20%]"},{title:"Name",dataIndex:"name",className:"ctw-w-[20%]"},{title:"With Render",render:e=>r.createElement("div",null,"Render function for row ",e.key,": ",r.createElement("b",null,e.name.split(" ")[0])),className:"ctw-w-[30%]"}],c=[{key:"one",name:"First record"},{key:"two",name:"Second record"},{key:"three",name:"Third record"},{key:"four",name:"Fourth record"}],a={args:{records:c,columns:h}},I=[...c];for(let e=c.length+1;e<=35;e+=1)I.push({key:`${e}`,name:`${e} Record`});const s={args:{records:I,columns:h}},o={args:{emptyMessage:"Default",records:[],columns:[]}},t={args:{records:[],columns:[],isLoading:!0}},n={parameters:{docs:{description:{story:"Stacked version of table, good for sidepanels and smaller screens (responsive)."}}},args:{...a.args,className:"ctw-m-auto ctw-max-w-[600px]",stacked:!0}};var d,m,i;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    records,
    columns
  }
}`,...(i=(m=a.parameters)==null?void 0:m.docs)==null?void 0:i.source}}};var l,p,u;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    records: manyRecords,
    columns
  }
}`,...(u=(p=s.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var g,v,E;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    emptyMessage: "Default",
    records: [],
    columns: []
  }
}`,...(E=(v=o.parameters)==null?void 0:v.docs)==null?void 0:E.source}}};var y,w,S;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    records: [],
    columns: [],
    isLoading: true
  }
}`,...(S=(w=t.parameters)==null?void 0:w.docs)==null?void 0:S.source}}};var f,R,k;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Stacked version of table, good for sidepanels and smaller screens (responsive)."
      }
    }
  },
  args: {
    ...Basic.args,
    className: "ctw-m-auto ctw-max-w-[600px]",
    stacked: true
  }
}`,...(k=(R=n.parameters)==null?void 0:R.docs)==null?void 0:k.source}}};const G=["Basic","Paging","Empty","Loading","Stacked"];export{a as Basic,o as Empty,t as Loading,s as Paging,n as Stacked,G as __namedExportsOrder,z as default};

import{R as r}from"./index-6f814c40.js";import{T as b}from"./table-d8430721.js";import"./_commonjsHelpers-042e6b4d.js";import"./index-74f03c09.js";import"./spinner-66aa4ba7.js";import"./_baseToString-7c0e3f59.js";import"./_equalByTag-eda72788.js";import"./sortBy-3347ffe9.js";import"./sortBy-ee350c06.js";import"./_baseForOwn-03e9c2f3.js";import"./_baseIsEqual-7d59e24c.js";import"./_baseClone-3ae78372.js";import"./_createSet-6ff8e1d4.js";import"./toNumber-d7ce3bd9.js";import"./isPlainObject-243fdc78.js";const K={component:b,tags:["autodocs"],argTypes:{emptyMessage:{options:["Default","String","ReactElement"],mapping:{Default:void 0,String:"Ain't no records here friend",ReactElement:r.createElement("div",{className:"ctw-space-y-4"},r.createElement("div",{className:"ctw-text-error-main"},"I said ",r.createElement("b",null,"NO RECORDS")," found!"),r.createElement("div",null,"I hope that is OK"))}}},args:{RowActions:void 0,className:void 0,columns:void 0,emptyMessage:void 0,getRowClassName:void 0,handleRowClick:void 0,hidePagination:void 0,isLoading:void 0,records:void 0,removeLeftAndRightBorders:void 0,showTableHead:void 0,stacked:void 0}},N=[{title:"Id",dataIndex:"id",className:"ctw-w-[20%]"},{title:"Name",dataIndex:"name",className:"ctw-w-[20%]"},{title:"With Render",render:e=>r.createElement("div",null,"Render function for row ",e.id,": ",r.createElement("b",null,e.name.split(" ")[0])),className:"ctw-w-[30%]"},{className:"ctw-table-action-column",render:e=>r.createElement("div",null,"...")}],c=[{id:"one",name:"First record"},{id:"two",name:"Second record"},{id:"three",name:"Third record"},{id:"four",name:"Fourth record"}],s={args:{records:c,columns:N}},x=[...c];for(let e=c.length+1;e<=35;e+=1)x.push({id:`${e}`,name:`${e} Record`});const a={args:{records:x,columns:N}},o={args:{emptyMessage:"Default",records:[],columns:[]}},t={args:{records:[],columns:[],isLoading:!0}},n={parameters:{docs:{description:{story:"Stacked version of table, good for sidepanels and smaller screens (responsive)."}}},args:{...s.args,className:"ctw-m-auto ctw-max-w-[600px]",stacked:!0}};var d,i,m;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    records,
    columns
  }
}`,...(m=(i=s.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var l,p,u;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    records: manyRecords,
    columns
  }
}`,...(u=(p=a.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var g,v,w;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    emptyMessage: "Default",
    records: [],
    columns: []
  }
}`,...(w=(v=o.parameters)==null?void 0:v.docs)==null?void 0:w.source}}};var f,R,h;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    records: [],
    columns: [],
    isLoading: true
  }
}`,...(h=(R=t.parameters)==null?void 0:R.docs)==null?void 0:h.source}}};var E,S,y;n.parameters={...n.parameters,docs:{...(E=n.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(y=(S=n.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};const W=["Basic","Paging","Empty","Loading","Stacked"];export{s as Basic,o as Empty,t as Loading,a as Paging,n as Stacked,W as __namedExportsOrder,K as default};

import{R as r}from"./index-6f814c40.js";import{T as x}from"./table-6bd578fc.js";import"./_commonjsHelpers-042e6b4d.js";import"./index-74f03c09.js";import"./spinner-66aa4ba7.js";import"./_baseForOwn-10376b4b.js";import"./_baseIsEqual-a4ed7fae.js";import"./_baseClone-72ef38a3.js";import"./sortBy-eef2ec28.js";import"./_createSet-e03e7f83.js";import"./toNumber-54b1e0c0.js";import"./isPlainObject-832b1a67.js";const F={component:x,tags:["autodocs"],argTypes:{emptyMessage:{options:["Default","String","ReactElement"],mapping:{Default:void 0,String:"Ain't no records here friend",ReactElement:r.createElement("div",{className:"ctw-space-y-4"},r.createElement("div",{className:"ctw-text-error-main"},"I said ",r.createElement("b",null,"NO RECORDS")," found!"),r.createElement("div",null,"I hope that is OK"))}}},args:{RowActions:void 0,className:void 0,columns:void 0,emptyMessage:void 0,getRowClassName:void 0,handleRowClick:void 0,hidePagination:void 0,isLoading:void 0,records:void 0,showTableHead:void 0,stacked:void 0}},E=[{title:"Id",dataIndex:"key",className:"ctw-w-[20%]"},{title:"Name",dataIndex:"name",className:"ctw-w-[20%]"},{title:"With Render",render:e=>r.createElement("div",null,"Render function for row ",e.key,": ",r.createElement("b",null,e.name.split(" ")[0])),className:"ctw-w-[30%]"}],c=[{key:"one",name:"First record"},{key:"two",name:"Second record"},{key:"three",name:"Third record"},{key:"four",name:"Fourth record"}],s={args:{records:c,columns:E}},N=[...c];for(let e=c.length+1;e<=35;e+=1)N.push({key:`${e}`,name:`${e} Record`});const a={args:{records:N,columns:E}},o={args:{emptyMessage:"Default",records:[],columns:[]}},t={args:{records:[],columns:[],isLoading:!0}},n={parameters:{docs:{description:{story:"Stacked version of table, good for sidepanels and smaller screens (responsive)."}}},args:{...s.args,className:"ctw-m-auto ctw-max-w-[600px]",stacked:!0}};var d,m,i;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    records,
    columns
  }
}`,...(i=(m=s.parameters)==null?void 0:m.docs)==null?void 0:i.source}}};var l,p,u;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(w=(v=o.parameters)==null?void 0:v.docs)==null?void 0:w.source}}};var y,f,k;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    records: [],
    columns: [],
    isLoading: true
  }
}`,...(k=(f=t.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};var R,S,h;n.parameters={...n.parameters,docs:{...(R=n.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(h=(S=n.parameters)==null?void 0:S.docs)==null?void 0:h.source}}};const $=["Basic","Paging","Empty","Loading","Stacked"];export{s as Basic,o as Empty,t as Loading,a as Paging,n as Stacked,$ as __namedExportsOrder,F as default};

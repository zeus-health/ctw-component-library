import{R as r}from"./index-6f814c40.js";import{T as y}from"./table-3aa1616d.js";import"./_commonjsHelpers-042e6b4d.js";import"./index-74f03c09.js";import"./_baseToString-7c0e3f59.js";import"./_equalByTag-eda72788.js";import"./sortBy-7a463c81.js";import"./_baseForOwn-7324d3a8.js";import"./_baseIsEqual-7d59e24c.js";import"./_baseClone-17ec433b.js";import"./_arrayIncludes-66d8e0f7.js";import"./toNumber-d7ce3bd9.js";import"./_createSet-541d31f8.js";import"./isPlainObject-f51be120.js";import"./spinner-66aa4ba7.js";const T={component:y,tags:["docsPage"],argTypes:{emptyMessage:{options:["Default","String","ReactElement"],mapping:{Default:void 0,String:"Ain't no records here friend",ReactElement:r.createElement("div",{className:"ctw-space-y-4"},r.createElement("div",{className:"ctw-text-error-main"},"I said ",r.createElement("b",null,"NO RECORDS")," found!"),r.createElement("div",null,"I hope that is OK"))}}}},u=[{title:"Id",dataIndex:"id",className:"ctw-w-[20%]"},{title:"Name",dataIndex:"name",className:"ctw-w-[20%]",sortIndices:[{index:"name"}]},{title:"With Render",render:e=>r.createElement("div",null,"Render function for row ",e.id,": ",r.createElement("b",null,e.name.split(" ")[0])),className:"ctw-w-[30%]"},{className:"ctw-table-action-column",render:e=>r.createElement("div",null,"...")}],c=[{id:"one",name:"First record"},{id:"two",name:"Second record"},{id:"three",name:"Third record"},{id:"four",name:"Fourth record"}],t={args:{records:c,columns:u}},g=[...c];for(let e=c.length+1;e<=35;e+=1)g.push({id:`${e}`,name:`${e} Record`});const s={args:{records:g,columns:u}},a={args:{emptyMessage:"Default",records:[],columns:[]}},o={args:{records:[],columns:[],isLoading:!0}},n={parameters:{docs:{description:{story:"Stacked version of table, good for sidepanels and smaller screens (responsive)."}}},args:{...t.args,className:"ctw-m-auto ctw-max-w-[600px]",stacked:!0}};var m;t.parameters={...t.parameters,storySource:{source:`{
  args: {
    records,
    columns
  }
}`,...(m=t.parameters)==null?void 0:m.storySource}};var i;s.parameters={...s.parameters,storySource:{source:`{
  args: {
    records: manyRecords,
    columns
  }
}`,...(i=s.parameters)==null?void 0:i.storySource}};var d;a.parameters={...a.parameters,storySource:{source:`{
  args: {
    emptyMessage: "Default",
    records: [],
    columns: []
  }
}`,...(d=a.parameters)==null?void 0:d.storySource}};var l;o.parameters={...o.parameters,storySource:{source:`{
  args: {
    records: [],
    columns: [],
    isLoading: true
  }
}`,...(l=o.parameters)==null?void 0:l.storySource}};var p;n.parameters={...n.parameters,storySource:{source:`{
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
}`,...(p=n.parameters)==null?void 0:p.storySource}};const B=["Basic","Paging","Empty","Loading","Stacked"];export{t as Basic,a as Empty,o as Loading,s as Paging,n as Stacked,B as __namedExportsOrder,T as default};
//# sourceMappingURL=table.stories-afd2152e.js.map

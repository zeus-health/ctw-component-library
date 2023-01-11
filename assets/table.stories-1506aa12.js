import{R as r}from"./index-6f814c40.js";import{T as y}from"./table-290f29c2.js";import"./_commonjsHelpers-042e6b4d.js";import"./index-74f03c09.js";import"./spinner-66aa4ba7.js";const v={component:y,tags:["docsPage"],argTypes:{emptyMessage:{options:["Default","String","ReactElement"],mapping:{Default:void 0,String:"Ain't no records here friend",ReactElement:r.createElement("div",{className:"ctw-space-y-4"},r.createElement("div",{className:"ctw-text-error-main"},"I said ",r.createElement("b",null,"NO RECORDS")," found!"),r.createElement("div",null,"I hope that is OK"))}}}},u=[{title:"Id",dataIndex:"id",className:"ctw-w-[20%]"},{title:"Name",dataIndex:"name",className:"ctw-w-[20%]",sortIndices:[{index:"name"}]},{title:"With Render",render:e=>r.createElement("div",null,"Render function for row ",e.id,": ",r.createElement("b",null,e.name.split(" ")[0])),className:"ctw-w-[30%]"},{className:"ctw-table-action-column",render:e=>r.createElement("div",null,"...")}],c=[{id:"one",name:"First record"},{id:"two",name:"Second record"},{id:"three",name:"Third record"},{id:"four",name:"Fourth record"}],s={args:{records:c,columns:u}},g=[...c];for(let e=c.length+1;e<=35;e+=1)g.push({id:`${e}`,name:`${e} Record`});const a={args:{records:g,columns:u}},t={args:{emptyMessage:"Default",records:[],columns:[]}},n={args:{records:[],columns:[],isLoading:!0}},o={parameters:{docs:{description:{story:"Stacked version of table, good for sidepanels and smaller screens (responsive)."}}},args:{...s.args,className:"ctw-m-auto ctw-max-w-[600px]",stacked:!0}};var m;s.parameters={...s.parameters,storySource:{source:`{
  args: {
    records,
    columns
  }
}`,...(m=s.parameters)==null?void 0:m.storySource}};var d;a.parameters={...a.parameters,storySource:{source:`{
  args: {
    records: manyRecords,
    columns
  }
}`,...(d=a.parameters)==null?void 0:d.storySource}};var i;t.parameters={...t.parameters,storySource:{source:`{
  args: {
    emptyMessage: "Default",
    records: [],
    columns: []
  }
}`,...(i=t.parameters)==null?void 0:i.storySource}};var l;n.parameters={...n.parameters,storySource:{source:`{
  args: {
    records: [],
    columns: [],
    isLoading: true
  }
}`,...(l=n.parameters)==null?void 0:l.storySource}};var p;o.parameters={...o.parameters,storySource:{source:`{
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
}`,...(p=o.parameters)==null?void 0:p.storySource}};const x=["Basic","Paging","Empty","Loading","Stacked"];export{s as Basic,t as Empty,n as Loading,a as Paging,o as Stacked,x as __namedExportsOrder,v as default};
//# sourceMappingURL=table.stories-1506aa12.js.map

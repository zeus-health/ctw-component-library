import{d as t}from"./index.32882b2c.js";import{c as d}from"./index.d3b8680b.js";import{f}from"./fp.83563e72.js";import"./iframe.15522f87.js";const s=({items:e,className:n,...o})=>t.createElement("ul",{className:d("ctw-action-list ctw-rounded-lg",n,{"ctw-border-0":e.length===0,"ctw-bg-bg-lighter":e.length>0})},e.map(a=>t.createElement(r,{key:a.id,item:a,...o}))),r=({item:e,onRowClick:n,onAction:o,actionText:a="Mark Complete",undoActionText:u="Undo",onUndoAction:l,activeClassName:p="active"})=>t.createElement("li",{role:"row",className:d("ctw-action-list-item","ctw-border-lighter ctw-flex ctw-cursor-pointer ctw-p-4",{[p]:!e.complete,undoable:f.isFunction(l)}),onKeyDown:i=>{i.key==="Enter"&&i.currentTarget.click()},onClick:()=>n==null?void 0:n(e)},t.createElement("div",{className:"ctw-action-list-item-content ctw-flex-grow"},t.createElement("div",{className:"ctw-font-semibold"},e.title),e.subtitle&&t.createElement("div",{className:"ctw-font-light"},e.subtitle)),t.createElement("div",{className:"ctw-action-list-item-action"},!e.complete&&t.createElement("button",{type:"button",className:"ctw-btn-primary",onClick:i=>{i.stopPropagation(),o(e)}},a),e.complete&&!!l&&t.createElement("button",{type:"button",className:"ctw-btn-default",onClick:i=>{i.stopPropagation(),l(e)}},u)));try{s.displayName="ActionList",s.__docgenInfo={description:`Displays a list of action items which reflect whether they are
completed or not. List items marked "active" will show a (primary)
colored border to the left and when hovered will present a button
to take action. Use the "onAction" handler to mark items as "complete".

Optionally the opposite can be done for inactive items if an "onUndoAction"
handler is passed in, but that is not a requirement.`,displayName:"ActionList",props:{items:{defaultValue:null,description:"",name:"items",required:!0,type:{name:"T[]"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},onAction:{defaultValue:null,description:"",name:"onAction",required:!0,type:{name:"(i: T) => void"}},onRowClick:{defaultValue:null,description:"",name:"onRowClick",required:!1,type:{name:"((i: T) => void)"}},actionText:{defaultValue:{value:"Mark Complete"},description:"",name:"actionText",required:!1,type:{name:"string"}},activeClassName:{defaultValue:{value:"active"},description:"",name:"activeClassName",required:!1,type:{name:"string"}},onUndoAction:{defaultValue:null,description:"",name:"onUndoAction",required:!1,type:{name:"((i: T) => void)"}},undoActionText:{defaultValue:{value:"Undo"},description:"",name:"undoActionText",required:!1,type:{name:"string"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/components/core/action-list/action-list.tsx#ActionList"]={docgenInfo:s.__docgenInfo,name:"ActionList",path:"src/components/core/action-list/action-list.tsx#ActionList"})}catch{}try{r.displayName="ActionListItem",r.__docgenInfo={description:"",displayName:"ActionListItem",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},item:{defaultValue:null,description:"",name:"item",required:!0,type:{name:"MinActionItem"}},onAction:{defaultValue:null,description:"",name:"onAction",required:!0,type:{name:"(i: T) => void"}},onRowClick:{defaultValue:null,description:"",name:"onRowClick",required:!1,type:{name:"((i: T) => void)"}},actionText:{defaultValue:{value:"Mark Complete"},description:"",name:"actionText",required:!1,type:{name:"string"}},activeClassName:{defaultValue:{value:"active"},description:"",name:"activeClassName",required:!1,type:{name:"string"}},onUndoAction:{defaultValue:null,description:"",name:"onUndoAction",required:!1,type:{name:"((i: T) => void)"}},undoActionText:{defaultValue:{value:"Undo"},description:"",name:"undoActionText",required:!1,type:{name:"string"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/components/core/action-list/action-list.tsx#ActionListItem"]={docgenInfo:r.__docgenInfo,name:"ActionListItem",path:"src/components/core/action-list/action-list.tsx#ActionListItem"})}catch{}const v={component:s,tags:["docsPage"]},c=(e="",n="",o="",a=!1)=>({id:e,title:n,subtitle:o,complete:a}),m=[c("007","Miralax Oral Product","Dissolve 17g in 4\u20138oz liquid and drink once daily for up to 7 days."),c("123","3 ML insulin glargine 100 UNT/ML Pen Injector [Lantus]","Inject 3 ML with enclosed pen injector every morning."),c("insulin","3 ML insulin aspart protamine, human 70 UNT/ML / insulin aspart, human 30 UNT/ML Pen Injector [NovoLog Mix] ","Inject 3 ML before meals. Quantity: 90 days"),c("next","triamcinolone acetonide 0.147 MG/ML Topical Spray","Apply to affected area as needed for eczema exacerbation.",!0)],L={args:{items:m}},h={args:{items:m,onUndoAction:void 0}},T={args:{items:[]}},w=["Basic","WithoutUndo","Empty"];export{L as Basic,T as Empty,h as WithoutUndo,w as __namedExportsOrder,v as default};
//# sourceMappingURL=action-list.stories.493764a2.js.map

import{A as f}from"./action-list-fdeefdba.js";import"./index-9f32f44c.js";import"./_commonjsHelpers-de833af9.js";import"./index-a587463d.js";import"./mapValues-9e3bd6e7.js";import"./uniq-bf298a4f.js";import"./toNumber-c05bcaa4.js";import"./isPlainObject-b28e1af2.js";const w={component:f,tags:["autodocs"],args:{actionText:void 0,activeClassName:void 0,className:void 0,items:[],onAction:void 0,onRowClick:void 0,onUndoAction:void 0,onSecondaryAction:void 0,secondaryActionText:void 0,undoActionText:void 0}},o=(x="",L="",M="",S=!1)=>({id:x,title:L,subtitle:M,complete:S}),r=[o("007","Miralax Oral Product","Dissolve 17g in 4–8oz liquid and drink once daily for up to 7 days."),o("123","3 ML insulin glargine 100 UNT/ML Pen Injector [Lantus]","Inject 3 ML with enclosed pen injector every morning."),o("insulin","3 ML insulin aspart protamine, human 70 UNT/ML / insulin aspart, human 30 UNT/ML Pen Injector [NovoLog Mix] ","Inject 3 ML before meals. Quantity: 90 days"),o("next","triamcinolone acetonide 0.147 MG/ML Topical Spray","Apply to affected area as needed for eczema exacerbation.",!0)],e={args:{items:r}},n={args:{items:r,secondaryActionText:"Do Something Else"}},t={args:{items:r,onUndoAction:void 0}},a={args:{items:[]}};var s,i,c;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    items
  }
}`,...(c=(i=e.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};var d,m,p;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    items,
    secondaryActionText: "Do Something Else"
  }
}`,...(p=(m=n.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var l,u,g;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    items,
    // Storybook will automatically add action callbacks so we have
    // to explictily set it to undefined.
    onUndoAction: undefined
  }
}`,...(g=(u=t.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var y,v,A;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    items: []
  }
}`,...(A=(v=a.parameters)==null?void 0:v.docs)==null?void 0:A.source}}};const I=["Basic","WithSecondaryAction","WithoutUndo","Empty"];export{e as Basic,a as Empty,n as WithSecondaryAction,t as WithoutUndo,I as __namedExportsOrder,w as default};

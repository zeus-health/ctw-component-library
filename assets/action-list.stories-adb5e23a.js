import{B as f}from"./action-list-147315c2.js";import"./index-6f814c40.js";import"./_commonjsHelpers-042e6b4d.js";import"./index-74f03c09.js";import"./sortBy-d0c06176.js";import"./_baseForOwn-d5bf979e.js";import"./_equalByTag-3aa7c076.js";import"./_baseIsEqual-4b283a92.js";import"./_baseToString-ba0098b0.js";import"./_baseClone-0bdbe065.js";import"./_createSet-823d7c6f.js";import"./toNumber-711c0fc1.js";import"./isPlainObject-7e0f34c5.js";import"./_basePickBy-f94c0374.js";import"./mapValues-80a5786c.js";import"./uniq-1e65cdac.js";const C={component:f,tags:["autodocs"],args:{actionText:void 0,activeClassName:void 0,className:void 0,items:[],onAction:void 0,onRowClick:void 0,onUndoAction:void 0,onSecondaryAction:void 0,secondaryActionText:void 0,undoActionText:void 0}},o=(x="",L="",M="",S=!1)=>({id:x,title:L,subtitle:M,complete:S}),a=[o("007","Miralax Oral Product","Dissolve 17g in 4–8oz liquid and drink once daily for up to 7 days."),o("123","3 ML insulin glargine 100 UNT/ML Pen Injector [Lantus]","Inject 3 ML with enclosed pen injector every morning."),o("insulin","3 ML insulin aspart protamine, human 70 UNT/ML / insulin aspart, human 30 UNT/ML Pen Injector [NovoLog Mix] ","Inject 3 ML before meals. Quantity: 90 days"),o("next","triamcinolone acetonide 0.147 MG/ML Topical Spray","Apply to affected area as needed for eczema exacerbation.",!0)],e={args:{items:a}},t={args:{items:a,secondaryActionText:"Do Something Else"}},n={args:{items:a,onUndoAction:void 0}},r={args:{items:[]}};var i,s,c;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    items
  }
}`,...(c=(s=e.parameters)==null?void 0:s.docs)==null?void 0:c.source}}};var m,d,p;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    items,
    secondaryActionText: "Do Something Else"
  }
}`,...(p=(d=t.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var l,u,g;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    items,
    // Storybook will automatically add action callbacks so we have
    // to explictily set it to undefined.
    onUndoAction: undefined
  }
}`,...(g=(u=n.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var y,v,A;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    items: []
  }
}`,...(A=(v=r.parameters)==null?void 0:v.docs)==null?void 0:A.source}}};const O=["Basic","WithSecondaryAction","WithoutUndo","Empty"];export{e as Basic,r as Empty,t as WithSecondaryAction,n as WithoutUndo,O as __namedExportsOrder,C as default};

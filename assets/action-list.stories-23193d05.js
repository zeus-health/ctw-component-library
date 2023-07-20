import{A as f}from"./action-list-ebfc70ec.js";import"./index-6f814c40.js";import"./_commonjsHelpers-042e6b4d.js";import"./index-74f03c09.js";import"./uniqWith-268881dc.js";import"./_baseForOwn-9e8b57a2.js";import"./_baseIsEqual-e6235ae7.js";import"./_baseClone-3dc95c45.js";import"./_baseUniq-405a48ca.js";import"./toNumber-cc3737a8.js";import"./isPlainObject-82e8b885.js";import"./_basePickBy-8ca83e64.js";import"./isEqual-34296d4e.js";import"./mapValues-87eb9295.js";import"./uniq-a7f2cddd.js";const B={component:f,tags:["autodocs"],args:{actionText:void 0,activeClassName:void 0,className:void 0,items:[],onAction:void 0,onRowClick:void 0,onUndoAction:void 0,onSecondaryAction:void 0,secondaryActionText:void 0,undoActionText:void 0}},o=(x="",L="",M="",S=!1)=>({id:x,title:L,subtitle:M,complete:S}),a=[o("007","Miralax Oral Product","Dissolve 17g in 4–8oz liquid and drink once daily for up to 7 days."),o("123","3 ML insulin glargine 100 UNT/ML Pen Injector [Lantus]","Inject 3 ML with enclosed pen injector every morning."),o("insulin","3 ML insulin aspart protamine, human 70 UNT/ML / insulin aspart, human 30 UNT/ML Pen Injector [NovoLog Mix] ","Inject 3 ML before meals. Quantity: 90 days"),o("next","triamcinolone acetonide 0.147 MG/ML Topical Spray","Apply to affected area as needed for eczema exacerbation.",!0)],e={args:{items:a}},t={args:{items:a,secondaryActionText:"Do Something Else"}},n={args:{items:a,onUndoAction:void 0}},r={args:{items:[]}};var i,s,c;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    items
  }
}`,...(c=(s=e.parameters)==null?void 0:s.docs)==null?void 0:c.source}}};var d,m,p;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    items,
    secondaryActionText: "Do Something Else"
  }
}`,...(p=(m=t.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var l,u,g;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(A=(v=r.parameters)==null?void 0:v.docs)==null?void 0:A.source}}};const C=["Basic","WithSecondaryAction","WithoutUndo","Empty"];export{e as Basic,r as Empty,t as WithSecondaryAction,n as WithoutUndo,C as __namedExportsOrder,B as default};

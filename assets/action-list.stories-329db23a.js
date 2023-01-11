import{A as y}from"./action-list-b9617a98.js";import"./index-6f814c40.js";import"./_commonjsHelpers-042e6b4d.js";import"./index-74f03c09.js";const f={component:y,tags:["docsPage"]},e=(d="",p="",u="",l=!1)=>({id:d,title:p,subtitle:u,complete:l}),a=[e("007","Miralax Oral Product","Dissolve 17g in 4–8oz liquid and drink once daily for up to 7 days."),e("123","3 ML insulin glargine 100 UNT/ML Pen Injector [Lantus]","Inject 3 ML with enclosed pen injector every morning."),e("insulin","3 ML insulin aspart protamine, human 70 UNT/ML / insulin aspart, human 30 UNT/ML Pen Injector [NovoLog Mix] ","Inject 3 ML before meals. Quantity: 90 days"),e("next","triamcinolone acetonide 0.147 MG/ML Topical Spray","Apply to affected area as needed for eczema exacerbation.",!0)],t={args:{items:a}},o={args:{items:a,secondaryActionText:"Do Something Else"}},n={args:{items:a,onUndoAction:void 0}},r={args:{items:[]}};var s;t.parameters={...t.parameters,storySource:{source:`{
  args: {
    items
  }
}`,...(s=t.parameters)==null?void 0:s.storySource}};var i;o.parameters={...o.parameters,storySource:{source:`{
  args: {
    items,
    secondaryActionText: "Do Something Else"
  }
}`,...(i=o.parameters)==null?void 0:i.storySource}};var c;n.parameters={...n.parameters,storySource:{source:`{
  args: {
    items,
    // Storybook will automatically add action callbacks so we have
    // to explictily set it to undefined.
    onUndoAction: undefined
  }
}`,...(c=n.parameters)==null?void 0:c.storySource}};var m;r.parameters={...r.parameters,storySource:{source:`{
  args: {
    items: []
  }
}`,...(m=r.parameters)==null?void 0:m.storySource}};const h=["Basic","WithSecondaryAction","WithoutUndo","Empty"];export{t as Basic,r as Empty,o as WithSecondaryAction,n as WithoutUndo,h as __namedExportsOrder,f as default};
//# sourceMappingURL=action-list.stories-329db23a.js.map

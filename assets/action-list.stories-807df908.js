import{C as y}from"./action-list-a9318641.js";import"./index-6f814c40.js";import"./_commonjsHelpers-042e6b4d.js";import"./index-74f03c09.js";import"./sortBy-64bfa6a0.js";import"./_baseForOwn-7324d3a8.js";import"./_equalByTag-eda72788.js";import"./_baseIsEqual-7d59e24c.js";import"./_baseToString-7c0e3f59.js";import"./_baseClone-17ec433b.js";import"./_arrayIncludes-66d8e0f7.js";import"./toNumber-d7ce3bd9.js";import"./isPlainObject-f51be120.js";import"./_basePickBy-78c03e5a.js";import"./mapValues-13598fe6.js";const N={component:y,tags:["docsPage"]},t=(p="",d="",u="",l=!1)=>({id:p,title:d,subtitle:u,complete:l}),a=[t("007","Miralax Oral Product","Dissolve 17g in 4–8oz liquid and drink once daily for up to 7 days."),t("123","3 ML insulin glargine 100 UNT/ML Pen Injector [Lantus]","Inject 3 ML with enclosed pen injector every morning."),t("insulin","3 ML insulin aspart protamine, human 70 UNT/ML / insulin aspart, human 30 UNT/ML Pen Injector [NovoLog Mix] ","Inject 3 ML before meals. Quantity: 90 days"),t("next","triamcinolone acetonide 0.147 MG/ML Topical Spray","Apply to affected area as needed for eczema exacerbation.",!0)],o={args:{items:a}},e={args:{items:a,secondaryActionText:"Do Something Else"}},r={args:{items:a,onUndoAction:void 0}},n={args:{items:[]}};var s;o.parameters={...o.parameters,storySource:{source:`{
  args: {
    items
  }
}`,...(s=o.parameters)==null?void 0:s.storySource}};var i;e.parameters={...e.parameters,storySource:{source:`{
  args: {
    items,
    secondaryActionText: "Do Something Else"
  }
}`,...(i=e.parameters)==null?void 0:i.storySource}};var c;r.parameters={...r.parameters,storySource:{source:`{
  args: {
    items,
    // Storybook will automatically add action callbacks so we have
    // to explictily set it to undefined.
    onUndoAction: undefined
  }
}`,...(c=r.parameters)==null?void 0:c.storySource}};var m;n.parameters={...n.parameters,storySource:{source:`{
  args: {
    items: []
  }
}`,...(m=n.parameters)==null?void 0:m.storySource}};const P=["Basic","WithSecondaryAction","WithoutUndo","Empty"];export{o as Basic,n as Empty,e as WithSecondaryAction,r as WithoutUndo,P as __namedExportsOrder,N as default};
//# sourceMappingURL=action-list.stories-807df908.js.map

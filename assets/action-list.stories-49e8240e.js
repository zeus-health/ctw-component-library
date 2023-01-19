import{C as y}from"./action-list-93d490b0.js";import"./index-6f814c40.js";import"./_commonjsHelpers-042e6b4d.js";import"./index-74f03c09.js";import"./sortBy-1bd29ff1.js";import"./_baseForOwn-d14a5c7b.js";import"./_getTag-f6946e3e.js";import"./_baseIsEqual-87615994.js";import"./_baseToString-d6b3b198.js";import"./_baseClone-73248e56.js";import"./noop-640bb2f2.js";import"./toNumber-dfb0a5dc.js";import"./isPlainObject-1763b18f.js";import"./_basePickBy-b8cc8020.js";import"./mapValues-bf5b7280.js";const N={component:y,tags:["docsPage"]},t=(p="",d="",u="",l=!1)=>({id:p,title:d,subtitle:u,complete:l}),a=[t("007","Miralax Oral Product","Dissolve 17g in 4–8oz liquid and drink once daily for up to 7 days."),t("123","3 ML insulin glargine 100 UNT/ML Pen Injector [Lantus]","Inject 3 ML with enclosed pen injector every morning."),t("insulin","3 ML insulin aspart protamine, human 70 UNT/ML / insulin aspart, human 30 UNT/ML Pen Injector [NovoLog Mix] ","Inject 3 ML before meals. Quantity: 90 days"),t("next","triamcinolone acetonide 0.147 MG/ML Topical Spray","Apply to affected area as needed for eczema exacerbation.",!0)],o={args:{items:a}},e={args:{items:a,secondaryActionText:"Do Something Else"}},r={args:{items:a,onUndoAction:void 0}},n={args:{items:[]}};var s;o.parameters={...o.parameters,storySource:{source:`{
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
//# sourceMappingURL=action-list.stories-49e8240e.js.map

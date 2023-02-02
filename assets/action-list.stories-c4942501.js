import{A as y}from"./action-list-ada7e7df.js";import"./index-6f814c40.js";import"./_commonjsHelpers-042e6b4d.js";import"./index-74f03c09.js";import"./sortBy-7530ff7d.js";import"./_baseForOwn-0b302854.js";import"./_equalByTag-2573c09c.js";import"./_baseIsEqual-4482d138.js";import"./_baseToString-5e23e5e6.js";import"./_baseClone-59dfd81b.js";import"./_createSet-00935424.js";import"./toNumber-4334224f.js";import"./isPlainObject-d68c8411.js";import"./_basePickBy-d4bc7435.js";import"./mapValues-3edfa6db.js";import"./_baseUniq-701deb29.js";const W={component:y,tags:["autodocs"]},t=(p="",d="",u="",l=!1)=>({id:p,title:d,subtitle:u,complete:l}),a=[t("007","Miralax Oral Product","Dissolve 17g in 4–8oz liquid and drink once daily for up to 7 days."),t("123","3 ML insulin glargine 100 UNT/ML Pen Injector [Lantus]","Inject 3 ML with enclosed pen injector every morning."),t("insulin","3 ML insulin aspart protamine, human 70 UNT/ML / insulin aspart, human 30 UNT/ML Pen Injector [NovoLog Mix] ","Inject 3 ML before meals. Quantity: 90 days"),t("next","triamcinolone acetonide 0.147 MG/ML Topical Spray","Apply to affected area as needed for eczema exacerbation.",!0)],o={args:{items:a}},e={args:{items:a,secondaryActionText:"Do Something Else"}},r={args:{items:a,onUndoAction:void 0}},n={args:{items:[]}};var s;o.parameters={...o.parameters,storySource:{source:`{
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
}`,...(m=n.parameters)==null?void 0:m.storySource}};const k=["Basic","WithSecondaryAction","WithoutUndo","Empty"];export{o as Basic,n as Empty,e as WithSecondaryAction,r as WithoutUndo,k as __namedExportsOrder,W as default};
//# sourceMappingURL=action-list.stories-c4942501.js.map

import{r as c,R as e}from"./index-9f32f44c.js";import{D as o,C as u,F as d,a as p,b as E,c as v,S as w}from"./patient-allergies-5ab8cae7.js";import"./_commonjsHelpers-de833af9.js";import"./index-a587463d.js";import"./mapValues-9e3bd6e7.js";import"./action-list-21ec08d7.js";import"./uniq-bf298a4f.js";import"./toNumber-c05bcaa4.js";import"./isPlainObject-b28e1af2.js";import"./request-bddbdd10.js";import"./extends-d4a816c6.js";import"./spinner-096fc82a.js";import"./index-0beb7cf7.js";import"./debounce-a5d1dca2.js";import"./index-9c2d1831.js";import"./data-list-2854f463.js";const S={component:o,tags:["autodocs"],decorators:[(a,{args:r})=>{const[m,i]=c.useState(!1);return e.createElement(u,{env:"dev",authToken:d,builderId:p},e.createElement(E,{patientID:v,systemURL:w},e.createElement("div",{id:"headlessui-portal-root"},e.createElement("p",null,"To open up the drawer, simply press the button below"),e.createElement("button",{type:"button",className:"ctw-btn-primary",onClick:()=>i(!0)},"Open"),e.createElement(a,{args:{...r,isOpen:m,onClose:()=>i(!1)}}))))}],args:{children:void 0,className:void 0,disableCloseOnBlur:void 0,isOpen:void 0,onAfterClosed:void 0,onAfterOpen:void 0,onClose:void 0,onOpen:void 0,showCloseFooter:void 0,title:void 0}},t={args:{title:"Drawer Title",children:e.createElement(e.Fragment,null,e.createElement(o.Body,null,e.createElement("h4",null,"Drawer Body"),e.createElement("ol",null,[...Array(10)].map((a,r)=>e.createElement("li",{key:r,"data-testid":`scrollable-content-${r}`},"Lorem ipsum dolor sit amet, his te vulputate cotidieque concludaturque, no nulla dicit vocibus ius. Eos ne recusabo scriptorem, admodum ullamcorper te mei. Eros mundi eos te, mea at errem graecis. Ex cum delicata intellegam, mea at duis patrioque conclusionemque, pri te brute ceteros eloquentiam. Veri placerat persecuti ut vix, sint esse iriure ei sit")))),e.createElement(o.Footer,null,"Drawer Footer"))}};var s,n,l;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    title: "Drawer Title",
    children: <>
        <Drawer.Body>
          <h4>Drawer Body</h4>
          <ol>
            {[...Array(10)].map((_, i) =>
          // eslint-disable-next-line react/no-array-index-key
          <li key={i} data-testid={\`scrollable-content-\${i}\`}>
                Lorem ipsum dolor sit amet, his te vulputate cotidieque concludaturque, no nulla
                dicit vocibus ius. Eos ne recusabo scriptorem, admodum ullamcorper te mei. Eros
                mundi eos te, mea at errem graecis. Ex cum delicata intellegam, mea at duis
                patrioque conclusionemque, pri te brute ceteros eloquentiam. Veri placerat persecuti
                ut vix, sint esse iriure ei sit
              </li>)}
          </ol>
        </Drawer.Body>
        <Drawer.Footer>Drawer Footer</Drawer.Footer>
      </>
  }
}`,...(l=(n=t.parameters)==null?void 0:n.docs)==null?void 0:l.source}}};const U=["Basic"];export{t as Basic,U as __namedExportsOrder,S as default};

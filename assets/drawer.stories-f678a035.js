import{r as w,R as t}from"./index-6f814c40.js";import{w as B,e as a,u as c}from"./index-10f7dd35.js";import{q as s}from"./drawer-3c02213f.js";import"./_commonjsHelpers-042e6b4d.js";import"./isEqual-298b6ab1.js";import"./_baseIsEqual-7d59e24c.js";import"./_equalByTag-eda72788.js";import"./uniq-8676ca12.js";import"./_createSet-6ff8e1d4.js";import"./index-a6c8ef6f.js";import"./index-356e4a49.js";import"./index-74f03c09.js";import"./index-6de6b113.js";const C={component:s,tags:["autodocs"],decorators:[(o,{args:e})=>{const[v,i]=w.useState(!1);return t.createElement("div",{id:"headlessui-portal-root"},t.createElement("p",null,"To open up the drawer, simply press the button below"),t.createElement("button",{type:"button",className:"ctw-btn-primary",onClick:()=>i(!0)},"Open"),t.createElement(o,{args:{...e,isOpen:v,onClose:()=>i(!1)}}))}],args:{children:void 0,className:void 0,disableCloseOnBlur:void 0,isOpen:void 0,onAfterClosed:void 0,onAfterOpen:void 0,onClose:void 0,onOpen:void 0,showCloseFooter:void 0,title:void 0}},r={args:{title:"Drawer Title",children:t.createElement(t.Fragment,null,t.createElement(s.Body,null,t.createElement("h4",null,"Drawer Body"),t.createElement("ol",null,[...Array(10)].map((o,e)=>t.createElement("li",{key:e,"data-testid":`scrollable-content-${e}`},"Lorem ipsum dolor sit amet, his te vulputate cotidieque concludaturque, no nulla dicit vocibus ius. Eos ne recusabo scriptorem, admodum ullamcorper te mei. Eros mundi eos te, mea at errem graecis. Ex cum delicata intellegam, mea at duis patrioque conclusionemque, pri te brute ceteros eloquentiam. Veri placerat persecuti ut vix, sint esse iriure ei sit")))),t.createElement(s.Footer,null,"Drawer Footer"))}},n={...r,play:async({canvasElement:o})=>{const e=B(o);a(e.queryByText(/drawer title/i)).toBeNull(),c.click(e.getByRole("button")),a(e.getByText(/drawer title/i)).toBeInTheDocument(),a(e.getByTestId("scrollable-content-0")).toBeInTheDocument(),a(e.getByText(/drawer footer/i)).toBeInTheDocument(),c.click(e.getByLabelText("close"))}};var l,u,m;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    title: "Drawer Title",
    children: <>
        <Drawer.Body>
          <h4>Drawer Body</h4>
          <ol>
            {[...Array(10)].map((_, i) =>
          // eslint-disable-next-line react/no-array-index-key
          <li key={i} data-testid={\`scrollable-content-\${i}\`}>
                Lorem ipsum dolor sit amet, his te vulputate cotidieque
                concludaturque, no nulla dicit vocibus ius. Eos ne recusabo
                scriptorem, admodum ullamcorper te mei. Eros mundi eos te, mea
                at errem graecis. Ex cum delicata intellegam, mea at duis
                patrioque conclusionemque, pri te brute ceteros eloquentiam.
                Veri placerat persecuti ut vix, sint esse iriure ei sit
              </li>)}
          </ol>
        </Drawer.Body>
        <Drawer.Footer>Drawer Footer</Drawer.Footer>
      </>
  }
}`,...(m=(u=r.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var d,p,y;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  ...Basic,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Verify drawer doesn't show right away.
    expect(canvas.queryByText(/drawer title/i)).toBeNull();

    // Open drawer and verify our three areas appear.
    userEvent.click(canvas.getByRole("button"));
    expect(canvas.getByText(/drawer title/i)).toBeInTheDocument();
    expect(canvas.getByTestId("scrollable-content-0")).toBeInTheDocument();
    expect(canvas.getByText(/drawer footer/i)).toBeInTheDocument();
    userEvent.click(canvas.getByLabelText("close"));
  }
}`,...(y=(p=n.parameters)==null?void 0:p.docs)==null?void 0:y.source}}};const _=["Basic","Test"];export{r as Basic,n as Test,_ as __namedExportsOrder,C as default};
//# sourceMappingURL=drawer.stories-f678a035.js.map

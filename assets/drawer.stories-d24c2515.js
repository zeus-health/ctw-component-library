import{r as x,R as t}from"./index-6f814c40.js";import{w as T,e as o,u as l}from"./index-10f7dd35.js";import{q as s}from"./drawer-39fcad7e.js";import"./_commonjsHelpers-042e6b4d.js";import"./isEqual-298b6ab1.js";import"./_baseIsEqual-7d59e24c.js";import"./_equalByTag-eda72788.js";import"./uniq-8676ca12.js";import"./_createSet-6ff8e1d4.js";import"./index-a6c8ef6f.js";import"./index-356e4a49.js";import"./index-74f03c09.js";import"./index-6de6b113.js";const _={component:s,tags:["autodocs"],decorators:[(a,{args:e})=>{const[B,c]=x.useState(!1);return t.createElement("div",{id:"headlessui-portal-root"},t.createElement("button",{type:"button",className:"ctw-btn-primary",onClick:()=>c(!0)},"Open"),t.createElement(a,{args:{...e,isOpen:B,onClose:()=>c(!1)}}))}]},r={args:{title:"My Title",children:t.createElement(t.Fragment,null,t.createElement(s.Body,null,"My Body",[...Array(20)].map((a,e)=>t.createElement("p",{key:e},"scrollable content ",e))),t.createElement(s.Footer,null,"My Footer"))}},n={...r,play:async({canvasElement:a})=>{const e=T(a);o(e.queryByText(/my title/i)).toBeNull(),l.click(e.getByRole("button")),o(e.getByText(/my title/i)).toBeInTheDocument(),o(e.getByText(/scrollable content 0/i)).toBeInTheDocument(),o(e.getByText(/my footer/i)).toBeInTheDocument(),l.click(e.getByLabelText("close"))}};var i,m,p;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    title: "My Title",
    children: <>
        <Drawer.Body>
          My Body
          {[...Array(20)].map((_, i) =>
        // eslint-disable-next-line react/no-array-index-key
        <p key={i}>scrollable content {i}</p>)}
        </Drawer.Body>
        <Drawer.Footer>My Footer</Drawer.Footer>
      </>
  }
}`,...(p=(m=r.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var y,u,d;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  ...Basic,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Verify drawer doesn't show right away.
    expect(canvas.queryByText(/my title/i)).toBeNull();

    // Open drawer and verify our three areas appear.
    userEvent.click(canvas.getByRole("button"));
    expect(canvas.getByText(/my title/i)).toBeInTheDocument();
    expect(canvas.getByText(/scrollable content 0/i)).toBeInTheDocument();
    expect(canvas.getByText(/my footer/i)).toBeInTheDocument();
    userEvent.click(canvas.getByLabelText("close"));
  }
}`,...(d=(u=n.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};const R=["Basic","Test"];export{r as Basic,n as Test,R as __namedExportsOrder,_ as default};
//# sourceMappingURL=drawer.stories-d24c2515.js.map

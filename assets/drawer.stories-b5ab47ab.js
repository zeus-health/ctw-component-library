import{r as p,R as t}from"./index-6f814c40.js";import{w as u,e as a,u as l}from"./index-9d91a283.js";import{q as s}from"./drawer-39fcad7e.js";import"./_commonjsHelpers-042e6b4d.js";import"./isEqual-298b6ab1.js";import"./_baseIsEqual-7d59e24c.js";import"./_equalByTag-eda72788.js";import"./uniq-8676ca12.js";import"./_createSet-6ff8e1d4.js";import"./index-63320c34.js";import"./index-356e4a49.js";import"./index-74f03c09.js";import"./index-6de6b113.js";const I={component:s,tags:["autodocs"],decorators:[(r,{args:e})=>{const[y,c]=p.useState(!1);return t.createElement("div",{id:"headlessui-portal-root"},t.createElement("button",{type:"button",className:"ctw-btn-primary",onClick:()=>c(!0)},"Open"),t.createElement(r,{args:{...e,isOpen:y,onClose:()=>c(!1)}}))}]},o={args:{title:"My Title",children:t.createElement(t.Fragment,null,t.createElement(s.Body,null,"My Body",[...Array(20)].map((r,e)=>t.createElement("p",{key:e},"scrollable content ",e))),t.createElement(s.Footer,null,"My Footer"))}},n={...o,play:async({canvasElement:r})=>{const e=u(r);a(e.queryByText(/my title/i)).toBeNull(),l.click(e.getByRole("button")),a(e.getByText(/my title/i)).toBeInTheDocument(),a(e.getByText(/scrollable content 0/i)).toBeInTheDocument(),a(e.getByText(/my footer/i)).toBeInTheDocument(),l.click(e.getByLabelText("close"))}};var i;o.parameters={...o.parameters,storySource:{source:`{
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
}`,...(i=o.parameters)==null?void 0:i.storySource}};var m;n.parameters={...n.parameters,storySource:{source:`{
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
}`,...(m=n.parameters)==null?void 0:m.storySource}};const F=["Basic","Test"];export{o as Basic,n as Test,F as __namedExportsOrder,I as default};
//# sourceMappingURL=drawer.stories-b5ab47ab.js.map

import{r as p,R as t}from"./index-6f814c40.js";import{w as u,e as a,u as l}from"./index-bfcf882f.js";import{D as s}from"./drawer-6b4601a7.js";import"./_commonjsHelpers-042e6b4d.js";import"./isEqual-f880f949.js";import"./_baseIsEqual-87615994.js";import"./_getTag-f6946e3e.js";import"./uniq-838ae00f.js";import"./noop-640bb2f2.js";import"./_createSet-958401e2.js";import"./index-63320c34.js";import"./index-356e4a49.js";import"./index-74f03c09.js";import"./index-6de6b113.js";const F={component:s,tags:["docsPage"],decorators:[(r,{args:e})=>{const[y,c]=p.useState(!1);return t.createElement("div",{id:"headlessui-portal-root"},t.createElement("button",{type:"button",className:"ctw-btn-primary",onClick:()=>c(!0)},"Open"),t.createElement(r,{args:{...e,isOpen:y,onClose:()=>c(!1)}}))}]},o={args:{title:"My Title",children:t.createElement(t.Fragment,null,t.createElement(s.Body,null,"My Body",[...Array(20)].map((r,e)=>t.createElement("p",{key:e},"scrollable content ",e))),t.createElement(s.Footer,null,"My Footer"))}},n={...o,play:async({canvasElement:r})=>{const e=u(r);a(e.queryByText(/my title/i)).toBeNull(),l.click(e.getByRole("button")),a(e.getByText(/my title/i)).toBeInTheDocument(),a(e.getByText(/scrollable content 0/i)).toBeInTheDocument(),a(e.getByText(/my footer/i)).toBeInTheDocument(),l.click(e.getByLabelText("close"))}};var i;o.parameters={...o.parameters,storySource:{source:`{
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
}`,...(m=n.parameters)==null?void 0:m.storySource}};const M=["Basic","Test"];export{o as Basic,n as Test,M as __namedExportsOrder,F as default};
//# sourceMappingURL=drawer.stories-bc8737d8.js.map

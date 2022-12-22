import{r as p,R as t}from"./index.9f56b196.js";import{w as u,e as a,u as l}from"./index.ca42fc8a.js";import{q as s}from"./drawer.0ebe46ba.js";import"./_commonjsHelpers.712cc82f.js";import"./uniq.c20be972.js";import"./_baseIsEqual.8bbd230a.js";import"./_getTag.bb1fd64c.js";import"./index.4b267bee.js";import"./index.67736049.js";import"./index.d3b8680b.js";import"./index.f2b75861.js";const f={component:s,tags:["docsPage"],decorators:[(r,{args:e})=>{const[m,c]=p.exports.useState(!1);return t.createElement("div",{id:"headlessui-portal-root"},t.createElement("button",{type:"button",className:"ctw-btn-primary",onClick:()=>c(!0)},"Open"),t.createElement(r,{args:{...e,isOpen:m,onClose:()=>c(!1)}}))}]},o={args:{title:"My Title",children:t.createElement(t.Fragment,null,t.createElement(s.Body,null,"My Body",[...Array(20)].map((r,e)=>t.createElement("p",{key:e},"scrollable content ",e))),t.createElement(s.Footer,null,"My Footer"))}},n={...o,play:async({canvasElement:r})=>{const e=u(r);a(e.queryByText(/my title/i)).toBeNull(),l.click(e.getByRole("button")),a(e.getByText(/my title/i)).toBeInTheDocument(),a(e.getByText(/scrollable content 0/i)).toBeInTheDocument(),a(e.getByText(/my footer/i)).toBeInTheDocument(),l.click(e.getByLabelText("close"))}};var i;o.parameters={...o.parameters,storySource:{source:`{
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
}`,...(i=o.parameters)==null?void 0:i.storySource}};var y;n.parameters={...n.parameters,storySource:{source:`{
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
}`,...(y=n.parameters)==null?void 0:y.storySource}};const k=["Basic","Test"];export{o as Basic,n as Test,k as __namedExportsOrder,f as default};
//# sourceMappingURL=drawer.stories.fa2ea262.js.map

import{R as y}from"./index.9f56b196.js";import{w as c,u as a,a as O,b as g,e as d}from"./index.ca42fc8a.js";import{C as I,a as D,P,S as W}from"./index.f8d597ae.js";import{s as L,o as j,p as q}from"./requests.e2b2afaf.js";import"./_commonjsHelpers.712cc82f.js";import"./uniq.c20be972.js";import"./_baseIsEqual.8bbd230a.js";import"./_getTag.bb1fd64c.js";import"./index.4b267bee.js";import"./index.67736049.js";import"./index.d3b8680b.js";import"./table.6dce43b2.js";import"./spinner.51ecf2bb.js";import"./index.7dcc3bb2.js";import"./extends.bed14d96.js";import"./drawer.0ebe46ba.js";import"./index.f2b75861.js";import"./data-list.6d7c3503.js";import"./action-list.8d2557fc.js";function T(n){const t=c(n),o=c(t.getByRole("dialog"));return{conditionSearch:e=>a.type(o.getByPlaceholderText("Type to search"),e),selectCondition:async e=>a.click(await o.findByRole("option",{name:e})),clinicalStatus:e=>a.selectOptions(o.getByLabelText("Clinical Status"),e),verificationStatus:e=>a.selectOptions(o.getByLabelText("Verification Status"),e),onset:e=>a.type(o.getByLabelText("Onset"),e),abatement:e=>a.type(o.getByLabelText("Abatement"),e),note:e=>a.type(o.getByLabelText("Note"),e),cancel:()=>a.click(o.getByRole("button",{name:"Cancel"})),save:async()=>{a.click(o.getByRole("button",{name:"Save"})),await O(()=>t.queryByRole("dialog"))}}}function h(n,t){const o=c(n),e=c(t);async function s(i){a.click(b(i).getByRole("button",{name:/dropdown/i})),await o.findAllByRole("menuitem")}function p(i){a.click(o.getByRole("menuitem",{name:i}))}function b(i){const l=e.getAllByRole("rowgroup")[1];return c(c(l).queryAllByRole("row")[i])}return{table:e,toHaveRowCount:async i=>{const l=e.getAllByRole("rowgroup")[1];i===0?await g(()=>d(l).toBeFalsy()):await g(()=>d(c(l).queryAllByRole("row")).toHaveLength(i))},toHaveRowWithText:(i,l)=>{b(i).getByText(l)},add:async i=>{await s(i),p("Add")},delete:async i=>{await s(i),p("Delete"),a.click(await o.findByRole("button",{name:/remove/i})),await O(()=>o.queryByRole("dialog"))},edit:async i=>{await s(i),p("Edit")},viewHistory:async i=>{await s(i),p("View History")}}}async function w(n){const t=c(n);await g(()=>d(t.queryAllByRole("table")).toHaveLength(2));const o=t.queryAllByRole("table"),e=h(n,o[0]),s=h(n,o[1]);return await e.table.findAllByText("active"),await s.table.findAllByText("active"),{clickAddCondition:()=>a.click(t.getByRole("button",{name:"+ Add Condition"})),toggleInactive:()=>a.click(t.getByLabelText("Include Inactive")),patientRecord:e,otherProvider:s}}const f={resourceType:"Bundle",id:"eacb4f45-4e83-45db-9114-7d3e05eb1fb3",meta:{lastUpdated:"2022-11-16T15:13:00.795+00:00"},type:"searchset",total:0,entry:[]},at={component:I,tags:["docsPage"],argTypes:{className:{options:["Blank","Fixed Width"],control:"select",mapping:{Blank:"","Fixed Width":"ctw-m-auto ctw-max-w-[600px]"}}},args:{className:"Blank",readOnly:!1},decorators:[(n,{args:t})=>y.createElement(D,{env:"dev",authToken:"dummy-token",builderId:"b123"},y.createElement(P,{patientID:"u12345",systemURL:W},y.createElement(n,{args:t})))]},r={...L({otherConditions:j,patientConditions:q})},m={...L({otherConditions:f,patientConditions:f})},u={...r,play:async({canvasElement:n})=>{const t=await w(n);await t.patientRecord.toHaveRowCount(2);const o="Heart failure (disorder)";t.clickAddCondition();const e=T(n);e.conditionSearch("heart"),await e.selectCondition(o),e.onset("2020-02-14"),await e.save(),await t.patientRecord.toHaveRowCount(3),d(await t.patientRecord.table.findByText(o)).toBeTruthy()}},R={...r,play:async({canvasElement:n})=>{const t=await w(n);await t.patientRecord.toHaveRowCount(2),await t.otherProvider.add(2),await T(n).save(),await t.patientRecord.toHaveRowCount(3),d(await t.patientRecord.table.findByText(/iron deficiency/i)).toBeTruthy()}},v={...r,play:async({canvasElement:n})=>{const t=await w(n);await t.patientRecord.toHaveRowCount(2),await t.patientRecord.edit(0);const o=T(n);o.verificationStatus("Confirmed"),o.note("hello world"),await o.save(),t.patientRecord.toHaveRowWithText(0,/confirmed/i)}},B={...r,play:async({canvasElement:n})=>{const t=await w(n);await t.patientRecord.toHaveRowCount(2),await t.patientRecord.delete(0),await t.patientRecord.toHaveRowCount(1),t.toggleInactive(),await t.patientRecord.toHaveRowCount(3),t.patientRecord.toHaveRowWithText(0,/entered-in-error/i),t.toggleInactive(),await t.patientRecord.toHaveRowCount(1)}},C={...r,play:async({canvasElement:n})=>{const t=await w(n);await t.patientRecord.toHaveRowCount(2),await t.patientRecord.viewHistory(0);const o=c(n),e=c(o.getByRole("dialog"));d(await e.findByText(/generalized anxiety disorder/i)).toBeTruthy(),d(e.getAllByRole("button",{name:/details/i})).toHaveLength(3),a.click(e.getAllByRole("button",{name:/close/i})[0])}};var H;r.parameters={...r.parameters,storySource:{source:`{
  ...setupConditionMocks({
    otherConditions,
    patientConditions
  })
}`,...(H=r.parameters)==null?void 0:H.storySource}};var x;m.parameters={...m.parameters,storySource:{source:`{
  ...setupConditionMocks({
    otherConditions: emptyConditions,
    patientConditions: emptyConditions
  })
}`,...(x=m.parameters)==null?void 0:x.storySource}};var S;u.parameters={...u.parameters,storySource:{source:`{
  ...Basic,
  play: async ({
    canvasElement
  }) => {
    const conditions = await conditionsObject(canvasElement);
    await conditions.patientRecord.toHaveRowCount(2);
    const newCondition = "Heart failure (disorder)";
    conditions.clickAddCondition();
    const conditionForm = conditionFormDrawer(canvasElement);
    conditionForm.conditionSearch("heart");
    await conditionForm.selectCondition(newCondition);
    conditionForm.onset("2020-02-14");
    await conditionForm.save();
    await conditions.patientRecord.toHaveRowCount(3);
    expect(await conditions.patientRecord.table.findByText(newCondition)).toBeTruthy();
  }
}`,...(S=u.parameters)==null?void 0:S.storySource}};var A;R.parameters={...R.parameters,storySource:{source:`{
  ...Basic,
  play: async ({
    canvasElement
  }) => {
    const conditions = await conditionsObject(canvasElement);
    await conditions.patientRecord.toHaveRowCount(2);
    await conditions.otherProvider.add(2);
    const conditionForm = conditionFormDrawer(canvasElement);
    await conditionForm.save();
    await conditions.patientRecord.toHaveRowCount(3);
    expect(await conditions.patientRecord.table.findByText(/iron deficiency/i)).toBeTruthy();
  }
}`,...(A=R.parameters)==null?void 0:A.storySource}};var F;v.parameters={...v.parameters,storySource:{source:`{
  ...Basic,
  play: async ({
    canvasElement
  }) => {
    const conditions = await conditionsObject(canvasElement);
    await conditions.patientRecord.toHaveRowCount(2);
    await conditions.patientRecord.edit(0);
    const conditionForm = conditionFormDrawer(canvasElement);
    conditionForm.verificationStatus("Confirmed");
    conditionForm.note("hello world");
    await conditionForm.save();
    conditions.patientRecord.toHaveRowWithText(0, /confirmed/i);
  }
}`,...(F=v.parameters)==null?void 0:F.storySource}};var k;B.parameters={...B.parameters,storySource:{source:`{
  ...Basic,
  play: async ({
    canvasElement
  }) => {
    const conditions = await conditionsObject(canvasElement);
    await conditions.patientRecord.toHaveRowCount(2);
    await conditions.patientRecord.delete(0);
    await conditions.patientRecord.toHaveRowCount(1);
    conditions.toggleInactive();
    await conditions.patientRecord.toHaveRowCount(3);
    conditions.patientRecord.toHaveRowWithText(0, /entered-in-error/i);
    conditions.toggleInactive();
    await conditions.patientRecord.toHaveRowCount(1);
  }
}`,...(k=B.parameters)==null?void 0:k.storySource}};var E;C.parameters={...C.parameters,storySource:{source:`{
  ...Basic,
  play: async ({
    canvasElement
  }) => {
    const conditions = await conditionsObject(canvasElement);
    await conditions.patientRecord.toHaveRowCount(2);
    await conditions.patientRecord.viewHistory(0);
    const canvas = within(canvasElement);
    const drawer = within(canvas.getByRole("dialog"));
    expect(await drawer.findByText(/generalized anxiety disorder/i)).toBeTruthy();
    expect(drawer.getAllByRole("button", {
      name: /details/i
    })).toHaveLength(3);
    userEvent.click(drawer.getAllByRole("button", {
      name: /close/i
    })[0]);
  }
}`,...(E=C.parameters)==null?void 0:E.storySource}};const ct=["Basic","Empty","TestAdd","TestAddOther","TestEdit","TestDelete","TestViewHistory"];export{r as Basic,m as Empty,u as TestAdd,R as TestAddOther,B as TestDelete,v as TestEdit,C as TestViewHistory,ct as __namedExportsOrder,at as default};
//# sourceMappingURL=conditions.stories.f28633c3.js.map

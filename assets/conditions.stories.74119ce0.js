import{d as p}from"./index.68c597bb.js";import{w as c,u as n,a as v,b as u,e as s}from"./index.aa5d4fa6.js";import{C as b,a as f,P as C,S as h}from"./index.8fc91b8e.js";import{s as T,o as x,p as H}from"./requests.072fa45f.js";import"./iframe.70e42b1e.js";import"./uniq.73574905.js";import"./index.4993e590.js";import"./index.d3b8680b.js";import"./table.1dcd0a23.js";import"./spinner.209a3b7d.js";import"./index.899a5313.js";import"./drawer.676ac87e.js";import"./index.e2186c3d.js";import"./extends.946277fc.js";import"./data-list.276f63d1.js";import"./action-list.dbde1bfa.js";function R(a){const t=c(a),o=c(t.getByRole("dialog"));return{conditionSearch:e=>n.type(o.getByPlaceholderText("Type to search"),e),selectCondition:async e=>n.click(await o.findByRole("option",{name:e})),clinicalStatus:e=>n.selectOptions(o.getByLabelText("Clinical Status"),e),verificationStatus:e=>n.selectOptions(o.getByLabelText("Verification Status"),e),onset:e=>n.type(o.getByLabelText("Onset"),e),abatement:e=>n.type(o.getByLabelText("Abatement"),e),note:e=>n.type(o.getByLabelText("Note"),e),cancel:()=>n.click(o.getByRole("button",{name:"Cancel"})),save:async()=>{n.click(o.getByRole("button",{name:"Save"})),await v(()=>t.queryByRole("dialog"))}}}function B(a,t){const o=c(a),e=c(t);async function r(i){n.click(m(i).getByRole("button",{name:/dropdown/i})),await o.findAllByRole("menuitem")}function w(i){n.click(o.getByRole("menuitem",{name:i}))}function m(i){const d=e.getAllByRole("rowgroup")[1];return c(c(d).queryAllByRole("row")[i])}return{table:e,toHaveRowCount:async i=>{const d=e.getAllByRole("rowgroup")[1];i===0?await u(()=>s(d).toBeFalsy()):await u(()=>s(c(d).queryAllByRole("row")).toHaveLength(i))},toHaveRowWithText:(i,d)=>{m(i).getByText(d)},add:async i=>{await r(i),w("Add")},delete:async i=>{await r(i),w("Delete"),n.click(await o.findByRole("button",{name:/remove/i})),await v(()=>o.queryByRole("dialog"))},edit:async i=>{await r(i),w("Edit")},viewHistory:async i=>{await r(i),w("View History")}}}async function l(a){const t=c(a);await u(()=>s(t.queryAllByRole("table")).toHaveLength(2));const o=t.queryAllByRole("table"),e=B(a,o[0]),r=B(a,o[1]);return await e.table.findAllByText("active"),await r.table.findAllByText("active"),{clickAddCondition:()=>n.click(t.getByRole("button",{name:"+ Add Condition"})),toggleInactive:()=>n.click(t.getByLabelText("Include Inactive")),patientRecord:e,otherProvider:r}}const g={resourceType:"Bundle",id:"eacb4f45-4e83-45db-9114-7d3e05eb1fb3",meta:{lastUpdated:"2022-11-16T15:13:00.795+00:00"},type:"searchset",total:0,entry:[]},U={component:b,tags:["docsPage"],argTypes:{className:{options:["Blank","Fixed Width"],control:"select",mapping:{Blank:"","Fixed Width":"ctw-m-auto ctw-max-w-[600px]"}}},args:{className:"Blank",readOnly:!1},decorators:[(a,{args:t})=>p.createElement(f,{env:"dev",authToken:"dummy-token",builderId:"b123"},p.createElement(C,{patientID:"u12345",systemURL:h},p.createElement(a,{args:t})))]},y={...T({otherConditions:x,patientConditions:H})},j={...T({otherConditions:g,patientConditions:g})},z={...y,play:async({canvasElement:a})=>{const t=await l(a);await t.patientRecord.toHaveRowCount(2);const o="Heart failure (disorder)";t.clickAddCondition();const e=R(a);e.conditionSearch("heart"),await e.selectCondition(o),e.onset("2020-02-14"),await e.save(),await t.patientRecord.toHaveRowCount(3),s(await t.patientRecord.table.findByText(o)).toBeTruthy()}},Y={...y,play:async({canvasElement:a})=>{const t=await l(a);await t.patientRecord.toHaveRowCount(2),await t.otherProvider.add(2),await R(a).save(),await t.patientRecord.toHaveRowCount(3),s(await t.patientRecord.table.findByText(/iron deficiency/i)).toBeTruthy()}},Z={...y,play:async({canvasElement:a})=>{const t=await l(a);await t.patientRecord.toHaveRowCount(2),await t.patientRecord.edit(0);const o=R(a);o.verificationStatus("Confirmed"),o.note("hello world"),await o.save(),t.patientRecord.toHaveRowWithText(0,/confirmed/i)}},G={...y,play:async({canvasElement:a})=>{const t=await l(a);await t.patientRecord.toHaveRowCount(2),await t.patientRecord.delete(0),await t.patientRecord.toHaveRowCount(1),t.toggleInactive(),await t.patientRecord.toHaveRowCount(3),t.patientRecord.toHaveRowWithText(0,/entered-in-error/i),t.toggleInactive(),await t.patientRecord.toHaveRowCount(1)}},J={...y,play:async({canvasElement:a})=>{const t=await l(a);await t.patientRecord.toHaveRowCount(2),await t.patientRecord.viewHistory(0);const o=c(a),e=c(o.getByRole("dialog"));s(await e.findByText(/generalized anxiety disorder/i)).toBeTruthy(),s(e.getAllByRole("button",{name:/details/i})).toHaveLength(3),n.click(e.getAllByRole("button",{name:/close/i})[0])}},K=["Basic","Empty","TestAdd","TestAddOther","TestEdit","TestDelete","TestViewHistory"];export{y as Basic,j as Empty,z as TestAdd,Y as TestAddOther,G as TestDelete,Z as TestEdit,J as TestViewHistory,K as __namedExportsOrder,U as default};
//# sourceMappingURL=conditions.stories.74119ce0.js.map

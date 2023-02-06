import{R as w}from"./index-6f814c40.js";import{w as n,u as c,b as v,e as d}from"./index-f5b5f689.js";import{s as A,p as H,o as g}from"./requests-d87f8afe.js";import{al as C,C as P,a as x,S as F}from"./patient-allergies-3285c6d6.js";import"./_commonjsHelpers-042e6b4d.js";import"./isEqual-1a694167.js";import"./_baseIsEqual-4482d138.js";import"./_equalByTag-2573c09c.js";import"./uniq-38208ea9.js";import"./_baseUniq-701deb29.js";import"./_createSet-00935424.js";import"./index-63320c34.js";import"./index-356e4a49.js";import"./action-list-ada7e7df.js";import"./index-74f03c09.js";import"./sortBy-7530ff7d.js";import"./_baseForOwn-0b302854.js";import"./_baseToString-5e23e5e6.js";import"./_baseClone-59dfd81b.js";import"./toNumber-4334224f.js";import"./isPlainObject-d68c8411.js";import"./_basePickBy-d4bc7435.js";import"./mapValues-3edfa6db.js";import"./request-47bfd586.js";import"./drawer-51532557.js";import"./index-6de6b113.js";import"./_commonjs-dynamic-modules-302442b1.js";import"./table-7a0d2d89.js";import"./spinner-66aa4ba7.js";import"./data-list-254aa0b0.js";import"./pickBy-84392494.js";import"./isString-45b38206.js";import"./debounce-c94122dc.js";function m(o){const t=n(o),a=n(t.getByRole("dialog"));return{search:e=>c.type(a.getByPlaceholderText("Type to search"),e),selectMedication:async e=>c.click(await a.findByRole("option",{name:e})),status:e=>c.selectOptions(a.getByTestId("form-field-status"),e),instructions:e=>c.type(a.getByLabelText("Instructions"),e),cancel:()=>c.click(a.getByRole("button",{name:"Cancel"})),save:async()=>{c.click(a.getByRole("button",{name:"Save"}))}}}async function y(o){const t=n(o);await v(()=>d(t.queryAllByRole("table")).toHaveLength(2));const a=t.queryAllByRole("table"),e=R(o,a[0]),i=R(o,a[1]);return{patientRecord:e,otherProvider:i,clickAddMedication:()=>c.click(t.getByRole("button",{name:"+ Add Medication"}))}}function R(o,t){async function a(i,r){c.hover(e(i)),c.click(n(e(i)).getByTestId(r))}function e(i){const r=n(t).getAllByRole("rowgroup")[1];return n(r).queryAllByRole("row")[i]}return{table:n(t),toHaveRowCount:async i=>{i===0?await v(()=>{const r=n(t).getAllByRole("rowgroup")[1];d(r).toBeFalsy()}):await v(()=>{const r=n(t).getAllByRole("rowgroup")[1];d(n(r).queryAllByRole("row")).toHaveLength(i)})},toHaveRowWithText:(i,r)=>n(e(i)).getByText(r),toHaveAnyRowWithText:async i=>{const r=await n(t).getAllByRole("rowgroup")[1];d(n(r).getAllByRole("row").some(b=>!!n(b).queryByText(i))).toBeTruthy()},addToRecord:i=>a(i,"add-to-record")}}const N=o=>new Promise(t=>{setTimeout(t,o)}),mt={tags:["autodocs"],component:C,decorators:[(o,{args:t})=>w.createElement(P,{env:"dev",authToken:"ey.12345",builderId:"12345"},w.createElement(x,{patientID:"007",systemURL:F},w.createElement(o,{args:t})))]},s={...A({providerMedications:H,otherProviderMedications:g})},l={...s,play:async({canvasElement:o})=>{const t=await y(o);await t.patientRecord.toHaveRowCount(1);const a="albendazole 200 MG Oral Tablet [Albenza]";t.clickAddMedication();const e=m(o);e.search("alb"),await e.selectMedication(a),e.status("Active"),e.instructions("Take 2.3 every 3.14 hours, if dose is missed spin around 4.5 times"),await e.save(),await t.patientRecord.toHaveRowCount(2),d(await t.patientRecord.table.findByText(a)).toBeTruthy()}},p={...s,play:async({canvasElement:o})=>{const t=await y(o);await t.patientRecord.toHaveRowCount(1),await t.otherProvider.toHaveRowCount(4);let a="3 ML insulin aspart protamine, human 70 UNT/ML / insulin aspart, human 30 UNT/ML Pen Injector [NovoLog Mix]";t.otherProvider.toHaveRowWithText(0,a),await t.otherProvider.addToRecord(0),await m(o).save(),await t.patientRecord.toHaveRowCount(2),await t.otherProvider.toHaveRowCount(3),await t.patientRecord.toHaveAnyRowWithText(a),await N(1e3),a="3 ML insulin glargine 100 UNT/ML Pen Injector [Lantus]",t.otherProvider.toHaveRowWithText(0,a),await t.otherProvider.addToRecord(0),await m(o).save(),await t.patientRecord.toHaveRowCount(3),await t.otherProvider.toHaveRowCount(2),await t.patientRecord.toHaveAnyRowWithText(a)}},u={...s,play:async({canvasElement:o})=>{const t=await y(o);await t.patientRecord.toHaveRowCount(1);const a="cabozantinib 20 MG Oral Capsule [Cometriq]";t.clickAddMedication();const e=m(o);e.search("cab"),await e.selectMedication(a),e.status("Active"),await e.cancel(),await t.patientRecord.toHaveRowCount(1),d(await t.patientRecord.table.queryByText(a)).toBeFalsy()}};var M;s.parameters={...s.parameters,storySource:{source:`{
  ...setupMedicationMocks({
    providerMedications,
    otherProviderMedications
  })
}`,...(M=s.parameters)==null?void 0:M.storySource}};var T;l.parameters={...l.parameters,storySource:{source:`{
  ...Basic,
  play: async ({
    canvasElement
  }) => {
    const medications = await medicationsTables(canvasElement);
    await medications.patientRecord.toHaveRowCount(1);
    const newMedication = "albendazole 200 MG Oral Tablet [Albenza]";
    medications.clickAddMedication();
    const addMedicationForm = medicationFormDrawer(canvasElement);
    addMedicationForm.search("alb");
    await addMedicationForm.selectMedication(newMedication);
    addMedicationForm.status("Active");
    addMedicationForm.instructions("Take 2.3 every 3.14 hours, if dose is missed spin around 4.5 times");
    await addMedicationForm.save();
    await medications.patientRecord.toHaveRowCount(2);
    expect(await medications.patientRecord.table.findByText(newMedication)).toBeTruthy();
  }
}`,...(T=l.parameters)==null?void 0:T.storySource}};var h;p.parameters={...p.parameters,storySource:{source:`{
  ...Basic,
  play: async ({
    canvasElement
  }) => {
    const medications = await medicationsTables(canvasElement);
    await medications.patientRecord.toHaveRowCount(1);
    await medications.otherProvider.toHaveRowCount(4);
    let medicationName = "3 ML insulin aspart protamine, human 70 UNT/ML / insulin aspart, human 30 UNT/ML Pen Injector [NovoLog Mix]";
    medications.otherProvider.toHaveRowWithText(0, medicationName);
    await medications.otherProvider.addToRecord(0);
    await medicationFormDrawer(canvasElement).save();
    await medications.patientRecord.toHaveRowCount(2);
    await medications.otherProvider.toHaveRowCount(3);
    await medications.patientRecord.toHaveAnyRowWithText(medicationName);
    await delay(1000);
    medicationName = "3 ML insulin glargine 100 UNT/ML Pen Injector [Lantus]";
    // Test adding a second medication from other provider records.
    medications.otherProvider.toHaveRowWithText(0, medicationName);
    await medications.otherProvider.addToRecord(0);
    await medicationFormDrawer(canvasElement).save();
    await medications.patientRecord.toHaveRowCount(3);
    await medications.otherProvider.toHaveRowCount(2);
    await medications.patientRecord.toHaveAnyRowWithText(medicationName);
  }
}`,...(h=p.parameters)==null?void 0:h.storySource}};var B;u.parameters={...u.parameters,storySource:{source:`{
  ...Basic,
  play: async ({
    canvasElement
  }) => {
    const medications = await medicationsTables(canvasElement);
    await medications.patientRecord.toHaveRowCount(1);
    const newMedication = "cabozantinib 20 MG Oral Capsule [Cometriq]";
    medications.clickAddMedication();
    const addMedicationForm = medicationFormDrawer(canvasElement);
    addMedicationForm.search("cab");
    await addMedicationForm.selectMedication(newMedication);
    addMedicationForm.status("Active");
    await addMedicationForm.cancel();
    await medications.patientRecord.toHaveRowCount(1);
    expect(await medications.patientRecord.table.queryByText(newMedication)).toBeFalsy();
  }
}`,...(B=u.parameters)==null?void 0:B.storySource}};const wt=["Basic","TestAddNewMed","TestAddToRecord","TestCancelAddNewMed"];export{s as Basic,l as TestAddNewMed,p as TestAddToRecord,u as TestCancelAddNewMed,wt as __namedExportsOrder,mt as default};
//# sourceMappingURL=patient-medications.stories-a13c08d2.js.map

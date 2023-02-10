import{R as m}from"./index-6f814c40.js";import{w as n,u as c,b as y,e as d}from"./index-9d91a283.js";import{s as H,p as C,o as x}from"./requests-dd07d129.js";import{ar as F,C as f,a as P,S as k}from"./patient-allergies-21203581.js";import"./_commonjsHelpers-042e6b4d.js";import"./isEqual-298b6ab1.js";import"./_baseIsEqual-7d59e24c.js";import"./_equalByTag-eda72788.js";import"./uniq-8676ca12.js";import"./_createSet-6ff8e1d4.js";import"./index-63320c34.js";import"./index-356e4a49.js";import"./action-list-fa5a295c.js";import"./index-74f03c09.js";import"./sortBy-a390368e.js";import"./_baseForOwn-7324d3a8.js";import"./_baseToString-7c0e3f59.js";import"./_baseClone-17ec433b.js";import"./toNumber-d7ce3bd9.js";import"./isPlainObject-f51be120.js";import"./_basePickBy-fa3aec3b.js";import"./mapValues-13598fe6.js";import"./request-47bfd586.js";import"./drawer-39fcad7e.js";import"./index-6de6b113.js";import"./_commonjs-dynamic-modules-302442b1.js";import"./table-bda62b29.js";import"./spinner-66aa4ba7.js";import"./data-list-254aa0b0.js";import"./extends-b0154772.js";import"./isString-933c0e0c.js";import"./debounce-5029c56d.js";function R(o){const t=n(o),a=n(t.getByRole("dialog"));return{search:e=>c.type(a.getByPlaceholderText("Type to search"),e),selectMedication:async e=>c.click(await a.findByRole("option",{name:e})),status:e=>c.selectOptions(a.getByTestId("form-field-status"),e),instructions:e=>c.type(a.getByLabelText("Instructions"),e),cancel:()=>c.click(a.getByRole("button",{name:"Cancel"})),save:async()=>{c.click(a.getByRole("button",{name:"Save"}))}}}async function v(o){const t=n(o);await y(()=>d(t.queryAllByRole("table")).toHaveLength(2));const a=t.queryAllByRole("table"),e=M(o,a[0]),i=M(o,a[1]);return{patientRecord:e,otherProvider:i,clickAddMedication:()=>c.click(t.getByRole("button",{name:"+ Add Medication"}))}}function M(o,t){async function a(i,r){c.hover(e(i)),c.click(n(e(i)).getByTestId(r))}function e(i){const r=n(t).getAllByRole("rowgroup")[1];return n(r).queryAllByRole("row")[i]}return{table:n(t),toHaveRowCount:async i=>{i===0?await y(()=>{const r=n(t).getAllByRole("rowgroup")[1];d(r).toBeFalsy()}):await y(()=>{const r=n(t).getAllByRole("rowgroup")[1];d(n(r).queryAllByRole("row")).toHaveLength(i)})},toHaveRowWithText:(i,r)=>n(e(i)).getByText(r),toHaveAnyRowWithText:async i=>{const r=await n(t).getAllByRole("rowgroup")[1];d(n(r).getAllByRole("row").some(g=>!!n(g).queryByText(i))).toBeTruthy()},addToRecord:i=>a(i,"add-to-record")}}const mt={tags:["autodocs"],component:F,decorators:[(o,{args:t})=>m.createElement(f,{env:"dev",authToken:"ey.12345",builderId:"12345"},m.createElement(P,{patientID:"007",systemURL:k},m.createElement(o,{args:t})))]},s={...H({providerMedications:C,otherProviderMedications:x})},l={...s,args:{hideAddToRecord:!0}},p={...s,play:async({canvasElement:o})=>{const t=await v(o);await t.patientRecord.toHaveRowCount(1);const a="albendazole 200 MG Oral Tablet [Albenza]";t.clickAddMedication();const e=R(o);e.search("alb"),await e.selectMedication(a),e.status("Active"),e.instructions("Take 2.3 every 3.14 hours, if dose is missed spin around 4.5 times"),await e.save(),await t.patientRecord.toHaveRowCount(2),d(await t.patientRecord.table.findByText(a)).toBeTruthy()}},w={...s,play:async({canvasElement:o})=>{const t=await v(o);await t.patientRecord.toHaveRowCount(1),await t.otherProvider.toHaveRowCount(4);const a="3 ML insulin aspart protamine, human 70 UNT/ML / insulin aspart, human 30 UNT/ML Pen Injector [NovoLog Mix]";t.otherProvider.toHaveRowWithText(0,a),await t.otherProvider.addToRecord(0),await R(o).save(),await t.patientRecord.toHaveRowCount(2),await t.otherProvider.toHaveRowCount(3),await t.patientRecord.toHaveAnyRowWithText(a)}},u={...s,play:async({canvasElement:o})=>{const t=await v(o);await t.patientRecord.toHaveRowCount(1);const a="cabozantinib 20 MG Oral Capsule [Cometriq]";t.clickAddMedication();const e=R(o);e.search("cab"),await e.selectMedication(a),e.status("Active"),await e.cancel(),await t.patientRecord.toHaveRowCount(1),d(await t.patientRecord.table.queryByText(a)).toBeFalsy()}};var T;s.parameters={...s.parameters,storySource:{source:`{
  ...setupMedicationMocks({
    providerMedications,
    otherProviderMedications
  })
}`,...(T=s.parameters)==null?void 0:T.storySource}};var h;l.parameters={...l.parameters,storySource:{source:`{
  ...Basic,
  args: {
    hideAddToRecord: true
  }
}`,...(h=l.parameters)==null?void 0:h.storySource}};var B;p.parameters={...p.parameters,storySource:{source:`{
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
}`,...(B=p.parameters)==null?void 0:B.storySource}};var A;w.parameters={...w.parameters,storySource:{source:`{
  ...Basic,
  play: async ({
    canvasElement
  }) => {
    const medications = await medicationsTables(canvasElement);
    await medications.patientRecord.toHaveRowCount(1);
    await medications.otherProvider.toHaveRowCount(4);
    const medicationName = "3 ML insulin aspart protamine, human 70 UNT/ML / insulin aspart, human 30 UNT/ML Pen Injector [NovoLog Mix]";
    medications.otherProvider.toHaveRowWithText(0, medicationName);
    await medications.otherProvider.addToRecord(0);
    await medicationFormDrawer(canvasElement).save();
    await medications.patientRecord.toHaveRowCount(2);
    await medications.otherProvider.toHaveRowCount(3);
    await medications.patientRecord.toHaveAnyRowWithText(medicationName);
  }
}`,...(A=w.parameters)==null?void 0:A.storySource}};var b;u.parameters={...u.parameters,storySource:{source:`{
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
}`,...(b=u.parameters)==null?void 0:b.storySource}};const lt=["Basic","HideAddToRecord","TestAddNewMed","TestAddToRecord","TestCancelAddNewMed"];export{s as Basic,l as HideAddToRecord,p as TestAddNewMed,w as TestAddToRecord,u as TestCancelAddNewMed,lt as __namedExportsOrder,mt as default};
//# sourceMappingURL=patient-medications.stories-b00d7799.js.map

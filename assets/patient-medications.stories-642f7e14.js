import{R as m}from"./index-6f814c40.js";import{w as n,u as c,b as u,e as s}from"./index-9d91a283.js";import{s as A,p as g,o as C}from"./requests-ee8c8313.js";import{ap as H,C as x,a as F,S as f}from"./patient-allergies-c16120af.js";import"./_commonjsHelpers-042e6b4d.js";import"./isEqual-298b6ab1.js";import"./_baseIsEqual-7d59e24c.js";import"./_equalByTag-eda72788.js";import"./uniq-8676ca12.js";import"./_createSet-6ff8e1d4.js";import"./index-63320c34.js";import"./index-356e4a49.js";import"./action-list-fa5a295c.js";import"./index-74f03c09.js";import"./sortBy-a390368e.js";import"./_baseForOwn-7324d3a8.js";import"./_baseToString-7c0e3f59.js";import"./_baseClone-17ec433b.js";import"./toNumber-d7ce3bd9.js";import"./isPlainObject-f51be120.js";import"./_basePickBy-fa3aec3b.js";import"./mapValues-13598fe6.js";import"./request-47bfd586.js";import"./drawer-39fcad7e.js";import"./index-6de6b113.js";import"./_commonjs-dynamic-modules-302442b1.js";import"./table-77997dbe.js";import"./spinner-66aa4ba7.js";import"./data-list-254aa0b0.js";import"./extends-b0154772.js";import"./isString-933c0e0c.js";import"./debounce-5029c56d.js";function y(o){const t=n(o),a=n(t.getByRole("dialog"));return{search:e=>c.type(a.getByPlaceholderText("Type to search"),e),selectMedication:async e=>c.click(await a.findByRole("option",{name:e})),status:e=>c.selectOptions(a.getByTestId("form-field-status"),e),instructions:e=>c.type(a.getByLabelText("Instructions"),e),cancel:()=>c.click(a.getByRole("button",{name:"Cancel"})),save:async()=>{c.click(a.getByRole("button",{name:"Save"}))}}}async function R(o){const t=n(o);await u(()=>s(t.queryAllByRole("table")).toHaveLength(2));const a=t.queryAllByRole("table"),e=v(o,a[0]),i=v(o,a[1]);return{patientRecord:e,otherProvider:i,clickAddMedication:()=>c.click(t.getByRole("button",{name:"+ Add Medication"}))}}function v(o,t){async function a(i,r){c.hover(e(i)),c.click(n(e(i)).getByTestId(r))}function e(i){const r=n(t).getAllByRole("rowgroup")[1];return n(r).queryAllByRole("row")[i]}return{table:n(t),toHaveRowCount:async i=>{i===0?await u(()=>{const r=n(t).getAllByRole("rowgroup")[1];s(r).toBeFalsy()}):await u(()=>{const r=n(t).getAllByRole("rowgroup")[1];s(n(r).queryAllByRole("row")).toHaveLength(i)})},toHaveRowWithText:(i,r)=>n(e(i)).getByText(r),toHaveAnyRowWithText:async i=>{const r=await n(t).getAllByRole("rowgroup")[1];s(n(r).getAllByRole("row").some(b=>!!n(b).queryByText(i))).toBeTruthy()},addToRecord:i=>a(i,"add-to-record")}}const st={tags:["autodocs"],component:H,decorators:[(o,{args:t})=>m.createElement(x,{env:"dev",authToken:"ey.12345",builderId:"12345"},m.createElement(F,{patientID:"007",systemURL:f},m.createElement(o,{args:t})))]},d={...A({providerMedications:g,otherProviderMedications:C})},l={...d,play:async({canvasElement:o})=>{const t=await R(o);await t.patientRecord.toHaveRowCount(1);const a="albendazole 200 MG Oral Tablet [Albenza]";t.clickAddMedication();const e=y(o);e.search("alb"),await e.selectMedication(a),e.status("Active"),e.instructions("Take 2.3 every 3.14 hours, if dose is missed spin around 4.5 times"),await e.save(),await t.patientRecord.toHaveRowCount(2),s(await t.patientRecord.table.findByText(a)).toBeTruthy()}},p={...d,play:async({canvasElement:o})=>{const t=await R(o);await t.patientRecord.toHaveRowCount(1),await t.otherProvider.toHaveRowCount(4);const a="3 ML insulin aspart protamine, human 70 UNT/ML / insulin aspart, human 30 UNT/ML Pen Injector [NovoLog Mix]";t.otherProvider.toHaveRowWithText(0,a),await t.otherProvider.addToRecord(0),await y(o).save(),await t.patientRecord.toHaveRowCount(2),await t.otherProvider.toHaveRowCount(3),await t.patientRecord.toHaveAnyRowWithText(a)}},w={...d,play:async({canvasElement:o})=>{const t=await R(o);await t.patientRecord.toHaveRowCount(1);const a="cabozantinib 20 MG Oral Capsule [Cometriq]";t.clickAddMedication();const e=y(o);e.search("cab"),await e.selectMedication(a),e.status("Active"),await e.cancel(),await t.patientRecord.toHaveRowCount(1),s(await t.patientRecord.table.queryByText(a)).toBeFalsy()}};var M;d.parameters={...d.parameters,storySource:{source:`{
  ...setupMedicationMocks({
    providerMedications,
    otherProviderMedications
  })
}`,...(M=d.parameters)==null?void 0:M.storySource}};var T;l.parameters={...l.parameters,storySource:{source:`{
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
    const medicationName = "3 ML insulin aspart protamine, human 70 UNT/ML / insulin aspart, human 30 UNT/ML Pen Injector [NovoLog Mix]";
    medications.otherProvider.toHaveRowWithText(0, medicationName);
    await medications.otherProvider.addToRecord(0);
    await medicationFormDrawer(canvasElement).save();
    await medications.patientRecord.toHaveRowCount(2);
    await medications.otherProvider.toHaveRowCount(3);
    await medications.patientRecord.toHaveAnyRowWithText(medicationName);
  }
}`,...(h=p.parameters)==null?void 0:h.storySource}};var B;w.parameters={...w.parameters,storySource:{source:`{
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
}`,...(B=w.parameters)==null?void 0:B.storySource}};const dt=["Basic","TestAddNewMed","TestAddToRecord","TestCancelAddNewMed"];export{d as Basic,l as TestAddNewMed,p as TestAddToRecord,w as TestCancelAddNewMed,dt as __namedExportsOrder,st as default};
//# sourceMappingURL=patient-medications.stories-642f7e14.js.map

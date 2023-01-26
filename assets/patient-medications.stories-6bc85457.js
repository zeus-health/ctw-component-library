import{R as w}from"./index-6f814c40.js";import{w as i,u as c,b as R,e as d}from"./index-4823fbbe.js";import{s as b,p as g,o as H}from"./requests-ea104b10.js";import{ae as C,C as P,a as x,S as F}from"./patient-allergies-9fc22f3f.js";import"./_commonjsHelpers-042e6b4d.js";import"./isEqual-298b6ab1.js";import"./_baseIsEqual-7d59e24c.js";import"./_equalByTag-eda72788.js";import"./uniq-7f4d3f30.js";import"./_arrayIncludes-66d8e0f7.js";import"./_createSet-541d31f8.js";import"./index-63320c34.js";import"./index-356e4a49.js";import"./action-list-b787174a.js";import"./index-74f03c09.js";import"./sortBy-7a463c81.js";import"./_baseForOwn-7324d3a8.js";import"./_baseToString-7c0e3f59.js";import"./_baseClone-17ec433b.js";import"./toNumber-d7ce3bd9.js";import"./isPlainObject-f51be120.js";import"./_basePickBy-78c03e5a.js";import"./mapValues-13598fe6.js";import"./request-47bfd586.js";import"./drawer-a8e46714.js";import"./index-6de6b113.js";import"./table-3aa1616d.js";import"./spinner-66aa4ba7.js";import"./_commonjs-dynamic-modules-302442b1.js";import"./data-list-254aa0b0.js";import"./isString-933c0e0c.js";import"./extends-e6dd785b.js";import"./debounce-5029c56d.js";function m(o){const t=i(o),e=i(t.getByRole("dialog"));return{search:a=>c.type(e.getByPlaceholderText("Type to search"),a),selectMedication:async a=>c.click(await e.findByRole("option",{name:a})),status:a=>c.selectOptions(e.getByTestId("form-field-status"),a),instructions:a=>c.type(e.getByLabelText("Instructions"),a),cancel:()=>c.click(e.getByRole("button",{name:"Cancel"})),save:async()=>{c.click(e.getByRole("button",{name:"Save"}))}}}async function y(o){const t=i(o);await R(()=>d(t.queryAllByRole("table")).toHaveLength(2));const e=t.queryAllByRole("table"),a=v(o,e[0]),n=v(o,e[1]);return{patientRecord:a,otherProvider:n,clickAddMedication:()=>c.click(t.getByRole("button",{name:"+ Add Medication"}))}}function v(o,t){async function e(n,r){c.click(a(n).getByRole("button",{name:/dropdown/i})),await i(o).findAllByRole("menuitem"),c.click(i(o).getByRole("menuitem",{name:r}))}function a(n){const r=i(t).getAllByRole("rowgroup")[1];return i(i(r).queryAllByRole("row")[n])}return{table:i(t),toHaveRowCount:async n=>{n===0?await R(()=>{const r=i(t).getAllByRole("rowgroup")[1];d(r).toBeFalsy()}):await R(()=>{const r=i(t).getAllByRole("rowgroup")[1];d(i(r).queryAllByRole("row")).toHaveLength(n)})},toHaveRowWithText:(n,r)=>a(n).getByText(r),toHaveAnyRowWithText:async n=>{const r=await i(t).getAllByRole("rowgroup")[1];d(i(r).getAllByRole("row").some(A=>!!i(A).queryByText(n))).toBeTruthy()},addToRecord:n=>e(n,"Add to Record")}}const f=o=>new Promise(t=>{setTimeout(t,o)}),mt={tags:["docsPage"],component:C,decorators:[(o,{args:t})=>w.createElement(P,{env:"dev",authToken:"ey.12345",builderId:"12345"},w.createElement(x,{patientID:"007",systemURL:F},w.createElement(o,{args:t})))]},s={...b({providerMedications:g,otherProviderMedications:H})},l={...s,play:async({canvasElement:o})=>{const t=await y(o);await t.patientRecord.toHaveRowCount(1);const e="albendazole 200 MG Oral Tablet [Albenza]";t.clickAddMedication();const a=m(o);a.search("alb"),await a.selectMedication(e),a.status("Active"),a.instructions("Take 2.3 every 3.14 hours, if dose is missed spin around 4.5 times"),await a.save(),await t.patientRecord.toHaveRowCount(2),d(await t.patientRecord.table.findByText(e)).toBeTruthy()}},p={...s,play:async({canvasElement:o})=>{const t=await y(o);await t.patientRecord.toHaveRowCount(1),await t.otherProvider.toHaveRowCount(4);let e="3 ML insulin aspart protamine, human 70 UNT/ML / insulin aspart, human 30 UNT/ML Pen Injector [NovoLog Mix]";t.otherProvider.toHaveRowWithText(0,e),await t.otherProvider.addToRecord(0),await m(o).save(),await t.patientRecord.toHaveRowCount(2),await t.otherProvider.toHaveRowCount(3),await t.patientRecord.toHaveAnyRowWithText(e),await f(1e3),e="3 ML insulin glargine 100 UNT/ML Pen Injector [Lantus]",t.otherProvider.toHaveRowWithText(0,e),await t.otherProvider.addToRecord(0),await m(o).save(),await t.patientRecord.toHaveRowCount(3),await t.otherProvider.toHaveRowCount(2),await t.patientRecord.toHaveAnyRowWithText(e)}},u={...s,play:async({canvasElement:o})=>{const t=await y(o);await t.patientRecord.toHaveRowCount(1);const e="cabozantinib 20 MG Oral Capsule [Cometriq]";t.clickAddMedication();const a=m(o);a.search("cab"),await a.selectMedication(e),a.status("Active"),await a.cancel(),await t.patientRecord.toHaveRowCount(1),d(await t.patientRecord.table.queryByText(e)).toBeFalsy()}};var M;s.parameters={...s.parameters,storySource:{source:`{
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
//# sourceMappingURL=patient-medications.stories-6bc85457.js.map

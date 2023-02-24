import{R as y}from"./index-6f814c40.js";import{w as n,b as u,u as c,e as d}from"./index-b61b47a1.js";import{s as S,p as D,o as q}from"./requests-80516724.js";import{ap as E,C as U,a as W,S as z}from"./patient-allergies-88653954.js";import"./_commonjsHelpers-042e6b4d.js";import"./isEqual-38ff4822.js";import"./_baseIsEqual-4b283a92.js";import"./_equalByTag-3aa7c076.js";import"./uniq-1e65cdac.js";import"./_createSet-823d7c6f.js";import"./index-a6c8ef6f.js";import"./index-356e4a49.js";import"./action-list-8f8c2112.js";import"./index-74f03c09.js";import"./sortBy-35476ce0.js";import"./_baseForOwn-d5bf979e.js";import"./_baseToString-ba0098b0.js";import"./_baseClone-0bdbe065.js";import"./toNumber-711c0fc1.js";import"./isPlainObject-7e0f34c5.js";import"./_basePickBy-f94c0374.js";import"./mapValues-80a5786c.js";import"./request-8b58a0d5.js";import"./table-503c0cae.js";import"./isString-b8ede3fb.js";import"./spinner-66aa4ba7.js";import"./drawer-74d79233.js";import"./index-6de6b113.js";import"./_commonjs-dynamic-modules-302442b1.js";import"./extends-41c9b0e2.js";import"./data-list-254aa0b0.js";import"./debounce-0d3e7ec9.js";async function R(o){const e=n(o),a=await u(()=>n(e.getByRole("dialog")));return{search:t=>c.type(a.getByPlaceholderText("Type to search"),t),selectMedication:async t=>c.click(await a.findByRole("option",{name:t})),status:t=>c.selectOptions(a.getByTestId("form-field-status"),t),instructions:t=>c.type(a.getByLabelText("Instructions"),t),cancel:()=>c.click(a.getByRole("button",{name:"Cancel"})),save:async()=>{c.click(a.getByRole("button",{name:"Save"}))}}}async function v(o){const e=n(o);await u(()=>d(e.queryAllByRole("table")).toHaveLength(2));const a=e.queryAllByRole("table"),t=M(o,a[0]),i=M(o,a[1]);return{patientRecord:t,otherProvider:i,clickAddMedication:()=>c.click(e.getByTestId("button.add-medication"))}}function M(o,e){async function a(i,r){c.hover(t(i)),c.click(n(t(i)).getByTestId(r))}function t(i){const r=n(e).getAllByRole("rowgroup")[1];return n(r).queryAllByRole("row")[i]}return{table:n(e),toHaveRowCount:async i=>{i===0?await u(()=>{const r=n(e).getAllByRole("rowgroup")[1];d(r).toBeFalsy()}):await u(()=>{const r=n(e).getAllByRole("rowgroup")[1];d(n(r).queryAllByRole("row")).toHaveLength(i)})},toHaveRowWithText:(i,r)=>n(t(i)).getByText(r),toHaveAnyRowWithText:async i=>{const r=await n(e).getAllByRole("rowgroup")[1];d(n(r).getAllByRole("row").some(I=>!!n(I).queryByText(i))).toBeTruthy()},addToRecord:i=>a(i,"add-to-record")}}const he={tags:["autodocs"],component:E,decorators:[(o,{args:e})=>y.createElement(U,{env:"dev",authToken:"ey.12345",builderId:"12345"},y.createElement(W,{patientID:"007",systemURL:z},y.createElement(o,{args:e})))]},s={...S({providerMedications:D,otherProviderMedications:q})},m={...s,args:{hideAddToRecord:!0}},l={...s,play:async({canvasElement:o})=>{const e=await v(o);await e.patientRecord.toHaveRowCount(1);const a="albendazole 200 MG Oral Tablet [Albenza]";e.clickAddMedication();const t=await R(o);t.search("alb"),await t.selectMedication(a),t.status("Active"),t.instructions("Take 2.3 every 3.14 hours, if dose is missed spin around 4.5 times"),await t.save(),await e.patientRecord.toHaveRowCount(2),d(await e.patientRecord.table.findByText(a)).toBeTruthy()}},p={...s,play:async({canvasElement:o})=>{const e=await v(o);await e.patientRecord.toHaveRowCount(1),await e.otherProvider.toHaveRowCount(4);const a="3 ML insulin aspart protamine, human 70 UNT/ML / insulin aspart, human 30 UNT/ML Pen Injector [NovoLog Mix]";e.otherProvider.toHaveRowWithText(0,a),await e.otherProvider.addToRecord(0),await(await R(o)).save(),await e.patientRecord.toHaveRowCount(2),await e.otherProvider.toHaveRowCount(3),await e.patientRecord.toHaveAnyRowWithText(a)}},w={...s,play:async({canvasElement:o})=>{const e=await v(o);await e.patientRecord.toHaveRowCount(1);const a="cabozantinib 20 MG Oral Capsule [Cometriq]";e.clickAddMedication();const t=await R(o);t.search("cab"),await t.selectMedication(a),t.status("Active"),t.cancel(),await e.patientRecord.toHaveRowCount(1),d(e.patientRecord.table.queryByText(a)).toBeFalsy()}};var T,h,B;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`{
  ...setupMedicationMocks({
    providerMedications,
    otherProviderMedications
  })
}`,...(B=(h=s.parameters)==null?void 0:h.docs)==null?void 0:B.source}}};var A,b,g;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`{
  ...Basic,
  args: {
    hideAddToRecord: true
  }
}`,...(g=(b=m.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};var H,C,x;l.parameters={...l.parameters,docs:{...(H=l.parameters)==null?void 0:H.docs,source:{originalSource:`{
  ...Basic,
  play: async ({
    canvasElement
  }) => {
    const medications = await medicationsTables(canvasElement);
    await medications.patientRecord.toHaveRowCount(1);
    const newMedication = "albendazole 200 MG Oral Tablet [Albenza]";
    medications.clickAddMedication();
    const addMedicationForm = await medicationFormDrawer(canvasElement);
    addMedicationForm.search("alb");
    await addMedicationForm.selectMedication(newMedication);
    addMedicationForm.status("Active");
    addMedicationForm.instructions("Take 2.3 every 3.14 hours, if dose is missed spin around 4.5 times");
    await addMedicationForm.save();
    await medications.patientRecord.toHaveRowCount(2);
    expect(await medications.patientRecord.table.findByText(newMedication)).toBeTruthy();
  }
}`,...(x=(C=l.parameters)==null?void 0:C.docs)==null?void 0:x.source}}};var F,f,P;p.parameters={...p.parameters,docs:{...(F=p.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
    const medDrawer = await medicationFormDrawer(canvasElement);
    await medDrawer.save();
    await medications.patientRecord.toHaveRowCount(2);
    await medications.otherProvider.toHaveRowCount(3);
    await medications.patientRecord.toHaveAnyRowWithText(medicationName);
  }
}`,...(P=(f=p.parameters)==null?void 0:f.docs)==null?void 0:P.source}}};var k,N,L;w.parameters={...w.parameters,docs:{...(k=w.parameters)==null?void 0:k.docs,source:{originalSource:`{
  ...Basic,
  play: async ({
    canvasElement
  }) => {
    const medications = await medicationsTables(canvasElement);
    await medications.patientRecord.toHaveRowCount(1);
    const newMedication = "cabozantinib 20 MG Oral Capsule [Cometriq]";
    medications.clickAddMedication();
    const addMedicationForm = await medicationFormDrawer(canvasElement);
    addMedicationForm.search("cab");
    await addMedicationForm.selectMedication(newMedication);
    addMedicationForm.status("Active");
    addMedicationForm.cancel();
    await medications.patientRecord.toHaveRowCount(1);
    expect(medications.patientRecord.table.queryByText(newMedication)).toBeFalsy();
  }
}`,...(L=(N=w.parameters)==null?void 0:N.docs)==null?void 0:L.source}}};const Be=["Basic","HideAddToRecord","TestAddNewMed","TestAddToRecord","TestCancelAddNewMed"];export{s as Basic,m as HideAddToRecord,l as TestAddNewMed,p as TestAddToRecord,w as TestCancelAddNewMed,Be as __namedExportsOrder,he as default};
//# sourceMappingURL=patient-medications.stories-0f6989d9.js.map

import{r as b,R as d}from"./index-6f814c40.js";import{w as r,b as y,u as s,e as l}from"./index-10f7dd35.js";import{s as z,p as W,o as U}from"./requests-55b416ba.js";import{c as G}from"./index-74f03c09.js";import{A as j,O as Y}from"./other-provider-meds-table-ee396c63.js";import{P as Z}from"./provider-meds-table-46ba8c99.js";import{S as J,H as K,B as A,T as Q}from"./ctw-box-d758dfda.js";import{w as X}from"./error-boundary-d1aa0574.js";import{T as $}from"./toggle-control-e4d3ea34.js";/* empty css                            */import{C as ee,S as te}from"./patient-helper-e281ba6b.js";import{P as ae}from"./patient-provider-d8a611e8.js";import"./_commonjsHelpers-042e6b4d.js";import"./isEqual-298b6ab1.js";import"./_baseIsEqual-7d59e24c.js";import"./_equalByTag-eda72788.js";import"./uniq-8676ca12.js";import"./_createSet-6ff8e1d4.js";import"./index-a6c8ef6f.js";import"./index-356e4a49.js";import"./uniqBy-7bfbe8b6.js";import"./_baseForOwn-03e9c2f3.js";import"./_baseToString-7c0e3f59.js";import"./sortBy-ee350c06.js";import"./_baseClone-3ae78372.js";import"./toNumber-d7ce3bd9.js";import"./_basePickBy-b5376a08.js";import"./mapValues-c63fd567.js";import"./isPlainObject-243fdc78.js";import"./medication-4b27da28.js";import"./collapsible-data-list-details-f7571cef.js";import"./document-icon-581c51b2.js";import"./sortBy-cdc8b01b.js";import"./loading-c7ff698a.js";import"./spinner-66aa4ba7.js";import"./request-5d5ec5f4.js";import"./uniqWith-79e2a4b4.js";import"./sort-2ee927a0.js";import"./isString-933c0e0c.js";import"./use-medications-de464378.js";import"./table-12f80a1c.js";import"./use-breakpoints-ed433bef.js";import"./data-list-254aa0b0.js";import"./drawer-de3413cf.js";import"./index-6de6b113.js";import"./urls-e3325bab.js";import"./startCase-e12a4b87.js";import"./combobox-field-881c664c.js";import"./debounce-5029c56d.js";import"./badge-8ef10589.js";import"./pickBy-f6e57f40.js";import"./_commonjs-dynamic-modules-302442b1.js";const M=X(({className:o,readOnly:e=!1,showConfirmedMedsTable:a=!0,showOtherProvidersMedsTable:t=!0,onOpenHistoryDrawer:i,onAfterOpenHistoryDrawer:n,...v})=>{const[L,h]=b.useState(!1),[f,V]=b.useState(!1);return d.createElement(J,{className:G("ctw-patient-medications",o),"data-zus-telemetry-namespace":"PatientMedications"},d.createElement(K,{title:"Medications"},!e&&d.createElement(j,{isOpen:L,handleOnClose:()=>h(!1)},d.createElement("button",{className:"ctw-btn-clear ctw-link ctw-capitalize",type:"button",onClick:()=>h(!0),"data-testid":"button.add-medication","data-zus-telemetry-click":"Add new medication"},"+ Add medication"))),a&&d.createElement(A,null,d.createElement(Q,{title:"Confirmed Medications"},d.createElement($,{onFormChange:()=>V(!f),toggleProps:{name:"status",text:"Include Inactive"}})),d.createElement(Z,{showInactive:f,onOpenHistoryDrawer:i,onAfterOpenHistoryDrawer:n})),t&&d.createElement(A,{title:"Other Provider Records"},d.createElement(Y,{...v,onOpenHistoryDrawer:i,onAfterOpenHistoryDrawer:n})))},"PatientMedications");try{M.displayName="PatientMedications",M.__docgenInfo={description:"",displayName:"PatientMedications",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},status:{defaultValue:null,description:"",name:"status",required:!1,type:{name:"enum",value:[{value:'"active"'},{value:'"entered-in-error"'},{value:'"not-taken"'},{value:'"completed"'},{value:'"on-hold"'},{value:'"intended"'},{value:'"stopped"'}]}},showConfirmedMedsTable:{defaultValue:null,description:"",name:"showConfirmedMedsTable",required:!1,type:{name:"boolean"}},showOtherProvidersMedsTable:{defaultValue:null,description:"",name:"showOtherProvidersMedsTable",required:!1,type:{name:"boolean"}},readOnly:{defaultValue:null,description:"",name:"readOnly",required:!1,type:{name:"boolean"}},hideAddToRecord:{defaultValue:null,description:"",name:"hideAddToRecord",required:!1,type:{name:"boolean"}},handleAddToRecord:{defaultValue:null,description:"",name:"handleAddToRecord",required:!1,type:{name:"((m: MedicationStatementModel) => void)"}},onOpenHistoryDrawer:{defaultValue:null,description:"",name:"onOpenHistoryDrawer",required:!1,type:{name:"(() => void)"}},onAfterOpenHistoryDrawer:{defaultValue:null,description:"",name:"onAfterOpenHistoryDrawer",required:!1,type:{name:"(() => void)"}}}}}catch{}async function R(o){const e=r(o),a=await y(()=>r(e.getByRole("dialog")));return{search:t=>s.type(a.getByPlaceholderText("Type to search"),t),selectMedication:async t=>s.click(await a.findByRole("option",{name:t})),status:t=>s.selectOptions(a.getByTestId("form-field-status"),t),instructions:t=>s.type(a.getByLabelText("Instructions"),t),cancel:()=>s.click(a.getByRole("button",{name:"Cancel"})),save:async()=>{s.click(a.getByRole("button",{name:"Save"}))}}}async function T(o){const e=r(o);await y(()=>l(e.queryAllByRole("table")).toHaveLength(2));const a=e.queryAllByRole("table"),t=g(o,a[0]),i=g(o,a[1]);return{patientRecord:t,otherProvider:i,clickAddMedication:()=>s.click(e.getByTestId("button.add-medication"))}}function g(o,e){async function a(i,n){s.hover(t(i)),s.click(r(t(i)).getByTestId(n))}function t(i){const n=r(e).getAllByRole("rowgroup")[1];return r(n).queryAllByRole("row")[i]}return{table:r(e),toHaveRowCount:async i=>{i===0?await y(()=>{const n=r(e).getAllByRole("rowgroup")[1];l(n).toBeFalsy()}):await y(()=>{const n=r(e).getAllByRole("rowgroup")[1];l(r(n).queryAllByRole("row")).toHaveLength(i)})},toHaveRowWithText:(i,n)=>r(t(i)).getByText(n),toHaveAnyRowWithText:async i=>{const n=await r(e).getAllByRole("rowgroup")[1];l(r(n).getAllByRole("row").some(v=>!!r(v).queryByText(i))).toBeTruthy()},addToRecord:i=>a(i,"add-to-record")}}const tt={tags:["autodocs"],component:M,decorators:[(o,{args:e})=>d.createElement(ee,{env:"dev",authToken:"ey.12345",builderId:"12345"},d.createElement(ae,{patientID:"007",systemURL:te},d.createElement(o,{args:e})))]},c={...z({providerMedications:W,otherProviderMedications:U})},m={...c,args:{hideAddToRecord:!0}},p={...c,play:async({canvasElement:o})=>{const e=await T(o);await e.patientRecord.toHaveRowCount(1);const a="albendazole 200 MG Oral Tablet [Albenza]";e.clickAddMedication();const t=await R(o);t.search("alb"),await t.selectMedication(a),t.status("Active"),t.instructions("Take 2.3 every 3.14 hours, if dose is missed spin around 4.5 times"),await t.save(),await e.patientRecord.toHaveRowCount(2),l(await e.patientRecord.table.findByText(a)).toBeTruthy()}},u={...c,play:async({canvasElement:o})=>{const e=await T(o);await e.patientRecord.toHaveRowCount(1),await e.otherProvider.toHaveRowCount(4);const a="3 ML insulin aspart protamine, human 70 UNT/ML / insulin aspart, human 30 UNT/ML Pen Injector [NovoLog Mix]";e.otherProvider.toHaveRowWithText(0,a),await e.otherProvider.addToRecord(0),await(await R(o)).save(),await e.patientRecord.toHaveRowCount(2),await e.otherProvider.toHaveRowCount(3),await e.patientRecord.toHaveAnyRowWithText(a)}},w={...c,play:async({canvasElement:o})=>{const e=await T(o);await e.patientRecord.toHaveRowCount(1);const a="cabozantinib 20 MG Oral Capsule [Cometriq]";e.clickAddMedication();const t=await R(o);t.search("cab"),await t.selectMedication(a),t.status("Active"),t.cancel(),await e.patientRecord.toHaveRowCount(1),l(e.patientRecord.table.queryByText(a)).toBeFalsy()}};var B,C,H;c.parameters={...c.parameters,docs:{...(B=c.parameters)==null?void 0:B.docs,source:{originalSource:`{
  ...setupMedicationMocks({
    providerMedications,
    otherProviderMedications
  })
}`,...(H=(C=c.parameters)==null?void 0:C.docs)==null?void 0:H.source}}};var P,x,F;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:`{
  ...Basic,
  args: {
    hideAddToRecord: true
  }
}`,...(F=(x=m.parameters)==null?void 0:x.docs)==null?void 0:F.source}}};var N,k,E;p.parameters={...p.parameters,docs:{...(N=p.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(E=(k=p.parameters)==null?void 0:k.docs)==null?void 0:E.source}}};var I,O,q;u.parameters={...u.parameters,docs:{...(I=u.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
}`,...(q=(O=u.parameters)==null?void 0:O.docs)==null?void 0:q.source}}};var S,D,_;w.parameters={...w.parameters,docs:{...(S=w.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(_=(D=w.parameters)==null?void 0:D.docs)==null?void 0:_.source}}};const at=["Basic","HideAddToRecord","TestAddNewMed","TestAddToRecord","TestCancelAddNewMed"];export{c as Basic,m as HideAddToRecord,p as TestAddNewMed,u as TestAddToRecord,w as TestCancelAddNewMed,at as __namedExportsOrder,tt as default};
//# sourceMappingURL=patient-medications.stories-f7c57e96.js.map

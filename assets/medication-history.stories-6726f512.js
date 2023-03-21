import{R as t}from"./index-6f814c40.js";import{M as s}from"./medication-history-ac0fd6a9.js";import{s as c,p,o as m}from"./requests-9753dbad.js";import{C as d,S as u}from"./patient-helper-9db8d359.js";import{P as l}from"./patient-provider-a45d74ab.js";import"./observation-a3fc3a55.js";import{M as f}from"./sort-0f00e62c.js";import"./_commonjsHelpers-042e6b4d.js";import"./values-0b6ffb91.js";import"./_baseForOwn-d8306f34.js";import"./_equalByTag-aaf39779.js";import"./_baseIsEqual-c150f525.js";import"./_baseToString-4993715b.js";import"./sortBy-919d7262.js";import"./_baseClone-25b1595e.js";import"./_createSet-12ef9b81.js";import"./toNumber-9b8ac844.js";import"./_basePickBy-239377e6.js";import"./mapValues-21907523.js";import"./isPlainObject-8e58b46f.js";import"./uniq-f5468222.js";import"./index-74f03c09.js";import"./collapsible-data-list-details-f7571cef.js";import"./document-icon-581c51b2.js";import"./error-boundary-4145d802.js";import"./use-breakpoints-61de5753.js";import"./sortBy-be5f7eb4.js";import"./getPrototypeOf-9c757e77.js";import"./loading-c7ff698a.js";import"./spinner-66aa4ba7.js";import"./request-5a1df4c1.js";import"./uniqWith-f1edcb30.js";import"./patient-8f4a0ec9.js";import"./_commonjs-dynamic-modules-302442b1.js";import"./null-flavor-316cf64e.js";import"./isString-35d4a3f2.js";const g={resourceType:"MedicationStatement",id:"8dc0812d",extension:[{url:"https://zusapi.com/lens/extension/aggregatedFrom",extension:[{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/d88a5a54-8a45-4027-ab9e-233e80fc8899",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/4c19932e-500f-4738-8600-54dec77f343d",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/99b5e53c-81b7-4aae-ab20-fe0b7ad7ce55",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/fa20f4e2-8a10-4555-952c-07d622fdcb50",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/6b16e363-662e-401f-9f3f-5323f81f2149",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationRequest/6a16eba4-7d86-4e4a-8005-34367553ca05",type:"MedicationRequest"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationStatement/0e1e097b-eed6-4c1f-b508-314f2fd8ee96",type:"MedicationStatement"}}]},{url:"https://zusapi.com/lens/extension/medicationLastFillDate",valueDateTime:"2022-11-07"},{url:"https://zusapi.com/lens/extension/medicationLastPrescribedDate",valueDateTime:"2021-08-01"},{url:"https://zusapi.com/lens/extension/medicationQuantity",valueQuantity:{value:90,unit:"days"}},{url:"https://zusapi.com/lens/extension/medicationDaysSupply",valueQuantity:{value:90}},{url:"https://zusapi.com/lens/extension/medicationRefills",valueUnsignedInt:4},{url:"https://zusapi.com/lens/extension/medicationLastPrescriber",valueReference:{reference:"Practitioner/6c7f3ad6-6849-4dd8-9cd6-6c16865cfdd8",type:"Practitioner",display:"Sally McCann"}},{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"f5ba64c5-4f66-45cf-b07d-84ed828138e0"}],status:"active",subject:{reference:"Patient/0790b2c2-b8ca-4697-a541-f4486c6e89f8",type:"Patient"}},M=new f(g),$={component:s,tags:["autodocs"],decorators:[(r,{args:n})=>t.createElement(d,{env:"dev",authToken:"12345",builderId:"12345"},t.createElement(l,{patientID:"007",systemURL:u},t.createElement(r,{args:n})))]},e={args:{medication:M},...c({providerMedications:p,otherProviderMedications:m})};var i,a,o;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    medication: medicationStatementModel
  },
  ...setupMedicationMocks({
    providerMedications,
    otherProviderMedications
  })
}`,...(o=(a=e.parameters)==null?void 0:a.docs)==null?void 0:o.source}}};const ee=["Basic"];export{e as Basic,ee as __namedExportsOrder,$ as default};

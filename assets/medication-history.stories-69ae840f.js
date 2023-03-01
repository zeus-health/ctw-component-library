import{R as t}from"./index-6f814c40.js";import{M as s,s as c,p,o as m}from"./requests-1e8d4ddf.js";import{C as d,S as u}from"./patient-helper-0f09a661.js";import{P as l}from"./patient-provider-36691a31.js";import"./conditions-6b0d63ea.js";import{M as f}from"./sort-618282df.js";import"./_commonjsHelpers-042e6b4d.js";import"./values-28adb33b.js";import"./_baseForOwn-03e9c2f3.js";import"./_equalByTag-eda72788.js";import"./_baseIsEqual-7d59e24c.js";import"./_baseToString-7c0e3f59.js";import"./sortBy-ee350c06.js";import"./_baseClone-3ae78372.js";import"./_createSet-6ff8e1d4.js";import"./toNumber-d7ce3bd9.js";import"./_basePickBy-b5376a08.js";import"./mapValues-c63fd567.js";import"./isPlainObject-243fdc78.js";import"./uniq-8676ca12.js";import"./error-boundary-3c619f42.js";import"./index-74f03c09.js";import"./use-breakpoints-048d0685.js";import"./sortBy-3347ffe9.js";import"./pickBy-f6e57f40.js";import"./loading-c7ff698a.js";import"./spinner-66aa4ba7.js";import"./request-5d5ec5f4.js";import"./uniqWith-79e2a4b4.js";import"./_commonjs-dynamic-modules-302442b1.js";import"./collapsible-data-list-details-4a1431c5.js";import"./isString-933c0e0c.js";const g={resourceType:"MedicationStatement",id:"8dc0812d",extension:[{url:"https://zusapi.com/lens/extension/aggregatedFrom",extension:[{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/d88a5a54-8a45-4027-ab9e-233e80fc8899",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/4c19932e-500f-4738-8600-54dec77f343d",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/99b5e53c-81b7-4aae-ab20-fe0b7ad7ce55",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/fa20f4e2-8a10-4555-952c-07d622fdcb50",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/6b16e363-662e-401f-9f3f-5323f81f2149",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationRequest/6a16eba4-7d86-4e4a-8005-34367553ca05",type:"MedicationRequest"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationStatement/0e1e097b-eed6-4c1f-b508-314f2fd8ee96",type:"MedicationStatement"}}]},{url:"https://zusapi.com/lens/extension/medicationLastFillDate",valueDateTime:"2022-11-07"},{url:"https://zusapi.com/lens/extension/medicationLastPrescribedDate",valueDateTime:"2021-08-01"},{url:"https://zusapi.com/lens/extension/medicationQuantity",valueQuantity:{value:90,unit:"days"}},{url:"https://zusapi.com/lens/extension/medicationDaysSupply",valueQuantity:{value:90}},{url:"https://zusapi.com/lens/extension/medicationRefills",valueUnsignedInt:4},{url:"https://zusapi.com/lens/extension/medicationLastPrescriber",valueReference:{reference:"Practitioner/6c7f3ad6-6849-4dd8-9cd6-6c16865cfdd8",type:"Practitioner",display:"Sally McCann"}},{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"f5ba64c5-4f66-45cf-b07d-84ed828138e0"}],status:"active",subject:{reference:"Patient/0790b2c2-b8ca-4697-a541-f4486c6e89f8",type:"Patient"}},M=new f(g),G={component:s,tags:["autodocs"],decorators:[(o,{args:r})=>t.createElement(d,{env:"dev",authToken:"12345",builderId:"12345"},t.createElement(l,{patientID:"007",systemURL:u},t.createElement(o,{args:r})))]},e={args:{medication:M},...c({providerMedications:p,otherProviderMedications:m})};var i,a,n;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    medication: medicationStatementModel
  },
  ...setupMedicationMocks({
    providerMedications,
    otherProviderMedications
  })
}`,...(n=(a=e.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};const J=["Basic"];export{e as Basic,J as __namedExportsOrder,G as default};

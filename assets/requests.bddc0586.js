import{l as c}from"./table.85e80d51.js";import{l as n,v as d}from"./v4.b6a45a7e.js";import{r as u}from"./index.1299c1f1.js";const M={resourceType:"Bundle",id:"7c7a1c16",type:"searchset",total:5,entry:[{resource:{resourceType:"MedicationStatement",id:"84c35b67",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2022-11-21T18:21:52.653+00:00"}],versionId:"2",lastUpdated:"2022-11-08T15:03:31.124+00:00",source:"#b9875aae99734b0c",tag:[{system:"https://zusapi.com/lens",code:"ActiveMedications"},{system:"https://zusapi.com/summary",code:"Common"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"},{system:"https://zusapi.com/lens/upid",code:"57ddcfa9-6df8-4d00-a86d-c63c0faad93f"}]},extension:[{url:"https://zusapi.com/lens/extension/aggregatedFrom",extension:[{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationAdministration/d7571c17-1e36-4c38-8149-e30ee3b18481",type:"MedicationAdministration"}}]},{url:"https://zusapi.com/lens/extension/medicationLastFillDate",valueString:"NO-VALUE"},{url:"https://zusapi.com/lens/extension/medicationLastPrescribedDate",valueString:"NO-VALUE"},{url:"https://zusapi.com/lens/extension/medicationQuantity",valueQuantity:{value:100,unit:"ml"}},{url:"https://zusapi.com/lens/extension/medicationDaysSupply",valueString:"NO-VALUE"},{url:"https://zusapi.com/lens/extension/medicationRefills",valueString:"NO-VALUE"},{url:"https://zusapi.com/lens/extension/medicationLastPrescriber",valueString:"NO-VALUE"},{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"57ddcfa9-6df8-4d00-a86d-c63c0faad93f"}],status:"active",medicationCodeableConcept:{coding:[{system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"2179744"},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ActiveIngredient"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"253182",display:"insulin, regular, human",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"BrandName"}],system:"http://terminology.hl7.org/CodeSystem/v3-NullFlavor",code:"UNK",display:"unknown",userSelected:!1}],text:"regular insulin, human 100 UNT in 100 ML Injection"},subject:{reference:"Patient/007",type:"Patient"},dateAsserted:"2022-06-11T03:15:00+00:00",dosage:[{route:{text:"Intramuscular"},doseAndRate:[{doseQuantity:{value:100,unit:"ml"}}]}]},search:{mode:"match"}},{resource:{resourceType:"MedicationStatement",id:"6f7a2c5e",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2022-11-21T18:22:55.266+00:00"}],versionId:"2",lastUpdated:"2022-11-08T15:03:31.148+00:00",source:"#b9875aae99734b0c",tag:[{system:"https://zusapi.com/lens",code:"ActiveMedications"},{system:"https://zusapi.com/summary",code:"Common"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"},{system:"https://zusapi.com/lens/upid",code:"57ddcfa9-6df8-4d00-a86d-c63c0faad93f"}]},extension:[{url:"https://zusapi.com/lens/extension/aggregatedFrom",extension:[{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/8952694e-c4ef-4432-ada6-6aeb2e193b88",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/0beb9677-f9b4-451d-9552-66652741ae58",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/503b8b45-c132-4ad2-8d2b-69e6d0e192d9",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationRequest/dbfa6885-b087-4fda-a9d6-f494dfe51e0a",type:"MedicationRequest"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/6ec0dc8c-8f96-44ad-800d-e4efce371314",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/57d85687-4a53-4fb1-aa13-ef802fc741c0",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationStatement/c3644cd7-676e-4d9d-9248-1479d70f5527",type:"MedicationStatement"}}]},{url:"https://zusapi.com/lens/extension/medicationLastFillDate",valueDateTime:"2022-11-07"},{url:"https://zusapi.com/lens/extension/medicationLastPrescribedDate",valueDateTime:"2021-08-01"},{url:"https://zusapi.com/lens/extension/medicationQuantity",valueQuantity:{value:90,unit:"days"}},{url:"https://zusapi.com/lens/extension/medicationDaysSupply",valueQuantity:{value:90}},{url:"https://zusapi.com/lens/extension/medicationRefills",valueUnsignedInt:4},{url:"https://zusapi.com/lens/extension/medicationLastPrescriber",valueReference:{reference:"Practitioner/a8b57218-3699-4354-bf39-b73175ba85e0",type:"Practitioner",display:"Sally McCann"}},{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"57ddcfa9-6df8-4d00-a86d-c63c0faad93f"}],status:"active",medicationCodeableConcept:{coding:[{system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"977840"},{system:"http://hl7.org/fhir/sid/ndc",code:"54569663100"},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ActiveIngredient"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"51428",display:"insulin aspart, human",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"BrandName"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"1372741",display:"NovoLog Mix",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ClinicalDrug_TTY_SCD"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"847191",display:"3 ML insulin aspart protamine, human 70 UNT/ML / insulin aspart, human 30 UNT/ML Pen Injector",userSelected:!1}],text:"3 ML insulin aspart protamine, human 70 UNT/ML / insulin aspart, human 30 UNT/ML Pen Injector [NovoLog Mix]"},subject:{reference:"Patient/007",type:"Patient"},dateAsserted:"2022-11-07",dosage:[{text:"Inject 3 ML before meals. Quantity: 90 days"}]},search:{mode:"match"}},{resource:{resourceType:"MedicationStatement",id:"c2610752",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2022-11-21T18:22:55.266+00:00"}],versionId:"2",lastUpdated:"2022-11-08T15:03:31.098+00:00",source:"#b9875aae99734b0c",tag:[{system:"https://zusapi.com/lens",code:"ActiveMedications"},{system:"https://zusapi.com/summary",code:"Common"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"},{system:"https://zusapi.com/lens/upid",code:"57ddcfa9-6df8-4d00-a86d-c63c0faad93f"}]},extension:[{url:"https://zusapi.com/lens/extension/aggregatedFrom",extension:[{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/d03627d0-31cc-48b7-b435-21767d0bb7cc",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/f991a969-8848-4493-b794-3dfadd047f6c",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/e89f2f5f-3429-4288-9e84-2b9db45473eb",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/c82e7f47-7ee7-4b53-b901-21e068fd7b59",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationRequest/902e3223-b7c1-449c-a716-59e5687b4af6",type:"MedicationRequest"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/6837bd08-5ba3-4ce7-82d7-abf3676d75b5",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationStatement/146fe496-2343-4a5d-9814-730e8ef3fdb4",type:"MedicationStatement"}}]},{url:"https://zusapi.com/lens/extension/medicationLastFillDate",valueDateTime:"2022-11-07"},{url:"https://zusapi.com/lens/extension/medicationLastPrescribedDate",valueDateTime:"2021-08-01"},{url:"https://zusapi.com/lens/extension/medicationQuantity",valueQuantity:{value:90,unit:"days"}},{url:"https://zusapi.com/lens/extension/medicationDaysSupply",valueQuantity:{value:90}},{url:"https://zusapi.com/lens/extension/medicationRefills",valueUnsignedInt:4},{url:"https://zusapi.com/lens/extension/medicationLastPrescriber",valueReference:{reference:"Practitioner/a8b57218-3699-4354-bf39-b73175ba85e0",type:"Practitioner",display:"Sally McCann"}},{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"57ddcfa9-6df8-4d00-a86d-c63c0faad93f"}],status:"active",medicationCodeableConcept:{coding:[{system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"847232"},{system:"http://hl7.org/fhir/sid/ndc",code:"00088502000"},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ActiveIngredient"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"274783",display:"insulin glargine",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"BrandName"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"261551",display:"Lantus",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ClinicalDrug_TTY_SCD"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"847230",display:"3 ML insulin glargine 100 UNT/ML Pen Injector",userSelected:!1}],text:"3 ML insulin glargine 100 UNT/ML Pen Injector [Lantus]"},subject:{reference:"Patient/007",type:"Patient"},dateAsserted:"2022-11-07",dosage:[{text:"Inject 3 ML with enclosed pen injector every morning. "}]},search:{mode:"match"}},{resource:{resourceType:"MedicationStatement",id:"219fe7ae",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2022-11-21T18:22:55.266+00:00"}],versionId:"2",lastUpdated:"2022-11-08T15:03:31.174+00:00",source:"#b9875aae99734b0c",tag:[{system:"https://zusapi.com/lens",code:"ActiveMedications"},{system:"https://zusapi.com/summary",code:"Common"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"},{system:"https://zusapi.com/lens/upid",code:"57ddcfa9-6df8-4d00-a86d-c63c0faad93f"}]},extension:[{url:"https://zusapi.com/lens/extension/aggregatedFrom",extension:[{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationRequest/d2102ea3-e515-45be-a611-eac1daf4d345",type:"MedicationRequest"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/8110cb8c-927e-49aa-9513-cb559d9875cc",type:"MedicationDispense"}}]},{url:"https://zusapi.com/lens/extension/medicationLastFillDate",valueDateTime:"2022-09-20"},{url:"https://zusapi.com/lens/extension/medicationLastPrescribedDate",valueDateTime:"2022-09-20"},{url:"https://zusapi.com/lens/extension/medicationQuantity",valueQuantity:{value:14,unit:"days"}},{url:"https://zusapi.com/lens/extension/medicationDaysSupply",valueQuantity:{value:14}},{url:"https://zusapi.com/lens/extension/medicationRefills",valueUnsignedInt:0},{url:"https://zusapi.com/lens/extension/medicationLastPrescriber",valueReference:{reference:"Practitioner/a8b57218-3699-4354-bf39-b73175ba85e0",type:"Practitioner",display:"Sally McCann"}},{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"57ddcfa9-6df8-4d00-a86d-c63c0faad93f"}],status:"active",medicationCodeableConcept:{coding:[{system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"1180459"},{system:"http://hl7.org/fhir/sid/ndc",code:"55887023697"},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"Standardization"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"876195",display:"polyethylene glycol 3350 17000 MG Powder for Oral Solution [Miralax]",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ActiveIngredient"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"221147",display:"polyethylene glycol 3350",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"BrandName"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"261575",display:"Miralax",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ClinicalDrug_TTY_SCD"}],system:"http://terminology.hl7.org/CodeSystem/v3-NullFlavor",code:"UNK",display:"unknown",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ClinicalDrug_TTY_SCD"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"876193",display:"polyethylene glycol 3350 17000 MG Powder for Oral Solution",userSelected:!1}],text:"Miralax Oral Product"},subject:{reference:"Patient/007",type:"Patient"},dateAsserted:"2022-09-20",dosage:[{text:"Dissolve 17g in 4\u20138oz liquid and drink once daily for up to 7 days."}]},search:{mode:"match"}},{resource:{resourceType:"MedicationStatement",id:"0851de14",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2022-11-21T19:52:58.330+00:00"}],versionId:"1",lastUpdated:"2022-11-08T18:47:34.568+00:00",source:"#5685aa4fa060a7f4",tag:[{system:"https://zusapi.com/lens",code:"ActiveMedications"},{system:"https://zusapi.com/summary",code:"Common"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"},{system:"https://zusapi.com/lens/upid",code:"57ddcfa9-6df8-4d00-a86d-c63c0faad93f"}]},extension:[{url:"https://zusapi.com/lens/extension/aggregatedFrom",extension:[{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationStatement/e23c0023-d7ad-4834-9adb-a71e54ccbcd2",type:"MedicationStatement"}}]},{url:"https://zusapi.com/lens/extension/medicationLastFillDate",valueString:"NO-VALUE"},{url:"https://zusapi.com/lens/extension/medicationLastPrescribedDate",valueString:"NO-VALUE"},{url:"https://zusapi.com/lens/extension/medicationQuantity",valueString:"NO-VALUE"},{url:"https://zusapi.com/lens/extension/medicationDaysSupply",valueString:"NO-VALUE"},{url:"https://zusapi.com/lens/extension/medicationRefills",valueString:"NO-VALUE"},{url:"https://zusapi.com/lens/extension/medicationLastPrescriber",valueString:"NO-VALUE"},{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"57ddcfa9-6df8-4d00-a86d-c63c0faad93f"}],status:"active",medicationCodeableConcept:{coding:[{system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"895994"},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ActiveIngredient"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"50121",display:"fluticasone propionate",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"BrandName"}],system:"http://terminology.hl7.org/CodeSystem/v3-NullFlavor",code:"UNK",display:"unknown",userSelected:!1}],text:"120 ACTUAT fluticasone propionate 0.044 MG/ACTUAT Metered Dose Inhaler"},subject:{reference:"Patient/007",type:"Patient"},dosage:[{text:"2 puffs daily"}]},search:{mode:"match"}}]},C={resourceType:"Bundle",id:"0b13191b",meta:{lastUpdated:"2022-11-22T20:36:24.102+00:00"},type:"searchset",total:1,entry:[{resource:{resourceType:"MedicationStatement",id:"e23c0023",meta:{extension:[{url:"https://zusapi.com/terminology/enrichment/sha256sum",valueBase64Binary:"axdiRTV5h6fWBD79x7QMzrictUmnbS2kic0ua5qY5yY="},{url:"https://zusapi.com/created-at",valueInstant:"2022-11-21T19:52:51.349+00:00"}],versionId:"2",lastUpdated:"2022-11-21",source:"#90f35e548b45cbc4",tag:[{system:"https://zusapi.com/accesscontrol/owner",code:"builder/123456",display:"Storybook Medical - Test Customer"}]},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"57ddcfa9-6df8-4d00-a86d-c63c0faad93f"}],status:"active",medicationCodeableConcept:{coding:[{system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"895994"},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ActiveIngredient"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"50121",display:"fluticasone propionate",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"BrandName"}],system:"http://terminology.hl7.org/CodeSystem/v3-NullFlavor",code:"UNK",display:"unknown",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ClinicalDrug_TTY_SCD"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"895994",display:"120 ACTUAT fluticasone propionate 0.044 MG/ACTUAT Metered Dose Inhaler",userSelected:!1}],text:"120 ACTUAT fluticasone propionate 0.044 MG/ACTUAT Metered Dose Inhaler "},subject:{reference:"Patient/007",type:"Patient"},dateAsserted:"2022-11-21",dosage:[{text:"2 puffs daily"}]},search:{mode:"match"}}]},m={resourceType:"Bundle",id:"e23143d2",type:"searchset",total:3,entry:[{resource:{resourceType:"MedicationAdministration",id:"d7571c17-1e36-4c38-8149-e30ee3b18481",meta:{extension:[{url:"https://zusapi.com/terminology/enrichment/sha256sum",valueBase64Binary:"QpOAfH5cGwbtNc6rbx+7OW2gBaNqUpZjKFW5H10aaDQ="},{url:"https://zusapi.com/created-at",valueInstant:"2022-11-21T18:21:42.877+00:00"}],versionId:"2",lastUpdated:"2022-11-21T18:21:43.037+00:00",source:"#5b771d76a2028e1c",tag:[{system:"https://zusapi.com/thirdparty/source",code:"commonwell"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"}]},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"57ddcfa9"}],status:"completed",medicationCodeableConcept:{coding:[{system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"2179744"},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ActiveIngredient"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"253182",display:"insulin, regular, human",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"BrandName"}],system:"http://terminology.hl7.org/CodeSystem/v3-NullFlavor",code:"UNK",display:"unknown",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ClinicalDrug_TTY_SCD"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"2179744",display:"100 ML insulin, regular, human 1 UNT/ML Injection",userSelected:!1}]},subject:{reference:"Patient/007",type:"Patient"},effectivePeriod:{start:"2022-06-11T03:15:00+00:00",end:"2022-06-11T03:15:00+00:00"},dosage:{route:{text:"Intramuscular"},dose:{value:100,unit:"ml"}}},search:{mode:"match"}},{resource:{resourceType:"Patient",id:"976954a4",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2022-11-21T18:21:42.532+00:00"}],versionId:"2",lastUpdated:"2022-11-21T18:21:42.735+00:00",source:"#68bb7ed53a5b0f5d",security:[{system:"http://terminology.hl7.org/CodeSystem/v3-ActReason",code:"HTEST"}],tag:[{system:"https://zusapi.com/thirdparty/source",code:"commonwell"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"}]},identifier:[{system:"https://zusapi.com/fhir/identifier/universal-id",value:"57ddcfa9"}],name:[{family:"Shah",given:["Akhil"]}],telecom:[{system:"email",value:"akhil.shah@example.com"},{system:"phone",value:"555-951-2842",use:"home"},{system:"phone",value:"555-861-6875",use:"mobile"}],gender:"male",birthDate:"2007-12-13",address:[{line:["121 SHADOW LN"],city:"LAS VEGAS",state:"NV",postalCode:"89106-4119"}],managingOrganization:{reference:"Organization/af0276b9-9a91-4a34-871e-6ac2115fae17"}},search:{mode:"include"}},{resource:{resourceType:"Organization",id:"af0276b9",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2022-11-21T18:21:37.320+00:00"}],versionId:"1",lastUpdated:"2022-11-21T18:21:37.321+00:00",source:"#XgOPpWgfRvpfdykH",tag:[{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"}]},name:"Endo Health"},search:{mode:"include"}}]},p={resourceType:"Bundle",id:"3890b281",type:"searchset",total:7,entry:[{resource:{resourceType:"MedicationDispense",id:"d88a5a54-8a45-4027-ab9e-233e80fc8899",meta:{extension:[{url:"https://zusapi.com/terminology/enrichment/sha256sum",valueBase64Binary:"epixaZTVHuAeIf6niYDrfVV4pQV5q/HeQz2uHgQq/zo="},{url:"https://zusapi.com/created-at",valueInstant:"2022-11-08T15:03:16.698+00:00"}],versionId:"2",lastUpdated:"2022-11-08T15:03:16.794+00:00",source:"#a8afcb8e41fcf85f",tag:[{system:"https://zusapi.com/thirdparty/source",code:"surescripts"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"}]},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"f5ba64c5-4f66-45cf-b07d-84ed828138e0"}],status:"completed",medicationCodeableConcept:{coding:[{system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"847232"},{system:"http://hl7.org/fhir/sid/ndc",code:"00088502000"},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ActiveIngredient"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"274783",display:"insulin glargine",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"BrandName"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"261551",display:"Lantus",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ClinicalDrug_TTY_SCD"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"847230",display:"3 ML insulin glargine 100 UNT/ML Pen Injector",userSelected:!1}]},subject:{reference:"Patient/88a0a417-c046-4dc8-b3dc-f1c1c2d3a1ce",type:"Patient"},performer:[{actor:{reference:"Organization/c40671c0-e0e6-4dcd-beb2-0188e1d6ee1c",type:"Organization",display:"Longs Drug Stores California LLC"}}],daysSupply:{value:90},whenPrepared:"2022-11-07",whenHandedOver:"2022-11-07",dosageInstruction:[{text:"Inject 3 ML with enclosed pen injector every morning. "}]},search:{mode:"match"}},{resource:{resourceType:"MedicationDispense",id:"6b16e363",meta:{extension:[{url:"https://zusapi.com/terminology/enrichment/sha256sum",valueBase64Binary:"epixaZTVHuAeIf6niYDrfVV4pQV5q/HeQz2uHgQq/zo="},{url:"https://zusapi.com/created-at",valueInstant:"2022-11-08T15:03:16.924+00:00"}],versionId:"2",lastUpdated:"2022-11-08T15:03:17.023+00:00",source:"#a688dc760a69ef96",tag:[{system:"https://zusapi.com/thirdparty/source",code:"surescripts"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"}]},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"f5ba64c5-4f66-45cf-b07d-84ed828138e0"}],status:"completed",medicationCodeableConcept:{coding:[{system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"847232"},{system:"http://hl7.org/fhir/sid/ndc",code:"00088502000"},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ActiveIngredient"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"274783",display:"insulin glargine",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"BrandName"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"261551",display:"Lantus",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ClinicalDrug_TTY_SCD"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"847230",display:"3 ML insulin glargine 100 UNT/ML Pen Injector",userSelected:!1}]},subject:{reference:"Patient/88a0a417-c046-4dc8-b3dc-f1c1c2d3a1ce",type:"Patient"},performer:[{actor:{reference:"Organization/c40671c0-e0e6-4dcd-beb2-0188e1d6ee1c",type:"Organization",display:"Longs Drug Stores California LLC"}}],daysSupply:{value:90},whenPrepared:"2021-08-01",whenHandedOver:"2021-08-01",dosageInstruction:[{text:"Inject 3 ML with enclosed pen injector every morning. "}]},search:{mode:"match"}},{resource:{resourceType:"MedicationDispense",id:"fa20f4e2",meta:{extension:[{url:"https://zusapi.com/terminology/enrichment/sha256sum",valueBase64Binary:"epixaZTVHuAeIf6niYDrfVV4pQV5q/HeQz2uHgQq/zo="},{url:"https://zusapi.com/created-at",valueInstant:"2022-11-08T15:03:16.095+00:00"}],versionId:"2",lastUpdated:"2022-11-08T15:03:16.186+00:00",source:"#fb7fffbb372d7019",tag:[{system:"https://zusapi.com/thirdparty/source",code:"surescripts"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"}]},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"f5ba64c5-4f66-45cf-b07d-84ed828138e0"}],status:"completed",medicationCodeableConcept:{coding:[{system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"847232"},{system:"http://hl7.org/fhir/sid/ndc",code:"00088502000"},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ActiveIngredient"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"274783",display:"insulin glargine",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"BrandName"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"261551",display:"Lantus",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ClinicalDrug_TTY_SCD"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"847230",display:"3 ML insulin glargine 100 UNT/ML Pen Injector",userSelected:!1}]},subject:{reference:"Patient/88a0a417-c046-4dc8-b3dc-f1c1c2d3a1ce",type:"Patient"},performer:[{actor:{reference:"Organization/c40671c0-e0e6-4dcd-beb2-0188e1d6ee1c",type:"Organization",display:"Longs Drug Stores California LLC"}}],daysSupply:{value:90},whenPrepared:"2021-11-01",whenHandedOver:"2021-11-01",dosageInstruction:[{text:"Inject 3 ML with enclosed pen injector every morning. "}]},search:{mode:"match"}},{resource:{resourceType:"MedicationDispense",id:"99b5e53c",meta:{extension:[{url:"https://zusapi.com/terminology/enrichment/sha256sum",valueBase64Binary:"epixaZTVHuAeIf6niYDrfVV4pQV5q/HeQz2uHgQq/zo="},{url:"https://zusapi.com/created-at",valueInstant:"2022-11-08T15:03:16.302+00:00"}],versionId:"2",lastUpdated:"2022-11-08T15:03:16.362+00:00",source:"#32f8e25a6a55c5fe",tag:[{system:"https://zusapi.com/thirdparty/source",code:"surescripts"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"}]},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"f5ba64c5-4f66-45cf-b07d-84ed828138e0"}],status:"completed",medicationCodeableConcept:{coding:[{system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"847232"},{system:"http://hl7.org/fhir/sid/ndc",code:"00088502000"},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ActiveIngredient"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"274783",display:"insulin glargine",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"BrandName"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"261551",display:"Lantus",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ClinicalDrug_TTY_SCD"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"847230",display:"3 ML insulin glargine 100 UNT/ML Pen Injector",userSelected:!1}]},subject:{reference:"Patient/88a0a417-c046-4dc8-b3dc-f1c1c2d3a1ce",type:"Patient"},performer:[{actor:{reference:"Organization/c40671c0-e0e6-4dcd-beb2-0188e1d6ee1c",type:"Organization",display:"Longs Drug Stores California LLC"}}],daysSupply:{value:90},whenPrepared:"2022-03-26",whenHandedOver:"2022-03-26",dosageInstruction:[{text:"Inject 3 ML with enclosed pen injector every morning. "}]},search:{mode:"match"}},{resource:{resourceType:"MedicationDispense",id:"4c19932e",meta:{extension:[{url:"https://zusapi.com/terminology/enrichment/sha256sum",valueBase64Binary:"epixaZTVHuAeIf6niYDrfVV4pQV5q/HeQz2uHgQq/zo="},{url:"https://zusapi.com/created-at",valueInstant:"2022-11-08T15:03:16.489+00:00"}],versionId:"2",lastUpdated:"2022-11-08T15:03:16.575+00:00",source:"#4f8e7042439c27dd",tag:[{system:"https://zusapi.com/thirdparty/source",code:"surescripts"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"}]},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"f5ba64c5-4f66-45cf-b07d-84ed828138e0"}],status:"completed",medicationCodeableConcept:{coding:[{system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"847232"},{system:"http://hl7.org/fhir/sid/ndc",code:"00088502000"},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ActiveIngredient"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"274783",display:"insulin glargine",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"BrandName"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"261551",display:"Lantus",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ClinicalDrug_TTY_SCD"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"847230",display:"3 ML insulin glargine 100 UNT/ML Pen Injector",userSelected:!1}]},subject:{reference:"Patient/88a0a417-c046-4dc8-b3dc-f1c1c2d3a1ce",type:"Patient"},performer:[{actor:{reference:"Organization/c40671c0-e0e6-4dcd-beb2-0188e1d6ee1c",type:"Organization",display:"Longs Drug Stores California LLC"}}],daysSupply:{value:90},whenPrepared:"2022-07-05",whenHandedOver:"2022-07-05",dosageInstruction:[{text:"Inject 3 ML with enclosed pen injector every morning. "}]},search:{mode:"match"}},{resource:{resourceType:"Patient",id:"88a0a417",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2022-11-08T15:02:24.281+00:00"}],versionId:"2",lastUpdated:"2022-11-08T15:02:24.707+00:00",source:"#4173062084810e76",security:[{system:"http://terminology.hl7.org/CodeSystem/v3-ActReason",code:"HTEST"}],tag:[{system:"https://zusapi.com/thirdparty/source",code:"surescripts"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"}]},identifier:[{system:"https://zusapi.com/fhir/identifier/universal-id",value:"f5ba64c5-4f66-45cf-b07d-84ed828138e0"}],name:[{family:"Shah",given:["Akhil"]}],telecom:[{system:"email",value:"akhil.shah@example.com"},{system:"phone",value:"555-739-0835",use:"home"},{system:"phone",value:"555-737-8967",use:"mobile"}],gender:"male",birthDate:"2010-08-16",address:[{line:["83 SHADOW LN"],city:"LAS VEGAS",state:"NV",postalCode:"89106-4119"}]},search:{mode:"include"}},{resource:{resourceType:"Organization",id:"c40671c0",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2022-11-08T15:02:12.472+00:00"}],versionId:"1",lastUpdated:"2022-11-08T15:02:12.528+00:00",source:"#tOneu1PaqCCk4CMB",tag:[{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"}]},name:"Longs Drug Stores California LLC",telecom:[{system:"phone",value:"702-255-2554"}],address:[{line:["9430 DEL WEBB BLVD"],city:"LAS VEGAS",state:"NV",postalCode:"89134-8314"}]},search:{mode:"include"}}]},h={resourceType:"Bundle",id:"1e2d41d5",type:"searchset",total:2,entry:[{resource:{resourceType:"MedicationRequest",id:"6a16eba4-7d86-4e4a-8005-34367553ca05",meta:{extension:[{url:"https://zusapi.com/terminology/enrichment/sha256sum",valueBase64Binary:"epixaZTVHuAeIf6niYDrfVV4pQV5q/HeQz2uHgQq/zo="},{url:"https://zusapi.com/created-at",valueInstant:"2022-11-08T15:03:15.075+00:00"}],versionId:"2",lastUpdated:"2022-11-08T15:03:15.346+00:00",source:"#72e10f1a346fe95a",tag:[{system:"https://zusapi.com/thirdparty/source",code:"surescripts"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"}]},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"f5ba64c5-4f66-45cf-b07d-84ed828138e0"}],status:"active",intent:"order",medicationCodeableConcept:{coding:[{system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"847232"},{system:"http://hl7.org/fhir/sid/ndc",code:"00088502000"},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ActiveIngredient"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"274783",display:"insulin glargine",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"BrandName"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"261551",display:"Lantus",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ClinicalDrug_TTY_SCD"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"847230",display:"3 ML insulin glargine 100 UNT/ML Pen Injector",userSelected:!1}]},subject:{reference:"Patient/88a0a417-c046-4dc8-b3dc-f1c1c2d3a1ce",type:"Patient"},encounter:{reference:"Encounter/cd147f46-3b9a-4f71-b23c-c451b93b4620",type:"Encounter",display:"Office visit 30 min, Sally McCann"},authoredOn:"2021-08-01",requester:{reference:"Practitioner/6c7f3ad6-6849-4dd8-9cd6-6c16865cfdd8",type:"Practitioner",display:"Sally McCann"},recorder:{reference:"Practitioner/6c7f3ad6-6849-4dd8-9cd6-6c16865cfdd8",type:"Practitioner",display:"Sally McCann"},dosageInstruction:[{text:"Inject 3 ML with enclosed pen injector every morning. "}],dispenseRequest:{numberOfRepeatsAllowed:4,quantity:{value:90,unit:"days"},performer:{reference:"Organization/c40671c0-e0e6-4dcd-beb2-0188e1d6ee1c",type:"Organization",display:"Longs Drug Stores California LLC"}}},search:{mode:"match"}},{resource:{resourceType:"Patient",id:"88a0a417",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2022-11-08T15:02:24.281+00:00"}],versionId:"2",lastUpdated:"2022-11-08T15:02:24.707+00:00",source:"#4173062084810e76",security:[{system:"http://terminology.hl7.org/CodeSystem/v3-ActReason",code:"HTEST"}],tag:[{system:"https://zusapi.com/thirdparty/source",code:"surescripts"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"}]},identifier:[{system:"https://zusapi.com/fhir/identifier/universal-id",value:"f5ba64c5-4f66-45cf-b07d-84ed828138e0"}],name:[{family:"Shah",given:["Akhil"]}],telecom:[{system:"email",value:"akhil.shah@example.com"},{system:"phone",value:"555-739-0835",use:"home"},{system:"phone",value:"555-737-8967",use:"mobile"}],gender:"male",birthDate:"2010-08-16",address:[{line:["83 SHADOW LN"],city:"LAS VEGAS",state:"NV",postalCode:"89106-4119"}]},search:{mode:"include"}}]},y={resourceType:"Bundle",id:"c1db2d18",meta:{lastUpdated:"2022-11-14T18:57:45.140+00:00"},type:"searchset",entry:[{resource:{resourceType:"Patient",id:"1234-007",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2022-11-08T15:02:14.762+00:00"}],versionId:"2",lastUpdated:"2022-11-08T15:02:15.233+00:00",source:"#829e9998c8d6fa1a",security:[{system:"http://terminology.hl7.org/CodeSystem/v3-ActReason",code:"HTEST"}],tag:[{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"}]},identifier:[{system:"https://Storybookmedical.com/patient-id",value:"12345"},{system:"https://zusapi.com/fhir/identifier/universal-id",value:"007"}],name:[{family:"Shah",given:["Akhil"]}],telecom:[{system:"email",value:"akhil.shah@example.com"},{system:"phone",value:"555-739-0835",use:"home"},{system:"phone",value:"555-737-8967",use:"mobile"}],gender:"male",birthDate:"2010-08-16",address:[{line:["83 SHADOW LN"],city:"LAS VEGAS",state:"NV",postalCode:"89106-4119"}],maritalStatus:{coding:[{system:"http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",code:"S",display:"Single"}],text:"Single"},contact:[{relationship:[{coding:[{system:"http://terminology.hl7.org/CodeSystem/v2-0131",code:"C",display:"Emergency contact"}],text:"Emergency contact"}],name:{family:"Shah",given:["Sonah"]},telecom:[{system:"phone",value:"555-843-3900",use:"home"},{system:"email",value:"sonal.shah@example.com"}]}]},search:{mode:"match"}}]};let a,l;function D({providerMedications:s,otherProviderMedications:t}){return{decorators:[e=>(a=c.exports.cloneDeep(s),l=c.exports.cloneDeep(t),u.exports.createElement(e))],parameters:{msw:[g,f,v,z,S,x]}}}const g=n.rest.get("https://api.dev.zusapi.com/fhir/Patient",(s,t,e)=>t(e.delay(750),e.status(200),e.json(y))),f=n.rest.get("https://api.dev.zusapi.com/fhir/MedicationStatement",(s,t,e)=>s.url.searchParams.get("_tag:not")?t(e.status(200),e.json(a)):t(e.status(200),e.json(l))),v=n.rest.post("https://api.dev.zusapi.com/fhir/MedicationStatement",async(s,t,e)=>{var r,o;const i=await s.json();return i.id=d(),(r=a.entry)==null||r.push({resource:i,search:{mode:"match"}}),a.total=(o=a.entry)==null?void 0:o.length,t(e.status(200),e.json(i))}),z=n.rest.get("https://api.dev.zusapi.com/fhir/MedicationRequest",(s,t,e)=>t(e.status(200),e.json(h))),S=n.rest.get("https://api.dev.zusapi.com/fhir/MedicationDispense",(s,t,e)=>t(e.status(200),e.json(p))),x=n.rest.get("https://api.dev.zusapi.com/fhir/MedicationAdministration",(s,t,e)=>t(e.status(200),e.json(m)));export{M as o,C as p,D as s};
//# sourceMappingURL=requests.bddc0586.js.map

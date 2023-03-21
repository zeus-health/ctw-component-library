import{a as i}from"./request-5a1df4c1.js";import{r as T}from"./index-6f814c40.js";import{p as S}from"./patient-8f4a0ec9.js";import{c as g,w}from"./values-0b6ffb91.js";import{v as f}from"./patient-provider-a45d74ab.js";const o=[{system:"https://zusapi.com/lens",code:"ActiveMedications"},{system:"https://zusapi.com/summary",code:"Common"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"},{system:"https://zusapi.com/lens/upid",code:"57ddcfa9-6df8-4d00-a86d-c63c0faad93f"}],B={resourceType:"Bundle",id:"7c7a1c16",type:"searchset",total:5,entry:[{resource:{resourceType:"MedicationStatement",id:"84c35b67",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2022-11-21T18:21:52.653+00:00"}],versionId:"2",lastUpdated:"2022-11-08T15:03:31.124+00:00",source:"#b9875aae99734b0c",tag:o},extension:[{url:"https://zusapi.com/lens/extension/aggregatedFrom",extension:[{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationAdministration/d7571c17-1e36-4c38-8149-e30ee3b18481",type:"MedicationAdministration"}}]},{url:"https://zusapi.com/lens/extension/medicationLastFillDate",valueString:"NO-VALUE"},{url:"https://zusapi.com/lens/extension/medicationLastPrescribedDate",valueString:"NO-VALUE"},{url:"https://zusapi.com/lens/extension/medicationQuantity",valueQuantity:{value:100,unit:"ml"}},{url:"https://zusapi.com/lens/extension/medicationDaysSupply",valueString:"NO-VALUE"},{url:"https://zusapi.com/lens/extension/medicationRefills",valueString:"NO-VALUE"},{url:"https://zusapi.com/lens/extension/medicationLastPrescriber",valueString:"NO-VALUE"},{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"57ddcfa9-6df8-4d00-a86d-c63c0faad93f"}],status:"active",medicationCodeableConcept:{coding:[{system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"2179744"},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ActiveIngredient"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"253182",display:"insulin, regular, human",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"BrandName"}],system:"http://terminology.hl7.org/CodeSystem/v3-NullFlavor",code:"UNK",display:"unknown",userSelected:!1}],text:"regular insulin, human 100 UNT in 100 ML Injection"},subject:{reference:"Patient/007",type:"Patient"},dateAsserted:"2022-06-11T03:15:00+00:00",dosage:[{route:{text:"Intramuscular"},doseAndRate:[{doseQuantity:{value:100,unit:"ml"}}]}]},search:{mode:"match"}},{resource:{resourceType:"MedicationStatement",id:"6f7a2c5e",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2022-11-21T18:22:55.266+00:00"}],versionId:"2",lastUpdated:"2022-11-08T15:03:31.148+00:00",source:"#b9875aae99734b0c",tag:o},extension:[{url:"https://zusapi.com/lens/extension/aggregatedFrom",extension:[{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/8952694e-c4ef-4432-ada6-6aeb2e193b88",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/0beb9677-f9b4-451d-9552-66652741ae58",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/503b8b45-c132-4ad2-8d2b-69e6d0e192d9",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationRequest/dbfa6885-b087-4fda-a9d6-f494dfe51e0a",type:"MedicationRequest"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/6ec0dc8c-8f96-44ad-800d-e4efce371314",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/57d85687-4a53-4fb1-aa13-ef802fc741c0",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationStatement/c3644cd7-676e-4d9d-9248-1479d70f5527",type:"MedicationStatement"}}]},{url:"https://zusapi.com/lens/extension/medicationLastFillDate",valueDateTime:"2022-11-07"},{url:"https://zusapi.com/lens/extension/medicationLastPrescribedDate",valueDateTime:"2021-08-01"},{url:"https://zusapi.com/lens/extension/medicationQuantity",valueQuantity:{value:90,unit:"days"}},{url:"https://zusapi.com/lens/extension/medicationDaysSupply",valueQuantity:{value:90}},{url:"https://zusapi.com/lens/extension/medicationRefills",valueUnsignedInt:4},{url:"https://zusapi.com/lens/extension/medicationLastPrescriber",valueReference:{reference:"Practitioner/a8b57218-3699-4354-bf39-b73175ba85e0",type:"Practitioner",display:"Sally McCann"}},{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"57ddcfa9-6df8-4d00-a86d-c63c0faad93f"}],status:"active",medicationCodeableConcept:{coding:[{system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"977840"},{system:"http://hl7.org/fhir/sid/ndc",code:"54569663100"},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ActiveIngredient"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"51428",display:"insulin aspart, human",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"BrandName"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"1372741",display:"NovoLog Mix",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ClinicalDrug_TTY_SCD"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"847191",display:"3 ML insulin aspart protamine, human 70 UNT/ML / insulin aspart, human 30 UNT/ML Pen Injector",userSelected:!1}],text:"3 ML insulin aspart protamine, human 70 UNT/ML / insulin aspart, human 30 UNT/ML Pen Injector [NovoLog Mix]"},subject:{reference:"Patient/007",type:"Patient"},dateAsserted:"2022-11-07",dosage:[{text:"Inject 3 ML before meals. Quantity: 90 days"}]},search:{mode:"match"}},{resource:{resourceType:"MedicationStatement",id:"c2610752",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2022-11-21T18:22:55.266+00:00"}],versionId:"2",lastUpdated:"2022-11-08T15:03:31.098+00:00",source:"#b9875aae99734b0c",tag:o},extension:[{url:"https://zusapi.com/lens/extension/aggregatedFrom",extension:[{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/d03627d0-31cc-48b7-b435-21767d0bb7cc",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/f991a969-8848-4493-b794-3dfadd047f6c",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/e89f2f5f-3429-4288-9e84-2b9db45473eb",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/c82e7f47-7ee7-4b53-b901-21e068fd7b59",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationRequest/902e3223-b7c1-449c-a716-59e5687b4af6",type:"MedicationRequest"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/6837bd08-5ba3-4ce7-82d7-abf3676d75b5",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationStatement/146fe496-2343-4a5d-9814-730e8ef3fdb4",type:"MedicationStatement"}}]},{url:"https://zusapi.com/lens/extension/medicationLastFillDate",valueDateTime:"2022-11-07"},{url:"https://zusapi.com/lens/extension/medicationLastPrescribedDate",valueDateTime:"2021-08-01"},{url:"https://zusapi.com/lens/extension/medicationQuantity",valueQuantity:{value:90,unit:"days"}},{url:"https://zusapi.com/lens/extension/medicationDaysSupply",valueQuantity:{value:90}},{url:"https://zusapi.com/lens/extension/medicationRefills",valueUnsignedInt:4},{url:"https://zusapi.com/lens/extension/medicationLastPrescriber",valueReference:{reference:"Practitioner/a8b57218-3699-4354-bf39-b73175ba85e0",type:"Practitioner",display:"Mike McDonald"}},{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"57ddcfa9-6df8-4d00-a86d-c63c0faad93f"}],status:"active",medicationCodeableConcept:{coding:[{system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"847232"},{system:"http://hl7.org/fhir/sid/ndc",code:"00088502000"},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ActiveIngredient"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"274783",display:"insulin glargine",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"BrandName"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"261551",display:"Lantus",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ClinicalDrug_TTY_SCD"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"847230",display:"3 ML insulin glargine 100 UNT/ML Pen Injector",userSelected:!1}],text:"3 ML insulin glargine 100 UNT/ML Pen Injector [Lantus]"},subject:{reference:"Patient/007",type:"Patient"},dateAsserted:"2022-11-07",dosage:[{text:"Inject 3 ML with enclosed pen injector every morning. "}]},search:{mode:"match"}},{resource:{resourceType:"MedicationStatement",id:"219fe7ae",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2022-11-21T18:22:55.266+00:00"}],versionId:"2",lastUpdated:"2022-11-08T15:03:31.174+00:00",source:"#b9875aae99734b0c",tag:o},extension:[{url:"https://zusapi.com/lens/extension/aggregatedFrom",extension:[{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationRequest/d2102ea3-e515-45be-a611-eac1daf4d345",type:"MedicationRequest"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/8110cb8c-927e-49aa-9513-cb559d9875cc",type:"MedicationDispense"}}]},{url:"https://zusapi.com/lens/extension/medicationLastFillDate",valueDateTime:"2022-09-20"},{url:"https://zusapi.com/lens/extension/medicationLastPrescribedDate",valueDateTime:"2022-09-20"},{url:"https://zusapi.com/lens/extension/medicationQuantity",valueQuantity:{value:14,unit:"days"}},{url:"https://zusapi.com/lens/extension/medicationDaysSupply",valueQuantity:{value:14}},{url:"https://zusapi.com/lens/extension/medicationRefills",valueUnsignedInt:0},{url:"https://zusapi.com/lens/extension/medicationLastPrescriber",valueReference:{reference:"Practitioner/a8b57218-3699-4354-bf39-b73175ba85e0",type:"Practitioner",display:"Dr. People Person"}},{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"57ddcfa9-6df8-4d00-a86d-c63c0faad93f"}],status:"active",medicationCodeableConcept:{coding:[{system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"1180459"},{system:"http://hl7.org/fhir/sid/ndc",code:"55887023697"},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"Standardization"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"876195",display:"polyethylene glycol 3350 17000 MG Powder for Oral Solution [Miralax]",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ActiveIngredient"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"221147",display:"polyethylene glycol 3350",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"BrandName"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"261575",display:"Miralax",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ClinicalDrug_TTY_SCD"}],system:"http://terminology.hl7.org/CodeSystem/v3-NullFlavor",code:"UNK",display:"unknown",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ClinicalDrug_TTY_SCD"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"876193",display:"polyethylene glycol 3350 17000 MG Powder for Oral Solution",userSelected:!1}],text:"Miralax Oral Product"},subject:{reference:"Patient/007",type:"Patient"},dateAsserted:"2022-09-20",dosage:[{text:"Dissolve 17g in 4–8oz liquid and drink once daily for up to 7 days."}]},search:{mode:"match"}},{resource:{resourceType:"MedicationStatement",id:"0851de14",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2022-11-21T19:52:58.330+00:00"}],versionId:"1",lastUpdated:"2022-11-08T18:47:34.568+00:00",source:"#b9875aae99734b0c",tag:o},extension:[{url:"https://zusapi.com/lens/extension/aggregatedFrom",extension:[{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationStatement/e23c0023-d7ad-4834-9adb-a71e54ccbcd2",type:"MedicationStatement"}}]},{url:"https://zusapi.com/lens/extension/medicationLastFillDate",valueString:"NO-VALUE"},{url:"https://zusapi.com/lens/extension/medicationLastPrescribedDate",valueString:"NO-VALUE"},{url:"https://zusapi.com/lens/extension/medicationQuantity",valueString:"NO-VALUE"},{url:"https://zusapi.com/lens/extension/medicationDaysSupply",valueString:"NO-VALUE"},{url:"https://zusapi.com/lens/extension/medicationRefills",valueString:"NO-VALUE"},{url:"https://zusapi.com/lens/extension/medicationLastPrescriber",valueString:"NO-VALUE"},{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"57ddcfa9-6df8-4d00-a86d-c63c0faad93f"}],status:"active",medicationCodeableConcept:{coding:[{system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"895994"},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ActiveIngredient"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"50121",display:"fluticasone propionate",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"BrandName"}],system:"http://terminology.hl7.org/CodeSystem/v3-NullFlavor",code:"UNK",display:"unknown",userSelected:!1}],text:"120 ACTUAT fluticasone propionate 0.044 MG/ACTUAT Metered Dose Inhaler"},subject:{reference:"Patient/007",type:"Patient"},dosage:[{text:"2 puffs daily"}]},search:{mode:"match"}}]},j={resourceType:"Bundle",id:"0b13191b",meta:{lastUpdated:"2022-11-22T20:36:24.102+00:00"},type:"searchset",total:1,entry:[{resource:{resourceType:"MedicationStatement",id:"e23c0023",meta:{extension:[{url:"https://zusapi.com/terminology/enrichment/sha256sum",valueBase64Binary:"axdiRTV5h6fWBD79x7QMzrictUmnbS2kic0ua5qY5yY="},{url:"https://zusapi.com/created-at",valueInstant:"2022-11-21T19:52:51.349+00:00"}],versionId:"2",lastUpdated:"2022-11-21",source:"#90f35e548b45cbc4",tag:[{system:"https://zusapi.com/accesscontrol/owner",code:"builder/123456",display:"Storybook Medical - Test Customer"}]},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"57ddcfa9-6df8-4d00-a86d-c63c0faad93f"}],status:"active",medicationCodeableConcept:{coding:[{system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"895994"},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ActiveIngredient"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"50121",display:"fluticasone propionate",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"BrandName"}],system:"http://terminology.hl7.org/CodeSystem/v3-NullFlavor",code:"UNK",display:"unknown",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ClinicalDrug_TTY_SCD"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"895994",display:"120 ACTUAT fluticasone propionate 0.044 MG/ACTUAT Metered Dose Inhaler",userSelected:!1}],text:"120 ACTUAT fluticasone propionate 0.044 MG/ACTUAT Metered Dose Inhaler "},subject:{reference:"Patient/007",type:"Patient"},dateAsserted:"2022-11-21",dosage:[{text:"2 puffs daily"}]},search:{mode:"match"}}]},C=[{display:"albendazole 200 MG Chewable Tablet",code:"333832"},{display:"albendazole 200 MG Chewable Tablet [Albenza]",code:"1665667"},{display:"albendazole 200 MG Oral Tablet",code:"199672"},{display:"albendazole 200 MG Oral Tablet [Albenza]",code:"211148"},{display:"albuterol 0.21 MG/ML Inhalation Solution",code:"351137"},{display:"albuterol 0.417 MG/ML Inhalation Solution",code:"351136"},{display:"albuterol 0.417 MG/ML Inhalation Solution [Accuneb]",code:"352051"},{display:"albuterol 0.4 MG/ML Oral Solution",code:"755497"},{display:"albuterol 0.833 MG/ML / ipratropium bromide 0.167 MG/ML Inhalation Solution",code:"1437702"},{display:"albuterol 0.833 MG/ML / ipratropium bromide 0.167 MG/ML Inhalation Solution [DuoNeb]",code:"1437704"},{display:"albuterol 0.83 MG/ML Inhalation Solution",code:"630208"},{display:"albuterol 2 MG Oral Tablet",code:"197316"},{display:"albuterol 4 MG Oral Tablet",code:"197318"},{display:"albuterol 5 MG/ML Inhalation Solution",code:"245314"},{display:"albutrepenonacog alfa 1 UNT Injection",code:"1743994"},{display:"albutrepenonacog alfa 1 UNT Injection [IDELVION]",code:"1743999"},{display:"Bacillus anthracis strain V770-NP1-R antigens 0.1 MG/ML Injectable Suspension",code:"832679"},{display:"Bacillus anthracis strain V770-NP1-R antigens 0.1 MG/ML Injectable Suspension [Biothrax]",code:"832682"},{display:"Bacillus coagulans 10000000000 UNT Oral Capsule",code:"1809332"},{display:"Bacillus coagulans 1000000000 UNT / inulin 250 MG Chewable Tablet",code:"2587753"},{display:"Bacillus coagulans 1000000000 UNT / inulin 250 MG Oral Capsule",code:"1441383"},{display:"Bacillus coagulans 1000000000 UNT Oral Capsule",code:"2587664"},{display:"Bacillus coagulans 2000000000 UNT Oral Capsule",code:"2478633"},{display:"Bacillus coagulans 2500000000 UNT Chewable Tablet",code:"2570414"},{display:"Bacillus coagulans 250000000 UNT Chewable Tablet",code:"1670414"},{display:"Bacillus coagulans 25000000 UNT / Lactobacillus acidophilus 35000000 UNT Oral Tablet",code:"1147378"},{display:"Bacillus coagulans 3000000000 UNT Oral Capsule",code:"1809376"},{display:"Bacillus coagulans 400000000 UNT Chewable Tablet",code:"2478631"},{display:"Bacillus coagulans 800000000 UNT Oral Tablet",code:"2383957"},{display:"Bacillus subtilis 1500000000 UNT / inulin 1000 MG Chewable Tablet",code:"2261778"},{display:"bacitracin 0.4 UNT/MG / hydrocortisone 0.01 MG/MG / neomycin 0.0035 MG/MG / polymyxin B 5 UNT/MG Topical Ointment",code:"657561"},{display:"bacitracin 0.4 UNT/MG / hydrocortisone 0.01 MG/MG / neomycin 0.0035 MG/MG / polymyxin B 5 UNT/MG Topical Ointment [Cortisporin Ointment]",code:"688704"},{display:"bacitracin 0.4 UNT/MG / lidocaine 0.04 MG/MG / neomycin 0.0035 MG/MG / polymyxin B 5 UNT/MG Topical Ointment",code:"1098397"},{display:"bacitracin 0.4 UNT/MG / neomycin 0.0035 MG/MG / polymyxin B 10 UNT/MG Ophthalmic Ointment",code:"308493"},{display:"bacitracin 0.4 UNT/MG / neomycin 0.0035 MG/MG / polymyxin B 10 UNT/MG Ophthalmic Ointment [Neo-Polycin]",code:"1117090"},{display:"bacitracin 0.4 UNT/MG / neomycin 0.0035 MG/MG / polymyxin B 10 UNT/MG / pramoxine hydrochloride 0.01 MG/MG Topical Ointment",code:"1359343"},{display:"C1 esterase inhibitor (human) 2000 UNT Injection",code:"1926818"},{display:"C1 esterase inhibitor (human) 2000 UNT Injection [Haegarda]",code:"1926823"},{display:"C1 esterase inhibitor (human) 3000 UNT Injection",code:"1926825"},{display:"C1 esterase inhibitor (human) 3000 UNT Injection [Haegarda]",code:"1926827"},{display:"C1 esterase inhibitor (human) 500 UNT Injection",code:"1729336"},{display:"C1 esterase inhibitor (human) 500 UNT Injection [Berinert]",code:"867381"},{display:"C1 esterase inhibitor (human) 500 UNT Injection [Cinryze]",code:"809871"},{display:"C1 esterase inhibitor (recombinant) 2100 UNT Injection",code:"1599836"},{display:"C1 esterase inhibitor (recombinant) 2100 UNT Injection [Ruconest]",code:"1599841"},{display:"cabergoline 0.5 MG Oral Tablet",code:"199703"},{display:"cabotegravir 30 MG Oral Tablet",code:"2475199"},{display:"cabotegravir 30 MG Oral Tablet [Vocabria]",code:"2475205"},{display:"cabozantinib 20 MG Oral Capsule",code:"1363273"},{display:"cabozantinib 20 MG Oral Capsule [Cometriq]",code:"1363279"},{display:"cabozantinib 20 MG Oral Tablet",code:"1790161"},{display:"cabozantinib 20 MG Oral Tablet [Cabometyx]",code:"1790167"},{display:"cabozantinib 40 MG Oral Tablet",code:"1790169"},{display:"cabozantinib 40 MG Oral Tablet [Cabometyx]",code:"1790171"},{display:"cabozantinib 60 MG Oral Tablet",code:"1790173"},{display:"cabozantinib 60 MG Oral Tablet [Cabometyx]",code:"1790175"}],L={resourceType:"Bundle",id:"e23143d2",type:"searchset",total:3,entry:[{resource:{resourceType:"MedicationAdministration",id:"d7571c17-1e36-4c38-8149-e30ee3b18481",meta:{extension:[{url:"https://zusapi.com/terminology/enrichment/sha256sum",valueBase64Binary:"QpOAfH5cGwbtNc6rbx+7OW2gBaNqUpZjKFW5H10aaDQ="},{url:"https://zusapi.com/created-at",valueInstant:"2022-11-21T18:21:42.877+00:00"}],versionId:"2",lastUpdated:"2022-11-21T18:21:43.037+00:00",source:"#5b771d76a2028e1c",tag:[{system:"https://zusapi.com/thirdparty/source",code:"commonwell"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"}]},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"57ddcfa9"}],status:"completed",medicationCodeableConcept:{coding:[{system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"2179744"},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ActiveIngredient"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"253182",display:"insulin, regular, human",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"BrandName"}],system:"http://terminology.hl7.org/CodeSystem/v3-NullFlavor",code:"UNK",display:"unknown",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ClinicalDrug_TTY_SCD"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"2179744",display:"100 ML insulin, regular, human 1 UNT/ML Injection",userSelected:!1}]},subject:{reference:"Patient/007",type:"Patient"},effectivePeriod:{start:"2022-06-11T03:15:00+00:00",end:"2022-06-11T03:15:00+00:00"},dosage:{route:{text:"Intramuscular"},dose:{value:100,unit:"ml"}}},search:{mode:"match"}},{resource:{resourceType:"Patient",id:"976954a4",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2022-11-21T18:21:42.532+00:00"}],versionId:"2",lastUpdated:"2022-11-21T18:21:42.735+00:00",source:"#68bb7ed53a5b0f5d",security:[{system:"http://terminology.hl7.org/CodeSystem/v3-ActReason",code:"HTEST"}],tag:[{system:"https://zusapi.com/thirdparty/source",code:"commonwell"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"}]},identifier:[{system:"https://zusapi.com/fhir/identifier/universal-id",value:"57ddcfa9"}],name:[{family:"Shah",given:["Akhil"]}],telecom:[{system:"email",value:"akhil.shah@example.com"},{system:"phone",value:"555-951-2842",use:"home"},{system:"phone",value:"555-861-6875",use:"mobile"}],gender:"male",birthDate:"2007-12-13",address:[{line:["121 SHADOW LN"],city:"LAS VEGAS",state:"NV",postalCode:"89106-4119"}],managingOrganization:{reference:"Organization/af0276b9-9a91-4a34-871e-6ac2115fae17"}},search:{mode:"include"}},{resource:{resourceType:"Organization",id:"af0276b9",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2022-11-21T18:21:37.320+00:00"}],versionId:"1",lastUpdated:"2022-11-21T18:21:37.321+00:00",source:"#XgOPpWgfRvpfdykH",tag:[{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"}]},name:"Endo Health"},search:{mode:"include"}}]},I={resourceType:"Bundle",id:"3890b281",type:"searchset",total:7,entry:[{resource:{resourceType:"MedicationDispense",id:"d88a5a54-8a45-4027-ab9e-233e80fc8899",meta:{extension:[{url:"https://zusapi.com/terminology/enrichment/sha256sum",valueBase64Binary:"epixaZTVHuAeIf6niYDrfVV4pQV5q/HeQz2uHgQq/zo="},{url:"https://zusapi.com/created-at",valueInstant:"2022-11-08T15:03:16.698+00:00"}],versionId:"2",lastUpdated:"2022-11-08T15:03:16.794+00:00",source:"#a8afcb8e41fcf85f",tag:[{system:"https://zusapi.com/thirdparty/source",code:"surescripts"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"}]},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"f5ba64c5-4f66-45cf-b07d-84ed828138e0"}],status:"completed",medicationCodeableConcept:{coding:[{system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"847232"},{system:"http://hl7.org/fhir/sid/ndc",code:"00088502000"},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ActiveIngredient"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"274783",display:"insulin glargine",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"BrandName"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"261551",display:"Lantus",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ClinicalDrug_TTY_SCD"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"847230",display:"3 ML insulin glargine 100 UNT/ML Pen Injector",userSelected:!1}]},subject:{reference:"Patient/88a0a417-c046-4dc8-b3dc-f1c1c2d3a1ce",type:"Patient"},performer:[{actor:{reference:"Organization/c40671c0-e0e6-4dcd-beb2-0188e1d6ee1c",type:"Organization",display:"Longs Drug Stores California LLC"}}],daysSupply:{value:90},whenPrepared:"2022-11-07",whenHandedOver:"2022-11-07",dosageInstruction:[{text:"Inject 3 ML with enclosed pen injector every morning. "}]},search:{mode:"match"}},{resource:{resourceType:"MedicationDispense",id:"6b16e363",meta:{extension:[{url:"https://zusapi.com/terminology/enrichment/sha256sum",valueBase64Binary:"epixaZTVHuAeIf6niYDrfVV4pQV5q/HeQz2uHgQq/zo="},{url:"https://zusapi.com/created-at",valueInstant:"2022-11-08T15:03:16.924+00:00"}],versionId:"2",lastUpdated:"2022-11-08T15:03:17.023+00:00",source:"#a688dc760a69ef96",tag:[{system:"https://zusapi.com/thirdparty/source",code:"surescripts"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"}]},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"f5ba64c5-4f66-45cf-b07d-84ed828138e0"}],status:"completed",medicationCodeableConcept:{coding:[{system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"847232"},{system:"http://hl7.org/fhir/sid/ndc",code:"00088502000"},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ActiveIngredient"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"274783",display:"insulin glargine",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"BrandName"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"261551",display:"Lantus",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ClinicalDrug_TTY_SCD"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"847230",display:"3 ML insulin glargine 100 UNT/ML Pen Injector",userSelected:!1}]},subject:{reference:"Patient/88a0a417-c046-4dc8-b3dc-f1c1c2d3a1ce",type:"Patient"},performer:[{actor:{reference:"Organization/c40671c0-e0e6-4dcd-beb2-0188e1d6ee1c",type:"Organization",display:"Longs Drug Stores California LLC"}}],daysSupply:{value:90},whenPrepared:"2021-08-01",whenHandedOver:"2021-08-01",dosageInstruction:[{text:"Inject 3 ML with enclosed pen injector every morning. "}]},search:{mode:"match"}},{resource:{resourceType:"MedicationDispense",id:"fa20f4e2",meta:{extension:[{url:"https://zusapi.com/terminology/enrichment/sha256sum",valueBase64Binary:"epixaZTVHuAeIf6niYDrfVV4pQV5q/HeQz2uHgQq/zo="},{url:"https://zusapi.com/created-at",valueInstant:"2022-11-08T15:03:16.095+00:00"}],versionId:"2",lastUpdated:"2022-11-08T15:03:16.186+00:00",source:"#fb7fffbb372d7019",tag:[{system:"https://zusapi.com/thirdparty/source",code:"surescripts"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"}]},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"f5ba64c5-4f66-45cf-b07d-84ed828138e0"}],status:"completed",medicationCodeableConcept:{coding:[{system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"847232"},{system:"http://hl7.org/fhir/sid/ndc",code:"00088502000"},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ActiveIngredient"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"274783",display:"insulin glargine",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"BrandName"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"261551",display:"Lantus",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ClinicalDrug_TTY_SCD"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"847230",display:"3 ML insulin glargine 100 UNT/ML Pen Injector",userSelected:!1}]},subject:{reference:"Patient/88a0a417-c046-4dc8-b3dc-f1c1c2d3a1ce",type:"Patient"},performer:[{actor:{reference:"Organization/c40671c0-e0e6-4dcd-beb2-0188e1d6ee1c",type:"Organization",display:"Longs Drug Stores California LLC"}}],daysSupply:{value:90},whenPrepared:"2021-11-01",whenHandedOver:"2021-11-01",dosageInstruction:[{text:"Inject 3 ML with enclosed pen injector every morning. "}]},search:{mode:"match"}},{resource:{resourceType:"MedicationDispense",id:"99b5e53c",meta:{extension:[{url:"https://zusapi.com/terminology/enrichment/sha256sum",valueBase64Binary:"epixaZTVHuAeIf6niYDrfVV4pQV5q/HeQz2uHgQq/zo="},{url:"https://zusapi.com/created-at",valueInstant:"2022-11-08T15:03:16.302+00:00"}],versionId:"2",lastUpdated:"2022-11-08T15:03:16.362+00:00",source:"#32f8e25a6a55c5fe",tag:[{system:"https://zusapi.com/thirdparty/source",code:"surescripts"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"}]},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"f5ba64c5-4f66-45cf-b07d-84ed828138e0"}],status:"completed",medicationCodeableConcept:{coding:[{system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"847232"},{system:"http://hl7.org/fhir/sid/ndc",code:"00088502000"},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ActiveIngredient"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"274783",display:"insulin glargine",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"BrandName"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"261551",display:"Lantus",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ClinicalDrug_TTY_SCD"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"847230",display:"3 ML insulin glargine 100 UNT/ML Pen Injector",userSelected:!1}]},subject:{reference:"Patient/88a0a417-c046-4dc8-b3dc-f1c1c2d3a1ce",type:"Patient"},performer:[{actor:{reference:"Organization/c40671c0-e0e6-4dcd-beb2-0188e1d6ee1c",type:"Organization",display:"Longs Drug Stores California LLC"}}],daysSupply:{value:90},whenPrepared:"2022-03-26",whenHandedOver:"2022-03-26",dosageInstruction:[{text:"Inject 3 ML with enclosed pen injector every morning. "}]},search:{mode:"match"}},{resource:{resourceType:"MedicationDispense",id:"4c19932e",meta:{extension:[{url:"https://zusapi.com/terminology/enrichment/sha256sum",valueBase64Binary:"epixaZTVHuAeIf6niYDrfVV4pQV5q/HeQz2uHgQq/zo="},{url:"https://zusapi.com/created-at",valueInstant:"2022-11-08T15:03:16.489+00:00"}],versionId:"2",lastUpdated:"2022-11-08T15:03:16.575+00:00",source:"#4f8e7042439c27dd",tag:[{system:"https://zusapi.com/thirdparty/source",code:"surescripts"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"}]},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"f5ba64c5-4f66-45cf-b07d-84ed828138e0"}],status:"completed",medicationCodeableConcept:{coding:[{system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"847232"},{system:"http://hl7.org/fhir/sid/ndc",code:"00088502000"},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ActiveIngredient"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"274783",display:"insulin glargine",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"BrandName"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"261551",display:"Lantus",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ClinicalDrug_TTY_SCD"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"847230",display:"3 ML insulin glargine 100 UNT/ML Pen Injector",userSelected:!1}]},subject:{reference:"Patient/88a0a417-c046-4dc8-b3dc-f1c1c2d3a1ce",type:"Patient"},performer:[{actor:{reference:"Organization/c40671c0-e0e6-4dcd-beb2-0188e1d6ee1c",type:"Organization",display:"Longs Drug Stores California LLC"}}],daysSupply:{value:90},whenPrepared:"2022-07-05",whenHandedOver:"2022-07-05",dosageInstruction:[{text:"Inject 3 ML with enclosed pen injector every morning. "}]},search:{mode:"match"}},{resource:{resourceType:"Patient",id:"88a0a417",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2022-11-08T15:02:24.281+00:00"}],versionId:"2",lastUpdated:"2022-11-08T15:02:24.707+00:00",source:"#4173062084810e76",security:[{system:"http://terminology.hl7.org/CodeSystem/v3-ActReason",code:"HTEST"}],tag:[{system:"https://zusapi.com/thirdparty/source",code:"surescripts"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"}]},identifier:[{system:"https://zusapi.com/fhir/identifier/universal-id",value:"f5ba64c5-4f66-45cf-b07d-84ed828138e0"}],name:[{family:"Shah",given:["Akhil"]}],telecom:[{system:"email",value:"akhil.shah@example.com"},{system:"phone",value:"555-739-0835",use:"home"},{system:"phone",value:"555-737-8967",use:"mobile"}],gender:"male",birthDate:"2010-08-16",address:[{line:["83 SHADOW LN"],city:"LAS VEGAS",state:"NV",postalCode:"89106-4119"}]},search:{mode:"include"}},{resource:{resourceType:"Organization",id:"c40671c0",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2022-11-08T15:02:12.472+00:00"}],versionId:"1",lastUpdated:"2022-11-08T15:02:12.528+00:00",source:"#tOneu1PaqCCk4CMB",tag:[{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"}]},name:"Longs Drug Stores California LLC",telecom:[{system:"phone",value:"702-255-2554"}],address:[{line:["9430 DEL WEBB BLVD"],city:"LAS VEGAS",state:"NV",postalCode:"89134-8314"}]},search:{mode:"include"}}]},D={resourceType:"Bundle",id:"1e2d41d5",type:"searchset",total:2,entry:[{resource:{resourceType:"MedicationRequest",id:"6a16eba4-7d86-4e4a-8005-34367553ca05",meta:{extension:[{url:"https://zusapi.com/terminology/enrichment/sha256sum",valueBase64Binary:"epixaZTVHuAeIf6niYDrfVV4pQV5q/HeQz2uHgQq/zo="},{url:"https://zusapi.com/created-at",valueInstant:"2022-11-08T15:03:15.075+00:00"}],versionId:"2",lastUpdated:"2022-11-08T15:03:15.346+00:00",source:"#72e10f1a346fe95a",tag:[{system:"https://zusapi.com/thirdparty/source",code:"surescripts"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"}]},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"f5ba64c5-4f66-45cf-b07d-84ed828138e0"}],status:"active",intent:"order",medicationCodeableConcept:{coding:[{system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"847232"},{system:"http://hl7.org/fhir/sid/ndc",code:"00088502000"},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ActiveIngredient"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"274783",display:"insulin glargine",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"BrandName"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"261551",display:"Lantus",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ClinicalDrug_TTY_SCD"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"847230",display:"3 ML insulin glargine 100 UNT/ML Pen Injector",userSelected:!1}]},subject:{reference:"Patient/88a0a417-c046-4dc8-b3dc-f1c1c2d3a1ce",type:"Patient"},encounter:{reference:"Encounter/cd147f46-3b9a-4f71-b23c-c451b93b4620",type:"Encounter",display:"Office visit 30 min, Sally McCann"},authoredOn:"2021-08-01",requester:{reference:"Practitioner/6c7f3ad6-6849-4dd8-9cd6-6c16865cfdd8",type:"Practitioner",display:"Sally McCann"},recorder:{reference:"Practitioner/6c7f3ad6-6849-4dd8-9cd6-6c16865cfdd8",type:"Practitioner",display:"Sally McCann"},dosageInstruction:[{text:"Inject 3 ML with enclosed pen injector every morning. "}],dispenseRequest:{numberOfRepeatsAllowed:4,quantity:{value:90,unit:"days"},performer:{reference:"Organization/c40671c0-e0e6-4dcd-beb2-0188e1d6ee1c",type:"Organization",display:"Longs Drug Stores California LLC"}}},search:{mode:"match"}},{resource:{resourceType:"Patient",id:"88a0a417",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2022-11-08T15:02:24.281+00:00"}],versionId:"2",lastUpdated:"2022-11-08T15:02:24.707+00:00",source:"#4173062084810e76",security:[{system:"http://terminology.hl7.org/CodeSystem/v3-ActReason",code:"HTEST"}],tag:[{system:"https://zusapi.com/thirdparty/source",code:"surescripts"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/12345",display:"Storybook Medical - Test Customer"}]},identifier:[{system:"https://zusapi.com/fhir/identifier/universal-id",value:"f5ba64c5-4f66-45cf-b07d-84ed828138e0"}],name:[{family:"Shah",given:["Akhil"]}],telecom:[{system:"email",value:"akhil.shah@example.com"},{system:"phone",value:"555-739-0835",use:"home"},{system:"phone",value:"555-737-8967",use:"mobile"}],gender:"male",birthDate:"2010-08-16",address:[{line:["83 SHADOW LN"],city:"LAS VEGAS",state:"NV",postalCode:"89106-4119"}]},search:{mode:"include"}}]};let c,l;function R({providerMedications:d,otherProviderMedications:u}){return{decorators:[m=>(c=g(d),l=g(u),T.createElement(m))],parameters:{msw:{handlers:{mocks:N()}}}}}function N(){const d=i.rest.get("https://api.dev.zusapi.com/fhir/Patient",(s,t,e)=>t(e.delay(750),e.status(200),e.json(S))),u=i.rest.get("https://api.dev.zusapi.com/fhir/MedicationStatement",(s,t,e)=>s.url.searchParams.get("firstparty")?t(e.status(200),e.json(c)):t(e.status(200),e.json(l))),m=i.rest.post("https://api.dev.zusapi.com/fhir",async(s,t,e)=>{var p,h,y;const a=w({resource:{resourceType:"MedicationStatement"}}),r=await s.json(),n=(p=a(r.entry))==null?void 0:p.resource;return n?(n.id=f(),(h=c.entry)==null||h.push({resource:n,search:{mode:"match"}}),c.total=(y=c.entry)==null?void 0:y.length,t(e.delay(500),e.status(200),e.json(n))):t(e.status(400))}),v=i.rest.get("https://api.dev.zusapi.com/fhir/MedicationRequest",(s,t,e)=>t(e.status(200),e.json(D))),b=i.rest.get("https://api.dev.zusapi.com/fhir/MedicationDispense",(s,t,e)=>t(e.status(200),e.json(I))),z=i.rest.get("https://api.dev.zusapi.com/fhir/MedicationAdministration",(s,t,e)=>t(e.status(200),e.json(L))),M=i.rest.get("https://api.dev.zusapi.com/forms-data/terminology/dosages",(s,t,e)=>{const a=s.url.searchParams.get("display")??"",r=C.filter(n=>n.display.indexOf(a)!==-1);return t(e.status(200),e.json({total:r.length,data:r}))}),x=i.rest.post("https://api.dev.zusapi.com/fhir/Basic",async(s,t,e)=>{var r,n;const a=await s.json();if(a.subject.type==="MedicationStatement")return a.search={mode:"include"},a.id=f(),(r=l.entry)==null||r.push({resource:a,search:{mode:"include"}}),l.total=((n=l.entry)==null?void 0:n.length)||0,t(e.status(200),e.json(a))});return[d,M,u,m,v,b,z,x]}export{B as o,j as p,R as s};

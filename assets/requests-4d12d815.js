import{l as i}from"./index-ebe38276.js";import{o as a,q as o,j as s,r as b}from"./patient-allergies-b1fa3132.js";import{m as g,a as v}from"./medication-request-b58aa1ea.js";import{d as C,a as P}from"./diagnostic-reports-fqs-8de63efb.js";import{m as T}from"./requests-cfedd314.js";const S={resourceType:"Bundle",id:"4b58609b-b4c2-43bb-81de-21b9a02fa62f",meta:{lastUpdated:"2023-01-03T22:30:53.366+00:00"},type:"searchset",total:6,entry:[{fullUrl:"https://api.dev.zusapi.com/fhir/Encounter/5af9550a-f9c7-4ca6-86b2-ecdb4c164ec3",resource:{resourceType:"Encounter",id:"5af9550a-f9c7-4ca6-86b2-ecdb4c164ec3",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2023-01-03T20:11:44.150+00:00"}],versionId:"1",lastUpdated:"2023-01-03T20:11:44.232+00:00",source:"#GKzYTPJnzCuiBU0w",tag:[{system:"https://zusapi.com/thirdparty/source",code:"commonwell"},a]},extension:[o],status:"finished",class:{system:"http://terminology.hl7.org/CodeSystem/v3-NullFlavor",code:"UNK"},type:[{coding:[{system:"http://www.ama-assn.org/go/cpt",code:"99203",display:"Office Visit"},{system:"urn:oid:1.2.840.114350.1.13.418.2.7.4.698084.30",code:"101"},{system:"urn:oid:2.16.840.1.113883.5.4",code:"AMB"},{system:"urn:oid:1.2.840.114350.1.72.1.30",code:"101"},{system:"urn:oid:1.2.840.114350.1.72.1.30.1",code:"4"}],text:"Office Visit"}],subject:{reference:"Patient/6e6ea727-a7ac-47d0-96b8-536e1073826c",type:"Patient"},participant:[{type:[{coding:[{display:"MinuteClinic"},{system:"urn:oid:1.2.840.114350.1.13.418.2.7.10.836982.1050",code:"175",display:"MinuteClinic"}],text:"MinuteClinic"}],individual:{reference:"Practitioner/8653ba26-4f9e-48f6-b3a5-a386345bc990",type:"Practitioner",display:"Mary Jane Wilson NP"}}],period:{start:"2018-09-08T09:55:00-05:00",end:"2018-09-08T11:29:32-05:00"},length:{value:94,unit:"minute",system:"http://unitsofmeasure.org",code:"min"},diagnosis:[{condition:{reference:"Condition/a73a7f57-cc74-4165-ab7b-5d8e43e71f6d",type:"Condition",display:"COPD with acute exacerbation"}},{condition:{reference:"Condition/5687dd21-523e-425e-8f76-e3410339aaba",type:"Condition",display:"Upper respiratory infection, acute"}},{condition:{reference:"Condition/12345",type:"Condition",display:"Difficulty breathing"}},{condition:{reference:"Condition/12345",type:"Condition",display:"Infection"}}],location:[{location:{reference:"Location/e85b4d87-2cbd-4ab3-b842-a821cde3d339",type:"Location",display:"MinuteClinic OH4304"}}]},search:{mode:"match"}},{fullUrl:"https://api.dev.zusapi.com/fhir/Encounter/77190d01-91ef-4dbd-8af2-8183ed9a40d3",resource:{resourceType:"Encounter",id:"77190d01-91ef-4dbd-8af2-8183ed9a40d3",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2023-01-03T20:11:47.096+00:00"}],versionId:"1",lastUpdated:"2023-01-03T20:11:47.145+00:00",source:"#vpjWA3FgSp4rbi6v",tag:[{system:"https://zusapi.com/thirdparty/source",code:"commonwell"},a]},extension:[o],status:"finished",class:{system:"urn:oid:2.16.840.1.113883.5.4",code:"IMP"},subject:{reference:"Patient/6e6ea727-a7ac-47d0-96b8-536e1073826c",type:"Patient"},participant:[{type:[{coding:[{display:"Physical Medicine and Rehab"},{system:"urn:oid:1.2.840.114350.1.72.1.7.7.10.688867.4160",code:"86",display:"Physical Medicine and Rehab"},{system:"urn:oid:1.2.840.114350.1.13.535.2.7.10.836982.1050",code:"33",display:"Physical Medicine and Rehab"}],text:"Physical Medicine and Rehab"}],individual:{reference:"Practitioner/2c77e583-3dd3-45dd-888e-a31a8f3645f5",type:"Practitioner",display:"David Lee"}}],period:{start:"2019-01-09T21:49:00-05:00",end:"2019-01-18T12:17:00-04:00"},length:{value:12328,unit:"minute",system:"http://unitsofmeasure.org",code:"min"},diagnosis:[{condition:{reference:"Condition/5a7a7ddc-fafe-46eb-9ea4-0d1191603334",type:"Condition",display:"AIDP (acute inflammatory demyelinating polyneuropathy)"}}],hospitalization:{dischargeDisposition:{coding:[{system:"urn:oid:1.2.840.114350.1.13.535.2.7.4.698084.18888",code:"1",display:"Home or Self Care"}],text:"Home or Self Care"}},location:[{location:{reference:"Location/71c90541-0b1a-4bc3-a227-6787e72a11f9",type:"Location",display:"ABC 17 REHAB"}}]},search:{mode:"match"}},{fullUrl:"https://api.dev.zusapi.com/fhir/Encounter/c76550d6-3a5b-4fdc-91f7-f77ba29a6ce0",resource:{resourceType:"Encounter",id:"c76550d6-3a5b-4fdc-91f7-f77ba29a6ce0",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2023-01-03T20:11:44.673+00:00"}],versionId:"1",lastUpdated:"2023-01-03T20:11:44.747+00:00",source:"#2AhmrNrpGVMXgGuM",tag:[{system:"https://zusapi.com/thirdparty/source",code:"commonwell"},a]},extension:[o],status:"finished",class:{system:"http://terminology.hl7.org/CodeSystem/v3-NullFlavor",code:"UNK"},type:[{coding:[{system:"http://www.ama-assn.org/go/cpt",display:"Jerry Mason MD"},{system:"urn:oid:2.16.840.1.113883.4.391.23603",display:"(TEL)"}],text:"Jerry L Mason MD"}],subject:{reference:"Patient/6e6ea727-a7ac-47d0-96b8-536e1073826c",type:"Patient"},participant:[{type:[{coding:[{system:"http://terminology.hl7.org/CodeSystem/v3-NullFlavor",code:"NI",display:"NoInformation"}],text:"NoInformation"}],individual:{reference:"Practitioner/fc7ee8d7-6ad3-47a4-ab40-88f07bf7e2fa",type:"Practitioner",display:"Jerry Mason"}}],period:{start:"2020-01-14"},location:[{location:{reference:"Location/85b347e8-bee1-40fc-bd07-799f0a0c4d74",type:"Location",display:"Jerry Mason MD"}}]},search:{mode:"match"}},{fullUrl:"https://api.dev.zusapi.com/fhir/Encounter/a108bf4e-7791-4f23-9a6e-ab9aabf1467e",resource:{resourceType:"Encounter",id:"a108bf4e-7791-4f23-9a6e-ab9aabf1467e",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2023-01-03T20:11:48.071+00:00"}],versionId:"1",lastUpdated:"2023-01-03T20:11:48.074+00:00",source:"#AwOEd1w67hUQRVXU",tag:[{system:"https://zusapi.com/thirdparty/source",code:"commonwell"},a]},extension:[o],status:"finished",class:{system:"http://terminology.hl7.org/CodeSystem/v3-NullFlavor",code:"UNK"},subject:{reference:"Patient/6e6ea727-a7ac-47d0-96b8-536e1073826c",type:"Patient"},period:{start:"2020-05-07T09:17:39+00:00"},diagnosis:[{condition:{reference:"Condition/17c54947-3fa4-42af-b6ce-2c187b4c774a",type:"Condition",display:"Sheltered homelessness"}}],location:[{location:{reference:"Location/53600c9e-e46a-4f2d-912e-859aac128942",type:"Location",display:"ST. JOSEPH HHS"}}]},search:{mode:"match"}},{fullUrl:"https://api.dev.zusapi.com/fhir/Encounter/fc6cf519-2991-4fec-98ec-4c81ec0a0f02",resource:{resourceType:"Encounter",id:"fc6cf519-2991-4fec-98ec-4c81ec0a0f02",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2023-01-03T20:11:45.647+00:00"}],versionId:"1",lastUpdated:"2023-01-03T20:11:45.824+00:00",source:"#dVeLKurdCrwFBuZR",tag:[{system:"https://zusapi.com/thirdparty/source",code:"commonwell"},a]},extension:[o],status:"finished",class:{system:"urn:oid:2.16.840.1.113883.5.4",code:"EMER"},type:[{coding:[{system:"urn:oid:2.16.840.1.113883.5.4",code:"EMER",display:"Emergency"},{system:"urn:oid:1.2.840.114350.1.13.140.2.7.4.698084.30",code:"3"},{system:"urn:oid:1.2.840.114350.1.72.1.30",code:"3"},{system:"urn:oid:1.2.840.114350.1.72.1.30.1",code:"0"}],text:"Emergency"}],subject:{reference:"Patient/6e6ea727-a7ac-47d0-96b8-536e1073826c",type:"Patient"},participant:[{type:[{coding:[{display:"Emergency Medicine"},{system:"urn:oid:1.2.840.114350.1.72.1.7.7.10.688867.4160",code:"17",display:"Emergency Medicine"},{system:"urn:oid:1.2.840.114350.1.13.140.2.7.10.836982.1050",code:"49",display:"Emergency Medicine"}],text:"Emergency Medicine"}],individual:{reference:"Practitioner/f21f7b83-c187-4164-bc6a-0ac08f8da22b",type:"Practitioner",display:"Minosh Madria"}}],period:{start:"2023-01-29T13:31:59-06:00",end:"2023-01-29T15:02:31-06:00"},length:{value:90,unit:"minute",system:"http://unitsofmeasure.org",code:"min"},reasonCode:[{coding:[{system:"http://snomed.info/sct",code:"404684003",display:"Clinical finding (finding)"}],text:"Clinical finding"}],diagnosis:[{condition:{reference:"Condition/e1af6029-4ac3-43b9-9802-48c65d064e24",type:"Condition",display:"Tooth pain"}}],hospitalization:{dischargeDisposition:{coding:[{system:"urn:oid:1.2.840.114350.1.13.140.2.7.4.698084.18888",code:"01",display:"Discharged to home or self care (routine discharge)"}],text:"Discharged to home or self care (routine discharge)"}},location:[{location:{reference:"Location/543c2893-1ec5-45d5-9664-9d1a23d3c2b9",type:"Location",display:"ABCD Emergency Department"}}]},search:{mode:"match"}},{fullUrl:"https://api.dev.zusapi.com/fhir/Encounter/6b77e120-04b4-4cd6-8f0b-3543767cd51f",resource:{resourceType:"Encounter",id:"6b77e120-04b4-4cd6-8f0b-3543767cd51f",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2023-01-03T20:11:46.265+00:00"}],versionId:"1",lastUpdated:"2023-01-03T20:11:46.271+00:00",source:"#F03sLYfdmocPYxKx",tag:[{system:"https://zusapi.com/thirdparty/source",code:"commonwell"},a]},extension:[o],status:"finished",class:{system:"http://terminology.hl7.org/CodeSystem/v3-NullFlavor",code:"UNK"},type:[{coding:[{system:"http://www.ama-assn.org/go/cpt",display:"CARLINGSBAD FAMILY MEDICINE"},{system:"urn:oid:2.16.840.1.113883.4.391.142",display:"(TEL)"}],text:"CARLINGSBAD FAMILY MEDICINE"}],subject:{reference:"Patient/6e6ea727-a7ac-47d0-96b8-536e1073826c",type:"Patient"},participant:[{type:[{coding:[{system:"http://terminology.hl7.org/CodeSystem/v3-NullFlavor",code:"NI",display:"NoInformation"}],text:"NoInformation"}],individual:{reference:"Practitioner/26da410b-44d7-49ec-9827-26fc34f8aad7",type:"Practitioner",display:"Michael Morris, MD"}},{individual:{reference:"Practitioner/12345",type:"Practitioner",display:"Jenny Morris, MD"}},{individual:{reference:"Practitioner/12345",type:"Practitioner",display:"Rose Donald"}},{individual:{reference:"Practitioner/12345",type:"Practitioner",display:"Al Bundy"}}],period:{start:"2020-03-14"},location:[{location:{reference:"Location/02b760b4-f898-4aad-a075-0c2ba1a7d1a9",type:"Location",display:"CARLINGSBAD FAMILY MEDICINE"}}]},search:{mode:"match"}}]},z={EncounterConnection:{pageInfo:{hasNextPage:!1},edges:[{node:{id:"f9d09e0e-9e8f-4165-84cb-9bb4a4059669",resourceType:"Encounter",meta:{tag:[{system:"https://zusapi.com/accesscontrol/owner",code:"builder/f8233266-4fe2-452f-9006-a4a54246471b"}],versionId:"1"},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"eeff12bb-b43d-4e65-aff7-297a4bb2f736"}],status:"finished",class:{system:"http://terminology.hl7.org/CodeSystem/v3-ActEncounterCode",version:null,code:"AMB",display:null},type:[{text:null,coding:[{code:null,display:"Office Visit",system:"urn:oid:2.16.840.1.113883.5.4",extension:null}]}],serviceType:null,priority:null,diagnosis:[{condition:{reference:"Condition/641b067f-7311-4f2b-a051-c0e31c63d2d5",display:"Chronic obstructive pulmonary disease, unspecified"}},{condition:{reference:"Condition/b4210ed7-be3a-4ef1-b981-a8e1c7a84db6",display:"Hyperlipidemia, unspecified"}},{condition:{reference:"Condition/18b7ea3c-c237-468a-aa72-1f05add7ae1b",display:"Bilateral primary osteoarthritis of hip"}},{condition:{reference:"Condition/07bbe4f1-6401-4ccd-a100-516c5366fc61",display:"Androgenic alopecia, unspecified"}}],participant:[{individual:{reference:"Practitioner/ddd3c051-c206-4fc8-aa14-e37eb712eccd",display:"Jacob Calvano"},type:[{text:null,coding:[{code:"PPRF",display:null,system:"http://terminology.hl7.org/CodeSystem/v3-ParticipationType",extension:null}]}],period:null}],period:{start:"2022-03-13",end:null},length:null,reasonCode:null,hospitalization:null,location:[{location:{reference:null,display:"Main St"},status:null,period:null}]}},{node:{id:"522d1807-dbd9-4639-a33d-c5bbb336869b",resourceType:"Encounter",meta:{tag:[{system:"https://zusapi.com/accesscontrol/owner",code:"builder/f8233266-4fe2-452f-9006-a4a54246471b"}],versionId:"1"},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"eeff12bb-b43d-4e65-aff7-297a4bb2f736"}],status:"finished",class:{system:"http://terminology.hl7.org/CodeSystem/v3-ActEncounterCode",version:null,code:"AMB",display:null},type:null,serviceType:null,priority:null,diagnosis:[{condition:{reference:"Condition/eb028c6f-a0dd-4aa9-8fa6-756b8b7b00e0",display:"Chronic obstructive pulmonary disease, unspecified"}},{condition:{reference:"Condition/7923b750-ee42-4357-bfce-1e159fa53e39",display:"Hyperlipidemia, unspecified"}},{condition:{reference:"Condition/e1641052-e00e-4a69-9701-d62fe411791e",display:"Bilateral primary osteoarthritis of hip"}},{condition:{reference:"Condition/126f8623-57e1-4b28-a751-892911ce0ac7",display:"Androgenic alopecia, unspecified"}}],participant:[{individual:{reference:"Practitioner/ddd3c051-c206-4fc8-aa14-e37eb712eccd",display:"Jacob Calvano"},type:[{text:null,coding:[{code:"PPRF",display:null,system:"http://terminology.hl7.org/CodeSystem/v3-ParticipationType",extension:null}]}],period:null}],period:{start:"2023-01-17",end:null},length:null,reasonCode:null,hospitalization:null,location:null}},{node:{id:"4a41e829-10ac-4b08-8602-e028f69b085a",resourceType:"Encounter",meta:{tag:[{system:"https://zusapi.com/accesscontrol/owner",code:"builder/f8233266-4fe2-452f-9006-a4a54246471b"}],versionId:"1"},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"eeff12bb-b43d-4e65-aff7-297a4bb2f736"}],status:"finished",class:{system:"http://terminology.hl7.org/CodeSystem/v3-ActEncounterCode",version:null,code:"AMB",display:null},type:null,serviceType:null,priority:null,diagnosis:[{condition:{reference:"Condition/e2cbb83c-55aa-4061-8736-fb03279c7169",display:"Androgenic alopecia, unspecified"}}],participant:[{individual:{reference:"Practitioner/6c9751da-287c-476e-b841-b344e3988bb8",display:"Ishaan Manoharan"},type:[{text:null,coding:[{code:"PPRF",display:null,system:"http://terminology.hl7.org/CodeSystem/v3-ParticipationType",extension:null}]}],period:null}],period:{start:"2022-09-09",end:null},length:null,reasonCode:null,hospitalization:null,location:null}},{node:{id:"59ae0f52-2eff-4399-9819-539f3dc0fe65",resourceType:"Encounter",meta:{tag:[{system:"https://zusapi.com/accesscontrol/owner",code:"builder/f8233266-4fe2-452f-9006-a4a54246471b"}],versionId:"1"},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"eeff12bb-b43d-4e65-aff7-297a4bb2f736"}],status:"finished",class:{system:"http://terminology.hl7.org/CodeSystem/v3-ActEncounterCode",version:null,code:"AMB",display:null},type:null,serviceType:null,priority:null,diagnosis:[{condition:{reference:"Condition/e2cbb83c-55aa-4061-8736-fb03279c7169",display:"Androgenic alopecia, unspecified"}}],participant:[{individual:{reference:"Practitioner/6c9751da-287c-476e-b841-b344e3988bb8",display:"Ishaan Manoharan"},type:[{text:null,coding:[{code:"PPRF",display:null,system:"http://terminology.hl7.org/CodeSystem/v3-ParticipationType",extension:null}]}],period:null}],period:{start:"2022-05-12",end:null},length:null,reasonCode:null,hospitalization:null,location:null}},{node:{id:"0f853283-1369-4850-b047-81e2be9e7245",resourceType:"Encounter",meta:{tag:[{system:"https://zusapi.com/accesscontrol/owner",code:"builder/f8233266-4fe2-452f-9006-a4a54246471b"}],versionId:"1"},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"eeff12bb-b43d-4e65-aff7-297a4bb2f736"}],status:"finished",class:{system:"http://terminology.hl7.org/CodeSystem/v3-ActEncounterCode",version:null,code:"EMER",display:null},type:[{text:null,coding:[{code:null,display:"Home",system:"urn:oid:2.16.840.1.113883.5.4",extension:null}]}],serviceType:null,priority:null,diagnosis:[{condition:{reference:"Condition/76cc6424-33b6-44f5-82e2-a1f2e4f0de67",display:"Chronic obstructive pulmonary disease, unspecified"}},{condition:{reference:"Condition/475b8fe3-4215-4dcc-838b-17bcd4bcb9eb",display:"Chest Pain, Unspecified"}}],participant:[{individual:{reference:"Practitioner/169684bd-002e-44ce-9ef5-6117941fd378",display:"Cassandra Lopez"},type:[{text:null,coding:[{code:"PPRF",display:null,system:"http://terminology.hl7.org/CodeSystem/v3-ParticipationType",extension:null}]}],period:null}],period:{start:"2020-10-08",end:"2020-10-10"},length:null,reasonCode:null,hospitalization:null,location:[{location:{reference:null,display:"MSMC"},status:null,period:null}]}},{node:{id:"332a0ac0-0ce9-4fb5-b8e2-98a289541ea1",resourceType:"Encounter",meta:{tag:[{system:"https://zusapi.com/accesscontrol/owner",code:"builder/f8233266-4fe2-452f-9006-a4a54246471b"}],versionId:"1"},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"eeff12bb-b43d-4e65-aff7-297a4bb2f736"}],status:"finished",class:{system:"http://terminology.hl7.org/CodeSystem/v3-ActEncounterCode",version:null,code:"AMB",display:null},type:null,serviceType:null,priority:null,diagnosis:null,participant:[{individual:{reference:"Practitioner/9758ca32-ad4c-4f0f-9c89-6aaa6aa7990e",display:"Andrew Zhou"},type:[{text:null,coding:[{code:"PPRF",display:null,system:"http://terminology.hl7.org/CodeSystem/v3-ParticipationType",extension:null}]}],period:null}],period:{start:"2021-04-08",end:"2021-04-08"},length:null,reasonCode:null,hospitalization:null,location:[{location:{reference:null,display:"Main Street Medical"},status:null,period:null}]}},{node:{id:"72f63b79-2adb-4c30-bb02-04bf65e3f90b",resourceType:"Encounter",meta:{tag:[{system:"https://zusapi.com/accesscontrol/owner",code:"builder/f8233266-4fe2-452f-9006-a4a54246471b"}],versionId:"1"},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"eeff12bb-b43d-4e65-aff7-297a4bb2f736"}],status:"finished",class:{system:"http://terminology.hl7.org/CodeSystem/v3-ActEncounterCode",version:null,code:"AMB",display:null},type:null,serviceType:null,priority:null,diagnosis:null,participant:[{individual:{reference:"Practitioner/9758ca32-ad4c-4f0f-9c89-6aaa6aa7990e",display:"Andrew Zhou"},type:[{text:null,coding:[{code:"PPRF",display:null,system:"http://terminology.hl7.org/CodeSystem/v3-ParticipationType",extension:null}]}],period:null}],period:{start:"2020-10-08",end:"2020-10-10"},length:null,reasonCode:null,hospitalization:null,location:[{location:{reference:null,display:"Main Street Medical"},status:null,period:null}]}},{node:{id:"e99963b3-9669-4858-b410-c35cb3c73095",resourceType:"Encounter",meta:{tag:[{system:"https://zusapi.com/accesscontrol/owner",code:"builder/f8233266-4fe2-452f-9006-a4a54246471b"}],versionId:"1"},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"eeff12bb-b43d-4e65-aff7-297a4bb2f736"}],status:"finished",class:{system:"http://terminology.hl7.org/CodeSystem/v3-ActEncounterCode",version:null,code:"AMB",display:null},type:null,serviceType:null,priority:null,diagnosis:[{condition:{reference:"Condition/e27c3624-e966-4231-9637-84037589bd3c",display:"Chronic obstructive pulmonary disease, unspecified"}}],participant:[{individual:{reference:"Practitioner/9758ca32-ad4c-4f0f-9c89-6aaa6aa7990e",display:"Andrew Zhou"},type:[{text:null,coding:[{code:"PPRF",display:null,system:"http://terminology.hl7.org/CodeSystem/v3-ParticipationType",extension:null}]}],period:null}],period:{start:"2020-10-08",end:"2020-10-10"},length:null,reasonCode:null,hospitalization:null,location:[{location:{reference:null,display:"Main Street Medical"},status:null,period:null}]}}]}},x={resourceType:"Bundle",id:"f4da1f39-7638-45e4-999b-9ff33d7c5201",meta:{lastUpdated:"2022-11-15T19:37:55.783+00:00"},type:"searchset",total:1,entry:[{resource:{resourceType:"MedicationStatement",id:"0cbb026a-0535-47a1-bbbc-956fcde07dc9",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2023-03-14T02:04:12.070+00:00"}],versionId:"1",lastUpdated:"2023-03-14T02:04:12.313+00:00",source:"#b6a5f8c980f9ac84",tag:[{system:"https://zusapi.com/accesscontrol/owner",code:"builder/b123",display:"Storybook Health"},{system:"https://zusapi.com/lens",code:"ActiveMedications"},{system:"https://zusapi.com/summary",code:"Common"}]},extension:[{url:"https://zusapi.com/lens/extension/aggregatedFrom",extension:[{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationDispense/612df454-aea8-4ad7-87c4-fd35ee7ce1e3",type:"MedicationDispense"}},{url:"https://zusapi.com/lens/extension/aggregatedFrom",valueReference:{reference:"MedicationRequest/104f6928-da8a-4c0c-b4eb-abeb9e4195f0",type:"MedicationRequest"}}]},{url:"https://zusapi.com/lens/extension/medicationLastFillDate",valueDateTime:"2023-02-21"},{url:"https://zusapi.com/lens/extension/medicationLastPrescribedDate",valueDateTime:"2023-02-21"},{url:"https://zusapi.com/lens/extension/medicationQuantity",valueQuantity:{value:14,unit:"days"}},{url:"https://zusapi.com/lens/extension/medicationDaysSupply",valueQuantity:{value:14}},{url:"https://zusapi.com/lens/extension/medicationRefills",valueUnsignedInt:0},{url:"https://zusapi.com/lens/extension/medicationLastPrescriber",valueReference:{reference:"Practitioner/2eb2b8c3-29a3-4d7f-8feb-b8234aa70701",type:"Practitioner",display:"Phyllis Reeves"}},{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"35bf3353-165a-454f-94f4-011227a12e18"}],status:"active",medicationCodeableConcept:{coding:[{system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"1180459"},{system:"http://hl7.org/fhir/sid/ndc",code:"55887023697"},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"Standardization"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"876195",display:"polyethylene glycol 3350 17000 MG Powder for Oral Solution [Miralax]",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ActiveIngredient"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"221147",display:"polyethylene glycol 3350",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"BrandName"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"261575",display:"Miralax",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ClinicalDrug_TTY_SCD"}],system:"http://terminology.hl7.org/CodeSystem/v3-NullFlavor",code:"UNK",display:"unknown",userSelected:!1},{extension:[{url:"https://zusapi.com/terminology/enrichment",valueString:"ClinicalDrug_TTY_SCD"}],system:"http://www.nlm.nih.gov/research/umls/rxnorm",code:"876193",display:"polyethylene glycol 3350 17000 MG Powder for Oral Solution",userSelected:!1}],text:"Miralax Oral Product"},subject:{reference:"Patient/a9da7271-99da-42ca-8654-8bea1b2983ca",type:"Patient"},dateAsserted:"2023-02-21",dosage:[{text:"Dissolve 17g in 4–8oz liquid and drink once daily for up to 7 days."}]}}]},M={resourceType:"Bundle",id:"f4da1f39-7638-45e4-999b-9ff33d7c5201",meta:{lastUpdated:"2022-11-15T19:37:55.783+00:00"},type:"searchset",entry:[{resource:{resourceType:"Patient",id:"1",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2022-11-10T19:37:12.106+00:00"}],versionId:"2",lastUpdated:"2022-11-10T19:37:12.363+00:00",source:"#8409b0f1adee8ee2",security:[{system:"http://terminology.hl7.org/CodeSystem/v3-ActReason",code:"HTEST"}],tag:[s]},identifier:[{system:"https://example.com/patient-id",value:"001"},b],name:[{family:"Marsden",given:["Penny"]}],telecom:[{system:"email",value:"penny.marsden@example.com"},{system:"phone",value:"555-030-6283",use:"home"},{system:"phone",value:"555-348-9139",use:"mobile"},{system:"phone",value:"555-516-4894",use:"work"}],gender:"female",birthDate:"1980-09-03",address:[{line:["469 SHADOW LN"],city:"LAS VEGAS",state:"NV",postalCode:"89106-4119"}],maritalStatus:{coding:[{system:"http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",code:"S",display:"Single"}],text:"Single"},contact:[{relationship:[{coding:[{system:"http://terminology.hl7.org/CodeSystem/v2-0131",code:"C",display:"Emergency contact"}],text:"Emergency contact"}],name:{family:"Marsden",given:["Jeffrey"]},telecom:[{system:"phone",value:"555-402-8964",use:"home"},{system:"email",value:"jeffrey.marsden@example.com"}]}],managingOrganization:{reference:"Organization/09ab9086-6dfc-4dc9-b040-1520aa4fea92"}},search:{mode:"match"}},{resource:{resourceType:"Organization",id:"09ab9086-6dfc-4dc9-b040-1520aa4fea92",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2022-11-10T19:37:09.031+00:00"}],versionId:"1",lastUpdated:"2022-11-10T19:37:09.032+00:00",source:"#RdK4JAWrQkSRa9Qw",tag:[s]},name:"Demo Health"},search:{mode:"include"}}]},E={resourceType:"Bundle",id:"4d28e915-4be3-4588-b39f-1fd5ec8bf66c",meta:{lastUpdated:"2022-12-30T20:13:50.813+00:00"},type:"searchset",total:1,link:[{relation:"self",url:"https%3A%2F%2Fapi.zusapi.com%2Ffhir%2FProvenance%3Ftarget%3DCondition%2Fe2184fb8-5e90-4502-9dd0-2f772b42c734"}],entry:[{fullUrl:"https://api.dev.zusapi.com/fhir/Provenance/12345",resource:{resourceType:"Provenance",id:"12345",meta:{versionId:"1",lastUpdated:"2022-04-08T14:53:20.258+00:00",source:"#t3W2UKaB83PVUYcg",tag:[{system:"https://zusapi.com/accesscontrol/owner",code:"builder/f4599d90-6d29-4843-a16d-ae7c469eb229"}]},target:[{reference:"Encounter/fc6cf519-2991-4fec-98ec-4c81ec0a0f02"}],occurredPeriod:{start:"2022-04-08T14:53:09.794Z",end:"2022-04-08T14:53:20.215Z"},recorded:"2022-04-08T14:53:20.216Z",reason:[{coding:[{system:"http://terminology.hl7.org/CodeSystem/v3-ActReason",code:"TREAT",display:"Treatment"}],text:"Treatment"}],activity:{coding:[{system:"http://terminology.hl7.org/CodeSystem/v3-DataOperation",code:"CREATE",display:"create"}],text:"Create"},entity:[{role:"source",what:{reference:"Binary/04ffee0b-0184-4916-a841-a5345973708a"}}]},search:{mode:"match"}}]};function F(){return{parameters:{msw:{handlers:{mocks:A()}}}}}function A(){const r=T("timeline"),c=i.rest.get("https://api.dev.zusapi.com/fhir/Patient",(n,t,e)=>t(e.delay(750),e.status(200),e.json(M))),d=i.rest.get("https://api.dev.zusapi.com/fhir/Encounter",(n,t,e)=>t(e.status(200),e.json(S))),l=i.rest.get("https://api.dev.zusapi.com/fhir/MedicationRequest",(n,t,e)=>t(e.status(200),e.json(g))),p=i.rest.get("https://api.dev.zusapi.com/fhir/MedicationDispense",(n,t,e)=>t(e.status(200),e.json(v))),u=i.rest.get("https://api.dev.zusapi.com/fhir/MedicationStatement",(n,t,e)=>t(e.status(200),e.json(x))),y=i.rest.get("https://api.dev.zusapi.com/fhir/Provenance?target=Encounter/:Encounter",async(n,t,e)=>t(e.status(200),e.json(E))),m=i.rest.get("https://api.dev.zusapi.com/fhir/DiagnosticReport",(n,t,e)=>t(e.status(200),e.delay(250),e.json(C))),f=i.graphql.query("DiagnosticReport",(n,t,e)=>t(e.delay(750),e.status(200),e.data(P))),h=i.graphql.query("Encounter",(n,t,e)=>t(e.delay(750),e.status(200),e.data(z)));return[r,c,d,y,l,p,u,m,f,h]}export{F as s};

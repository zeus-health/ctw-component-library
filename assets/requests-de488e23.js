import{a}from"./request-5a1df4c1.js";const i={resourceType:"Bundle",id:"9f8f9095-cc74-4cd5-ac58-ab233e6c7a92",type:"searchset",entry:[{fullUrl:"https://api.sandbox.zusapi.com/fhir/CareTeam/d2b3df4b-f5bb-445c-8612-de4458579449",resource:{resourceType:"CareTeam",id:"d2b3df4b-f5bb-445c-8612-de4458579449",meta:{versionId:"3",lastUpdated:"2022-11-03T18:27:19.991+00:00",source:"#N3Id7pd6FENe0Zcr",tag:[{system:"https://zusapi.com/thirdparty/source",code:"commonwell"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/2a6358ef-9276-49fb-bf62-000f1aba1a68",display:"GoodRx Care"}]},contained:[{resourceType:"Practitioner",id:"Practitioner28",name:[{family:"Davis",given:["Albert"],prefix:["Dr","MD"]}],telecom:[{system:"phone",value:"+1(555)555-1002",use:"work"}],address:[{line:["2472 Rocky Place"],city:"BEAVERTON",state:"OR",postalCode:"97006"}],qualification:[{code:{coding:[{system:"http://terminology.hl7.org/CodeSystem/v3-NullFlavor",code:"NA",display:"not applicable"}],text:"not applicable"}}]}],extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:"93b436c5-c9ea-4d2d-98cc-53483d8322df"}],identifier:[{use:"usual",system:"urn:oid:2.16.840.1.113883.3.432.54321.1.1.100.11",value:"331829"},{system:"https://zushealth.com/system/commonwellconnectorservice",value:"dev-resource"}],status:"proposed",category:[{coding:[{system:"http://loinc.org",code:"LA27977-0",display:"Episode of care-focused care team"}],text:"Episode of care-focused care team"}],subject:{reference:"Patient/0743dd70-b89f-468b-9a9d-648f005805db",type:"Patient"},period:{start:"2015-06-22",end:"2022-06-15"},participant:[{role:[{coding:[{system:"urn:oid:2.16.840.1.113883.5.88",code:"ATTPHYS",display:"Attending Provider"}],text:"Attending Provider"}],member:{reference:"#Practitioner28",type:"Practitioner",display:"Dr MD Albert Davis"},period:{start:"2015-06-22"}}],telecom:[{system:"phone",value:"+1(555)555-1002",use:"work"}]},search:{mode:"match"}}]},c={resourceType:"Bundle",id:"f4da1f39-7638-45e4-999b-9ff33d7c5201",meta:{lastUpdated:"2022-11-15T19:37:55.783+00:00"},type:"searchset",entry:[{resource:{resourceType:"Patient",id:"u12345",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2023-01-26T15:49:38.110+00:00"}],versionId:"2",lastUpdated:"2023-01-26T15:49:38.553+00:00",source:"#cacbf4a51c11b1b0",security:[{system:"http://terminology.hl7.org/CodeSystem/v3-ActReason",code:"HTEST"}],tag:[{system:"https://zusapi.com/thirdparty/source",code:"commonwell"},{system:"https://zusapi.com/accesscontrol/owner",code:"builder/f09f6b6f-ae4b-45f4-a653-5677b1582115",display:"HLTH 2022 - Gunther"}]},identifier:[{system:"https://zusapi.com/fhir/identifier/universal-id",value:"b640bda1-aec7-4be6-a890-e3685a55bce3"}],name:[{family:"Zhang",given:["Bruno"]}],telecom:[{system:"email",value:"brunozhang@example.com"},{system:"phone",value:"555-569-2000",use:"home"},{system:"phone",value:"555-536-3933",use:"mobile"},{system:"phone",value:"555-843-3265",use:"work"}],gender:"male",birthDate:"1970-05-09",address:[{line:["357 SHADOW LN"],city:"LAS VEGAS",state:"NV",postalCode:"89106-4119"}],managingOrganization:{reference:"Organization/79a1c124-a752-4d9a-a44e-2c02499ae402"}},search:{mode:"match"}}]};function d(){const s=a.rest.get("https://api.dev.zusapi.com/fhir/Patient",(o,t,e)=>t(e.delay(750),e.status(200),e.json(c))),r=a.rest.get("https://api.dev.zusapi.com/fhir/CareTeam",(o,t,e)=>t(e.status(200),e.json(i)));return[s,r]}function m(){return{parameters:{msw:{handlers:{mocks:d()}}}}}export{m as s};

import{a as s}from"./request-ce924112.js";import{z as n,q as r}from"./patient-allergies-7eabb4b5.js";import{d as c}from"./diagnostic-reports-3609161d.js";import{m as l}from"./requests-acac8a0c.js";const d={resourceType:"Bundle",id:"c1db2d18",meta:{lastUpdated:"2022-11-14T18:57:45.140+00:00"},type:"searchset",entry:[{resource:{resourceType:"Patient",id:"1234-007",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2022-11-08T15:02:14.762+00:00"}],versionId:"2",lastUpdated:"2022-11-08T15:02:15.233+00:00",source:"#829e9998c8d6fa1a",security:[{system:"http://terminology.hl7.org/CodeSystem/v3-ActReason",code:"HTEST"}],tag:[n]},identifier:[{system:"https://Storybookmedical.com/patient-id",value:"12345"},r],name:[{family:"Shah",given:["Akhil"]}],telecom:[{system:"email",value:"akhil.shah@example.com"},{system:"phone",value:"555-739-0835",use:"home"},{system:"phone",value:"555-737-8967",use:"mobile"}],gender:"male",birthDate:"2010-08-16",address:[{line:["83 SHADOW LN"],city:"LAS VEGAS",state:"NV",postalCode:"89106-4119"}],maritalStatus:{coding:[{system:"http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",code:"S",display:"Single"}],text:"Single"},contact:[{relationship:[{coding:[{system:"http://terminology.hl7.org/CodeSystem/v2-0131",code:"C",display:"Emergency contact"}],text:"Emergency contact"}],name:{family:"Shah",given:["Sonah"]},telecom:[{system:"phone",value:"555-843-3900",use:"home"},{system:"email",value:"sonal.shah@example.com"}]}]},search:{mode:"match"}}]};function S(){return{parameters:{msw:{handlers:{mocks:p()}}}}}function p(){const a=l("observations"),o=s.rest.get("https://api.dev.zusapi.com/fhir/Patient",(m,t,e)=>t(e.delay(750),e.status(200),e.json(d))),i=s.rest.get("https://api.dev.zusapi.com/fhir/DiagnosticReport",(m,t,e)=>t(e.status(200),e.delay(250),e.json(c)));return[a,o,i]}export{S as s};
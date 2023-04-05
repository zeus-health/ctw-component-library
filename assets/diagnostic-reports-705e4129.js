import{f as e,a as p,b as n,c as l}from"./faker-8193e1fd.js";const y=new Date,m=e.datatype.uuid(),g=e.datatype.uuid(),h=e.date.recent(20),f=e.date.recent(10),v=new Array(20).fill(null).map(()=>e.date.between(f,h)),d={reference:`Patient/${e.datatype.uuid()}`,type:"Patient",display:e.name.fullName()},c=[{display:"4.4 g/dL",reference:`Observation/${e.datatype.uuid()}`},{display:"109 U/L",reference:`Observation/${e.datatype.uuid()}`},{display:"25 U/L",reference:`Observation/${e.datatype.uuid()}`},{display:"25 U/L",reference:`Observation/${e.datatype.uuid()}`},{display:"0.3 mg/dL",reference:`Observation/${e.datatype.uuid()}`},{display:"18 mg/dL",reference:`Observation/${e.datatype.uuid()}`},{display:"9.7 mg/dL",reference:`Observation/${e.datatype.uuid()}`},{display:"109 mmol/L",reference:`Observation/${e.datatype.uuid()}`},{display:"25.8 meq/L",reference:`Observation/${e.datatype.uuid()}`},{display:"Mucho 60",reference:`Observation/${e.datatype.uuid()}`},{display:"1.03 mg/dL",reference:`Observation/${e.datatype.uuid()}`},{display:"7.2 mmol/L",reference:`Observation/${e.datatype.uuid()}`},{display:"163 mg/dL",reference:`Observation/${e.datatype.uuid()}`},{display:"3.5 mmol/L",reference:`Observation/${e.datatype.uuid()}`},{display:"142 mmol/L",reference:`Observation/${e.datatype.uuid()}`},{display:"7.9 g/dL",reference:`Observation/${e.datatype.uuid()}`}],O=()=>({resourceType:"Bundle",id:"diagnostic-report-bundle-1",meta:{lastUpdated:y.toISOString()},type:"searchset",link:p("DiagnosticReport",{"_tag:not":["https://zusapi.com/lens/ActiveMedications","https://zusapi.com/lens/ChronicConditions","https://zusapi.com/summary/Common","https://zusapi.com/fhir%2Ftag%2Fupi-record-type%7Cuniversal"],"patient.identifier":"https://zusapi.com/fhir/identifier/universal-id|u12345"}),entry:[o({status:"preliminary",result:void 0,code:{coding:[{system:"http://terminology.hl7.org/CodeSystem/v3-NullFlavor",code:"NI"}]}}),o({performer:[{display:"Pharma John | Digital Labs",type:"Organization"}]}),...L()]});function o(s){const a=e.datatype.uuid(),t=e.date.recent(10).toISOString();return{search:{mode:"match"},fullUrl:`https://api.storybook.zusapi.com/fhir/DiagnosticReport/${a}`,id:e.datatype.uuid(),resource:{id:e.datatype.uuid(),resourceType:"DiagnosticReport",meta:{extension:[{url:"https://zusapi.com/data-acquisition/extension/id",valueString:e.datatype.uuid()},{url:"https://zusapi.com/created-at",valueInstant:t}],versionId:"1",lastUpdated:t,source:n(),tag:[{system:"https://zusapi.com/accesscontrol/owner",code:"builder/"},{system:"https://zusapi.com/thirdparty/source",code:"commonwell"}]},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:m}],identifier:[{use:"usual",system:l(),value:"L17165719_CHEM20"}],status:"final",code:{coding:[{display:"COMPREHENSIVE METABOLIC PANEL"}],text:"COMPREHENSIVE METABOLIC PANEL"},subject:d,effectivePeriod:{start:t,end:t},result:c.map(i=>({...i,type:"Observation"})),...s}}}function L(){return c.map(s=>{const a=e.helpers.arrayElement(v),t=e.datatype.float({min:1,max:16.5,precision:.1}),i=t>10?"(Normal)":"(High)",u={coding:[{system:"urn:oid:2.16.840.1.113883.5.83",code:t>10?"H":"N",display:t>10?"(Normal)":"(High)"}],text:i},r=e.helpers.arrayElement([{system:"http://loinc.org",code:"1751-7",display:"ALBUMIN"},{system:"http://loinc.org",code:"2823-3",display:"POTASSIUM"},{system:"http://loinc.org",code:"2345-7",display:"GLUCOSE"},{system:"http://loinc.org",code:"33037-3",display:"ANION GAP"},{system:"http://loinc.org",code:"2160-0",display:"CREATININE"},{system:"http://loinc.org",code:"33914-3",display:"CREATININE ESTIMATED GFR"},{system:"http://loinc.org",code:"2028-9",display:"CARBON DIOXIDE"},{system:"http://loinc.org",code:"2075-0",display:"CHLORIDE"},{system:"http://loinc.org",code:"17861-6",display:"CALCIUM"}]);return{search:{mode:"include"},fullUrl:"",resource:{resourceType:"Observation",id:s.reference.split("/")[1],meta:{extension:[{url:"https://zusapi.com/data-acquisition/extension/id",valueString:e.datatype.uuid()},{url:"https://zusapi.com/created-at",valueInstant:a.toISOString()}],versionId:"1",lastUpdated:"2023-03-07T14:32:09.402+00:00",source:n(),tag:[{system:"https://zusapi.com/thirdparty/source",code:"commonwell"},{system:"https://zusapi.com/accesscontrol/owner",code:`builder/${g}`}]},extension:[{url:"https://zusapi.com/fhir/identifier/universal-id",valueString:e.datatype.uuid()}],identifier:[{use:"usual",system:"urn:oid:2.16.840.1.113883.3.1110.3.1.1310.6.1.13",value:"ALB_L17165719_CHEM20_1"}],status:"final",code:{coding:[r],text:Math.random()>.8?void 0:r.display},category:[{coding:[{system:"http://terminology.hl7.org/CodeSystem/observation-category",code:"laboratory",display:"Laboratory"}],text:"Laboratory"}],subject:d,effectiveDateTime:a.toISOString(),valueQuantity:{value:t,unit:"g/dL"},interpretation:[u],note:[{text:`${e.lorem.sentence(7)} FAKE:FAKE ${t} g/dL (${i})Range: 1.0 g/dL - 10.0 g/dL`}],referenceRange:[{low:{value:1,unit:"g/dL"},high:{value:10,unit:"g/dL"}}]}}})}export{O as c};

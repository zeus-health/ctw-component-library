import{R as o}from"./index-9f32f44c.js";import{s as x,a as N}from"./allergy-intolerance-63daaca2.js";import{s as G}from"./requests-032346e6.js";import{s as L}from"./requests-fe3c9fe2.js";import{s as Z}from"./requests-c328c819.js";import{s as j}from"./requests-f498ed0a.js";import{s as q,o as K,p as B}from"./provider-medications-5e464279.js";import{l as h}from"./request-e14b1121.js";import{d as H,a as V,s as Q}from"./requests-49ba05ac.js";import{j as W,r as Y,Z as J,C as X,F as $,a as ee,b as se,c as oe,S as te}from"./patient-allergies-d4ff2ecd.js";import{m as re}from"./requests-c7725c3e.js";import{o as ae,p as ie}from"./patient-conditions-eaecb842.js";import"./_commonjsHelpers-de833af9.js";import"./types-6e67dc97.js";import"./action-list-3eac3914.js";import"./index-a587463d.js";import"./uniqWith-5ea28b10.js";import"./_baseForOwn-2c8afc2d.js";import"./_baseIsEqual-51bafb81.js";import"./_baseClone-058b2292.js";import"./_baseUniq-df086167.js";import"./toNumber-0c016d7c.js";import"./isPlainObject-eb99f80b.js";import"./_basePickBy-c1a75bb1.js";import"./isEqual-55976ea2.js";import"./mapValues-ceea932c.js";import"./uniq-95c702ad.js";import"./basic-33126856.js";import"./v4-a960c1f4.js";import"./table-42af469c.js";import"./spinner-096fc82a.js";import"./medication-request-3ac0899f.js";import"./util-efb84cf1.js";import"./index-e0a0619e.js";import"./_commonjs-dynamic-modules-302442b1.js";import"./extends-d8f15ead.js";import"./index-553ab251.js";import"./drawer-7e8e324a.js";import"./index-9c2d1831.js";import"./debounce-afba8bf8.js";import"./data-list-2854f463.js";const ne={resourceType:"Bundle",id:"c1db2d18",meta:{lastUpdated:"2022-11-14T18:57:45.140+00:00"},type:"searchset",entry:[{resource:{resourceType:"Patient",id:"1234-007",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2022-11-08T15:02:14.762+00:00"}],versionId:"2",lastUpdated:"2022-11-08T15:02:15.233+00:00",source:"#829e9998c8d6fa1a",security:[{system:"http://terminology.hl7.org/CodeSystem/v3-ActReason",code:"HTEST"}],tag:[W]},identifier:[{system:"https://Storybookmedical.com/patient-id",value:"12345"},Y],name:[{family:"Shah",given:["Akhil"]}],telecom:[{system:"email",value:"akhil.shah@example.com"},{system:"phone",value:"555-739-0835",use:"home"},{system:"phone",value:"555-737-8967",use:"mobile"}],gender:"male",birthDate:"2010-08-16",address:[{line:["83 SHADOW LN"],city:"LAS VEGAS",state:"NV",postalCode:"89106-4119"}],maritalStatus:{coding:[{system:"http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",code:"S",display:"Single"}],text:"Single"},contact:[{relationship:[{coding:[{system:"http://terminology.hl7.org/CodeSystem/v2-0131",code:"C",display:"Emergency contact"}],text:"Emergency contact"}],name:{family:"Shah",given:["Sonah"]},telecom:[{system:"phone",value:"555-843-3900",use:"home"},{system:"email",value:"sonal.shah@example.com"}]}]},search:{mode:"match"}}]};function ce(){return{parameters:{msw:{handlers:{mocks:me()}}}}}function me(){const t=re("observations"),r=h.rest.get("https://api.dev.zusapi.com/fhir/Patient",(n,s,e)=>s(e.delay(750),e.status(200),e.json(ne))),u=h.rest.get("https://api.dev.zusapi.com/fhir/DiagnosticReport",(n,s,e)=>s(e.status(200),e.delay(250),e.json(H))),g=h.graphql.query("DiagnosticReport",(n,s,e)=>s(e.delay(750),e.status(200),e.data(V)));return[t,r,u,g]}function de({allergyIntolerance:t,otherConditions:r,patientConditions:u,providerMedications:g,otherProviderMedications:n}){const s=x({allergyIntolerance:t}),e=G(),v=L({otherConditions:r,patientConditions:u}),I=Z(),U=j(),y=q({providerMedications:g,otherProviderMedications:n}),F=ce(),O=Q();return{decorators:[...s.decorators,...v.decorators,...y.decorators],parameters:{msw:{handlers:{mocks:[...s.parameters.msw.handlers.mocks,...e.parameters.msw.handlers.mocks,...v.parameters.msw.handlers.mocks,...I.parameters.msw.handlers.mocks,...U.parameters.msw.handlers.mocks,...y.parameters.msw.handlers.mocks,...F.parameters.msw.handlers.mocks,...O.parameters.msw.handlers.mocks]}}}}}const Xe={tags:["autodocs"],component:J,decorators:[(t,{args:r})=>o.createElement(X,{env:"dev",authToken:$,builderId:ee},o.createElement(se,{patientID:oe,systemURL:te},o.createElement(t,{args:r})))],args:{resources:void 0,forceHorizontalTabs:void 0,title:void 0,allergiesProps:void 0,conditionsProps:void 0,conditionsOutsideProps:void 0,documentsProps:void 0,immunizationsProps:void 0,medicationsProps:void 0,medicationsOutsideProps:void 0,removeBranding:void 0}},{decorators:a,parameters:i}=de({allergyIntolerance:N,otherConditions:ae,otherProviderMedications:K,patientConditions:ie,providerMedications:B}),c={decorators:a,parameters:i,args:{resources:["conditions-outside","medications-outside"]}},m={decorators:a,parameters:i,args:{resources:["conditions","conditions-outside","medications","medications-outside"]}},d={decorators:a,parameters:i,args:{resources:["allergies","conditions","immunizations","documents"]}},p={decorators:a,parameters:i,args:{resources:["allergies","conditions","conditions-outside","documents","immunizations","medications","medications-outside","care-team","timeline"]}},l={parameters:i,args:{resources:["allergies","conditions","conditions-outside","documents","immunizations","medications","medications-outside","care-team","timeline","diagnostic-reports"]},decorators:[...a,(t,{args:r})=>o.createElement("div",{className:"ctw-border-solid ctw-border-divider-light ctw-p-2"},o.createElement("h3",null,"Fixed height container"),o.createElement("code",{className:"language-jsx css-1lwmlsb"},`// CSS
.ctw-zus-aggregated-profile { height: 450px }`),o.createElement("style",null,".ctw-zus-aggregated-profile { height: 450px }"),o.createElement(t,{args:r}))]};var S,k,f;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  decorators,
  parameters,
  args: {
    resources: ["conditions-outside", "medications-outside"]
  }
}`,...(f=(k=c.parameters)==null?void 0:k.docs)==null?void 0:f.source}}};var E,w,A;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`{
  decorators,
  parameters,
  args: {
    resources: ["conditions", "conditions-outside", "medications", "medications-outside"]
  }
}`,...(A=(w=m.parameters)==null?void 0:w.docs)==null?void 0:A.source}}};var M,b,P;d.parameters={...d.parameters,docs:{...(M=d.parameters)==null?void 0:M.docs,source:{originalSource:`{
  decorators,
  parameters,
  args: {
    resources: ["allergies", "conditions", "immunizations", "documents"]
  }
}`,...(P=(b=d.parameters)==null?void 0:b.docs)==null?void 0:P.source}}};var T,z,R;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  decorators,
  parameters,
  args: {
    resources: ["allergies", "conditions", "conditions-outside", "documents", "immunizations", "medications", "medications-outside", "care-team", "timeline"]
  }
}`,...(R=(z=p.parameters)==null?void 0:z.docs)==null?void 0:R.source}}};var _,D,C;l.parameters={...l.parameters,docs:{...(_=l.parameters)==null?void 0:_.docs,source:{originalSource:`{
  parameters,
  args: {
    resources: ["allergies", "conditions", "conditions-outside", "documents", "immunizations", "medications", "medications-outside", "care-team", "timeline", "diagnostic-reports"]
  },
  decorators: [...decorators, (Story, {
    args
  }) => <div className="ctw-border-solid ctw-border-divider-light ctw-p-2">
        <h3>Fixed height container</h3>
        <code className="language-jsx css-1lwmlsb">
          {"// CSS\\n.ctw-zus-aggregated-profile { height: 450px }"}
        </code>
        <style>{".ctw-zus-aggregated-profile { height: 450px }"}</style>
        <Story args={args} />
      </div>]
}`,...(C=(D=l.parameters)==null?void 0:D.docs)==null?void 0:C.source}}};const $e=["OutsideRecords","ConditionsAndMedications","ProblemsAndDocuments","Everything","ScrollbarsOnOverflowZap"];export{m as ConditionsAndMedications,p as Everything,c as OutsideRecords,d as ProblemsAndDocuments,l as ScrollbarsOnOverflowZap,$e as __namedExportsOrder,Xe as default};

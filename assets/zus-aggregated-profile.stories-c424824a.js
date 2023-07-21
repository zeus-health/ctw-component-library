import{R as o}from"./index-6f814c40.js";import{s as x,a as N}from"./allergy-intolerance-9c6b28c8.js";import{s as G}from"./requests-695974ff.js";import{s as L}from"./requests-d3083e7c.js";import{s as q}from"./requests-1675356c.js";import{s as Z}from"./requests-843bc329.js";import{s as K,o as j,p as B}from"./provider-medications-79956c45.js";import{a as h}from"./request-a5123b8d.js";import{d as H,a as V,s as Q}from"./requests-9f7c1ed0.js";import{z as W,q as Y,Z as J,C as X,F as $,a as ee,b as se,c as oe,S as te}from"./patient-allergies-9ed07900.js";import{m as re}from"./requests-7f092f0c.js";import{o as ae,p as ie}from"./patient-conditions-9773c273.js";import"./_commonjsHelpers-042e6b4d.js";import"./types-6e67dc97.js";import"./action-list-c4e23fa1.js";import"./index-74f03c09.js";import"./uniqWith-a9709dae.js";import"./_baseForOwn-f2991899.js";import"./_baseIsEqual-e6235ae7.js";import"./_baseClone-02b81a46.js";import"./_baseUniq-b2927ba5.js";import"./toNumber-3f2b4a49.js";import"./isPlainObject-2a353d7d.js";import"./_basePickBy-43a8adfd.js";import"./isEqual-34296d4e.js";import"./mapValues-209dc39b.js";import"./uniq-a8ac11c1.js";import"./basic-a57a313d.js";import"./v4-a960c1f4.js";import"./table-6420a6a5.js";import"./spinner-1fa7ac76.js";import"./medication-request-bb03299a.js";import"./index-135b3e83.js";import"./extends-10da0781.js";import"./index-5c03ae20.js";import"./drawer-0186a6ba.js";import"./index-6de6b113.js";import"./debounce-6e9e34d3.js";import"./data-list-254aa0b0.js";const ne={resourceType:"Bundle",id:"c1db2d18",meta:{lastUpdated:"2022-11-14T18:57:45.140+00:00"},type:"searchset",entry:[{resource:{resourceType:"Patient",id:"1234-007",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2022-11-08T15:02:14.762+00:00"}],versionId:"2",lastUpdated:"2022-11-08T15:02:15.233+00:00",source:"#829e9998c8d6fa1a",security:[{system:"http://terminology.hl7.org/CodeSystem/v3-ActReason",code:"HTEST"}],tag:[W]},identifier:[{system:"https://Storybookmedical.com/patient-id",value:"12345"},Y],name:[{family:"Shah",given:["Akhil"]}],telecom:[{system:"email",value:"akhil.shah@example.com"},{system:"phone",value:"555-739-0835",use:"home"},{system:"phone",value:"555-737-8967",use:"mobile"}],gender:"male",birthDate:"2010-08-16",address:[{line:["83 SHADOW LN"],city:"LAS VEGAS",state:"NV",postalCode:"89106-4119"}],maritalStatus:{coding:[{system:"http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",code:"S",display:"Single"}],text:"Single"},contact:[{relationship:[{coding:[{system:"http://terminology.hl7.org/CodeSystem/v2-0131",code:"C",display:"Emergency contact"}],text:"Emergency contact"}],name:{family:"Shah",given:["Sonah"]},telecom:[{system:"phone",value:"555-843-3900",use:"home"},{system:"email",value:"sonal.shah@example.com"}]}]},search:{mode:"match"}}]};function ce(){return{parameters:{msw:{handlers:{mocks:me()}}}}}function me(){const t=re("observations"),r=h.rest.get("https://api.dev.zusapi.com/fhir/Patient",(n,s,e)=>s(e.delay(750),e.status(200),e.json(ne))),u=h.rest.get("https://api.dev.zusapi.com/fhir/DiagnosticReport",(n,s,e)=>s(e.status(200),e.delay(250),e.json(H))),g=h.graphql.query("DiagnosticReport",(n,s,e)=>s(e.delay(750),e.status(200),e.data(V)));return[t,r,u,g]}function de({allergyIntolerance:t,otherConditions:r,patientConditions:u,providerMedications:g,otherProviderMedications:n}){const s=x({allergyIntolerance:t}),e=G(),v=L({otherConditions:r,patientConditions:u}),I=q(),U=Z(),y=K({providerMedications:g,otherProviderMedications:n}),F=ce(),O=Q();return{decorators:[...s.decorators,...v.decorators,...y.decorators],parameters:{msw:{handlers:{mocks:[...s.parameters.msw.handlers.mocks,...e.parameters.msw.handlers.mocks,...v.parameters.msw.handlers.mocks,...I.parameters.msw.handlers.mocks,...U.parameters.msw.handlers.mocks,...y.parameters.msw.handlers.mocks,...F.parameters.msw.handlers.mocks,...O.parameters.msw.handlers.mocks]}}}}}const Ye={tags:["autodocs"],component:J,decorators:[(t,{args:r})=>o.createElement(X,{env:"dev",authToken:$,builderId:ee},o.createElement(se,{patientID:oe,systemURL:te},o.createElement(t,{args:r})))],args:{resources:void 0,forceHorizontalTabs:void 0,title:void 0,allergiesProps:void 0,conditionsProps:void 0,conditionsOutsideProps:void 0,documentsProps:void 0,immunizationsProps:void 0,medicationsProps:void 0,medicationsOutsideProps:void 0,removeBranding:void 0}},{decorators:a,parameters:i}=de({allergyIntolerance:N,otherConditions:ae,otherProviderMedications:j,patientConditions:ie,providerMedications:B}),c={decorators:a,parameters:i,args:{resources:["conditions-outside","medications-outside"]}},m={decorators:a,parameters:i,args:{resources:["conditions","conditions-outside","medications","medications-outside"]}},d={decorators:a,parameters:i,args:{resources:["allergies","conditions","immunizations","documents"]}},p={decorators:a,parameters:i,args:{resources:["allergies","conditions","conditions-outside","documents","immunizations","medications","medications-outside","care-team","timeline"]}},l={parameters:i,args:{resources:["allergies","conditions","conditions-outside","documents","immunizations","medications","medications-outside","care-team","timeline","diagnostic-reports"]},decorators:[...a,(t,{args:r})=>o.createElement("div",{className:"ctw-border-solid ctw-border-divider-light ctw-p-2"},o.createElement("h3",null,"Fixed height container"),o.createElement("code",{className:"language-jsx css-1lwmlsb"},`// CSS
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
}`,...(P=(b=d.parameters)==null?void 0:b.docs)==null?void 0:P.source}}};var z,T,R;p.parameters={...p.parameters,docs:{...(z=p.parameters)==null?void 0:z.docs,source:{originalSource:`{
  decorators,
  parameters,
  args: {
    resources: ["allergies", "conditions", "conditions-outside", "documents", "immunizations", "medications", "medications-outside", "care-team", "timeline"]
  }
}`,...(R=(T=p.parameters)==null?void 0:T.docs)==null?void 0:R.source}}};var _,D,C;l.parameters={...l.parameters,docs:{...(_=l.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
}`,...(C=(D=l.parameters)==null?void 0:D.docs)==null?void 0:C.source}}};const Je=["OutsideRecords","ConditionsAndMedications","ProblemsAndDocuments","Everything","ScrollbarsOnOverflowZap"];export{m as ConditionsAndMedications,p as Everything,c as OutsideRecords,d as ProblemsAndDocuments,l as ScrollbarsOnOverflowZap,Je as __namedExportsOrder,Ye as default};

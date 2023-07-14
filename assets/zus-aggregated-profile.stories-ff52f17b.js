import{R as s}from"./index-6f814c40.js";import{s as F,a as N}from"./allergy-intolerance-469c97c2.js";import{s as G}from"./requests-b241f454.js";import{s as L}from"./requests-c6ba2a66.js";import{s as Z}from"./requests-60ef7a99.js";import{s as K}from"./requests-eddb2792.js";import{s as j,o as q,p as B}from"./provider-medications-bfbeae09.js";import{a as v}from"./request-ad3802ec.js";import{d as H,s as V}from"./requests-82ccc630.js";import{z as W,q as Q,Z as Y,C as J,F as X,a as $,b as ee,c as se,S as oe}from"./patient-allergies-80eaf257.js";import{m as te}from"./requests-a35b4ce2.js";import{o as re,p as ae}from"./patient-conditions-4c383dfe.js";import"./_commonjsHelpers-042e6b4d.js";import"./types-6e67dc97.js";import"./action-list-9f938675.js";import"./index-74f03c09.js";import"./uniqWith-7e1673ff.js";import"./_baseForOwn-6ce43847.js";import"./_baseIsEqual-2f71925b.js";import"./_baseClone-7e8cfb08.js";import"./_baseUniq-44d20e17.js";import"./toNumber-6e4e7434.js";import"./isPlainObject-f4e3af75.js";import"./_basePickBy-a6d7916f.js";import"./isEqual-dc54df64.js";import"./mapValues-dc8f3697.js";import"./uniq-ef9e811e.js";import"./basic-acc13fe9.js";import"./v4-a960c1f4.js";import"./table-1111a513.js";import"./spinner-1fa7ac76.js";import"./medication-request-bd0aa8e6.js";import"./index-135b3e83.js";import"./extends-ed7e75b0.js";import"./index-d206d595.js";import"./drawer-3e903764.js";import"./index-6de6b113.js";import"./debounce-5d5a9f7a.js";import"./data-list-254aa0b0.js";const ie={resourceType:"Bundle",id:"c1db2d18",meta:{lastUpdated:"2022-11-14T18:57:45.140+00:00"},type:"searchset",entry:[{resource:{resourceType:"Patient",id:"1234-007",meta:{extension:[{url:"https://zusapi.com/created-at",valueInstant:"2022-11-08T15:02:14.762+00:00"}],versionId:"2",lastUpdated:"2022-11-08T15:02:15.233+00:00",source:"#829e9998c8d6fa1a",security:[{system:"http://terminology.hl7.org/CodeSystem/v3-ActReason",code:"HTEST"}],tag:[W]},identifier:[{system:"https://Storybookmedical.com/patient-id",value:"12345"},Q],name:[{family:"Shah",given:["Akhil"]}],telecom:[{system:"email",value:"akhil.shah@example.com"},{system:"phone",value:"555-739-0835",use:"home"},{system:"phone",value:"555-737-8967",use:"mobile"}],gender:"male",birthDate:"2010-08-16",address:[{line:["83 SHADOW LN"],city:"LAS VEGAS",state:"NV",postalCode:"89106-4119"}],maritalStatus:{coding:[{system:"http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",code:"S",display:"Single"}],text:"Single"},contact:[{relationship:[{coding:[{system:"http://terminology.hl7.org/CodeSystem/v2-0131",code:"C",display:"Emergency contact"}],text:"Emergency contact"}],name:{family:"Shah",given:["Sonah"]},telecom:[{system:"phone",value:"555-843-3900",use:"home"},{system:"email",value:"sonal.shah@example.com"}]}]},search:{mode:"match"}}]};function ne(){return{parameters:{msw:{handlers:{mocks:ce()}}}}}function ce(){const o=te("observations"),t=v.rest.get("https://api.dev.zusapi.com/fhir/Patient",(u,r,e)=>r(e.delay(750),e.status(200),e.json(ie))),l=v.rest.get("https://api.dev.zusapi.com/fhir/DiagnosticReport",(u,r,e)=>r(e.status(200),e.delay(250),e.json(H)));return[o,t,l]}function me({allergyIntolerance:o,otherConditions:t,patientConditions:l,providerMedications:u,otherProviderMedications:r}){const e=F({allergyIntolerance:o}),D=G(),g=L({otherConditions:t,patientConditions:l}),R=Z(),U=K(),h=j({providerMedications:u,otherProviderMedications:r}),x=ne(),O=V();return{decorators:[...e.decorators,...g.decorators,...h.decorators],parameters:{msw:{handlers:{mocks:[...e.parameters.msw.handlers.mocks,...D.parameters.msw.handlers.mocks,...g.parameters.msw.handlers.mocks,...R.parameters.msw.handlers.mocks,...U.parameters.msw.handlers.mocks,...h.parameters.msw.handlers.mocks,...x.parameters.msw.handlers.mocks,...O.parameters.msw.handlers.mocks]}}}}}const Qe={tags:["autodocs"],component:Y,decorators:[(o,{args:t})=>s.createElement(J,{env:"dev",authToken:X,builderId:$},s.createElement(ee,{patientID:se,systemURL:oe},s.createElement(o,{args:t})))],args:{resources:void 0,forceHorizontalTabs:void 0,title:void 0,allergiesProps:void 0,conditionsProps:void 0,conditionsOutsideProps:void 0,documentsProps:void 0,immunizationsProps:void 0,medicationsProps:void 0,medicationsOutsideProps:void 0,removeBranding:void 0}},{decorators:a,parameters:i}=me({allergyIntolerance:N,otherConditions:re,otherProviderMedications:q,patientConditions:ae,providerMedications:B}),n={decorators:a,parameters:i,args:{resources:["conditions-outside","medications-outside"]}},c={decorators:a,parameters:i,args:{resources:["conditions","conditions-outside","medications","medications-outside"]}},m={decorators:a,parameters:i,args:{resources:["allergies","conditions","immunizations","documents"]}},d={decorators:a,parameters:i,args:{resources:["allergies","conditions","conditions-outside","documents","immunizations","medications","medications-outside","care-team","timeline"]}},p={parameters:i,args:{resources:["allergies","conditions","conditions-outside","documents","immunizations","medications","medications-outside","care-team","timeline","diagnostic-reports"]},decorators:[...a,(o,{args:t})=>s.createElement("div",{className:"ctw-border-solid ctw-border-divider-light ctw-p-2"},s.createElement("h3",null,"Fixed height container"),s.createElement("code",{className:"language-jsx css-1lwmlsb"},`// CSS
.ctw-zus-aggregated-profile { height: 450px }`),s.createElement("style",null,".ctw-zus-aggregated-profile { height: 450px }"),s.createElement(o,{args:t}))]};var y,k,S;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  decorators,
  parameters,
  args: {
    resources: ["conditions-outside", "medications-outside"]
  }
}`,...(S=(k=n.parameters)==null?void 0:k.docs)==null?void 0:S.source}}};var f,E,w;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`{
  decorators,
  parameters,
  args: {
    resources: ["conditions", "conditions-outside", "medications", "medications-outside"]
  }
}`,...(w=(E=c.parameters)==null?void 0:E.docs)==null?void 0:w.source}}};var A,M,b;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`{
  decorators,
  parameters,
  args: {
    resources: ["allergies", "conditions", "immunizations", "documents"]
  }
}`,...(b=(M=m.parameters)==null?void 0:M.docs)==null?void 0:b.source}}};var P,z,T;d.parameters={...d.parameters,docs:{...(P=d.parameters)==null?void 0:P.docs,source:{originalSource:`{
  decorators,
  parameters,
  args: {
    resources: ["allergies", "conditions", "conditions-outside", "documents", "immunizations", "medications", "medications-outside", "care-team", "timeline"]
  }
}`,...(T=(z=d.parameters)==null?void 0:z.docs)==null?void 0:T.source}}};var _,C,I;p.parameters={...p.parameters,docs:{...(_=p.parameters)==null?void 0:_.docs,source:{originalSource:`{
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
}`,...(I=(C=p.parameters)==null?void 0:C.docs)==null?void 0:I.source}}};const Ye=["OutsideRecords","ConditionsAndMedications","ProblemsAndDocuments","Everything","ScrollbarsOnOverflowZap"];export{c as ConditionsAndMedications,d as Everything,n as OutsideRecords,m as ProblemsAndDocuments,p as ScrollbarsOnOverflowZap,Ye as __namedExportsOrder,Qe as default};

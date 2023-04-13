import{R as e}from"./index-6f814c40.js";import{s as D,a as N}from"./allergy-intolerance-1dfac828.js";import{s as U}from"./requests-c69b40e3.js";import{s as j,o as F,p as L}from"./requests-a5006b91.js";import{s as B}from"./requests-706c775f.js";import{s as H}from"./requests-32e16c03.js";import{s as V,o as W,p as Y}from"./provider-medications-cdacf345.js";import{s as q}from"./requests-9992c904.js";import{s as G}from"./requests-cd8f3a9b.js";import{Z as J,C as K,a as Q,S as X}from"./patient-allergies-52f5b6fc.js";import"./_commonjsHelpers-042e6b4d.js";import"./request-02bc8afe.js";import"./index-135b3e83.js";import"./action-list-471edd10.js";import"./index-74f03c09.js";import"./sortBy-eef2ec28.js";import"./_baseForOwn-10376b4b.js";import"./_baseIsEqual-a4ed7fae.js";import"./_baseClone-72ef38a3.js";import"./_createSet-e03e7f83.js";import"./toNumber-54b1e0c0.js";import"./isPlainObject-832b1a67.js";import"./_basePickBy-8e839ef7.js";import"./mapValues-0be0e26b.js";import"./uniq-512c0c4d.js";import"./requests-6e06ccba.js";import"./table-82fc3d88.js";import"./spinner-66aa4ba7.js";import"./medication-request-23eea7be.js";import"./patient-8f4a0ec9.js";import"./diagnostic-reports-c00b62df.js";import"./faker-42d66913.js";import"./provenances-5e8ba162.js";import"./extends-8de4c56c.js";import"./index-b03e455b.js";import"./drawer-86b55368.js";import"./index-6de6b113.js";import"./debounce-e90b6304.js";import"./data-list-254aa0b0.js";function $({allergyIntolerance:s,otherConditions:o,patientConditions:C,providerMedications:O,otherProviderMedications:A}){const d=D({allergyIntolerance:s}),T=U(),p=j({otherConditions:o,patientConditions:C}),I=B(),R=H(),u=V({providerMedications:O,otherProviderMedications:A}),Z=q(),_=G();return{decorators:[...d.decorators,...p.decorators,...u.decorators],parameters:{msw:{handlers:{mocks:[...d.parameters.msw.handlers.mocks,...T.parameters.msw.handlers.mocks,...p.parameters.msw.handlers.mocks,...I.parameters.msw.handlers.mocks,...R.parameters.msw.handlers.mocks,...u.parameters.msw.handlers.mocks,...Z.parameters.msw.handlers.mocks,..._.parameters.msw.handlers.mocks]}}}}}const je={tags:["autodocs"],component:J,decorators:[(s,{args:o})=>e.createElement(K,{env:"dev",authToken:"ey.12345",builderId:"12345"},e.createElement(Q,{patientID:"007",systemURL:X},e.createElement(s,{args:o})))],args:{resources:void 0,forceHorizontalTabs:void 0,title:void 0,allergiesProps:void 0,conditionsProps:void 0,conditionsOutsideProps:void 0,documentsProps:void 0,immunizationsProps:void 0,medicationsProps:void 0,medicationsOutsideProps:void 0,removeBranding:void 0}},{decorators:r,parameters:t}=$({allergyIntolerance:N,otherConditions:F,otherProviderMedications:W,patientConditions:L,providerMedications:Y}),i={decorators:r,parameters:t,args:{resources:["conditions-outside","medications-outside"]}},a={decorators:r,parameters:t,args:{resources:["conditions","conditions-outside","medications","medications-outside"]}},n={decorators:r,parameters:t,args:{resources:["allergies","conditions","immunizations","documents"]}},c={decorators:r,parameters:t,args:{resources:["allergies","conditions","conditions-outside","documents","immunizations","medications","medications-outside","care-team","timelines"]}},m={parameters:t,args:{resources:["allergies","conditions","conditions-outside","documents","immunizations","observations","observations-outside","medications","medications-outside","care-team","timelines"]},decorators:[...r,(s,{args:o})=>e.createElement("div",{className:"ctw-border-solid ctw-border-divider-light ctw-p-2"},e.createElement("h3",null,"Fixed height container"),e.createElement("code",{className:"language-jsx css-1lwmlsb"},`// CSS
.ctw-zus-aggregated-profile { height: 450px }`),e.createElement("style",null,".ctw-zus-aggregated-profile { height: 450px }"),e.createElement(s,{args:o}))]};var l,g,v;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`{
  decorators,
  parameters,
  args: {
    resources: ["conditions-outside", "medications-outside"]
  }
}`,...(v=(g=i.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};var h,k,w;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  decorators,
  parameters,
  args: {
    resources: ["conditions", "conditions-outside", "medications", "medications-outside"]
  }
}`,...(w=(k=a.parameters)==null?void 0:k.docs)==null?void 0:w.source}}};var M,f,b;n.parameters={...n.parameters,docs:{...(M=n.parameters)==null?void 0:M.docs,source:{originalSource:`{
  decorators,
  parameters,
  args: {
    resources: ["allergies", "conditions", "immunizations", "documents"]
  }
}`,...(b=(f=n.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var S,P,z;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  decorators,
  parameters,
  args: {
    resources: ["allergies", "conditions", "conditions-outside", "documents", "immunizations", "medications", "medications-outside", "care-team", "timelines"]
  }
}`,...(z=(P=c.parameters)==null?void 0:P.docs)==null?void 0:z.source}}};var E,y,x;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`{
  parameters,
  args: {
    resources: ["allergies", "conditions", "conditions-outside", "documents", "immunizations", "observations", "observations-outside", "medications", "medications-outside", "care-team", "timelines"]
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
}`,...(x=(y=m.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};const Fe=["OutsideRecords","ConditionsAndMedications","ProblemsAndDocuments","Everything","ScrollbarsOnOverflowZap"];export{a as ConditionsAndMedications,c as Everything,i as OutsideRecords,n as ProblemsAndDocuments,m as ScrollbarsOnOverflowZap,Fe as __namedExportsOrder,je as default};

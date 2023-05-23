import{R as e}from"./index-6f814c40.js";import{s as F,a as N}from"./allergy-intolerance-3191814a.js";import{s as U}from"./requests-37da4e20.js";import{s as Z,o as K,p as L}from"./requests-07f37aab.js";import{s as j}from"./requests-3585484a.js";import{s as B}from"./requests-5dd950d3.js";import{s as H,o as V,p as W}from"./provider-medications-16e70d9f.js";import{s as Y}from"./requests-32fdb510.js";import{s as q}from"./requests-443222e5.js";import{Z as G,C as J,F as Q,a as X,b as $,c as ee,S as se}from"./patient-allergies-27ba37fe.js";import"./_commonjsHelpers-042e6b4d.js";import"./request-02bc8afe.js";import"./index-135b3e83.js";import"./types-6e67dc97.js";import"./action-list-32bd005e.js";import"./index-74f03c09.js";import"./uniqWith-bbf3966e.js";import"./_baseForOwn-6ce43847.js";import"./_baseIsEqual-2f71925b.js";import"./_baseClone-7e8cfb08.js";import"./_baseUniq-cf39c5a7.js";import"./toNumber-6e4e7434.js";import"./isPlainObject-f4e3af75.js";import"./_basePickBy-a6d7916f.js";import"./isEqual-dc54df64.js";import"./mapValues-dc8f3697.js";import"./uniq-41de9089.js";import"./basic-ce96fd40.js";import"./requests-6e06ccba.js";import"./table-35182169.js";import"./spinner-66aa4ba7.js";import"./medication-request-f4ad3d95.js";import"./diagnostic-reports-64109a2f.js";import"./faker-42d66913.js";import"./extends-02cdfa78.js";import"./index-d206d595.js";import"./drawer-3e903764.js";import"./index-6de6b113.js";import"./debounce-5d5a9f7a.js";import"./data-list-254aa0b0.js";function oe({allergyIntolerance:s,otherConditions:o,patientConditions:x,providerMedications:y,otherProviderMedications:C}){const d=F({allergyIntolerance:s}),I=U(),p=Z({otherConditions:o,patientConditions:x}),O=j(),T=B(),u=H({providerMedications:y,otherProviderMedications:C}),D=Y(),R=q();return{decorators:[...d.decorators,...p.decorators,...u.decorators],parameters:{msw:{handlers:{mocks:[...d.parameters.msw.handlers.mocks,...I.parameters.msw.handlers.mocks,...p.parameters.msw.handlers.mocks,...O.parameters.msw.handlers.mocks,...T.parameters.msw.handlers.mocks,...u.parameters.msw.handlers.mocks,...D.parameters.msw.handlers.mocks,...R.parameters.msw.handlers.mocks]}}}}}const Be={tags:["autodocs"],component:G,decorators:[(s,{args:o})=>e.createElement(J,{env:"dev",authToken:Q,builderId:X},e.createElement($,{patientID:ee,systemURL:se},e.createElement(s,{args:o})))],args:{resources:void 0,forceHorizontalTabs:void 0,title:void 0,allergiesProps:void 0,conditionsProps:void 0,conditionsOutsideProps:void 0,documentsProps:void 0,immunizationsProps:void 0,medicationsProps:void 0,medicationsOutsideProps:void 0,removeBranding:void 0}},{decorators:r,parameters:t}=oe({allergyIntolerance:N,otherConditions:K,otherProviderMedications:V,patientConditions:L,providerMedications:W}),i={decorators:r,parameters:t,args:{resources:["conditions-outside","medications-outside"]}},a={decorators:r,parameters:t,args:{resources:["conditions","conditions-outside","medications","medications-outside"]}},n={decorators:r,parameters:t,args:{resources:["allergies","conditions","immunizations","documents"]}},c={decorators:r,parameters:t,args:{resources:["allergies","conditions","conditions-outside","documents","immunizations","medications","medications-outside","care-team","timeline"]}},m={parameters:t,args:{resources:["allergies","conditions","conditions-outside","documents","immunizations","observations","observations-outside","medications","medications-outside","care-team","timeline"]},decorators:[...r,(s,{args:o})=>e.createElement("div",{className:"ctw-border-solid ctw-border-divider-light ctw-p-2"},e.createElement("h3",null,"Fixed height container"),e.createElement("code",{className:"language-jsx css-1lwmlsb"},`// CSS
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
}`,...(b=(f=n.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var E,P,S;c.parameters={...c.parameters,docs:{...(E=c.parameters)==null?void 0:E.docs,source:{originalSource:`{
  decorators,
  parameters,
  args: {
    resources: ["allergies", "conditions", "conditions-outside", "documents", "immunizations", "medications", "medications-outside", "care-team", "timeline"]
  }
}`,...(S=(P=c.parameters)==null?void 0:P.docs)==null?void 0:S.source}}};var z,A,_;m.parameters={...m.parameters,docs:{...(z=m.parameters)==null?void 0:z.docs,source:{originalSource:`{
  parameters,
  args: {
    resources: ["allergies", "conditions", "conditions-outside", "documents", "immunizations", "observations", "observations-outside", "medications", "medications-outside", "care-team", "timeline"]
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
}`,...(_=(A=m.parameters)==null?void 0:A.docs)==null?void 0:_.source}}};const He=["OutsideRecords","ConditionsAndMedications","ProblemsAndDocuments","Everything","ScrollbarsOnOverflowZap"];export{a as ConditionsAndMedications,c as Everything,i as OutsideRecords,n as ProblemsAndDocuments,m as ScrollbarsOnOverflowZap,He as __namedExportsOrder,Be as default};

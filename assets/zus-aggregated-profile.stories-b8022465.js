import{R as o}from"./index-6f814c40.js";import{s as D,a as N}from"./allergy-intolerance-7e4fadd9.js";import{s as U}from"./requests-de488e23.js";import{s as j,o as F,p as L}from"./requests-6584e3fe.js";import{s as B}from"./requests-40a6b578.js";import{s as H}from"./requests-f33b2a30.js";import{s as V,o as W,p as Y}from"./requests-b6639775.js";import{s as q}from"./requests-ec4b4c05.js";import{s as G}from"./requests-3bd162e4.js";import{Z as J}from"./zus-aggregated-profile-5fb3815a.js";import{C as K,S as Q}from"./patient-helper-02df47c5.js";import{P as X}from"./patient-provider-8ee675f7.js";import"./_commonjsHelpers-042e6b4d.js";import"./request-5a1df4c1.js";import"./values-2f84f633.js";import"./_baseForOwn-54d22bab.js";import"./_equalByTag-5ee6784b.js";import"./_baseIsEqual-1cb0d27b.js";import"./_baseToString-2a4c2757.js";import"./sortBy-649a17b3.js";import"./_baseClone-184e5c2b.js";import"./_createSet-014fa0cf.js";import"./toNumber-50f0b3d6.js";import"./_basePickBy-53e340c6.js";import"./mapValues-34771cfa.js";import"./isPlainObject-bc149fd7.js";import"./uniq-789c9501.js";import"./requests-42767b99.js";import"./sortBy-1cabbe82.js";import"./medication-request-23eea7be.js";import"./patient-8f4a0ec9.js";import"./faker-8193e1fd.js";import"./provenances-5e8ba162.js";import"./zus-1e897978.js";import"./index-74f03c09.js";import"./debounce-44376e67.js";import"./isEmpty-67f2860b.js";import"./use-controllable-046cc6fb.js";import"./use-watch-a9671586.js";import"./use-patient-history-53246a1a.js";import"./drawer-2856393a.js";import"./transition-19b92c4a.js";import"./index-6de6b113.js";import"./spinner-66aa4ba7.js";import"./observation-62726eb1.js";import"./getPrototypeOf-b690d638.js";import"./details-card-1ac2a254.js";import"./index-4d501b15.js";import"./isString-69148acc.js";import"./history-38d3c1cf.js";import"./diagnostic-report-a4fa0bc6.js";import"./extends-98964cd2.js";import"./table-48423089.js";import"./use-breakpoints-f5aa2b4e.js";import"./error-boundary-38b5f5fe.js";import"./resource-details-drawer-7a260bfd.js";import"./loading-c7ff698a.js";import"./isEqual-ee96640d.js";import"./coding-list-1d7c950f.js";import"./encounters-76878b3e.js";import"./data-list-254aa0b0.js";import"./medication-history-3cbe1c0b.js";import"./patient-observations-77986288.js";import"./patient-allergies-4f896e1a.js";import"./patient-careteam-ed257c48.js";import"./view-fhir-875516d0.js";import"./patient-documents-f599c1e5.js";import"./patient-immunizations-f0845f99.js";import"./patient-timeline-d1788fb2.js";import"./_commonjs-dynamic-modules-302442b1.js";function $({allergyIntolerance:e,otherConditions:s,patientConditions:C,providerMedications:O,otherProviderMedications:A}){const d=D({allergyIntolerance:e}),T=U(),p=j({otherConditions:s,patientConditions:C}),I=B(),R=H(),u=V({providerMedications:O,otherProviderMedications:A}),Z=q(),_=G();return{decorators:[...d.decorators,...p.decorators,...u.decorators],parameters:{msw:{handlers:{mocks:[...d.parameters.msw.handlers.mocks,...T.parameters.msw.handlers.mocks,...p.parameters.msw.handlers.mocks,...I.parameters.msw.handlers.mocks,...R.parameters.msw.handlers.mocks,...u.parameters.msw.handlers.mocks,...Z.parameters.msw.handlers.mocks,..._.parameters.msw.handlers.mocks]}}}}}const ke={tags:["autodocs"],component:J,decorators:[(e,{args:s})=>o.createElement(K,{env:"dev",authToken:"ey.12345",builderId:"12345"},o.createElement(X,{patientID:"007",systemURL:Q},o.createElement(e,{args:s})))],args:{resources:void 0,forceHorizontalTabs:void 0,title:void 0,allergiesProps:void 0,conditionsProps:void 0,conditionsOutsideProps:void 0,documentsProps:void 0,immunizationsProps:void 0,medicationsProps:void 0,medicationsOutsideProps:void 0,removeBranding:void 0}},{decorators:r,parameters:t}=$({allergyIntolerance:N,otherConditions:F,otherProviderMedications:W,patientConditions:L,providerMedications:Y}),i={decorators:r,parameters:t,args:{resources:["conditions-outside","medications-outside"]}},a={decorators:r,parameters:t,args:{resources:["conditions","conditions-outside","medications","medications-outside"]}},n={decorators:r,parameters:t,args:{resources:["allergies","conditions","immunizations","documents"]}},m={decorators:r,parameters:t,args:{resources:["allergies","conditions","conditions-outside","documents","immunizations","medications","medications-outside","care-team","timelines"]}},c={parameters:t,args:{resources:["allergies","conditions","conditions-outside","documents","immunizations","observations","observations-outside","medications","medications-outside","care-team","timelines"]},decorators:[...r,(e,{args:s})=>o.createElement("div",{className:"ctw-border-solid ctw-border-divider-light ctw-p-2"},o.createElement("h3",null,"Fixed height container"),o.createElement("code",{className:"language-jsx css-1lwmlsb"},`// CSS
.ctw-zus-aggregated-profile { height: 450px }`),o.createElement("style",null,".ctw-zus-aggregated-profile { height: 450px }"),o.createElement(e,{args:s}))]};var l,g,v;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`{
  decorators,
  parameters,
  args: {
    resources: ["conditions-outside", "medications-outside"]
  }
}`,...(v=(g=i.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};var h,k,f;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  decorators,
  parameters,
  args: {
    resources: ["conditions", "conditions-outside", "medications", "medications-outside"]
  }
}`,...(f=(k=a.parameters)==null?void 0:k.docs)==null?void 0:f.source}}};var w,M,b;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`{
  decorators,
  parameters,
  args: {
    resources: ["allergies", "conditions", "immunizations", "documents"]
  }
}`,...(b=(M=n.parameters)==null?void 0:M.docs)==null?void 0:b.source}}};var S,P,z;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`{
  decorators,
  parameters,
  args: {
    resources: ["allergies", "conditions", "conditions-outside", "documents", "immunizations", "medications", "medications-outside", "care-team", "timelines"]
  }
}`,...(z=(P=m.parameters)==null?void 0:P.docs)==null?void 0:z.source}}};var E,y,x;c.parameters={...c.parameters,docs:{...(E=c.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(x=(y=c.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};const fe=["OutsideRecords","ConditionsAndMedications","ProblemsAndDocuments","Everything","ScrollbarsOnOverflowZap"];export{a as ConditionsAndMedications,m as Everything,i as OutsideRecords,n as ProblemsAndDocuments,c as ScrollbarsOnOverflowZap,fe as __namedExportsOrder,ke as default};

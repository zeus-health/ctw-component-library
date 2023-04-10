import{R as o}from"./index-6f814c40.js";import{s as D,a as N}from"./allergy-intolerance-ee16ba1e.js";import{s as U}from"./requests-7b4f4137.js";import{s as j,o as F,p as L}from"./requests-0fdc8c85.js";import{s as B}from"./requests-e9613b0b.js";import{s as H}from"./requests-a160fcbb.js";import{s as V,o as W,p as Y}from"./provider-medications-52ad0a90.js";import{s as q}from"./requests-06bfa9ca.js";import{s as G}from"./requests-1aa413c8.js";import{Z as J}from"./zus-aggregated-profile-35829190.js";import{C as K,P as Q,S as X}from"./patient-provider-d5d45996.js";import"./_commonjsHelpers-042e6b4d.js";import"./request-b468d8d1.js";import"./index-135b3e83.js";import"./values-c66b9b7f.js";import"./_baseForOwn-b2e5e443.js";import"./_baseIsEqual-f087c1ca.js";import"./sortBy-400dab6d.js";import"./_baseClone-39df8af0.js";import"./_createSet-fb89f2da.js";import"./toNumber-4f5f2b1f.js";import"./_basePickBy-9cf4e7d3.js";import"./mapValues-98bf2644.js";import"./isPlainObject-3a25496e.js";import"./uniq-929f35e8.js";import"./requests-1a2eb706.js";import"./sortBy-a6efb69f.js";import"./medication-request-23eea7be.js";import"./patient-8f4a0ec9.js";import"./diagnostic-reports-c00b62df.js";import"./faker-42d66913.js";import"./provenances-5e8ba162.js";import"./zus-80b875cb.js";import"./index-74f03c09.js";import"./debounce-97066b27.js";import"./isEmpty-09f89500.js";import"./use-controllable-6b791838.js";import"./use-watch-ad083092.js";import"./use-patient-history-5d414779.js";import"./drawer-10febc18.js";import"./index-6de6b113.js";import"./spinner-66aa4ba7.js";import"./error-boundary-085fd19a.js";import"./use-breakpoints-9fcf4b5b.js";import"./pickBy-542c46d7.js";import"./view-fhir-78ad4744.js";import"./details-card-505ef9df.js";import"./index-4d501b15.js";import"./loading-c41f709e.js";import"./patient-allergies-9d7d0f22.js";import"./isEqual-8b7b0b49.js";import"./use-filtered-sorted-data-4f6298e9.js";import"./table-c0cb6876.js";import"./extends-98964cd2.js";import"./isString-f6042a2d.js";import"./sort-a6cd1820.js";import"./coding-list-1d7c950f.js";import"./encounters-0475fd56.js";import"./data-list-254aa0b0.js";import"./null-flavor-c59991a4.js";import"./patient-observations-b7f95966.js";import"./diagnostic-report-c5e1a697.js";import"./patient-careteam-38d6efa8.js";import"./patient-documents-3d32b483.js";import"./patient-immunizations-d140af24.js";import"./patient-timeline-b7dee780.js";function $({allergyIntolerance:e,otherConditions:s,patientConditions:C,providerMedications:O,otherProviderMedications:A}){const d=D({allergyIntolerance:e}),T=U(),p=j({otherConditions:s,patientConditions:C}),I=B(),R=H(),u=V({providerMedications:O,otherProviderMedications:A}),Z=q(),_=G();return{decorators:[...d.decorators,...p.decorators,...u.decorators],parameters:{msw:{handlers:{mocks:[...d.parameters.msw.handlers.mocks,...T.parameters.msw.handlers.mocks,...p.parameters.msw.handlers.mocks,...I.parameters.msw.handlers.mocks,...R.parameters.msw.handlers.mocks,...u.parameters.msw.handlers.mocks,...Z.parameters.msw.handlers.mocks,..._.parameters.msw.handlers.mocks]}}}}}const le={tags:["autodocs"],component:J,decorators:[(e,{args:s})=>o.createElement(K,{env:"dev",authToken:"ey.12345",builderId:"12345"},o.createElement(Q,{patientID:"007",systemURL:X},o.createElement(e,{args:s})))],args:{resources:void 0,forceHorizontalTabs:void 0,title:void 0,allergiesProps:void 0,conditionsProps:void 0,conditionsOutsideProps:void 0,documentsProps:void 0,immunizationsProps:void 0,medicationsProps:void 0,medicationsOutsideProps:void 0,removeBranding:void 0}},{decorators:r,parameters:t}=$({allergyIntolerance:N,otherConditions:F,otherProviderMedications:W,patientConditions:L,providerMedications:Y}),i={decorators:r,parameters:t,args:{resources:["conditions-outside","medications-outside"]}},a={decorators:r,parameters:t,args:{resources:["conditions","conditions-outside","medications","medications-outside"]}},n={decorators:r,parameters:t,args:{resources:["allergies","conditions","immunizations","documents"]}},m={decorators:r,parameters:t,args:{resources:["allergies","conditions","conditions-outside","documents","immunizations","medications","medications-outside","care-team","timelines"]}},c={parameters:t,args:{resources:["allergies","conditions","conditions-outside","documents","immunizations","observations","observations-outside","medications","medications-outside","care-team","timelines"]},decorators:[...r,(e,{args:s})=>o.createElement("div",{className:"ctw-border-solid ctw-border-divider-light ctw-p-2"},o.createElement("h3",null,"Fixed height container"),o.createElement("code",{className:"language-jsx css-1lwmlsb"},`// CSS
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
}`,...(x=(y=c.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};const ge=["OutsideRecords","ConditionsAndMedications","ProblemsAndDocuments","Everything","ScrollbarsOnOverflowZap"];export{a as ConditionsAndMedications,m as Everything,i as OutsideRecords,n as ProblemsAndDocuments,c as ScrollbarsOnOverflowZap,ge as __namedExportsOrder,le as default};

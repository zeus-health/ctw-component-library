import{R as o}from"./index-6f814c40.js";import{s as D,a as N}from"./allergy-intolerance-a6c7eb15.js";import{s as U}from"./requests-de488e23.js";import{s as j,o as F,p as L}from"./requests-8010fc64.js";import{s as B}from"./requests-40a6b578.js";import{s as H}from"./requests-f33b2a30.js";import{s as V,o as W,p as Y}from"./requests-34683b0b.js";import{s as q}from"./requests-ec4b4c05.js";import{s as G}from"./requests-49708b6a.js";import{Z as J}from"./zus-aggregated-profile-dddbe5a8.js";import{C as K,S as Q}from"./patient-helper-2ab30682.js";import{P as X}from"./patient-provider-370da583.js";import"./_commonjsHelpers-042e6b4d.js";import"./request-5a1df4c1.js";import"./values-0b6ffb91.js";import"./_baseForOwn-d8306f34.js";import"./_equalByTag-aaf39779.js";import"./_baseIsEqual-c150f525.js";import"./_baseToString-4993715b.js";import"./sortBy-919d7262.js";import"./_baseClone-25b1595e.js";import"./_createSet-12ef9b81.js";import"./toNumber-9b8ac844.js";import"./_basePickBy-239377e6.js";import"./mapValues-21907523.js";import"./isPlainObject-8e58b46f.js";import"./uniq-f5468222.js";import"./requests-42767b99.js";import"./sortBy-be5f7eb4.js";import"./patient-8f4a0ec9.js";import"./faker-8193e1fd.js";import"./zus-da29a567.js";import"./use-patient-history-869fad4e.js";import"./drawer-form-with-fields-042ccf3f.js";import"./drawer-ed34104d.js";import"./index-74f03c09.js";import"./use-watch-a9671586.js";import"./index-6de6b113.js";import"./spinner-66aa4ba7.js";import"./isEmpty-bcd6f1a3.js";import"./observation-70981ad9.js";import"./sort-879bd9bb.js";import"./isString-35d4a3f2.js";import"./getPrototypeOf-9c757e77.js";import"./uniqWith-f1edcb30.js";import"./null-flavor-758ab843.js";import"./combobox-field-948eed97.js";import"./debounce-535e186e.js";import"./use-controllable-f15d4b9a.js";import"./calculate-active-index-048f6a58.js";import"./resource-details-drawer-21c8ce4f.js";import"./document-icon-581c51b2.js";import"./collapsible-data-list-details-f7571cef.js";import"./loading-c7ff698a.js";import"./medication-history-8fdc40f3.js";import"./error-boundary-21d5c843.js";import"./use-breakpoints-2354eef2.js";import"./isEqual-b08f36b0.js";import"./coding-list-1d7c950f.js";import"./patient-observations-b1cedd5f.js";import"./table-fb9c18d0.js";import"./filter-bar-a7fef3e9.js";import"./use-filtered-sorted-data-e6171571.js";import"./index-4d501b15.js";import"./extends-98964cd2.js";import"./other-provider-meds-table-d7647ddc.js";import"./use-medications-c15a162c.js";import"./data-list-254aa0b0.js";import"./patient-allergies-4b1062a9.js";import"./patient-careteam-c573ce6b.js";import"./view-fhir-20c4031c.js";import"./patient-documents-e2dbba53.js";import"./patient-immunizations-affa7071.js";import"./patient-medications-8c757296.js";import"./provider-meds-table-fbe94104.js";import"./patient-timeline-4ebe0ccd.js";import"./_commonjs-dynamic-modules-302442b1.js";function $({allergyIntolerance:e,otherConditions:s,patientConditions:C,providerMedications:O,otherProviderMedications:A}){const d=D({allergyIntolerance:e}),T=U(),p=j({otherConditions:s,patientConditions:C}),I=B(),R=H(),u=V({providerMedications:O,otherProviderMedications:A}),Z=q(),_=G();return{decorators:[...d.decorators,...p.decorators,...u.decorators],parameters:{msw:{handlers:{mocks:[...d.parameters.msw.handlers.mocks,...T.parameters.msw.handlers.mocks,...p.parameters.msw.handlers.mocks,...I.parameters.msw.handlers.mocks,...R.parameters.msw.handlers.mocks,...u.parameters.msw.handlers.mocks,...Z.parameters.msw.handlers.mocks,..._.parameters.msw.handlers.mocks]}}}}}const ze={tags:["autodocs"],component:J,decorators:[(e,{args:s})=>o.createElement(K,{env:"dev",authToken:"ey.12345",builderId:"12345"},o.createElement(X,{patientID:"007",systemURL:Q},o.createElement(e,{args:s})))],args:{resources:void 0,forceHorizontalTabs:void 0,title:void 0,allergiesProps:void 0,conditionsProps:void 0,conditionsOutsideProps:void 0,documentsProps:void 0,immunizationsProps:void 0,medicationsProps:void 0,medicationsOutsideProps:void 0,removeBranding:void 0}},{decorators:r,parameters:t}=$({allergyIntolerance:N,otherConditions:F,otherProviderMedications:W,patientConditions:L,providerMedications:Y}),i={decorators:r,parameters:t,args:{resources:["conditions-outside","medications-outside"]}},a={decorators:r,parameters:t,args:{resources:["conditions","conditions-outside","medications","medications-outside"]}},n={decorators:r,parameters:t,args:{resources:["allergies","conditions","immunizations","documents"]}},m={decorators:r,parameters:t,args:{resources:["allergies","conditions","conditions-outside","documents","immunizations","medications","medications-outside","care-team","timelines"]}},c={parameters:t,args:{resources:["allergies","conditions","conditions-outside","documents","immunizations","observations","observations-outside","medications","medications-outside","care-team","timelines"]},decorators:[...r,(e,{args:s})=>o.createElement("div",{className:"ctw-border-solid ctw-border-divider-light ctw-p-2"},o.createElement("h3",null,"Fixed height container"),o.createElement("code",{className:"language-jsx css-1lwmlsb"},`// CSS
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
}`,...(x=(y=c.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};const Ee=["OutsideRecords","ConditionsAndMedications","ProblemsAndDocuments","Everything","ScrollbarsOnOverflowZap"];export{a as ConditionsAndMedications,m as Everything,i as OutsideRecords,n as ProblemsAndDocuments,c as ScrollbarsOnOverflowZap,Ee as __namedExportsOrder,ze as default};

import{R as o}from"./index-6f814c40.js";import{s as F,a as r}from"./allergy-intolerance-a6c7eb15.js";import{s as L}from"./requests-de488e23.js";import{s as B,o as t,p as i}from"./requests-c13cd8e0.js";import{s as H}from"./requests-40a6b578.js";import{s as V}from"./requests-f33b2a30.js";import{s as W,o as n,p as a}from"./requests-9753dbad.js";import{s as Y}from"./requests-ec4b4c05.js";import{s as q}from"./requests-49708b6a.js";import{Z as G}from"./zus-aggregated-profile-a730a3c8.js";import{C as J,S as K}from"./patient-helper-9db8d359.js";import{P as Q}from"./patient-provider-a45d74ab.js";import"./_commonjsHelpers-042e6b4d.js";import"./request-5a1df4c1.js";import"./values-0b6ffb91.js";import"./_baseForOwn-d8306f34.js";import"./_equalByTag-aaf39779.js";import"./_baseIsEqual-c150f525.js";import"./_baseToString-4993715b.js";import"./sortBy-919d7262.js";import"./_baseClone-25b1595e.js";import"./_createSet-12ef9b81.js";import"./toNumber-9b8ac844.js";import"./_basePickBy-239377e6.js";import"./mapValues-21907523.js";import"./isPlainObject-8e58b46f.js";import"./uniq-f5468222.js";import"./requests-42767b99.js";import"./sortBy-be5f7eb4.js";import"./patient-8f4a0ec9.js";import"./faker-8193e1fd.js";import"./zus-da29a567.js";import"./use-patient-history-cba1d407.js";import"./drawer-form-with-fields-f8703157.js";import"./drawer-ed34104d.js";import"./index-74f03c09.js";import"./use-watch-a9671586.js";import"./index-6de6b113.js";import"./spinner-66aa4ba7.js";import"./isEmpty-bcd6f1a3.js";import"./observation-a3fc3a55.js";import"./sort-0f00e62c.js";import"./isString-35d4a3f2.js";import"./getPrototypeOf-9c757e77.js";import"./uniqWith-f1edcb30.js";import"./null-flavor-316cf64e.js";import"./combobox-field-f37ceeec.js";import"./debounce-535e186e.js";import"./use-controllable-f15d4b9a.js";import"./calculate-active-index-048f6a58.js";import"./resource-details-drawer-f31ecc06.js";import"./document-icon-581c51b2.js";import"./collapsible-data-list-details-f7571cef.js";import"./loading-c7ff698a.js";import"./medication-history-ac0fd6a9.js";import"./error-boundary-4145d802.js";import"./use-breakpoints-61de5753.js";import"./isEqual-b08f36b0.js";import"./coding-list-1d7c950f.js";import"./patient-observations-bd6c62f9.js";import"./table-fb9c18d0.js";import"./filter-bar-efd9decb.js";import"./use-filtered-sorted-data-7cb89880.js";import"./index-4d501b15.js";import"./extends-98964cd2.js";import"./other-provider-meds-table-34757446.js";import"./use-medications-f70bdafd.js";import"./data-list-254aa0b0.js";import"./patient-allergies-fe8fb979.js";import"./patient-careteam-ebda2aa9.js";import"./view-fhir-47d13ccb.js";import"./patient-documents-b087b307.js";import"./patient-immunizations-0adbfe67.js";import"./patient-medications-a38bda3e.js";import"./provider-meds-table-01bd2072.js";import"./patient-timeline-b6cb9dee.js";import"./_commonjs-dynamic-modules-302442b1.js";function m({allergyIntolerance:e,otherConditions:s,patientConditions:O,providerMedications:T,otherProviderMedications:R}){const g=F({allergyIntolerance:e}),_=L(),v=B({otherConditions:s,patientConditions:O}),D=H(),N=V(),h=W({providerMedications:T,otherProviderMedications:R}),U=Y(),j=q();return{decorators:[...g.decorators,...v.decorators,...h.decorators],parameters:{msw:{handlers:{mocks:[...g.parameters.msw.handlers.mocks,..._.parameters.msw.handlers.mocks,...v.parameters.msw.handlers.mocks,...D.parameters.msw.handlers.mocks,...N.parameters.msw.handlers.mocks,...h.parameters.msw.handlers.mocks,...U.parameters.msw.handlers.mocks,...j.parameters.msw.handlers.mocks]}}}}}const Ce={tags:["autodocs"],component:G,decorators:[(e,{args:s})=>o.createElement(J,{env:"dev",authToken:"ey.12345",builderId:"12345"},o.createElement(Q,{patientID:"007",systemURL:K},o.createElement(e,{args:s})))],args:{resources:void 0,forceHorizontalTabs:void 0,title:void 0,allergiesProps:void 0,conditionsProps:void 0,conditionsOutsideProps:void 0,documentsProps:void 0,immunizationsProps:void 0,medicationsProps:void 0,medicationsOutsideProps:void 0,removeBranding:void 0}},c={...m({allergyIntolerance:r,otherConditions:t,otherProviderMedications:n,patientConditions:i,providerMedications:a}),args:{resources:["conditions-outside","medications-outside"]}},d={...m({allergyIntolerance:r,otherConditions:t,otherProviderMedications:n,patientConditions:i,providerMedications:a}),args:{resources:["conditions","conditions-outside","medications","medications-outside"]}},p={...m({allergyIntolerance:r,otherConditions:t,otherProviderMedications:n,patientConditions:i,providerMedications:a}),args:{resources:["allergies","conditions","immunizations","documents"]}},l={...m({allergyIntolerance:r,otherConditions:t,otherProviderMedications:n,patientConditions:i,providerMedications:a}),args:{resources:["allergies","conditions","conditions-outside","documents","immunizations","medications","medications-outside","care-team","timelines"]}},u={...m({allergyIntolerance:r,otherConditions:t,otherProviderMedications:n,patientConditions:i,providerMedications:a}),args:{resources:["allergies","conditions","conditions-outside","documents","immunizations","observations","observations-outside","medications","medications-outside","care-team","timelines"]},decorators:[(e,{args:s})=>o.createElement("div",{className:"ctw-border-solid ctw-border-divider-light ctw-p-2"},o.createElement("h3",null,"Fixed height container"),o.createElement("code",{className:"language-jsx css-1lwmlsb"},`// CSS
.ctw-zus-aggregated-profile { height: 450px }`),o.createElement("style",null,".ctw-zus-aggregated-profile { height: 450px }"),o.createElement(e,{args:s}))]};var M,k,f;c.parameters={...c.parameters,docs:{...(M=c.parameters)==null?void 0:M.docs,source:{originalSource:`{
  ...setupZusAggregatedProfileMocks({
    allergyIntolerance,
    otherConditions,
    otherProviderMedications,
    patientConditions,
    providerMedications
  }),
  args: {
    resources: ["conditions-outside", "medications-outside"]
  }
}`,...(f=(k=c.parameters)==null?void 0:k.docs)==null?void 0:f.source}}};var P,w,C;d.parameters={...d.parameters,docs:{...(P=d.parameters)==null?void 0:P.docs,source:{originalSource:`{
  ...setupZusAggregatedProfileMocks({
    allergyIntolerance,
    otherConditions,
    otherProviderMedications,
    patientConditions,
    providerMedications
  }),
  args: {
    resources: ["conditions", "conditions-outside", "medications", "medications-outside"]
  }
}`,...(C=(w=d.parameters)==null?void 0:w.docs)==null?void 0:C.source}}};var b,S,y;p.parameters={...p.parameters,docs:{...(b=p.parameters)==null?void 0:b.docs,source:{originalSource:`{
  ...setupZusAggregatedProfileMocks({
    allergyIntolerance,
    otherConditions,
    otherProviderMedications,
    patientConditions,
    providerMedications
  }),
  args: {
    resources: ["allergies", "conditions", "immunizations", "documents"]
  }
}`,...(y=(S=p.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};var z,A,E;l.parameters={...l.parameters,docs:{...(z=l.parameters)==null?void 0:z.docs,source:{originalSource:`{
  ...setupZusAggregatedProfileMocks({
    allergyIntolerance,
    otherConditions,
    otherProviderMedications,
    patientConditions,
    providerMedications
  }),
  args: {
    resources: ["allergies", "conditions", "conditions-outside", "documents", "immunizations", "medications", "medications-outside", "care-team", "timelines"]
  }
}`,...(E=(A=l.parameters)==null?void 0:A.docs)==null?void 0:E.source}}};var I,Z,x;u.parameters={...u.parameters,docs:{...(I=u.parameters)==null?void 0:I.docs,source:{originalSource:`{
  ...setupZusAggregatedProfileMocks({
    allergyIntolerance,
    otherConditions,
    otherProviderMedications,
    patientConditions,
    providerMedications
  }),
  args: {
    resources: ["allergies", "conditions", "conditions-outside", "documents", "immunizations", "observations", "observations-outside", "medications", "medications-outside", "care-team", "timelines"]
  },
  decorators: [(Story, {
    args
  }) => <div className="ctw-border-solid ctw-border-divider-light ctw-p-2">
        <h3>Fixed height container</h3>
        <code className="language-jsx css-1lwmlsb">
          {"// CSS\\n.ctw-zus-aggregated-profile { height: 450px }"}
        </code>
        <style>{".ctw-zus-aggregated-profile { height: 450px }"}</style>
        <Story args={args} />
      </div>]
}`,...(x=(Z=u.parameters)==null?void 0:Z.docs)==null?void 0:x.source}}};const be=["OutsideRecords","ConditionsAndMedications","ProblemsAndDocuments","Everything","ScrollbarsOnOverflowZap"];export{d as ConditionsAndMedications,l as Everything,c as OutsideRecords,p as ProblemsAndDocuments,u as ScrollbarsOnOverflowZap,be as __namedExportsOrder,Ce as default};

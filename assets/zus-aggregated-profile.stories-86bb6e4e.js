import{R as o}from"./index-6f814c40.js";import{s as F,a as r}from"./allergy-intolerance-1dfba71e.js";import{s as L}from"./requests-de488e23.js";import{s as B,o as t,p as i}from"./requests-2768d76c.js";import{s as H}from"./requests-40a6b578.js";import{s as V}from"./requests-f33b2a30.js";import{s as W,o as n,p as a}from"./requests-fa7a7ab1.js";import{s as Y}from"./requests-ec4b4c05.js";import{s as q}from"./requests-49708b6a.js";import{Z as G}from"./zus-aggregated-profile-74a78eaa.js";import{C as J,S as K}from"./patient-helper-9ca0101c.js";import{P as Q}from"./patient-provider-bbc62e03.js";import"./_commonjsHelpers-042e6b4d.js";import"./request-5a1df4c1.js";import"./values-e0b170db.js";import"./_baseForOwn-2ea4fe61.js";import"./_equalByTag-3aa7c076.js";import"./_baseIsEqual-4b283a92.js";import"./_baseToString-ba0098b0.js";import"./sortBy-8d97dd92.js";import"./_baseClone-7982cf45.js";import"./_createSet-3c80ad01.js";import"./toNumber-e7174cd4.js";import"./_basePickBy-fdc7faa6.js";import"./mapValues-a575304c.js";import"./isPlainObject-a68f056e.js";import"./uniq-f1be3f26.js";import"./requests-42767b99.js";import"./mergeWith-9910f455.js";import"./patient-8f4a0ec9.js";import"./faker-8193e1fd.js";import"./zus-da29a567.js";import"./use-patient-history-a4d71017.js";import"./drawer-form-with-fields-5d0a89e3.js";import"./drawer-ed34104d.js";import"./index-74f03c09.js";import"./use-watch-a9671586.js";import"./index-6de6b113.js";import"./spinner-66aa4ba7.js";import"./isEmpty-ee15a061.js";import"./observation-62d2e696.js";import"./sort-5c3c7af1.js";import"./isString-b8ede3fb.js";import"./getPrototypeOf-5db963cb.js";import"./uniqWith-ade993ae.js";import"./null-flavor-fddd23ca.js";import"./combobox-field-a97226ca.js";import"./debounce-d7732be0.js";import"./use-controllable-f15d4b9a.js";import"./calculate-active-index-048f6a58.js";import"./resource-details-drawer-0824ed1a.js";import"./document-icon-581c51b2.js";import"./collapsible-data-list-details-f7571cef.js";import"./loading-c7ff698a.js";import"./medication-history-b83d044d.js";import"./error-boundary-a8316818.js";import"./use-breakpoints-8921c18b.js";import"./isEqual-38ff4822.js";import"./coding-list-1d7c950f.js";import"./patient-observations-d962cb41.js";import"./table-6b14d129.js";import"./filter-bar-d226e2ae.js";import"./use-filtered-sorted-data-0923a9d1.js";import"./index-4d501b15.js";import"./extends-98964cd2.js";import"./other-provider-meds-table-6dc2367f.js";import"./use-medications-648ee919.js";import"./data-list-254aa0b0.js";import"./patient-allergies-14e84b84.js";import"./patient-careteam-ddc79554.js";import"./view-fhir-81c226a4.js";import"./patient-documents-d3ff0a8e.js";import"./patient-immunizations-22306419.js";import"./patient-medications-e52e9520.js";import"./provider-meds-table-8c1f47ef.js";import"./patient-timeline-5326443e.js";import"./_commonjs-dynamic-modules-302442b1.js";function m({allergyIntolerance:e,otherConditions:s,patientConditions:O,providerMedications:T,otherProviderMedications:R}){const g=F({allergyIntolerance:e}),_=L(),v=B({otherConditions:s,patientConditions:O}),D=H(),N=V(),h=W({providerMedications:T,otherProviderMedications:R}),U=Y(),j=q();return{decorators:[...g.decorators,...v.decorators,...h.decorators],parameters:{msw:{handlers:{mocks:[...g.parameters.msw.handlers.mocks,..._.parameters.msw.handlers.mocks,...v.parameters.msw.handlers.mocks,...D.parameters.msw.handlers.mocks,...N.parameters.msw.handlers.mocks,...h.parameters.msw.handlers.mocks,...U.parameters.msw.handlers.mocks,...j.parameters.msw.handlers.mocks]}}}}}const Ce={tags:["autodocs"],component:G,decorators:[(e,{args:s})=>o.createElement(J,{env:"dev",authToken:"ey.12345",builderId:"12345"},o.createElement(Q,{patientID:"007",systemURL:K},o.createElement(e,{args:s})))],args:{resources:void 0,forceHorizontalTabs:void 0,title:void 0,allergiesProps:void 0,conditionsProps:void 0,conditionsOutsideProps:void 0,documentsProps:void 0,immunizationsProps:void 0,medicationsProps:void 0,medicationsOutsideProps:void 0,removeBranding:void 0}},c={...m({allergyIntolerance:r,otherConditions:t,otherProviderMedications:n,patientConditions:i,providerMedications:a}),args:{resources:["conditions-outside","medications-outside"]}},d={...m({allergyIntolerance:r,otherConditions:t,otherProviderMedications:n,patientConditions:i,providerMedications:a}),args:{resources:["conditions","conditions-outside","medications","medications-outside"]}},p={...m({allergyIntolerance:r,otherConditions:t,otherProviderMedications:n,patientConditions:i,providerMedications:a}),args:{resources:["allergies","conditions","immunizations","documents"]}},l={...m({allergyIntolerance:r,otherConditions:t,otherProviderMedications:n,patientConditions:i,providerMedications:a}),args:{resources:["allergies","conditions","conditions-outside","documents","immunizations","medications","medications-outside","care-team","timelines"]}},u={...m({allergyIntolerance:r,otherConditions:t,otherProviderMedications:n,patientConditions:i,providerMedications:a}),args:{resources:["allergies","conditions","conditions-outside","documents","immunizations","observations","observations-outside","medications","medications-outside","care-team","timelines"]},decorators:[(e,{args:s})=>o.createElement("div",{className:"ctw-border-solid ctw-border-divider-light ctw-p-2"},o.createElement("h3",null,"Fixed height container"),o.createElement("code",{className:"language-jsx css-1lwmlsb"},`// CSS
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

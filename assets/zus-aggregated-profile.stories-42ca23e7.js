import{R as u}from"./index-6f814c40.js";import{s as b,a as r}from"./allergy-intolerance-740a87b0.js";import{s as U}from"./requests-1fc1999b.js";import{s as x,o as t,p as n}from"./requests-b65e80cc.js";import{s as L}from"./requests-0a49b15a.js";import{s as B}from"./requests-cec1e028.js";import{s as H,o as a,p as c}from"./requests-30fa6083.js";import{s as N}from"./requests-1d562e4f.js";import{p as V,C as W,a as Y,S as j}from"./patient-allergies-05030318.js";import"./_commonjsHelpers-042e6b4d.js";import"./action-list-147315c2.js";import"./index-74f03c09.js";import"./sortBy-d0c06176.js";import"./_baseForOwn-d5bf979e.js";import"./_equalByTag-3aa7c076.js";import"./_baseIsEqual-4b283a92.js";import"./_baseToString-ba0098b0.js";import"./_baseClone-0bdbe065.js";import"./_createSet-823d7c6f.js";import"./toNumber-711c0fc1.js";import"./isPlainObject-7e0f34c5.js";import"./_basePickBy-f94c0374.js";import"./mapValues-80a5786c.js";import"./uniq-1e65cdac.js";import"./requests-c763d349.js";import"./table-76348145.js";import"./spinner-66aa4ba7.js";import"./request-56e719e0.js";import"./drawer-5742d187.js";import"./index-6de6b113.js";import"./_commonjs-dynamic-modules-302442b1.js";import"./extends-41c9b0e2.js";import"./isEqual-38ff4822.js";import"./data-list-254aa0b0.js";import"./isString-b8ede3fb.js";import"./debounce-0d3e7ec9.js";function d({allergyIntolerance:m,otherConditions:p,patientConditions:E,providerMedications:T,otherProviderMedications:Z}){const l=b({allergyIntolerance:m}),R=U(),g=x({otherConditions:p,patientConditions:E}),_=L(),D=B(),M=H({providerMedications:T,otherProviderMedications:Z}),O=N();return{decorators:[...l.decorators,...g.decorators,...M.decorators],parameters:{msw:[...l.parameters.msw,...R.parameters.msw,...g.parameters.msw,..._.parameters.msw,...D.parameters.msw,...M.parameters.msw,...O.parameters.msw]}}}const To={tags:["autodocs"],component:V,decorators:[(m,{args:p})=>u.createElement(W,{env:"dev",authToken:"ey.12345",builderId:"12345"},u.createElement(Y,{patientID:"007",systemURL:j},u.createElement(m,{args:p})))],args:{resources:void 0,forceHorizontalTabs:void 0,title:void 0,allergiesProps:void 0,conditionsProps:void 0,conditionsOutsideProps:void 0,documentsProps:void 0,immunizationsProps:void 0,medicationsProps:void 0,medicationsOutsideProps:void 0,removeBranding:void 0}},o={...d({allergyIntolerance:r,otherConditions:t,otherProviderMedications:a,patientConditions:n,providerMedications:c}),args:{resources:["conditions-outside","medications-outside"]}},e={...d({allergyIntolerance:r,otherConditions:t,otherProviderMedications:a,patientConditions:n,providerMedications:c}),args:{resources:["conditions","conditions-outside","medications","medications-outside"]}},s={...d({allergyIntolerance:r,otherConditions:t,otherProviderMedications:a,patientConditions:n,providerMedications:c}),args:{resources:["allergies","conditions","immunizations","documents"]}},i={...d({allergyIntolerance:r,otherConditions:t,otherProviderMedications:a,patientConditions:n,providerMedications:c}),args:{resources:["allergies","conditions","conditions-outside","documents","immunizations","medications","medications-outside","care-team","timelines"]}};var v,P,k;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(k=(P=o.parameters)==null?void 0:P.docs)==null?void 0:k.source}}};var f,C,h;e.parameters={...e.parameters,docs:{...(f=e.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(h=(C=e.parameters)==null?void 0:C.docs)==null?void 0:h.source}}};var A,y,I;s.parameters={...s.parameters,docs:{...(A=s.parameters)==null?void 0:A.docs,source:{originalSource:`{
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
}`,...(I=(y=s.parameters)==null?void 0:y.docs)==null?void 0:I.source}}};var z,S,w;i.parameters={...i.parameters,docs:{...(z=i.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
}`,...(w=(S=i.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};const Zo=["OutsideRecords","ConditionsAndMedications","ProblemsAndDocuments","Everything"];export{e as ConditionsAndMedications,i as Everything,o as OutsideRecords,s as ProblemsAndDocuments,Zo as __namedExportsOrder,To as default};

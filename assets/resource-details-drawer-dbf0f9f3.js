import{R as t,r as s}from"./index-6f814c40.js";import{u as b,D as q,g as E}from"./modal-ccda-7fef5eea.js";import{D as I}from"./collapsible-data-list-details-4a1431c5.js";import{D as p}from"./drawer-ef795dd3.js";import{L as V}from"./loading-c7ff698a.js";import{F as M,v as R,c as v,u as S}from"./patient-helper-0f09a661.js";import{a as x,s as N}from"./patient-provider-36691a31.js";class T extends M{get status(){return this.resource.status}get binaryID(){const e=this.resource.content[0].attachment.url;if(e)return e.split("/").pop()}get docStatus(){return this.resource.docStatus}get resourceTypeTitle(){return"Document"}get title(){return this.resource.content[0].attachment.title}get dateCreated(){return R(this.resource.content[0].attachment.creation)}get custodian(){var e;return(e=this.resource.custodian)==null?void 0:e.display}get sectionDisplays(){var e;return((e=this.resource.category)==null?void 0:e.map(r=>v(r)))||void 0}}function f(a){const{openDrawer:e}=x();return r=>{e({component:n=>t.createElement(o,{model:r,...a,...n})})}}function o({className:a,model:e,details:r,header:n,subHeader:i,getSourceDocument:u,isOpen:D,onClose:y}){const g=b(),[h,l]=s.useState(!1),[c,d]=s.useState(),{getRequestContext:m}=S();return s.useEffect(()=>{async function _(){l(!0);const w=await m(),C=await N(w,[e]);d(E(C,e.id)),l(!1)}e instanceof T?d(e.binaryID):u&&_()},[u,e,m]),t.createElement(p,{className:a,title:`${e.resourceTypeTitle} Details`,isOpen:D,onClose:y,showCloseFooter:!0},t.createElement(p.Body,null,t.createElement("div",{className:"ctw-py-2"},t.createElement("div",{className:"ctw-text-2xl"},n(e)),i&&t.createElement("div",{className:"ctw-text-sm"},i(e))),h?t.createElement(V,{message:"Loading data..."}):t.createElement(I,{data:r(e),documentButton:c&&t.createElement(q,{onClick:()=>g(c,e.resourceTypeTitle),text:"Source Document"})})))}try{f.displayName="useResourceDetailsDrawer",f.__docgenInfo={description:"",displayName:"useResourceDetailsDrawer",props:{header:{defaultValue:null,description:"",name:"header",required:!0,type:{name:"(model: M) => string | undefined"}},subHeader:{defaultValue:null,description:"",name:"subHeader",required:!1,type:{name:"((model: M) => string)"}},getSourceDocument:{defaultValue:null,description:"",name:"getSourceDocument",required:!1,type:{name:"boolean"}},details:{defaultValue:null,description:"",name:"details",required:!0,type:{name:"(model: M) => CollapsibleDataListEntry[]"}}}}}catch{}try{o.displayName="ResourceDetailsDrawer",o.__docgenInfo={description:"",displayName:"ResourceDetailsDrawer",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},model:{defaultValue:null,description:"",name:"model",required:!0,type:{name:"FHIRModel<T>"}},header:{defaultValue:null,description:"",name:"header",required:!0,type:{name:"(model: M) => string | undefined"}},subHeader:{defaultValue:null,description:"",name:"subHeader",required:!1,type:{name:"((model: M) => string)"}},getSourceDocument:{defaultValue:null,description:"",name:"getSourceDocument",required:!1,type:{name:"boolean"}},details:{defaultValue:null,description:"",name:"details",required:!0,type:{name:"(model: M) => CollapsibleDataListEntry[]"}},isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}}}}}catch{}export{T as D,f as u};

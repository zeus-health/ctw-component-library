import{R as t,r as p}from"./index-6f814c40.js";import{D as _,e as S}from"./data-list-254aa0b0.js";import{D as y}from"./drawer-ed34104d.js";import{a as q,M as R,s as V,g as F,b as x}from"./medication-history-c36c5fa9.js";import{L as A}from"./loading-c7ff698a.js";import{i as C}from"./values-c30f357d.js";import{b as I,u as h}from"./patient-provider-d2b81159.js";import{T as L}from"./table-0bb423c6.js";import{u as T}from"./use-breakpoints-04232dc9.js";import{a8 as k,ar as B,w as D,a4 as O,a3 as Q}from"./patient-helper-2c738c95.js";import{M as w}from"./sort-b8885781.js";function z(e,r){return e?[{label:"Status",value:e.displayStatus},{label:"Last Fill Date",value:e.lastFillDate},{label:"Quantity",value:e.quantity},{label:"Days Supply",value:e.daysSupply},{label:"Refills",value:e.refills},{label:"Instructions",value:e.dosage},{label:"Prescriber",value:r},{label:"Last Prescribed Date",value:e.lastPrescribedDate},...S("Note",e.notesDisplay)]:[]}const b=({medication:e,onDismissal:r,...l})=>{const{lastPrescriber:c,isLoading:s}=q(e==null?void 0:e.resource),n=z(e,c);return t.createElement(y,{title:"Medication Details",...l},t.createElement(y.Body,null,t.createElement("div",{className:"ctw-space-y-5"},t.createElement("div",{className:"ctw-flex ctw-justify-between ctw-space-x-8"},t.createElement("h3",{className:"ctw-m-0 ctw-text-3xl ctw-font-light"},e==null?void 0:e.display)),s&&t.createElement(A,null),!s&&t.createElement(_,{title:"Summary",data:n}),e&&t.createElement(R,{medication:e}))),t.createElement(y.Footer,null,t.createElement("div",{className:"ctw-flex ctw-justify-end ctw-space-x-2"},C(r)&&!(e!=null&&e.isArchived)&&t.createElement("button",{type:"button",className:"ctw-btn-primary",onClick:()=>{r(e),l.onClose()},"data-zus-telemetry-click":"Dismiss"},"Dismiss"),t.createElement("button",{type:"button",className:"ctw-btn-default",onClick:l.onClose,"data-zus-telemetry-click":"Close"},"Close"))))};try{b.displayName="MedicationDrawer",b.__docgenInfo={description:"",displayName:"MedicationDrawer",props:{medication:{defaultValue:null,description:"",name:"medication",required:!1,type:{name:"MedicationStatementModel"}},onDismissal:{defaultValue:null,description:"",name:"onDismissal",required:!1,type:{name:"((m: MedicationStatementModel) => void)"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}},isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},onOpen:{defaultValue:null,description:"",name:"onOpen",required:!1,type:{name:"(() => void)"}},onAfterOpen:{defaultValue:null,description:"",name:"onAfterOpen",required:!1,type:{name:"(() => void)"}}}}}catch{}function ae(){const{openDrawer:e}=I();return({medication:r})=>{e({component:l=>t.createElement(b,{medication:r,...l})})}}const v=({children:e,className:r="",emptyMessage:l="No medications on record.",hideMenu:c=!1,medicationStatements:s,telemetryNamespace:n,...f})=>{const u=p.useRef(null),i=T(u),d=[{title:"Medication Name",render:a=>t.createElement(t.Fragment,null,t.createElement("div",{className:"ctw-font-medium group-hover:ctw-underline"},a.display),t.createElement("div",{className:"ctw-font-light"},a.dosage)),widthPercent:35,minWidth:270}],m=[...d,{title:"Dispensed",render:a=>t.createElement(t.Fragment,null,a.quantity&&t.createElement("div",null,a.quantity),a.refills&&t.createElement("div",null,a.refills," refills")),widthPercent:14},{title:"Status",render:a=>t.createElement("div",{className:"ctw-capitalize"},t.createElement("div",{className:"ctw-text-content-black"},a.status),a.isArchived&&t.createElement("div",{className:"ctw-font-light"},"Dismissed")),sortIndices:[{index:"status"},{index:"dateAsserted",dir:"desc"}],widthPercent:14},{title:"Last Filled",dataIndex:"lastFillDate",sortIndices:[{index:"lastFillDate",isDate:!0}],widthPercent:18},{title:"Last Prescribed",render:a=>t.createElement(t.Fragment,null,a.lastPrescribedDate&&t.createElement("div",null,a.lastPrescribedDate),a.lastPrescriber&&t.createElement("div",null,a.lastPrescriber)),sortIndices:[{index:"lastPrescribedDate",isDate:!0},{index:"lastPrescriber",dir:"asc"}],widthPercent:18,minWidth:"90px"}];return t.createElement("div",{className:r,ref:u,"data-zus-telemetry-namespace":n},t.createElement("div",{className:"ctw-overflow-hidden"},t.createElement(L,{showTableHead:!i.sm,stacked:i.sm,records:s,columns:i.sm?d:m,emptyMessage:l,...f})),e)};try{v.displayName="MedicationsTableBase",v.__docgenInfo={description:"",displayName:"MedicationsTableBase",props:{className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string | (string & Mapping) | (string & ArgumentArray)"}},emptyMessage:{defaultValue:{value:"No medications on record."},description:"Displayed when we have 0 records.",name:"emptyMessage",required:!1,type:{name:"string | (string & ReactElement<any, string | JSXElementConstructor<any>>)"}},hideMenu:{defaultValue:{value:"false"},description:"",name:"hideMenu",required:!1,type:{name:"boolean"}},medicationStatements:{defaultValue:null,description:"",name:"medicationStatements",required:!0,type:{name:"MedicationStatementModel[]"}},telemetryNamespace:{defaultValue:null,description:"",name:"telemetryNamespace",required:!1,type:{name:"string"}},handleRowClick:{defaultValue:null,description:"",name:"handleRowClick",required:!1,type:{name:"((record: MedicationStatementModel) => void)"}},RowActions:{defaultValue:null,description:"",name:"RowActions",required:!1,type:{name:"ComponentType<{ record: MedicationStatementModel; }>"}},getRowClassName:{defaultValue:null,description:"",name:"getRowClassName",required:!1,type:{name:"((record: MedicationStatementModel) => Argument)"}},isLoading:{defaultValue:null,description:"",name:"isLoading",required:!1,type:{name:"boolean"}},showTableHead:{defaultValue:null,description:"",name:"showTableHead",required:!1,type:{name:"boolean"}},stacked:{defaultValue:null,description:"",name:"stacked",required:!1,type:{name:"boolean"}},hidePagination:{defaultValue:null,description:"",name:"hidePagination",required:!1,type:{name:"boolean"}}}}}catch{}function H(){return h(O,[{informationSourceNot:"Patient"}],D(F,"req.builder_medications"))}function Y(){return h(Q,[{_revinclude:"Basic:subject"}],D(x,"req.active_medications"))}function se(){const[e,r]=p.useState(),[l,c]=p.useState(),s=Y(),n=H();p.useEffect(()=>{var d,m;if((d=s.data)!=null&&d.bundle&&((m=n.data)!=null&&m.bundle)){const{medications:a,bundle:N}=s.data,{medications:P}=n.data,M=k(N),g=B([s.data.bundle,n.data.bundle]),E=V(a.map(o=>new w(o,g,M.get(o.id??""))),P.map(o=>new w(o,g,M.get(o.id??""))));r(E.builderMedications),c(E.otherProviderMedications)}},[s.data,n.data]);const f=n.isLoading||s.isLoading,u=n.isFetching||s.isFetching,i=n.isError||s.isError;return{isFetching:u,isLoading:f,isError:i,builderMedications:e,otherProviderMedications:l}}export{v as M,se as a,ae as u};

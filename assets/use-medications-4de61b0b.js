import{R as t,r as p}from"./index-6f814c40.js";import{D as P,e as _}from"./data-list-254aa0b0.js";import{D as y}from"./drawer-ef795dd3.js";import{a as S,M as R,b as q,g as V,c as A}from"./requests-1e8d4ddf.js";import{L as x}from"./loading-c7ff698a.js";import{i as L}from"./values-28adb33b.js";import{a as F,u as h}from"./patient-provider-36691a31.js";import{T as B}from"./table-d8430721.js";import{u as C}from"./use-breakpoints-048d0685.js";import{a2 as I,ap as T,at as k,ao as O}from"./patient-helper-0f09a661.js";import{M as w}from"./sort-618282df.js";function Q(e,r){return e?[{label:"Status",value:e.displayStatus},{label:"Last Fill Date",value:e.lastFillDate},{label:"Quantity",value:e.quantity},{label:"Days Supply",value:e.daysSupply},{label:"Refills",value:e.refills},{label:"Instructions",value:e.dosage},{label:"Prescriber",value:r},{label:"Last Prescribed Date",value:e.lastPrescribedDate},..._("Note",e.notesDisplay)]:[]}const b=({medication:e,onDismissal:r,...l})=>{const{lastPrescriber:c,isLoading:s}=S(e==null?void 0:e.resource),n=Q(e,c);return t.createElement(y,{title:"Medication Details",...l},t.createElement(y.Body,null,t.createElement("div",{className:"ctw-space-y-5"},t.createElement("div",{className:"ctw-flex ctw-justify-between ctw-space-x-8"},t.createElement("h3",{className:"ctw-m-0 ctw-text-3xl ctw-font-light"},e==null?void 0:e.display)),s&&t.createElement(x,null),!s&&t.createElement(P,{title:"Summary",data:n}),e&&t.createElement(R,{medication:e}))),t.createElement(y.Footer,null,t.createElement("div",{className:"ctw-flex ctw-justify-end ctw-space-x-2"},L(r)&&!(e!=null&&e.isArchived)&&t.createElement("button",{type:"button",className:"ctw-btn-primary",onClick:()=>{r(e),l.onClose()},"data-zus-telemetry-click":"Dismiss"},"Dismiss"),t.createElement("button",{type:"button",className:"ctw-btn-default",onClick:l.onClose,"data-zus-telemetry-click":"Close"},"Close"))))};try{b.displayName="MedicationDrawer",b.__docgenInfo={description:"",displayName:"MedicationDrawer",props:{medication:{defaultValue:null,description:"",name:"medication",required:!1,type:{name:"MedicationStatementModel"}},onDismissal:{defaultValue:null,description:"",name:"onDismissal",required:!1,type:{name:"((m: MedicationStatementModel) => void)"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}},isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},onOpen:{defaultValue:null,description:"",name:"onOpen",required:!1,type:{name:"(() => void)"}},onAfterOpen:{defaultValue:null,description:"",name:"onAfterOpen",required:!1,type:{name:"(() => void)"}}}}}catch{}function te(){const{openDrawer:e}=F();return({medication:r})=>{e({component:l=>t.createElement(b,{medication:r,...l})})}}const v=({children:e,className:r="",emptyMessage:l="No medications on record.",hideMenu:c=!1,medicationStatements:s,telemetryNamespace:n,...f})=>{const u=p.useRef(null),i=C(u),d=[{title:"Medication Name",render:a=>t.createElement(t.Fragment,null,t.createElement("div",{className:"ctw-font-medium"},a.display),t.createElement("div",{className:"ctw-font-light"},a.dosage)),widthPercent:35,minWidth:270}],m=[...d,{title:"Dispensed",render:a=>t.createElement(t.Fragment,null,a.quantity&&t.createElement("div",null,a.quantity),a.refills&&t.createElement("div",null,a.refills," refills")),widthPercent:14},{title:"Status",render:a=>t.createElement("div",{className:"ctw-capitalize"},t.createElement("div",{className:"ctw-text-content-black"},a.status),a.isArchived&&t.createElement("div",{className:"ctw-font-light"},"Dismissed")),sortIndices:[{index:"status"},{index:"dateAsserted",dir:"desc"}],widthPercent:14},{title:"Last Filled",dataIndex:"lastFillDate",sortIndices:[{index:"lastFillDate",isDate:!0}],widthPercent:18},{title:"Last Prescribed",render:a=>t.createElement(t.Fragment,null,a.lastPrescribedDate&&t.createElement("div",null,a.lastPrescribedDate),a.lastPrescriber&&t.createElement("div",null,a.lastPrescriber)),sortIndices:[{index:"lastPrescribedDate",isDate:!0},{index:"lastPrescriber",dir:"asc"}],widthPercent:18,minWidth:"90px"}];return t.createElement("div",{className:r,ref:u,"data-zus-telemetry-namespace":n},t.createElement("div",{className:"ctw-overflow-hidden"},t.createElement(B,{showTableHead:!i.sm,removeLeftAndRightBorders:!0,className:"-ctw-mx-px !ctw-rounded-none",stacked:i.sm,records:s,columns:i.sm?d:m,emptyMessage:l,...f})),e)};try{v.displayName="MedicationsTableBase",v.__docgenInfo={description:"",displayName:"MedicationsTableBase",props:{className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string | (string & Mapping) | (string & ArgumentArray)"}},emptyMessage:{defaultValue:{value:"No medications on record."},description:"Displayed when we have 0 records.",name:"emptyMessage",required:!1,type:{name:"string | (string & ReactElement<any, string | JSXElementConstructor<any>>)"}},hideMenu:{defaultValue:{value:"false"},description:"",name:"hideMenu",required:!1,type:{name:"boolean"}},medicationStatements:{defaultValue:null,description:"",name:"medicationStatements",required:!0,type:{name:"MedicationStatementModel[]"}},telemetryNamespace:{defaultValue:null,description:"",name:"telemetryNamespace",required:!1,type:{name:"string"}},handleRowClick:{defaultValue:null,description:"",name:"handleRowClick",required:!1,type:{name:"((record: MedicationStatementModel) => void)"}},RowActions:{defaultValue:null,description:"",name:"RowActions",required:!1,type:{name:"ComponentType<{ record: MedicationStatementModel; }>"}},getRowClassName:{defaultValue:null,description:"",name:"getRowClassName",required:!1,type:{name:"((record: MedicationStatementModel) => Argument)"}},isLoading:{defaultValue:null,description:"",name:"isLoading",required:!1,type:{name:"boolean"}},showTableHead:{defaultValue:null,description:"",name:"showTableHead",required:!1,type:{name:"boolean"}},removeLeftAndRightBorders:{defaultValue:null,description:"",name:"removeLeftAndRightBorders",required:!1,type:{name:"boolean"}},stacked:{defaultValue:null,description:"",name:"stacked",required:!1,type:{name:"boolean"}},hidePagination:{defaultValue:null,description:"",name:"hidePagination",required:!1,type:{name:"boolean"}}}}}catch{}function z(){return h(k,[{informationSourceNot:"Patient"}],V)}function H(){return h(O,[{_revinclude:"Basic:subject"}],A)}function ae(){const[e,r]=p.useState(),[l,c]=p.useState(),s=H(),n=z();p.useEffect(()=>{var d,m;if((d=s.data)!=null&&d.bundle&&((m=n.data)!=null&&m.bundle)){const{medications:a,bundle:D}=s.data,{medications:N}=n.data,M=I(D),g=T([s.data.bundle,n.data.bundle]),E=q(a.map(o=>new w(o,g,M.get(o.id??""))),N.map(o=>new w(o,g,M.get(o.id??""))));r(E.builderMedications),c(E.otherProviderMedications)}},[s.data,n.data]);const f=n.isLoading||s.isLoading,u=n.isFetching||s.isFetching,i=n.isError||s.isError;return{isFetching:u,isLoading:f,isError:i,builderMedications:e,otherProviderMedications:l}}export{v as M,ae as a,te as u};

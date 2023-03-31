import{R as e,r as i}from"./index-6f814c40.js";import{c as m}from"./index-74f03c09.js";import{S as H}from"./spinner-66aa4ba7.js";import"./_baseToString-2a4c2757.js";import"./sortBy-1cabbe82.js";import"./_baseClone-184e5c2b.js";import"./sortBy-649a17b3.js";import{i as V}from"./_equalByTag-5ee6784b.js";import"./_baseForOwn-54d22bab.js";import"./_createSet-014fa0cf.js";const g=10,h=({total:t,count:a,changeCount:l})=>{const r=a>=t||t===0,c=t>g;return e.createElement("div",{className:"ctw-pagination !ctw-mt-1 sm:!ctw-mt-2"},e.createElement("div",{className:"ctw-text-gray-600 ctw-text-sm"},"Showing"," ",e.createElement("span",{className:"ctw-font-medium"},Math.min(a,t))," of"," ",e.createElement("span",{className:"ctw-font-medium"},t)," records"),(!r||c)&&e.createElement("div",{className:"ctw-leading-5"},!r&&e.createElement("button",{type:"button",className:"ctw-btn-clear ctw-link ctw-whitespace-nowrap",onClick:()=>l(t)},"Show All"),r&&c&&e.createElement("button",{type:"button",className:"ctw-btn-clear ctw-link ctw-whitespace-nowrap",onClick:()=>l(g)},"Clear")))};try{h.displayName="PaginationList",h.__docgenInfo={description:"",displayName:"PaginationList",props:{total:{defaultValue:null,description:"",name:"total",required:!0,type:{name:"number"}},count:{defaultValue:null,description:"",name:"count",required:!0,type:{name:"number"}},changeCount:{defaultValue:null,description:"",name:"changeCount",required:!0,type:{name:"(amount: number) => void"}}}}}catch{}const b=({columns:t})=>e.createElement("colgroup",null,t.map((a,l)=>e.createElement("col",{key:a.title??l,className:a.className,width:a.widthPercent?`${a.widthPercent}%`:"0*",style:{minWidth:a.minWidth}})));try{b.displayName="TableColGroup",b.__docgenInfo={description:"",displayName:"TableColGroup",props:{columns:{defaultValue:null,description:"",name:"columns",required:!0,type:{name:"TableColumn<T>[]"}}}}}catch{}const _=({columns:t})=>e.createElement("thead",{"data-zus-telemetry-namespace":"TableHead"},e.createElement("tr",null,t.map((a,l)=>e.createElement("th",{className:"ctw-group",key:a.title??l,scope:"col"},e.createElement("div",{className:"ctw-flex ctw-items-center ctw-space-x-2"},e.createElement("div",null,a.title))))));try{_.displayName="TableHead",_.__docgenInfo={description:"",displayName:"TableHead",props:{columns:{defaultValue:null,description:"",name:"columns",required:!0,type:{name:"TableColumn<T>[]"}}}}}catch{}const E=({column:t,record:a})=>{const l=t.dataIndex?a[t.dataIndex]:void 0;return e.createElement("td",{className:m("ctw-text-content-black first:ctw-font-medium",t.className,"ctw-hyphens-auto ctw-break-words")},t.render?t.render(a):l)};try{E.displayName="TableDataCell",E.__docgenInfo={description:"",displayName:"TableDataCell",props:{column:{defaultValue:null,description:"",name:"column",required:!0,type:{name:"TableColumn<T>"}},record:{defaultValue:null,description:"",name:"record",required:!0,type:{name:"MinRecordItem"}}}}}catch{}const y=({children:t,colSpan:a})=>e.createElement("tr",null,e.createElement("td",{className:"ctw-table-full-length-row",colSpan:a},t));try{y.displayName="TableFullLengthRow",y.__docgenInfo={description:"",displayName:"TableFullLengthRow",props:{colSpan:{defaultValue:null,description:"",name:"colSpan",required:!0,type:{name:"number"}}}}}catch{}const T=({records:t,columns:a,isLoading:l,emptyMessage:r,handleRowClick:c,RowActions:u,getRowClassName:p})=>l?e.createElement(y,{colSpan:a.length},e.createElement("div",{className:"ctw-flex ctw-justify-center ctw-space-x-2"},e.createElement("span",null,"Loading..."),e.createElement(H,null))):t.length===0?e.createElement(y,{colSpan:a.length},e.createElement("span",{className:"ctw-empty-message -ctw-mt-3.5 sm:ctw-mt-0"},r)):e.createElement(e.Fragment,null,t.map(o=>e.createElement("tr",{"data-zus-telemetry-click":c?"Table row":null,className:m("ctw-group ctw-relative ctw-mx-px",V(p)?p(o):"",{"ctw-cursor-pointer hover:ctw-bg-bg-lighter":V(c)}),key:o.key,onClick:({target:s})=>{s instanceof HTMLElement&&s.querySelectorAll("button").length||c&&c(o)}},a.map((s,f)=>e.createElement(E,{key:`${o.key}_${s.title??f}`,column:s,record:o})),u&&e.createElement("td",{className:"ctw-table-row-actions group-hover:ctw-visible",onClick:s=>s.stopPropagation()},e.createElement(u,{record:o})))));try{T.displayName="TableRows",T.__docgenInfo={description:"",displayName:"TableRows",props:{RowActions:{defaultValue:null,description:"",name:"RowActions",required:!1,type:{name:"ComponentType<{ record: T; }>"}},columns:{defaultValue:null,description:"",name:"columns",required:!0,type:{name:"TableColumn<T>[]"}},emptyMessage:{defaultValue:null,description:"",name:"emptyMessage",required:!0,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}},getRowClassName:{defaultValue:null,description:"",name:"getRowClassName",required:!1,type:{name:"((record: T) => Argument)"}},handleRowClick:{defaultValue:null,description:"",name:"handleRowClick",required:!1,type:{name:"((record: T) => void)"}},isLoading:{defaultValue:null,description:"",name:"isLoading",required:!0,type:{name:"boolean"}},records:{defaultValue:null,description:"",name:"records",required:!0,type:{name:"T[]"}}}}}catch{}const S=({className:t,columns:a,records:l,isLoading:r=!1,emptyMessage:c="No records found",showTableHead:u=!0,stacked:p,handleRowClick:o,RowActions:s,getRowClassName:f,hidePagination:R=!1,pageSize:k=g,children:L})=>{const N=i.useRef(null),w=i.useRef(null),[x,I]=i.useState(!1),[A,P]=i.useState(!1),[v,M]=i.useState(k),d=()=>{const n=w.current,C=N.current;if(n&&C){I(n.scrollLeft>0);const z=n.scrollLeft+n.clientWidth;P(z<C.clientWidth)}};i.useEffect(()=>{const n=w.current;return d(),n==null||n.addEventListener("scroll",d),window.addEventListener("resize",d),()=>{n==null||n.removeEventListener("scroll",d),window.removeEventListener("resize",d)}},[w,r]);const q=!r&&l.length>0;return e.createElement("div",{"data-zus-telemetry-namespace":"Table",className:m("ctw-scrollable-pass-through-height ctw-space-y-4",{"ctw-table-stacked":p})},e.createElement("div",{className:m("ctw-table-container ctw-scrollable-pass-through-height",t,{"ctw-table-scroll-left-shadow":x,"ctw-table-scroll-right-shadow":A})},e.createElement("div",{className:m("ctw-scrollbar ctw-scrollable-content"),ref:w},e.createElement("table",{ref:N},q&&e.createElement(b,{columns:a}),u&&q&&e.createElement(_,{columns:a}),e.createElement("tbody",{className:m({"ctw-h-[7rem]":l.length===0})},e.createElement(T,{getRowClassName:f,records:l.slice(0,v),handleRowClick:o,RowActions:s,columns:a,isLoading:r,emptyMessage:c}))))),!R&&!r&&e.createElement(h,{total:l.length,count:v,changeCount:M}),L)};try{S.displayName="Table",S.__docgenInfo={description:"",displayName:"Table",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"Argument"}},columns:{defaultValue:null,description:"",name:"columns",required:!0,type:{name:"TableColumn<T>[]"}},emptyMessage:{defaultValue:null,description:"Displayed when we have 0 records.",name:"emptyMessage",required:!1,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}},hidePagination:{defaultValue:{value:"false"},description:"",name:"hidePagination",required:!1,type:{name:"boolean"}},isLoading:{defaultValue:{value:"false"},description:"",name:"isLoading",required:!1,type:{name:"boolean"}},pageSize:{defaultValue:{value:"10"},description:"",name:"pageSize",required:!1,type:{name:"number"}},records:{defaultValue:null,description:"",name:"records",required:!0,type:{name:"T[]"}},showTableHead:{defaultValue:{value:"true"},description:"",name:"showTableHead",required:!1,type:{name:"boolean"}},stacked:{defaultValue:null,description:"",name:"stacked",required:!1,type:{name:"boolean"}},handleRowClick:{defaultValue:null,description:"",name:"handleRowClick",required:!1,type:{name:"((record: T) => void)"}},RowActions:{defaultValue:null,description:"",name:"RowActions",required:!1,type:{name:"ComponentType<{ record: T; }>"}},getRowClassName:{defaultValue:null,description:"",name:"getRowClassName",required:!1,type:{name:"((record: T) => Argument)"}}}}}catch{}export{S as T};

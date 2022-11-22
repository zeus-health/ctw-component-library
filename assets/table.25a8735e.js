import{r as s,d as t}from"./index.60c188ab.js";import{c as u}from"./index.d3b8680b.js";import{a as F}from"./sort.211975a5.js";import{S as K}from"./spinner.9cfb7483.js";function Y(e,a){return s.exports.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2,stroke:"currentColor","aria-hidden":"true",ref:a},e),s.exports.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 9l-7 7-7-7"}))}const D=s.exports.forwardRef(Y),O=D;function P(e,a){return s.exports.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2,stroke:"currentColor","aria-hidden":"true",ref:a},e),s.exports.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 15l7-7 7 7"}))}const H=s.exports.forwardRef(P),M=H,w=10,h=({total:e,count:a,changeCount:l})=>{const n=a>=e||e===0,r=e>w;return t.createElement("div",{className:"ctw-pagination ctw-flex ctw-items-center ctw-justify-between ctw-px-6"},t.createElement("div",{className:"ctw-text-gray-600 ctw-text-sm"},"Showing"," ",t.createElement("span",{className:"ctw-font-medium"},Math.min(a,e))," of"," ",t.createElement("span",{className:"ctw-font-medium"},e)," results"),(!n||r)&&t.createElement("div",{className:"ctw-flex ctw-h-full ctw-justify-end ctw-space-x-3"},!n&&e>w*2&&t.createElement("button",{type:"button",className:"ctw-btn-default",onClick:()=>l(a+w)},"Show More"),!n&&t.createElement("button",{type:"button",className:"ctw-btn-primary ctw-w-28 ctw-whitespace-nowrap",onClick:()=>l(e)},"Show All"),n&&r&&t.createElement("button",{type:"button",className:"ctw-btn-primary ctw-w-28 ctw-whitespace-nowrap",onClick:()=>l(w)},"Reset")))};try{h.displayName="Pagination",h.__docgenInfo={description:"",displayName:"Pagination",props:{total:{defaultValue:null,description:"",name:"total",required:!0,type:{name:"number"}},count:{defaultValue:null,description:"",name:"count",required:!0,type:{name:"number"}},changeCount:{defaultValue:null,description:"",name:"changeCount",required:!0,type:{name:"(amount: number) => void"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/components/core/pagination/pagination.tsx#Pagination"]={docgenInfo:h.__docgenInfo,name:"Pagination",path:"src/components/core/pagination/pagination.tsx#Pagination"})}catch{}const y=({columns:e})=>t.createElement("colgroup",null,e.map((a,l)=>{var n;return t.createElement("col",{key:(n=a.title)!=null?n:l,className:a.className,style:{minWidth:a.minWidth,width:`${a.widthPercent}%`}})}));try{y.displayName="TableColGroup",y.__docgenInfo={description:"",displayName:"TableColGroup",props:{columns:{defaultValue:null,description:"",name:"columns",required:!0,type:{name:"TableColumn<T>[]"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/components/core/table/table-colgroup.tsx#TableColGroup"]={docgenInfo:y.__docgenInfo,name:"TableColGroup",path:"src/components/core/table/table-colgroup.tsx#TableColGroup"})}catch{}const j=({sortOrder:e})=>{const a="ctw-text-gray-900 ctw-h-4",l=u(a,"ctw-opacity-100");switch(e){case"desc":return t.createElement(M,{className:l});case"asc":return t.createElement(O,{className:l});default:return t.createElement(O,{className:u(a,"ctw-opacity-0 group-hover:ctw-opacity-100")})}},g=({columns:e,sort:a,onSort:l})=>t.createElement("thead",null,t.createElement("tr",null,e.map((n,r)=>{var c;return t.createElement("th",{className:u("ctw-group",(n.sortFnOverride||n.sortIndex)&&"ctw-cursor-pointer"),key:(c=n.title)!=null?c:r,scope:"col",onClick:()=>(n.sortFnOverride||n.sortIndex)&&l&&l(n.title||"")},t.createElement("div",{className:"ctw-flex ctw-items-center ctw-space-x-2"},t.createElement("div",null,n.title),t.createElement(j,{sortOrder:(a==null?void 0:a.columnTitle)===n.title?a==null?void 0:a.dir:void 0})))})));try{g.displayName="TableHead",g.__docgenInfo={description:"",displayName:"TableHead",props:{columns:{defaultValue:null,description:"",name:"columns",required:!0,type:{name:"TableColumn<T>[]"}},sort:{defaultValue:null,description:"",name:"sort",required:!1,type:{name:"TableSort"}},onSort:{defaultValue:null,description:"",name:"onSort",required:!1,type:{name:"((sortColumn: string) => void)"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/components/core/table/table-head.tsx#TableHead"]={docgenInfo:g.__docgenInfo,name:"TableHead",path:"src/components/core/table/table-head.tsx#TableHead"})}catch{}function G(e,a,l){const n=a.find(r=>r.title===(l==null?void 0:l.columnTitle));if(l&&n){const r=n.sortFnOverride||n.sortIndex&&((c,d,i)=>F(c[n.sortIndex],d[n.sortIndex],i));if(r)return e.sort((c,d)=>r(c,d,l.dir))}return e}const S=({column:e,record:a,index:l})=>{var r;const n=e.dataIndex?a[e.dataIndex]:void 0;return t.createElement("td",{key:(r=e.title)!=null?r:l,className:u({"ctw-font-medium ctw-text-content-black":l===0},e.className,"ctw-hyphens-auto ctw-break-words")},e.render?e.render(a):n)};try{S.displayName="TableDataCell",S.__docgenInfo={description:"",displayName:"TableDataCell",props:{column:{defaultValue:null,description:"",name:"column",required:!0,type:{name:"TableColumn<T>"}},record:{defaultValue:null,description:"",name:"record",required:!0,type:{name:"MinRecordItem"}},index:{defaultValue:null,description:"",name:"index",required:!0,type:{name:"number"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/components/core/table/table-data-cell.tsx#TableDataCell"]={docgenInfo:S.__docgenInfo,name:"TableDataCell",path:"src/components/core/table/table-data-cell.tsx#TableDataCell"})}catch{}const b=({children:e,colSpan:a})=>t.createElement("tr",null,t.createElement("td",{className:"ctw-table-full-length-row",colSpan:a},e));try{b.displayName="TableFullLengthRow",b.__docgenInfo={description:"",displayName:"TableFullLengthRow",props:{colSpan:{defaultValue:null,description:"",name:"colSpan",required:!0,type:{name:"number"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/components/core/table/table-full-length-row.tsx#TableFullLengthRow"]={docgenInfo:b.__docgenInfo,name:"TableFullLengthRow",path:"src/components/core/table/table-full-length-row.tsx#TableFullLengthRow"})}catch{}const T=({records:e,columns:a,isLoading:l,emptyMessage:n,handleRowClick:r})=>l?t.createElement(b,{colSpan:a.length},t.createElement("div",{className:"ctw-flex ctw-justify-center ctw-space-x-2"},t.createElement("span",null,"Loading..."),t.createElement(K,null))):e.length===0?t.createElement(b,{colSpan:a.length},n):t.createElement(t.Fragment,null,e.map(c=>t.createElement("tr",{className:u({"ctw-cursor-pointer":typeof r=="function"}),key:c.id,onClick:()=>{r&&r(c)}},a.map((d,i)=>{var p;return t.createElement(S,{key:(p=d.title)!=null?p:i,column:d,record:c,index:i})}))));try{T.displayName="TableRows",T.__docgenInfo={description:"",displayName:"TableRows",props:{records:{defaultValue:null,description:"",name:"records",required:!0,type:{name:"T[]"}},columns:{defaultValue:null,description:"",name:"columns",required:!0,type:{name:"TableColumn<T>[]"}},isLoading:{defaultValue:null,description:"",name:"isLoading",required:!0,type:{name:"boolean"}},emptyMessage:{defaultValue:null,description:"",name:"emptyMessage",required:!0,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}},handleRowClick:{defaultValue:null,description:"",name:"handleRowClick",required:!1,type:{name:"((record: T) => void)"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/components/core/table/table-rows.tsx#TableRows"]={docgenInfo:T.__docgenInfo,name:"TableRows",path:"src/components/core/table/table-rows.tsx#TableRows"})}catch{}const E=({className:e,columns:a,records:l,isLoading:n=!1,message:r="No records found",showTableHead:c=!0,stacked:d,sort:i,onSort:p,handleRowClick:v})=>{const C=s.exports.useRef(null),_=s.exports.useRef(null),[N,L]=s.exports.useState(!1),[I,A]=s.exports.useState(!1),[R,k]=s.exports.useState(w),q=G(l,a,i),m=()=>{const o=_.current,f=C.current;if(o&&f){L(o.scrollLeft>0);const B=o.scrollLeft+o.clientWidth;A(B<f.clientWidth)}},V=o=>{const f={columnTitle:o,dir:"asc"};o===(i==null?void 0:i.columnTitle)&&(f.dir=i.dir==="asc"?"desc":"asc"),p&&p(f)};s.exports.useEffect(()=>{const o=_.current;return m(),o==null||o.addEventListener("scroll",m),window.addEventListener("resize",m),()=>{o==null||o.removeEventListener("scroll",m),window.removeEventListener("resize",m)}},[_,n]);const x=!n&&l.length>0;return t.createElement("div",{className:u("ctw-space-y-4",e,{"ctw-table-stacked":d})},t.createElement("div",{className:u("ctw-table-container",{"ctw-table-scroll-left-shadow":N,"ctw-table-scroll-right-shadow":I})},t.createElement("div",{className:"ctw-scrollbar",ref:_},t.createElement("table",{ref:C},x&&t.createElement(y,{columns:a}),c&&x&&t.createElement(g,{columns:a,sort:i,onSort:V}),t.createElement("tbody",null,t.createElement(T,{records:q.slice(0,R),handleRowClick:v,columns:a,isLoading:n,emptyMessage:r}))))),l.length>0&&!n&&t.createElement(h,{total:l.length,count:R,changeCount:k}))};try{E.displayName="Table",E.__docgenInfo={description:"",displayName:"Table",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},records:{defaultValue:null,description:"",name:"records",required:!0,type:{name:"T[]"}},columns:{defaultValue:null,description:"",name:"columns",required:!0,type:{name:"TableColumn<T>[]"}},isLoading:{defaultValue:{value:"false"},description:"",name:"isLoading",required:!1,type:{name:"boolean"}},message:{defaultValue:{value:"No records found"},description:"Displayed when we have 0 records.",name:"message",required:!1,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}},showTableHead:{defaultValue:{value:"true"},description:"",name:"showTableHead",required:!1,type:{name:"boolean"}},stacked:{defaultValue:null,description:"",name:"stacked",required:!1,type:{name:"boolean"}},handleRowClick:{defaultValue:null,description:"",name:"handleRowClick",required:!1,type:{name:"((record: T) => void)"}},sort:{defaultValue:null,description:"",name:"sort",required:!1,type:{name:"TableSort"}},onSort:{defaultValue:null,description:"",name:"onSort",required:!1,type:{name:"((sort: TableSort) => void)"}}}},typeof STORYBOOK_REACT_CLASSES<"u"&&(STORYBOOK_REACT_CLASSES["src/components/core/table/table.tsx#Table"]={docgenInfo:E.__docgenInfo,name:"Table",path:"src/components/core/table/table.tsx#Table"})}catch{}export{E as T};
//# sourceMappingURL=table.25a8735e.js.map

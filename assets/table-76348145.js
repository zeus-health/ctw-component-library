import{R as n,r as _}from"./index-6f814c40.js";import{c as w}from"./index-74f03c09.js";import{S as ee}from"./spinner-66aa4ba7.js";import{a as P}from"./_baseToString-ba0098b0.js";import{g as h}from"./_commonjsHelpers-042e6b4d.js";import{h as te,i as ae,j as ne,v as j,l as re,m as le,a as se,n as ie,o as ce,u as oe}from"./sortBy-d0c06176.js";import{f as de,k as D,g as ue,h as me,c as pe,i as fe}from"./_baseClone-0bdbe065.js";import{p as ge,w as ye,r as _e,a as he,t as be,s as we,g as ve,b as Ee,j as Te,i as T,e as W,k as Ne,d as qe}from"./_equalByTag-3aa7c076.js";import{c as Ce,l as Ae}from"./_baseForOwn-d5bf979e.js";import{a as Le,b as Ve}from"./_createSet-823d7c6f.js";import{i as Re}from"./_baseIsEqual-4b283a92.js";import{i as Se}from"./isPlainObject-7e0f34c5.js";var xe=te();const aa=h(xe);var Ie=ae();const na=h(Ie);var Me=ne();const ra=h(Me);var Oe=ge,ke=Le,$e=Ve,Fe=P,Pe=ye,I=_e,je=Math.min;function De(e,t,a){for(var s=a?$e:ke,i=e[0].length,o=e.length,l=o,r=Array(o),c=1/0,p=[];l--;){var d=e[l];l&&t&&(d=Fe(d,Pe(t))),c=je(d.length,c),r[l]=!a&&(t||i>=120&&d.length>=120)?new Oe(l&&d):void 0}d=e[0];var g=-1,y=r[0];e:for(;++g<i&&p.length<c;){var u=d[g],m=t?t(u):u;if(u=a||u!==0?u:0,!(y?I(y,m):s(p,m,a))){for(l=o;--l;){var v=r[l];if(!(v?I(v,m):s(e[l],m,a)))continue e}y&&y.push(m),p.push(u)}}return p}var We=De,He=Re,Be=he;function Ge(e){return Be(e)&&He(e)}var H=Ge,Ue=H;function ze(e){return Ue(e)?e:[]}var Je=ze,Xe=P,Ze=We,Ke=j,Qe=Je,Ye=re,et=Ke(function(e){var t=Ye(e),a=Xe(e,Qe);return t=typeof t=="function"?t:void 0,t&&a.pop(),a.length&&a[0]===e[0]?Ze(a,void 0,t):[]}),la=et,tt=be,at=tt.isFinite;function nt(e){return typeof e=="number"&&at(e)}var sa=nt,rt=le();const ia=h(rt);var lt=Ce,st=we;function it(e,t,a){(a!==void 0&&!st(e[t],a)||a===void 0&&!(t in e))&&lt(e,t,a)}var B=it;function ct(e,t){if(!(t==="constructor"&&typeof e[t]=="function")&&t!="__proto__")return e[t]}var G=ct,ot=de,dt=D;function ut(e){return ot(e,dt(e))}var mt=ut,M=B,pt=ue,ft=me,gt=pe,yt=fe,O=ve,k=Ee,_t=H,ht=Te,bt=T,wt=W,vt=Se,Et=Ne,$=G,Tt=mt;function Nt(e,t,a,s,i,o,l){var r=$(e,a),c=$(t,a),p=l.get(c);if(p){M(e,a,p);return}var d=o?o(r,c,a+"",e,t,l):void 0,g=d===void 0;if(g){var y=k(c),u=!y&&ht(c),m=!y&&!u&&Et(c);d=c,y||u||m?k(r)?d=r:_t(r)?d=gt(r):u?(g=!1,d=pt(c,!0)):m?(g=!1,d=ft(c,!0)):d=[]:vt(c)||O(c)?(d=r,O(r)?d=Tt(r):(!wt(r)||bt(r))&&(d=yt(c))):g=!1}g&&(l.set(c,d),i(d,c,s,o,l),l.delete(c)),M(e,a,d)}var qt=Nt,Ct=qe,At=B,Lt=Ae,Vt=qt,Rt=W,St=D,xt=G;function U(e,t,a,s,i){e!==t&&Lt(t,function(o,l){if(i||(i=new Ct),Rt(o))Vt(e,t,l,a,U,s,i);else{var r=s?s(xt(e,l),o,l+"",e,t,i):void 0;r===void 0&&(r=o),At(e,l,r)}},St)}var z=U,It=j,Mt=se;function Ot(e){return It(function(t,a){var s=-1,i=a.length,o=i>1?a[i-1]:void 0,l=i>2?a[2]:void 0;for(o=e.length>3&&typeof o=="function"?(i--,o):void 0,l&&Mt(a[0],a[1],l)&&(o=i<3?void 0:o,i=1),t=Object(t);++s<i;){var r=a[s];r&&e(t,r,s,o)}return t})}var J=Ot,kt=z,$t=J,Ft=$t(function(e,t,a){kt(e,t,a)}),ca=Ft,Pt=z,jt=J,Dt=jt(function(e,t,a,s){Pt(e,t,a,s)}),oa=Dt,Wt=ie();const da=h(Wt);var Ht=ce();const ua=h(Ht);oe();const N=10,q=({total:e,count:t,changeCount:a})=>{const s=t>=e||e===0,i=e>N;return n.createElement("div",{className:"ctw-pagination !ctw-mt-1 sm:!ctw-mt-2"},n.createElement("div",{className:"ctw-text-gray-600 ctw-text-sm"},"Showing"," ",n.createElement("span",{className:"ctw-font-medium"},Math.min(t,e))," of"," ",n.createElement("span",{className:"ctw-font-medium"},e)," records"),(!s||i)&&n.createElement("div",{className:"ctw-leading-5"},!s&&n.createElement("button",{type:"button",className:"ctw-btn-clear ctw-link ctw-whitespace-nowrap",onClick:()=>a(e)},"Show All"),s&&i&&n.createElement("button",{type:"button",className:"ctw-btn-clear ctw-link ctw-whitespace-nowrap",onClick:()=>a(N)},"Clear")))};try{q.displayName="PaginationList",q.__docgenInfo={description:"",displayName:"PaginationList",props:{total:{defaultValue:null,description:"",name:"total",required:!0,type:{name:"number"}},count:{defaultValue:null,description:"",name:"count",required:!0,type:{name:"number"}},changeCount:{defaultValue:null,description:"",name:"changeCount",required:!0,type:{name:"(amount: number) => void"}}}}}catch{}const C=({columns:e})=>n.createElement("colgroup",null,e.map((t,a)=>n.createElement("col",{key:t.title??a,className:t.className,width:t.widthPercent?`${t.widthPercent}%`:"0*",style:{minWidth:t.minWidth}})));try{C.displayName="TableColGroup",C.__docgenInfo={description:"",displayName:"TableColGroup",props:{columns:{defaultValue:null,description:"",name:"columns",required:!0,type:{name:"TableColumn<T>[]"}}}}}catch{}const A=({columns:e})=>n.createElement("thead",{"data-zus-telemetry-namespace":"TableHead"},n.createElement("tr",null,e.map((t,a)=>n.createElement("th",{className:"ctw-group",key:t.title??a,scope:"col"},n.createElement("div",{className:"ctw-flex ctw-items-center ctw-space-x-2"},n.createElement("div",null,t.title))))));try{A.displayName="TableHead",A.__docgenInfo={description:"",displayName:"TableHead",props:{columns:{defaultValue:null,description:"",name:"columns",required:!0,type:{name:"TableColumn<T>[]"}}}}}catch{}const L=({column:e,record:t,index:a})=>{const s=e.dataIndex?t[e.dataIndex]:void 0;return n.createElement("td",{key:e.title??a,className:w({"ctw-font-medium ctw-text-content-black":a===0},e.className,"ctw-hyphens-auto ctw-break-words")},e.render?e.render(t):s)};try{L.displayName="TableDataCell",L.__docgenInfo={description:"",displayName:"TableDataCell",props:{column:{defaultValue:null,description:"",name:"column",required:!0,type:{name:"TableColumn<T>"}},record:{defaultValue:null,description:"",name:"record",required:!0,type:{name:"MinRecordItem"}},index:{defaultValue:null,description:"",name:"index",required:!0,type:{name:"number"}}}}}catch{}const E=({children:e,colSpan:t})=>n.createElement("tr",null,n.createElement("td",{className:"ctw-table-full-length-row",colSpan:t},e));try{E.displayName="TableFullLengthRow",E.__docgenInfo={description:"",displayName:"TableFullLengthRow",props:{colSpan:{defaultValue:null,description:"",name:"colSpan",required:!0,type:{name:"number"}}}}}catch{}const V=({records:e,columns:t,isLoading:a,emptyMessage:s,handleRowClick:i,RowActions:o,getRowClassName:l})=>a?n.createElement(E,{colSpan:t.length},n.createElement("div",{className:"ctw-flex ctw-justify-center ctw-space-x-2"},n.createElement("span",null,"Loading..."),n.createElement(ee,null))):e.length===0?n.createElement(E,{colSpan:t.length},n.createElement("span",{className:"ctw-empty-message -ctw-mt-3.5 sm:ctw-mt-0"},s)):n.createElement(n.Fragment,null,e.map(r=>n.createElement("tr",{"data-zus-telemetry-click":i?"Table row":null,className:w("ctw-group ctw-relative ctw-mx-px",T(l)?l(r):"",{"ctw-cursor-pointer hover:ctw-bg-bg-lighter":T(i)}),key:r.id,onClick:({target:c})=>{c instanceof HTMLElement&&c.querySelectorAll("button").length||i&&i(r)}},t.map((c,p)=>n.createElement(L,{key:c.title??p,column:c,record:r,index:p})),o&&n.createElement("td",{className:"ctw-table-row-actions group-hover:ctw-visible"},n.createElement(o,{record:r})))));try{V.displayName="TableRows",V.__docgenInfo={description:"",displayName:"TableRows",props:{RowActions:{defaultValue:null,description:"",name:"RowActions",required:!1,type:{name:"ComponentType<{ record: T; }>"}},columns:{defaultValue:null,description:"",name:"columns",required:!0,type:{name:"TableColumn<T>[]"}},emptyMessage:{defaultValue:null,description:"",name:"emptyMessage",required:!0,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}},getRowClassName:{defaultValue:null,description:"",name:"getRowClassName",required:!1,type:{name:"((record: T) => Argument)"}},handleRowClick:{defaultValue:null,description:"",name:"handleRowClick",required:!1,type:{name:"((record: T) => void)"}},isLoading:{defaultValue:null,description:"",name:"isLoading",required:!0,type:{name:"boolean"}},records:{defaultValue:null,description:"",name:"records",required:!0,type:{name:"T[]"}}}}}catch{}const F=({className:e,columns:t,records:a,isLoading:s=!1,emptyMessage:i="No records found",showTableHead:o=!0,removeLeftAndRightBorders:l=!1,stacked:r,handleRowClick:c,RowActions:p,getRowClassName:d,hidePagination:g=!1,children:y})=>{const u=_.useRef(null),m=_.useRef(null),[v,X]=_.useState(!1),[Z,K]=_.useState(!1),[R,Q]=_.useState(N),b=()=>{const f=m.current,x=u.current;if(f&&x){X(f.scrollLeft>0);const Y=f.scrollLeft+f.clientWidth;K(Y<x.clientWidth)}};_.useEffect(()=>{const f=m.current;return b(),f==null||f.addEventListener("scroll",b),window.addEventListener("resize",b),()=>{f==null||f.removeEventListener("scroll",b),window.removeEventListener("resize",b)}},[m,s]);const S=!s&&a.length>0;return n.createElement("div",{"data-zus-telemetry-namespace":"Table",className:w("ctw-space-y-4",{"ctw-table-stacked":r})},n.createElement("div",{className:w("ctw-table-container",e,{"ctw-table-scroll-left-shadow":v,"ctw-table-scroll-right-shadow":Z,"ctw-border-x-0":l})},n.createElement("div",{className:"ctw-scrollbar",ref:m},n.createElement("table",{ref:u},S&&n.createElement(C,{columns:t}),o&&S&&n.createElement(A,{columns:t}),n.createElement("tbody",{className:w({"ctw-h-[7rem]":a.length===0})},n.createElement(V,{getRowClassName:d,records:a.slice(0,R),handleRowClick:c,RowActions:p,columns:t,isLoading:s,emptyMessage:i}))))),!g&&!s&&n.createElement(q,{total:a.length,count:R,changeCount:Q}),y)};try{F.displayName="Table",F.__docgenInfo={description:"",displayName:"Table",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"Argument"}},records:{defaultValue:null,description:"",name:"records",required:!0,type:{name:"T[]"}},removeLeftAndRightBorders:{defaultValue:{value:"false"},description:"",name:"removeLeftAndRightBorders",required:!1,type:{name:"boolean"}},columns:{defaultValue:null,description:"",name:"columns",required:!0,type:{name:"TableColumn<T>[]"}},isLoading:{defaultValue:{value:"false"},description:"",name:"isLoading",required:!1,type:{name:"boolean"}},emptyMessage:{defaultValue:null,description:"Displayed when we have 0 records.",name:"emptyMessage",required:!1,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}},showTableHead:{defaultValue:{value:"true"},description:"",name:"showTableHead",required:!1,type:{name:"boolean"}},stacked:{defaultValue:null,description:"",name:"stacked",required:!1,type:{name:"boolean"}},hidePagination:{defaultValue:{value:"false"},description:"",name:"hidePagination",required:!1,type:{name:"boolean"}},handleRowClick:{defaultValue:null,description:"",name:"handleRowClick",required:!1,type:{name:"((record: T) => void)"}},RowActions:{defaultValue:null,description:"",name:"RowActions",required:!1,type:{name:"ComponentType<{ record: T; }>"}},getRowClassName:{defaultValue:null,description:"",name:"getRowClassName",required:!1,type:{name:"((record: T) => Argument)"}}}}}catch{}export{F as T,sa as _,ca as a,oa as b,aa as c,na as d,ra as f,la as i,ia as m,da as o,ua as p};

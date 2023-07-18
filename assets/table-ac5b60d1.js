import{R as n,r as _}from"./index-6f814c40.js";import{c as b}from"./index-74f03c09.js";import{S as ae}from"./spinner-1fa7ac76.js";import{b as V,f as ne,m as re}from"./_baseForOwn-9e8b57a2.js";import{h as se,i as le,j as ie,k as ce,m as oe,z as ue,A as S,l as de,o as me,a as pe,q as fe,s as ge,x as he,y as ye}from"./uniqWith-bc165632.js";import{g}from"./_commonjsHelpers-042e6b4d.js";import{d as _e,k as W,f as be,g as we,a as ve,h as Ee}from"./_baseClone-3dc95c45.js";import{q as qe,o as Te,r as Ne,d as Ce,m as Ae,s as xe,t as Le,b as Ve,c as Se,e as Ie,i as q,j as D,g as Re,u as Me}from"./_baseIsEqual-e6235ae7.js";import{b as $e,c as Oe}from"./_baseUniq-405a48ca.js";import{r as ke}from"./isEqual-34296d4e.js";import{i as Fe}from"./isPlainObject-82e8b885.js";var je=se();const ha=g(je);var Pe=le();const ya=g(Pe);var We=ie();const _a=g(We);var De=ce();const ba=g(De);var He=oe();const wa=g(He);ue();var Be=qe,Ge=$e,ze=Oe,Ue=V,Je=Te,$=Ne,Xe=Math.min;function Ze(e,t,a){for(var c=a?ze:Ge,i=e[0].length,o=e.length,s=o,r=Array(o),l=1/0,p=[];s--;){var u=e[s];s&&t&&(u=Ue(u,Je(t))),l=Xe(u.length,l),r[s]=!a&&(t||i>=120&&u.length>=120)?new Be(s&&u):void 0}u=e[0];var h=-1,y=r[0];e:for(;++h<i&&p.length<l;){var d=u[h],m=t?t(d):d;if(d=a||d!==0?d:0,!(y?$(y,m):c(p,m,a))){for(s=o;--s;){var v=r[s];if(!(v?$(v,m):c(e[s],m,a)))continue e}y&&y.push(m),p.push(d)}}return p}var H=Ze,Ke=Ce,Qe=Ae;function Ye(e){return Qe(e)&&Ke(e)}var B=Ye,et=B;function tt(e){return et(e)?e:[]}var G=tt,at=V,nt=H,rt=S,st=G,lt=rt(function(e){var t=at(e,st);return t.length&&t[0]===e[0]?nt(t):[]}),va=lt,it=V,ct=H,ot=S,ut=G,dt=de,mt=ot(function(e){var t=dt(e),a=it(e,ut);return t=typeof t=="function"?t:void 0,t&&a.pop(),a.length&&a[0]===e[0]?ct(a,void 0,t):[]}),Ea=mt,pt=ke();const qa=g(pt);var ft=xe,gt=ft.isFinite;function ht(e){return typeof e=="number"&&gt(e)}var Ta=ht,yt=me();const Na=g(yt);var _t=ne,bt=Le;function wt(e,t,a){(a!==void 0&&!bt(e[t],a)||a===void 0&&!(t in e))&&_t(e,t,a)}var z=wt;function vt(e,t){if(!(t==="constructor"&&typeof e[t]=="function")&&t!="__proto__")return e[t]}var U=vt,Et=_e,qt=W;function Tt(e){return Et(e,qt(e))}var Nt=Tt,O=z,Ct=be,At=we,xt=ve,Lt=Ee,k=Ve,F=Se,Vt=B,St=Ie,It=q,Rt=D,Mt=Fe,$t=Re,j=U,Ot=Nt;function kt(e,t,a,c,i,o,s){var r=j(e,a),l=j(t,a),p=s.get(l);if(p){O(e,a,p);return}var u=o?o(r,l,a+"",e,t,s):void 0,h=u===void 0;if(h){var y=F(l),d=!y&&St(l),m=!y&&!d&&$t(l);u=l,y||d||m?F(r)?u=r:Vt(r)?u=xt(r):d?(h=!1,u=Ct(l,!0)):m?(h=!1,u=At(l,!0)):u=[]:Mt(l)||k(l)?(u=r,k(r)?u=Ot(r):(!Rt(r)||It(r))&&(u=Lt(l))):h=!1}h&&(s.set(l,u),i(u,l,c,o,s),s.delete(l)),O(e,a,u)}var Ft=kt,jt=Me,Pt=z,Wt=re,Dt=Ft,Ht=D,Bt=W,Gt=U;function J(e,t,a,c,i){e!==t&&Wt(t,function(o,s){if(i||(i=new jt),Ht(o))Dt(e,t,s,a,J,c,i);else{var r=c?c(Gt(e,s),o,s+"",e,t,i):void 0;r===void 0&&(r=o),Pt(e,s,r)}},Bt)}var X=J,zt=S,Ut=pe;function Jt(e){return zt(function(t,a){var c=-1,i=a.length,o=i>1?a[i-1]:void 0,s=i>2?a[2]:void 0;for(o=e.length>3&&typeof o=="function"?(i--,o):void 0,s&&Ut(a[0],a[1],s)&&(o=i<3?void 0:o,i=1),t=Object(t);++c<i;){var r=a[c];r&&e(t,r,c,o)}return t})}var Z=Jt,Xt=X,Zt=Z,Kt=Zt(function(e,t,a){Xt(e,t,a)}),Ca=Kt,Qt=X,Yt=Z,ea=Yt(function(e,t,a,c){Qt(e,t,a,c)}),Aa=ea,ta=fe();const xa=g(ta);var aa=ge();const La=g(aa);var na=he();const Va=g(na);var ra=ye();const Sa=g(ra);const T=({columns:e})=>n.createElement("colgroup",null,e.map((t,a)=>n.createElement("col",{key:t.title??a,className:t.className,width:t.widthPercent?`${t.widthPercent}%`:"0*",style:{minWidth:t.minWidth}})));try{T.displayName="TableColGroup",T.__docgenInfo={description:"",displayName:"TableColGroup",props:{columns:{defaultValue:null,description:"",name:"columns",required:!0,type:{name:"TableColumn<T>[]"}}}}}catch{}const N=({columns:e})=>n.createElement("thead",{"data-zus-telemetry-namespace":"TableHead"},n.createElement("tr",null,e.map((t,a)=>n.createElement("th",{className:"ctw-group",key:t.title??a,scope:"col"},n.createElement("div",{className:"ctw-flex ctw-items-center ctw-space-x-2"},n.createElement("div",null,t.title))))));try{N.displayName="TableHead",N.__docgenInfo={description:"",displayName:"TableHead",props:{columns:{defaultValue:null,description:"",name:"columns",required:!0,type:{name:"TableColumn<T>[]"}}}}}catch{}const C=({column:e,record:t})=>{const a=e.dataIndex?t[e.dataIndex]:void 0;return n.createElement("td",{className:b("ctw-text-content-black",e.className,"ctw-hyphens-auto ctw-break-words")},e.render?e.render(t):a)};try{C.displayName="TableDataCell",C.__docgenInfo={description:"",displayName:"TableDataCell",props:{column:{defaultValue:null,description:"",name:"column",required:!0,type:{name:"TableColumn<T>"}},record:{defaultValue:null,description:"",name:"record",required:!0,type:{name:"MinRecordItem"}}}}}catch{}const E=({children:e,colSpan:t})=>n.createElement("tr",null,n.createElement("td",{className:"ctw-table-full-length-row",colSpan:t},e));try{E.displayName="TableFullLengthRow",E.__docgenInfo={description:"",displayName:"TableFullLengthRow",props:{colSpan:{defaultValue:null,description:"",name:"colSpan",required:!0,type:{name:"number"}}}}}catch{}const A=({records:e,columns:t,isLoading:a,emptyMessage:c,handleRowClick:i,RowActions:o,getRowClassName:s})=>a?n.createElement(E,{colSpan:t.length},n.createElement("div",{className:"ctw-flex ctw-justify-center ctw-space-x-2"},n.createElement("span",null,"Loading..."),n.createElement(ae,null))):e.length===0?n.createElement(E,{colSpan:t.length},n.createElement("span",{className:"ctw-empty-message -ctw-mt-3.5 sm:ctw-mt-0"},c)):n.createElement(n.Fragment,null,e.map(r=>n.createElement("tr",{"data-zus-telemetry-click":i?"Table row":null,className:b("ctw-group ctw-relative ctw-mx-px",q(s)?s(r):"",{"ctw-cursor-pointer hover:ctw-bg-bg-lighter":q(i)}),key:r.key,onClick:({target:l})=>{l instanceof HTMLElement&&l.querySelectorAll("button").length||i&&i(r)}},t.map((l,p)=>n.createElement(C,{key:`${r.key}_${l.title??p}`,column:l,record:r})),o&&n.createElement("td",{className:"ctw-table-row-actions group-hover:ctw-visible",onClick:l=>l.stopPropagation()},n.createElement(o,{record:r})))));try{A.displayName="TableRows",A.__docgenInfo={description:"",displayName:"TableRows",props:{RowActions:{defaultValue:null,description:"",name:"RowActions",required:!1,type:{name:"ComponentType<{ record: T; }>"}},columns:{defaultValue:null,description:"",name:"columns",required:!0,type:{name:"TableColumn<T>[]"}},emptyMessage:{defaultValue:null,description:"",name:"emptyMessage",required:!0,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}},getRowClassName:{defaultValue:null,description:"",name:"getRowClassName",required:!1,type:{name:"((record: T) => Argument)"}},handleRowClick:{defaultValue:null,description:"",name:"handleRowClick",required:!1,type:{name:"((record: T) => void)"}},isLoading:{defaultValue:null,description:"",name:"isLoading",required:!0,type:{name:"boolean"}},records:{defaultValue:null,description:"",name:"records",required:!0,type:{name:"T[]"}}}}}catch{}const x=10,L=({total:e,count:t,changeCount:a})=>{const c=t>=e||e===0,i=e>x;return n.createElement("div",{className:"ctw-pagination !ctw-mt-1 sm:!ctw-mt-2"},n.createElement("div",{className:"ctw-text-gray-600 ctw-text-sm"},"Showing ",n.createElement("span",{className:"ctw-font-medium"},Math.min(t,e))," of"," ",n.createElement("span",{className:"ctw-font-medium"},e)," records"),(!c||i)&&n.createElement("div",{className:"ctw-leading-5"},!c&&n.createElement("button",{type:"button",className:"ctw-btn-clear ctw-link ctw-whitespace-nowrap",onClick:()=>a(e)},"Show All"),c&&i&&n.createElement("button",{type:"button",className:"ctw-btn-clear ctw-link ctw-whitespace-nowrap",onClick:()=>a(x)},"Clear")))};try{L.displayName="PaginationList",L.__docgenInfo={description:"",displayName:"PaginationList",props:{total:{defaultValue:null,description:"",name:"total",required:!0,type:{name:"number"}},count:{defaultValue:null,description:"",name:"count",required:!0,type:{name:"number"}},changeCount:{defaultValue:null,description:"",name:"changeCount",required:!0,type:{name:"(amount: number) => void"}}}}}catch{}const P=({className:e,columns:t,records:a,isLoading:c=!1,emptyMessage:i="No records found",showTableHead:o=!0,stacked:s,handleRowClick:r,RowActions:l,getRowClassName:p,hidePagination:u=!1,pageSize:h=x,children:y})=>{const d=_.useRef(null),m=_.useRef(null),[v,K]=_.useState(!1),[Q,Y]=_.useState(!1),[I,ee]=_.useState(h),w=()=>{const f=m.current,M=d.current;if(f&&M){K(f.scrollLeft>0);const te=f.scrollLeft+f.clientWidth;Y(te<M.clientWidth)}};_.useEffect(()=>{const f=m.current;return w(),f==null||f.addEventListener("scroll",w),window.addEventListener("resize",w),()=>{f==null||f.removeEventListener("scroll",w),window.removeEventListener("resize",w)}},[m,c]);const R=!c&&a.length>0;return n.createElement("div",{"data-zus-telemetry-namespace":"Table",className:b("ctw-scrollable-pass-through-height ctw-space-y-4",{"ctw-table-stacked":s})},n.createElement("div",{className:b("ctw-table-container ctw-scrollable-pass-through-height",e,{"ctw-table-scroll-left-shadow":v,"ctw-table-scroll-right-shadow":Q})},n.createElement("div",{className:b("ctw-scrollbar ctw-scrollable-content"),ref:m},n.createElement("table",{ref:d},R&&n.createElement(T,{columns:t}),o&&R&&n.createElement(N,{columns:t}),n.createElement("tbody",{className:b({"ctw-h-[7rem]":a.length===0})},n.createElement(A,{getRowClassName:p,records:a.slice(0,I),handleRowClick:r,RowActions:l,columns:t,isLoading:c,emptyMessage:i}))))),!u&&!c&&n.createElement(L,{total:a.length,count:I,changeCount:ee}),y)};try{P.displayName="Table",P.__docgenInfo={description:"",displayName:"Table",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"Argument"}},columns:{defaultValue:null,description:"",name:"columns",required:!0,type:{name:"TableColumn<T>[]"}},emptyMessage:{defaultValue:null,description:"Displayed when we have 0 records.",name:"emptyMessage",required:!1,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}},hidePagination:{defaultValue:{value:"false"},description:"",name:"hidePagination",required:!1,type:{name:"boolean"}},isLoading:{defaultValue:{value:"false"},description:"",name:"isLoading",required:!1,type:{name:"boolean"}},pageSize:{defaultValue:{value:"10"},description:"",name:"pageSize",required:!1,type:{name:"number"}},records:{defaultValue:null,description:"",name:"records",required:!0,type:{name:"T[]"}},showTableHead:{defaultValue:{value:"true"},description:"",name:"showTableHead",required:!1,type:{name:"boolean"}},stacked:{defaultValue:null,description:"",name:"stacked",required:!1,type:{name:"boolean"}},handleRowClick:{defaultValue:null,description:"",name:"handleRowClick",required:!1,type:{name:"((record: T) => void)"}},RowActions:{defaultValue:null,description:"",name:"RowActions",required:!1,type:{name:"ComponentType<{ record: T; }>"}},getRowClassName:{defaultValue:null,description:"",name:"getRowClassName",required:!1,type:{name:"((record: T) => Argument)"}}}}}catch{}export{P as T,Ta as _,ba as a,Na as b,ya as c,ha as d,qa as e,wa as f,_a as g,va as h,Ea as i,Ca as j,Aa as m,xa as o,La as p,Va as s,Sa as u};

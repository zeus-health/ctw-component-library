import{R as r,r as h}from"./index-9f32f44c.js";import{c as y}from"./index-a587463d.js";import{S as we}from"./spinner-096fc82a.js";import{g as d}from"./_commonjsHelpers-de833af9.js";import{r as Z,a as Ee,b as Ce,c as Ae,d as Re,e as Te,f as $e,_ as O,l as qe,g as Le,h as Ne,i as Oe,j as Se,k as Ie,m as Me}from"./uniqWith-20f86c91.js";import{t as B,g as S,c as Ve,h as ke}from"./_baseForOwn-fb105538.js";import{c as We,k as J,d as Ue,e as je,f as Pe,g as Fe}from"./_baseClone-fa87e113.js";import{h as De,x as ze,j as He,o as Ge,i as Ze,b as Be,k as Je,E as Ye,e as Xe,z as Ke,H as Qe,c as Y,I as ea,y as aa,G as V}from"./_baseIsEqual-927df81e.js";import{a as ta,b as ra}from"./_baseUniq-1d5ffb60.js";import{r as na}from"./isEqual-cd324520.js";import{a as sa}from"./isPlainObject-60ce55e9.js";function ua(e,a,t,l){var n=-1,o=e==null?0:e.length;for(l&&o&&(t=e[++n]);++n<o;)t=a(t,e[n],n,e);return t}var ia=ua;function la(e){return function(a){return e==null?void 0:e[a]}}var oa=la,ca=oa,da={À:"A",Á:"A",Â:"A",Ã:"A",Ä:"A",Å:"A",à:"a",á:"a",â:"a",ã:"a",ä:"a",å:"a",Ç:"C",ç:"c",Ð:"D",ð:"d",È:"E",É:"E",Ê:"E",Ë:"E",è:"e",é:"e",ê:"e",ë:"e",Ì:"I",Í:"I",Î:"I",Ï:"I",ì:"i",í:"i",î:"i",ï:"i",Ñ:"N",ñ:"n",Ò:"O",Ó:"O",Ô:"O",Õ:"O",Ö:"O",Ø:"O",ò:"o",ó:"o",ô:"o",õ:"o",ö:"o",ø:"o",Ù:"U",Ú:"U",Û:"U",Ü:"U",ù:"u",ú:"u",û:"u",ü:"u",Ý:"Y",ý:"y",ÿ:"y",Æ:"Ae",æ:"ae",Þ:"Th",þ:"th",ß:"ss",Ā:"A",Ă:"A",Ą:"A",ā:"a",ă:"a",ą:"a",Ć:"C",Ĉ:"C",Ċ:"C",Č:"C",ć:"c",ĉ:"c",ċ:"c",č:"c",Ď:"D",Đ:"D",ď:"d",đ:"d",Ē:"E",Ĕ:"E",Ė:"E",Ę:"E",Ě:"E",ē:"e",ĕ:"e",ė:"e",ę:"e",ě:"e",Ĝ:"G",Ğ:"G",Ġ:"G",Ģ:"G",ĝ:"g",ğ:"g",ġ:"g",ģ:"g",Ĥ:"H",Ħ:"H",ĥ:"h",ħ:"h",Ĩ:"I",Ī:"I",Ĭ:"I",Į:"I",İ:"I",ĩ:"i",ī:"i",ĭ:"i",į:"i",ı:"i",Ĵ:"J",ĵ:"j",Ķ:"K",ķ:"k",ĸ:"k",Ĺ:"L",Ļ:"L",Ľ:"L",Ŀ:"L",Ł:"L",ĺ:"l",ļ:"l",ľ:"l",ŀ:"l",ł:"l",Ń:"N",Ņ:"N",Ň:"N",Ŋ:"N",ń:"n",ņ:"n",ň:"n",ŋ:"n",Ō:"O",Ŏ:"O",Ő:"O",ō:"o",ŏ:"o",ő:"o",Ŕ:"R",Ŗ:"R",Ř:"R",ŕ:"r",ŗ:"r",ř:"r",Ś:"S",Ŝ:"S",Ş:"S",Š:"S",ś:"s",ŝ:"s",ş:"s",š:"s",Ţ:"T",Ť:"T",Ŧ:"T",ţ:"t",ť:"t",ŧ:"t",Ũ:"U",Ū:"U",Ŭ:"U",Ů:"U",Ű:"U",Ų:"U",ũ:"u",ū:"u",ŭ:"u",ů:"u",ű:"u",ų:"u",Ŵ:"W",ŵ:"w",Ŷ:"Y",ŷ:"y",Ÿ:"Y",Ź:"Z",Ż:"Z",Ž:"Z",ź:"z",ż:"z",ž:"z",Ĳ:"IJ",ĳ:"ij",Œ:"Oe",œ:"oe",ŉ:"'n",ſ:"s"},fa=ca(da),pa=fa,ma=pa,ga=B,ba=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,xa="\\u0300-\\u036f",ha="\\ufe20-\\ufe2f",_a="\\u20d0-\\u20ff",ya=xa+ha+_a,va="["+ya+"]",wa=RegExp(va,"g");function Ea(e){return e=ga(e),e&&e.replace(ba,ma).replace(wa,"")}var Ca=Ea,Aa=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;function Ra(e){return e.match(Aa)||[]}var Ta=Ra,$a=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;function qa(e){return $a.test(e)}var La=qa,X="\\ud800-\\udfff",Na="\\u0300-\\u036f",Oa="\\ufe20-\\ufe2f",Sa="\\u20d0-\\u20ff",Ia=Na+Oa+Sa,K="\\u2700-\\u27bf",Q="a-z\\xdf-\\xf6\\xf8-\\xff",Ma="\\xac\\xb1\\xd7\\xf7",Va="\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",ka="\\u2000-\\u206f",Wa=" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",ee="A-Z\\xc0-\\xd6\\xd8-\\xde",Ua="\\ufe0e\\ufe0f",ae=Ma+Va+ka+Wa,te="['’]",k="["+ae+"]",ja="["+Ia+"]",re="\\d+",Pa="["+K+"]",ne="["+Q+"]",se="[^"+X+ae+re+K+Q+ee+"]",Fa="\\ud83c[\\udffb-\\udfff]",Da="(?:"+ja+"|"+Fa+")",za="[^"+X+"]",ue="(?:\\ud83c[\\udde6-\\uddff]){2}",ie="[\\ud800-\\udbff][\\udc00-\\udfff]",_="["+ee+"]",Ha="\\u200d",W="(?:"+ne+"|"+se+")",Ga="(?:"+_+"|"+se+")",U="(?:"+te+"(?:d|ll|m|re|s|t|ve))?",j="(?:"+te+"(?:D|LL|M|RE|S|T|VE))?",le=Da+"?",oe="["+Ua+"]?",Za="(?:"+Ha+"(?:"+[za,ue,ie].join("|")+")"+oe+le+")*",Ba="\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",Ja="\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",Ya=oe+le+Za,Xa="(?:"+[Pa,ue,ie].join("|")+")"+Ya,Ka=RegExp([_+"?"+ne+"+"+U+"(?="+[k,_,"$"].join("|")+")",Ga+"+"+j+"(?="+[k,_+W,"$"].join("|")+")",_+"?"+W+"+"+U,_+"+"+j,Ja,Ba,re,Xa].join("|"),"g");function Qa(e){return e.match(Ka)||[]}var et=Qa,at=Ta,tt=La,rt=B,nt=et;function st(e,a,t){return e=rt(e),a=t?void 0:a,a===void 0?tt(e)?nt(e):at(e):e.match(a)||[]}var ut=st,it=ia,lt=Ca,ot=ut,ct="['’]",dt=RegExp(ct,"g");function ft(e){return function(a){return it(ot(lt(a).replace(dt,"")),e,"")}}var pt=ft,mt=Z(),gt=pt,bt=gt(function(e,a,t){return a=a.toLowerCase(),e+(t?mt(a):a)}),xt=bt;const an=d(xt);var ht=Z();const tn=d(ht);var _t=Ee();const rn=d(_t);var yt=Ce();const nn=d(yt);var vt=Ae();const sn=d(vt);var wt=Re();const un=d(wt);var Et=Te();const ln=d(Et);$e();var Ct=De,At=ta,Rt=ra,Tt=S,$t=ze,P=He,qt=Math.min;function Lt(e,a,t){for(var l=t?Rt:At,n=e[0].length,o=e.length,u=o,s=Array(o),i=1/0,g=[];u--;){var c=e[u];u&&a&&(c=Tt(c,$t(a))),i=qt(c.length,i),s[u]=!t&&(a||n>=120&&c.length>=120)?new Ct(u&&c):void 0}c=e[0];var m=-1,x=s[0];e:for(;++m<n&&g.length<i;){var f=c[m],p=a?a(f):f;if(f=t||f!==0?f:0,!(x?P(x,p):l(g,p,t))){for(u=o;--u;){var w=s[u];if(!(w?P(w,p):l(e[u],p,t)))continue e}x&&x.push(p),g.push(f)}}return g}var ce=Lt,Nt=Ge,Ot=Ze;function St(e){return Ot(e)&&Nt(e)}var de=St,It=de;function Mt(e){return It(e)?e:[]}var fe=Mt,Vt=S,kt=ce,Wt=O,Ut=fe,jt=Wt(function(e){var a=Vt(e,Ut);return a.length&&a[0]===e[0]?kt(a):[]}),Pt=jt;const on=d(Pt);var Ft=S,Dt=ce,zt=O,Ht=fe,Gt=qe,Zt=zt(function(e){var a=Gt(e),t=Ft(e,Ht);return a=typeof a=="function"?a:void 0,a&&t.pop(),t.length&&t[0]===e[0]?Dt(t,void 0,a):[]}),Bt=Zt;const cn=d(Bt);var Jt=na();const dn=d(Jt);var Yt=Be,Xt=Yt.isFinite;function Kt(e){return typeof e=="number"&&Xt(e)}var Qt=Kt;const fn=d(Qt);var er=Le();const pn=d(er);var ar=Ve,tr=Je;function rr(e,a,t){(t!==void 0&&!tr(e[a],t)||t===void 0&&!(a in e))&&ar(e,a,t)}var pe=rr;function nr(e,a){if(!(a==="constructor"&&typeof e[a]=="function")&&a!="__proto__")return e[a]}var me=nr,sr=We,ur=J;function ir(e){return sr(e,ur(e))}var lr=ir,F=pe,or=Ue,cr=je,dr=Pe,fr=Fe,D=Ye,z=Xe,pr=de,mr=Ke,gr=Qe,br=Y,xr=sa,hr=ea,H=me,_r=lr;function yr(e,a,t,l,n,o,u){var s=H(e,t),i=H(a,t),g=u.get(i);if(g){F(e,t,g);return}var c=o?o(s,i,t+"",e,a,u):void 0,m=c===void 0;if(m){var x=z(i),f=!x&&mr(i),p=!x&&!f&&hr(i);c=i,x||f||p?z(s)?c=s:pr(s)?c=dr(s):f?(m=!1,c=or(i,!0)):p?(m=!1,c=cr(i,!0)):c=[]:xr(i)||D(i)?(c=s,D(s)?c=_r(s):(!br(s)||gr(s))&&(c=fr(i))):m=!1}m&&(u.set(i,c),n(c,i,l,o,u),u.delete(i)),F(e,t,c)}var vr=yr,wr=aa,Er=pe,Cr=ke,Ar=vr,Rr=Y,Tr=J,$r=me;function ge(e,a,t,l,n){e!==a&&Cr(a,function(o,u){if(n||(n=new wr),Rr(o))Ar(e,a,u,t,ge,l,n);else{var s=l?l($r(e,u),o,u+"",e,a,n):void 0;s===void 0&&(s=o),Er(e,u,s)}},Tr)}var be=ge,qr=O,Lr=Ne;function Nr(e){return qr(function(a,t){var l=-1,n=t.length,o=n>1?t[n-1]:void 0,u=n>2?t[2]:void 0;for(o=e.length>3&&typeof o=="function"?(n--,o):void 0,u&&Lr(t[0],t[1],u)&&(o=n<3?void 0:o,n=1),a=Object(a);++l<n;){var s=t[l];s&&e(a,s,l,o)}return a})}var xe=Nr,Or=be,Sr=xe,Ir=Sr(function(e,a,t){Or(e,a,t)}),Mr=Ir;const mn=d(Mr);var Vr=be,kr=xe,Wr=kr(function(e,a,t,l){Vr(e,a,t,l)}),Ur=Wr;const gn=d(Ur);var jr=Oe();const bn=d(jr);var Pr=Se();const xn=d(Pr);var Fr=Ie();const hn=d(Fr);var Dr=Me();const _n=d(Dr);const R=({columns:e})=>r.createElement("colgroup",null,e.map((a,t)=>r.createElement("col",{key:a.title??t,className:a.className,width:a.widthPercent?`${a.widthPercent}%`:void 0,style:{minWidth:a.minWidth}})));try{R.displayName="TableColGroup",R.__docgenInfo={description:"",displayName:"TableColGroup",props:{columns:{defaultValue:null,description:"",name:"columns",required:!0,type:{name:"TableColumn<T>[]"}}}}}catch{}const T=({columns:e})=>r.createElement("thead",null,r.createElement("tr",null,e.map((a,t)=>r.createElement("th",{className:"ctw-group",key:a.title??t,scope:"col"},r.createElement("div",{className:"ctw-flex ctw-items-center ctw-space-x-2"},r.createElement("div",null,a.title))))));try{T.displayName="TableHead",T.__docgenInfo={description:"",displayName:"TableHead",props:{columns:{defaultValue:null,description:"",name:"columns",required:!0,type:{name:"TableColumn<T>[]"}}}}}catch{}const $=({column:e,record:a})=>{const t=e.dataIndex?a[e.dataIndex]:void 0;return r.createElement("td",{className:y("ctw-text-content-black",e.className,"ctw-hyphens-auto ctw-break-words")},e.render?e.render(a):t)};try{$.displayName="TableDataCell",$.__docgenInfo={description:"",displayName:"TableDataCell",props:{column:{defaultValue:null,description:"",name:"column",required:!0,type:{name:"TableColumn<T>"}},record:{defaultValue:null,description:"",name:"record",required:!0,type:{name:"MinRecordItem"}}}}}catch{}const C=({children:e,colSpan:a})=>r.createElement("tr",null,r.createElement("td",{className:"ctw-table-full-length-row",colSpan:a},e));try{C.displayName="TableFullLengthRow",C.__docgenInfo={description:"",displayName:"TableFullLengthRow",props:{colSpan:{defaultValue:null,description:"",name:"colSpan",required:!0,type:{name:"number"}}}}}catch{}const q=({records:e,columns:a,isLoading:t,emptyMessage:l,handleRowClick:n,RowActions:o,getRowClassName:u})=>t?r.createElement(C,{colSpan:a.length},r.createElement("div",{className:"ctw-flex ctw-justify-center ctw-space-x-2"},r.createElement("span",null,"Loading..."),r.createElement(we,null))):e.length===0?r.createElement(C,{colSpan:a.length},r.createElement("span",{className:"ctw-empty-message -ctw-mt-3.5 sm:ctw-mt-0"},l)):r.createElement(r.Fragment,null,e.map(s=>r.createElement("tr",{"data-zus-telemetry-click":n?"Table row":null,className:y("ctw-group ctw-relative ctw-mx-px",V(u)?u(s):"",{"ctw-cursor-pointer hover:ctw-bg-bg-lighter":V(n)}),key:s.key,onClick:({target:i})=>{i instanceof HTMLElement&&i.querySelectorAll("button").length||n&&n(s)}},a.map((i,g)=>r.createElement($,{key:`${s.key}_${i.title??g}`,column:i,record:s})),o&&r.createElement("td",{className:"ctw-table-row-actions group-hover:ctw-visible",onClick:i=>i.stopPropagation()},r.createElement(o,{record:s})))));try{q.displayName="TableRows",q.__docgenInfo={description:"",displayName:"TableRows",props:{RowActions:{defaultValue:null,description:"",name:"RowActions",required:!1,type:{name:"RowActionsProp<T>"}},columns:{defaultValue:null,description:"",name:"columns",required:!0,type:{name:"TableColumn<T>[]"}},emptyMessage:{defaultValue:null,description:"",name:"emptyMessage",required:!0,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}},getRowClassName:{defaultValue:null,description:"",name:"getRowClassName",required:!1,type:{name:"((record: T) => Argument)"}},handleRowClick:{defaultValue:null,description:"",name:"handleRowClick",required:!1,type:{name:"((record: T) => void)"}},isLoading:{defaultValue:null,description:"",name:"isLoading",required:!0,type:{name:"boolean"}},records:{defaultValue:null,description:"",name:"records",required:!0,type:{name:"T[]"}}}}}catch{}const L=10,N=({total:e,count:a,changeCount:t})=>{const l=a>=e||e===0,n=e>L;return r.createElement("div",{className:"ctw-pagination !ctw-mt-1 sm:!ctw-mt-2"},r.createElement("div",{className:"ctw-text-gray-600 ctw-text-sm"},"Showing ",r.createElement("span",{className:"ctw-font-medium"},Math.min(a,e))," of"," ",r.createElement("span",{className:"ctw-font-medium"},e)," records"),(!l||n)&&r.createElement("div",{className:"ctw-leading-5"},!l&&r.createElement("button",{type:"button",className:"ctw-btn-clear ctw-link ctw-whitespace-nowrap",onClick:()=>t(e)},"Show All"),l&&n&&r.createElement("button",{type:"button",className:"ctw-btn-clear ctw-link ctw-whitespace-nowrap",onClick:()=>t(L)},"Clear")))};try{N.displayName="PaginationList",N.__docgenInfo={description:"",displayName:"PaginationList",props:{total:{defaultValue:null,description:"",name:"total",required:!0,type:{name:"number"}},count:{defaultValue:null,description:"",name:"count",required:!0,type:{name:"number"}},changeCount:{defaultValue:null,description:"",name:"changeCount",required:!0,type:{name:"(amount: number) => void"}}}}}catch{}const G=({className:e,columns:a,records:t,isLoading:l=!1,emptyMessage:n="No records found",showTableHead:o=!0,stacked:u,handleRowClick:s,RowActions:i,getRowClassName:g,hidePagination:c=!1,pageSize:m=L,children:x})=>{const f=h.useRef(null),p=h.useRef(null),[w,he]=h.useState(!1),[_e,ye]=h.useState(!1),[I,A]=h.useState(m),v=()=>{const b=p.current,M=f.current;if(b&&M){he(b.scrollLeft>0);const ve=b.scrollLeft+b.clientWidth;ye(ve<M.clientWidth)}};h.useEffect(()=>{const b=p.current;return v(),b==null||b.addEventListener("scroll",v),window.addEventListener("resize",v),()=>{b==null||b.removeEventListener("scroll",v),window.removeEventListener("resize",v)}},[p,l]);const E=!l&&t.length>0;return h.useEffect(()=>{A(c&&E?t.length:m)},[t,m,c,E]),r.createElement("div",{className:y("ctw-scrollable-pass-through-height ctw-space-y-4",{"ctw-table-stacked":u})},r.createElement("div",{className:y("ctw-table-container ctw-scrollable-pass-through-height",e,{"ctw-table-scroll-left-shadow":w,"ctw-table-scroll-right-shadow":_e})},r.createElement("div",{className:y("ctw-scrollbar ctw-scrollable-content"),ref:p},r.createElement("table",{ref:f},E&&r.createElement(R,{columns:a}),o&&E&&r.createElement(T,{columns:a}),r.createElement("tbody",{className:y({"ctw-h-[7rem]":t.length===0})},r.createElement(q,{getRowClassName:g,records:t.slice(0,I),handleRowClick:s,RowActions:i,columns:a,isLoading:l,emptyMessage:n}))))),!c&&!l&&r.createElement(N,{total:t.length,count:I,changeCount:A}),x)};try{G.displayName="Table",G.__docgenInfo={description:"",displayName:"Table",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"Argument"}},columns:{defaultValue:null,description:"",name:"columns",required:!0,type:{name:"TableColumn<T>[]"}},emptyMessage:{defaultValue:null,description:"Displayed when we have 0 records.",name:"emptyMessage",required:!1,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}},hidePagination:{defaultValue:{value:"false"},description:"",name:"hidePagination",required:!1,type:{name:"boolean"}},isLoading:{defaultValue:{value:"false"},description:"",name:"isLoading",required:!1,type:{name:"boolean"}},pageSize:{defaultValue:{value:"10"},description:"",name:"pageSize",required:!1,type:{name:"number"}},records:{defaultValue:null,description:"",name:"records",required:!0,type:{name:"T[]"}},showTableHead:{defaultValue:{value:"true"},description:"",name:"showTableHead",required:!1,type:{name:"boolean"}},stacked:{defaultValue:null,description:"",name:"stacked",required:!1,type:{name:"boolean"}},handleRowClick:{defaultValue:null,description:"",name:"handleRowClick",required:!1,type:{name:"((record: T) => void)"}},RowActions:{defaultValue:null,description:"",name:"RowActions",required:!1,type:{name:"RowActionsProp<T>"}},getRowClassName:{defaultValue:null,description:"",name:"getRowClassName",required:!1,type:{name:"((record: T) => Argument)"}}}}}catch{}export{G as T,pt as _,un as a,tn as b,nn as c,pn as d,fn as e,ln as f,rn as g,an as h,cn as i,dn as j,sn as k,on as l,gn as m,mn as n,bn as o,xn as p,hn as s,_n as u};

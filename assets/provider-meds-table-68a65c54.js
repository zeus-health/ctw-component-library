import{r as l,R as A,a as Jo}from"./index-6f814c40.js";import{a as ei,u as ti,M as ni}from"./use-medications-1cb4f897.js";import{w as ri}from"./error-boundary-4d330a54.js";import{p as T}from"./index-4d501b15.js";import{c as Je}from"./index-74f03c09.js";import{_ as I}from"./extends-98964cd2.js";import{r as Qn,R as ai}from"./index-6de6b113.js";import{u as oi}from"./patient-helper-55dd9545.js";import{C as Vt,y as Kt,L as ii,q as si,u as $a,p as wn,$ as Gt,I as Zn,l as Ea,o as ie,S as $r,i as ci,a as ht,k as xn,v as li,N as ui,j as U,r as fi,D as di,T as Er,x as ka,w as mi}from"./use-watch-c090a07f.js";import{s as pi,F as vi,a as J,x as bi}from"./calculate-active-index-dd804c80.js";import{n as gi}from"./drawer-ae5dfefa.js";import"./_baseToString-ba0098b0.js";import{c as Sa}from"./sortBy-64fcb484.js";import"./_baseClone-0c3bfcab.js";import"./sortBy-3860efd7.js";import{b as hi}from"./_equalByTag-3aa7c076.js";import"./_baseForOwn-56487e0e.js";import{u as Ca}from"./uniq-f1be3f26.js";import"./_createSet-3c80ad01.js";import{a as yi,s as wi}from"./medication-history-c53f21d0.js";import{f as xi,g as $i,t as Ei,i as kr}from"./values-4e3b2a32.js";var ki=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(ki||{}),Si=(e=>(e[e.Pointer=0]="Pointer",e[e.Other=1]="Other",e))(Si||{}),Ci=(e=>(e[e.OpenMenu=0]="OpenMenu",e[e.CloseMenu=1]="CloseMenu",e[e.GoToItem=2]="GoToItem",e[e.Search=3]="Search",e[e.ClearSearch=4]="ClearSearch",e[e.RegisterItem=5]="RegisterItem",e[e.UnregisterItem=6]="UnregisterItem",e))(Ci||{});function sn(e,t=n=>n){let n=e.activeItemIndex!==null?e.items[e.activeItemIndex]:null,r=mi(t(e.items.slice()),o=>o.dataRef.current.domRef.current),a=n?r.indexOf(n):null;return a===-1&&(a=null),{items:r,activeItemIndex:a}}let Ai={[1](e){return e.menuState===1?e:{...e,activeItemIndex:null,menuState:1}},[0](e){return e.menuState===0?e:{...e,menuState:0}},[2]:(e,t)=>{var n;let r=sn(e),a=bi(t,{resolveItems:()=>r.items,resolveActiveIndex:()=>r.activeItemIndex,resolveId:o=>o.id,resolveDisabled:o=>o.dataRef.current.disabled});return{...e,...r,searchQuery:"",activeItemIndex:a,activationTrigger:(n=t.trigger)!=null?n:1}},[3]:(e,t)=>{let n=e.searchQuery!==""?0:1,r=e.searchQuery+t.value.toLowerCase(),a=(e.activeItemIndex!==null?e.items.slice(e.activeItemIndex+n).concat(e.items.slice(0,e.activeItemIndex+n)):e.items).find(s=>{var i;return((i=s.dataRef.current.textValue)==null?void 0:i.startsWith(r))&&!s.dataRef.current.disabled}),o=a?e.items.indexOf(a):-1;return o===-1||o===e.activeItemIndex?{...e,searchQuery:r}:{...e,searchQuery:r,activeItemIndex:o,activationTrigger:1}},[4](e){return e.searchQuery===""?e:{...e,searchQuery:"",searchActiveItemIndex:null}},[5]:(e,t)=>{let n=sn(e,r=>[...r,{id:t.id,dataRef:t.dataRef}]);return{...e,...n}},[6]:(e,t)=>{let n=sn(e,r=>{let a=r.findIndex(o=>o.id===t.id);return a!==-1&&r.splice(a,1),r});return{...e,...n,activationTrigger:1}}},Jn=l.createContext(null);Jn.displayName="MenuContext";function Xt(e){let t=l.useContext(Jn);if(t===null){let n=new Error(`<${e} /> is missing a parent <Menu /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(n,Xt),n}return t}function Pi(e,t){return $a(t.type,Ai,e,t)}let Oi=l.Fragment,Ri=Vt(function(e,t){let n=l.useReducer(Pi,{menuState:1,buttonRef:l.createRef(),itemsRef:l.createRef(),items:[],searchQuery:"",activeItemIndex:null,activationTrigger:1}),[{menuState:r,itemsRef:a,buttonRef:o},s]=n,i=Kt(t);ii([o,a],(u,p)=>{var m;s({type:1}),li(p,ui.Loose)||(u.preventDefault(),(m=o.current)==null||m.focus())},r===0);let c=l.useMemo(()=>({open:r===0}),[r]),d=e,f={ref:i};return A.createElement(Jn.Provider,{value:n},A.createElement(si,{value:$a(r,{[0]:wn.Open,[1]:wn.Closed})},Gt({ourProps:f,theirProps:d,slot:c,defaultTag:Oi,name:"Menu"})))}),Ti="button",Ii=Vt(function(e,t){var n;let[r,a]=Xt("Menu.Button"),o=Kt(r.buttonRef,t),s=`headlessui-menu-button-${Zn()}`,i=Ea(),c=ie(b=>{switch(b.key){case U.Space:case U.Enter:case U.ArrowDown:b.preventDefault(),b.stopPropagation(),a({type:0}),i.nextFrame(()=>a({type:2,focus:J.First}));break;case U.ArrowUp:b.preventDefault(),b.stopPropagation(),a({type:0}),i.nextFrame(()=>a({type:2,focus:J.Last}));break}}),d=ie(b=>{switch(b.key){case U.Space:b.preventDefault();break}}),f=ie(b=>{if(fi(b.currentTarget))return b.preventDefault();e.disabled||(r.menuState===0?(a({type:1}),i.nextFrame(()=>{var v;return(v=r.buttonRef.current)==null?void 0:v.focus({preventScroll:!0})})):(b.preventDefault(),a({type:0})))}),u=l.useMemo(()=>({open:r.menuState===0}),[r]),p=e,m={ref:o,id:s,type:pi(e,r.buttonRef),"aria-haspopup":!0,"aria-controls":(n=r.itemsRef.current)==null?void 0:n.id,"aria-expanded":e.disabled?void 0:r.menuState===0,onKeyDown:c,onKeyUp:d,onClick:f};return Gt({ourProps:m,theirProps:p,slot:u,defaultTag:Ti,name:"Menu.Button"})}),_i="div",Mi=$r.RenderStrategy|$r.Static,Ni=Vt(function(e,t){var n,r;let[a,o]=Xt("Menu.Items"),s=Kt(a.itemsRef,t),i=gi(a.itemsRef),c=`headlessui-menu-items-${Zn()}`,d=Ea(),f=ci(),u=(()=>f!==null?f===wn.Open:a.menuState===0)();l.useEffect(()=>{let g=a.itemsRef.current;!g||a.menuState===0&&g!==(i==null?void 0:i.activeElement)&&g.focus({preventScroll:!0})},[a.menuState,a.itemsRef,i]),vi({container:a.itemsRef.current,enabled:a.menuState===0,accept(g){return g.getAttribute("role")==="menuitem"?NodeFilter.FILTER_REJECT:g.hasAttribute("role")?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT},walk(g){g.setAttribute("role","none")}});let p=ie(g=>{var y,w;switch(d.dispose(),g.key){case U.Space:if(a.searchQuery!=="")return g.preventDefault(),g.stopPropagation(),o({type:3,value:g.key});case U.Enter:if(g.preventDefault(),g.stopPropagation(),o({type:1}),a.activeItemIndex!==null){let{dataRef:x}=a.items[a.activeItemIndex];(w=(y=x.current)==null?void 0:y.domRef.current)==null||w.click()}ka(a.buttonRef.current);break;case U.ArrowDown:return g.preventDefault(),g.stopPropagation(),o({type:2,focus:J.Next});case U.ArrowUp:return g.preventDefault(),g.stopPropagation(),o({type:2,focus:J.Previous});case U.Home:case U.PageUp:return g.preventDefault(),g.stopPropagation(),o({type:2,focus:J.First});case U.End:case U.PageDown:return g.preventDefault(),g.stopPropagation(),o({type:2,focus:J.Last});case U.Escape:g.preventDefault(),g.stopPropagation(),o({type:1}),xn().nextFrame(()=>{var x;return(x=a.buttonRef.current)==null?void 0:x.focus({preventScroll:!0})});break;case U.Tab:g.preventDefault(),g.stopPropagation(),o({type:1}),xn().nextFrame(()=>{di(a.buttonRef.current,g.shiftKey?Er.Previous:Er.Next)});break;default:g.key.length===1&&(o({type:3,value:g.key}),d.setTimeout(()=>o({type:4}),350));break}}),m=ie(g=>{switch(g.key){case U.Space:g.preventDefault();break}}),b=l.useMemo(()=>({open:a.menuState===0}),[a]),v=e,h={"aria-activedescendant":a.activeItemIndex===null||(n=a.items[a.activeItemIndex])==null?void 0:n.id,"aria-labelledby":(r=a.buttonRef.current)==null?void 0:r.id,id:c,onKeyDown:p,onKeyUp:m,role:"menu",tabIndex:0,ref:s};return Gt({ourProps:h,theirProps:v,slot:b,defaultTag:_i,features:Mi,visible:u,name:"Menu.Items"})}),Di=l.Fragment,Li=Vt(function(e,t){let{disabled:n=!1,...r}=e,[a,o]=Xt("Menu.Item"),s=`headlessui-menu-item-${Zn()}`,i=a.activeItemIndex!==null?a.items[a.activeItemIndex].id===s:!1,c=l.useRef(null),d=Kt(t,c);ht(()=>{if(a.menuState!==0||!i||a.activationTrigger===0)return;let h=xn();return h.requestAnimationFrame(()=>{var g,y;(y=(g=c.current)==null?void 0:g.scrollIntoView)==null||y.call(g,{block:"nearest"})}),h.dispose},[c,i,a.menuState,a.activationTrigger,a.activeItemIndex]);let f=l.useRef({disabled:n,domRef:c});ht(()=>{f.current.disabled=n},[f,n]),ht(()=>{var h,g;f.current.textValue=(g=(h=c.current)==null?void 0:h.textContent)==null?void 0:g.toLowerCase()},[f,c]),ht(()=>(o({type:5,id:s,dataRef:f}),()=>o({type:6,id:s})),[f,s]);let u=ie(h=>{if(n)return h.preventDefault();o({type:1}),ka(a.buttonRef.current)}),p=ie(()=>{if(n)return o({type:2,focus:J.Nothing});o({type:2,focus:J.Specific,id:s})}),m=ie(()=>{n||i||o({type:2,focus:J.Specific,id:s,trigger:0})}),b=ie(()=>{n||!i||o({type:2,focus:J.Nothing})}),v=l.useMemo(()=>({active:i,disabled:n}),[i,n]);return Gt({ourProps:{id:s,ref:d,role:"menuitem",tabIndex:n===!0?void 0:-1,"aria-disabled":n===!0?!0:void 0,disabled:void 0,onClick:u,onFocus:p,onPointerMove:m,onMouseMove:m,onPointerLeave:b,onMouseLeave:b},theirProps:r,slot:v,defaultTag:Di,name:"Menu.Item"})}),Fi=Object.assign(Ri,{Button:Ii,Items:Ni,Item:Li});var ud={prefix:"fas",iconName:"clipboard-list",icon:[384,512,[],"f46d","M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM72 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm104-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16zM72 368a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm88 0c0-8.8 7.2-16 16-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16z"]},fd={prefix:"fas",iconName:"user",icon:[448,512,[128100,62144],"f007","M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"]},zi={prefix:"fas",iconName:"arrows-rotate",icon:[512,512,[128472,"refresh","sync"],"f021","M89.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L370.3 160H320c-17.7 0-32 14.3-32 32s14.3 32 32 32H447.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L398.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C57.2 122 39.6 150.7 28.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM23 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L109.6 352H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H32.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"]},dd=zi,md={prefix:"fas",iconName:"clipboard-check",icon:[384,512,[],"f46c","M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM305 273L177 401c-9.4 9.4-24.6 9.4-33.9 0L79 337c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L271 239c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"]},pd={prefix:"fas",iconName:"eye",icon:[576,512,[128065],"f06e","M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"]},vd={prefix:"fas",iconName:"trash",icon:[448,512,[],"f1f8","M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"]},ji={prefix:"fas",iconName:"chevron-down",icon:[448,512,[],"f078","M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"]},bd={prefix:"fas",iconName:"plus",icon:[448,512,[10133,61543,"add"],"2b","M240 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H176V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H240V80z"]},Hi={prefix:"fas",iconName:"check",icon:[512,512,[10003,10004],"f00c","M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"]},gd={prefix:"fas",iconName:"x",icon:[384,512,[120],"58","M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"]};function Sr(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),n.push.apply(n,r)}return n}function $(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Sr(Object(n),!0).forEach(function(r){z(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Sr(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function Lt(e){return Lt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Lt(e)}function Ui(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function Cr(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function Wi(e,t,n){return t&&Cr(e.prototype,t),n&&Cr(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function z(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function er(e,t){return Bi(e)||Ki(e,t)||Aa(e,t)||Xi()}function ut(e){return Yi(e)||Vi(e)||Aa(e)||Gi()}function Yi(e){if(Array.isArray(e))return $n(e)}function Bi(e){if(Array.isArray(e))return e}function Vi(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Ki(e,t){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var r=[],a=!0,o=!1,s,i;try{for(n=n.call(e);!(a=(s=n.next()).done)&&(r.push(s.value),!(t&&r.length===t));a=!0);}catch(c){o=!0,i=c}finally{try{!a&&n.return!=null&&n.return()}finally{if(o)throw i}}return r}}function Aa(e,t){if(e){if(typeof e=="string")return $n(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return $n(e,t)}}function $n(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function Gi(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Xi(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var Ar=function(){},tr={},Pa={},Oa=null,Ra={mark:Ar,measure:Ar};try{typeof window<"u"&&(tr=window),typeof document<"u"&&(Pa=document),typeof MutationObserver<"u"&&(Oa=MutationObserver),typeof performance<"u"&&(Ra=performance)}catch{}var qi=tr.navigator||{},Pr=qi.userAgent,Or=Pr===void 0?"":Pr,ye=tr,N=Pa,Rr=Oa,yt=Ra;ye.document;var de=!!N.documentElement&&!!N.head&&typeof N.addEventListener=="function"&&typeof N.createElement=="function",Ta=~Or.indexOf("MSIE")||~Or.indexOf("Trident/"),wt,xt,$t,Et,kt,le="___FONT_AWESOME___",En=16,Ia="fa",_a="svg-inline--fa",Pe="data-fa-i2svg",kn="data-fa-pseudo-element",Qi="data-fa-pseudo-element-pending",nr="data-prefix",rr="data-icon",Tr="fontawesome-i2svg",Zi="async",Ji=["HTML","HEAD","STYLE","SCRIPT"],Ma=function(){try{return!0}catch{return!1}}(),M="classic",F="sharp",ar=[M,F];function ft(e){return new Proxy(e,{get:function(n,r){return r in n?n[r]:n[M]}})}var rt=ft((wt={},z(wt,M,{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands",fak:"kit","fa-kit":"kit"}),z(wt,F,{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular"}),wt)),at=ft((xt={},z(xt,M,{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab",kit:"fak"}),z(xt,F,{solid:"fass",regular:"fasr"}),xt)),ot=ft(($t={},z($t,M,{fab:"fa-brands",fad:"fa-duotone",fak:"fa-kit",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"}),z($t,F,{fass:"fa-solid",fasr:"fa-regular"}),$t)),es=ft((Et={},z(Et,M,{"fa-brands":"fab","fa-duotone":"fad","fa-kit":"fak","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"}),z(Et,F,{"fa-solid":"fass","fa-regular":"fasr"}),Et)),ts=/fa(s|r|l|t|d|b|k|ss|sr)?[\-\ ]/,Na="fa-layers-text",ns=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,rs=ft((kt={},z(kt,M,{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"}),z(kt,F,{900:"fass",400:"fasr"}),kt)),Da=[1,2,3,4,5,6,7,8,9,10],as=Da.concat([11,12,13,14,15,16,17,18,19,20]),os=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],Ce={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},it=new Set;Object.keys(at[M]).map(it.add.bind(it));Object.keys(at[F]).map(it.add.bind(it));var is=[].concat(ar,ut(it),["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",Ce.GROUP,Ce.SWAP_OPACITY,Ce.PRIMARY,Ce.SECONDARY]).concat(Da.map(function(e){return"".concat(e,"x")})).concat(as.map(function(e){return"w-".concat(e)})),et=ye.FontAwesomeConfig||{};function ss(e){var t=N.querySelector("script["+e+"]");if(t)return t.getAttribute(e)}function cs(e){return e===""?!0:e==="false"?!1:e==="true"?!0:e}if(N&&typeof N.querySelector=="function"){var ls=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];ls.forEach(function(e){var t=er(e,2),n=t[0],r=t[1],a=cs(ss(n));a!=null&&(et[r]=a)})}var La={styleDefault:"solid",familyDefault:"classic",cssPrefix:Ia,replacementClass:_a,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};et.familyPrefix&&(et.cssPrefix=et.familyPrefix);var Be=$($({},La),et);Be.autoReplaceSvg||(Be.observeMutations=!1);var E={};Object.keys(La).forEach(function(e){Object.defineProperty(E,e,{enumerable:!0,set:function(n){Be[e]=n,tt.forEach(function(r){return r(E)})},get:function(){return Be[e]}})});Object.defineProperty(E,"familyPrefix",{enumerable:!0,set:function(t){Be.cssPrefix=t,tt.forEach(function(n){return n(E)})},get:function(){return Be.cssPrefix}});ye.FontAwesomeConfig=E;var tt=[];function us(e){return tt.push(e),function(){tt.splice(tt.indexOf(e),1)}}var pe=En,ee={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function fs(e){if(!(!e||!de)){var t=N.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=e;for(var n=N.head.childNodes,r=null,a=n.length-1;a>-1;a--){var o=n[a],s=(o.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(s)>-1&&(r=o)}return N.head.insertBefore(t,r),e}}var ds="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function st(){for(var e=12,t="";e-- >0;)t+=ds[Math.random()*62|0];return t}function Ve(e){for(var t=[],n=(e||[]).length>>>0;n--;)t[n]=e[n];return t}function or(e){return e.classList?Ve(e.classList):(e.getAttribute("class")||"").split(" ").filter(function(t){return t})}function Fa(e){return"".concat(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function ms(e){return Object.keys(e||{}).reduce(function(t,n){return t+"".concat(n,'="').concat(Fa(e[n]),'" ')},"").trim()}function qt(e){return Object.keys(e||{}).reduce(function(t,n){return t+"".concat(n,": ").concat(e[n].trim(),";")},"")}function ir(e){return e.size!==ee.size||e.x!==ee.x||e.y!==ee.y||e.rotate!==ee.rotate||e.flipX||e.flipY}function ps(e){var t=e.transform,n=e.containerWidth,r=e.iconWidth,a={transform:"translate(".concat(n/2," 256)")},o="translate(".concat(t.x*32,", ").concat(t.y*32,") "),s="scale(".concat(t.size/16*(t.flipX?-1:1),", ").concat(t.size/16*(t.flipY?-1:1),") "),i="rotate(".concat(t.rotate," 0 0)"),c={transform:"".concat(o," ").concat(s," ").concat(i)},d={transform:"translate(".concat(r/2*-1," -256)")};return{outer:a,inner:c,path:d}}function vs(e){var t=e.transform,n=e.width,r=n===void 0?En:n,a=e.height,o=a===void 0?En:a,s=e.startCentered,i=s===void 0?!1:s,c="";return i&&Ta?c+="translate(".concat(t.x/pe-r/2,"em, ").concat(t.y/pe-o/2,"em) "):i?c+="translate(calc(-50% + ".concat(t.x/pe,"em), calc(-50% + ").concat(t.y/pe,"em)) "):c+="translate(".concat(t.x/pe,"em, ").concat(t.y/pe,"em) "),c+="scale(".concat(t.size/pe*(t.flipX?-1:1),", ").concat(t.size/pe*(t.flipY?-1:1),") "),c+="rotate(".concat(t.rotate,"deg) "),c}var bs=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-counter-scale, 0.25));
          transform: scale(var(--fa-counter-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(var(--fa-li-width, 2em) * -1);
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  -webkit-animation-name: fa-beat;
          animation-name: fa-beat;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  -webkit-animation-name: fa-bounce;
          animation-name: fa-bounce;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  -webkit-animation-name: fa-fade;
          animation-name: fa-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  -webkit-animation-name: fa-beat-fade;
          animation-name: fa-beat-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  -webkit-animation-name: fa-flip;
          animation-name: fa-flip;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  -webkit-animation-name: fa-shake;
          animation-name: fa-shake;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 2s);
          animation-duration: var(--fa-animation-duration, 2s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));
          animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    -webkit-animation-delay: -1ms;
            animation-delay: -1ms;
    -webkit-animation-duration: 1ms;
            animation-duration: 1ms;
    -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
    -webkit-transition-delay: 0s;
            transition-delay: 0s;
    -webkit-transition-duration: 0s;
            transition-duration: 0s;
  }
}
@-webkit-keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@-webkit-keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@-webkit-keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@-webkit-keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@-webkit-keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@-webkit-keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

.fa-rotate-by {
  -webkit-transform: rotate(var(--fa-rotate-angle, none));
          transform: rotate(var(--fa-rotate-angle, none));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;function za(){var e=Ia,t=_a,n=E.cssPrefix,r=E.replacementClass,a=bs;if(n!==e||r!==t){var o=new RegExp("\\.".concat(e,"\\-"),"g"),s=new RegExp("\\--".concat(e,"\\-"),"g"),i=new RegExp("\\.".concat(t),"g");a=a.replace(o,".".concat(n,"-")).replace(s,"--".concat(n,"-")).replace(i,".".concat(r))}return a}var Ir=!1;function cn(){E.autoAddCss&&!Ir&&(fs(za()),Ir=!0)}var gs={mixout:function(){return{dom:{css:za,insertCss:cn}}},hooks:function(){return{beforeDOMElementCreation:function(){cn()},beforeI2svg:function(){cn()}}}},ue=ye||{};ue[le]||(ue[le]={});ue[le].styles||(ue[le].styles={});ue[le].hooks||(ue[le].hooks={});ue[le].shims||(ue[le].shims=[]);var q=ue[le],ja=[],hs=function e(){N.removeEventListener("DOMContentLoaded",e),Ft=1,ja.map(function(t){return t()})},Ft=!1;de&&(Ft=(N.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(N.readyState),Ft||N.addEventListener("DOMContentLoaded",hs));function ys(e){de&&(Ft?setTimeout(e,0):ja.push(e))}function dt(e){var t=e.tag,n=e.attributes,r=n===void 0?{}:n,a=e.children,o=a===void 0?[]:a;return typeof e=="string"?Fa(e):"<".concat(t," ").concat(ms(r),">").concat(o.map(dt).join(""),"</").concat(t,">")}function _r(e,t,n){if(e&&e[t]&&e[t][n])return{prefix:t,iconName:n,icon:e[t][n]}}var ws=function(t,n){return function(r,a,o,s){return t.call(n,r,a,o,s)}},ln=function(t,n,r,a){var o=Object.keys(t),s=o.length,i=a!==void 0?ws(n,a):n,c,d,f;for(r===void 0?(c=1,f=t[o[0]]):(c=0,f=r);c<s;c++)d=o[c],f=i(f,t[d],d,t);return f};function xs(e){for(var t=[],n=0,r=e.length;n<r;){var a=e.charCodeAt(n++);if(a>=55296&&a<=56319&&n<r){var o=e.charCodeAt(n++);(o&64512)==56320?t.push(((a&1023)<<10)+(o&1023)+65536):(t.push(a),n--)}else t.push(a)}return t}function Sn(e){var t=xs(e);return t.length===1?t[0].toString(16):null}function $s(e,t){var n=e.length,r=e.charCodeAt(t),a;return r>=55296&&r<=56319&&n>t+1&&(a=e.charCodeAt(t+1),a>=56320&&a<=57343)?(r-55296)*1024+a-56320+65536:r}function Mr(e){return Object.keys(e).reduce(function(t,n){var r=e[n],a=!!r.icon;return a?t[r.iconName]=r.icon:t[n]=r,t},{})}function Cn(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=n.skipHooks,a=r===void 0?!1:r,o=Mr(t);typeof q.hooks.addPack=="function"&&!a?q.hooks.addPack(e,Mr(t)):q.styles[e]=$($({},q.styles[e]||{}),o),e==="fas"&&Cn("fa",t)}var St,Ct,At,He=q.styles,Es=q.shims,ks=(St={},z(St,M,Object.values(ot[M])),z(St,F,Object.values(ot[F])),St),sr=null,Ha={},Ua={},Wa={},Ya={},Ba={},Ss=(Ct={},z(Ct,M,Object.keys(rt[M])),z(Ct,F,Object.keys(rt[F])),Ct);function Cs(e){return~is.indexOf(e)}function As(e,t){var n=t.split("-"),r=n[0],a=n.slice(1).join("-");return r===e&&a!==""&&!Cs(a)?a:null}var Va=function(){var t=function(o){return ln(He,function(s,i,c){return s[c]=ln(i,o,{}),s},{})};Ha=t(function(a,o,s){if(o[3]&&(a[o[3]]=s),o[2]){var i=o[2].filter(function(c){return typeof c=="number"});i.forEach(function(c){a[c.toString(16)]=s})}return a}),Ua=t(function(a,o,s){if(a[s]=s,o[2]){var i=o[2].filter(function(c){return typeof c=="string"});i.forEach(function(c){a[c]=s})}return a}),Ba=t(function(a,o,s){var i=o[2];return a[s]=s,i.forEach(function(c){a[c]=s}),a});var n="far"in He||E.autoFetchSvg,r=ln(Es,function(a,o){var s=o[0],i=o[1],c=o[2];return i==="far"&&!n&&(i="fas"),typeof s=="string"&&(a.names[s]={prefix:i,iconName:c}),typeof s=="number"&&(a.unicodes[s.toString(16)]={prefix:i,iconName:c}),a},{names:{},unicodes:{}});Wa=r.names,Ya=r.unicodes,sr=Qt(E.styleDefault,{family:E.familyDefault})};us(function(e){sr=Qt(e.styleDefault,{family:E.familyDefault})});Va();function cr(e,t){return(Ha[e]||{})[t]}function Ps(e,t){return(Ua[e]||{})[t]}function Ae(e,t){return(Ba[e]||{})[t]}function Ka(e){return Wa[e]||{prefix:null,iconName:null}}function Os(e){var t=Ya[e],n=cr("fas",e);return t||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function we(){return sr}var lr=function(){return{prefix:null,iconName:null,rest:[]}};function Qt(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.family,r=n===void 0?M:n,a=rt[r][e],o=at[r][e]||at[r][a],s=e in q.styles?e:null;return o||s||null}var Nr=(At={},z(At,M,Object.keys(ot[M])),z(At,F,Object.keys(ot[F])),At);function Zt(e){var t,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.skipLookups,a=r===void 0?!1:r,o=(t={},z(t,M,"".concat(E.cssPrefix,"-").concat(M)),z(t,F,"".concat(E.cssPrefix,"-").concat(F)),t),s=null,i=M;(e.includes(o[M])||e.some(function(d){return Nr[M].includes(d)}))&&(i=M),(e.includes(o[F])||e.some(function(d){return Nr[F].includes(d)}))&&(i=F);var c=e.reduce(function(d,f){var u=As(E.cssPrefix,f);if(He[f]?(f=ks[i].includes(f)?es[i][f]:f,s=f,d.prefix=f):Ss[i].indexOf(f)>-1?(s=f,d.prefix=Qt(f,{family:i})):u?d.iconName=u:f!==E.replacementClass&&f!==o[M]&&f!==o[F]&&d.rest.push(f),!a&&d.prefix&&d.iconName){var p=s==="fa"?Ka(d.iconName):{},m=Ae(d.prefix,d.iconName);p.prefix&&(s=null),d.iconName=p.iconName||m||d.iconName,d.prefix=p.prefix||d.prefix,d.prefix==="far"&&!He.far&&He.fas&&!E.autoFetchSvg&&(d.prefix="fas")}return d},lr());return(e.includes("fa-brands")||e.includes("fab"))&&(c.prefix="fab"),(e.includes("fa-duotone")||e.includes("fad"))&&(c.prefix="fad"),!c.prefix&&i===F&&(He.fass||E.autoFetchSvg)&&(c.prefix="fass",c.iconName=Ae(c.prefix,c.iconName)||c.iconName),(c.prefix==="fa"||s==="fa")&&(c.prefix=we()||"fas"),c}var Rs=function(){function e(){Ui(this,e),this.definitions={}}return Wi(e,[{key:"add",value:function(){for(var n=this,r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];var s=a.reduce(this._pullDefinitions,{});Object.keys(s).forEach(function(i){n.definitions[i]=$($({},n.definitions[i]||{}),s[i]),Cn(i,s[i]);var c=ot[M][i];c&&Cn(c,s[i]),Va()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(n,r){var a=r.prefix&&r.iconName&&r.icon?{0:r}:r;return Object.keys(a).map(function(o){var s=a[o],i=s.prefix,c=s.iconName,d=s.icon,f=d[2];n[i]||(n[i]={}),f.length>0&&f.forEach(function(u){typeof u=="string"&&(n[i][u]=d)}),n[i][c]=d}),n}}]),e}(),Dr=[],Ue={},Ye={},Ts=Object.keys(Ye);function Is(e,t){var n=t.mixoutsTo;return Dr=e,Ue={},Object.keys(Ye).forEach(function(r){Ts.indexOf(r)===-1&&delete Ye[r]}),Dr.forEach(function(r){var a=r.mixout?r.mixout():{};if(Object.keys(a).forEach(function(s){typeof a[s]=="function"&&(n[s]=a[s]),Lt(a[s])==="object"&&Object.keys(a[s]).forEach(function(i){n[s]||(n[s]={}),n[s][i]=a[s][i]})}),r.hooks){var o=r.hooks();Object.keys(o).forEach(function(s){Ue[s]||(Ue[s]=[]),Ue[s].push(o[s])})}r.provides&&r.provides(Ye)}),n}function An(e,t){for(var n=arguments.length,r=new Array(n>2?n-2:0),a=2;a<n;a++)r[a-2]=arguments[a];var o=Ue[e]||[];return o.forEach(function(s){t=s.apply(null,[t].concat(r))}),t}function Oe(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var a=Ue[e]||[];a.forEach(function(o){o.apply(null,n)})}function fe(){var e=arguments[0],t=Array.prototype.slice.call(arguments,1);return Ye[e]?Ye[e].apply(null,t):void 0}function Pn(e){e.prefix==="fa"&&(e.prefix="fas");var t=e.iconName,n=e.prefix||we();if(t)return t=Ae(n,t)||t,_r(Ga.definitions,n,t)||_r(q.styles,n,t)}var Ga=new Rs,_s=function(){E.autoReplaceSvg=!1,E.observeMutations=!1,Oe("noAuto")},Ms={i2svg:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return de?(Oe("beforeI2svg",t),fe("pseudoElements2svg",t),fe("i2svg",t)):Promise.reject("Operation requires a DOM of some kind.")},watch:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=t.autoReplaceSvgRoot;E.autoReplaceSvg===!1&&(E.autoReplaceSvg=!0),E.observeMutations=!0,ys(function(){Ds({autoReplaceSvgRoot:n}),Oe("watch",t)})}},Ns={icon:function(t){if(t===null)return null;if(Lt(t)==="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:Ae(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){var n=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],r=Qt(t[0]);return{prefix:r,iconName:Ae(r,n)||n}}if(typeof t=="string"&&(t.indexOf("".concat(E.cssPrefix,"-"))>-1||t.match(ts))){var a=Zt(t.split(" "),{skipLookups:!0});return{prefix:a.prefix||we(),iconName:Ae(a.prefix,a.iconName)||a.iconName}}if(typeof t=="string"){var o=we();return{prefix:o,iconName:Ae(o,t)||t}}}},B={noAuto:_s,config:E,dom:Ms,parse:Ns,library:Ga,findIconDefinition:Pn,toHtml:dt},Ds=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=t.autoReplaceSvgRoot,r=n===void 0?N:n;(Object.keys(q.styles).length>0||E.autoFetchSvg)&&de&&E.autoReplaceSvg&&B.dom.i2svg({node:r})};function Jt(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(function(r){return dt(r)})}}),Object.defineProperty(e,"node",{get:function(){if(de){var r=N.createElement("div");return r.innerHTML=e.html,r.children}}}),e}function Ls(e){var t=e.children,n=e.main,r=e.mask,a=e.attributes,o=e.styles,s=e.transform;if(ir(s)&&n.found&&!r.found){var i=n.width,c=n.height,d={x:i/c/2,y:.5};a.style=qt($($({},o),{},{"transform-origin":"".concat(d.x+s.x/16,"em ").concat(d.y+s.y/16,"em")}))}return[{tag:"svg",attributes:a,children:t}]}function Fs(e){var t=e.prefix,n=e.iconName,r=e.children,a=e.attributes,o=e.symbol,s=o===!0?"".concat(t,"-").concat(E.cssPrefix,"-").concat(n):o;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:$($({},a),{},{id:s}),children:r}]}]}function ur(e){var t=e.icons,n=t.main,r=t.mask,a=e.prefix,o=e.iconName,s=e.transform,i=e.symbol,c=e.title,d=e.maskId,f=e.titleId,u=e.extra,p=e.watchable,m=p===void 0?!1:p,b=r.found?r:n,v=b.width,h=b.height,g=a==="fak",y=[E.replacementClass,o?"".concat(E.cssPrefix,"-").concat(o):""].filter(function(O){return u.classes.indexOf(O)===-1}).filter(function(O){return O!==""||!!O}).concat(u.classes).join(" "),w={children:[],attributes:$($({},u.attributes),{},{"data-prefix":a,"data-icon":o,class:y,role:u.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(v," ").concat(h)})},x=g&&!~u.classes.indexOf("fa-fw")?{width:"".concat(v/h*16*.0625,"em")}:{};m&&(w.attributes[Pe]=""),c&&(w.children.push({tag:"title",attributes:{id:w.attributes["aria-labelledby"]||"title-".concat(f||st())},children:[c]}),delete w.attributes.title);var k=$($({},w),{},{prefix:a,iconName:o,main:n,mask:r,maskId:d,transform:s,symbol:i,styles:$($({},x),u.styles)}),R=r.found&&n.found?fe("generateAbstractMask",k)||{children:[],attributes:{}}:fe("generateAbstractIcon",k)||{children:[],attributes:{}},C=R.children,S=R.attributes;return k.children=C,k.attributes=S,i?Fs(k):Ls(k)}function Lr(e){var t=e.content,n=e.width,r=e.height,a=e.transform,o=e.title,s=e.extra,i=e.watchable,c=i===void 0?!1:i,d=$($($({},s.attributes),o?{title:o}:{}),{},{class:s.classes.join(" ")});c&&(d[Pe]="");var f=$({},s.styles);ir(a)&&(f.transform=vs({transform:a,startCentered:!0,width:n,height:r}),f["-webkit-transform"]=f.transform);var u=qt(f);u.length>0&&(d.style=u);var p=[];return p.push({tag:"span",attributes:d,children:[t]}),o&&p.push({tag:"span",attributes:{class:"sr-only"},children:[o]}),p}function zs(e){var t=e.content,n=e.title,r=e.extra,a=$($($({},r.attributes),n?{title:n}:{}),{},{class:r.classes.join(" ")}),o=qt(r.styles);o.length>0&&(a.style=o);var s=[];return s.push({tag:"span",attributes:a,children:[t]}),n&&s.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),s}var un=q.styles;function On(e){var t=e[0],n=e[1],r=e.slice(4),a=er(r,1),o=a[0],s=null;return Array.isArray(o)?s={tag:"g",attributes:{class:"".concat(E.cssPrefix,"-").concat(Ce.GROUP)},children:[{tag:"path",attributes:{class:"".concat(E.cssPrefix,"-").concat(Ce.SECONDARY),fill:"currentColor",d:o[0]}},{tag:"path",attributes:{class:"".concat(E.cssPrefix,"-").concat(Ce.PRIMARY),fill:"currentColor",d:o[1]}}]}:s={tag:"path",attributes:{fill:"currentColor",d:o}},{found:!0,width:t,height:n,icon:s}}var js={found:!1,width:512,height:512};function Hs(e,t){!Ma&&!E.showMissingIcons&&e&&console.error('Icon with name "'.concat(e,'" and prefix "').concat(t,'" is missing.'))}function Rn(e,t){var n=t;return t==="fa"&&E.styleDefault!==null&&(t=we()),new Promise(function(r,a){if(fe("missingIconAbstract"),n==="fa"){var o=Ka(e)||{};e=o.iconName||e,t=o.prefix||t}if(e&&t&&un[t]&&un[t][e]){var s=un[t][e];return r(On(s))}Hs(e,t),r($($({},js),{},{icon:E.showMissingIcons&&e?fe("missingIconAbstract")||{}:{}}))})}var Fr=function(){},Tn=E.measurePerformance&&yt&&yt.mark&&yt.measure?yt:{mark:Fr,measure:Fr},Ze='FA "6.3.0"',Us=function(t){return Tn.mark("".concat(Ze," ").concat(t," begins")),function(){return Xa(t)}},Xa=function(t){Tn.mark("".concat(Ze," ").concat(t," ends")),Tn.measure("".concat(Ze," ").concat(t),"".concat(Ze," ").concat(t," begins"),"".concat(Ze," ").concat(t," ends"))},fr={begin:Us,end:Xa},_t=function(){};function zr(e){var t=e.getAttribute?e.getAttribute(Pe):null;return typeof t=="string"}function Ws(e){var t=e.getAttribute?e.getAttribute(nr):null,n=e.getAttribute?e.getAttribute(rr):null;return t&&n}function Ys(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(E.replacementClass)}function Bs(){if(E.autoReplaceSvg===!0)return Mt.replace;var e=Mt[E.autoReplaceSvg];return e||Mt.replace}function Vs(e){return N.createElementNS("http://www.w3.org/2000/svg",e)}function Ks(e){return N.createElement(e)}function qa(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.ceFn,r=n===void 0?e.tag==="svg"?Vs:Ks:n;if(typeof e=="string")return N.createTextNode(e);var a=r(e.tag);Object.keys(e.attributes||[]).forEach(function(s){a.setAttribute(s,e.attributes[s])});var o=e.children||[];return o.forEach(function(s){a.appendChild(qa(s,{ceFn:r}))}),a}function Gs(e){var t=" ".concat(e.outerHTML," ");return t="".concat(t,"Font Awesome fontawesome.com "),t}var Mt={replace:function(t){var n=t[0];if(n.parentNode)if(t[1].forEach(function(a){n.parentNode.insertBefore(qa(a),n)}),n.getAttribute(Pe)===null&&E.keepOriginalSource){var r=N.createComment(Gs(n));n.parentNode.replaceChild(r,n)}else n.remove()},nest:function(t){var n=t[0],r=t[1];if(~or(n).indexOf(E.replacementClass))return Mt.replace(t);var a=new RegExp("".concat(E.cssPrefix,"-.*"));if(delete r[0].attributes.id,r[0].attributes.class){var o=r[0].attributes.class.split(" ").reduce(function(i,c){return c===E.replacementClass||c.match(a)?i.toSvg.push(c):i.toNode.push(c),i},{toNode:[],toSvg:[]});r[0].attributes.class=o.toSvg.join(" "),o.toNode.length===0?n.removeAttribute("class"):n.setAttribute("class",o.toNode.join(" "))}var s=r.map(function(i){return dt(i)}).join(`
`);n.setAttribute(Pe,""),n.innerHTML=s}};function jr(e){e()}function Qa(e,t){var n=typeof t=="function"?t:_t;if(e.length===0)n();else{var r=jr;E.mutateApproach===Zi&&(r=ye.requestAnimationFrame||jr),r(function(){var a=Bs(),o=fr.begin("mutate");e.map(a),o(),n()})}}var dr=!1;function Za(){dr=!0}function In(){dr=!1}var zt=null;function Hr(e){if(Rr&&E.observeMutations){var t=e.treeCallback,n=t===void 0?_t:t,r=e.nodeCallback,a=r===void 0?_t:r,o=e.pseudoElementsCallback,s=o===void 0?_t:o,i=e.observeMutationsRoot,c=i===void 0?N:i;zt=new Rr(function(d){if(!dr){var f=we();Ve(d).forEach(function(u){if(u.type==="childList"&&u.addedNodes.length>0&&!zr(u.addedNodes[0])&&(E.searchPseudoElements&&s(u.target),n(u.target)),u.type==="attributes"&&u.target.parentNode&&E.searchPseudoElements&&s(u.target.parentNode),u.type==="attributes"&&zr(u.target)&&~os.indexOf(u.attributeName))if(u.attributeName==="class"&&Ws(u.target)){var p=Zt(or(u.target)),m=p.prefix,b=p.iconName;u.target.setAttribute(nr,m||f),b&&u.target.setAttribute(rr,b)}else Ys(u.target)&&a(u.target)})}}),de&&zt.observe(c,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function Xs(){zt&&zt.disconnect()}function qs(e){var t=e.getAttribute("style"),n=[];return t&&(n=t.split(";").reduce(function(r,a){var o=a.split(":"),s=o[0],i=o.slice(1);return s&&i.length>0&&(r[s]=i.join(":").trim()),r},{})),n}function Qs(e){var t=e.getAttribute("data-prefix"),n=e.getAttribute("data-icon"),r=e.innerText!==void 0?e.innerText.trim():"",a=Zt(or(e));return a.prefix||(a.prefix=we()),t&&n&&(a.prefix=t,a.iconName=n),a.iconName&&a.prefix||(a.prefix&&r.length>0&&(a.iconName=Ps(a.prefix,e.innerText)||cr(a.prefix,Sn(e.innerText))),!a.iconName&&E.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(a.iconName=e.firstChild.data)),a}function Zs(e){var t=Ve(e.attributes).reduce(function(a,o){return a.name!=="class"&&a.name!=="style"&&(a[o.name]=o.value),a},{}),n=e.getAttribute("title"),r=e.getAttribute("data-fa-title-id");return E.autoA11y&&(n?t["aria-labelledby"]="".concat(E.replacementClass,"-title-").concat(r||st()):(t["aria-hidden"]="true",t.focusable="false")),t}function Js(){return{iconName:null,title:null,titleId:null,prefix:null,transform:ee,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function Ur(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},n=Qs(e),r=n.iconName,a=n.prefix,o=n.rest,s=Zs(e),i=An("parseNodeAttributes",{},e),c=t.styleParser?qs(e):[];return $({iconName:r,title:e.getAttribute("title"),titleId:e.getAttribute("data-fa-title-id"),prefix:a,transform:ee,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:o,styles:c,attributes:s}},i)}var ec=q.styles;function Ja(e){var t=E.autoReplaceSvg==="nest"?Ur(e,{styleParser:!1}):Ur(e);return~t.extra.classes.indexOf(Na)?fe("generateLayersText",e,t):fe("generateSvgReplacementMutation",e,t)}var xe=new Set;ar.map(function(e){xe.add("fa-".concat(e))});Object.keys(rt[M]).map(xe.add.bind(xe));Object.keys(rt[F]).map(xe.add.bind(xe));xe=ut(xe);function Wr(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!de)return Promise.resolve();var n=N.documentElement.classList,r=function(u){return n.add("".concat(Tr,"-").concat(u))},a=function(u){return n.remove("".concat(Tr,"-").concat(u))},o=E.autoFetchSvg?xe:ar.map(function(f){return"fa-".concat(f)}).concat(Object.keys(ec));o.includes("fa")||o.push("fa");var s=[".".concat(Na,":not([").concat(Pe,"])")].concat(o.map(function(f){return".".concat(f,":not([").concat(Pe,"])")})).join(", ");if(s.length===0)return Promise.resolve();var i=[];try{i=Ve(e.querySelectorAll(s))}catch{}if(i.length>0)r("pending"),a("complete");else return Promise.resolve();var c=fr.begin("onTree"),d=i.reduce(function(f,u){try{var p=Ja(u);p&&f.push(p)}catch(m){Ma||m.name==="MissingIcon"&&console.error(m)}return f},[]);return new Promise(function(f,u){Promise.all(d).then(function(p){Qa(p,function(){r("active"),r("complete"),a("pending"),typeof t=="function"&&t(),c(),f()})}).catch(function(p){c(),u(p)})})}function tc(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;Ja(e).then(function(n){n&&Qa([n],t)})}function nc(e){return function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=(t||{}).icon?t:Pn(t||{}),a=n.mask;return a&&(a=(a||{}).icon?a:Pn(a||{})),e(r,$($({},n),{},{mask:a}))}}var rc=function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.transform,a=r===void 0?ee:r,o=n.symbol,s=o===void 0?!1:o,i=n.mask,c=i===void 0?null:i,d=n.maskId,f=d===void 0?null:d,u=n.title,p=u===void 0?null:u,m=n.titleId,b=m===void 0?null:m,v=n.classes,h=v===void 0?[]:v,g=n.attributes,y=g===void 0?{}:g,w=n.styles,x=w===void 0?{}:w;if(t){var k=t.prefix,R=t.iconName,C=t.icon;return Jt($({type:"icon"},t),function(){return Oe("beforeDOMElementCreation",{iconDefinition:t,params:n}),E.autoA11y&&(p?y["aria-labelledby"]="".concat(E.replacementClass,"-title-").concat(b||st()):(y["aria-hidden"]="true",y.focusable="false")),ur({icons:{main:On(C),mask:c?On(c.icon):{found:!1,width:null,height:null,icon:{}}},prefix:k,iconName:R,transform:$($({},ee),a),symbol:s,title:p,maskId:f,titleId:b,extra:{attributes:y,styles:x,classes:h}})})}},ac={mixout:function(){return{icon:nc(rc)}},hooks:function(){return{mutationObserverCallbacks:function(n){return n.treeCallback=Wr,n.nodeCallback=tc,n}}},provides:function(t){t.i2svg=function(n){var r=n.node,a=r===void 0?N:r,o=n.callback,s=o===void 0?function(){}:o;return Wr(a,s)},t.generateSvgReplacementMutation=function(n,r){var a=r.iconName,o=r.title,s=r.titleId,i=r.prefix,c=r.transform,d=r.symbol,f=r.mask,u=r.maskId,p=r.extra;return new Promise(function(m,b){Promise.all([Rn(a,i),f.iconName?Rn(f.iconName,f.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(v){var h=er(v,2),g=h[0],y=h[1];m([n,ur({icons:{main:g,mask:y},prefix:i,iconName:a,transform:c,symbol:d,maskId:u,title:o,titleId:s,extra:p,watchable:!0})])}).catch(b)})},t.generateAbstractIcon=function(n){var r=n.children,a=n.attributes,o=n.main,s=n.transform,i=n.styles,c=qt(i);c.length>0&&(a.style=c);var d;return ir(s)&&(d=fe("generateAbstractTransformGrouping",{main:o,transform:s,containerWidth:o.width,iconWidth:o.width})),r.push(d||o.icon),{children:r,attributes:a}}}},oc={mixout:function(){return{layer:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.classes,o=a===void 0?[]:a;return Jt({type:"layer"},function(){Oe("beforeDOMElementCreation",{assembler:n,params:r});var s=[];return n(function(i){Array.isArray(i)?i.map(function(c){s=s.concat(c.abstract)}):s=s.concat(i.abstract)}),[{tag:"span",attributes:{class:["".concat(E.cssPrefix,"-layers")].concat(ut(o)).join(" ")},children:s}]})}}}},ic={mixout:function(){return{counter:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.title,o=a===void 0?null:a,s=r.classes,i=s===void 0?[]:s,c=r.attributes,d=c===void 0?{}:c,f=r.styles,u=f===void 0?{}:f;return Jt({type:"counter",content:n},function(){return Oe("beforeDOMElementCreation",{content:n,params:r}),zs({content:n.toString(),title:o,extra:{attributes:d,styles:u,classes:["".concat(E.cssPrefix,"-layers-counter")].concat(ut(i))}})})}}}},sc={mixout:function(){return{text:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.transform,o=a===void 0?ee:a,s=r.title,i=s===void 0?null:s,c=r.classes,d=c===void 0?[]:c,f=r.attributes,u=f===void 0?{}:f,p=r.styles,m=p===void 0?{}:p;return Jt({type:"text",content:n},function(){return Oe("beforeDOMElementCreation",{content:n,params:r}),Lr({content:n,transform:$($({},ee),o),title:i,extra:{attributes:u,styles:m,classes:["".concat(E.cssPrefix,"-layers-text")].concat(ut(d))}})})}}},provides:function(t){t.generateLayersText=function(n,r){var a=r.title,o=r.transform,s=r.extra,i=null,c=null;if(Ta){var d=parseInt(getComputedStyle(n).fontSize,10),f=n.getBoundingClientRect();i=f.width/d,c=f.height/d}return E.autoA11y&&!a&&(s.attributes["aria-hidden"]="true"),Promise.resolve([n,Lr({content:n.innerHTML,width:i,height:c,transform:o,title:a,extra:s,watchable:!0})])}}},cc=new RegExp('"',"ug"),Yr=[1105920,1112319];function lc(e){var t=e.replace(cc,""),n=$s(t,0),r=n>=Yr[0]&&n<=Yr[1],a=t.length===2?t[0]===t[1]:!1;return{value:Sn(a?t[0]:t),isSecondary:r||a}}function Br(e,t){var n="".concat(Qi).concat(t.replace(":","-"));return new Promise(function(r,a){if(e.getAttribute(n)!==null)return r();var o=Ve(e.children),s=o.filter(function(C){return C.getAttribute(kn)===t})[0],i=ye.getComputedStyle(e,t),c=i.getPropertyValue("font-family").match(ns),d=i.getPropertyValue("font-weight"),f=i.getPropertyValue("content");if(s&&!c)return e.removeChild(s),r();if(c&&f!=="none"&&f!==""){var u=i.getPropertyValue("content"),p=~["Sharp"].indexOf(c[2])?F:M,m=~["Solid","Regular","Light","Thin","Duotone","Brands","Kit"].indexOf(c[2])?at[p][c[2].toLowerCase()]:rs[p][d],b=lc(u),v=b.value,h=b.isSecondary,g=c[0].startsWith("FontAwesome"),y=cr(m,v),w=y;if(g){var x=Os(v);x.iconName&&x.prefix&&(y=x.iconName,m=x.prefix)}if(y&&!h&&(!s||s.getAttribute(nr)!==m||s.getAttribute(rr)!==w)){e.setAttribute(n,w),s&&e.removeChild(s);var k=Js(),R=k.extra;R.attributes[kn]=t,Rn(y,m).then(function(C){var S=ur($($({},k),{},{icons:{main:C,mask:lr()},prefix:m,iconName:w,extra:R,watchable:!0})),O=N.createElement("svg");t==="::before"?e.insertBefore(O,e.firstChild):e.appendChild(O),O.outerHTML=S.map(function(D){return dt(D)}).join(`
`),e.removeAttribute(n),r()}).catch(a)}else r()}else r()})}function uc(e){return Promise.all([Br(e,"::before"),Br(e,"::after")])}function fc(e){return e.parentNode!==document.head&&!~Ji.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(kn)&&(!e.parentNode||e.parentNode.tagName!=="svg")}function Vr(e){if(de)return new Promise(function(t,n){var r=Ve(e.querySelectorAll("*")).filter(fc).map(uc),a=fr.begin("searchPseudoElements");Za(),Promise.all(r).then(function(){a(),In(),t()}).catch(function(){a(),In(),n()})})}var dc={hooks:function(){return{mutationObserverCallbacks:function(n){return n.pseudoElementsCallback=Vr,n}}},provides:function(t){t.pseudoElements2svg=function(n){var r=n.node,a=r===void 0?N:r;E.searchPseudoElements&&Vr(a)}}},Kr=!1,mc={mixout:function(){return{dom:{unwatch:function(){Za(),Kr=!0}}}},hooks:function(){return{bootstrap:function(){Hr(An("mutationObserverCallbacks",{}))},noAuto:function(){Xs()},watch:function(n){var r=n.observeMutationsRoot;Kr?In():Hr(An("mutationObserverCallbacks",{observeMutationsRoot:r}))}}}},Gr=function(t){var n={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce(function(r,a){var o=a.toLowerCase().split("-"),s=o[0],i=o.slice(1).join("-");if(s&&i==="h")return r.flipX=!0,r;if(s&&i==="v")return r.flipY=!0,r;if(i=parseFloat(i),isNaN(i))return r;switch(s){case"grow":r.size=r.size+i;break;case"shrink":r.size=r.size-i;break;case"left":r.x=r.x-i;break;case"right":r.x=r.x+i;break;case"up":r.y=r.y-i;break;case"down":r.y=r.y+i;break;case"rotate":r.rotate=r.rotate+i;break}return r},n)},pc={mixout:function(){return{parse:{transform:function(n){return Gr(n)}}}},hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-transform");return a&&(n.transform=Gr(a)),n}}},provides:function(t){t.generateAbstractTransformGrouping=function(n){var r=n.main,a=n.transform,o=n.containerWidth,s=n.iconWidth,i={transform:"translate(".concat(o/2," 256)")},c="translate(".concat(a.x*32,", ").concat(a.y*32,") "),d="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),f="rotate(".concat(a.rotate," 0 0)"),u={transform:"".concat(c," ").concat(d," ").concat(f)},p={transform:"translate(".concat(s/2*-1," -256)")},m={outer:i,inner:u,path:p};return{tag:"g",attributes:$({},m.outer),children:[{tag:"g",attributes:$({},m.inner),children:[{tag:r.icon.tag,children:r.icon.children,attributes:$($({},r.icon.attributes),m.path)}]}]}}}},fn={x:0,y:0,width:"100%",height:"100%"};function Xr(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||t)&&(e.attributes.fill="black"),e}function vc(e){return e.tag==="g"?e.children:[e]}var bc={hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-mask"),o=a?Zt(a.split(" ").map(function(s){return s.trim()})):lr();return o.prefix||(o.prefix=we()),n.mask=o,n.maskId=r.getAttribute("data-fa-mask-id"),n}}},provides:function(t){t.generateAbstractMask=function(n){var r=n.children,a=n.attributes,o=n.main,s=n.mask,i=n.maskId,c=n.transform,d=o.width,f=o.icon,u=s.width,p=s.icon,m=ps({transform:c,containerWidth:u,iconWidth:d}),b={tag:"rect",attributes:$($({},fn),{},{fill:"white"})},v=f.children?{children:f.children.map(Xr)}:{},h={tag:"g",attributes:$({},m.inner),children:[Xr($({tag:f.tag,attributes:$($({},f.attributes),m.path)},v))]},g={tag:"g",attributes:$({},m.outer),children:[h]},y="mask-".concat(i||st()),w="clip-".concat(i||st()),x={tag:"mask",attributes:$($({},fn),{},{id:y,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[b,g]},k={tag:"defs",children:[{tag:"clipPath",attributes:{id:w},children:vc(p)},x]};return r.push(k,{tag:"rect",attributes:$({fill:"currentColor","clip-path":"url(#".concat(w,")"),mask:"url(#".concat(y,")")},fn)}),{children:r,attributes:a}}}},gc={provides:function(t){var n=!1;ye.matchMedia&&(n=ye.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){var r=[],a={fill:"currentColor"},o={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};r.push({tag:"path",attributes:$($({},a),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var s=$($({},o),{},{attributeName:"opacity"}),i={tag:"circle",attributes:$($({},a),{},{cx:"256",cy:"364",r:"28"}),children:[]};return n||i.children.push({tag:"animate",attributes:$($({},o),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:$($({},s),{},{values:"1;0;1;1;0;1;"})}),r.push(i),r.push({tag:"path",attributes:$($({},a),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:n?[]:[{tag:"animate",attributes:$($({},s),{},{values:"1;0;0;0;0;1;"})}]}),n||r.push({tag:"path",attributes:$($({},a),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:$($({},s),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:r}}}},hc={hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-symbol"),o=a===null?!1:a===""?!0:a;return n.symbol=o,n}}}},yc=[gs,ac,oc,ic,sc,dc,mc,pc,bc,gc,hc];Is(yc,{mixoutsTo:B});B.noAuto;B.config;B.library;B.dom;var _n=B.parse;B.findIconDefinition;B.toHtml;var wc=B.icon;B.layer;B.text;B.counter;function qr(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),n.push.apply(n,r)}return n}function ve(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?qr(Object(n),!0).forEach(function(r){We(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):qr(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function jt(e){return jt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},jt(e)}function We(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function xc(e,t){if(e==null)return{};var n={},r=Object.keys(e),a,o;for(o=0;o<r.length;o++)a=r[o],!(t.indexOf(a)>=0)&&(n[a]=e[a]);return n}function $c(e,t){if(e==null)return{};var n=xc(e,t),r,a;if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}function Mn(e){return Ec(e)||kc(e)||Sc(e)||Cc()}function Ec(e){if(Array.isArray(e))return Nn(e)}function kc(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Sc(e,t){if(e){if(typeof e=="string")return Nn(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Nn(e,t)}}function Nn(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function Cc(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ac(e){var t,n=e.beat,r=e.fade,a=e.beatFade,o=e.bounce,s=e.shake,i=e.flash,c=e.spin,d=e.spinPulse,f=e.spinReverse,u=e.pulse,p=e.fixedWidth,m=e.inverse,b=e.border,v=e.listItem,h=e.flip,g=e.size,y=e.rotation,w=e.pull,x=(t={"fa-beat":n,"fa-fade":r,"fa-beat-fade":a,"fa-bounce":o,"fa-shake":s,"fa-flash":i,"fa-spin":c,"fa-spin-reverse":f,"fa-spin-pulse":d,"fa-pulse":u,"fa-fw":p,"fa-inverse":m,"fa-border":b,"fa-li":v,"fa-flip":h===!0,"fa-flip-horizontal":h==="horizontal"||h==="both","fa-flip-vertical":h==="vertical"||h==="both"},We(t,"fa-".concat(g),typeof g<"u"&&g!==null),We(t,"fa-rotate-".concat(y),typeof y<"u"&&y!==null&&y!==0),We(t,"fa-pull-".concat(w),typeof w<"u"&&w!==null),We(t,"fa-swap-opacity",e.swapOpacity),t);return Object.keys(x).map(function(k){return x[k]?k:null}).filter(function(k){return k})}function Pc(e){return e=e-0,e===e}function eo(e){return Pc(e)?e:(e=e.replace(/[\-_\s]+(.)?/g,function(t,n){return n?n.toUpperCase():""}),e.substr(0,1).toLowerCase()+e.substr(1))}var Oc=["style"];function Rc(e){return e.charAt(0).toUpperCase()+e.slice(1)}function Tc(e){return e.split(";").map(function(t){return t.trim()}).filter(function(t){return t}).reduce(function(t,n){var r=n.indexOf(":"),a=eo(n.slice(0,r)),o=n.slice(r+1).trim();return a.startsWith("webkit")?t[Rc(a)]=o:t[a]=o,t},{})}function to(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof t=="string")return t;var r=(t.children||[]).map(function(c){return to(e,c)}),a=Object.keys(t.attributes||{}).reduce(function(c,d){var f=t.attributes[d];switch(d){case"class":c.attrs.className=f,delete t.attributes.class;break;case"style":c.attrs.style=Tc(f);break;default:d.indexOf("aria-")===0||d.indexOf("data-")===0?c.attrs[d.toLowerCase()]=f:c.attrs[eo(d)]=f}return c},{attrs:{}}),o=n.style,s=o===void 0?{}:o,i=$c(n,Oc);return a.attrs.style=ve(ve({},a.attrs.style),s),e.apply(void 0,[t.tag,ve(ve({},a.attrs),i)].concat(Mn(r)))}var no=!1;try{no=!0}catch{}function Ic(){if(!no&&console&&typeof console.error=="function"){var e;(e=console).error.apply(e,arguments)}}function Qr(e){if(e&&jt(e)==="object"&&e.prefix&&e.iconName&&e.icon)return e;if(_n.icon)return _n.icon(e);if(e===null)return null;if(e&&jt(e)==="object"&&e.prefix&&e.iconName)return e;if(Array.isArray(e)&&e.length===2)return{prefix:e[0],iconName:e[1]};if(typeof e=="string")return{prefix:"fas",iconName:e}}function dn(e,t){return Array.isArray(t)&&t.length>0||!Array.isArray(t)&&t?We({},e,t):{}}var Re=A.forwardRef(function(e,t){var n=e.icon,r=e.mask,a=e.symbol,o=e.className,s=e.title,i=e.titleId,c=e.maskId,d=Qr(n),f=dn("classes",[].concat(Mn(Ac(e)),Mn(o.split(" ")))),u=dn("transform",typeof e.transform=="string"?_n.transform(e.transform):e.transform),p=dn("mask",Qr(r)),m=wc(d,ve(ve(ve(ve({},f),u),p),{},{symbol:a,title:s,titleId:i,maskId:c}));if(!m)return Ic("Could not find icon",d),null;var b=m.abstract,v={ref:t};return Object.keys(e).forEach(function(h){Re.defaultProps.hasOwnProperty(h)||(v[h]=e[h])}),_c(b[0],v)});Re.displayName="FontAwesomeIcon";Re.propTypes={beat:T.bool,border:T.bool,beatFade:T.bool,bounce:T.bool,className:T.string,fade:T.bool,flash:T.bool,mask:T.oneOfType([T.object,T.array,T.string]),maskId:T.string,fixedWidth:T.bool,inverse:T.bool,flip:T.oneOf([!0,!1,"horizontal","vertical","both"]),icon:T.oneOfType([T.object,T.array,T.string]),listItem:T.bool,pull:T.oneOf(["right","left"]),pulse:T.bool,rotation:T.oneOf([0,90,180,270]),shake:T.bool,size:T.oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:T.bool,spinPulse:T.bool,spinReverse:T.bool,symbol:T.oneOfType([T.bool,T.string]),title:T.string,titleId:T.string,transform:T.oneOfType([T.string,T.object]),swapOpacity:T.bool};Re.defaultProps={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:!1,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,size:null,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1};var _c=to.bind(null,A.createElement);function _(e,t,{checkForDefaultPrevented:n=!0}={}){return function(a){if(e==null||e(a),n===!1||!a.defaultPrevented)return t==null?void 0:t(a)}}function Mc(e,t){typeof e=="function"?e(t):e!=null&&(e.current=t)}function mr(...e){return t=>e.forEach(n=>Mc(n,t))}function X(...e){return l.useCallback(mr(...e),e)}function mt(e,t=[]){let n=[];function r(o,s){const i=l.createContext(s),c=n.length;n=[...n,s];function d(u){const{scope:p,children:m,...b}=u,v=(p==null?void 0:p[e][c])||i,h=l.useMemo(()=>b,Object.values(b));return l.createElement(v.Provider,{value:h},m)}function f(u,p){const m=(p==null?void 0:p[e][c])||i,b=l.useContext(m);if(b)return b;if(s!==void 0)return s;throw new Error(`\`${u}\` must be used within \`${o}\``)}return d.displayName=o+"Provider",[d,f]}const a=()=>{const o=n.map(s=>l.createContext(s));return function(i){const c=(i==null?void 0:i[e])||o;return l.useMemo(()=>({[`__scope${e}`]:{...i,[e]:c}}),[i,c])}};return a.scopeName=e,[r,Nc(a,...t)]}function Nc(...e){const t=e[0];if(e.length===1)return t;const n=()=>{const r=e.map(a=>({useScope:a(),scopeName:a.scopeName}));return function(o){const s=r.reduce((i,{useScope:c,scopeName:d})=>{const u=c(o)[`__scope${d}`];return{...i,...u}},{});return l.useMemo(()=>({[`__scope${t.scopeName}`]:s}),[s])}};return n.scopeName=t.scopeName,n}function te(e){const t=l.useRef(e);return l.useEffect(()=>{t.current=e}),l.useMemo(()=>(...n)=>{var r;return(r=t.current)===null||r===void 0?void 0:r.call(t,...n)},[])}function ro({prop:e,defaultProp:t,onChange:n=()=>{}}){const[r,a]=Dc({defaultProp:t,onChange:n}),o=e!==void 0,s=o?e:r,i=te(n),c=l.useCallback(d=>{if(o){const u=typeof d=="function"?d(e):d;u!==e&&i(u)}else a(d)},[o,e,a,i]);return[s,c]}function Dc({defaultProp:e,onChange:t}){const n=l.useState(e),[r]=n,a=l.useRef(r),o=te(t);return l.useEffect(()=>{a.current!==r&&(o(r),a.current=r)},[r,a,o]),n}const ct=l.forwardRef((e,t)=>{const{children:n,...r}=e,a=l.Children.toArray(n),o=a.find(Fc);if(o){const s=o.props.children,i=a.map(c=>c===o?l.Children.count(s)>1?l.Children.only(null):l.isValidElement(s)?s.props.children:null:c);return l.createElement(Dn,I({},r,{ref:t}),l.isValidElement(s)?l.cloneElement(s,void 0,i):null)}return l.createElement(Dn,I({},r,{ref:t}),n)});ct.displayName="Slot";const Dn=l.forwardRef((e,t)=>{const{children:n,...r}=e;return l.isValidElement(n)?l.cloneElement(n,{...zc(r,n.props),ref:mr(t,n.ref)}):l.Children.count(n)>1?l.Children.only(null):null});Dn.displayName="SlotClone";const Lc=({children:e})=>l.createElement(l.Fragment,null,e);function Fc(e){return l.isValidElement(e)&&e.type===Lc}function zc(e,t){const n={...t};for(const r in t){const a=e[r],o=t[r];/^on[A-Z]/.test(r)?a&&o?n[r]=(...i)=>{o(...i),a(...i)}:a&&(n[r]=a):r==="style"?n[r]={...a,...o}:r==="className"&&(n[r]=[a,o].filter(Boolean).join(" "))}return{...e,...n}}const jc=["a","button","div","h2","h3","img","label","li","nav","ol","p","span","svg","ul"],Q=jc.reduce((e,t)=>{const n=l.forwardRef((r,a)=>{const{asChild:o,...s}=r,i=o?ct:t;return l.useEffect(()=>{window[Symbol.for("radix-ui")]=!0},[]),l.createElement(i,I({},s,{ref:a}))});return n.displayName=`Primitive.${t}`,{...e,[t]:n}},{});function ao(e,t){e&&Qn.flushSync(()=>e.dispatchEvent(t))}function oo(e){const t=e+"CollectionProvider",[n,r]=mt(t),[a,o]=n(t,{collectionRef:{current:null},itemMap:new Map}),s=m=>{const{scope:b,children:v}=m,h=A.useRef(null),g=A.useRef(new Map).current;return A.createElement(a,{scope:b,itemMap:g,collectionRef:h},v)},i=e+"CollectionSlot",c=A.forwardRef((m,b)=>{const{scope:v,children:h}=m,g=o(i,v),y=X(b,g.collectionRef);return A.createElement(ct,{ref:y},h)}),d=e+"CollectionItemSlot",f="data-radix-collection-item",u=A.forwardRef((m,b)=>{const{scope:v,children:h,...g}=m,y=A.useRef(null),w=X(b,y),x=o(d,v);return A.useEffect(()=>(x.itemMap.set(y,{ref:y,...g}),()=>void x.itemMap.delete(y))),A.createElement(ct,{[f]:"",ref:w},h)});function p(m){const b=o(e+"CollectionConsumer",m);return A.useCallback(()=>{const h=b.collectionRef.current;if(!h)return[];const g=Array.from(h.querySelectorAll(`[${f}]`));return Array.from(b.itemMap.values()).sort((x,k)=>g.indexOf(x.ref.current)-g.indexOf(k.ref.current))},[b.collectionRef,b.itemMap])}return[{Provider:s,Slot:c,ItemSlot:u},p,r]}const Hc=l.createContext(void 0);function io(e){const t=l.useContext(Hc);return e||t||"ltr"}function Uc(e,t=globalThis==null?void 0:globalThis.document){const n=te(e);l.useEffect(()=>{const r=a=>{a.key==="Escape"&&n(a)};return t.addEventListener("keydown",r),()=>t.removeEventListener("keydown",r)},[n,t])}const Ln="dismissableLayer.update",Wc="dismissableLayer.pointerDownOutside",Yc="dismissableLayer.focusOutside";let Zr;const Bc=l.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),Vc=l.forwardRef((e,t)=>{var n;const{disableOutsidePointerEvents:r=!1,onEscapeKeyDown:a,onPointerDownOutside:o,onFocusOutside:s,onInteractOutside:i,onDismiss:c,...d}=e,f=l.useContext(Bc),[u,p]=l.useState(null),m=(n=u==null?void 0:u.ownerDocument)!==null&&n!==void 0?n:globalThis==null?void 0:globalThis.document,[,b]=l.useState({}),v=X(t,S=>p(S)),h=Array.from(f.layers),[g]=[...f.layersWithOutsidePointerEventsDisabled].slice(-1),y=h.indexOf(g),w=u?h.indexOf(u):-1,x=f.layersWithOutsidePointerEventsDisabled.size>0,k=w>=y,R=Kc(S=>{const O=S.target,D=[...f.branches].some(W=>W.contains(O));!k||D||(o==null||o(S),i==null||i(S),S.defaultPrevented||c==null||c())},m),C=Gc(S=>{const O=S.target;[...f.branches].some(W=>W.contains(O))||(s==null||s(S),i==null||i(S),S.defaultPrevented||c==null||c())},m);return Uc(S=>{w===f.layers.size-1&&(a==null||a(S),!S.defaultPrevented&&c&&(S.preventDefault(),c()))},m),l.useEffect(()=>{if(u)return r&&(f.layersWithOutsidePointerEventsDisabled.size===0&&(Zr=m.body.style.pointerEvents,m.body.style.pointerEvents="none"),f.layersWithOutsidePointerEventsDisabled.add(u)),f.layers.add(u),Jr(),()=>{r&&f.layersWithOutsidePointerEventsDisabled.size===1&&(m.body.style.pointerEvents=Zr)}},[u,m,r,f]),l.useEffect(()=>()=>{u&&(f.layers.delete(u),f.layersWithOutsidePointerEventsDisabled.delete(u),Jr())},[u,f]),l.useEffect(()=>{const S=()=>b({});return document.addEventListener(Ln,S),()=>document.removeEventListener(Ln,S)},[]),l.createElement(Q.div,I({},d,{ref:v,style:{pointerEvents:x?k?"auto":"none":void 0,...e.style},onFocusCapture:_(e.onFocusCapture,C.onFocusCapture),onBlurCapture:_(e.onBlurCapture,C.onBlurCapture),onPointerDownCapture:_(e.onPointerDownCapture,R.onPointerDownCapture)}))});function Kc(e,t=globalThis==null?void 0:globalThis.document){const n=te(e),r=l.useRef(!1),a=l.useRef(()=>{});return l.useEffect(()=>{const o=i=>{if(i.target&&!r.current){let d=function(){so(Wc,n,c,{discrete:!0})};const c={originalEvent:i};i.pointerType==="touch"?(t.removeEventListener("click",a.current),a.current=d,t.addEventListener("click",a.current,{once:!0})):d()}r.current=!1},s=window.setTimeout(()=>{t.addEventListener("pointerdown",o)},0);return()=>{window.clearTimeout(s),t.removeEventListener("pointerdown",o),t.removeEventListener("click",a.current)}},[t,n]),{onPointerDownCapture:()=>r.current=!0}}function Gc(e,t=globalThis==null?void 0:globalThis.document){const n=te(e),r=l.useRef(!1);return l.useEffect(()=>{const a=o=>{o.target&&!r.current&&so(Yc,n,{originalEvent:o},{discrete:!1})};return t.addEventListener("focusin",a),()=>t.removeEventListener("focusin",a)},[t,n]),{onFocusCapture:()=>r.current=!0,onBlurCapture:()=>r.current=!1}}function Jr(){const e=new CustomEvent(Ln);document.dispatchEvent(e)}function so(e,t,n,{discrete:r}){const a=n.originalEvent.target,o=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:n});t&&a.addEventListener(e,t,{once:!0}),r?ao(a,o):a.dispatchEvent(o)}let mn=0;function Xc(){l.useEffect(()=>{var e,t;const n=document.querySelectorAll("[data-radix-focus-guard]");return document.body.insertAdjacentElement("afterbegin",(e=n[0])!==null&&e!==void 0?e:ea()),document.body.insertAdjacentElement("beforeend",(t=n[1])!==null&&t!==void 0?t:ea()),mn++,()=>{mn===1&&document.querySelectorAll("[data-radix-focus-guard]").forEach(r=>r.remove()),mn--}},[])}function ea(){const e=document.createElement("span");return e.setAttribute("data-radix-focus-guard",""),e.tabIndex=0,e.style.cssText="outline: none; opacity: 0; position: fixed; pointer-events: none",e}const pn="focusScope.autoFocusOnMount",vn="focusScope.autoFocusOnUnmount",ta={bubbles:!1,cancelable:!0},qc=l.forwardRef((e,t)=>{const{loop:n=!1,trapped:r=!1,onMountAutoFocus:a,onUnmountAutoFocus:o,...s}=e,[i,c]=l.useState(null),d=te(a),f=te(o),u=l.useRef(null),p=X(t,v=>c(v)),m=l.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;l.useEffect(()=>{if(r){let v=function(g){if(m.paused||!i)return;const y=g.target;i.contains(y)?u.current=y:ke(u.current,{select:!0})},h=function(g){m.paused||!i||i.contains(g.relatedTarget)||ke(u.current,{select:!0})};return document.addEventListener("focusin",v),document.addEventListener("focusout",h),()=>{document.removeEventListener("focusin",v),document.removeEventListener("focusout",h)}}},[r,i,m.paused]),l.useEffect(()=>{if(i){ra.add(m);const v=document.activeElement;if(!i.contains(v)){const g=new CustomEvent(pn,ta);i.addEventListener(pn,d),i.dispatchEvent(g),g.defaultPrevented||(Qc(nl(co(i)),{select:!0}),document.activeElement===v&&ke(i))}return()=>{i.removeEventListener(pn,d),setTimeout(()=>{const g=new CustomEvent(vn,ta);i.addEventListener(vn,f),i.dispatchEvent(g),g.defaultPrevented||ke(v??document.body,{select:!0}),i.removeEventListener(vn,f),ra.remove(m)},0)}}},[i,d,f,m]);const b=l.useCallback(v=>{if(!n&&!r||m.paused)return;const h=v.key==="Tab"&&!v.altKey&&!v.ctrlKey&&!v.metaKey,g=document.activeElement;if(h&&g){const y=v.currentTarget,[w,x]=Zc(y);w&&x?!v.shiftKey&&g===x?(v.preventDefault(),n&&ke(w,{select:!0})):v.shiftKey&&g===w&&(v.preventDefault(),n&&ke(x,{select:!0})):g===y&&v.preventDefault()}},[n,r,m.paused]);return l.createElement(Q.div,I({tabIndex:-1},s,{ref:p,onKeyDown:b}))});function Qc(e,{select:t=!1}={}){const n=document.activeElement;for(const r of e)if(ke(r,{select:t}),document.activeElement!==n)return}function Zc(e){const t=co(e),n=na(t,e),r=na(t.reverse(),e);return[n,r]}function co(e){const t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:r=>{const a=r.tagName==="INPUT"&&r.type==="hidden";return r.disabled||r.hidden||a?NodeFilter.FILTER_SKIP:r.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;n.nextNode();)t.push(n.currentNode);return t}function na(e,t){for(const n of e)if(!Jc(n,{upTo:t}))return n}function Jc(e,{upTo:t}){if(getComputedStyle(e).visibility==="hidden")return!0;for(;e;){if(t!==void 0&&e===t)return!1;if(getComputedStyle(e).display==="none")return!0;e=e.parentElement}return!1}function el(e){return e instanceof HTMLInputElement&&"select"in e}function ke(e,{select:t=!1}={}){if(e&&e.focus){const n=document.activeElement;e.focus({preventScroll:!0}),e!==n&&el(e)&&t&&e.select()}}const ra=tl();function tl(){let e=[];return{add(t){const n=e[0];t!==n&&(n==null||n.pause()),e=aa(e,t),e.unshift(t)},remove(t){var n;e=aa(e,t),(n=e[0])===null||n===void 0||n.resume()}}}function aa(e,t){const n=[...e],r=n.indexOf(t);return r!==-1&&n.splice(r,1),n}function nl(e){return e.filter(t=>t.tagName!=="A")}const be=Boolean(globalThis==null?void 0:globalThis.document)?l.useLayoutEffect:()=>{},rl=Jo["useId".toString()]||(()=>{});let al=0;function Fn(e){const[t,n]=l.useState(rl());return be(()=>{e||n(r=>r??String(al++))},[e]),e||(t?`radix-${t}`:"")}function Te(e){return e.split("-")[0]}function pt(e){return e.split("-")[1]}function Ke(e){return["top","bottom"].includes(Te(e))?"x":"y"}function pr(e){return e==="y"?"height":"width"}function oa(e,t,n){let{reference:r,floating:a}=e;const o=r.x+r.width/2-a.width/2,s=r.y+r.height/2-a.height/2,i=Ke(t),c=pr(i),d=r[c]/2-a[c]/2,f=i==="x";let u;switch(Te(t)){case"top":u={x:o,y:r.y-a.height};break;case"bottom":u={x:o,y:r.y+r.height};break;case"right":u={x:r.x+r.width,y:s};break;case"left":u={x:r.x-a.width,y:s};break;default:u={x:r.x,y:r.y}}switch(pt(t)){case"start":u[i]-=d*(n&&f?-1:1);break;case"end":u[i]+=d*(n&&f?-1:1)}return u}const ol=async(e,t,n)=>{const{placement:r="bottom",strategy:a="absolute",middleware:o=[],platform:s}=n,i=await(s.isRTL==null?void 0:s.isRTL(t));let c=await s.getElementRects({reference:e,floating:t,strategy:a}),{x:d,y:f}=oa(c,r,i),u=r,p={},m=0;for(let b=0;b<o.length;b++){const{name:v,fn:h}=o[b],{x:g,y,data:w,reset:x}=await h({x:d,y:f,initialPlacement:r,placement:u,strategy:a,middlewareData:p,rects:c,platform:s,elements:{reference:e,floating:t}});d=g??d,f=y??f,p={...p,[v]:{...p[v],...w}},x&&m<=50&&(m++,typeof x=="object"&&(x.placement&&(u=x.placement),x.rects&&(c=x.rects===!0?await s.getElementRects({reference:e,floating:t,strategy:a}):x.rects),{x:d,y:f}=oa(c,u,i)),b=-1)}return{x:d,y:f,placement:u,strategy:a,middlewareData:p}};function lo(e){return typeof e!="number"?function(t){return{top:0,right:0,bottom:0,left:0,...t}}(e):{top:e,right:e,bottom:e,left:e}}function Ht(e){return{...e,top:e.y,left:e.x,right:e.x+e.width,bottom:e.y+e.height}}async function lt(e,t){var n;t===void 0&&(t={});const{x:r,y:a,platform:o,rects:s,elements:i,strategy:c}=e,{boundary:d="clippingAncestors",rootBoundary:f="viewport",elementContext:u="floating",altBoundary:p=!1,padding:m=0}=t,b=lo(m),v=i[p?u==="floating"?"reference":"floating":u],h=Ht(await o.getClippingRect({element:(n=await(o.isElement==null?void 0:o.isElement(v)))==null||n?v:v.contextElement||await(o.getDocumentElement==null?void 0:o.getDocumentElement(i.floating)),boundary:d,rootBoundary:f,strategy:c})),g=Ht(o.convertOffsetParentRelativeRectToViewportRelativeRect?await o.convertOffsetParentRelativeRectToViewportRelativeRect({rect:u==="floating"?{...s.floating,x:r,y:a}:s.reference,offsetParent:await(o.getOffsetParent==null?void 0:o.getOffsetParent(i.floating)),strategy:c}):s[u]);return{top:h.top-g.top+b.top,bottom:g.bottom-h.bottom+b.bottom,left:h.left-g.left+b.left,right:g.right-h.right+b.right}}const il=Math.min,Se=Math.max;function zn(e,t,n){return Se(e,il(t,n))}const ia=e=>({name:"arrow",options:e,async fn(t){const{element:n,padding:r=0}=e??{},{x:a,y:o,placement:s,rects:i,platform:c}=t;if(n==null)return{};const d=lo(r),f={x:a,y:o},u=Ke(s),p=pt(s),m=pr(u),b=await c.getDimensions(n),v=u==="y"?"top":"left",h=u==="y"?"bottom":"right",g=i.reference[m]+i.reference[u]-f[u]-i.floating[m],y=f[u]-i.reference[u],w=await(c.getOffsetParent==null?void 0:c.getOffsetParent(n));let x=w?u==="y"?w.clientHeight||0:w.clientWidth||0:0;x===0&&(x=i.floating[m]);const k=g/2-y/2,R=d[v],C=x-b[m]-d[h],S=x/2-b[m]/2+k,O=zn(R,S,C),D=(p==="start"?d[v]:d[h])>0&&S!==O&&i.reference[m]<=i.floating[m];return{[u]:f[u]-(D?S<R?R-S:C-S:0),data:{[u]:O,centerOffset:S-O}}}}),sl={left:"right",right:"left",bottom:"top",top:"bottom"};function Ut(e){return e.replace(/left|right|bottom|top/g,t=>sl[t])}function cl(e,t,n){n===void 0&&(n=!1);const r=pt(e),a=Ke(e),o=pr(a);let s=a==="x"?r===(n?"end":"start")?"right":"left":r==="start"?"bottom":"top";return t.reference[o]>t.floating[o]&&(s=Ut(s)),{main:s,cross:Ut(s)}}const ll={start:"end",end:"start"};function sa(e){return e.replace(/start|end/g,t=>ll[t])}const uo=["top","right","bottom","left"];uo.reduce((e,t)=>e.concat(t,t+"-start",t+"-end"),[]);const ul=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(t){var n;const{placement:r,middlewareData:a,rects:o,initialPlacement:s,platform:i,elements:c}=t,{mainAxis:d=!0,crossAxis:f=!0,fallbackPlacements:u,fallbackStrategy:p="bestFit",flipAlignment:m=!0,...b}=e,v=Te(r),h=u||(v===s||!m?[Ut(s)]:function(S){const O=Ut(S);return[sa(S),O,sa(O)]}(s)),g=[s,...h],y=await lt(t,b),w=[];let x=((n=a.flip)==null?void 0:n.overflows)||[];if(d&&w.push(y[v]),f){const{main:S,cross:O}=cl(r,o,await(i.isRTL==null?void 0:i.isRTL(c.floating)));w.push(y[S],y[O])}if(x=[...x,{placement:r,overflows:w}],!w.every(S=>S<=0)){var k,R;const S=((k=(R=a.flip)==null?void 0:R.index)!=null?k:0)+1,O=g[S];if(O)return{data:{index:S,overflows:x},reset:{placement:O}};let D="bottom";switch(p){case"bestFit":{var C;const W=(C=x.map(V=>[V,V.overflows.filter(j=>j>0).reduce((j,re)=>j+re,0)]).sort((V,j)=>V[1]-j[1])[0])==null?void 0:C[0].placement;W&&(D=W);break}case"initialPlacement":D=s}if(r!==D)return{reset:{placement:D}}}return{}}}};function ca(e,t){return{top:e.top-t.height,right:e.right-t.width,bottom:e.bottom-t.height,left:e.left-t.width}}function la(e){return uo.some(t=>e[t]>=0)}const fl=function(e){let{strategy:t="referenceHidden",...n}=e===void 0?{}:e;return{name:"hide",async fn(r){const{rects:a}=r;switch(t){case"referenceHidden":{const o=ca(await lt(r,{...n,elementContext:"reference"}),a.reference);return{data:{referenceHiddenOffsets:o,referenceHidden:la(o)}}}case"escaped":{const o=ca(await lt(r,{...n,altBoundary:!0}),a.floating);return{data:{escapedOffsets:o,escaped:la(o)}}}default:return{}}}}},dl=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(t){const{x:n,y:r}=t,a=await async function(o,s){const{placement:i,platform:c,elements:d}=o,f=await(c.isRTL==null?void 0:c.isRTL(d.floating)),u=Te(i),p=pt(i),m=Ke(i)==="x",b=["left","top"].includes(u)?-1:1,v=f&&m?-1:1,h=typeof s=="function"?s(o):s;let{mainAxis:g,crossAxis:y,alignmentAxis:w}=typeof h=="number"?{mainAxis:h,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...h};return p&&typeof w=="number"&&(y=p==="end"?-1*w:w),m?{x:y*v,y:g*b}:{x:g*b,y:y*v}}(t,e);return{x:n+a.x,y:r+a.y,data:a}}}};function fo(e){return e==="x"?"y":"x"}const ml=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(t){const{x:n,y:r,placement:a}=t,{mainAxis:o=!0,crossAxis:s=!1,limiter:i={fn:h=>{let{x:g,y}=h;return{x:g,y}}},...c}=e,d={x:n,y:r},f=await lt(t,c),u=Ke(Te(a)),p=fo(u);let m=d[u],b=d[p];if(o){const h=u==="y"?"bottom":"right";m=zn(m+f[u==="y"?"top":"left"],m,m-f[h])}if(s){const h=p==="y"?"bottom":"right";b=zn(b+f[p==="y"?"top":"left"],b,b-f[h])}const v=i.fn({...t,[u]:m,[p]:b});return{...v,data:{x:v.x-n,y:v.y-r}}}}},pl=function(e){return e===void 0&&(e={}),{options:e,fn(t){const{x:n,y:r,placement:a,rects:o,middlewareData:s}=t,{offset:i=0,mainAxis:c=!0,crossAxis:d=!0}=e,f={x:n,y:r},u=Ke(a),p=fo(u);let m=f[u],b=f[p];const v=typeof i=="function"?i({...o,placement:a}):i,h=typeof v=="number"?{mainAxis:v,crossAxis:0}:{mainAxis:0,crossAxis:0,...v};if(c){const k=u==="y"?"height":"width",R=o.reference[u]-o.floating[k]+h.mainAxis,C=o.reference[u]+o.reference[k]-h.mainAxis;m<R?m=R:m>C&&(m=C)}if(d){var g,y,w,x;const k=u==="y"?"width":"height",R=["top","left"].includes(Te(a)),C=o.reference[p]-o.floating[k]+(R&&(g=(y=s.offset)==null?void 0:y[p])!=null?g:0)+(R?0:h.crossAxis),S=o.reference[p]+o.reference[k]+(R?0:(w=(x=s.offset)==null?void 0:x[p])!=null?w:0)-(R?h.crossAxis:0);b<C?b=C:b>S&&(b=S)}return{[u]:m,[p]:b}}}},vl=function(e){return e===void 0&&(e={}),{name:"size",options:e,async fn(t){const{placement:n,rects:r,platform:a,elements:o}=t,{apply:s,...i}=e,c=await lt(t,i),d=Te(n),f=pt(n);let u,p;d==="top"||d==="bottom"?(u=d,p=f===(await(a.isRTL==null?void 0:a.isRTL(o.floating))?"start":"end")?"left":"right"):(p=d,u=f==="end"?"top":"bottom");const m=Se(c.left,0),b=Se(c.right,0),v=Se(c.top,0),h=Se(c.bottom,0),g={availableHeight:r.floating.height-(["left","right"].includes(n)?2*(v!==0||h!==0?v+h:Se(c.top,c.bottom)):c[u]),availableWidth:r.floating.width-(["top","bottom"].includes(n)?2*(m!==0||b!==0?m+b:Se(c.left,c.right)):c[p])},y=await a.getDimensions(o.floating);s==null||s({...t,...g});const w=await a.getDimensions(o.floating);return y.width!==w.width||y.height!==w.height?{reset:{rects:!0}}:{}}}};function mo(e){return e&&e.document&&e.location&&e.alert&&e.setInterval}function me(e){if(e==null)return window;if(!mo(e)){const t=e.ownerDocument;return t&&t.defaultView||window}return e}function vt(e){return me(e).getComputedStyle(e)}function se(e){return mo(e)?"":e?(e.nodeName||"").toLowerCase():""}function po(){const e=navigator.userAgentData;return e!=null&&e.brands?e.brands.map(t=>t.brand+"/"+t.version).join(" "):navigator.userAgent}function ne(e){return e instanceof me(e).HTMLElement}function $e(e){return e instanceof me(e).Element}function vr(e){return typeof ShadowRoot>"u"?!1:e instanceof me(e).ShadowRoot||e instanceof ShadowRoot}function en(e){const{overflow:t,overflowX:n,overflowY:r}=vt(e);return/auto|scroll|overlay|hidden/.test(t+r+n)}function bl(e){return["table","td","th"].includes(se(e))}function ua(e){const t=/firefox/i.test(po()),n=vt(e);return n.transform!=="none"||n.perspective!=="none"||n.contain==="paint"||["transform","perspective"].includes(n.willChange)||t&&n.willChange==="filter"||t&&!!n.filter&&n.filter!=="none"}function vo(){return!/^((?!chrome|android).)*safari/i.test(po())}const fa=Math.min,nt=Math.max,Wt=Math.round;function ce(e,t,n){var r,a,o,s;t===void 0&&(t=!1),n===void 0&&(n=!1);const i=e.getBoundingClientRect();let c=1,d=1;t&&ne(e)&&(c=e.offsetWidth>0&&Wt(i.width)/e.offsetWidth||1,d=e.offsetHeight>0&&Wt(i.height)/e.offsetHeight||1);const f=$e(e)?me(e):window,u=!vo()&&n,p=(i.left+(u&&(r=(a=f.visualViewport)==null?void 0:a.offsetLeft)!=null?r:0))/c,m=(i.top+(u&&(o=(s=f.visualViewport)==null?void 0:s.offsetTop)!=null?o:0))/d,b=i.width/c,v=i.height/d;return{width:b,height:v,top:m,right:p+b,bottom:m+v,left:p,x:p,y:m}}function ge(e){return(t=e,(t instanceof me(t).Node?e.ownerDocument:e.document)||window.document).documentElement;var t}function tn(e){return $e(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.pageXOffset,scrollTop:e.pageYOffset}}function bo(e){return ce(ge(e)).left+tn(e).scrollLeft}function gl(e,t,n){const r=ne(t),a=ge(t),o=ce(e,r&&function(c){const d=ce(c);return Wt(d.width)!==c.offsetWidth||Wt(d.height)!==c.offsetHeight}(t),n==="fixed");let s={scrollLeft:0,scrollTop:0};const i={x:0,y:0};if(r||!r&&n!=="fixed")if((se(t)!=="body"||en(a))&&(s=tn(t)),ne(t)){const c=ce(t,!0);i.x=c.x+t.clientLeft,i.y=c.y+t.clientTop}else a&&(i.x=bo(a));return{x:o.left+s.scrollLeft-i.x,y:o.top+s.scrollTop-i.y,width:o.width,height:o.height}}function go(e){return se(e)==="html"?e:e.assignedSlot||e.parentNode||(vr(e)?e.host:null)||ge(e)}function da(e){return ne(e)&&getComputedStyle(e).position!=="fixed"?e.offsetParent:null}function jn(e){const t=me(e);let n=da(e);for(;n&&bl(n)&&getComputedStyle(n).position==="static";)n=da(n);return n&&(se(n)==="html"||se(n)==="body"&&getComputedStyle(n).position==="static"&&!ua(n))?t:n||function(r){let a=go(r);for(vr(a)&&(a=a.host);ne(a)&&!["html","body"].includes(se(a));){if(ua(a))return a;a=a.parentNode}return null}(e)||t}function ma(e){if(ne(e))return{width:e.offsetWidth,height:e.offsetHeight};const t=ce(e);return{width:t.width,height:t.height}}function ho(e){const t=go(e);return["html","body","#document"].includes(se(t))?e.ownerDocument.body:ne(t)&&en(t)?t:ho(t)}function Yt(e,t){var n;t===void 0&&(t=[]);const r=ho(e),a=r===((n=e.ownerDocument)==null?void 0:n.body),o=me(r),s=a?[o].concat(o.visualViewport||[],en(r)?r:[]):r,i=t.concat(s);return a?i:i.concat(Yt(s))}function pa(e,t,n){return t==="viewport"?Ht(function(r,a){const o=me(r),s=ge(r),i=o.visualViewport;let c=s.clientWidth,d=s.clientHeight,f=0,u=0;if(i){c=i.width,d=i.height;const p=vo();(p||!p&&a==="fixed")&&(f=i.offsetLeft,u=i.offsetTop)}return{width:c,height:d,x:f,y:u}}(e,n)):$e(t)?function(r,a){const o=ce(r,!1,a==="fixed"),s=o.top+r.clientTop,i=o.left+r.clientLeft;return{top:s,left:i,x:i,y:s,right:i+r.clientWidth,bottom:s+r.clientHeight,width:r.clientWidth,height:r.clientHeight}}(t,n):Ht(function(r){var a;const o=ge(r),s=tn(r),i=(a=r.ownerDocument)==null?void 0:a.body,c=nt(o.scrollWidth,o.clientWidth,i?i.scrollWidth:0,i?i.clientWidth:0),d=nt(o.scrollHeight,o.clientHeight,i?i.scrollHeight:0,i?i.clientHeight:0);let f=-s.scrollLeft+bo(r);const u=-s.scrollTop;return vt(i||o).direction==="rtl"&&(f+=nt(o.clientWidth,i?i.clientWidth:0)-c),{width:c,height:d,x:f,y:u}}(ge(e)))}function hl(e){const t=Yt(e),n=["absolute","fixed"].includes(vt(e).position)&&ne(e)?jn(e):e;return $e(n)?t.filter(r=>$e(r)&&function(a,o){const s=o.getRootNode==null?void 0:o.getRootNode();if(a.contains(o))return!0;if(s&&vr(s)){let i=o;do{if(i&&a===i)return!0;i=i.parentNode||i.host}while(i)}return!1}(r,n)&&se(r)!=="body"):[]}const yl={getClippingRect:function(e){let{element:t,boundary:n,rootBoundary:r,strategy:a}=e;const o=[...n==="clippingAncestors"?hl(t):[].concat(n),r],s=o[0],i=o.reduce((c,d)=>{const f=pa(t,d,a);return c.top=nt(f.top,c.top),c.right=fa(f.right,c.right),c.bottom=fa(f.bottom,c.bottom),c.left=nt(f.left,c.left),c},pa(t,s,a));return{width:i.right-i.left,height:i.bottom-i.top,x:i.left,y:i.top}},convertOffsetParentRelativeRectToViewportRelativeRect:function(e){let{rect:t,offsetParent:n,strategy:r}=e;const a=ne(n),o=ge(n);if(n===o)return t;let s={scrollLeft:0,scrollTop:0};const i={x:0,y:0};if((a||!a&&r!=="fixed")&&((se(n)!=="body"||en(o))&&(s=tn(n)),ne(n))){const c=ce(n,!0);i.x=c.x+n.clientLeft,i.y=c.y+n.clientTop}return{...t,x:t.x-s.scrollLeft+i.x,y:t.y-s.scrollTop+i.y}},isElement:$e,getDimensions:ma,getOffsetParent:jn,getDocumentElement:ge,getElementRects:e=>{let{reference:t,floating:n,strategy:r}=e;return{reference:gl(t,jn(n),r),floating:{...ma(n),x:0,y:0}}},getClientRects:e=>Array.from(e.getClientRects()),isRTL:e=>vt(e).direction==="rtl"};function wl(e,t,n,r){r===void 0&&(r={});const{ancestorScroll:a=!0,ancestorResize:o=!0,elementResize:s=!0,animationFrame:i=!1}=r,c=a&&!i,d=o&&!i,f=c||d?[...$e(e)?Yt(e):[],...Yt(t)]:[];f.forEach(b=>{c&&b.addEventListener("scroll",n,{passive:!0}),d&&b.addEventListener("resize",n)});let u,p=null;if(s){let b=!0;p=new ResizeObserver(()=>{b||n(),b=!1}),$e(e)&&!i&&p.observe(e),p.observe(t)}let m=i?ce(e):null;return i&&function b(){const v=ce(e);!m||v.x===m.x&&v.y===m.y&&v.width===m.width&&v.height===m.height||n(),m=v,u=requestAnimationFrame(b)}(),n(),()=>{var b;f.forEach(v=>{c&&v.removeEventListener("scroll",n),d&&v.removeEventListener("resize",n)}),(b=p)==null||b.disconnect(),p=null,i&&cancelAnimationFrame(u)}}const xl=(e,t,n)=>ol(e,t,{platform:yl,...n});var Hn=typeof document<"u"?l.useLayoutEffect:l.useEffect;function Un(e,t){if(e===t)return!0;if(typeof e!=typeof t)return!1;if(typeof e=="function"&&e.toString()===t.toString())return!0;let n,r,a;if(e&&t&&typeof e=="object"){if(Array.isArray(e)){if(n=e.length,n!=t.length)return!1;for(r=n;r--!==0;)if(!Un(e[r],t[r]))return!1;return!0}if(a=Object.keys(e),n=a.length,n!==Object.keys(t).length)return!1;for(r=n;r--!==0;)if(!Object.prototype.hasOwnProperty.call(t,a[r]))return!1;for(r=n;r--!==0;){const o=a[r];if(!(o==="_owner"&&e.$$typeof)&&!Un(e[o],t[o]))return!1}return!0}return e!==e&&t!==t}function $l(e){const t=l.useRef(e);return Hn(()=>{t.current=e}),t}function El(e){let{middleware:t,placement:n="bottom",strategy:r="absolute",whileElementsMounted:a}=e===void 0?{}:e;const o=l.useRef(null),s=l.useRef(null),i=$l(a),c=l.useRef(null),[d,f]=l.useState({x:null,y:null,strategy:r,placement:n,middlewareData:{}}),[u,p]=l.useState(t);Un(u==null?void 0:u.map(w=>{let{options:x}=w;return x}),t==null?void 0:t.map(w=>{let{options:x}=w;return x}))||p(t);const m=l.useCallback(()=>{!o.current||!s.current||xl(o.current,s.current,{middleware:u,placement:n,strategy:r}).then(w=>{b.current&&Qn.flushSync(()=>{f(w)})})},[u,n,r]);Hn(()=>{b.current&&m()},[m]);const b=l.useRef(!1);Hn(()=>(b.current=!0,()=>{b.current=!1}),[]);const v=l.useCallback(()=>{if(typeof c.current=="function"&&(c.current(),c.current=null),o.current&&s.current)if(i.current){const w=i.current(o.current,s.current,m);c.current=w}else m()},[m,i]),h=l.useCallback(w=>{o.current=w,v()},[v]),g=l.useCallback(w=>{s.current=w,v()},[v]),y=l.useMemo(()=>({reference:o,floating:s}),[]);return l.useMemo(()=>({...d,update:m,refs:y,reference:h,floating:g}),[d,m,y,h,g])}const kl=e=>{const{element:t,padding:n}=e;function r(a){return Object.prototype.hasOwnProperty.call(a,"current")}return{name:"arrow",options:e,fn(a){return r(t)?t.current!=null?ia({element:t.current,padding:n}).fn(a):{}:t?ia({element:t,padding:n}).fn(a):{}}}};function Sl(e){const[t,n]=l.useState(void 0);return be(()=>{if(e){n({width:e.offsetWidth,height:e.offsetHeight});const r=new ResizeObserver(a=>{if(!Array.isArray(a)||!a.length)return;const o=a[0];let s,i;if("borderBoxSize"in o){const c=o.borderBoxSize,d=Array.isArray(c)?c[0]:c;s=d.inlineSize,i=d.blockSize}else s=e.offsetWidth,i=e.offsetHeight;n({width:s,height:i})});return r.observe(e,{box:"border-box"}),()=>r.unobserve(e)}else n(void 0)},[e]),t}const yo="Popper",[br,wo]=mt(yo),[Cl,xo]=br(yo),Al=e=>{const{__scopePopper:t,children:n}=e,[r,a]=l.useState(null);return l.createElement(Cl,{scope:t,anchor:r,onAnchorChange:a},n)},Pl="PopperAnchor",Ol=l.forwardRef((e,t)=>{const{__scopePopper:n,virtualRef:r,...a}=e,o=xo(Pl,n),s=l.useRef(null),i=X(t,s);return l.useEffect(()=>{o.onAnchorChange((r==null?void 0:r.current)||s.current)}),r?null:l.createElement(Q.div,I({},a,{ref:i}))}),Bt="PopperContent",[Rl,hd]=br(Bt),[Tl,Il]=br(Bt,{hasParent:!1,positionUpdateFns:new Set}),_l=l.forwardRef((e,t)=>{var n,r,a,o,s,i,c,d;const{__scopePopper:f,side:u="bottom",sideOffset:p=0,align:m="center",alignOffset:b=0,arrowPadding:v=0,collisionBoundary:h=[],collisionPadding:g=0,sticky:y="partial",hideWhenDetached:w=!1,avoidCollisions:x=!0,onPlaced:k,...R}=e,C=xo(Bt,f),[S,O]=l.useState(null),D=X(t,Le=>O(Le)),[W,V]=l.useState(null),j=Sl(W),re=(n=j==null?void 0:j.width)!==null&&n!==void 0?n:0,K=(r=j==null?void 0:j.height)!==null&&r!==void 0?r:0,an=u+(m!=="center"?"-"+m:""),on=typeof g=="number"?g:{top:0,right:0,bottom:0,left:0,...g},ae=Array.isArray(h)?h:[h],P=ae.length>0,L={padding:on,boundary:ae.filter(Nl),altBoundary:P},{reference:Y,floating:oe,strategy:Ee,x:_e,y:Xe,placement:Me,middlewareData:G,update:Ne}=El({strategy:"fixed",placement:an,whileElementsMounted:wl,middleware:[Dl(),dl({mainAxis:p+K,alignmentAxis:b}),x?ml({mainAxis:!0,crossAxis:!1,limiter:y==="partial"?pl():void 0,...L}):void 0,W?kl({element:W,padding:v}):void 0,x?ul({...L}):void 0,vl({...L,apply:({elements:Le,availableWidth:Qo,availableHeight:Zo})=>{Le.floating.style.setProperty("--radix-popper-available-width",`${Qo}px`),Le.floating.style.setProperty("--radix-popper-available-height",`${Zo}px`)}}),Ll({arrowWidth:re,arrowHeight:K}),w?fl({strategy:"referenceHidden"}):void 0].filter(Ml)});be(()=>{Y(C.anchor)},[Y,C.anchor]);const H=_e!==null&&Xe!==null,[qe,Yo]=$o(Me),gt=te(k);be(()=>{H&&(gt==null||gt())},[H,gt]);const Bo=(a=G.arrow)===null||a===void 0?void 0:a.x,Vo=(o=G.arrow)===null||o===void 0?void 0:o.y,Ko=((s=G.arrow)===null||s===void 0?void 0:s.centerOffset)!==0,[Go,Xo]=l.useState();be(()=>{S&&Xo(window.getComputedStyle(S).zIndex)},[S]);const{hasParent:qo,positionUpdateFns:De}=Il(Bt,f),Qe=!qo;l.useLayoutEffect(()=>{if(!Qe)return De.add(Ne),()=>{De.delete(Ne)}},[Qe,De,Ne]),be(()=>{Qe&&H&&Array.from(De).reverse().forEach(Le=>requestAnimationFrame(Le))},[Qe,H,De]);const xr={"data-side":qe,"data-align":Yo,...R,ref:D,style:{...R.style,animation:H?void 0:"none",opacity:(i=G.hide)!==null&&i!==void 0&&i.referenceHidden?0:void 0}};return l.createElement("div",{ref:oe,"data-radix-popper-content-wrapper":"",style:{position:Ee,left:0,top:0,transform:H?`translate3d(${Math.round(_e)}px, ${Math.round(Xe)}px, 0)`:"translate3d(0, -200%, 0)",minWidth:"max-content",zIndex:Go,["--radix-popper-transform-origin"]:[(c=G.transformOrigin)===null||c===void 0?void 0:c.x,(d=G.transformOrigin)===null||d===void 0?void 0:d.y].join(" ")},dir:e.dir},l.createElement(Rl,{scope:f,placedSide:qe,onArrowChange:V,arrowX:Bo,arrowY:Vo,shouldHideArrow:Ko},Qe?l.createElement(Tl,{scope:f,hasParent:!0,positionUpdateFns:De},l.createElement(Q.div,xr)):l.createElement(Q.div,xr)))});function Ml(e){return e!==void 0}function Nl(e){return e!==null}const Dl=()=>({name:"anchorCssProperties",fn(e){const{rects:t,elements:n}=e,{width:r,height:a}=t.reference;return n.floating.style.setProperty("--radix-popper-anchor-width",`${r}px`),n.floating.style.setProperty("--radix-popper-anchor-height",`${a}px`),{}}}),Ll=e=>({name:"transformOrigin",options:e,fn(t){var n,r,a,o,s;const{placement:i,rects:c,middlewareData:d}=t,u=((n=d.arrow)===null||n===void 0?void 0:n.centerOffset)!==0,p=u?0:e.arrowWidth,m=u?0:e.arrowHeight,[b,v]=$o(i),h={start:"0%",center:"50%",end:"100%"}[v],g=((r=(a=d.arrow)===null||a===void 0?void 0:a.x)!==null&&r!==void 0?r:0)+p/2,y=((o=(s=d.arrow)===null||s===void 0?void 0:s.y)!==null&&o!==void 0?o:0)+m/2;let w="",x="";return b==="bottom"?(w=u?h:`${g}px`,x=`${-m}px`):b==="top"?(w=u?h:`${g}px`,x=`${c.floating.height+m}px`):b==="right"?(w=`${-m}px`,x=u?h:`${y}px`):b==="left"&&(w=`${c.floating.width+m}px`,x=u?h:`${y}px`),{data:{x:w,y:x}}}});function $o(e){const[t,n="center"]=e.split("-");return[t,n]}const Fl=Al,zl=Ol,jl=_l,Hl=l.forwardRef((e,t)=>{var n;const{container:r=globalThis==null||(n=globalThis.document)===null||n===void 0?void 0:n.body,...a}=e;return r?ai.createPortal(l.createElement(Q.div,I({},a,{ref:t})),r):null});function Ul(e,t){return l.useReducer((n,r)=>{const a=t[n][r];return a??n},e)}const gr=e=>{const{present:t,children:n}=e,r=Wl(t),a=typeof n=="function"?n({present:r.isPresent}):l.Children.only(n),o=X(r.ref,a.ref);return typeof n=="function"||r.isPresent?l.cloneElement(a,{ref:o}):null};gr.displayName="Presence";function Wl(e){const[t,n]=l.useState(),r=l.useRef({}),a=l.useRef(e),o=l.useRef("none"),s=e?"mounted":"unmounted",[i,c]=Ul(s,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return l.useEffect(()=>{const d=Pt(r.current);o.current=i==="mounted"?d:"none"},[i]),be(()=>{const d=r.current,f=a.current;if(f!==e){const p=o.current,m=Pt(d);e?c("MOUNT"):m==="none"||(d==null?void 0:d.display)==="none"?c("UNMOUNT"):c(f&&p!==m?"ANIMATION_OUT":"UNMOUNT"),a.current=e}},[e,c]),be(()=>{if(t){const d=u=>{const m=Pt(r.current).includes(u.animationName);u.target===t&&m&&Qn.flushSync(()=>c("ANIMATION_END"))},f=u=>{u.target===t&&(o.current=Pt(r.current))};return t.addEventListener("animationstart",f),t.addEventListener("animationcancel",d),t.addEventListener("animationend",d),()=>{t.removeEventListener("animationstart",f),t.removeEventListener("animationcancel",d),t.removeEventListener("animationend",d)}}else c("ANIMATION_END")},[t,c]),{isPresent:["mounted","unmountSuspended"].includes(i),ref:l.useCallback(d=>{d&&(r.current=getComputedStyle(d)),n(d)},[])}}function Pt(e){return(e==null?void 0:e.animationName)||"none"}const bn="rovingFocusGroup.onEntryFocus",Yl={bubbles:!1,cancelable:!0},hr="RovingFocusGroup",[Wn,Eo,Bl]=oo(hr),[Vl,ko]=mt(hr,[Bl]),[Kl,Gl]=Vl(hr),Xl=l.forwardRef((e,t)=>l.createElement(Wn.Provider,{scope:e.__scopeRovingFocusGroup},l.createElement(Wn.Slot,{scope:e.__scopeRovingFocusGroup},l.createElement(ql,I({},e,{ref:t}))))),ql=l.forwardRef((e,t)=>{const{__scopeRovingFocusGroup:n,orientation:r,loop:a=!1,dir:o,currentTabStopId:s,defaultCurrentTabStopId:i,onCurrentTabStopIdChange:c,onEntryFocus:d,...f}=e,u=l.useRef(null),p=X(t,u),m=io(o),[b=null,v]=ro({prop:s,defaultProp:i,onChange:c}),[h,g]=l.useState(!1),y=te(d),w=Eo(n),x=l.useRef(!1),[k,R]=l.useState(0);return l.useEffect(()=>{const C=u.current;if(C)return C.addEventListener(bn,y),()=>C.removeEventListener(bn,y)},[y]),l.createElement(Kl,{scope:n,orientation:r,dir:m,loop:a,currentTabStopId:b,onItemFocus:l.useCallback(C=>v(C),[v]),onItemShiftTab:l.useCallback(()=>g(!0),[]),onFocusableItemAdd:l.useCallback(()=>R(C=>C+1),[]),onFocusableItemRemove:l.useCallback(()=>R(C=>C-1),[])},l.createElement(Q.div,I({tabIndex:h||k===0?-1:0,"data-orientation":r},f,{ref:p,style:{outline:"none",...e.style},onMouseDown:_(e.onMouseDown,()=>{x.current=!0}),onFocus:_(e.onFocus,C=>{const S=!x.current;if(C.target===C.currentTarget&&S&&!h){const O=new CustomEvent(bn,Yl);if(C.currentTarget.dispatchEvent(O),!O.defaultPrevented){const D=w().filter(K=>K.focusable),W=D.find(K=>K.active),V=D.find(K=>K.id===b),re=[W,V,...D].filter(Boolean).map(K=>K.ref.current);So(re)}}x.current=!1}),onBlur:_(e.onBlur,()=>g(!1))})))}),Ql="RovingFocusGroupItem",Zl=l.forwardRef((e,t)=>{const{__scopeRovingFocusGroup:n,focusable:r=!0,active:a=!1,tabStopId:o,...s}=e,i=Fn(),c=o||i,d=Gl(Ql,n),f=d.currentTabStopId===c,u=Eo(n),{onFocusableItemAdd:p,onFocusableItemRemove:m}=d;return l.useEffect(()=>{if(r)return p(),()=>m()},[r,p,m]),l.createElement(Wn.ItemSlot,{scope:n,id:c,focusable:r,active:a},l.createElement(Q.span,I({tabIndex:f?0:-1,"data-orientation":d.orientation},s,{ref:t,onMouseDown:_(e.onMouseDown,b=>{r?d.onItemFocus(c):b.preventDefault()}),onFocus:_(e.onFocus,()=>d.onItemFocus(c)),onKeyDown:_(e.onKeyDown,b=>{if(b.key==="Tab"&&b.shiftKey){d.onItemShiftTab();return}if(b.target!==b.currentTarget)return;const v=tu(b,d.orientation,d.dir);if(v!==void 0){b.preventDefault();let g=u().filter(y=>y.focusable).map(y=>y.ref.current);if(v==="last")g.reverse();else if(v==="prev"||v==="next"){v==="prev"&&g.reverse();const y=g.indexOf(b.currentTarget);g=d.loop?nu(g,y+1):g.slice(y+1)}setTimeout(()=>So(g))}})})))}),Jl={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function eu(e,t){return t!=="rtl"?e:e==="ArrowLeft"?"ArrowRight":e==="ArrowRight"?"ArrowLeft":e}function tu(e,t,n){const r=eu(e.key,n);if(!(t==="vertical"&&["ArrowLeft","ArrowRight"].includes(r))&&!(t==="horizontal"&&["ArrowUp","ArrowDown"].includes(r)))return Jl[r]}function So(e){const t=document.activeElement;for(const n of e)if(n===t||(n.focus(),document.activeElement!==t))return}function nu(e,t){return e.map((n,r)=>e[(t+r)%e.length])}const ru=Xl,au=Zl;var ou=function(e){if(typeof document>"u")return null;var t=Array.isArray(e)?e[0]:e;return t.ownerDocument.body},Fe=new WeakMap,Ot=new WeakMap,Rt={},gn=0,Co=function(e){return e&&(e.host||Co(e.parentNode))},iu=function(e,t){return t.map(function(n){if(e.contains(n))return n;var r=Co(n);return r&&e.contains(r)?r:(console.error("aria-hidden",n,"in not contained inside",e,". Doing nothing"),null)}).filter(function(n){return Boolean(n)})},su=function(e,t,n,r){var a=iu(t,Array.isArray(e)?e:[e]);Rt[n]||(Rt[n]=new WeakMap);var o=Rt[n],s=[],i=new Set,c=new Set(a),d=function(u){!u||i.has(u)||(i.add(u),d(u.parentNode))};a.forEach(d);var f=function(u){!u||c.has(u)||Array.prototype.forEach.call(u.children,function(p){if(i.has(p))f(p);else{var m=p.getAttribute(r),b=m!==null&&m!=="false",v=(Fe.get(p)||0)+1,h=(o.get(p)||0)+1;Fe.set(p,v),o.set(p,h),s.push(p),v===1&&b&&Ot.set(p,!0),h===1&&p.setAttribute(n,"true"),b||p.setAttribute(r,"true")}})};return f(t),i.clear(),gn++,function(){s.forEach(function(u){var p=Fe.get(u)-1,m=o.get(u)-1;Fe.set(u,p),o.set(u,m),p||(Ot.has(u)||u.removeAttribute(r),Ot.delete(u)),m||u.removeAttribute(n)}),gn--,gn||(Fe=new WeakMap,Fe=new WeakMap,Ot=new WeakMap,Rt={})}},cu=function(e,t,n){n===void 0&&(n="data-aria-hidden");var r=Array.from(Array.isArray(e)?e:[e]),a=t||ou(e);return a?(r.push.apply(r,Array.from(a.querySelectorAll("[aria-live]"))),su(r,a,n,"aria-hidden")):function(){return null}},Z=function(){return Z=Object.assign||function(t){for(var n,r=1,a=arguments.length;r<a;r++){n=arguments[r];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},Z.apply(this,arguments)};function Ao(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]]);return n}function lu(e,t,n){if(n||arguments.length===2)for(var r=0,a=t.length,o;r<a;r++)(o||!(r in t))&&(o||(o=Array.prototype.slice.call(t,0,r)),o[r]=t[r]);return e.concat(o||Array.prototype.slice.call(t))}var Nt="right-scroll-bar-position",Dt="width-before-scroll-bar",uu="with-scroll-bars-hidden",fu="--removed-body-scroll-bar-size";function du(e,t){return typeof e=="function"?e(t):e&&(e.current=t),e}function mu(e,t){var n=l.useState(function(){return{value:e,callback:t,facade:{get current(){return n.value},set current(r){var a=n.value;a!==r&&(n.value=r,n.callback(r,a))}}}})[0];return n.callback=t,n.facade}function pu(e,t){return mu(t||null,function(n){return e.forEach(function(r){return du(r,n)})})}function vu(e){return e}function bu(e,t){t===void 0&&(t=vu);var n=[],r=!1,a={read:function(){if(r)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return n.length?n[n.length-1]:e},useMedium:function(o){var s=t(o,r);return n.push(s),function(){n=n.filter(function(i){return i!==s})}},assignSyncMedium:function(o){for(r=!0;n.length;){var s=n;n=[],s.forEach(o)}n={push:function(i){return o(i)},filter:function(){return n}}},assignMedium:function(o){r=!0;var s=[];if(n.length){var i=n;n=[],i.forEach(o),s=n}var c=function(){var f=s;s=[],f.forEach(o)},d=function(){return Promise.resolve().then(c)};d(),n={push:function(f){s.push(f),d()},filter:function(f){return s=s.filter(f),n}}}};return a}function gu(e){e===void 0&&(e={});var t=bu(null);return t.options=Z({async:!0,ssr:!1},e),t}var Po=function(e){var t=e.sideCar,n=Ao(e,["sideCar"]);if(!t)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var r=t.read();if(!r)throw new Error("Sidecar medium not found");return l.createElement(r,Z({},n))};Po.isSideCarExport=!0;function hu(e,t){return e.useMedium(t),Po}var Oo=gu(),hn=function(){},nn=l.forwardRef(function(e,t){var n=l.useRef(null),r=l.useState({onScrollCapture:hn,onWheelCapture:hn,onTouchMoveCapture:hn}),a=r[0],o=r[1],s=e.forwardProps,i=e.children,c=e.className,d=e.removeScrollBar,f=e.enabled,u=e.shards,p=e.sideCar,m=e.noIsolation,b=e.inert,v=e.allowPinchZoom,h=e.as,g=h===void 0?"div":h,y=Ao(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noIsolation","inert","allowPinchZoom","as"]),w=p,x=pu([n,t]),k=Z(Z({},y),a);return l.createElement(l.Fragment,null,f&&l.createElement(w,{sideCar:Oo,removeScrollBar:d,shards:u,noIsolation:m,inert:b,setCallbacks:o,allowPinchZoom:!!v,lockRef:n}),s?l.cloneElement(l.Children.only(i),Z(Z({},k),{ref:x})):l.createElement(g,Z({},k,{className:c,ref:x}),i))});nn.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};nn.classNames={fullWidth:Dt,zeroRight:Nt};var yu=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function wu(){if(!document)return null;var e=document.createElement("style");e.type="text/css";var t=yu();return t&&e.setAttribute("nonce",t),e}function xu(e,t){e.styleSheet?e.styleSheet.cssText=t:e.appendChild(document.createTextNode(t))}function $u(e){var t=document.head||document.getElementsByTagName("head")[0];t.appendChild(e)}var Eu=function(){var e=0,t=null;return{add:function(n){e==0&&(t=wu())&&(xu(t,n),$u(t)),e++},remove:function(){e--,!e&&t&&(t.parentNode&&t.parentNode.removeChild(t),t=null)}}},ku=function(){var e=Eu();return function(t,n){l.useEffect(function(){return e.add(t),function(){e.remove()}},[t&&n])}},Ro=function(){var e=ku(),t=function(n){var r=n.styles,a=n.dynamic;return e(r,a),null};return t},Su={left:0,top:0,right:0,gap:0},yn=function(e){return parseInt(e||"",10)||0},Cu=function(e){var t=window.getComputedStyle(document.body),n=t[e==="padding"?"paddingLeft":"marginLeft"],r=t[e==="padding"?"paddingTop":"marginTop"],a=t[e==="padding"?"paddingRight":"marginRight"];return[yn(n),yn(r),yn(a)]},Au=function(e){if(e===void 0&&(e="margin"),typeof window>"u")return Su;var t=Cu(e),n=document.documentElement.clientWidth,r=window.innerWidth;return{left:t[0],top:t[1],right:t[2],gap:Math.max(0,r-n+t[2]-t[0])}},Pu=Ro(),Ou=function(e,t,n,r){var a=e.left,o=e.top,s=e.right,i=e.gap;return n===void 0&&(n="margin"),`
  .`.concat(uu,` {
   overflow: hidden `).concat(r,`;
   padding-right: `).concat(i,"px ").concat(r,`;
  }
  body {
    overflow: hidden `).concat(r,`;
    overscroll-behavior: contain;
    `).concat([t&&"position: relative ".concat(r,";"),n==="margin"&&`
    padding-left: `.concat(a,`px;
    padding-top: `).concat(o,`px;
    padding-right: `).concat(s,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(i,"px ").concat(r,`;
    `),n==="padding"&&"padding-right: ".concat(i,"px ").concat(r,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(Nt,` {
    right: `).concat(i,"px ").concat(r,`;
  }
  
  .`).concat(Dt,` {
    margin-right: `).concat(i,"px ").concat(r,`;
  }
  
  .`).concat(Nt," .").concat(Nt,` {
    right: 0 `).concat(r,`;
  }
  
  .`).concat(Dt," .").concat(Dt,` {
    margin-right: 0 `).concat(r,`;
  }
  
  body {
    `).concat(fu,": ").concat(i,`px;
  }
`)},Ru=function(e){var t=e.noRelative,n=e.noImportant,r=e.gapMode,a=r===void 0?"margin":r,o=l.useMemo(function(){return Au(a)},[a]);return l.createElement(Pu,{styles:Ou(o,!t,a,n?"":"!important")})},Yn=!1;if(typeof window<"u")try{var Tt=Object.defineProperty({},"passive",{get:function(){return Yn=!0,!0}});window.addEventListener("test",Tt,Tt),window.removeEventListener("test",Tt,Tt)}catch{Yn=!1}var ze=Yn?{passive:!1}:!1,Tu=function(e){return e.tagName==="TEXTAREA"},To=function(e,t){var n=window.getComputedStyle(e);return n[t]!=="hidden"&&!(n.overflowY===n.overflowX&&!Tu(e)&&n[t]==="visible")},Iu=function(e){return To(e,"overflowY")},_u=function(e){return To(e,"overflowX")},va=function(e,t){var n=t;do{typeof ShadowRoot<"u"&&n instanceof ShadowRoot&&(n=n.host);var r=Io(e,n);if(r){var a=_o(e,n),o=a[1],s=a[2];if(o>s)return!0}n=n.parentNode}while(n&&n!==document.body);return!1},Mu=function(e){var t=e.scrollTop,n=e.scrollHeight,r=e.clientHeight;return[t,n,r]},Nu=function(e){var t=e.scrollLeft,n=e.scrollWidth,r=e.clientWidth;return[t,n,r]},Io=function(e,t){return e==="v"?Iu(t):_u(t)},_o=function(e,t){return e==="v"?Mu(t):Nu(t)},Du=function(e,t){return e==="h"&&t==="rtl"?-1:1},Lu=function(e,t,n,r,a){var o=Du(e,window.getComputedStyle(t).direction),s=o*r,i=n.target,c=t.contains(i),d=!1,f=s>0,u=0,p=0;do{var m=_o(e,i),b=m[0],v=m[1],h=m[2],g=v-h-o*b;(b||g)&&Io(e,i)&&(u+=g,p+=b),i=i.parentNode}while(!c&&i!==document.body||c&&(t.contains(i)||t===i));return(f&&(a&&u===0||!a&&s>u)||!f&&(a&&p===0||!a&&-s>p))&&(d=!0),d},It=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},ba=function(e){return[e.deltaX,e.deltaY]},ga=function(e){return e&&"current"in e?e.current:e},Fu=function(e,t){return e[0]===t[0]&&e[1]===t[1]},zu=function(e){return`
  .block-interactivity-`.concat(e,` {pointer-events: none;}
  .allow-interactivity-`).concat(e,` {pointer-events: all;}
`)},ju=0,je=[];function Hu(e){var t=l.useRef([]),n=l.useRef([0,0]),r=l.useRef(),a=l.useState(ju++)[0],o=l.useState(function(){return Ro()})[0],s=l.useRef(e);l.useEffect(function(){s.current=e},[e]),l.useEffect(function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(a));var v=lu([e.lockRef.current],(e.shards||[]).map(ga),!0).filter(Boolean);return v.forEach(function(h){return h.classList.add("allow-interactivity-".concat(a))}),function(){document.body.classList.remove("block-interactivity-".concat(a)),v.forEach(function(h){return h.classList.remove("allow-interactivity-".concat(a))})}}},[e.inert,e.lockRef.current,e.shards]);var i=l.useCallback(function(v,h){if("touches"in v&&v.touches.length===2)return!s.current.allowPinchZoom;var g=It(v),y=n.current,w="deltaX"in v?v.deltaX:y[0]-g[0],x="deltaY"in v?v.deltaY:y[1]-g[1],k,R=v.target,C=Math.abs(w)>Math.abs(x)?"h":"v";if("touches"in v&&C==="h"&&R.type==="range")return!1;var S=va(C,R);if(!S)return!0;if(S?k=C:(k=C==="v"?"h":"v",S=va(C,R)),!S)return!1;if(!r.current&&"changedTouches"in v&&(w||x)&&(r.current=k),!k)return!0;var O=r.current||k;return Lu(O,h,v,O==="h"?w:x,!0)},[]),c=l.useCallback(function(v){var h=v;if(!(!je.length||je[je.length-1]!==o)){var g="deltaY"in h?ba(h):It(h),y=t.current.filter(function(k){return k.name===h.type&&k.target===h.target&&Fu(k.delta,g)})[0];if(y&&y.should){h.cancelable&&h.preventDefault();return}if(!y){var w=(s.current.shards||[]).map(ga).filter(Boolean).filter(function(k){return k.contains(h.target)}),x=w.length>0?i(h,w[0]):!s.current.noIsolation;x&&h.cancelable&&h.preventDefault()}}},[]),d=l.useCallback(function(v,h,g,y){var w={name:v,delta:h,target:g,should:y};t.current.push(w),setTimeout(function(){t.current=t.current.filter(function(x){return x!==w})},1)},[]),f=l.useCallback(function(v){n.current=It(v),r.current=void 0},[]),u=l.useCallback(function(v){d(v.type,ba(v),v.target,i(v,e.lockRef.current))},[]),p=l.useCallback(function(v){d(v.type,It(v),v.target,i(v,e.lockRef.current))},[]);l.useEffect(function(){return je.push(o),e.setCallbacks({onScrollCapture:u,onWheelCapture:u,onTouchMoveCapture:p}),document.addEventListener("wheel",c,ze),document.addEventListener("touchmove",c,ze),document.addEventListener("touchstart",f,ze),function(){je=je.filter(function(v){return v!==o}),document.removeEventListener("wheel",c,ze),document.removeEventListener("touchmove",c,ze),document.removeEventListener("touchstart",f,ze)}},[]);var m=e.removeScrollBar,b=e.inert;return l.createElement(l.Fragment,null,b?l.createElement(o,{styles:zu(a)}):null,m?l.createElement(Ru,{gapMode:"margin"}):null)}const Uu=hu(Oo,Hu);var Mo=l.forwardRef(function(e,t){return l.createElement(nn,Z({},e,{ref:t,sideCar:Uu}))});Mo.classNames=nn.classNames;const Wu=Mo,Yu=["Enter"," "],Bu=["ArrowDown","PageUp","Home"],No=["ArrowUp","PageDown","End"],Vu=[...Bu,...No],rn="Menu",[Bn,Ku,Gu]=oo(rn),[Ie,Do]=mt(rn,[Gu,wo,ko]),yr=wo(),Lo=ko(),[Xu,bt]=Ie(rn),[qu,wr]=Ie(rn),Qu=e=>{const{__scopeMenu:t,open:n=!1,children:r,dir:a,onOpenChange:o,modal:s=!0}=e,i=yr(t),[c,d]=l.useState(null),f=l.useRef(!1),u=te(o),p=io(a);return l.useEffect(()=>{const m=()=>{f.current=!0,document.addEventListener("pointerdown",b,{capture:!0,once:!0}),document.addEventListener("pointermove",b,{capture:!0,once:!0})},b=()=>f.current=!1;return document.addEventListener("keydown",m,{capture:!0}),()=>{document.removeEventListener("keydown",m,{capture:!0}),document.removeEventListener("pointerdown",b,{capture:!0}),document.removeEventListener("pointermove",b,{capture:!0})}},[]),l.createElement(Fl,i,l.createElement(Xu,{scope:t,open:n,onOpenChange:u,content:c,onContentChange:d},l.createElement(qu,{scope:t,onClose:l.useCallback(()=>u(!1),[u]),isUsingKeyboardRef:f,dir:p,modal:s},r)))},Zu=l.forwardRef((e,t)=>{const{__scopeMenu:n,...r}=e,a=yr(n);return l.createElement(zl,I({},a,r,{ref:t}))}),Fo="MenuPortal",[Ju,ef]=Ie(Fo,{forceMount:void 0}),tf=e=>{const{__scopeMenu:t,forceMount:n,children:r,container:a}=e,o=bt(Fo,t);return l.createElement(Ju,{scope:t,forceMount:n},l.createElement(gr,{present:n||o.open},l.createElement(Hl,{asChild:!0,container:a},r)))},he="MenuContent",[nf,zo]=Ie(he),rf=l.forwardRef((e,t)=>{const n=ef(he,e.__scopeMenu),{forceMount:r=n.forceMount,...a}=e,o=bt(he,e.__scopeMenu),s=wr(he,e.__scopeMenu);return l.createElement(Bn.Provider,{scope:e.__scopeMenu},l.createElement(gr,{present:r||o.open},l.createElement(Bn.Slot,{scope:e.__scopeMenu},s.modal?l.createElement(af,I({},a,{ref:t})):l.createElement(of,I({},a,{ref:t})))))}),af=l.forwardRef((e,t)=>{const n=bt(he,e.__scopeMenu),r=l.useRef(null),a=X(t,r);return l.useEffect(()=>{const o=r.current;if(o)return cu(o)},[]),l.createElement(jo,I({},e,{ref:a,trapFocus:n.open,disableOutsidePointerEvents:n.open,disableOutsideScroll:!0,onFocusOutside:_(e.onFocusOutside,o=>o.preventDefault(),{checkForDefaultPrevented:!1}),onDismiss:()=>n.onOpenChange(!1)}))}),of=l.forwardRef((e,t)=>{const n=bt(he,e.__scopeMenu);return l.createElement(jo,I({},e,{ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,disableOutsideScroll:!1,onDismiss:()=>n.onOpenChange(!1)}))}),jo=l.forwardRef((e,t)=>{const{__scopeMenu:n,loop:r=!1,trapFocus:a,onOpenAutoFocus:o,onCloseAutoFocus:s,disableOutsidePointerEvents:i,onEntryFocus:c,onEscapeKeyDown:d,onPointerDownOutside:f,onFocusOutside:u,onInteractOutside:p,onDismiss:m,disableOutsideScroll:b,...v}=e,h=bt(he,n),g=wr(he,n),y=yr(n),w=Lo(n),x=Ku(n),[k,R]=l.useState(null),C=l.useRef(null),S=X(t,C,h.onContentChange),O=l.useRef(0),D=l.useRef(""),W=l.useRef(0),V=l.useRef(null),j=l.useRef("right"),re=l.useRef(0),K=b?Wu:l.Fragment,an=b?{as:ct,allowPinchZoom:!0}:void 0,on=P=>{var L,Y;const oe=D.current+P,Ee=x().filter(H=>!H.disabled),_e=document.activeElement,Xe=(L=Ee.find(H=>H.ref.current===_e))===null||L===void 0?void 0:L.textValue,Me=Ee.map(H=>H.textValue),G=bf(Me,oe,Xe),Ne=(Y=Ee.find(H=>H.textValue===G))===null||Y===void 0?void 0:Y.ref.current;(function H(qe){D.current=qe,window.clearTimeout(O.current),qe!==""&&(O.current=window.setTimeout(()=>H(""),1e3))})(oe),Ne&&setTimeout(()=>Ne.focus())};l.useEffect(()=>()=>window.clearTimeout(O.current),[]),Xc();const ae=l.useCallback(P=>{var L,Y;return j.current===((L=V.current)===null||L===void 0?void 0:L.side)&&hf(P,(Y=V.current)===null||Y===void 0?void 0:Y.area)},[]);return l.createElement(nf,{scope:n,searchRef:D,onItemEnter:l.useCallback(P=>{ae(P)&&P.preventDefault()},[ae]),onItemLeave:l.useCallback(P=>{var L;ae(P)||((L=C.current)===null||L===void 0||L.focus(),R(null))},[ae]),onTriggerLeave:l.useCallback(P=>{ae(P)&&P.preventDefault()},[ae]),pointerGraceTimerRef:W,onPointerGraceIntentChange:l.useCallback(P=>{V.current=P},[])},l.createElement(K,an,l.createElement(qc,{asChild:!0,trapped:a,onMountAutoFocus:_(o,P=>{var L;P.preventDefault(),(L=C.current)===null||L===void 0||L.focus()}),onUnmountAutoFocus:s},l.createElement(Vc,{asChild:!0,disableOutsidePointerEvents:i,onEscapeKeyDown:d,onPointerDownOutside:f,onFocusOutside:u,onInteractOutside:p,onDismiss:m},l.createElement(ru,I({asChild:!0},w,{dir:g.dir,orientation:"vertical",loop:r,currentTabStopId:k,onCurrentTabStopIdChange:R,onEntryFocus:_(c,P=>{g.isUsingKeyboardRef.current||P.preventDefault()})}),l.createElement(jl,I({role:"menu","aria-orientation":"vertical","data-state":mf(h.open),"data-radix-menu-content":"",dir:g.dir},y,v,{ref:S,style:{outline:"none",...v.style},onKeyDown:_(v.onKeyDown,P=>{const Y=P.target.closest("[data-radix-menu-content]")===P.currentTarget,oe=P.ctrlKey||P.altKey||P.metaKey,Ee=P.key.length===1;Y&&(P.key==="Tab"&&P.preventDefault(),!oe&&Ee&&on(P.key));const _e=C.current;if(P.target!==_e||!Vu.includes(P.key))return;P.preventDefault();const Me=x().filter(G=>!G.disabled).map(G=>G.ref.current);No.includes(P.key)&&Me.reverse(),pf(Me)}),onBlur:_(e.onBlur,P=>{P.currentTarget.contains(P.target)||(window.clearTimeout(O.current),D.current="")}),onPointerMove:_(e.onPointerMove,Kn(P=>{const L=P.target,Y=re.current!==P.clientX;if(P.currentTarget.contains(L)&&Y){const oe=P.clientX>re.current?"right":"left";j.current=oe,re.current=P.clientX}}))})))))))}),Vn="MenuItem",ha="menu.itemSelect",sf=l.forwardRef((e,t)=>{const{disabled:n=!1,onSelect:r,...a}=e,o=l.useRef(null),s=wr(Vn,e.__scopeMenu),i=zo(Vn,e.__scopeMenu),c=X(t,o),d=l.useRef(!1),f=()=>{const u=o.current;if(!n&&u){const p=new CustomEvent(ha,{bubbles:!0,cancelable:!0});u.addEventListener(ha,m=>r==null?void 0:r(m),{once:!0}),ao(u,p),p.defaultPrevented?d.current=!1:s.onClose()}};return l.createElement(cf,I({},a,{ref:c,disabled:n,onClick:_(e.onClick,f),onPointerDown:u=>{var p;(p=e.onPointerDown)===null||p===void 0||p.call(e,u),d.current=!0},onPointerUp:_(e.onPointerUp,u=>{var p;d.current||(p=u.currentTarget)===null||p===void 0||p.click()}),onKeyDown:_(e.onKeyDown,u=>{const p=i.searchRef.current!=="";n||p&&u.key===" "||Yu.includes(u.key)&&(u.currentTarget.click(),u.preventDefault())})}))}),cf=l.forwardRef((e,t)=>{const{__scopeMenu:n,disabled:r=!1,textValue:a,...o}=e,s=zo(Vn,n),i=Lo(n),c=l.useRef(null),d=X(t,c),[f,u]=l.useState(!1),[p,m]=l.useState("");return l.useEffect(()=>{const b=c.current;if(b){var v;m(((v=b.textContent)!==null&&v!==void 0?v:"").trim())}},[o.children]),l.createElement(Bn.ItemSlot,{scope:n,disabled:r,textValue:a??p},l.createElement(au,I({asChild:!0},i,{focusable:!r}),l.createElement(Q.div,I({role:"menuitem","data-highlighted":f?"":void 0,"aria-disabled":r||void 0,"data-disabled":r?"":void 0},o,{ref:d,onPointerMove:_(e.onPointerMove,Kn(b=>{r?s.onItemLeave(b):(s.onItemEnter(b),b.defaultPrevented||b.currentTarget.focus())})),onPointerLeave:_(e.onPointerLeave,Kn(b=>s.onItemLeave(b))),onFocus:_(e.onFocus,()=>u(!0)),onBlur:_(e.onBlur,()=>u(!1))}))))}),lf="MenuRadioGroup";Ie(lf,{value:void 0,onValueChange:()=>{}});const uf="MenuItemIndicator";Ie(uf,{checked:!1});const ff=l.forwardRef((e,t)=>{const{__scopeMenu:n,...r}=e;return l.createElement(Q.div,I({role:"separator","aria-orientation":"horizontal"},r,{ref:t}))}),df="MenuSub";Ie(df);function mf(e){return e?"open":"closed"}function pf(e){const t=document.activeElement;for(const n of e)if(n===t||(n.focus(),document.activeElement!==t))return}function vf(e,t){return e.map((n,r)=>e[(t+r)%e.length])}function bf(e,t,n){const a=t.length>1&&Array.from(t).every(d=>d===t[0])?t[0]:t,o=n?e.indexOf(n):-1;let s=vf(e,Math.max(o,0));a.length===1&&(s=s.filter(d=>d!==n));const c=s.find(d=>d.toLowerCase().startsWith(a.toLowerCase()));return c!==n?c:void 0}function gf(e,t){const{x:n,y:r}=e;let a=!1;for(let o=0,s=t.length-1;o<t.length;s=o++){const i=t[o].x,c=t[o].y,d=t[s].x,f=t[s].y;c>r!=f>r&&n<(d-i)*(r-c)/(f-c)+i&&(a=!a)}return a}function hf(e,t){if(!t)return!1;const n={x:e.clientX,y:e.clientY};return gf(n,t)}function Kn(e){return t=>t.pointerType==="mouse"?e(t):void 0}const yf=Qu,wf=Zu,xf=tf,$f=rf,Ef=sf,kf=ff,Ho="DropdownMenu",[Sf,yd]=mt(Ho,[Do]),Ge=Do(),[Cf,Uo]=Sf(Ho),Af=e=>{const{__scopeDropdownMenu:t,children:n,dir:r,open:a,defaultOpen:o,onOpenChange:s,modal:i=!0}=e,c=Ge(t),d=l.useRef(null),[f=!1,u]=ro({prop:a,defaultProp:o,onChange:s});return l.createElement(Cf,{scope:t,triggerId:Fn(),triggerRef:d,contentId:Fn(),open:f,onOpenChange:u,onOpenToggle:l.useCallback(()=>u(p=>!p),[u]),modal:i},l.createElement(yf,I({},c,{open:f,onOpenChange:u,dir:r,modal:i}),n))},Pf="DropdownMenuTrigger",Of=l.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,disabled:r=!1,...a}=e,o=Uo(Pf,n),s=Ge(n);return l.createElement(wf,I({asChild:!0},s),l.createElement(Q.button,I({type:"button",id:o.triggerId,"aria-haspopup":"menu","aria-expanded":o.open,"aria-controls":o.open?o.contentId:void 0,"data-state":o.open?"open":"closed","data-disabled":r?"":void 0,disabled:r},a,{ref:mr(t,o.triggerRef),onPointerDown:_(e.onPointerDown,i=>{!r&&i.button===0&&i.ctrlKey===!1&&(o.onOpenToggle(),o.open||i.preventDefault())}),onKeyDown:_(e.onKeyDown,i=>{r||(["Enter"," "].includes(i.key)&&o.onOpenToggle(),i.key==="ArrowDown"&&o.onOpenChange(!0),["Enter"," ","ArrowDown"].includes(i.key)&&i.preventDefault())})})))}),Rf=e=>{const{__scopeDropdownMenu:t,...n}=e,r=Ge(t);return l.createElement(xf,I({},r,n))},Tf="DropdownMenuContent",If=l.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...r}=e,a=Uo(Tf,n),o=Ge(n),s=l.useRef(!1);return l.createElement($f,I({id:a.contentId,"aria-labelledby":a.triggerId},o,r,{ref:t,onCloseAutoFocus:_(e.onCloseAutoFocus,i=>{var c;s.current||(c=a.triggerRef.current)===null||c===void 0||c.focus(),s.current=!1,i.preventDefault()}),onInteractOutside:_(e.onInteractOutside,i=>{const c=i.detail.originalEvent,d=c.button===0&&c.ctrlKey===!0,f=c.button===2||d;(!a.modal||f)&&(s.current=!0)}),style:{...e.style,["--radix-dropdown-menu-content-transform-origin"]:"var(--radix-popper-transform-origin)"}}))}),_f=l.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...r}=e,a=Ge(n);return l.createElement(Ef,I({},a,r,{ref:t}))}),Mf=l.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...r}=e,a=Ge(n);return l.createElement(kf,I({},a,r,{ref:t}))}),Nf=Af,Df=Of,Lf=Rf,Ff=If,ya=_f,zf=Mf;function Gn({children:e,icon:t}){return A.createElement("div",{className:"ctw-flex ctw-items-center ctw-space-x-3"},t&&A.createElement(Re,{icon:t,className:"ctw-mb-[2px] ctw-w-4 ctw-text-content-lighter"}),A.createElement("div",null,e))}try{Gn.displayName="MenuItem",Gn.__docgenInfo={description:"",displayName:"MenuItem",props:{icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"IconDefinition"}}}}}catch{}function Xn({children:e,items:t,onItemSelect:n,type:r,buttonClassName:a,pinnedActions:o=[],isOpen:s}){const{ctwProviderRef:i}=oi(),[c,d]=l.useState(s);return A.createElement(Fi,null,A.createElement(Nf,{modal:!1,open:c,onOpenChange:f=>d(f)},A.createElement(Df,{className:Je(a),"aria-label":"dropdown"},e),A.createElement(Lf,{container:i.current},A.createElement(Ff,{align:"start",onFocusOutside:f=>f.preventDefault(),className:"ctw-dropdown-action-menu",collisionPadding:10},t.map(f=>A.createElement(ya,{key:f.key,className:Je("ctw-dropdown-action-menu-item ctw-bg-bg-white"),onClick:u=>{r==="checkbox"&&u.preventDefault(),n({key:f.key,name:f.name,value:!f.isSelected})}},A.createElement(jf,{inputType:r,menuItem:f,onClick:n}))),o.length>0&&A.createElement(A.Fragment,null,A.createElement(zf,{className:"ctw-dropdown-separator"}),o.map(f=>A.createElement(ya,{onClick:()=>f.action(),key:f.name,className:Je(f.className,"ctw-dropdown-action-menu-item")},A.createElement(Gn,{icon:f.icon},f.name))))))))}const jf=({inputType:e,menuItem:t,onClick:n})=>{switch(e){case"checkbox":return A.createElement("div",null,A.createElement("label",{htmlFor:t.name,className:"ctw-flex ctw-cursor-pointer ctw-items-center ctw-space-x-3"},A.createElement("input",{type:"checkbox",className:"ctw-m-0 ctw-mb-px ctw-w-4",name:t.name,onClick:r=>{n({key:t.key,name:t.name,value:!t.isSelected}),r.stopPropagation()},checked:t.isSelected,onChange:r=>{r.stopPropagation()}}),A.createElement("span",null,t.name)));case"select":return A.createElement("div",{className:"ctw-flex ctw-w-full ctw-justify-between"},A.createElement("span",{className:Je({"ctw-font-semibold":t.isSelected})},t.name),t.isSelected&&A.createElement(Re,{icon:Hi,className:"ctw-inline-block ctw-h-4 ctw-stroke-0 ctw-align-middle ctw-text-primary-dark"}));default:return A.createElement("div",null,t.name)}};try{Xn.displayName="DropdownMenuAction",Xn.__docgenInfo={description:"",displayName:"DropdownMenuAction",props:{buttonClassName:{defaultValue:null,description:"",name:"buttonClassName",required:!1,type:{name:"Argument"}},items:{defaultValue:null,description:"",name:"items",required:!0,type:{name:"OptionsItem[]"}},onItemSelect:{defaultValue:null,description:"",name:"onItemSelect",required:!0,type:{name:"(clickedItem: { key: string; name: string; value: boolean; }) => void"}},type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"checkbox"'},{value:'"select"'}]}},customOptionRender:{defaultValue:null,description:"",name:"customOptionRender",required:!1,type:{name:"((optionsItem: OptionsItem) => Element)"}},pinnedActions:{defaultValue:{value:"[]"},description:"",name:"pinnedActions",required:!1,type:{name:"MenuItem[]"}},isOpen:{defaultValue:null,description:"",name:"isOpen",required:!1,type:{name:"boolean"}}}}}catch{}const qn=({className:e,defaultSort:t,onChange:n,options:r})=>{const[a,o]=l.useState(t);return A.createElement(Xn,{type:"select",buttonClassName:Je(e,"ctw-bg-transparent ctw-border-none ctw-p-0"),onItemSelect:s=>{const i=r.filter(c=>c.display===s.key)[0];n(i),o(i)},items:r.map(s=>({key:s.display,name:s.display,isSelected:a.display===s.display}))},A.createElement("div",{className:"ctw-btn-default ctw-flex ctw-items-center ctw-space-x-2"},A.createElement("span",null,"Sort: ",A.createElement("span",{className:"ctw-font-normal"},a.display)," "),A.createElement(Re,{icon:ji,className:"ctw-w-2"})))};try{qn.displayName="SortButton",qn.__docgenInfo={description:"",displayName:"SortButton",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"Argument"}},defaultSort:{defaultValue:null,description:"",name:"defaultSort",required:!0,type:{name:"SortOption<T>"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"(sort: SortOption<T>) => void"}},options:{defaultValue:null,description:"",name:"options",required:!0,type:{name:"SortOption<T>[]"}}}}}catch{}const Hf=(e,t)=>e.filter(n=>Object.entries(t).every(([r,a])=>{if((a==null?void 0:a.type)==="checkbox"&&hi(a.selected)){const o=a.selected.filter(i=>Sa(Ca(e.map(c=>c[a.key]))).includes(i)),s=n[a.key];return o.length<1||o.includes(String(s))}return!0}));function wd(e,t){return Sa(Ca(e.map(n=>String(n[t]))))}function Uf({defaultFilters:e,defaultSort:t,records:n}){const[r,a]=l.useState(e),[o,s]=l.useState(t),[i,c]=l.useState(n??[]);return l.useEffect(()=>{const d=Hf(n??[],r),f=yi(d,o.sorts);c(f)},[r,o,n]),{setFilters:a,setSort:s,data:i,filters:r,sortOption:o}}const Wo=[{display:"Name (A-Z)",sorts:[{key:"display",dir:"asc"}]},{display:"Name (Z-A)",sorts:[{key:"display",dir:"desc"}]},{display:"Status (A-Z)",sorts:[{key:"status",dir:"asc"},{key:"dateAsserted",dir:"desc"}]},{display:"Status (Z-A)",sorts:[{key:"status",dir:"desc"},{key:"dateAsserted",dir:"desc"}]},{display:"Last Fill Date (Oldest to Newest)",sorts:[{key:"lastFillDate",dir:"desc",isDate:!0}]},{display:"Last Fill Date (Newest to Oldest)",sorts:[{key:"lastFillDate",dir:"asc",isDate:!0}]},{display:"Last Prescribed (Old to New)",sorts:[{key:"lastPrescribedDate",isDate:!0,dir:"desc"},{key:"lastPrescriber",dir:"asc"}]},{display:"Last Prescribed (New to Old)",sorts:[{key:"lastPrescribedDate",isDate:!0,dir:"asc"},{key:"lastPrescriber",dir:"asc"}]}],wa=Wo[0],xa=ri(({showInactive:e=!1,sortColumn:t="display",sortOrder:n="asc",onAfterOpenHistoryDrawer:r,onOpenHistoryDrawer:a})=>{const[o,s]=l.useState([]),{builderMedications:i,isLoading:c}=ei(),d=ti(),{data:f,setSort:u}=Uf({defaultFilters:{},defaultSort:wa,records:i});function p(m){kr(a)&&a(),d({medication:m}),setTimeout(()=>{kr(r)&&r()},0)}return l.useEffect(()=>{s(wi(e?f:f.filter(m=>m.displayStatus==="Active"),xi($i(t),Ei),n))},[f,t,n,e]),A.createElement(A.Fragment,null,A.createElement("div",{className:"ctw-flex ctw-flex-wrap ctw-gap-x-2"},A.createElement(qn,{className:"ctw-my-2",options:Wo,onChange:u,defaultSort:wa})),A.createElement(ni,{medicationStatements:o,telemetryNamespace:"ProviderMedsTable",isLoading:c,handleRowClick:p}))},"ProviderMedsTable");try{xa.displayName="ProviderMedsTable",xa.__docgenInfo={description:`Displays a table of medications that are scoped to the CTWContext builder
and patient. To show medications that aren't scoped to the builder, use the
\`OtherProviderMedsTable\` instead.

The table has a menu to the right side which will pull out the
history for the medication listed in that row.`,displayName:"ProviderMedsTable",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},showInactive:{defaultValue:null,description:"",name:"showInactive",required:!1,type:{name:"boolean"}},sortColumn:{defaultValue:null,description:"",name:"sortColumn",required:!1,type:{name:"enum",value:[{value:'"builderPatientRxNormStatus"'},{value:'"basedOn"'},{value:'"category"'},{value:'"context"'},{value:'"dateAsserted"'},{value:'"derivedFrom"'},{value:'"aggregatedFrom"'},{value:'"display"'},{value:'"dosage"'},{value:'"effectiveStart"'},{value:'"identifier"'},{value:'"informationSource"'},{value:'"medicationReference"'},{value:'"notesDisplay"'},{value:'"partOf"'},{value:'"patientStatus"'},{value:'"rxNorm"'},{value:'"rxNormCodeableConcept"'},{value:'"reason"'},{value:'"reasonReference"'},{value:'"isArchived"'},{value:'"isInactive"'},{value:'"status"'},{value:'"displayStatus"'},{value:'"statusReason"'},{value:'"subject"'},{value:'"subjectID"'},{value:'"patient"'},{value:'"lastFillDate"'},{value:'"quantity"'},{value:'"daysSupply"'},{value:'"refills"'},{value:'"lastPrescriber"'},{value:'"lastPrescribedDate"'},{value:'"resource"'},{value:'"includedResources"'},{value:'"revIncludes"'},{value:'"id"'},{value:'"isSummaryResource"'},{value:'"resourceType"'},{value:'"resourceTypeTitle"'},{value:'"getBasicResourceByAction"'},{value:'"toString"'}]}},sortOrder:{defaultValue:null,description:"",name:"sortOrder",required:!1,type:{name:"enum",value:[{value:'"asc"'},{value:'"desc"'}]}},onOpenHistoryDrawer:{defaultValue:null,description:"",name:"onOpenHistoryDrawer",required:!1,type:{name:"(() => void)"}},onAfterOpenHistoryDrawer:{defaultValue:null,description:"",name:"onAfterOpenHistoryDrawer",required:!1,type:{name:"(() => void)"}}}}}catch{}export{Xn as D,Re as F,Gn as M,xa as P,qn as S,ud as a,Uf as b,dd as c,vd as d,ji as e,md as f,Hi as g,gd as h,bd as i,pd as j,fd as k,wa as l,Wo as m,wd as u};

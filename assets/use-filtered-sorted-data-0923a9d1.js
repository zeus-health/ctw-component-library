import{r as l,R as P,a as Xo}from"./index-6f814c40.js";import{p as I}from"./index-4d501b15.js";import{c as Je}from"./index-74f03c09.js";import{_ as T}from"./extends-98964cd2.js";import{r as qn,R as qo}from"./index-6de6b113.js";import{u as Qo}from"./patient-helper-9ca0101c.js";import{C as Vt,y as Kt,L as Zo,q as Jo,u as ya,p as wn,$ as Gt,I as Qn,l as wa,o as ie,S as xr,i as ei,a as ht,k as xn,w as ti,N as ni,j as H,r as ri,D as ai,T as $r,x as xa,v as oi}from"./use-watch-a9671586.js";import{s as ii,F as si,a as J,x as ci}from"./calculate-active-index-048f6a58.js";import{n as li}from"./drawer-ed34104d.js";import"./_baseToString-ba0098b0.js";import{b as ui}from"./_equalByTag-3aa7c076.js";import"./_baseClone-7982cf45.js";import{b as $a}from"./values-e0b170db.js";import"./sortBy-8d97dd92.js";import"./_baseForOwn-2ea4fe61.js";import"./mergeWith-9910f455.js";import{u as Ea}from"./uniq-f1be3f26.js";import"./_createSet-3c80ad01.js";import{e as fi}from"./sort-5c3c7af1.js";var di=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(di||{}),mi=(e=>(e[e.Pointer=0]="Pointer",e[e.Other=1]="Other",e))(mi||{}),pi=(e=>(e[e.OpenMenu=0]="OpenMenu",e[e.CloseMenu=1]="CloseMenu",e[e.GoToItem=2]="GoToItem",e[e.Search=3]="Search",e[e.ClearSearch=4]="ClearSearch",e[e.RegisterItem=5]="RegisterItem",e[e.UnregisterItem=6]="UnregisterItem",e))(pi||{});function sn(e,t=n=>n){let n=e.activeItemIndex!==null?e.items[e.activeItemIndex]:null,r=oi(t(e.items.slice()),o=>o.dataRef.current.domRef.current),a=n?r.indexOf(n):null;return a===-1&&(a=null),{items:r,activeItemIndex:a}}let vi={[1](e){return e.menuState===1?e:{...e,activeItemIndex:null,menuState:1}},[0](e){return e.menuState===0?e:{...e,menuState:0}},[2]:(e,t)=>{var n;let r=sn(e),a=ci(t,{resolveItems:()=>r.items,resolveActiveIndex:()=>r.activeItemIndex,resolveId:o=>o.id,resolveDisabled:o=>o.dataRef.current.disabled});return{...e,...r,searchQuery:"",activeItemIndex:a,activationTrigger:(n=t.trigger)!=null?n:1}},[3]:(e,t)=>{let n=e.searchQuery!==""?0:1,r=e.searchQuery+t.value.toLowerCase(),a=(e.activeItemIndex!==null?e.items.slice(e.activeItemIndex+n).concat(e.items.slice(0,e.activeItemIndex+n)):e.items).find(s=>{var i;return((i=s.dataRef.current.textValue)==null?void 0:i.startsWith(r))&&!s.dataRef.current.disabled}),o=a?e.items.indexOf(a):-1;return o===-1||o===e.activeItemIndex?{...e,searchQuery:r}:{...e,searchQuery:r,activeItemIndex:o,activationTrigger:1}},[4](e){return e.searchQuery===""?e:{...e,searchQuery:"",searchActiveItemIndex:null}},[5]:(e,t)=>{let n=sn(e,r=>[...r,{id:t.id,dataRef:t.dataRef}]);return{...e,...n}},[6]:(e,t)=>{let n=sn(e,r=>{let a=r.findIndex(o=>o.id===t.id);return a!==-1&&r.splice(a,1),r});return{...e,...n,activationTrigger:1}}},Zn=l.createContext(null);Zn.displayName="MenuContext";function Xt(e){let t=l.useContext(Zn);if(t===null){let n=new Error(`<${e} /> is missing a parent <Menu /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(n,Xt),n}return t}function bi(e,t){return ya(t.type,vi,e,t)}let gi=l.Fragment,hi=Vt(function(e,t){let n=l.useReducer(bi,{menuState:1,buttonRef:l.createRef(),itemsRef:l.createRef(),items:[],searchQuery:"",activeItemIndex:null,activationTrigger:1}),[{menuState:r,itemsRef:a,buttonRef:o},s]=n,i=Kt(t);Zo([o,a],(u,p)=>{var m;s({type:1}),ti(p,ni.Loose)||(u.preventDefault(),(m=o.current)==null||m.focus())},r===0);let c=l.useMemo(()=>({open:r===0}),[r]),f=e,d={ref:i};return P.createElement(Zn.Provider,{value:n},P.createElement(Jo,{value:ya(r,{[0]:wn.Open,[1]:wn.Closed})},Gt({ourProps:d,theirProps:f,slot:c,defaultTag:gi,name:"Menu"})))}),yi="button",wi=Vt(function(e,t){var n;let[r,a]=Xt("Menu.Button"),o=Kt(r.buttonRef,t),s=`headlessui-menu-button-${Qn()}`,i=wa(),c=ie(b=>{switch(b.key){case H.Space:case H.Enter:case H.ArrowDown:b.preventDefault(),b.stopPropagation(),a({type:0}),i.nextFrame(()=>a({type:2,focus:J.First}));break;case H.ArrowUp:b.preventDefault(),b.stopPropagation(),a({type:0}),i.nextFrame(()=>a({type:2,focus:J.Last}));break}}),f=ie(b=>{switch(b.key){case H.Space:b.preventDefault();break}}),d=ie(b=>{if(ri(b.currentTarget))return b.preventDefault();e.disabled||(r.menuState===0?(a({type:1}),i.nextFrame(()=>{var v;return(v=r.buttonRef.current)==null?void 0:v.focus({preventScroll:!0})})):(b.preventDefault(),a({type:0})))}),u=l.useMemo(()=>({open:r.menuState===0}),[r]),p=e,m={ref:o,id:s,type:ii(e,r.buttonRef),"aria-haspopup":!0,"aria-controls":(n=r.itemsRef.current)==null?void 0:n.id,"aria-expanded":e.disabled?void 0:r.menuState===0,onKeyDown:c,onKeyUp:f,onClick:d};return Gt({ourProps:m,theirProps:p,slot:u,defaultTag:yi,name:"Menu.Button"})}),xi="div",$i=xr.RenderStrategy|xr.Static,Ei=Vt(function(e,t){var n,r;let[a,o]=Xt("Menu.Items"),s=Kt(a.itemsRef,t),i=li(a.itemsRef),c=`headlessui-menu-items-${Qn()}`,f=wa(),d=ei(),u=(()=>d!==null?d===wn.Open:a.menuState===0)();l.useEffect(()=>{let g=a.itemsRef.current;!g||a.menuState===0&&g!==(i==null?void 0:i.activeElement)&&g.focus({preventScroll:!0})},[a.menuState,a.itemsRef,i]),si({container:a.itemsRef.current,enabled:a.menuState===0,accept(g){return g.getAttribute("role")==="menuitem"?NodeFilter.FILTER_REJECT:g.hasAttribute("role")?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT},walk(g){g.setAttribute("role","none")}});let p=ie(g=>{var y,w;switch(f.dispose(),g.key){case H.Space:if(a.searchQuery!=="")return g.preventDefault(),g.stopPropagation(),o({type:3,value:g.key});case H.Enter:if(g.preventDefault(),g.stopPropagation(),o({type:1}),a.activeItemIndex!==null){let{dataRef:x}=a.items[a.activeItemIndex];(w=(y=x.current)==null?void 0:y.domRef.current)==null||w.click()}xa(a.buttonRef.current);break;case H.ArrowDown:return g.preventDefault(),g.stopPropagation(),o({type:2,focus:J.Next});case H.ArrowUp:return g.preventDefault(),g.stopPropagation(),o({type:2,focus:J.Previous});case H.Home:case H.PageUp:return g.preventDefault(),g.stopPropagation(),o({type:2,focus:J.First});case H.End:case H.PageDown:return g.preventDefault(),g.stopPropagation(),o({type:2,focus:J.Last});case H.Escape:g.preventDefault(),g.stopPropagation(),o({type:1}),xn().nextFrame(()=>{var x;return(x=a.buttonRef.current)==null?void 0:x.focus({preventScroll:!0})});break;case H.Tab:g.preventDefault(),g.stopPropagation(),o({type:1}),xn().nextFrame(()=>{ai(a.buttonRef.current,g.shiftKey?$r.Previous:$r.Next)});break;default:g.key.length===1&&(o({type:3,value:g.key}),f.setTimeout(()=>o({type:4}),350));break}}),m=ie(g=>{switch(g.key){case H.Space:g.preventDefault();break}}),b=l.useMemo(()=>({open:a.menuState===0}),[a]),v=e,h={"aria-activedescendant":a.activeItemIndex===null||(n=a.items[a.activeItemIndex])==null?void 0:n.id,"aria-labelledby":(r=a.buttonRef.current)==null?void 0:r.id,id:c,onKeyDown:p,onKeyUp:m,role:"menu",tabIndex:0,ref:s};return Gt({ourProps:h,theirProps:v,slot:b,defaultTag:xi,features:$i,visible:u,name:"Menu.Items"})}),ki=l.Fragment,Ci=Vt(function(e,t){let{disabled:n=!1,...r}=e,[a,o]=Xt("Menu.Item"),s=`headlessui-menu-item-${Qn()}`,i=a.activeItemIndex!==null?a.items[a.activeItemIndex].id===s:!1,c=l.useRef(null),f=Kt(t,c);ht(()=>{if(a.menuState!==0||!i||a.activationTrigger===0)return;let h=xn();return h.requestAnimationFrame(()=>{var g,y;(y=(g=c.current)==null?void 0:g.scrollIntoView)==null||y.call(g,{block:"nearest"})}),h.dispose},[c,i,a.menuState,a.activationTrigger,a.activeItemIndex]);let d=l.useRef({disabled:n,domRef:c});ht(()=>{d.current.disabled=n},[d,n]),ht(()=>{var h,g;d.current.textValue=(g=(h=c.current)==null?void 0:h.textContent)==null?void 0:g.toLowerCase()},[d,c]),ht(()=>(o({type:5,id:s,dataRef:d}),()=>o({type:6,id:s})),[d,s]);let u=ie(h=>{if(n)return h.preventDefault();o({type:1}),xa(a.buttonRef.current)}),p=ie(()=>{if(n)return o({type:2,focus:J.Nothing});o({type:2,focus:J.Specific,id:s})}),m=ie(()=>{n||i||o({type:2,focus:J.Specific,id:s,trigger:0})}),b=ie(()=>{n||!i||o({type:2,focus:J.Nothing})}),v=l.useMemo(()=>({active:i,disabled:n}),[i,n]);return Gt({ourProps:{id:s,ref:f,role:"menuitem",tabIndex:n===!0?void 0:-1,"aria-disabled":n===!0?!0:void 0,disabled:void 0,onClick:u,onFocus:p,onPointerMove:m,onMouseMove:m,onPointerLeave:b,onMouseLeave:b},theirProps:r,slot:v,defaultTag:ki,name:"Menu.Item"})}),Si=Object.assign(hi,{Button:wi,Items:Ei,Item:Ci});var Xf={prefix:"fas",iconName:"clipboard-list",icon:[384,512,[],"f46d","M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM72 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm104-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16zM72 368a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm88 0c0-8.8 7.2-16 16-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16z"]},qf={prefix:"fas",iconName:"user",icon:[448,512,[128100,62144],"f007","M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"]},Ai={prefix:"fas",iconName:"arrows-rotate",icon:[512,512,[128472,"refresh","sync"],"f021","M89.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L370.3 160H320c-17.7 0-32 14.3-32 32s14.3 32 32 32H447.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L398.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C57.2 122 39.6 150.7 28.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM23 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L109.6 352H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H32.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"]},Qf=Ai,Zf={prefix:"fas",iconName:"clipboard-check",icon:[384,512,[],"f46c","M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM305 273L177 401c-9.4 9.4-24.6 9.4-33.9 0L79 337c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L271 239c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"]},Jf={prefix:"fas",iconName:"eye",icon:[576,512,[128065],"f06e","M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"]},ed={prefix:"fas",iconName:"trash",icon:[448,512,[],"f1f8","M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"]},Pi={prefix:"fas",iconName:"chevron-down",icon:[448,512,[],"f078","M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"]},td={prefix:"fas",iconName:"plus",icon:[448,512,[10133,61543,"add"],"2b","M240 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H176V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H240V80z"]},Oi={prefix:"fas",iconName:"check",icon:[512,512,[10003,10004],"f00c","M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"]},nd={prefix:"fas",iconName:"x",icon:[384,512,[120],"58","M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"]};function Er(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),n.push.apply(n,r)}return n}function $(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Er(Object(n),!0).forEach(function(r){z(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Er(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function Lt(e){return Lt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Lt(e)}function Ri(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function kr(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function Ii(e,t,n){return t&&kr(e.prototype,t),n&&kr(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function z(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Jn(e,t){return _i(e)||Ni(e,t)||ka(e,t)||Li()}function ut(e){return Ti(e)||Mi(e)||ka(e)||Di()}function Ti(e){if(Array.isArray(e))return $n(e)}function _i(e){if(Array.isArray(e))return e}function Mi(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Ni(e,t){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var r=[],a=!0,o=!1,s,i;try{for(n=n.call(e);!(a=(s=n.next()).done)&&(r.push(s.value),!(t&&r.length===t));a=!0);}catch(c){o=!0,i=c}finally{try{!a&&n.return!=null&&n.return()}finally{if(o)throw i}}return r}}function ka(e,t){if(e){if(typeof e=="string")return $n(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return $n(e,t)}}function $n(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function Di(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Li(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var Cr=function(){},er={},Ca={},Sa=null,Aa={mark:Cr,measure:Cr};try{typeof window<"u"&&(er=window),typeof document<"u"&&(Ca=document),typeof MutationObserver<"u"&&(Sa=MutationObserver),typeof performance<"u"&&(Aa=performance)}catch{}var Fi=er.navigator||{},Sr=Fi.userAgent,Ar=Sr===void 0?"":Sr,ye=er,N=Ca,Pr=Sa,yt=Aa;ye.document;var de=!!N.documentElement&&!!N.head&&typeof N.addEventListener=="function"&&typeof N.createElement=="function",Pa=~Ar.indexOf("MSIE")||~Ar.indexOf("Trident/"),wt,xt,$t,Et,kt,le="___FONT_AWESOME___",En=16,Oa="fa",Ra="svg-inline--fa",Pe="data-fa-i2svg",kn="data-fa-pseudo-element",zi="data-fa-pseudo-element-pending",tr="data-prefix",nr="data-icon",Or="fontawesome-i2svg",ji="async",Ui=["HTML","HEAD","STYLE","SCRIPT"],Ia=function(){try{return!0}catch{return!1}}(),M="classic",F="sharp",rr=[M,F];function ft(e){return new Proxy(e,{get:function(n,r){return r in n?n[r]:n[M]}})}var rt=ft((wt={},z(wt,M,{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands",fak:"kit","fa-kit":"kit"}),z(wt,F,{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular"}),wt)),at=ft((xt={},z(xt,M,{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab",kit:"fak"}),z(xt,F,{solid:"fass",regular:"fasr"}),xt)),ot=ft(($t={},z($t,M,{fab:"fa-brands",fad:"fa-duotone",fak:"fa-kit",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"}),z($t,F,{fass:"fa-solid",fasr:"fa-regular"}),$t)),Hi=ft((Et={},z(Et,M,{"fa-brands":"fab","fa-duotone":"fad","fa-kit":"fak","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"}),z(Et,F,{"fa-solid":"fass","fa-regular":"fasr"}),Et)),Wi=/fa(s|r|l|t|d|b|k|ss|sr)?[\-\ ]/,Ta="fa-layers-text",Yi=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,Bi=ft((kt={},z(kt,M,{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"}),z(kt,F,{900:"fass",400:"fasr"}),kt)),_a=[1,2,3,4,5,6,7,8,9,10],Vi=_a.concat([11,12,13,14,15,16,17,18,19,20]),Ki=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],Se={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},it=new Set;Object.keys(at[M]).map(it.add.bind(it));Object.keys(at[F]).map(it.add.bind(it));var Gi=[].concat(rr,ut(it),["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",Se.GROUP,Se.SWAP_OPACITY,Se.PRIMARY,Se.SECONDARY]).concat(_a.map(function(e){return"".concat(e,"x")})).concat(Vi.map(function(e){return"w-".concat(e)})),et=ye.FontAwesomeConfig||{};function Xi(e){var t=N.querySelector("script["+e+"]");if(t)return t.getAttribute(e)}function qi(e){return e===""?!0:e==="false"?!1:e==="true"?!0:e}if(N&&typeof N.querySelector=="function"){var Qi=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];Qi.forEach(function(e){var t=Jn(e,2),n=t[0],r=t[1],a=qi(Xi(n));a!=null&&(et[r]=a)})}var Ma={styleDefault:"solid",familyDefault:"classic",cssPrefix:Oa,replacementClass:Ra,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};et.familyPrefix&&(et.cssPrefix=et.familyPrefix);var Be=$($({},Ma),et);Be.autoReplaceSvg||(Be.observeMutations=!1);var E={};Object.keys(Ma).forEach(function(e){Object.defineProperty(E,e,{enumerable:!0,set:function(n){Be[e]=n,tt.forEach(function(r){return r(E)})},get:function(){return Be[e]}})});Object.defineProperty(E,"familyPrefix",{enumerable:!0,set:function(t){Be.cssPrefix=t,tt.forEach(function(n){return n(E)})},get:function(){return Be.cssPrefix}});ye.FontAwesomeConfig=E;var tt=[];function Zi(e){return tt.push(e),function(){tt.splice(tt.indexOf(e),1)}}var pe=En,ee={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function Ji(e){if(!(!e||!de)){var t=N.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=e;for(var n=N.head.childNodes,r=null,a=n.length-1;a>-1;a--){var o=n[a],s=(o.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(s)>-1&&(r=o)}return N.head.insertBefore(t,r),e}}var es="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function st(){for(var e=12,t="";e-- >0;)t+=es[Math.random()*62|0];return t}function Ve(e){for(var t=[],n=(e||[]).length>>>0;n--;)t[n]=e[n];return t}function ar(e){return e.classList?Ve(e.classList):(e.getAttribute("class")||"").split(" ").filter(function(t){return t})}function Na(e){return"".concat(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function ts(e){return Object.keys(e||{}).reduce(function(t,n){return t+"".concat(n,'="').concat(Na(e[n]),'" ')},"").trim()}function qt(e){return Object.keys(e||{}).reduce(function(t,n){return t+"".concat(n,": ").concat(e[n].trim(),";")},"")}function or(e){return e.size!==ee.size||e.x!==ee.x||e.y!==ee.y||e.rotate!==ee.rotate||e.flipX||e.flipY}function ns(e){var t=e.transform,n=e.containerWidth,r=e.iconWidth,a={transform:"translate(".concat(n/2," 256)")},o="translate(".concat(t.x*32,", ").concat(t.y*32,") "),s="scale(".concat(t.size/16*(t.flipX?-1:1),", ").concat(t.size/16*(t.flipY?-1:1),") "),i="rotate(".concat(t.rotate," 0 0)"),c={transform:"".concat(o," ").concat(s," ").concat(i)},f={transform:"translate(".concat(r/2*-1," -256)")};return{outer:a,inner:c,path:f}}function rs(e){var t=e.transform,n=e.width,r=n===void 0?En:n,a=e.height,o=a===void 0?En:a,s=e.startCentered,i=s===void 0?!1:s,c="";return i&&Pa?c+="translate(".concat(t.x/pe-r/2,"em, ").concat(t.y/pe-o/2,"em) "):i?c+="translate(calc(-50% + ".concat(t.x/pe,"em), calc(-50% + ").concat(t.y/pe,"em)) "):c+="translate(".concat(t.x/pe,"em, ").concat(t.y/pe,"em) "),c+="scale(".concat(t.size/pe*(t.flipX?-1:1),", ").concat(t.size/pe*(t.flipY?-1:1),") "),c+="rotate(".concat(t.rotate,"deg) "),c}var as=`:root, :host {
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
}`;function Da(){var e=Oa,t=Ra,n=E.cssPrefix,r=E.replacementClass,a=as;if(n!==e||r!==t){var o=new RegExp("\\.".concat(e,"\\-"),"g"),s=new RegExp("\\--".concat(e,"\\-"),"g"),i=new RegExp("\\.".concat(t),"g");a=a.replace(o,".".concat(n,"-")).replace(s,"--".concat(n,"-")).replace(i,".".concat(r))}return a}var Rr=!1;function cn(){E.autoAddCss&&!Rr&&(Ji(Da()),Rr=!0)}var os={mixout:function(){return{dom:{css:Da,insertCss:cn}}},hooks:function(){return{beforeDOMElementCreation:function(){cn()},beforeI2svg:function(){cn()}}}},ue=ye||{};ue[le]||(ue[le]={});ue[le].styles||(ue[le].styles={});ue[le].hooks||(ue[le].hooks={});ue[le].shims||(ue[le].shims=[]);var q=ue[le],La=[],is=function e(){N.removeEventListener("DOMContentLoaded",e),Ft=1,La.map(function(t){return t()})},Ft=!1;de&&(Ft=(N.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(N.readyState),Ft||N.addEventListener("DOMContentLoaded",is));function ss(e){de&&(Ft?setTimeout(e,0):La.push(e))}function dt(e){var t=e.tag,n=e.attributes,r=n===void 0?{}:n,a=e.children,o=a===void 0?[]:a;return typeof e=="string"?Na(e):"<".concat(t," ").concat(ts(r),">").concat(o.map(dt).join(""),"</").concat(t,">")}function Ir(e,t,n){if(e&&e[t]&&e[t][n])return{prefix:t,iconName:n,icon:e[t][n]}}var cs=function(t,n){return function(r,a,o,s){return t.call(n,r,a,o,s)}},ln=function(t,n,r,a){var o=Object.keys(t),s=o.length,i=a!==void 0?cs(n,a):n,c,f,d;for(r===void 0?(c=1,d=t[o[0]]):(c=0,d=r);c<s;c++)f=o[c],d=i(d,t[f],f,t);return d};function ls(e){for(var t=[],n=0,r=e.length;n<r;){var a=e.charCodeAt(n++);if(a>=55296&&a<=56319&&n<r){var o=e.charCodeAt(n++);(o&64512)==56320?t.push(((a&1023)<<10)+(o&1023)+65536):(t.push(a),n--)}else t.push(a)}return t}function Cn(e){var t=ls(e);return t.length===1?t[0].toString(16):null}function us(e,t){var n=e.length,r=e.charCodeAt(t),a;return r>=55296&&r<=56319&&n>t+1&&(a=e.charCodeAt(t+1),a>=56320&&a<=57343)?(r-55296)*1024+a-56320+65536:r}function Tr(e){return Object.keys(e).reduce(function(t,n){var r=e[n],a=!!r.icon;return a?t[r.iconName]=r.icon:t[n]=r,t},{})}function Sn(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=n.skipHooks,a=r===void 0?!1:r,o=Tr(t);typeof q.hooks.addPack=="function"&&!a?q.hooks.addPack(e,Tr(t)):q.styles[e]=$($({},q.styles[e]||{}),o),e==="fas"&&Sn("fa",t)}var Ct,St,At,Ue=q.styles,fs=q.shims,ds=(Ct={},z(Ct,M,Object.values(ot[M])),z(Ct,F,Object.values(ot[F])),Ct),ir=null,Fa={},za={},ja={},Ua={},Ha={},ms=(St={},z(St,M,Object.keys(rt[M])),z(St,F,Object.keys(rt[F])),St);function ps(e){return~Gi.indexOf(e)}function vs(e,t){var n=t.split("-"),r=n[0],a=n.slice(1).join("-");return r===e&&a!==""&&!ps(a)?a:null}var Wa=function(){var t=function(o){return ln(Ue,function(s,i,c){return s[c]=ln(i,o,{}),s},{})};Fa=t(function(a,o,s){if(o[3]&&(a[o[3]]=s),o[2]){var i=o[2].filter(function(c){return typeof c=="number"});i.forEach(function(c){a[c.toString(16)]=s})}return a}),za=t(function(a,o,s){if(a[s]=s,o[2]){var i=o[2].filter(function(c){return typeof c=="string"});i.forEach(function(c){a[c]=s})}return a}),Ha=t(function(a,o,s){var i=o[2];return a[s]=s,i.forEach(function(c){a[c]=s}),a});var n="far"in Ue||E.autoFetchSvg,r=ln(fs,function(a,o){var s=o[0],i=o[1],c=o[2];return i==="far"&&!n&&(i="fas"),typeof s=="string"&&(a.names[s]={prefix:i,iconName:c}),typeof s=="number"&&(a.unicodes[s.toString(16)]={prefix:i,iconName:c}),a},{names:{},unicodes:{}});ja=r.names,Ua=r.unicodes,ir=Qt(E.styleDefault,{family:E.familyDefault})};Zi(function(e){ir=Qt(e.styleDefault,{family:E.familyDefault})});Wa();function sr(e,t){return(Fa[e]||{})[t]}function bs(e,t){return(za[e]||{})[t]}function Ae(e,t){return(Ha[e]||{})[t]}function Ya(e){return ja[e]||{prefix:null,iconName:null}}function gs(e){var t=Ua[e],n=sr("fas",e);return t||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function we(){return ir}var cr=function(){return{prefix:null,iconName:null,rest:[]}};function Qt(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.family,r=n===void 0?M:n,a=rt[r][e],o=at[r][e]||at[r][a],s=e in q.styles?e:null;return o||s||null}var _r=(At={},z(At,M,Object.keys(ot[M])),z(At,F,Object.keys(ot[F])),At);function Zt(e){var t,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.skipLookups,a=r===void 0?!1:r,o=(t={},z(t,M,"".concat(E.cssPrefix,"-").concat(M)),z(t,F,"".concat(E.cssPrefix,"-").concat(F)),t),s=null,i=M;(e.includes(o[M])||e.some(function(f){return _r[M].includes(f)}))&&(i=M),(e.includes(o[F])||e.some(function(f){return _r[F].includes(f)}))&&(i=F);var c=e.reduce(function(f,d){var u=vs(E.cssPrefix,d);if(Ue[d]?(d=ds[i].includes(d)?Hi[i][d]:d,s=d,f.prefix=d):ms[i].indexOf(d)>-1?(s=d,f.prefix=Qt(d,{family:i})):u?f.iconName=u:d!==E.replacementClass&&d!==o[M]&&d!==o[F]&&f.rest.push(d),!a&&f.prefix&&f.iconName){var p=s==="fa"?Ya(f.iconName):{},m=Ae(f.prefix,f.iconName);p.prefix&&(s=null),f.iconName=p.iconName||m||f.iconName,f.prefix=p.prefix||f.prefix,f.prefix==="far"&&!Ue.far&&Ue.fas&&!E.autoFetchSvg&&(f.prefix="fas")}return f},cr());return(e.includes("fa-brands")||e.includes("fab"))&&(c.prefix="fab"),(e.includes("fa-duotone")||e.includes("fad"))&&(c.prefix="fad"),!c.prefix&&i===F&&(Ue.fass||E.autoFetchSvg)&&(c.prefix="fass",c.iconName=Ae(c.prefix,c.iconName)||c.iconName),(c.prefix==="fa"||s==="fa")&&(c.prefix=we()||"fas"),c}var hs=function(){function e(){Ri(this,e),this.definitions={}}return Ii(e,[{key:"add",value:function(){for(var n=this,r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];var s=a.reduce(this._pullDefinitions,{});Object.keys(s).forEach(function(i){n.definitions[i]=$($({},n.definitions[i]||{}),s[i]),Sn(i,s[i]);var c=ot[M][i];c&&Sn(c,s[i]),Wa()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(n,r){var a=r.prefix&&r.iconName&&r.icon?{0:r}:r;return Object.keys(a).map(function(o){var s=a[o],i=s.prefix,c=s.iconName,f=s.icon,d=f[2];n[i]||(n[i]={}),d.length>0&&d.forEach(function(u){typeof u=="string"&&(n[i][u]=f)}),n[i][c]=f}),n}}]),e}(),Mr=[],He={},Ye={},ys=Object.keys(Ye);function ws(e,t){var n=t.mixoutsTo;return Mr=e,He={},Object.keys(Ye).forEach(function(r){ys.indexOf(r)===-1&&delete Ye[r]}),Mr.forEach(function(r){var a=r.mixout?r.mixout():{};if(Object.keys(a).forEach(function(s){typeof a[s]=="function"&&(n[s]=a[s]),Lt(a[s])==="object"&&Object.keys(a[s]).forEach(function(i){n[s]||(n[s]={}),n[s][i]=a[s][i]})}),r.hooks){var o=r.hooks();Object.keys(o).forEach(function(s){He[s]||(He[s]=[]),He[s].push(o[s])})}r.provides&&r.provides(Ye)}),n}function An(e,t){for(var n=arguments.length,r=new Array(n>2?n-2:0),a=2;a<n;a++)r[a-2]=arguments[a];var o=He[e]||[];return o.forEach(function(s){t=s.apply(null,[t].concat(r))}),t}function Oe(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var a=He[e]||[];a.forEach(function(o){o.apply(null,n)})}function fe(){var e=arguments[0],t=Array.prototype.slice.call(arguments,1);return Ye[e]?Ye[e].apply(null,t):void 0}function Pn(e){e.prefix==="fa"&&(e.prefix="fas");var t=e.iconName,n=e.prefix||we();if(t)return t=Ae(n,t)||t,Ir(Ba.definitions,n,t)||Ir(q.styles,n,t)}var Ba=new hs,xs=function(){E.autoReplaceSvg=!1,E.observeMutations=!1,Oe("noAuto")},$s={i2svg:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return de?(Oe("beforeI2svg",t),fe("pseudoElements2svg",t),fe("i2svg",t)):Promise.reject("Operation requires a DOM of some kind.")},watch:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=t.autoReplaceSvgRoot;E.autoReplaceSvg===!1&&(E.autoReplaceSvg=!0),E.observeMutations=!0,ss(function(){ks({autoReplaceSvgRoot:n}),Oe("watch",t)})}},Es={icon:function(t){if(t===null)return null;if(Lt(t)==="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:Ae(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){var n=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],r=Qt(t[0]);return{prefix:r,iconName:Ae(r,n)||n}}if(typeof t=="string"&&(t.indexOf("".concat(E.cssPrefix,"-"))>-1||t.match(Wi))){var a=Zt(t.split(" "),{skipLookups:!0});return{prefix:a.prefix||we(),iconName:Ae(a.prefix,a.iconName)||a.iconName}}if(typeof t=="string"){var o=we();return{prefix:o,iconName:Ae(o,t)||t}}}},B={noAuto:xs,config:E,dom:$s,parse:Es,library:Ba,findIconDefinition:Pn,toHtml:dt},ks=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=t.autoReplaceSvgRoot,r=n===void 0?N:n;(Object.keys(q.styles).length>0||E.autoFetchSvg)&&de&&E.autoReplaceSvg&&B.dom.i2svg({node:r})};function Jt(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(function(r){return dt(r)})}}),Object.defineProperty(e,"node",{get:function(){if(de){var r=N.createElement("div");return r.innerHTML=e.html,r.children}}}),e}function Cs(e){var t=e.children,n=e.main,r=e.mask,a=e.attributes,o=e.styles,s=e.transform;if(or(s)&&n.found&&!r.found){var i=n.width,c=n.height,f={x:i/c/2,y:.5};a.style=qt($($({},o),{},{"transform-origin":"".concat(f.x+s.x/16,"em ").concat(f.y+s.y/16,"em")}))}return[{tag:"svg",attributes:a,children:t}]}function Ss(e){var t=e.prefix,n=e.iconName,r=e.children,a=e.attributes,o=e.symbol,s=o===!0?"".concat(t,"-").concat(E.cssPrefix,"-").concat(n):o;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:$($({},a),{},{id:s}),children:r}]}]}function lr(e){var t=e.icons,n=t.main,r=t.mask,a=e.prefix,o=e.iconName,s=e.transform,i=e.symbol,c=e.title,f=e.maskId,d=e.titleId,u=e.extra,p=e.watchable,m=p===void 0?!1:p,b=r.found?r:n,v=b.width,h=b.height,g=a==="fak",y=[E.replacementClass,o?"".concat(E.cssPrefix,"-").concat(o):""].filter(function(O){return u.classes.indexOf(O)===-1}).filter(function(O){return O!==""||!!O}).concat(u.classes).join(" "),w={children:[],attributes:$($({},u.attributes),{},{"data-prefix":a,"data-icon":o,class:y,role:u.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(v," ").concat(h)})},x=g&&!~u.classes.indexOf("fa-fw")?{width:"".concat(v/h*16*.0625,"em")}:{};m&&(w.attributes[Pe]=""),c&&(w.children.push({tag:"title",attributes:{id:w.attributes["aria-labelledby"]||"title-".concat(d||st())},children:[c]}),delete w.attributes.title);var k=$($({},w),{},{prefix:a,iconName:o,main:n,mask:r,maskId:f,transform:s,symbol:i,styles:$($({},x),u.styles)}),R=r.found&&n.found?fe("generateAbstractMask",k)||{children:[],attributes:{}}:fe("generateAbstractIcon",k)||{children:[],attributes:{}},S=R.children,C=R.attributes;return k.children=S,k.attributes=C,i?Ss(k):Cs(k)}function Nr(e){var t=e.content,n=e.width,r=e.height,a=e.transform,o=e.title,s=e.extra,i=e.watchable,c=i===void 0?!1:i,f=$($($({},s.attributes),o?{title:o}:{}),{},{class:s.classes.join(" ")});c&&(f[Pe]="");var d=$({},s.styles);or(a)&&(d.transform=rs({transform:a,startCentered:!0,width:n,height:r}),d["-webkit-transform"]=d.transform);var u=qt(d);u.length>0&&(f.style=u);var p=[];return p.push({tag:"span",attributes:f,children:[t]}),o&&p.push({tag:"span",attributes:{class:"sr-only"},children:[o]}),p}function As(e){var t=e.content,n=e.title,r=e.extra,a=$($($({},r.attributes),n?{title:n}:{}),{},{class:r.classes.join(" ")}),o=qt(r.styles);o.length>0&&(a.style=o);var s=[];return s.push({tag:"span",attributes:a,children:[t]}),n&&s.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),s}var un=q.styles;function On(e){var t=e[0],n=e[1],r=e.slice(4),a=Jn(r,1),o=a[0],s=null;return Array.isArray(o)?s={tag:"g",attributes:{class:"".concat(E.cssPrefix,"-").concat(Se.GROUP)},children:[{tag:"path",attributes:{class:"".concat(E.cssPrefix,"-").concat(Se.SECONDARY),fill:"currentColor",d:o[0]}},{tag:"path",attributes:{class:"".concat(E.cssPrefix,"-").concat(Se.PRIMARY),fill:"currentColor",d:o[1]}}]}:s={tag:"path",attributes:{fill:"currentColor",d:o}},{found:!0,width:t,height:n,icon:s}}var Ps={found:!1,width:512,height:512};function Os(e,t){!Ia&&!E.showMissingIcons&&e&&console.error('Icon with name "'.concat(e,'" and prefix "').concat(t,'" is missing.'))}function Rn(e,t){var n=t;return t==="fa"&&E.styleDefault!==null&&(t=we()),new Promise(function(r,a){if(fe("missingIconAbstract"),n==="fa"){var o=Ya(e)||{};e=o.iconName||e,t=o.prefix||t}if(e&&t&&un[t]&&un[t][e]){var s=un[t][e];return r(On(s))}Os(e,t),r($($({},Ps),{},{icon:E.showMissingIcons&&e?fe("missingIconAbstract")||{}:{}}))})}var Dr=function(){},In=E.measurePerformance&&yt&&yt.mark&&yt.measure?yt:{mark:Dr,measure:Dr},Ze='FA "6.3.0"',Rs=function(t){return In.mark("".concat(Ze," ").concat(t," begins")),function(){return Va(t)}},Va=function(t){In.mark("".concat(Ze," ").concat(t," ends")),In.measure("".concat(Ze," ").concat(t),"".concat(Ze," ").concat(t," begins"),"".concat(Ze," ").concat(t," ends"))},ur={begin:Rs,end:Va},_t=function(){};function Lr(e){var t=e.getAttribute?e.getAttribute(Pe):null;return typeof t=="string"}function Is(e){var t=e.getAttribute?e.getAttribute(tr):null,n=e.getAttribute?e.getAttribute(nr):null;return t&&n}function Ts(e){return e&&e.classList&&e.classList.contains&&e.classList.contains(E.replacementClass)}function _s(){if(E.autoReplaceSvg===!0)return Mt.replace;var e=Mt[E.autoReplaceSvg];return e||Mt.replace}function Ms(e){return N.createElementNS("http://www.w3.org/2000/svg",e)}function Ns(e){return N.createElement(e)}function Ka(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.ceFn,r=n===void 0?e.tag==="svg"?Ms:Ns:n;if(typeof e=="string")return N.createTextNode(e);var a=r(e.tag);Object.keys(e.attributes||[]).forEach(function(s){a.setAttribute(s,e.attributes[s])});var o=e.children||[];return o.forEach(function(s){a.appendChild(Ka(s,{ceFn:r}))}),a}function Ds(e){var t=" ".concat(e.outerHTML," ");return t="".concat(t,"Font Awesome fontawesome.com "),t}var Mt={replace:function(t){var n=t[0];if(n.parentNode)if(t[1].forEach(function(a){n.parentNode.insertBefore(Ka(a),n)}),n.getAttribute(Pe)===null&&E.keepOriginalSource){var r=N.createComment(Ds(n));n.parentNode.replaceChild(r,n)}else n.remove()},nest:function(t){var n=t[0],r=t[1];if(~ar(n).indexOf(E.replacementClass))return Mt.replace(t);var a=new RegExp("".concat(E.cssPrefix,"-.*"));if(delete r[0].attributes.id,r[0].attributes.class){var o=r[0].attributes.class.split(" ").reduce(function(i,c){return c===E.replacementClass||c.match(a)?i.toSvg.push(c):i.toNode.push(c),i},{toNode:[],toSvg:[]});r[0].attributes.class=o.toSvg.join(" "),o.toNode.length===0?n.removeAttribute("class"):n.setAttribute("class",o.toNode.join(" "))}var s=r.map(function(i){return dt(i)}).join(`
`);n.setAttribute(Pe,""),n.innerHTML=s}};function Fr(e){e()}function Ga(e,t){var n=typeof t=="function"?t:_t;if(e.length===0)n();else{var r=Fr;E.mutateApproach===ji&&(r=ye.requestAnimationFrame||Fr),r(function(){var a=_s(),o=ur.begin("mutate");e.map(a),o(),n()})}}var fr=!1;function Xa(){fr=!0}function Tn(){fr=!1}var zt=null;function zr(e){if(Pr&&E.observeMutations){var t=e.treeCallback,n=t===void 0?_t:t,r=e.nodeCallback,a=r===void 0?_t:r,o=e.pseudoElementsCallback,s=o===void 0?_t:o,i=e.observeMutationsRoot,c=i===void 0?N:i;zt=new Pr(function(f){if(!fr){var d=we();Ve(f).forEach(function(u){if(u.type==="childList"&&u.addedNodes.length>0&&!Lr(u.addedNodes[0])&&(E.searchPseudoElements&&s(u.target),n(u.target)),u.type==="attributes"&&u.target.parentNode&&E.searchPseudoElements&&s(u.target.parentNode),u.type==="attributes"&&Lr(u.target)&&~Ki.indexOf(u.attributeName))if(u.attributeName==="class"&&Is(u.target)){var p=Zt(ar(u.target)),m=p.prefix,b=p.iconName;u.target.setAttribute(tr,m||d),b&&u.target.setAttribute(nr,b)}else Ts(u.target)&&a(u.target)})}}),de&&zt.observe(c,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function Ls(){zt&&zt.disconnect()}function Fs(e){var t=e.getAttribute("style"),n=[];return t&&(n=t.split(";").reduce(function(r,a){var o=a.split(":"),s=o[0],i=o.slice(1);return s&&i.length>0&&(r[s]=i.join(":").trim()),r},{})),n}function zs(e){var t=e.getAttribute("data-prefix"),n=e.getAttribute("data-icon"),r=e.innerText!==void 0?e.innerText.trim():"",a=Zt(ar(e));return a.prefix||(a.prefix=we()),t&&n&&(a.prefix=t,a.iconName=n),a.iconName&&a.prefix||(a.prefix&&r.length>0&&(a.iconName=bs(a.prefix,e.innerText)||sr(a.prefix,Cn(e.innerText))),!a.iconName&&E.autoFetchSvg&&e.firstChild&&e.firstChild.nodeType===Node.TEXT_NODE&&(a.iconName=e.firstChild.data)),a}function js(e){var t=Ve(e.attributes).reduce(function(a,o){return a.name!=="class"&&a.name!=="style"&&(a[o.name]=o.value),a},{}),n=e.getAttribute("title"),r=e.getAttribute("data-fa-title-id");return E.autoA11y&&(n?t["aria-labelledby"]="".concat(E.replacementClass,"-title-").concat(r||st()):(t["aria-hidden"]="true",t.focusable="false")),t}function Us(){return{iconName:null,title:null,titleId:null,prefix:null,transform:ee,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function jr(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},n=zs(e),r=n.iconName,a=n.prefix,o=n.rest,s=js(e),i=An("parseNodeAttributes",{},e),c=t.styleParser?Fs(e):[];return $({iconName:r,title:e.getAttribute("title"),titleId:e.getAttribute("data-fa-title-id"),prefix:a,transform:ee,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:o,styles:c,attributes:s}},i)}var Hs=q.styles;function qa(e){var t=E.autoReplaceSvg==="nest"?jr(e,{styleParser:!1}):jr(e);return~t.extra.classes.indexOf(Ta)?fe("generateLayersText",e,t):fe("generateSvgReplacementMutation",e,t)}var xe=new Set;rr.map(function(e){xe.add("fa-".concat(e))});Object.keys(rt[M]).map(xe.add.bind(xe));Object.keys(rt[F]).map(xe.add.bind(xe));xe=ut(xe);function Ur(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!de)return Promise.resolve();var n=N.documentElement.classList,r=function(u){return n.add("".concat(Or,"-").concat(u))},a=function(u){return n.remove("".concat(Or,"-").concat(u))},o=E.autoFetchSvg?xe:rr.map(function(d){return"fa-".concat(d)}).concat(Object.keys(Hs));o.includes("fa")||o.push("fa");var s=[".".concat(Ta,":not([").concat(Pe,"])")].concat(o.map(function(d){return".".concat(d,":not([").concat(Pe,"])")})).join(", ");if(s.length===0)return Promise.resolve();var i=[];try{i=Ve(e.querySelectorAll(s))}catch{}if(i.length>0)r("pending"),a("complete");else return Promise.resolve();var c=ur.begin("onTree"),f=i.reduce(function(d,u){try{var p=qa(u);p&&d.push(p)}catch(m){Ia||m.name==="MissingIcon"&&console.error(m)}return d},[]);return new Promise(function(d,u){Promise.all(f).then(function(p){Ga(p,function(){r("active"),r("complete"),a("pending"),typeof t=="function"&&t(),c(),d()})}).catch(function(p){c(),u(p)})})}function Ws(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;qa(e).then(function(n){n&&Ga([n],t)})}function Ys(e){return function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=(t||{}).icon?t:Pn(t||{}),a=n.mask;return a&&(a=(a||{}).icon?a:Pn(a||{})),e(r,$($({},n),{},{mask:a}))}}var Bs=function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=n.transform,a=r===void 0?ee:r,o=n.symbol,s=o===void 0?!1:o,i=n.mask,c=i===void 0?null:i,f=n.maskId,d=f===void 0?null:f,u=n.title,p=u===void 0?null:u,m=n.titleId,b=m===void 0?null:m,v=n.classes,h=v===void 0?[]:v,g=n.attributes,y=g===void 0?{}:g,w=n.styles,x=w===void 0?{}:w;if(t){var k=t.prefix,R=t.iconName,S=t.icon;return Jt($({type:"icon"},t),function(){return Oe("beforeDOMElementCreation",{iconDefinition:t,params:n}),E.autoA11y&&(p?y["aria-labelledby"]="".concat(E.replacementClass,"-title-").concat(b||st()):(y["aria-hidden"]="true",y.focusable="false")),lr({icons:{main:On(S),mask:c?On(c.icon):{found:!1,width:null,height:null,icon:{}}},prefix:k,iconName:R,transform:$($({},ee),a),symbol:s,title:p,maskId:d,titleId:b,extra:{attributes:y,styles:x,classes:h}})})}},Vs={mixout:function(){return{icon:Ys(Bs)}},hooks:function(){return{mutationObserverCallbacks:function(n){return n.treeCallback=Ur,n.nodeCallback=Ws,n}}},provides:function(t){t.i2svg=function(n){var r=n.node,a=r===void 0?N:r,o=n.callback,s=o===void 0?function(){}:o;return Ur(a,s)},t.generateSvgReplacementMutation=function(n,r){var a=r.iconName,o=r.title,s=r.titleId,i=r.prefix,c=r.transform,f=r.symbol,d=r.mask,u=r.maskId,p=r.extra;return new Promise(function(m,b){Promise.all([Rn(a,i),d.iconName?Rn(d.iconName,d.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(v){var h=Jn(v,2),g=h[0],y=h[1];m([n,lr({icons:{main:g,mask:y},prefix:i,iconName:a,transform:c,symbol:f,maskId:u,title:o,titleId:s,extra:p,watchable:!0})])}).catch(b)})},t.generateAbstractIcon=function(n){var r=n.children,a=n.attributes,o=n.main,s=n.transform,i=n.styles,c=qt(i);c.length>0&&(a.style=c);var f;return or(s)&&(f=fe("generateAbstractTransformGrouping",{main:o,transform:s,containerWidth:o.width,iconWidth:o.width})),r.push(f||o.icon),{children:r,attributes:a}}}},Ks={mixout:function(){return{layer:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.classes,o=a===void 0?[]:a;return Jt({type:"layer"},function(){Oe("beforeDOMElementCreation",{assembler:n,params:r});var s=[];return n(function(i){Array.isArray(i)?i.map(function(c){s=s.concat(c.abstract)}):s=s.concat(i.abstract)}),[{tag:"span",attributes:{class:["".concat(E.cssPrefix,"-layers")].concat(ut(o)).join(" ")},children:s}]})}}}},Gs={mixout:function(){return{counter:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.title,o=a===void 0?null:a,s=r.classes,i=s===void 0?[]:s,c=r.attributes,f=c===void 0?{}:c,d=r.styles,u=d===void 0?{}:d;return Jt({type:"counter",content:n},function(){return Oe("beforeDOMElementCreation",{content:n,params:r}),As({content:n.toString(),title:o,extra:{attributes:f,styles:u,classes:["".concat(E.cssPrefix,"-layers-counter")].concat(ut(i))}})})}}}},Xs={mixout:function(){return{text:function(n){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.transform,o=a===void 0?ee:a,s=r.title,i=s===void 0?null:s,c=r.classes,f=c===void 0?[]:c,d=r.attributes,u=d===void 0?{}:d,p=r.styles,m=p===void 0?{}:p;return Jt({type:"text",content:n},function(){return Oe("beforeDOMElementCreation",{content:n,params:r}),Nr({content:n,transform:$($({},ee),o),title:i,extra:{attributes:u,styles:m,classes:["".concat(E.cssPrefix,"-layers-text")].concat(ut(f))}})})}}},provides:function(t){t.generateLayersText=function(n,r){var a=r.title,o=r.transform,s=r.extra,i=null,c=null;if(Pa){var f=parseInt(getComputedStyle(n).fontSize,10),d=n.getBoundingClientRect();i=d.width/f,c=d.height/f}return E.autoA11y&&!a&&(s.attributes["aria-hidden"]="true"),Promise.resolve([n,Nr({content:n.innerHTML,width:i,height:c,transform:o,title:a,extra:s,watchable:!0})])}}},qs=new RegExp('"',"ug"),Hr=[1105920,1112319];function Qs(e){var t=e.replace(qs,""),n=us(t,0),r=n>=Hr[0]&&n<=Hr[1],a=t.length===2?t[0]===t[1]:!1;return{value:Cn(a?t[0]:t),isSecondary:r||a}}function Wr(e,t){var n="".concat(zi).concat(t.replace(":","-"));return new Promise(function(r,a){if(e.getAttribute(n)!==null)return r();var o=Ve(e.children),s=o.filter(function(S){return S.getAttribute(kn)===t})[0],i=ye.getComputedStyle(e,t),c=i.getPropertyValue("font-family").match(Yi),f=i.getPropertyValue("font-weight"),d=i.getPropertyValue("content");if(s&&!c)return e.removeChild(s),r();if(c&&d!=="none"&&d!==""){var u=i.getPropertyValue("content"),p=~["Sharp"].indexOf(c[2])?F:M,m=~["Solid","Regular","Light","Thin","Duotone","Brands","Kit"].indexOf(c[2])?at[p][c[2].toLowerCase()]:Bi[p][f],b=Qs(u),v=b.value,h=b.isSecondary,g=c[0].startsWith("FontAwesome"),y=sr(m,v),w=y;if(g){var x=gs(v);x.iconName&&x.prefix&&(y=x.iconName,m=x.prefix)}if(y&&!h&&(!s||s.getAttribute(tr)!==m||s.getAttribute(nr)!==w)){e.setAttribute(n,w),s&&e.removeChild(s);var k=Us(),R=k.extra;R.attributes[kn]=t,Rn(y,m).then(function(S){var C=lr($($({},k),{},{icons:{main:S,mask:cr()},prefix:m,iconName:w,extra:R,watchable:!0})),O=N.createElement("svg");t==="::before"?e.insertBefore(O,e.firstChild):e.appendChild(O),O.outerHTML=C.map(function(D){return dt(D)}).join(`
`),e.removeAttribute(n),r()}).catch(a)}else r()}else r()})}function Zs(e){return Promise.all([Wr(e,"::before"),Wr(e,"::after")])}function Js(e){return e.parentNode!==document.head&&!~Ui.indexOf(e.tagName.toUpperCase())&&!e.getAttribute(kn)&&(!e.parentNode||e.parentNode.tagName!=="svg")}function Yr(e){if(de)return new Promise(function(t,n){var r=Ve(e.querySelectorAll("*")).filter(Js).map(Zs),a=ur.begin("searchPseudoElements");Xa(),Promise.all(r).then(function(){a(),Tn(),t()}).catch(function(){a(),Tn(),n()})})}var ec={hooks:function(){return{mutationObserverCallbacks:function(n){return n.pseudoElementsCallback=Yr,n}}},provides:function(t){t.pseudoElements2svg=function(n){var r=n.node,a=r===void 0?N:r;E.searchPseudoElements&&Yr(a)}}},Br=!1,tc={mixout:function(){return{dom:{unwatch:function(){Xa(),Br=!0}}}},hooks:function(){return{bootstrap:function(){zr(An("mutationObserverCallbacks",{}))},noAuto:function(){Ls()},watch:function(n){var r=n.observeMutationsRoot;Br?Tn():zr(An("mutationObserverCallbacks",{observeMutationsRoot:r}))}}}},Vr=function(t){var n={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce(function(r,a){var o=a.toLowerCase().split("-"),s=o[0],i=o.slice(1).join("-");if(s&&i==="h")return r.flipX=!0,r;if(s&&i==="v")return r.flipY=!0,r;if(i=parseFloat(i),isNaN(i))return r;switch(s){case"grow":r.size=r.size+i;break;case"shrink":r.size=r.size-i;break;case"left":r.x=r.x-i;break;case"right":r.x=r.x+i;break;case"up":r.y=r.y-i;break;case"down":r.y=r.y+i;break;case"rotate":r.rotate=r.rotate+i;break}return r},n)},nc={mixout:function(){return{parse:{transform:function(n){return Vr(n)}}}},hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-transform");return a&&(n.transform=Vr(a)),n}}},provides:function(t){t.generateAbstractTransformGrouping=function(n){var r=n.main,a=n.transform,o=n.containerWidth,s=n.iconWidth,i={transform:"translate(".concat(o/2," 256)")},c="translate(".concat(a.x*32,", ").concat(a.y*32,") "),f="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),d="rotate(".concat(a.rotate," 0 0)"),u={transform:"".concat(c," ").concat(f," ").concat(d)},p={transform:"translate(".concat(s/2*-1," -256)")},m={outer:i,inner:u,path:p};return{tag:"g",attributes:$({},m.outer),children:[{tag:"g",attributes:$({},m.inner),children:[{tag:r.icon.tag,children:r.icon.children,attributes:$($({},r.icon.attributes),m.path)}]}]}}}},fn={x:0,y:0,width:"100%",height:"100%"};function Kr(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return e.attributes&&(e.attributes.fill||t)&&(e.attributes.fill="black"),e}function rc(e){return e.tag==="g"?e.children:[e]}var ac={hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-mask"),o=a?Zt(a.split(" ").map(function(s){return s.trim()})):cr();return o.prefix||(o.prefix=we()),n.mask=o,n.maskId=r.getAttribute("data-fa-mask-id"),n}}},provides:function(t){t.generateAbstractMask=function(n){var r=n.children,a=n.attributes,o=n.main,s=n.mask,i=n.maskId,c=n.transform,f=o.width,d=o.icon,u=s.width,p=s.icon,m=ns({transform:c,containerWidth:u,iconWidth:f}),b={tag:"rect",attributes:$($({},fn),{},{fill:"white"})},v=d.children?{children:d.children.map(Kr)}:{},h={tag:"g",attributes:$({},m.inner),children:[Kr($({tag:d.tag,attributes:$($({},d.attributes),m.path)},v))]},g={tag:"g",attributes:$({},m.outer),children:[h]},y="mask-".concat(i||st()),w="clip-".concat(i||st()),x={tag:"mask",attributes:$($({},fn),{},{id:y,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[b,g]},k={tag:"defs",children:[{tag:"clipPath",attributes:{id:w},children:rc(p)},x]};return r.push(k,{tag:"rect",attributes:$({fill:"currentColor","clip-path":"url(#".concat(w,")"),mask:"url(#".concat(y,")")},fn)}),{children:r,attributes:a}}}},oc={provides:function(t){var n=!1;ye.matchMedia&&(n=ye.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){var r=[],a={fill:"currentColor"},o={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};r.push({tag:"path",attributes:$($({},a),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var s=$($({},o),{},{attributeName:"opacity"}),i={tag:"circle",attributes:$($({},a),{},{cx:"256",cy:"364",r:"28"}),children:[]};return n||i.children.push({tag:"animate",attributes:$($({},o),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:$($({},s),{},{values:"1;0;1;1;0;1;"})}),r.push(i),r.push({tag:"path",attributes:$($({},a),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:n?[]:[{tag:"animate",attributes:$($({},s),{},{values:"1;0;0;0;0;1;"})}]}),n||r.push({tag:"path",attributes:$($({},a),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:$($({},s),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:r}}}},ic={hooks:function(){return{parseNodeAttributes:function(n,r){var a=r.getAttribute("data-fa-symbol"),o=a===null?!1:a===""?!0:a;return n.symbol=o,n}}}},sc=[os,Vs,Ks,Gs,Xs,ec,tc,nc,ac,oc,ic];ws(sc,{mixoutsTo:B});B.noAuto;B.config;B.library;B.dom;var _n=B.parse;B.findIconDefinition;B.toHtml;var cc=B.icon;B.layer;B.text;B.counter;function Gr(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),n.push.apply(n,r)}return n}function ve(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Gr(Object(n),!0).forEach(function(r){We(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Gr(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function jt(e){return jt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},jt(e)}function We(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function lc(e,t){if(e==null)return{};var n={},r=Object.keys(e),a,o;for(o=0;o<r.length;o++)a=r[o],!(t.indexOf(a)>=0)&&(n[a]=e[a]);return n}function uc(e,t){if(e==null)return{};var n=lc(e,t),r,a;if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}function Mn(e){return fc(e)||dc(e)||mc(e)||pc()}function fc(e){if(Array.isArray(e))return Nn(e)}function dc(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function mc(e,t){if(e){if(typeof e=="string")return Nn(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Nn(e,t)}}function Nn(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function pc(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function vc(e){var t,n=e.beat,r=e.fade,a=e.beatFade,o=e.bounce,s=e.shake,i=e.flash,c=e.spin,f=e.spinPulse,d=e.spinReverse,u=e.pulse,p=e.fixedWidth,m=e.inverse,b=e.border,v=e.listItem,h=e.flip,g=e.size,y=e.rotation,w=e.pull,x=(t={"fa-beat":n,"fa-fade":r,"fa-beat-fade":a,"fa-bounce":o,"fa-shake":s,"fa-flash":i,"fa-spin":c,"fa-spin-reverse":d,"fa-spin-pulse":f,"fa-pulse":u,"fa-fw":p,"fa-inverse":m,"fa-border":b,"fa-li":v,"fa-flip":h===!0,"fa-flip-horizontal":h==="horizontal"||h==="both","fa-flip-vertical":h==="vertical"||h==="both"},We(t,"fa-".concat(g),typeof g<"u"&&g!==null),We(t,"fa-rotate-".concat(y),typeof y<"u"&&y!==null&&y!==0),We(t,"fa-pull-".concat(w),typeof w<"u"&&w!==null),We(t,"fa-swap-opacity",e.swapOpacity),t);return Object.keys(x).map(function(k){return x[k]?k:null}).filter(function(k){return k})}function bc(e){return e=e-0,e===e}function Qa(e){return bc(e)?e:(e=e.replace(/[\-_\s]+(.)?/g,function(t,n){return n?n.toUpperCase():""}),e.substr(0,1).toLowerCase()+e.substr(1))}var gc=["style"];function hc(e){return e.charAt(0).toUpperCase()+e.slice(1)}function yc(e){return e.split(";").map(function(t){return t.trim()}).filter(function(t){return t}).reduce(function(t,n){var r=n.indexOf(":"),a=Qa(n.slice(0,r)),o=n.slice(r+1).trim();return a.startsWith("webkit")?t[hc(a)]=o:t[a]=o,t},{})}function Za(e,t){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof t=="string")return t;var r=(t.children||[]).map(function(c){return Za(e,c)}),a=Object.keys(t.attributes||{}).reduce(function(c,f){var d=t.attributes[f];switch(f){case"class":c.attrs.className=d,delete t.attributes.class;break;case"style":c.attrs.style=yc(d);break;default:f.indexOf("aria-")===0||f.indexOf("data-")===0?c.attrs[f.toLowerCase()]=d:c.attrs[Qa(f)]=d}return c},{attrs:{}}),o=n.style,s=o===void 0?{}:o,i=uc(n,gc);return a.attrs.style=ve(ve({},a.attrs.style),s),e.apply(void 0,[t.tag,ve(ve({},a.attrs),i)].concat(Mn(r)))}var Ja=!1;try{Ja=!0}catch{}function wc(){if(!Ja&&console&&typeof console.error=="function"){var e;(e=console).error.apply(e,arguments)}}function Xr(e){if(e&&jt(e)==="object"&&e.prefix&&e.iconName&&e.icon)return e;if(_n.icon)return _n.icon(e);if(e===null)return null;if(e&&jt(e)==="object"&&e.prefix&&e.iconName)return e;if(Array.isArray(e)&&e.length===2)return{prefix:e[0],iconName:e[1]};if(typeof e=="string")return{prefix:"fas",iconName:e}}function dn(e,t){return Array.isArray(t)&&t.length>0||!Array.isArray(t)&&t?We({},e,t):{}}var Re=P.forwardRef(function(e,t){var n=e.icon,r=e.mask,a=e.symbol,o=e.className,s=e.title,i=e.titleId,c=e.maskId,f=Xr(n),d=dn("classes",[].concat(Mn(vc(e)),Mn(o.split(" ")))),u=dn("transform",typeof e.transform=="string"?_n.transform(e.transform):e.transform),p=dn("mask",Xr(r)),m=cc(f,ve(ve(ve(ve({},d),u),p),{},{symbol:a,title:s,titleId:i,maskId:c}));if(!m)return wc("Could not find icon",f),null;var b=m.abstract,v={ref:t};return Object.keys(e).forEach(function(h){Re.defaultProps.hasOwnProperty(h)||(v[h]=e[h])}),xc(b[0],v)});Re.displayName="FontAwesomeIcon";Re.propTypes={beat:I.bool,border:I.bool,beatFade:I.bool,bounce:I.bool,className:I.string,fade:I.bool,flash:I.bool,mask:I.oneOfType([I.object,I.array,I.string]),maskId:I.string,fixedWidth:I.bool,inverse:I.bool,flip:I.oneOf([!0,!1,"horizontal","vertical","both"]),icon:I.oneOfType([I.object,I.array,I.string]),listItem:I.bool,pull:I.oneOf(["right","left"]),pulse:I.bool,rotation:I.oneOf([0,90,180,270]),shake:I.bool,size:I.oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:I.bool,spinPulse:I.bool,spinReverse:I.bool,symbol:I.oneOfType([I.bool,I.string]),title:I.string,titleId:I.string,transform:I.oneOfType([I.string,I.object]),swapOpacity:I.bool};Re.defaultProps={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:!1,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,size:null,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1};var xc=Za.bind(null,P.createElement);function _(e,t,{checkForDefaultPrevented:n=!0}={}){return function(a){if(e==null||e(a),n===!1||!a.defaultPrevented)return t==null?void 0:t(a)}}function $c(e,t){typeof e=="function"?e(t):e!=null&&(e.current=t)}function dr(...e){return t=>e.forEach(n=>$c(n,t))}function X(...e){return l.useCallback(dr(...e),e)}function mt(e,t=[]){let n=[];function r(o,s){const i=l.createContext(s),c=n.length;n=[...n,s];function f(u){const{scope:p,children:m,...b}=u,v=(p==null?void 0:p[e][c])||i,h=l.useMemo(()=>b,Object.values(b));return l.createElement(v.Provider,{value:h},m)}function d(u,p){const m=(p==null?void 0:p[e][c])||i,b=l.useContext(m);if(b)return b;if(s!==void 0)return s;throw new Error(`\`${u}\` must be used within \`${o}\``)}return f.displayName=o+"Provider",[f,d]}const a=()=>{const o=n.map(s=>l.createContext(s));return function(i){const c=(i==null?void 0:i[e])||o;return l.useMemo(()=>({[`__scope${e}`]:{...i,[e]:c}}),[i,c])}};return a.scopeName=e,[r,Ec(a,...t)]}function Ec(...e){const t=e[0];if(e.length===1)return t;const n=()=>{const r=e.map(a=>({useScope:a(),scopeName:a.scopeName}));return function(o){const s=r.reduce((i,{useScope:c,scopeName:f})=>{const u=c(o)[`__scope${f}`];return{...i,...u}},{});return l.useMemo(()=>({[`__scope${t.scopeName}`]:s}),[s])}};return n.scopeName=t.scopeName,n}function te(e){const t=l.useRef(e);return l.useEffect(()=>{t.current=e}),l.useMemo(()=>(...n)=>{var r;return(r=t.current)===null||r===void 0?void 0:r.call(t,...n)},[])}function eo({prop:e,defaultProp:t,onChange:n=()=>{}}){const[r,a]=kc({defaultProp:t,onChange:n}),o=e!==void 0,s=o?e:r,i=te(n),c=l.useCallback(f=>{if(o){const u=typeof f=="function"?f(e):f;u!==e&&i(u)}else a(f)},[o,e,a,i]);return[s,c]}function kc({defaultProp:e,onChange:t}){const n=l.useState(e),[r]=n,a=l.useRef(r),o=te(t);return l.useEffect(()=>{a.current!==r&&(o(r),a.current=r)},[r,a,o]),n}const ct=l.forwardRef((e,t)=>{const{children:n,...r}=e,a=l.Children.toArray(n),o=a.find(Sc);if(o){const s=o.props.children,i=a.map(c=>c===o?l.Children.count(s)>1?l.Children.only(null):l.isValidElement(s)?s.props.children:null:c);return l.createElement(Dn,T({},r,{ref:t}),l.isValidElement(s)?l.cloneElement(s,void 0,i):null)}return l.createElement(Dn,T({},r,{ref:t}),n)});ct.displayName="Slot";const Dn=l.forwardRef((e,t)=>{const{children:n,...r}=e;return l.isValidElement(n)?l.cloneElement(n,{...Ac(r,n.props),ref:dr(t,n.ref)}):l.Children.count(n)>1?l.Children.only(null):null});Dn.displayName="SlotClone";const Cc=({children:e})=>l.createElement(l.Fragment,null,e);function Sc(e){return l.isValidElement(e)&&e.type===Cc}function Ac(e,t){const n={...t};for(const r in t){const a=e[r],o=t[r];/^on[A-Z]/.test(r)?a&&o?n[r]=(...i)=>{o(...i),a(...i)}:a&&(n[r]=a):r==="style"?n[r]={...a,...o}:r==="className"&&(n[r]=[a,o].filter(Boolean).join(" "))}return{...e,...n}}const Pc=["a","button","div","h2","h3","img","label","li","nav","ol","p","span","svg","ul"],Q=Pc.reduce((e,t)=>{const n=l.forwardRef((r,a)=>{const{asChild:o,...s}=r,i=o?ct:t;return l.useEffect(()=>{window[Symbol.for("radix-ui")]=!0},[]),l.createElement(i,T({},s,{ref:a}))});return n.displayName=`Primitive.${t}`,{...e,[t]:n}},{});function to(e,t){e&&qn.flushSync(()=>e.dispatchEvent(t))}function no(e){const t=e+"CollectionProvider",[n,r]=mt(t),[a,o]=n(t,{collectionRef:{current:null},itemMap:new Map}),s=m=>{const{scope:b,children:v}=m,h=P.useRef(null),g=P.useRef(new Map).current;return P.createElement(a,{scope:b,itemMap:g,collectionRef:h},v)},i=e+"CollectionSlot",c=P.forwardRef((m,b)=>{const{scope:v,children:h}=m,g=o(i,v),y=X(b,g.collectionRef);return P.createElement(ct,{ref:y},h)}),f=e+"CollectionItemSlot",d="data-radix-collection-item",u=P.forwardRef((m,b)=>{const{scope:v,children:h,...g}=m,y=P.useRef(null),w=X(b,y),x=o(f,v);return P.useEffect(()=>(x.itemMap.set(y,{ref:y,...g}),()=>void x.itemMap.delete(y))),P.createElement(ct,{[d]:"",ref:w},h)});function p(m){const b=o(e+"CollectionConsumer",m);return P.useCallback(()=>{const h=b.collectionRef.current;if(!h)return[];const g=Array.from(h.querySelectorAll(`[${d}]`));return Array.from(b.itemMap.values()).sort((x,k)=>g.indexOf(x.ref.current)-g.indexOf(k.ref.current))},[b.collectionRef,b.itemMap])}return[{Provider:s,Slot:c,ItemSlot:u},p,r]}const Oc=l.createContext(void 0);function ro(e){const t=l.useContext(Oc);return e||t||"ltr"}function Rc(e,t=globalThis==null?void 0:globalThis.document){const n=te(e);l.useEffect(()=>{const r=a=>{a.key==="Escape"&&n(a)};return t.addEventListener("keydown",r),()=>t.removeEventListener("keydown",r)},[n,t])}const Ln="dismissableLayer.update",Ic="dismissableLayer.pointerDownOutside",Tc="dismissableLayer.focusOutside";let qr;const _c=l.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),Mc=l.forwardRef((e,t)=>{var n;const{disableOutsidePointerEvents:r=!1,onEscapeKeyDown:a,onPointerDownOutside:o,onFocusOutside:s,onInteractOutside:i,onDismiss:c,...f}=e,d=l.useContext(_c),[u,p]=l.useState(null),m=(n=u==null?void 0:u.ownerDocument)!==null&&n!==void 0?n:globalThis==null?void 0:globalThis.document,[,b]=l.useState({}),v=X(t,C=>p(C)),h=Array.from(d.layers),[g]=[...d.layersWithOutsidePointerEventsDisabled].slice(-1),y=h.indexOf(g),w=u?h.indexOf(u):-1,x=d.layersWithOutsidePointerEventsDisabled.size>0,k=w>=y,R=Nc(C=>{const O=C.target,D=[...d.branches].some(W=>W.contains(O));!k||D||(o==null||o(C),i==null||i(C),C.defaultPrevented||c==null||c())},m),S=Dc(C=>{const O=C.target;[...d.branches].some(W=>W.contains(O))||(s==null||s(C),i==null||i(C),C.defaultPrevented||c==null||c())},m);return Rc(C=>{w===d.layers.size-1&&(a==null||a(C),!C.defaultPrevented&&c&&(C.preventDefault(),c()))},m),l.useEffect(()=>{if(u)return r&&(d.layersWithOutsidePointerEventsDisabled.size===0&&(qr=m.body.style.pointerEvents,m.body.style.pointerEvents="none"),d.layersWithOutsidePointerEventsDisabled.add(u)),d.layers.add(u),Qr(),()=>{r&&d.layersWithOutsidePointerEventsDisabled.size===1&&(m.body.style.pointerEvents=qr)}},[u,m,r,d]),l.useEffect(()=>()=>{u&&(d.layers.delete(u),d.layersWithOutsidePointerEventsDisabled.delete(u),Qr())},[u,d]),l.useEffect(()=>{const C=()=>b({});return document.addEventListener(Ln,C),()=>document.removeEventListener(Ln,C)},[]),l.createElement(Q.div,T({},f,{ref:v,style:{pointerEvents:x?k?"auto":"none":void 0,...e.style},onFocusCapture:_(e.onFocusCapture,S.onFocusCapture),onBlurCapture:_(e.onBlurCapture,S.onBlurCapture),onPointerDownCapture:_(e.onPointerDownCapture,R.onPointerDownCapture)}))});function Nc(e,t=globalThis==null?void 0:globalThis.document){const n=te(e),r=l.useRef(!1),a=l.useRef(()=>{});return l.useEffect(()=>{const o=i=>{if(i.target&&!r.current){let f=function(){ao(Ic,n,c,{discrete:!0})};const c={originalEvent:i};i.pointerType==="touch"?(t.removeEventListener("click",a.current),a.current=f,t.addEventListener("click",a.current,{once:!0})):f()}r.current=!1},s=window.setTimeout(()=>{t.addEventListener("pointerdown",o)},0);return()=>{window.clearTimeout(s),t.removeEventListener("pointerdown",o),t.removeEventListener("click",a.current)}},[t,n]),{onPointerDownCapture:()=>r.current=!0}}function Dc(e,t=globalThis==null?void 0:globalThis.document){const n=te(e),r=l.useRef(!1);return l.useEffect(()=>{const a=o=>{o.target&&!r.current&&ao(Tc,n,{originalEvent:o},{discrete:!1})};return t.addEventListener("focusin",a),()=>t.removeEventListener("focusin",a)},[t,n]),{onFocusCapture:()=>r.current=!0,onBlurCapture:()=>r.current=!1}}function Qr(){const e=new CustomEvent(Ln);document.dispatchEvent(e)}function ao(e,t,n,{discrete:r}){const a=n.originalEvent.target,o=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:n});t&&a.addEventListener(e,t,{once:!0}),r?to(a,o):a.dispatchEvent(o)}let mn=0;function Lc(){l.useEffect(()=>{var e,t;const n=document.querySelectorAll("[data-radix-focus-guard]");return document.body.insertAdjacentElement("afterbegin",(e=n[0])!==null&&e!==void 0?e:Zr()),document.body.insertAdjacentElement("beforeend",(t=n[1])!==null&&t!==void 0?t:Zr()),mn++,()=>{mn===1&&document.querySelectorAll("[data-radix-focus-guard]").forEach(r=>r.remove()),mn--}},[])}function Zr(){const e=document.createElement("span");return e.setAttribute("data-radix-focus-guard",""),e.tabIndex=0,e.style.cssText="outline: none; opacity: 0; position: fixed; pointer-events: none",e}const pn="focusScope.autoFocusOnMount",vn="focusScope.autoFocusOnUnmount",Jr={bubbles:!1,cancelable:!0},Fc=l.forwardRef((e,t)=>{const{loop:n=!1,trapped:r=!1,onMountAutoFocus:a,onUnmountAutoFocus:o,...s}=e,[i,c]=l.useState(null),f=te(a),d=te(o),u=l.useRef(null),p=X(t,v=>c(v)),m=l.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;l.useEffect(()=>{if(r){let v=function(g){if(m.paused||!i)return;const y=g.target;i.contains(y)?u.current=y:ke(u.current,{select:!0})},h=function(g){m.paused||!i||i.contains(g.relatedTarget)||ke(u.current,{select:!0})};return document.addEventListener("focusin",v),document.addEventListener("focusout",h),()=>{document.removeEventListener("focusin",v),document.removeEventListener("focusout",h)}}},[r,i,m.paused]),l.useEffect(()=>{if(i){ta.add(m);const v=document.activeElement;if(!i.contains(v)){const g=new CustomEvent(pn,Jr);i.addEventListener(pn,f),i.dispatchEvent(g),g.defaultPrevented||(zc(Yc(oo(i)),{select:!0}),document.activeElement===v&&ke(i))}return()=>{i.removeEventListener(pn,f),setTimeout(()=>{const g=new CustomEvent(vn,Jr);i.addEventListener(vn,d),i.dispatchEvent(g),g.defaultPrevented||ke(v??document.body,{select:!0}),i.removeEventListener(vn,d),ta.remove(m)},0)}}},[i,f,d,m]);const b=l.useCallback(v=>{if(!n&&!r||m.paused)return;const h=v.key==="Tab"&&!v.altKey&&!v.ctrlKey&&!v.metaKey,g=document.activeElement;if(h&&g){const y=v.currentTarget,[w,x]=jc(y);w&&x?!v.shiftKey&&g===x?(v.preventDefault(),n&&ke(w,{select:!0})):v.shiftKey&&g===w&&(v.preventDefault(),n&&ke(x,{select:!0})):g===y&&v.preventDefault()}},[n,r,m.paused]);return l.createElement(Q.div,T({tabIndex:-1},s,{ref:p,onKeyDown:b}))});function zc(e,{select:t=!1}={}){const n=document.activeElement;for(const r of e)if(ke(r,{select:t}),document.activeElement!==n)return}function jc(e){const t=oo(e),n=ea(t,e),r=ea(t.reverse(),e);return[n,r]}function oo(e){const t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:r=>{const a=r.tagName==="INPUT"&&r.type==="hidden";return r.disabled||r.hidden||a?NodeFilter.FILTER_SKIP:r.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;n.nextNode();)t.push(n.currentNode);return t}function ea(e,t){for(const n of e)if(!Uc(n,{upTo:t}))return n}function Uc(e,{upTo:t}){if(getComputedStyle(e).visibility==="hidden")return!0;for(;e;){if(t!==void 0&&e===t)return!1;if(getComputedStyle(e).display==="none")return!0;e=e.parentElement}return!1}function Hc(e){return e instanceof HTMLInputElement&&"select"in e}function ke(e,{select:t=!1}={}){if(e&&e.focus){const n=document.activeElement;e.focus({preventScroll:!0}),e!==n&&Hc(e)&&t&&e.select()}}const ta=Wc();function Wc(){let e=[];return{add(t){const n=e[0];t!==n&&(n==null||n.pause()),e=na(e,t),e.unshift(t)},remove(t){var n;e=na(e,t),(n=e[0])===null||n===void 0||n.resume()}}}function na(e,t){const n=[...e],r=n.indexOf(t);return r!==-1&&n.splice(r,1),n}function Yc(e){return e.filter(t=>t.tagName!=="A")}const be=Boolean(globalThis==null?void 0:globalThis.document)?l.useLayoutEffect:()=>{},Bc=Xo["useId".toString()]||(()=>{});let Vc=0;function Fn(e){const[t,n]=l.useState(Bc());return be(()=>{e||n(r=>r??String(Vc++))},[e]),e||(t?`radix-${t}`:"")}function Ie(e){return e.split("-")[0]}function pt(e){return e.split("-")[1]}function Ke(e){return["top","bottom"].includes(Ie(e))?"x":"y"}function mr(e){return e==="y"?"height":"width"}function ra(e,t,n){let{reference:r,floating:a}=e;const o=r.x+r.width/2-a.width/2,s=r.y+r.height/2-a.height/2,i=Ke(t),c=mr(i),f=r[c]/2-a[c]/2,d=i==="x";let u;switch(Ie(t)){case"top":u={x:o,y:r.y-a.height};break;case"bottom":u={x:o,y:r.y+r.height};break;case"right":u={x:r.x+r.width,y:s};break;case"left":u={x:r.x-a.width,y:s};break;default:u={x:r.x,y:r.y}}switch(pt(t)){case"start":u[i]-=f*(n&&d?-1:1);break;case"end":u[i]+=f*(n&&d?-1:1)}return u}const Kc=async(e,t,n)=>{const{placement:r="bottom",strategy:a="absolute",middleware:o=[],platform:s}=n,i=await(s.isRTL==null?void 0:s.isRTL(t));let c=await s.getElementRects({reference:e,floating:t,strategy:a}),{x:f,y:d}=ra(c,r,i),u=r,p={},m=0;for(let b=0;b<o.length;b++){const{name:v,fn:h}=o[b],{x:g,y,data:w,reset:x}=await h({x:f,y:d,initialPlacement:r,placement:u,strategy:a,middlewareData:p,rects:c,platform:s,elements:{reference:e,floating:t}});f=g??f,d=y??d,p={...p,[v]:{...p[v],...w}},x&&m<=50&&(m++,typeof x=="object"&&(x.placement&&(u=x.placement),x.rects&&(c=x.rects===!0?await s.getElementRects({reference:e,floating:t,strategy:a}):x.rects),{x:f,y:d}=ra(c,u,i)),b=-1)}return{x:f,y:d,placement:u,strategy:a,middlewareData:p}};function io(e){return typeof e!="number"?function(t){return{top:0,right:0,bottom:0,left:0,...t}}(e):{top:e,right:e,bottom:e,left:e}}function Ut(e){return{...e,top:e.y,left:e.x,right:e.x+e.width,bottom:e.y+e.height}}async function lt(e,t){var n;t===void 0&&(t={});const{x:r,y:a,platform:o,rects:s,elements:i,strategy:c}=e,{boundary:f="clippingAncestors",rootBoundary:d="viewport",elementContext:u="floating",altBoundary:p=!1,padding:m=0}=t,b=io(m),v=i[p?u==="floating"?"reference":"floating":u],h=Ut(await o.getClippingRect({element:(n=await(o.isElement==null?void 0:o.isElement(v)))==null||n?v:v.contextElement||await(o.getDocumentElement==null?void 0:o.getDocumentElement(i.floating)),boundary:f,rootBoundary:d,strategy:c})),g=Ut(o.convertOffsetParentRelativeRectToViewportRelativeRect?await o.convertOffsetParentRelativeRectToViewportRelativeRect({rect:u==="floating"?{...s.floating,x:r,y:a}:s.reference,offsetParent:await(o.getOffsetParent==null?void 0:o.getOffsetParent(i.floating)),strategy:c}):s[u]);return{top:h.top-g.top+b.top,bottom:g.bottom-h.bottom+b.bottom,left:h.left-g.left+b.left,right:g.right-h.right+b.right}}const Gc=Math.min,Ce=Math.max;function zn(e,t,n){return Ce(e,Gc(t,n))}const aa=e=>({name:"arrow",options:e,async fn(t){const{element:n,padding:r=0}=e??{},{x:a,y:o,placement:s,rects:i,platform:c}=t;if(n==null)return{};const f=io(r),d={x:a,y:o},u=Ke(s),p=pt(s),m=mr(u),b=await c.getDimensions(n),v=u==="y"?"top":"left",h=u==="y"?"bottom":"right",g=i.reference[m]+i.reference[u]-d[u]-i.floating[m],y=d[u]-i.reference[u],w=await(c.getOffsetParent==null?void 0:c.getOffsetParent(n));let x=w?u==="y"?w.clientHeight||0:w.clientWidth||0:0;x===0&&(x=i.floating[m]);const k=g/2-y/2,R=f[v],S=x-b[m]-f[h],C=x/2-b[m]/2+k,O=zn(R,C,S),D=(p==="start"?f[v]:f[h])>0&&C!==O&&i.reference[m]<=i.floating[m];return{[u]:d[u]-(D?C<R?R-C:S-C:0),data:{[u]:O,centerOffset:C-O}}}}),Xc={left:"right",right:"left",bottom:"top",top:"bottom"};function Ht(e){return e.replace(/left|right|bottom|top/g,t=>Xc[t])}function qc(e,t,n){n===void 0&&(n=!1);const r=pt(e),a=Ke(e),o=mr(a);let s=a==="x"?r===(n?"end":"start")?"right":"left":r==="start"?"bottom":"top";return t.reference[o]>t.floating[o]&&(s=Ht(s)),{main:s,cross:Ht(s)}}const Qc={start:"end",end:"start"};function oa(e){return e.replace(/start|end/g,t=>Qc[t])}const so=["top","right","bottom","left"];so.reduce((e,t)=>e.concat(t,t+"-start",t+"-end"),[]);const Zc=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(t){var n;const{placement:r,middlewareData:a,rects:o,initialPlacement:s,platform:i,elements:c}=t,{mainAxis:f=!0,crossAxis:d=!0,fallbackPlacements:u,fallbackStrategy:p="bestFit",flipAlignment:m=!0,...b}=e,v=Ie(r),h=u||(v===s||!m?[Ht(s)]:function(C){const O=Ht(C);return[oa(C),O,oa(O)]}(s)),g=[s,...h],y=await lt(t,b),w=[];let x=((n=a.flip)==null?void 0:n.overflows)||[];if(f&&w.push(y[v]),d){const{main:C,cross:O}=qc(r,o,await(i.isRTL==null?void 0:i.isRTL(c.floating)));w.push(y[C],y[O])}if(x=[...x,{placement:r,overflows:w}],!w.every(C=>C<=0)){var k,R;const C=((k=(R=a.flip)==null?void 0:R.index)!=null?k:0)+1,O=g[C];if(O)return{data:{index:C,overflows:x},reset:{placement:O}};let D="bottom";switch(p){case"bestFit":{var S;const W=(S=x.map(V=>[V,V.overflows.filter(j=>j>0).reduce((j,re)=>j+re,0)]).sort((V,j)=>V[1]-j[1])[0])==null?void 0:S[0].placement;W&&(D=W);break}case"initialPlacement":D=s}if(r!==D)return{reset:{placement:D}}}return{}}}};function ia(e,t){return{top:e.top-t.height,right:e.right-t.width,bottom:e.bottom-t.height,left:e.left-t.width}}function sa(e){return so.some(t=>e[t]>=0)}const Jc=function(e){let{strategy:t="referenceHidden",...n}=e===void 0?{}:e;return{name:"hide",async fn(r){const{rects:a}=r;switch(t){case"referenceHidden":{const o=ia(await lt(r,{...n,elementContext:"reference"}),a.reference);return{data:{referenceHiddenOffsets:o,referenceHidden:sa(o)}}}case"escaped":{const o=ia(await lt(r,{...n,altBoundary:!0}),a.floating);return{data:{escapedOffsets:o,escaped:sa(o)}}}default:return{}}}}},el=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(t){const{x:n,y:r}=t,a=await async function(o,s){const{placement:i,platform:c,elements:f}=o,d=await(c.isRTL==null?void 0:c.isRTL(f.floating)),u=Ie(i),p=pt(i),m=Ke(i)==="x",b=["left","top"].includes(u)?-1:1,v=d&&m?-1:1,h=typeof s=="function"?s(o):s;let{mainAxis:g,crossAxis:y,alignmentAxis:w}=typeof h=="number"?{mainAxis:h,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...h};return p&&typeof w=="number"&&(y=p==="end"?-1*w:w),m?{x:y*v,y:g*b}:{x:g*b,y:y*v}}(t,e);return{x:n+a.x,y:r+a.y,data:a}}}};function co(e){return e==="x"?"y":"x"}const tl=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(t){const{x:n,y:r,placement:a}=t,{mainAxis:o=!0,crossAxis:s=!1,limiter:i={fn:h=>{let{x:g,y}=h;return{x:g,y}}},...c}=e,f={x:n,y:r},d=await lt(t,c),u=Ke(Ie(a)),p=co(u);let m=f[u],b=f[p];if(o){const h=u==="y"?"bottom":"right";m=zn(m+d[u==="y"?"top":"left"],m,m-d[h])}if(s){const h=p==="y"?"bottom":"right";b=zn(b+d[p==="y"?"top":"left"],b,b-d[h])}const v=i.fn({...t,[u]:m,[p]:b});return{...v,data:{x:v.x-n,y:v.y-r}}}}},nl=function(e){return e===void 0&&(e={}),{options:e,fn(t){const{x:n,y:r,placement:a,rects:o,middlewareData:s}=t,{offset:i=0,mainAxis:c=!0,crossAxis:f=!0}=e,d={x:n,y:r},u=Ke(a),p=co(u);let m=d[u],b=d[p];const v=typeof i=="function"?i({...o,placement:a}):i,h=typeof v=="number"?{mainAxis:v,crossAxis:0}:{mainAxis:0,crossAxis:0,...v};if(c){const k=u==="y"?"height":"width",R=o.reference[u]-o.floating[k]+h.mainAxis,S=o.reference[u]+o.reference[k]-h.mainAxis;m<R?m=R:m>S&&(m=S)}if(f){var g,y,w,x;const k=u==="y"?"width":"height",R=["top","left"].includes(Ie(a)),S=o.reference[p]-o.floating[k]+(R&&(g=(y=s.offset)==null?void 0:y[p])!=null?g:0)+(R?0:h.crossAxis),C=o.reference[p]+o.reference[k]+(R?0:(w=(x=s.offset)==null?void 0:x[p])!=null?w:0)-(R?h.crossAxis:0);b<S?b=S:b>C&&(b=C)}return{[u]:m,[p]:b}}}},rl=function(e){return e===void 0&&(e={}),{name:"size",options:e,async fn(t){const{placement:n,rects:r,platform:a,elements:o}=t,{apply:s,...i}=e,c=await lt(t,i),f=Ie(n),d=pt(n);let u,p;f==="top"||f==="bottom"?(u=f,p=d===(await(a.isRTL==null?void 0:a.isRTL(o.floating))?"start":"end")?"left":"right"):(p=f,u=d==="end"?"top":"bottom");const m=Ce(c.left,0),b=Ce(c.right,0),v=Ce(c.top,0),h=Ce(c.bottom,0),g={availableHeight:r.floating.height-(["left","right"].includes(n)?2*(v!==0||h!==0?v+h:Ce(c.top,c.bottom)):c[u]),availableWidth:r.floating.width-(["top","bottom"].includes(n)?2*(m!==0||b!==0?m+b:Ce(c.left,c.right)):c[p])},y=await a.getDimensions(o.floating);s==null||s({...t,...g});const w=await a.getDimensions(o.floating);return y.width!==w.width||y.height!==w.height?{reset:{rects:!0}}:{}}}};function lo(e){return e&&e.document&&e.location&&e.alert&&e.setInterval}function me(e){if(e==null)return window;if(!lo(e)){const t=e.ownerDocument;return t&&t.defaultView||window}return e}function vt(e){return me(e).getComputedStyle(e)}function se(e){return lo(e)?"":e?(e.nodeName||"").toLowerCase():""}function uo(){const e=navigator.userAgentData;return e!=null&&e.brands?e.brands.map(t=>t.brand+"/"+t.version).join(" "):navigator.userAgent}function ne(e){return e instanceof me(e).HTMLElement}function $e(e){return e instanceof me(e).Element}function pr(e){return typeof ShadowRoot>"u"?!1:e instanceof me(e).ShadowRoot||e instanceof ShadowRoot}function en(e){const{overflow:t,overflowX:n,overflowY:r}=vt(e);return/auto|scroll|overlay|hidden/.test(t+r+n)}function al(e){return["table","td","th"].includes(se(e))}function ca(e){const t=/firefox/i.test(uo()),n=vt(e);return n.transform!=="none"||n.perspective!=="none"||n.contain==="paint"||["transform","perspective"].includes(n.willChange)||t&&n.willChange==="filter"||t&&!!n.filter&&n.filter!=="none"}function fo(){return!/^((?!chrome|android).)*safari/i.test(uo())}const la=Math.min,nt=Math.max,Wt=Math.round;function ce(e,t,n){var r,a,o,s;t===void 0&&(t=!1),n===void 0&&(n=!1);const i=e.getBoundingClientRect();let c=1,f=1;t&&ne(e)&&(c=e.offsetWidth>0&&Wt(i.width)/e.offsetWidth||1,f=e.offsetHeight>0&&Wt(i.height)/e.offsetHeight||1);const d=$e(e)?me(e):window,u=!fo()&&n,p=(i.left+(u&&(r=(a=d.visualViewport)==null?void 0:a.offsetLeft)!=null?r:0))/c,m=(i.top+(u&&(o=(s=d.visualViewport)==null?void 0:s.offsetTop)!=null?o:0))/f,b=i.width/c,v=i.height/f;return{width:b,height:v,top:m,right:p+b,bottom:m+v,left:p,x:p,y:m}}function ge(e){return(t=e,(t instanceof me(t).Node?e.ownerDocument:e.document)||window.document).documentElement;var t}function tn(e){return $e(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.pageXOffset,scrollTop:e.pageYOffset}}function mo(e){return ce(ge(e)).left+tn(e).scrollLeft}function ol(e,t,n){const r=ne(t),a=ge(t),o=ce(e,r&&function(c){const f=ce(c);return Wt(f.width)!==c.offsetWidth||Wt(f.height)!==c.offsetHeight}(t),n==="fixed");let s={scrollLeft:0,scrollTop:0};const i={x:0,y:0};if(r||!r&&n!=="fixed")if((se(t)!=="body"||en(a))&&(s=tn(t)),ne(t)){const c=ce(t,!0);i.x=c.x+t.clientLeft,i.y=c.y+t.clientTop}else a&&(i.x=mo(a));return{x:o.left+s.scrollLeft-i.x,y:o.top+s.scrollTop-i.y,width:o.width,height:o.height}}function po(e){return se(e)==="html"?e:e.assignedSlot||e.parentNode||(pr(e)?e.host:null)||ge(e)}function ua(e){return ne(e)&&getComputedStyle(e).position!=="fixed"?e.offsetParent:null}function jn(e){const t=me(e);let n=ua(e);for(;n&&al(n)&&getComputedStyle(n).position==="static";)n=ua(n);return n&&(se(n)==="html"||se(n)==="body"&&getComputedStyle(n).position==="static"&&!ca(n))?t:n||function(r){let a=po(r);for(pr(a)&&(a=a.host);ne(a)&&!["html","body"].includes(se(a));){if(ca(a))return a;a=a.parentNode}return null}(e)||t}function fa(e){if(ne(e))return{width:e.offsetWidth,height:e.offsetHeight};const t=ce(e);return{width:t.width,height:t.height}}function vo(e){const t=po(e);return["html","body","#document"].includes(se(t))?e.ownerDocument.body:ne(t)&&en(t)?t:vo(t)}function Yt(e,t){var n;t===void 0&&(t=[]);const r=vo(e),a=r===((n=e.ownerDocument)==null?void 0:n.body),o=me(r),s=a?[o].concat(o.visualViewport||[],en(r)?r:[]):r,i=t.concat(s);return a?i:i.concat(Yt(s))}function da(e,t,n){return t==="viewport"?Ut(function(r,a){const o=me(r),s=ge(r),i=o.visualViewport;let c=s.clientWidth,f=s.clientHeight,d=0,u=0;if(i){c=i.width,f=i.height;const p=fo();(p||!p&&a==="fixed")&&(d=i.offsetLeft,u=i.offsetTop)}return{width:c,height:f,x:d,y:u}}(e,n)):$e(t)?function(r,a){const o=ce(r,!1,a==="fixed"),s=o.top+r.clientTop,i=o.left+r.clientLeft;return{top:s,left:i,x:i,y:s,right:i+r.clientWidth,bottom:s+r.clientHeight,width:r.clientWidth,height:r.clientHeight}}(t,n):Ut(function(r){var a;const o=ge(r),s=tn(r),i=(a=r.ownerDocument)==null?void 0:a.body,c=nt(o.scrollWidth,o.clientWidth,i?i.scrollWidth:0,i?i.clientWidth:0),f=nt(o.scrollHeight,o.clientHeight,i?i.scrollHeight:0,i?i.clientHeight:0);let d=-s.scrollLeft+mo(r);const u=-s.scrollTop;return vt(i||o).direction==="rtl"&&(d+=nt(o.clientWidth,i?i.clientWidth:0)-c),{width:c,height:f,x:d,y:u}}(ge(e)))}function il(e){const t=Yt(e),n=["absolute","fixed"].includes(vt(e).position)&&ne(e)?jn(e):e;return $e(n)?t.filter(r=>$e(r)&&function(a,o){const s=o.getRootNode==null?void 0:o.getRootNode();if(a.contains(o))return!0;if(s&&pr(s)){let i=o;do{if(i&&a===i)return!0;i=i.parentNode||i.host}while(i)}return!1}(r,n)&&se(r)!=="body"):[]}const sl={getClippingRect:function(e){let{element:t,boundary:n,rootBoundary:r,strategy:a}=e;const o=[...n==="clippingAncestors"?il(t):[].concat(n),r],s=o[0],i=o.reduce((c,f)=>{const d=da(t,f,a);return c.top=nt(d.top,c.top),c.right=la(d.right,c.right),c.bottom=la(d.bottom,c.bottom),c.left=nt(d.left,c.left),c},da(t,s,a));return{width:i.right-i.left,height:i.bottom-i.top,x:i.left,y:i.top}},convertOffsetParentRelativeRectToViewportRelativeRect:function(e){let{rect:t,offsetParent:n,strategy:r}=e;const a=ne(n),o=ge(n);if(n===o)return t;let s={scrollLeft:0,scrollTop:0};const i={x:0,y:0};if((a||!a&&r!=="fixed")&&((se(n)!=="body"||en(o))&&(s=tn(n)),ne(n))){const c=ce(n,!0);i.x=c.x+n.clientLeft,i.y=c.y+n.clientTop}return{...t,x:t.x-s.scrollLeft+i.x,y:t.y-s.scrollTop+i.y}},isElement:$e,getDimensions:fa,getOffsetParent:jn,getDocumentElement:ge,getElementRects:e=>{let{reference:t,floating:n,strategy:r}=e;return{reference:ol(t,jn(n),r),floating:{...fa(n),x:0,y:0}}},getClientRects:e=>Array.from(e.getClientRects()),isRTL:e=>vt(e).direction==="rtl"};function cl(e,t,n,r){r===void 0&&(r={});const{ancestorScroll:a=!0,ancestorResize:o=!0,elementResize:s=!0,animationFrame:i=!1}=r,c=a&&!i,f=o&&!i,d=c||f?[...$e(e)?Yt(e):[],...Yt(t)]:[];d.forEach(b=>{c&&b.addEventListener("scroll",n,{passive:!0}),f&&b.addEventListener("resize",n)});let u,p=null;if(s){let b=!0;p=new ResizeObserver(()=>{b||n(),b=!1}),$e(e)&&!i&&p.observe(e),p.observe(t)}let m=i?ce(e):null;return i&&function b(){const v=ce(e);!m||v.x===m.x&&v.y===m.y&&v.width===m.width&&v.height===m.height||n(),m=v,u=requestAnimationFrame(b)}(),n(),()=>{var b;d.forEach(v=>{c&&v.removeEventListener("scroll",n),f&&v.removeEventListener("resize",n)}),(b=p)==null||b.disconnect(),p=null,i&&cancelAnimationFrame(u)}}const ll=(e,t,n)=>Kc(e,t,{platform:sl,...n});var Un=typeof document<"u"?l.useLayoutEffect:l.useEffect;function Hn(e,t){if(e===t)return!0;if(typeof e!=typeof t)return!1;if(typeof e=="function"&&e.toString()===t.toString())return!0;let n,r,a;if(e&&t&&typeof e=="object"){if(Array.isArray(e)){if(n=e.length,n!=t.length)return!1;for(r=n;r--!==0;)if(!Hn(e[r],t[r]))return!1;return!0}if(a=Object.keys(e),n=a.length,n!==Object.keys(t).length)return!1;for(r=n;r--!==0;)if(!Object.prototype.hasOwnProperty.call(t,a[r]))return!1;for(r=n;r--!==0;){const o=a[r];if(!(o==="_owner"&&e.$$typeof)&&!Hn(e[o],t[o]))return!1}return!0}return e!==e&&t!==t}function ul(e){const t=l.useRef(e);return Un(()=>{t.current=e}),t}function fl(e){let{middleware:t,placement:n="bottom",strategy:r="absolute",whileElementsMounted:a}=e===void 0?{}:e;const o=l.useRef(null),s=l.useRef(null),i=ul(a),c=l.useRef(null),[f,d]=l.useState({x:null,y:null,strategy:r,placement:n,middlewareData:{}}),[u,p]=l.useState(t);Hn(u==null?void 0:u.map(w=>{let{options:x}=w;return x}),t==null?void 0:t.map(w=>{let{options:x}=w;return x}))||p(t);const m=l.useCallback(()=>{!o.current||!s.current||ll(o.current,s.current,{middleware:u,placement:n,strategy:r}).then(w=>{b.current&&qn.flushSync(()=>{d(w)})})},[u,n,r]);Un(()=>{b.current&&m()},[m]);const b=l.useRef(!1);Un(()=>(b.current=!0,()=>{b.current=!1}),[]);const v=l.useCallback(()=>{if(typeof c.current=="function"&&(c.current(),c.current=null),o.current&&s.current)if(i.current){const w=i.current(o.current,s.current,m);c.current=w}else m()},[m,i]),h=l.useCallback(w=>{o.current=w,v()},[v]),g=l.useCallback(w=>{s.current=w,v()},[v]),y=l.useMemo(()=>({reference:o,floating:s}),[]);return l.useMemo(()=>({...f,update:m,refs:y,reference:h,floating:g}),[f,m,y,h,g])}const dl=e=>{const{element:t,padding:n}=e;function r(a){return Object.prototype.hasOwnProperty.call(a,"current")}return{name:"arrow",options:e,fn(a){return r(t)?t.current!=null?aa({element:t.current,padding:n}).fn(a):{}:t?aa({element:t,padding:n}).fn(a):{}}}};function ml(e){const[t,n]=l.useState(void 0);return be(()=>{if(e){n({width:e.offsetWidth,height:e.offsetHeight});const r=new ResizeObserver(a=>{if(!Array.isArray(a)||!a.length)return;const o=a[0];let s,i;if("borderBoxSize"in o){const c=o.borderBoxSize,f=Array.isArray(c)?c[0]:c;s=f.inlineSize,i=f.blockSize}else s=e.offsetWidth,i=e.offsetHeight;n({width:s,height:i})});return r.observe(e,{box:"border-box"}),()=>r.unobserve(e)}else n(void 0)},[e]),t}const bo="Popper",[vr,go]=mt(bo),[pl,ho]=vr(bo),vl=e=>{const{__scopePopper:t,children:n}=e,[r,a]=l.useState(null);return l.createElement(pl,{scope:t,anchor:r,onAnchorChange:a},n)},bl="PopperAnchor",gl=l.forwardRef((e,t)=>{const{__scopePopper:n,virtualRef:r,...a}=e,o=ho(bl,n),s=l.useRef(null),i=X(t,s);return l.useEffect(()=>{o.onAnchorChange((r==null?void 0:r.current)||s.current)}),r?null:l.createElement(Q.div,T({},a,{ref:i}))}),Bt="PopperContent",[hl,rd]=vr(Bt),[yl,wl]=vr(Bt,{hasParent:!1,positionUpdateFns:new Set}),xl=l.forwardRef((e,t)=>{var n,r,a,o,s,i,c,f;const{__scopePopper:d,side:u="bottom",sideOffset:p=0,align:m="center",alignOffset:b=0,arrowPadding:v=0,collisionBoundary:h=[],collisionPadding:g=0,sticky:y="partial",hideWhenDetached:w=!1,avoidCollisions:x=!0,onPlaced:k,...R}=e,S=ho(Bt,d),[C,O]=l.useState(null),D=X(t,Le=>O(Le)),[W,V]=l.useState(null),j=ml(W),re=(n=j==null?void 0:j.width)!==null&&n!==void 0?n:0,K=(r=j==null?void 0:j.height)!==null&&r!==void 0?r:0,an=u+(m!=="center"?"-"+m:""),on=typeof g=="number"?g:{top:0,right:0,bottom:0,left:0,...g},ae=Array.isArray(h)?h:[h],A=ae.length>0,L={padding:on,boundary:ae.filter(El),altBoundary:A},{reference:Y,floating:oe,strategy:Ee,x:_e,y:Xe,placement:Me,middlewareData:G,update:Ne}=fl({strategy:"fixed",placement:an,whileElementsMounted:cl,middleware:[kl(),el({mainAxis:p+K,alignmentAxis:b}),x?tl({mainAxis:!0,crossAxis:!1,limiter:y==="partial"?nl():void 0,...L}):void 0,W?dl({element:W,padding:v}):void 0,x?Zc({...L}):void 0,rl({...L,apply:({elements:Le,availableWidth:Ko,availableHeight:Go})=>{Le.floating.style.setProperty("--radix-popper-available-width",`${Ko}px`),Le.floating.style.setProperty("--radix-popper-available-height",`${Go}px`)}}),Cl({arrowWidth:re,arrowHeight:K}),w?Jc({strategy:"referenceHidden"}):void 0].filter($l)});be(()=>{Y(S.anchor)},[Y,S.anchor]);const U=_e!==null&&Xe!==null,[qe,jo]=yo(Me),gt=te(k);be(()=>{U&&(gt==null||gt())},[U,gt]);const Uo=(a=G.arrow)===null||a===void 0?void 0:a.x,Ho=(o=G.arrow)===null||o===void 0?void 0:o.y,Wo=((s=G.arrow)===null||s===void 0?void 0:s.centerOffset)!==0,[Yo,Bo]=l.useState();be(()=>{C&&Bo(window.getComputedStyle(C).zIndex)},[C]);const{hasParent:Vo,positionUpdateFns:De}=wl(Bt,d),Qe=!Vo;l.useLayoutEffect(()=>{if(!Qe)return De.add(Ne),()=>{De.delete(Ne)}},[Qe,De,Ne]),be(()=>{Qe&&U&&Array.from(De).reverse().forEach(Le=>requestAnimationFrame(Le))},[Qe,U,De]);const wr={"data-side":qe,"data-align":jo,...R,ref:D,style:{...R.style,animation:U?void 0:"none",opacity:(i=G.hide)!==null&&i!==void 0&&i.referenceHidden?0:void 0}};return l.createElement("div",{ref:oe,"data-radix-popper-content-wrapper":"",style:{position:Ee,left:0,top:0,transform:U?`translate3d(${Math.round(_e)}px, ${Math.round(Xe)}px, 0)`:"translate3d(0, -200%, 0)",minWidth:"max-content",zIndex:Yo,["--radix-popper-transform-origin"]:[(c=G.transformOrigin)===null||c===void 0?void 0:c.x,(f=G.transformOrigin)===null||f===void 0?void 0:f.y].join(" ")},dir:e.dir},l.createElement(hl,{scope:d,placedSide:qe,onArrowChange:V,arrowX:Uo,arrowY:Ho,shouldHideArrow:Wo},Qe?l.createElement(yl,{scope:d,hasParent:!0,positionUpdateFns:De},l.createElement(Q.div,wr)):l.createElement(Q.div,wr)))});function $l(e){return e!==void 0}function El(e){return e!==null}const kl=()=>({name:"anchorCssProperties",fn(e){const{rects:t,elements:n}=e,{width:r,height:a}=t.reference;return n.floating.style.setProperty("--radix-popper-anchor-width",`${r}px`),n.floating.style.setProperty("--radix-popper-anchor-height",`${a}px`),{}}}),Cl=e=>({name:"transformOrigin",options:e,fn(t){var n,r,a,o,s;const{placement:i,rects:c,middlewareData:f}=t,u=((n=f.arrow)===null||n===void 0?void 0:n.centerOffset)!==0,p=u?0:e.arrowWidth,m=u?0:e.arrowHeight,[b,v]=yo(i),h={start:"0%",center:"50%",end:"100%"}[v],g=((r=(a=f.arrow)===null||a===void 0?void 0:a.x)!==null&&r!==void 0?r:0)+p/2,y=((o=(s=f.arrow)===null||s===void 0?void 0:s.y)!==null&&o!==void 0?o:0)+m/2;let w="",x="";return b==="bottom"?(w=u?h:`${g}px`,x=`${-m}px`):b==="top"?(w=u?h:`${g}px`,x=`${c.floating.height+m}px`):b==="right"?(w=`${-m}px`,x=u?h:`${y}px`):b==="left"&&(w=`${c.floating.width+m}px`,x=u?h:`${y}px`),{data:{x:w,y:x}}}});function yo(e){const[t,n="center"]=e.split("-");return[t,n]}const Sl=vl,Al=gl,Pl=xl,Ol=l.forwardRef((e,t)=>{var n;const{container:r=globalThis==null||(n=globalThis.document)===null||n===void 0?void 0:n.body,...a}=e;return r?qo.createPortal(l.createElement(Q.div,T({},a,{ref:t})),r):null});function Rl(e,t){return l.useReducer((n,r)=>{const a=t[n][r];return a??n},e)}const br=e=>{const{present:t,children:n}=e,r=Il(t),a=typeof n=="function"?n({present:r.isPresent}):l.Children.only(n),o=X(r.ref,a.ref);return typeof n=="function"||r.isPresent?l.cloneElement(a,{ref:o}):null};br.displayName="Presence";function Il(e){const[t,n]=l.useState(),r=l.useRef({}),a=l.useRef(e),o=l.useRef("none"),s=e?"mounted":"unmounted",[i,c]=Rl(s,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return l.useEffect(()=>{const f=Pt(r.current);o.current=i==="mounted"?f:"none"},[i]),be(()=>{const f=r.current,d=a.current;if(d!==e){const p=o.current,m=Pt(f);e?c("MOUNT"):m==="none"||(f==null?void 0:f.display)==="none"?c("UNMOUNT"):c(d&&p!==m?"ANIMATION_OUT":"UNMOUNT"),a.current=e}},[e,c]),be(()=>{if(t){const f=u=>{const m=Pt(r.current).includes(u.animationName);u.target===t&&m&&qn.flushSync(()=>c("ANIMATION_END"))},d=u=>{u.target===t&&(o.current=Pt(r.current))};return t.addEventListener("animationstart",d),t.addEventListener("animationcancel",f),t.addEventListener("animationend",f),()=>{t.removeEventListener("animationstart",d),t.removeEventListener("animationcancel",f),t.removeEventListener("animationend",f)}}else c("ANIMATION_END")},[t,c]),{isPresent:["mounted","unmountSuspended"].includes(i),ref:l.useCallback(f=>{f&&(r.current=getComputedStyle(f)),n(f)},[])}}function Pt(e){return(e==null?void 0:e.animationName)||"none"}const bn="rovingFocusGroup.onEntryFocus",Tl={bubbles:!1,cancelable:!0},gr="RovingFocusGroup",[Wn,wo,_l]=no(gr),[Ml,xo]=mt(gr,[_l]),[Nl,Dl]=Ml(gr),Ll=l.forwardRef((e,t)=>l.createElement(Wn.Provider,{scope:e.__scopeRovingFocusGroup},l.createElement(Wn.Slot,{scope:e.__scopeRovingFocusGroup},l.createElement(Fl,T({},e,{ref:t}))))),Fl=l.forwardRef((e,t)=>{const{__scopeRovingFocusGroup:n,orientation:r,loop:a=!1,dir:o,currentTabStopId:s,defaultCurrentTabStopId:i,onCurrentTabStopIdChange:c,onEntryFocus:f,...d}=e,u=l.useRef(null),p=X(t,u),m=ro(o),[b=null,v]=eo({prop:s,defaultProp:i,onChange:c}),[h,g]=l.useState(!1),y=te(f),w=wo(n),x=l.useRef(!1),[k,R]=l.useState(0);return l.useEffect(()=>{const S=u.current;if(S)return S.addEventListener(bn,y),()=>S.removeEventListener(bn,y)},[y]),l.createElement(Nl,{scope:n,orientation:r,dir:m,loop:a,currentTabStopId:b,onItemFocus:l.useCallback(S=>v(S),[v]),onItemShiftTab:l.useCallback(()=>g(!0),[]),onFocusableItemAdd:l.useCallback(()=>R(S=>S+1),[]),onFocusableItemRemove:l.useCallback(()=>R(S=>S-1),[])},l.createElement(Q.div,T({tabIndex:h||k===0?-1:0,"data-orientation":r},d,{ref:p,style:{outline:"none",...e.style},onMouseDown:_(e.onMouseDown,()=>{x.current=!0}),onFocus:_(e.onFocus,S=>{const C=!x.current;if(S.target===S.currentTarget&&C&&!h){const O=new CustomEvent(bn,Tl);if(S.currentTarget.dispatchEvent(O),!O.defaultPrevented){const D=w().filter(K=>K.focusable),W=D.find(K=>K.active),V=D.find(K=>K.id===b),re=[W,V,...D].filter(Boolean).map(K=>K.ref.current);$o(re)}}x.current=!1}),onBlur:_(e.onBlur,()=>g(!1))})))}),zl="RovingFocusGroupItem",jl=l.forwardRef((e,t)=>{const{__scopeRovingFocusGroup:n,focusable:r=!0,active:a=!1,tabStopId:o,...s}=e,i=Fn(),c=o||i,f=Dl(zl,n),d=f.currentTabStopId===c,u=wo(n),{onFocusableItemAdd:p,onFocusableItemRemove:m}=f;return l.useEffect(()=>{if(r)return p(),()=>m()},[r,p,m]),l.createElement(Wn.ItemSlot,{scope:n,id:c,focusable:r,active:a},l.createElement(Q.span,T({tabIndex:d?0:-1,"data-orientation":f.orientation},s,{ref:t,onMouseDown:_(e.onMouseDown,b=>{r?f.onItemFocus(c):b.preventDefault()}),onFocus:_(e.onFocus,()=>f.onItemFocus(c)),onKeyDown:_(e.onKeyDown,b=>{if(b.key==="Tab"&&b.shiftKey){f.onItemShiftTab();return}if(b.target!==b.currentTarget)return;const v=Wl(b,f.orientation,f.dir);if(v!==void 0){b.preventDefault();let g=u().filter(y=>y.focusable).map(y=>y.ref.current);if(v==="last")g.reverse();else if(v==="prev"||v==="next"){v==="prev"&&g.reverse();const y=g.indexOf(b.currentTarget);g=f.loop?Yl(g,y+1):g.slice(y+1)}setTimeout(()=>$o(g))}})})))}),Ul={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function Hl(e,t){return t!=="rtl"?e:e==="ArrowLeft"?"ArrowRight":e==="ArrowRight"?"ArrowLeft":e}function Wl(e,t,n){const r=Hl(e.key,n);if(!(t==="vertical"&&["ArrowLeft","ArrowRight"].includes(r))&&!(t==="horizontal"&&["ArrowUp","ArrowDown"].includes(r)))return Ul[r]}function $o(e){const t=document.activeElement;for(const n of e)if(n===t||(n.focus(),document.activeElement!==t))return}function Yl(e,t){return e.map((n,r)=>e[(t+r)%e.length])}const Bl=Ll,Vl=jl;var Kl=function(e){if(typeof document>"u")return null;var t=Array.isArray(e)?e[0]:e;return t.ownerDocument.body},Fe=new WeakMap,Ot=new WeakMap,Rt={},gn=0,Eo=function(e){return e&&(e.host||Eo(e.parentNode))},Gl=function(e,t){return t.map(function(n){if(e.contains(n))return n;var r=Eo(n);return r&&e.contains(r)?r:(console.error("aria-hidden",n,"in not contained inside",e,". Doing nothing"),null)}).filter(function(n){return Boolean(n)})},Xl=function(e,t,n,r){var a=Gl(t,Array.isArray(e)?e:[e]);Rt[n]||(Rt[n]=new WeakMap);var o=Rt[n],s=[],i=new Set,c=new Set(a),f=function(u){!u||i.has(u)||(i.add(u),f(u.parentNode))};a.forEach(f);var d=function(u){!u||c.has(u)||Array.prototype.forEach.call(u.children,function(p){if(i.has(p))d(p);else{var m=p.getAttribute(r),b=m!==null&&m!=="false",v=(Fe.get(p)||0)+1,h=(o.get(p)||0)+1;Fe.set(p,v),o.set(p,h),s.push(p),v===1&&b&&Ot.set(p,!0),h===1&&p.setAttribute(n,"true"),b||p.setAttribute(r,"true")}})};return d(t),i.clear(),gn++,function(){s.forEach(function(u){var p=Fe.get(u)-1,m=o.get(u)-1;Fe.set(u,p),o.set(u,m),p||(Ot.has(u)||u.removeAttribute(r),Ot.delete(u)),m||u.removeAttribute(n)}),gn--,gn||(Fe=new WeakMap,Fe=new WeakMap,Ot=new WeakMap,Rt={})}},ql=function(e,t,n){n===void 0&&(n="data-aria-hidden");var r=Array.from(Array.isArray(e)?e:[e]),a=t||Kl(e);return a?(r.push.apply(r,Array.from(a.querySelectorAll("[aria-live]"))),Xl(r,a,n,"aria-hidden")):function(){return null}},Z=function(){return Z=Object.assign||function(t){for(var n,r=1,a=arguments.length;r<a;r++){n=arguments[r];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},Z.apply(this,arguments)};function ko(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]]);return n}function Ql(e,t,n){if(n||arguments.length===2)for(var r=0,a=t.length,o;r<a;r++)(o||!(r in t))&&(o||(o=Array.prototype.slice.call(t,0,r)),o[r]=t[r]);return e.concat(o||Array.prototype.slice.call(t))}var Nt="right-scroll-bar-position",Dt="width-before-scroll-bar",Zl="with-scroll-bars-hidden",Jl="--removed-body-scroll-bar-size";function eu(e,t){return typeof e=="function"?e(t):e&&(e.current=t),e}function tu(e,t){var n=l.useState(function(){return{value:e,callback:t,facade:{get current(){return n.value},set current(r){var a=n.value;a!==r&&(n.value=r,n.callback(r,a))}}}})[0];return n.callback=t,n.facade}function nu(e,t){return tu(t||null,function(n){return e.forEach(function(r){return eu(r,n)})})}function ru(e){return e}function au(e,t){t===void 0&&(t=ru);var n=[],r=!1,a={read:function(){if(r)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return n.length?n[n.length-1]:e},useMedium:function(o){var s=t(o,r);return n.push(s),function(){n=n.filter(function(i){return i!==s})}},assignSyncMedium:function(o){for(r=!0;n.length;){var s=n;n=[],s.forEach(o)}n={push:function(i){return o(i)},filter:function(){return n}}},assignMedium:function(o){r=!0;var s=[];if(n.length){var i=n;n=[],i.forEach(o),s=n}var c=function(){var d=s;s=[],d.forEach(o)},f=function(){return Promise.resolve().then(c)};f(),n={push:function(d){s.push(d),f()},filter:function(d){return s=s.filter(d),n}}}};return a}function ou(e){e===void 0&&(e={});var t=au(null);return t.options=Z({async:!0,ssr:!1},e),t}var Co=function(e){var t=e.sideCar,n=ko(e,["sideCar"]);if(!t)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var r=t.read();if(!r)throw new Error("Sidecar medium not found");return l.createElement(r,Z({},n))};Co.isSideCarExport=!0;function iu(e,t){return e.useMedium(t),Co}var So=ou(),hn=function(){},nn=l.forwardRef(function(e,t){var n=l.useRef(null),r=l.useState({onScrollCapture:hn,onWheelCapture:hn,onTouchMoveCapture:hn}),a=r[0],o=r[1],s=e.forwardProps,i=e.children,c=e.className,f=e.removeScrollBar,d=e.enabled,u=e.shards,p=e.sideCar,m=e.noIsolation,b=e.inert,v=e.allowPinchZoom,h=e.as,g=h===void 0?"div":h,y=ko(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noIsolation","inert","allowPinchZoom","as"]),w=p,x=nu([n,t]),k=Z(Z({},y),a);return l.createElement(l.Fragment,null,d&&l.createElement(w,{sideCar:So,removeScrollBar:f,shards:u,noIsolation:m,inert:b,setCallbacks:o,allowPinchZoom:!!v,lockRef:n}),s?l.cloneElement(l.Children.only(i),Z(Z({},k),{ref:x})):l.createElement(g,Z({},k,{className:c,ref:x}),i))});nn.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};nn.classNames={fullWidth:Dt,zeroRight:Nt};var su=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function cu(){if(!document)return null;var e=document.createElement("style");e.type="text/css";var t=su();return t&&e.setAttribute("nonce",t),e}function lu(e,t){e.styleSheet?e.styleSheet.cssText=t:e.appendChild(document.createTextNode(t))}function uu(e){var t=document.head||document.getElementsByTagName("head")[0];t.appendChild(e)}var fu=function(){var e=0,t=null;return{add:function(n){e==0&&(t=cu())&&(lu(t,n),uu(t)),e++},remove:function(){e--,!e&&t&&(t.parentNode&&t.parentNode.removeChild(t),t=null)}}},du=function(){var e=fu();return function(t,n){l.useEffect(function(){return e.add(t),function(){e.remove()}},[t&&n])}},Ao=function(){var e=du(),t=function(n){var r=n.styles,a=n.dynamic;return e(r,a),null};return t},mu={left:0,top:0,right:0,gap:0},yn=function(e){return parseInt(e||"",10)||0},pu=function(e){var t=window.getComputedStyle(document.body),n=t[e==="padding"?"paddingLeft":"marginLeft"],r=t[e==="padding"?"paddingTop":"marginTop"],a=t[e==="padding"?"paddingRight":"marginRight"];return[yn(n),yn(r),yn(a)]},vu=function(e){if(e===void 0&&(e="margin"),typeof window>"u")return mu;var t=pu(e),n=document.documentElement.clientWidth,r=window.innerWidth;return{left:t[0],top:t[1],right:t[2],gap:Math.max(0,r-n+t[2]-t[0])}},bu=Ao(),gu=function(e,t,n,r){var a=e.left,o=e.top,s=e.right,i=e.gap;return n===void 0&&(n="margin"),`
  .`.concat(Zl,` {
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
    `).concat(Jl,": ").concat(i,`px;
  }
`)},hu=function(e){var t=e.noRelative,n=e.noImportant,r=e.gapMode,a=r===void 0?"margin":r,o=l.useMemo(function(){return vu(a)},[a]);return l.createElement(bu,{styles:gu(o,!t,a,n?"":"!important")})},Yn=!1;if(typeof window<"u")try{var It=Object.defineProperty({},"passive",{get:function(){return Yn=!0,!0}});window.addEventListener("test",It,It),window.removeEventListener("test",It,It)}catch{Yn=!1}var ze=Yn?{passive:!1}:!1,yu=function(e){return e.tagName==="TEXTAREA"},Po=function(e,t){var n=window.getComputedStyle(e);return n[t]!=="hidden"&&!(n.overflowY===n.overflowX&&!yu(e)&&n[t]==="visible")},wu=function(e){return Po(e,"overflowY")},xu=function(e){return Po(e,"overflowX")},ma=function(e,t){var n=t;do{typeof ShadowRoot<"u"&&n instanceof ShadowRoot&&(n=n.host);var r=Oo(e,n);if(r){var a=Ro(e,n),o=a[1],s=a[2];if(o>s)return!0}n=n.parentNode}while(n&&n!==document.body);return!1},$u=function(e){var t=e.scrollTop,n=e.scrollHeight,r=e.clientHeight;return[t,n,r]},Eu=function(e){var t=e.scrollLeft,n=e.scrollWidth,r=e.clientWidth;return[t,n,r]},Oo=function(e,t){return e==="v"?wu(t):xu(t)},Ro=function(e,t){return e==="v"?$u(t):Eu(t)},ku=function(e,t){return e==="h"&&t==="rtl"?-1:1},Cu=function(e,t,n,r,a){var o=ku(e,window.getComputedStyle(t).direction),s=o*r,i=n.target,c=t.contains(i),f=!1,d=s>0,u=0,p=0;do{var m=Ro(e,i),b=m[0],v=m[1],h=m[2],g=v-h-o*b;(b||g)&&Oo(e,i)&&(u+=g,p+=b),i=i.parentNode}while(!c&&i!==document.body||c&&(t.contains(i)||t===i));return(d&&(a&&u===0||!a&&s>u)||!d&&(a&&p===0||!a&&-s>p))&&(f=!0),f},Tt=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},pa=function(e){return[e.deltaX,e.deltaY]},va=function(e){return e&&"current"in e?e.current:e},Su=function(e,t){return e[0]===t[0]&&e[1]===t[1]},Au=function(e){return`
  .block-interactivity-`.concat(e,` {pointer-events: none;}
  .allow-interactivity-`).concat(e,` {pointer-events: all;}
`)},Pu=0,je=[];function Ou(e){var t=l.useRef([]),n=l.useRef([0,0]),r=l.useRef(),a=l.useState(Pu++)[0],o=l.useState(function(){return Ao()})[0],s=l.useRef(e);l.useEffect(function(){s.current=e},[e]),l.useEffect(function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(a));var v=Ql([e.lockRef.current],(e.shards||[]).map(va),!0).filter(Boolean);return v.forEach(function(h){return h.classList.add("allow-interactivity-".concat(a))}),function(){document.body.classList.remove("block-interactivity-".concat(a)),v.forEach(function(h){return h.classList.remove("allow-interactivity-".concat(a))})}}},[e.inert,e.lockRef.current,e.shards]);var i=l.useCallback(function(v,h){if("touches"in v&&v.touches.length===2)return!s.current.allowPinchZoom;var g=Tt(v),y=n.current,w="deltaX"in v?v.deltaX:y[0]-g[0],x="deltaY"in v?v.deltaY:y[1]-g[1],k,R=v.target,S=Math.abs(w)>Math.abs(x)?"h":"v";if("touches"in v&&S==="h"&&R.type==="range")return!1;var C=ma(S,R);if(!C)return!0;if(C?k=S:(k=S==="v"?"h":"v",C=ma(S,R)),!C)return!1;if(!r.current&&"changedTouches"in v&&(w||x)&&(r.current=k),!k)return!0;var O=r.current||k;return Cu(O,h,v,O==="h"?w:x,!0)},[]),c=l.useCallback(function(v){var h=v;if(!(!je.length||je[je.length-1]!==o)){var g="deltaY"in h?pa(h):Tt(h),y=t.current.filter(function(k){return k.name===h.type&&k.target===h.target&&Su(k.delta,g)})[0];if(y&&y.should){h.cancelable&&h.preventDefault();return}if(!y){var w=(s.current.shards||[]).map(va).filter(Boolean).filter(function(k){return k.contains(h.target)}),x=w.length>0?i(h,w[0]):!s.current.noIsolation;x&&h.cancelable&&h.preventDefault()}}},[]),f=l.useCallback(function(v,h,g,y){var w={name:v,delta:h,target:g,should:y};t.current.push(w),setTimeout(function(){t.current=t.current.filter(function(x){return x!==w})},1)},[]),d=l.useCallback(function(v){n.current=Tt(v),r.current=void 0},[]),u=l.useCallback(function(v){f(v.type,pa(v),v.target,i(v,e.lockRef.current))},[]),p=l.useCallback(function(v){f(v.type,Tt(v),v.target,i(v,e.lockRef.current))},[]);l.useEffect(function(){return je.push(o),e.setCallbacks({onScrollCapture:u,onWheelCapture:u,onTouchMoveCapture:p}),document.addEventListener("wheel",c,ze),document.addEventListener("touchmove",c,ze),document.addEventListener("touchstart",d,ze),function(){je=je.filter(function(v){return v!==o}),document.removeEventListener("wheel",c,ze),document.removeEventListener("touchmove",c,ze),document.removeEventListener("touchstart",d,ze)}},[]);var m=e.removeScrollBar,b=e.inert;return l.createElement(l.Fragment,null,b?l.createElement(o,{styles:Au(a)}):null,m?l.createElement(hu,{gapMode:"margin"}):null)}const Ru=iu(So,Ou);var Io=l.forwardRef(function(e,t){return l.createElement(nn,Z({},e,{ref:t,sideCar:Ru}))});Io.classNames=nn.classNames;const Iu=Io,Tu=["Enter"," "],_u=["ArrowDown","PageUp","Home"],To=["ArrowUp","PageDown","End"],Mu=[..._u,...To],rn="Menu",[Bn,Nu,Du]=no(rn),[Te,_o]=mt(rn,[Du,go,xo]),hr=go(),Mo=xo(),[Lu,bt]=Te(rn),[Fu,yr]=Te(rn),zu=e=>{const{__scopeMenu:t,open:n=!1,children:r,dir:a,onOpenChange:o,modal:s=!0}=e,i=hr(t),[c,f]=l.useState(null),d=l.useRef(!1),u=te(o),p=ro(a);return l.useEffect(()=>{const m=()=>{d.current=!0,document.addEventListener("pointerdown",b,{capture:!0,once:!0}),document.addEventListener("pointermove",b,{capture:!0,once:!0})},b=()=>d.current=!1;return document.addEventListener("keydown",m,{capture:!0}),()=>{document.removeEventListener("keydown",m,{capture:!0}),document.removeEventListener("pointerdown",b,{capture:!0}),document.removeEventListener("pointermove",b,{capture:!0})}},[]),l.createElement(Sl,i,l.createElement(Lu,{scope:t,open:n,onOpenChange:u,content:c,onContentChange:f},l.createElement(Fu,{scope:t,onClose:l.useCallback(()=>u(!1),[u]),isUsingKeyboardRef:d,dir:p,modal:s},r)))},ju=l.forwardRef((e,t)=>{const{__scopeMenu:n,...r}=e,a=hr(n);return l.createElement(Al,T({},a,r,{ref:t}))}),No="MenuPortal",[Uu,Hu]=Te(No,{forceMount:void 0}),Wu=e=>{const{__scopeMenu:t,forceMount:n,children:r,container:a}=e,o=bt(No,t);return l.createElement(Uu,{scope:t,forceMount:n},l.createElement(br,{present:n||o.open},l.createElement(Ol,{asChild:!0,container:a},r)))},he="MenuContent",[Yu,Do]=Te(he),Bu=l.forwardRef((e,t)=>{const n=Hu(he,e.__scopeMenu),{forceMount:r=n.forceMount,...a}=e,o=bt(he,e.__scopeMenu),s=yr(he,e.__scopeMenu);return l.createElement(Bn.Provider,{scope:e.__scopeMenu},l.createElement(br,{present:r||o.open},l.createElement(Bn.Slot,{scope:e.__scopeMenu},s.modal?l.createElement(Vu,T({},a,{ref:t})):l.createElement(Ku,T({},a,{ref:t})))))}),Vu=l.forwardRef((e,t)=>{const n=bt(he,e.__scopeMenu),r=l.useRef(null),a=X(t,r);return l.useEffect(()=>{const o=r.current;if(o)return ql(o)},[]),l.createElement(Lo,T({},e,{ref:a,trapFocus:n.open,disableOutsidePointerEvents:n.open,disableOutsideScroll:!0,onFocusOutside:_(e.onFocusOutside,o=>o.preventDefault(),{checkForDefaultPrevented:!1}),onDismiss:()=>n.onOpenChange(!1)}))}),Ku=l.forwardRef((e,t)=>{const n=bt(he,e.__scopeMenu);return l.createElement(Lo,T({},e,{ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,disableOutsideScroll:!1,onDismiss:()=>n.onOpenChange(!1)}))}),Lo=l.forwardRef((e,t)=>{const{__scopeMenu:n,loop:r=!1,trapFocus:a,onOpenAutoFocus:o,onCloseAutoFocus:s,disableOutsidePointerEvents:i,onEntryFocus:c,onEscapeKeyDown:f,onPointerDownOutside:d,onFocusOutside:u,onInteractOutside:p,onDismiss:m,disableOutsideScroll:b,...v}=e,h=bt(he,n),g=yr(he,n),y=hr(n),w=Mo(n),x=Nu(n),[k,R]=l.useState(null),S=l.useRef(null),C=X(t,S,h.onContentChange),O=l.useRef(0),D=l.useRef(""),W=l.useRef(0),V=l.useRef(null),j=l.useRef("right"),re=l.useRef(0),K=b?Iu:l.Fragment,an=b?{as:ct,allowPinchZoom:!0}:void 0,on=A=>{var L,Y;const oe=D.current+A,Ee=x().filter(U=>!U.disabled),_e=document.activeElement,Xe=(L=Ee.find(U=>U.ref.current===_e))===null||L===void 0?void 0:L.textValue,Me=Ee.map(U=>U.textValue),G=rf(Me,oe,Xe),Ne=(Y=Ee.find(U=>U.textValue===G))===null||Y===void 0?void 0:Y.ref.current;(function U(qe){D.current=qe,window.clearTimeout(O.current),qe!==""&&(O.current=window.setTimeout(()=>U(""),1e3))})(oe),Ne&&setTimeout(()=>Ne.focus())};l.useEffect(()=>()=>window.clearTimeout(O.current),[]),Lc();const ae=l.useCallback(A=>{var L,Y;return j.current===((L=V.current)===null||L===void 0?void 0:L.side)&&of(A,(Y=V.current)===null||Y===void 0?void 0:Y.area)},[]);return l.createElement(Yu,{scope:n,searchRef:D,onItemEnter:l.useCallback(A=>{ae(A)&&A.preventDefault()},[ae]),onItemLeave:l.useCallback(A=>{var L;ae(A)||((L=S.current)===null||L===void 0||L.focus(),R(null))},[ae]),onTriggerLeave:l.useCallback(A=>{ae(A)&&A.preventDefault()},[ae]),pointerGraceTimerRef:W,onPointerGraceIntentChange:l.useCallback(A=>{V.current=A},[])},l.createElement(K,an,l.createElement(Fc,{asChild:!0,trapped:a,onMountAutoFocus:_(o,A=>{var L;A.preventDefault(),(L=S.current)===null||L===void 0||L.focus()}),onUnmountAutoFocus:s},l.createElement(Mc,{asChild:!0,disableOutsidePointerEvents:i,onEscapeKeyDown:f,onPointerDownOutside:d,onFocusOutside:u,onInteractOutside:p,onDismiss:m},l.createElement(Bl,T({asChild:!0},w,{dir:g.dir,orientation:"vertical",loop:r,currentTabStopId:k,onCurrentTabStopIdChange:R,onEntryFocus:_(c,A=>{g.isUsingKeyboardRef.current||A.preventDefault()})}),l.createElement(Pl,T({role:"menu","aria-orientation":"vertical","data-state":ef(h.open),"data-radix-menu-content":"",dir:g.dir},y,v,{ref:C,style:{outline:"none",...v.style},onKeyDown:_(v.onKeyDown,A=>{const Y=A.target.closest("[data-radix-menu-content]")===A.currentTarget,oe=A.ctrlKey||A.altKey||A.metaKey,Ee=A.key.length===1;Y&&(A.key==="Tab"&&A.preventDefault(),!oe&&Ee&&on(A.key));const _e=S.current;if(A.target!==_e||!Mu.includes(A.key))return;A.preventDefault();const Me=x().filter(G=>!G.disabled).map(G=>G.ref.current);To.includes(A.key)&&Me.reverse(),tf(Me)}),onBlur:_(e.onBlur,A=>{A.currentTarget.contains(A.target)||(window.clearTimeout(O.current),D.current="")}),onPointerMove:_(e.onPointerMove,Kn(A=>{const L=A.target,Y=re.current!==A.clientX;if(A.currentTarget.contains(L)&&Y){const oe=A.clientX>re.current?"right":"left";j.current=oe,re.current=A.clientX}}))})))))))}),Vn="MenuItem",ba="menu.itemSelect",Gu=l.forwardRef((e,t)=>{const{disabled:n=!1,onSelect:r,...a}=e,o=l.useRef(null),s=yr(Vn,e.__scopeMenu),i=Do(Vn,e.__scopeMenu),c=X(t,o),f=l.useRef(!1),d=()=>{const u=o.current;if(!n&&u){const p=new CustomEvent(ba,{bubbles:!0,cancelable:!0});u.addEventListener(ba,m=>r==null?void 0:r(m),{once:!0}),to(u,p),p.defaultPrevented?f.current=!1:s.onClose()}};return l.createElement(Xu,T({},a,{ref:c,disabled:n,onClick:_(e.onClick,d),onPointerDown:u=>{var p;(p=e.onPointerDown)===null||p===void 0||p.call(e,u),f.current=!0},onPointerUp:_(e.onPointerUp,u=>{var p;f.current||(p=u.currentTarget)===null||p===void 0||p.click()}),onKeyDown:_(e.onKeyDown,u=>{const p=i.searchRef.current!=="";n||p&&u.key===" "||Tu.includes(u.key)&&(u.currentTarget.click(),u.preventDefault())})}))}),Xu=l.forwardRef((e,t)=>{const{__scopeMenu:n,disabled:r=!1,textValue:a,...o}=e,s=Do(Vn,n),i=Mo(n),c=l.useRef(null),f=X(t,c),[d,u]=l.useState(!1),[p,m]=l.useState("");return l.useEffect(()=>{const b=c.current;if(b){var v;m(((v=b.textContent)!==null&&v!==void 0?v:"").trim())}},[o.children]),l.createElement(Bn.ItemSlot,{scope:n,disabled:r,textValue:a??p},l.createElement(Vl,T({asChild:!0},i,{focusable:!r}),l.createElement(Q.div,T({role:"menuitem","data-highlighted":d?"":void 0,"aria-disabled":r||void 0,"data-disabled":r?"":void 0},o,{ref:f,onPointerMove:_(e.onPointerMove,Kn(b=>{r?s.onItemLeave(b):(s.onItemEnter(b),b.defaultPrevented||b.currentTarget.focus())})),onPointerLeave:_(e.onPointerLeave,Kn(b=>s.onItemLeave(b))),onFocus:_(e.onFocus,()=>u(!0)),onBlur:_(e.onBlur,()=>u(!1))}))))}),qu="MenuRadioGroup";Te(qu,{value:void 0,onValueChange:()=>{}});const Qu="MenuItemIndicator";Te(Qu,{checked:!1});const Zu=l.forwardRef((e,t)=>{const{__scopeMenu:n,...r}=e;return l.createElement(Q.div,T({role:"separator","aria-orientation":"horizontal"},r,{ref:t}))}),Ju="MenuSub";Te(Ju);function ef(e){return e?"open":"closed"}function tf(e){const t=document.activeElement;for(const n of e)if(n===t||(n.focus(),document.activeElement!==t))return}function nf(e,t){return e.map((n,r)=>e[(t+r)%e.length])}function rf(e,t,n){const a=t.length>1&&Array.from(t).every(f=>f===t[0])?t[0]:t,o=n?e.indexOf(n):-1;let s=nf(e,Math.max(o,0));a.length===1&&(s=s.filter(f=>f!==n));const c=s.find(f=>f.toLowerCase().startsWith(a.toLowerCase()));return c!==n?c:void 0}function af(e,t){const{x:n,y:r}=e;let a=!1;for(let o=0,s=t.length-1;o<t.length;s=o++){const i=t[o].x,c=t[o].y,f=t[s].x,d=t[s].y;c>r!=d>r&&n<(f-i)*(r-c)/(d-c)+i&&(a=!a)}return a}function of(e,t){if(!t)return!1;const n={x:e.clientX,y:e.clientY};return af(n,t)}function Kn(e){return t=>t.pointerType==="mouse"?e(t):void 0}const sf=zu,cf=ju,lf=Wu,uf=Bu,ff=Gu,df=Zu,Fo="DropdownMenu",[mf,ad]=mt(Fo,[_o]),Ge=_o(),[pf,zo]=mf(Fo),vf=e=>{const{__scopeDropdownMenu:t,children:n,dir:r,open:a,defaultOpen:o,onOpenChange:s,modal:i=!0}=e,c=Ge(t),f=l.useRef(null),[d=!1,u]=eo({prop:a,defaultProp:o,onChange:s});return l.createElement(pf,{scope:t,triggerId:Fn(),triggerRef:f,contentId:Fn(),open:d,onOpenChange:u,onOpenToggle:l.useCallback(()=>u(p=>!p),[u]),modal:i},l.createElement(sf,T({},c,{open:d,onOpenChange:u,dir:r,modal:i}),n))},bf="DropdownMenuTrigger",gf=l.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,disabled:r=!1,...a}=e,o=zo(bf,n),s=Ge(n);return l.createElement(cf,T({asChild:!0},s),l.createElement(Q.button,T({type:"button",id:o.triggerId,"aria-haspopup":"menu","aria-expanded":o.open,"aria-controls":o.open?o.contentId:void 0,"data-state":o.open?"open":"closed","data-disabled":r?"":void 0,disabled:r},a,{ref:dr(t,o.triggerRef),onPointerDown:_(e.onPointerDown,i=>{!r&&i.button===0&&i.ctrlKey===!1&&(o.onOpenToggle(),o.open||i.preventDefault())}),onKeyDown:_(e.onKeyDown,i=>{r||(["Enter"," "].includes(i.key)&&o.onOpenToggle(),i.key==="ArrowDown"&&o.onOpenChange(!0),["Enter"," ","ArrowDown"].includes(i.key)&&i.preventDefault())})})))}),hf=e=>{const{__scopeDropdownMenu:t,...n}=e,r=Ge(t);return l.createElement(lf,T({},r,n))},yf="DropdownMenuContent",wf=l.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...r}=e,a=zo(yf,n),o=Ge(n),s=l.useRef(!1);return l.createElement(uf,T({id:a.contentId,"aria-labelledby":a.triggerId},o,r,{ref:t,onCloseAutoFocus:_(e.onCloseAutoFocus,i=>{var c;s.current||(c=a.triggerRef.current)===null||c===void 0||c.focus(),s.current=!1,i.preventDefault()}),onInteractOutside:_(e.onInteractOutside,i=>{const c=i.detail.originalEvent,f=c.button===0&&c.ctrlKey===!0,d=c.button===2||f;(!a.modal||d)&&(s.current=!0)}),style:{...e.style,["--radix-dropdown-menu-content-transform-origin"]:"var(--radix-popper-transform-origin)"}}))}),xf=l.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...r}=e,a=Ge(n);return l.createElement(ff,T({},a,r,{ref:t}))}),$f=l.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...r}=e,a=Ge(n);return l.createElement(df,T({},a,r,{ref:t}))}),Ef=vf,kf=gf,Cf=hf,Sf=wf,ga=xf,Af=$f;function Gn({children:e,icon:t}){return P.createElement("div",{className:"ctw-flex ctw-items-center ctw-space-x-3"},t&&P.createElement(Re,{icon:t,className:"ctw-mb-[2px] ctw-w-4 ctw-text-content-lighter"}),P.createElement("div",null,e))}try{Gn.displayName="MenuItem",Gn.__docgenInfo={description:"",displayName:"MenuItem",props:{icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"IconDefinition"}}}}}catch{}function Xn({children:e,items:t,onItemSelect:n,type:r,buttonClassName:a,pinnedActions:o=[],isOpen:s}){const{ctwProviderRef:i}=Qo(),[c,f]=l.useState(s);return P.createElement(Si,null,P.createElement(Ef,{modal:!1,open:c,onOpenChange:d=>f(d)},P.createElement(kf,{className:Je(a),"aria-label":"dropdown"},e),P.createElement(Cf,{container:i.current},P.createElement(Sf,{align:"start",onFocusOutside:d=>d.preventDefault(),className:"ctw-dropdown-action-menu",collisionPadding:10},t.map(d=>P.createElement(ga,{key:d.key,className:Je("ctw-dropdown-action-menu-item ctw-bg-bg-white"),onClick:u=>{r==="checkbox"&&u.preventDefault(),n({key:d.key,name:d.name,value:!d.isSelected})}},P.createElement(Pf,{inputType:r,menuItem:d,onClick:n}))),o.length>0&&P.createElement(P.Fragment,null,P.createElement(Af,{className:"ctw-dropdown-separator"}),o.map(d=>P.createElement(ga,{onClick:()=>d.action(),key:d.name,className:Je(d.className,"ctw-dropdown-action-menu-item")},P.createElement(Gn,{icon:d.icon},d.name))))))))}const Pf=({inputType:e,menuItem:t,onClick:n})=>{switch(e){case"checkbox":return P.createElement("div",null,P.createElement("label",{htmlFor:t.name,className:"ctw-flex ctw-cursor-pointer ctw-items-center ctw-space-x-3"},P.createElement("input",{type:"checkbox",className:"ctw-m-0 ctw-mb-px ctw-w-4",name:t.name,onClick:r=>{n({key:t.key,name:t.name,value:!t.isSelected}),r.stopPropagation()},checked:t.isSelected,onChange:r=>{r.stopPropagation()}}),P.createElement("span",null,t.name)));case"select":return P.createElement("div",{className:"ctw-flex ctw-w-full ctw-justify-between"},P.createElement("span",{className:Je({"ctw-font-semibold":t.isSelected})},t.name),t.isSelected&&P.createElement(Re,{icon:Oi,className:"ctw-inline-block ctw-h-4 ctw-stroke-0 ctw-align-middle ctw-text-primary-dark"}));default:return P.createElement("div",null,t.name)}};try{Xn.displayName="DropdownMenuAction",Xn.__docgenInfo={description:"",displayName:"DropdownMenuAction",props:{buttonClassName:{defaultValue:null,description:"",name:"buttonClassName",required:!1,type:{name:"Argument"}},items:{defaultValue:null,description:"",name:"items",required:!0,type:{name:"OptionsItem[]"}},onItemSelect:{defaultValue:null,description:"",name:"onItemSelect",required:!0,type:{name:"(clickedItem: { key: string; name: string; value: boolean; }) => void"}},type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"checkbox"'},{value:'"select"'}]}},customOptionRender:{defaultValue:null,description:"",name:"customOptionRender",required:!1,type:{name:"((optionsItem: OptionsItem) => Element)"}},pinnedActions:{defaultValue:{value:"[]"},description:"",name:"pinnedActions",required:!1,type:{name:"MenuItem[]"}},isOpen:{defaultValue:null,description:"",name:"isOpen",required:!1,type:{name:"boolean"}}}}}catch{}const ha=({className:e,defaultSort:t,onChange:n,options:r})=>{const[a,o]=l.useState(t);return P.createElement(Xn,{type:"select",buttonClassName:Je(e,"ctw-bg-transparent ctw-border-none ctw-p-0"),onItemSelect:s=>{const i=r.filter(c=>c.display===s.key)[0];n(i),o(i)},items:r.map(s=>({key:s.display,name:s.display,isSelected:a.display===s.display}))},P.createElement("div",{className:"ctw-btn-default ctw-flex ctw-items-center ctw-space-x-2"},P.createElement("span",null,"Sort: ",P.createElement("span",{className:"ctw-font-normal"},a.display)," "),P.createElement(Re,{icon:Pi,className:"ctw-w-2"})))};try{ha.displayName="SortButton",ha.__docgenInfo={description:"",displayName:"SortButton",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"Argument"}},defaultSort:{defaultValue:null,description:"",name:"defaultSort",required:!0,type:{name:"SortOption<T>"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"(sort: SortOption<T>) => void"}},options:{defaultValue:null,description:"",name:"options",required:!0,type:{name:"SortOption<T>[]"}}}}}catch{}const Of=(e,t)=>e.filter(n=>Object.entries(t).every(([r,a])=>{if(!a)return!0;const o=String(n[a.key]);switch(a.type){case"checkbox":if(ui(a.selected))return a.selected.filter(i=>$a(Ea(e.map(c=>c[a.key]))).includes(i)).includes(o);break;case"select":return o===a.selected}return!0}));function od(e,t){return $a(Ea(e.map(n=>String(n[t]))))}function id({defaultFilters:e={},defaultSort:t,records:n}){const[r,a]=l.useState(e),[o,s]=l.useState(t),[i,c]=l.useState(n??[]);return l.useEffect(()=>{const f=Of(n??[],r),d=fi(f,o.sorts);c(d)},[r,o,n]),{setFilters:a,setSort:s,data:i,filters:r,sortOption:o}}export{Xn as D,Re as F,Gn as M,ha as S,Xf as a,id as b,Jf as c,qf as d,ed as e,Zf as f,Pi as g,Oi as h,nd as i,Qf as j,td as k,od as u};

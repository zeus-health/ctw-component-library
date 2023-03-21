import{r as s,R as O}from"./index-6f814c40.js";import{c as se}from"./index-74f03c09.js";import"./_baseToString-4993715b.js";import"./sortBy-be5f7eb4.js";import"./_baseClone-25b1595e.js";import"./sortBy-919d7262.js";import{d as pe}from"./debounce-535e186e.js";import{e as de}from"./_equalByTag-aaf39779.js";import"./_baseForOwn-d8306f34.js";import{i as be}from"./isEmpty-bcd6f1a3.js";import"./_createSet-12ef9b81.js";import{a7 as me}from"./patient-helper-9cec045f.js";import{i as G,s as fe,F as ve,p as xe,a as S,e as ge,x as Oe}from"./use-controllable-046cc6fb.js";import{C as _,y as q,I as B,l as Q,m as Re,o as h,$ as V,a as F,S as W,i as he,p as K,s as Ce,k as Z,u as M,L as we,q as Ie,h as ye,c as Se,F as Te,j as y,r as $e,v as Ee}from"./use-watch-a9671586.js";function Pe(e,n){return s.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2,stroke:"currentColor","aria-hidden":"true",ref:n},e),s.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"}))}const ke=s.forwardRef(Pe),Le=ke;var Fe=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(Fe||{}),Me=(e=>(e[e.Single=0]="Single",e[e.Multi=1]="Multi",e))(Me||{}),_e=(e=>(e[e.Pointer=0]="Pointer",e[e.Other=1]="Other",e))(_e||{}),Ve=(e=>(e[e.OpenCombobox=0]="OpenCombobox",e[e.CloseCombobox=1]="CloseCombobox",e[e.GoToOption=2]="GoToOption",e[e.RegisterOption=3]="RegisterOption",e[e.UnregisterOption=4]="UnregisterOption",e[e.RegisterLabel=5]="RegisterLabel",e))(Ve||{});function H(e,n=a=>a){let a=e.activeOptionIndex!==null?e.options[e.activeOptionIndex]:null,t=Ee(n(e.options.slice()),r=>r.dataRef.current.domRef.current),i=a?t.indexOf(a):null;return i===-1&&(i=null),{options:t,activeOptionIndex:i}}let De={[1](e){return e.dataRef.current.disabled||e.comboboxState===1?e:{...e,activeOptionIndex:null,comboboxState:1}},[0](e){if(e.dataRef.current.disabled||e.comboboxState===0)return e;let n=e.activeOptionIndex,{isSelected:a}=e.dataRef.current,t=e.options.findIndex(i=>a(i.dataRef.current.value));return t!==-1&&(n=t),{...e,comboboxState:0,activeOptionIndex:n}},[2](e,n){var a;if(e.dataRef.current.disabled||e.dataRef.current.optionsRef.current&&!e.dataRef.current.optionsPropsRef.current.static&&e.comboboxState===1)return e;let t=H(e);if(t.activeOptionIndex===null){let r=t.options.findIndex(R=>!R.dataRef.current.disabled);r!==-1&&(t.activeOptionIndex=r)}let i=Oe(n,{resolveItems:()=>t.options,resolveActiveIndex:()=>t.activeOptionIndex,resolveId:r=>r.id,resolveDisabled:r=>r.dataRef.current.disabled});return{...e,...t,activeOptionIndex:i,activationTrigger:(a=n.trigger)!=null?a:1}},[3]:(e,n)=>{let a={id:n.id,dataRef:n.dataRef},t=H(e,r=>[...r,a]);e.activeOptionIndex===null&&e.dataRef.current.isSelected(n.dataRef.current.value)&&(t.activeOptionIndex=t.options.indexOf(a));let i={...e,...t,activationTrigger:1};return e.dataRef.current.__demoMode&&e.dataRef.current.value===void 0&&(i.activeOptionIndex=0),i},[4]:(e,n)=>{let a=H(e,t=>{let i=t.findIndex(r=>r.id===n.id);return i!==-1&&t.splice(i,1),t});return{...e,...a,activationTrigger:1}},[5]:(e,n)=>({...e,labelId:n.id})},J=s.createContext(null);J.displayName="ComboboxActionsContext";function j(e){let n=s.useContext(J);if(n===null){let a=new Error(`<${e} /> is missing a parent <Combobox /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(a,j),a}return n}let z=s.createContext(null);z.displayName="ComboboxDataContext";function D(e){let n=s.useContext(z);if(n===null){let a=new Error(`<${e} /> is missing a parent <Combobox /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(a,D),a}return n}function Ne(e,n){return M(n.type,De,e,n)}let Ae=s.Fragment;function qe(e,n){let{value:a,defaultValue:t,onChange:i,name:r,by:R=(b,g)=>b===g,disabled:u=!1,__demoMode:f=!1,nullable:o=!1,multiple:c=!1,...C}=e,[v,m]=xe(a,i,t),[d,p]=s.useReducer(Ne,{dataRef:s.createRef(),comboboxState:f?0:1,options:[],activeOptionIndex:null,activationTrigger:1,labelId:null}),$=s.useRef(!1),P=s.useRef({static:!1,hold:!1}),k=s.useRef(null),T=s.useRef(null),l=s.useRef(null),I=s.useRef(null),w=h(typeof R=="string"?(b,g)=>{let E=R;return(b==null?void 0:b[E])===(g==null?void 0:g[E])}:R),L=s.useCallback(b=>M(x.mode,{[1]:()=>v.some(g=>w(g,b)),[0]:()=>w(v,b)}),[v]),x=s.useMemo(()=>({...d,optionsPropsRef:P,labelRef:k,inputRef:T,buttonRef:l,optionsRef:I,value:v,disabled:u,mode:c?1:0,get activeOptionIndex(){if($.current&&d.activeOptionIndex===null&&d.options.length>0){let b=d.options.findIndex(g=>!g.dataRef.current.disabled);if(b!==-1)return b}return d.activeOptionIndex},compare:w,isSelected:L,nullable:o,__demoMode:f}),[v,u,c,o,f,d]);F(()=>{d.dataRef.current=x},[x]),we([x.buttonRef,x.inputRef,x.optionsRef],()=>p({type:1}),x.comboboxState===0);let Y=s.useMemo(()=>({open:x.comboboxState===0,disabled:u,activeIndex:x.activeOptionIndex,activeOption:x.activeOptionIndex===null?null:x.options[x.activeOptionIndex].dataRef.current.value,value:v}),[x,u,v]),ee=h(b=>{let g=x.options.find(E=>E.id===b);!g||U(g.dataRef.current.value)}),te=h(()=>{if(x.activeOptionIndex!==null){let{dataRef:b,id:g}=x.options[x.activeOptionIndex];U(b.current.value),p({type:2,focus:S.Specific,id:g})}}),oe=h(()=>{p({type:0}),$.current=!0}),ne=h(()=>{p({type:1}),$.current=!1}),re=h((b,g,E)=>($.current=!1,b===S.Specific?p({type:2,focus:S.Specific,id:g,trigger:E}):p({type:2,focus:b,trigger:E}))),ae=h((b,g)=>(p({type:3,id:b,dataRef:g}),()=>p({type:4,id:b}))),ie=h(b=>(p({type:5,id:b}),()=>p({type:5,id:null}))),U=h(b=>M(x.mode,{[0](){return m==null?void 0:m(b)},[1](){let g=x.value.slice(),E=g.findIndex(ce=>w(ce,b));return E===-1?g.push(b):g.splice(E,1),m==null?void 0:m(g)}})),le=s.useMemo(()=>({onChange:U,registerOption:ae,registerLabel:ie,goToOption:re,closeCombobox:ne,openCombobox:oe,selectActiveOption:te,selectOption:ee}),[]),ue=n===null?{}:{ref:n};return O.createElement(J.Provider,{value:le},O.createElement(z.Provider,{value:x},O.createElement(Ie,{value:M(x.comboboxState,{[0]:K.Open,[1]:K.Closed})},r!=null&&v!=null&&ge({[r]:v}).map(([b,g])=>O.createElement(ye,{features:Se.Hidden,...Te({key:b,as:"input",type:"hidden",hidden:!0,readOnly:!0,name:b,value:g})})),V({ourProps:ue,theirProps:C,slot:Y,defaultTag:Ae,name:"Combobox"}))))}let Be=_(qe),je="input",Ue=_(function(e,n){var a,t;let{value:i,onChange:r,displayValue:R,type:u="text",...f}=e,o=D("Combobox.Input"),c=j("Combobox.Input"),C=q(o.inputRef,n),v=`headlessui-combobox-input-${B()}`,m=Q(),d=s.useMemo(()=>{var l;return typeof R=="function"?(l=R(o.value))!=null?l:"":typeof o.value=="string"?o.value:""},[o.value]);Re(([l,I],[w,L])=>{!o.inputRef.current||(L===0&&I===1||l!==w)&&(o.inputRef.current.value=l)},[d,o.comboboxState]);let p=h(l=>{switch(l.key){case y.Backspace:case y.Delete:if(o.mode!==0||!o.nullable)return;let I=l.currentTarget;m.requestAnimationFrame(()=>{I.value===""&&(c.onChange(null),o.optionsRef.current&&(o.optionsRef.current.scrollTop=0),c.goToOption(S.Nothing))});break;case y.Enter:if(o.comboboxState!==0||l.nativeEvent.isComposing)return;if(l.preventDefault(),l.stopPropagation(),o.activeOptionIndex===null){c.closeCombobox();return}c.selectActiveOption(),o.mode===0&&c.closeCombobox();break;case y.ArrowDown:return l.preventDefault(),l.stopPropagation(),M(o.comboboxState,{[0]:()=>{c.goToOption(S.Next)},[1]:()=>{c.openCombobox()}});case y.ArrowUp:return l.preventDefault(),l.stopPropagation(),M(o.comboboxState,{[0]:()=>{c.goToOption(S.Previous)},[1]:()=>{c.openCombobox(),m.nextFrame(()=>{o.value||c.goToOption(S.Last)})}});case y.Home:case y.PageUp:return l.preventDefault(),l.stopPropagation(),c.goToOption(S.First);case y.End:case y.PageDown:return l.preventDefault(),l.stopPropagation(),c.goToOption(S.Last);case y.Escape:return o.comboboxState!==0?void 0:(l.preventDefault(),o.optionsRef.current&&!o.optionsPropsRef.current.static&&l.stopPropagation(),c.closeCombobox());case y.Tab:if(o.comboboxState!==0)return;o.mode===0&&c.selectActiveOption(),c.closeCombobox();break}}),$=h(l=>{c.openCombobox(),r==null||r(l)}),P=G(()=>{if(o.labelId)return[o.labelId].join(" ")},[o.labelId]),k=s.useMemo(()=>({open:o.comboboxState===0,disabled:o.disabled}),[o]),T={ref:C,id:v,role:"combobox",type:u,"aria-controls":(a=o.optionsRef.current)==null?void 0:a.id,"aria-expanded":o.disabled?void 0:o.comboboxState===0,"aria-activedescendant":o.activeOptionIndex===null||(t=o.options[o.activeOptionIndex])==null?void 0:t.id,"aria-multiselectable":o.mode===1?!0:void 0,"aria-labelledby":P,disabled:o.disabled,onKeyDown:p,onChange:$};return V({ourProps:T,theirProps:f,slot:k,defaultTag:je,name:"Combobox.Input"})}),He="button",Ke=_(function(e,n){var a;let t=D("Combobox.Button"),i=j("Combobox.Button"),r=q(t.buttonRef,n),R=`headlessui-combobox-button-${B()}`,u=Q(),f=h(d=>{switch(d.key){case y.ArrowDown:return d.preventDefault(),d.stopPropagation(),t.comboboxState===1&&i.openCombobox(),u.nextFrame(()=>{var p;return(p=t.inputRef.current)==null?void 0:p.focus({preventScroll:!0})});case y.ArrowUp:return d.preventDefault(),d.stopPropagation(),t.comboboxState===1&&(i.openCombobox(),u.nextFrame(()=>{t.value||i.goToOption(S.Last)})),u.nextFrame(()=>{var p;return(p=t.inputRef.current)==null?void 0:p.focus({preventScroll:!0})});case y.Escape:return t.comboboxState!==0?void 0:(d.preventDefault(),t.optionsRef.current&&!t.optionsPropsRef.current.static&&d.stopPropagation(),i.closeCombobox(),u.nextFrame(()=>{var p;return(p=t.inputRef.current)==null?void 0:p.focus({preventScroll:!0})}));default:return}}),o=h(d=>{if($e(d.currentTarget))return d.preventDefault();t.comboboxState===0?i.closeCombobox():(d.preventDefault(),i.openCombobox()),u.nextFrame(()=>{var p;return(p=t.inputRef.current)==null?void 0:p.focus({preventScroll:!0})})}),c=G(()=>{if(t.labelId)return[t.labelId,R].join(" ")},[t.labelId,R]),C=s.useMemo(()=>({open:t.comboboxState===0,disabled:t.disabled,value:t.value}),[t]),v=e,m={ref:r,id:R,type:fe(e,t.buttonRef),tabIndex:-1,"aria-haspopup":!0,"aria-controls":(a=t.optionsRef.current)==null?void 0:a.id,"aria-expanded":t.disabled?void 0:t.comboboxState===0,"aria-labelledby":c,disabled:t.disabled,onClick:o,onKeyDown:f};return V({ourProps:m,theirProps:v,slot:C,defaultTag:He,name:"Combobox.Button"})}),Ge="label",Je=_(function(e,n){let a=D("Combobox.Label"),t=`headlessui-combobox-label-${B()}`,i=j("Combobox.Label"),r=q(a.labelRef,n);F(()=>i.registerLabel(t),[t]);let R=h(()=>{var f;return(f=a.inputRef.current)==null?void 0:f.focus({preventScroll:!0})}),u=s.useMemo(()=>({open:a.comboboxState===0,disabled:a.disabled}),[a]);return V({ourProps:{ref:r,id:t,onClick:R},theirProps:e,slot:u,defaultTag:Ge,name:"Combobox.Label"})}),ze="ul",We=W.RenderStrategy|W.Static,Ze=_(function(e,n){var a;let{hold:t=!1,...i}=e,r=D("Combobox.Options"),R=q(r.optionsRef,n),u=`headlessui-combobox-options-${B()}`,f=he(),o=(()=>f!==null?f===K.Open:r.comboboxState===0)();F(()=>{var m;r.optionsPropsRef.current.static=(m=e.static)!=null?m:!1},[r.optionsPropsRef,e.static]),F(()=>{r.optionsPropsRef.current.hold=t},[r.optionsPropsRef,t]),ve({container:r.optionsRef.current,enabled:r.comboboxState===0,accept(m){return m.getAttribute("role")==="option"?NodeFilter.FILTER_REJECT:m.hasAttribute("role")?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT},walk(m){m.setAttribute("role","none")}});let c=G(()=>{var m,d;return(d=r.labelId)!=null?d:(m=r.buttonRef.current)==null?void 0:m.id},[r.labelId,r.buttonRef.current]),C=s.useMemo(()=>({open:r.comboboxState===0}),[r]),v={"aria-activedescendant":r.activeOptionIndex===null||(a=r.options[r.activeOptionIndex])==null?void 0:a.id,"aria-labelledby":c,role:"listbox",id:u,ref:R};return V({ourProps:v,theirProps:i,slot:C,defaultTag:ze,features:We,visible:o,name:"Combobox.Options"})}),Xe="li",Qe=_(function(e,n){var a,t;let{disabled:i=!1,value:r,...R}=e,u=D("Combobox.Option"),f=j("Combobox.Option"),o=`headlessui-combobox-option-${B()}`,c=u.activeOptionIndex!==null?u.options[u.activeOptionIndex].id===o:!1,C=u.isSelected(r),v=s.useRef(null),m=Ce({disabled:i,value:r,domRef:v,textValue:(t=(a=v.current)==null?void 0:a.textContent)==null?void 0:t.toLowerCase()}),d=q(n,v),p=h(()=>f.selectOption(o));F(()=>f.registerOption(o,m),[m,o]);let $=s.useRef(!u.__demoMode);F(()=>{if(!u.__demoMode)return;let w=Z();return w.requestAnimationFrame(()=>{$.current=!0}),w.dispose},[]),F(()=>{if(u.comboboxState!==0||!c||!$.current||u.activationTrigger===0)return;let w=Z();return w.requestAnimationFrame(()=>{var L,x;(x=(L=v.current)==null?void 0:L.scrollIntoView)==null||x.call(L,{block:"nearest"})}),w.dispose},[v,c,u.comboboxState,u.activationTrigger,u.activeOptionIndex]);let P=h(w=>{if(i)return w.preventDefault();p(),u.mode===0&&f.closeCombobox()}),k=h(()=>{if(i)return f.goToOption(S.Nothing);f.goToOption(S.Specific,o)}),T=h(()=>{i||c||f.goToOption(S.Specific,o,0)}),l=h(()=>{i||!c||u.optionsPropsRef.current.hold||f.goToOption(S.Nothing)}),I=s.useMemo(()=>({active:c,selected:C,disabled:i}),[c,C,i]);return V({ourProps:{id:o,ref:d,role:"option",tabIndex:i===!0?void 0:-1,"aria-disabled":i===!0?!0:void 0,"aria-selected":C,disabled:void 0,onClick:P,onFocus:k,onPointerMove:T,onMouseMove:T,onPointerLeave:l,onMouseLeave:l},theirProps:R,slot:I,defaultTag:Xe,name:"Combobox.Option"})}),A=Object.assign(Be,{Input:Ue,Button:Ke,Label:Je,Options:Ze,Option:Qe});const X=({options:e,isLoading:n,name:a,defaultSearchTerm:t,defaultValue:i,onSearchChange:r,readonly:R,enableSearchIcon:u=!1,onCustomSelectChange:f,renderCustomOption:o,placeholder:c="Type to search"})=>{const[C,v]=s.useState(t||""),[m,d]=s.useState({}),p=be(m)?i:m,$=de(p)?JSON.stringify(p):p,P=s.useMemo(()=>pe(l=>{const I=l.target.value;I.length>1&&r(I),I!==C&&v(I),e.filter(w=>w.label===I).length===0&&d({})},300),[r]),k=T=>{const l=e.filter(I=>I.label===T)[0];d(l.value),v(T),f==null||f(l)};return O.createElement(A,{onChange:k,value:C,disabled:R},({open:T})=>O.createElement("div",{className:"ctw-relative ctw-text-left"},O.createElement(A.Button,{as:"div",onClick:l=>{(T||C.length===0)&&me(l)&&l.preventDefault()}},O.createElement("div",{className:"ctw-relative"},u&&O.createElement("div",{className:"ctw-search-icon-wrapper"},O.createElement(Le,{className:"ctw-search-icon"})),O.createElement(A.Input,{className:se("ctw-listbox-input ctw-w-full",{"ctw-pl-10":u}),onChange:l=>{l.persist(),P(l)},placeholder:c}))),O.createElement("input",{hidden:!0,name:a,value:$,readOnly:!0}),O.createElement(A.Options,{className:"ctw-listbox ctw-absolute ctw-z-10 ctw-m-0 ctw-mt-1 ctw-max-h-60 ctw-w-full ctw-list-none ctw-overflow-auto ctw-rounded-md ctw-bg-white ctw-p-0 ctw-py-1 ctw-text-base ctw-shadow-lg ctw-ring-1 ctw-ring-opacity-5 focus:ctw-outline-none sm:ctw-text-sm"},O.createElement(Ye,{options:e,query:C,isLoading:n,renderCustomOption:o}))))},Ye=({options:e,query:n,isLoading:a,renderCustomOption:t})=>n.length===0?O.createElement(N,{option:{value:"",label:"Type to search"}}):a?O.createElement(N,{option:{value:"",label:"Loading..."}}):n.length<2?O.createElement(N,{option:{value:"",label:"Pleae type at least two characters"}}):e.length===0?O.createElement(N,{option:{value:"",label:`No results found for search term '${n}'`}}):O.createElement(O.Fragment,null,e.map(i=>t?O.createElement(s.Fragment,{key:i.key},t(i)," "):O.createElement(N,{option:i,key:i.key}))),N=({option:e})=>O.createElement(A.Option,{value:e.label,className:({active:n})=>`ctw-relative ctw-cursor-default ctw-select-none ctw-py-2 ctw-pr-4 ctw-pl-4 ${n?"ctw-bg-primary-light ctw-text-primary-dark":"ctw-text-content-black"}`},e.label);try{X.displayName="ComboboxField",X.__docgenInfo={description:"",displayName:"ComboboxField",props:{options:{defaultValue:null,description:"",name:"options",required:!0,type:{name:"ComboxboxFieldOption[]"}},isLoading:{defaultValue:null,description:"",name:"isLoading",required:!0,type:{name:"boolean"}},name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}},defaultValue:{defaultValue:null,description:"",name:"defaultValue",required:!0,type:{name:"T"}},defaultSearchTerm:{defaultValue:null,description:"",name:"defaultSearchTerm",required:!0,type:{name:"string"}},onSearchChange:{defaultValue:null,description:"",name:"onSearchChange",required:!0,type:{name:"(searchTerm: string) => void"}},readonly:{defaultValue:null,description:"",name:"readonly",required:!0,type:{name:"boolean | undefined"}},enableSearchIcon:{defaultValue:{value:"false"},description:"",name:"enableSearchIcon",required:!1,type:{name:"boolean"}},onCustomSelectChange:{defaultValue:null,description:"",name:"onCustomSelectChange",required:!1,type:{name:"((e: unknown) => void)"}},renderCustomOption:{defaultValue:null,description:"",name:"renderCustomOption",required:!1,type:{name:"((e: unknown) => Element)"}},placeholder:{defaultValue:{value:"Type to search"},description:"",name:"placeholder",required:!1,type:{name:"string"}}}}}catch{}const mt=""+new URL("zus-e8138a64.svg",import.meta.url).href;export{X as C,A as L,mt as Z};

import{r as l,R as c}from"./index-6f814c40.js";import{c as Ue}from"./index-74f03c09.js";import{a as B,b as O,e as Ne,C as P,y as R,n as J,o as T,u as C,O as me,T as we,h as ve,s as he,$ as S,m as _e,q as H,t as xe,M as We,v as ze,w as Le,I as W,S as ge,f as Fe,g as U,L as Ye,c as Ge,r as Xe,i as te,p as Ae,x as L,j as Ke}from"./use-watch-ad083092.js";import{r as Je}from"./index-6de6b113.js";function Qe(e,t,r){let n=B(t);l.useEffect(()=>{function o(s){n.current(s)}return window.addEventListener(e,o,r),()=>window.removeEventListener(e,o,r)},[e,r])}var Ee=(e=>(e[e.Forwards=0]="Forwards",e[e.Backwards=1]="Backwards",e))(Ee||{});function Ze(){let e=l.useRef(0);return Qe("keydown",t=>{t.key==="Tab"&&(e.current=t.shiftKey?1:0)},!0),e}function re(){let e=l.useRef(!1);return O(()=>(e.current=!0,()=>{e.current=!1}),[]),e}function ne(...e){return l.useMemo(()=>Ne(...e),[...e])}function Pe(e,t,r,n){let o=B(r);l.useEffect(()=>{e=e??window;function s(i){o.current(i)}return e.addEventListener(t,s,n),()=>e.removeEventListener(t,s,n)},[e,t,n])}let et="div";var Be=(e=>(e[e.None=1]="None",e[e.InitialFocus=2]="InitialFocus",e[e.TabLock=4]="TabLock",e[e.FocusLock=8]="FocusLock",e[e.RestoreFocus=16]="RestoreFocus",e[e.All=30]="All",e))(Be||{});let K=Object.assign(P(function(e,t){let r=l.useRef(null),n=R(r,t),{initialFocus:o,containers:s,features:i=30,...a}=e;J()||(i=1);let u=ne(r);tt({ownerDocument:u},!!(i&16));let d=rt({ownerDocument:u,container:r,initialFocus:o},!!(i&2));nt({ownerDocument:u,container:r,containers:s,previousActiveElement:d},!!(i&8));let f=Ze(),h=T(()=>{let v=r.current;!v||C(f.current,{[Ee.Forwards]:()=>me(v,we.First),[Ee.Backwards]:()=>me(v,we.Last)})}),F={ref:n};return c.createElement(c.Fragment,null,!!(i&4)&&c.createElement(ve,{as:"button",type:"button",onFocus:h,features:he.Focusable}),S({ourProps:F,theirProps:a,defaultTag:et,name:"FocusTrap"}),!!(i&4)&&c.createElement(ve,{as:"button",type:"button",onFocus:h,features:he.Focusable}))}),{features:Be});function tt({ownerDocument:e},t){let r=l.useRef(null);Pe(e==null?void 0:e.defaultView,"focusout",o=>{!t||r.current||(r.current=o.target)},!0),_e(()=>{t||((e==null?void 0:e.activeElement)===(e==null?void 0:e.body)&&H(r.current),r.current=null)},[t]);let n=l.useRef(!1);l.useEffect(()=>(n.current=!1,()=>{n.current=!0,xe(()=>{!n.current||(H(r.current),r.current=null)})}),[])}function rt({ownerDocument:e,container:t,initialFocus:r},n){let o=l.useRef(null),s=re();return _e(()=>{if(!n)return;let i=t.current;!i||xe(()=>{if(!s.current)return;let a=e==null?void 0:e.activeElement;if(r!=null&&r.current){if((r==null?void 0:r.current)===a){o.current=a;return}}else if(i.contains(a)){o.current=a;return}r!=null&&r.current?H(r.current):me(i,we.First)===We.Error&&console.warn("There are no focusable elements inside the <FocusTrap />"),o.current=e==null?void 0:e.activeElement})},[n]),o}function nt({ownerDocument:e,container:t,containers:r,previousActiveElement:n},o){let s=re();Pe(e==null?void 0:e.defaultView,"focus",i=>{if(!o||!s.current)return;let a=new Set(r==null?void 0:r.current);a.add(t);let u=n.current;if(!u)return;let d=i.target;d&&d instanceof HTMLElement?ot(a,d)?(n.current=d,H(d)):(i.preventDefault(),i.stopPropagation(),H(u)):H(n.current)},!0)}function ot(e,t){var r;for(let n of e)if((r=n.current)!=null&&r.contains(t))return!0;return!1}let j=new Set,_=new Map;function Re(e){e.setAttribute("aria-hidden","true"),e.inert=!0}function Se(e){let t=_.get(e);!t||(t["aria-hidden"]===null?e.removeAttribute("aria-hidden"):e.setAttribute("aria-hidden",t["aria-hidden"]),e.inert=t.inert)}function lt(e,t=!0){O(()=>{if(!t||!e.current)return;let r=e.current,n=Ne(r);if(n){j.add(r);for(let o of _.keys())o.contains(r)&&(Se(o),_.delete(o));return n.querySelectorAll("body > *").forEach(o=>{if(o instanceof HTMLElement){for(let s of j)if(o.contains(s))return;j.size===1&&(_.set(o,{"aria-hidden":o.getAttribute("aria-hidden"),inert:o.inert}),Re(o))}}),()=>{if(j.delete(r),j.size>0)n.querySelectorAll("body > *").forEach(o=>{if(o instanceof HTMLElement&&!_.has(o)){for(let s of j)if(o.contains(s))return;_.set(o,{"aria-hidden":o.getAttribute("aria-hidden"),inert:o.inert}),Re(o)}});else for(let o of _.keys())Se(o),_.delete(o)}}},[t])}let Oe=l.createContext(!1);function at(){return l.useContext(Oe)}function be(e){return c.createElement(Oe.Provider,{value:e.force},e.children)}function it(e){let t=at(),r=l.useContext(Me),n=ne(e),[o,s]=l.useState(()=>{if(!t&&r!==null||Le)return null;let i=n==null?void 0:n.getElementById("headlessui-portal-root");if(i)return i;if(n===null)return null;let a=n.createElement("div");return a.setAttribute("id","headlessui-portal-root"),n.body.appendChild(a)});return l.useEffect(()=>{o!==null&&(n!=null&&n.body.contains(o)||n==null||n.body.appendChild(o))},[o,n]),l.useEffect(()=>{t||r!==null&&s(r.current)},[r,s,t]),o}let st=l.Fragment,ut=P(function(e,t){let r=e,n=l.useRef(null),o=R(ze(f=>{n.current=f}),t),s=ne(n),i=it(n),[a]=l.useState(()=>{var f;return Le?null:(f=s==null?void 0:s.createElement("div"))!=null?f:null}),u=J(),d=l.useRef(!1);return O(()=>{if(d.current=!1,!(!i||!a))return i.contains(a)||(a.setAttribute("data-headlessui-portal",""),i.appendChild(a)),()=>{d.current=!0,xe(()=>{var f;!d.current||!i||!a||(i.removeChild(a),i.childNodes.length<=0&&((f=i.parentElement)==null||f.removeChild(i)))})}},[i,a]),u?!i||!a?null:Je.createPortal(S({ourProps:{ref:o},theirProps:r,defaultTag:st,name:"Portal"}),a):null}),ct=l.Fragment,Me=l.createContext(null),dt=P(function(e,t){let{target:r,...n}=e,o={ref:R(t)};return c.createElement(Me.Provider,{value:r},S({ourProps:o,theirProps:n,defaultTag:ct,name:"Popover.Group"}))}),ye=Object.assign(ut,{Group:dt}),Ie=l.createContext(null);function Ve(){let e=l.useContext(Ie);if(e===null){let t=new Error("You used a <Description /> component, but it is not inside a relevant parent.");throw Error.captureStackTrace&&Error.captureStackTrace(t,Ve),t}return e}function ft(){let[e,t]=l.useState([]);return[e.length>0?e.join(" "):void 0,l.useMemo(()=>function(r){let n=T(s=>(t(i=>[...i,s]),()=>t(i=>{let a=i.slice(),u=a.indexOf(s);return u!==-1&&a.splice(u,1),a}))),o=l.useMemo(()=>({register:n,slot:r.slot,name:r.name,props:r.props}),[n,r.slot,r.name,r.props]);return c.createElement(Ie.Provider,{value:o},r.children)},[t])]}let pt="p",mt=P(function(e,t){let r=Ve(),n=`headlessui-description-${W()}`,o=R(t);O(()=>r.register(n),[n,r.register]);let s=e,i={ref:o,...r.props,id:n};return S({ourProps:i,theirProps:s,slot:r.slot||{},defaultTag:pt,name:r.name||"Description"})}),De=l.createContext(()=>{});De.displayName="StackContext";var Ce=(e=>(e[e.Add=0]="Add",e[e.Remove=1]="Remove",e))(Ce||{});function wt(){return l.useContext(De)}function vt({children:e,onUpdate:t,type:r,element:n,enabled:o}){let s=wt(),i=T((...a)=>{t==null||t(...a),s(...a)});return O(()=>{let a=o===void 0||o===!0;return a&&i(0,r,n),()=>{a&&i(1,r,n)}},[i,r,n,o]),c.createElement(De.Provider,{value:i},e)}function ht(){return/iPhone/gi.test(window.navigator.platform)||/Mac/gi.test(window.navigator.platform)&&window.navigator.maxTouchPoints>0}var gt=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(gt||{}),Et=(e=>(e[e.SetTitleId=0]="SetTitleId",e))(Et||{});let bt={[0](e,t){return e.titleId===t.id?e:{...e,titleId:t.id}}},ee=l.createContext(null);ee.displayName="DialogContext";function Q(e){let t=l.useContext(ee);if(t===null){let r=new Error(`<${e} /> is missing a parent <Dialog /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,Q),r}return t}function yt(e,t){l.useEffect(()=>{var r;if(!t||!e)return;let n=te();function o(a,u,d){let f=a.style.getPropertyValue(u);return Object.assign(a.style,{[u]:d}),n.add(()=>{Object.assign(a.style,{[u]:f})})}let s=e.documentElement,i=((r=e.defaultView)!=null?r:window).innerWidth-s.clientWidth;if(o(s,"overflow","hidden"),i>0){let a=s.clientWidth-s.offsetWidth,u=i-a;o(s,"paddingRight",`${u}px`)}if(ht()){let a=window.pageYOffset;o(s,"position","fixed"),o(s,"marginTop",`-${a}px`),o(s,"width","100%"),n.add(()=>window.scrollTo(0,a))}return n.dispose},[e,t])}function Ct(e,t){return C(t.type,bt,e,t)}let Tt="div",$t=ge.RenderStrategy|ge.Static,xt=P(function(e,t){let{open:r,onClose:n,initialFocus:o,__demoMode:s=!1,...i}=e,[a,u]=l.useState(0),d=Fe();r===void 0&&d!==null&&(r=C(d,{[U.Open]:!0,[U.Closed]:!1}));let f=l.useRef(new Set),h=l.useRef(null),F=R(h,t),v=l.useRef(null),p=ne(h),g=e.hasOwnProperty("open")||d!==null,w=e.hasOwnProperty("onClose");if(!g&&!w)throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");if(!g)throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");if(!w)throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");if(typeof r!="boolean")throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${r}`);if(typeof n!="function")throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${n}`);let m=r?0:1,[b,ie]=l.useReducer(Ct,{titleId:null,descriptionId:null,panelRef:l.createRef()}),y=T(()=>n(!1)),M=T(E=>ie({type:0,id:E})),I=J()?s?!1:m===0:!1,k=a>1,V=l.useContext(ee)!==null,z=k?"parent":"leaf";lt(h,k?I:!1),Ye(()=>{var E,D;return[...Array.from((E=p==null?void 0:p.querySelectorAll("body > *, [data-headlessui-portal]"))!=null?E:[]).filter($=>!(!($ instanceof HTMLElement)||$.contains(v.current)||b.panelRef.current&&$.contains(b.panelRef.current))),(D=b.panelRef.current)!=null?D:h.current]},y,I&&!k),Pe(p==null?void 0:p.defaultView,"keydown",E=>{E.defaultPrevented||E.key===Ge.Escape&&m===0&&(k||(E.preventDefault(),E.stopPropagation(),y()))}),yt(p,m===0&&!V),l.useEffect(()=>{if(m!==0||!h.current)return;let E=new IntersectionObserver(D=>{for(let $ of D)$.boundingClientRect.x===0&&$.boundingClientRect.y===0&&$.boundingClientRect.width===0&&$.boundingClientRect.height===0&&y()});return E.observe(h.current),()=>E.disconnect()},[m,h,y]);let[se,q]=ft(),Y=`headlessui-dialog-${W()}`,G=l.useMemo(()=>[{dialogState:m,close:y,setTitleId:M},b],[m,b,y,M]),Z=l.useMemo(()=>({open:m===0}),[m]),ue={ref:F,id:Y,role:"dialog","aria-modal":m===0?!0:void 0,"aria-labelledby":b.titleId,"aria-describedby":se};return c.createElement(vt,{type:"Dialog",enabled:m===0,element:h,onUpdate:T((E,D,$)=>{D==="Dialog"&&C(E,{[Ce.Add](){f.current.add($),u(X=>X+1)},[Ce.Remove](){f.current.add($),u(X=>X-1)}})})},c.createElement(be,{force:!0},c.createElement(ye,null,c.createElement(ee.Provider,{value:G},c.createElement(ye.Group,{target:h},c.createElement(be,{force:!1},c.createElement(q,{slot:Z,name:"Dialog.Description"},c.createElement(K,{initialFocus:o,containers:f,features:I?C(z,{parent:K.features.RestoreFocus,leaf:K.features.All&~K.features.FocusLock}):K.features.None},S({ourProps:ue,theirProps:i,slot:Z,defaultTag:Tt,features:$t,visible:m===0,name:"Dialog"})))))))),c.createElement(ve,{features:he.Hidden,ref:v}))}),Ft="div",Pt=P(function(e,t){let[{dialogState:r,close:n}]=Q("Dialog.Overlay"),o=R(t),s=`headlessui-dialog-overlay-${W()}`,i=T(u=>{if(u.target===u.currentTarget){if(Xe(u.currentTarget))return u.preventDefault();u.preventDefault(),u.stopPropagation(),n()}}),a=l.useMemo(()=>({open:r===0}),[r]);return S({ourProps:{ref:o,id:s,"aria-hidden":!0,onClick:i},theirProps:e,slot:a,defaultTag:Ft,name:"Dialog.Overlay"})}),Dt="div",Rt=P(function(e,t){let[{dialogState:r},n]=Q("Dialog.Backdrop"),o=R(t),s=`headlessui-dialog-backdrop-${W()}`;l.useEffect(()=>{if(n.panelRef.current===null)throw new Error("A <Dialog.Backdrop /> component is being used, but a <Dialog.Panel /> component is missing.")},[n.panelRef]);let i=l.useMemo(()=>({open:r===0}),[r]);return c.createElement(be,{force:!0},c.createElement(ye,null,S({ourProps:{ref:o,id:s,"aria-hidden":!0},theirProps:e,slot:i,defaultTag:Dt,name:"Dialog.Backdrop"})))}),St="div",kt=P(function(e,t){let[{dialogState:r},n]=Q("Dialog.Panel"),o=R(t,n.panelRef),s=`headlessui-dialog-panel-${W()}`,i=l.useMemo(()=>({open:r===0}),[r]),a=T(u=>{u.stopPropagation()});return S({ourProps:{ref:o,id:s,onClick:a},theirProps:e,slot:i,defaultTag:St,name:"Dialog.Panel"})}),Nt="h2",_t=P(function(e,t){let[{dialogState:r,setTitleId:n}]=Q("Dialog.Title"),o=`headlessui-dialog-title-${W()}`,s=R(t);l.useEffect(()=>(n(o),()=>n(null)),[o,n]);let i=l.useMemo(()=>({open:r===0}),[r]);return S({ourProps:{ref:s,id:o},theirProps:e,slot:i,defaultTag:Nt,name:"Dialog.Title"})}),ce=Object.assign(xt,{Backdrop:Rt,Panel:kt,Overlay:Pt,Title:_t,Description:mt});function Lt(e){let t={called:!1};return(...r)=>{if(!t.called)return t.called=!0,e(...r)}}function de(e,...t){e&&t.length>0&&e.classList.add(...t)}function fe(e,...t){e&&t.length>0&&e.classList.remove(...t)}var Te=(e=>(e.Ended="ended",e.Cancelled="cancelled",e))(Te||{});function At(e,t){let r=te();if(!e)return r.dispose;let{transitionDuration:n,transitionDelay:o}=getComputedStyle(e),[s,i]=[n,o].map(a=>{let[u=0]=a.split(",").filter(Boolean).map(d=>d.includes("ms")?parseFloat(d):parseFloat(d)*1e3).sort((d,f)=>f-d);return u});if(s+i!==0){let a=[];a.push(r.addEventListener(e,"transitionrun",u=>{u.target===u.currentTarget&&(a.splice(0).forEach(d=>d()),a.push(r.addEventListener(e,"transitionend",d=>{d.target===d.currentTarget&&(t("ended"),a.splice(0).forEach(f=>f()))}),r.addEventListener(e,"transitioncancel",d=>{d.target===d.currentTarget&&(t("cancelled"),a.splice(0).forEach(f=>f()))})))}))}else t("ended");return r.add(()=>t("cancelled")),r.dispose}function Bt(e,t,r,n){let o=r?"enter":"leave",s=te(),i=n!==void 0?Lt(n):()=>{};o==="enter"&&(e.removeAttribute("hidden"),e.style.display="");let a=C(o,{enter:()=>t.enter,leave:()=>t.leave}),u=C(o,{enter:()=>t.enterTo,leave:()=>t.leaveTo}),d=C(o,{enter:()=>t.enterFrom,leave:()=>t.leaveFrom});return fe(e,...t.enter,...t.enterTo,...t.enterFrom,...t.leave,...t.leaveFrom,...t.leaveTo,...t.entered),de(e,...a,...d),s.nextFrame(()=>{fe(e,...d),de(e,...u),At(e,f=>(f==="ended"&&(fe(e,...a),de(e,...t.entered)),i(f)))}),s.dispose}function Ot({container:e,direction:t,classes:r,onStart:n,onStop:o}){let s=re(),i=Ae(),a=B(t);O(()=>{let u=te();i.add(u.dispose);let d=e.current;if(d&&a.current!=="idle"&&s.current)return u.dispose(),n.current(a.current),u.add(Bt(d,r.current,a.current==="enter",f=>{u.dispose(),C(f,{[Te.Ended](){o.current(a.current)},[Te.Cancelled]:()=>{}})})),u.dispose},[t])}function A(e=""){return e.split(" ").filter(t=>t.trim().length>1)}let oe=l.createContext(null);oe.displayName="TransitionContext";var Mt=(e=>(e.Visible="visible",e.Hidden="hidden",e))(Mt||{});function It(){let e=l.useContext(oe);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}function Vt(){let e=l.useContext(le);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}let le=l.createContext(null);le.displayName="NestingContext";function ae(e){return"children"in e?ae(e.children):e.current.filter(({el:t})=>t.current!==null).filter(({state:t})=>t==="visible").length>0}function qe(e,t){let r=B(e),n=l.useRef([]),o=re(),s=Ae(),i=T((v,p=L.Hidden)=>{let g=n.current.findIndex(({el:w})=>w===v);g!==-1&&(C(p,{[L.Unmount](){n.current.splice(g,1)},[L.Hidden](){n.current[g].state="hidden"}}),s.microTask(()=>{var w;!ae(n)&&o.current&&((w=r.current)==null||w.call(r))}))}),a=T(v=>{let p=n.current.find(({el:g})=>g===v);return p?p.state!=="visible"&&(p.state="visible"):n.current.push({el:v,state:"visible"}),()=>i(v,L.Unmount)}),u=l.useRef([]),d=l.useRef(Promise.resolve()),f=l.useRef({enter:[],leave:[],idle:[]}),h=T((v,p,g)=>{u.current.splice(0),t&&(t.chains.current[p]=t.chains.current[p].filter(([w])=>w!==v)),t==null||t.chains.current[p].push([v,new Promise(w=>{u.current.push(w)})]),t==null||t.chains.current[p].push([v,new Promise(w=>{Promise.all(f.current[p].map(([m,b])=>b)).then(()=>w())})]),p==="enter"?d.current=d.current.then(()=>t==null?void 0:t.wait.current).then(()=>g(p)):g(p)}),F=T((v,p,g)=>{Promise.all(f.current[p].splice(0).map(([w,m])=>m)).then(()=>{var w;(w=u.current.shift())==null||w()}).then(()=>g(p))});return l.useMemo(()=>({children:n,register:a,unregister:i,onStart:h,onStop:F,wait:d,chains:f}),[a,i,n,h,F,f,d])}function qt(){}let jt=["beforeEnter","afterEnter","beforeLeave","afterLeave"];function ke(e){var t;let r={};for(let n of jt)r[n]=(t=e[n])!=null?t:qt;return r}function Ht(e){let t=l.useRef(ke(e));return l.useEffect(()=>{t.current=ke(e)},[e]),t}let Ut="div",je=ge.RenderStrategy,He=P(function(e,t){let{beforeEnter:r,afterEnter:n,beforeLeave:o,afterLeave:s,enter:i,enterFrom:a,enterTo:u,entered:d,leave:f,leaveFrom:h,leaveTo:F,...v}=e,p=l.useRef(null),g=R(p,t),w=v.unmount?L.Unmount:L.Hidden,{show:m,appear:b,initial:ie}=It(),[y,M]=l.useState(m?"visible":"hidden"),I=Vt(),{register:k,unregister:V}=I,z=l.useRef(null);l.useEffect(()=>k(p),[k,p]),l.useEffect(()=>{if(w===L.Hidden&&p.current){if(m&&y!=="visible"){M("visible");return}return C(y,{hidden:()=>V(p),visible:()=>k(p)})}},[y,p,k,V,m,w]);let se=B({enter:A(i),enterFrom:A(a),enterTo:A(u),entered:A(d),leave:A(f),leaveFrom:A(h),leaveTo:A(F)}),q=Ht({beforeEnter:r,afterEnter:n,beforeLeave:o,afterLeave:s}),Y=J();l.useEffect(()=>{if(Y&&y==="visible"&&p.current===null)throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?")},[p,y,Y]);let G=ie&&!b,Z=(()=>!Y||G||z.current===m?"idle":m?"enter":"leave")(),ue=T(N=>C(N,{enter:()=>q.current.beforeEnter(),leave:()=>q.current.beforeLeave(),idle:()=>{}})),E=T(N=>C(N,{enter:()=>q.current.afterEnter(),leave:()=>q.current.afterLeave(),idle:()=>{}})),D=qe(()=>{M("hidden"),V(p)},I);Ot({container:p,classes:se,direction:Z,onStart:B(N=>{D.onStart(p,N,ue)}),onStop:B(N=>{D.onStop(p,N,E),N==="leave"&&!ae(D)&&(M("hidden"),V(p))})}),l.useEffect(()=>{!G||(w===L.Hidden?z.current=null:z.current=m)},[m,G,y]);let $=v,X={ref:g};return c.createElement(le.Provider,{value:D},c.createElement(Ke,{value:C(y,{visible:U.Open,hidden:U.Closed})},S({ourProps:X,theirProps:$,defaultTag:Ut,features:je,visible:y==="visible",name:"Transition.Child"})))}),$e=P(function(e,t){let{show:r,appear:n=!1,unmount:o,...s}=e,i=l.useRef(null),a=R(i,t);J();let u=Fe();if(r===void 0&&u!==null&&(r=C(u,{[U.Open]:!0,[U.Closed]:!1})),![!0,!1].includes(r))throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");let[d,f]=l.useState(r?"visible":"hidden"),h=qe(()=>{f("hidden")}),[F,v]=l.useState(!0),p=l.useRef([r]);O(()=>{F!==!1&&p.current[p.current.length-1]!==r&&(p.current.push(r),v(!1))},[p,r]);let g=l.useMemo(()=>({show:r,appear:n,initial:F}),[r,n,F]);l.useEffect(()=>{if(r)f("visible");else if(!ae(h))f("hidden");else{let m=i.current;if(!m)return;let b=m.getBoundingClientRect();b.x===0&&b.y===0&&b.width===0&&b.height===0&&f("hidden")}},[r,h]);let w={unmount:o};return c.createElement(le.Provider,{value:h},c.createElement(oe.Provider,{value:g},S({ourProps:{...w,as:l.Fragment,children:c.createElement(He,{ref:a,...w,...s})},theirProps:{},defaultTag:l.Fragment,features:je,visible:d==="visible",name:"Transition"})))}),Wt=P(function(e,t){let r=l.useContext(oe)!==null,n=Fe()!==null;return c.createElement(c.Fragment,null,!r&&n?c.createElement($e,{ref:t,...e}):c.createElement(He,{ref:t,...e}))}),pe=Object.assign($e,{Child:Wt,Root:$e});function zt(e,t){return l.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:2,stroke:"currentColor","aria-hidden":"true",ref:t},e),l.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6 18L18 6M6 6l12 12"}))}const Yt=l.forwardRef(zt),Gt=Yt;function x({className:e,children:t,isOpen:r,onClose:n,onAfterClosed:o,onOpen:s,onAfterOpen:i,showCloseFooter:a,title:u,disableCloseOnBlur:d=!1}){const f="ctw-transform ctw-transition ctw-ease-in-out ctw-duration-300";return c.createElement(pe.Root,{show:r,as:l.Fragment},c.createElement(ce,{as:"div","data-zus-telemetry-namespace":`Drawer[${u}]`,className:Ue("ctw-relative ctw-z-[10000]",e),onClose:()=>{d||n()}},c.createElement(pe.Child,{as:l.Fragment,enter:f,enterFrom:"ctw-opacity-0",enterTo:"ctw-opacity-100",leave:f,leaveFrom:"ctw-opacity-100",leaveTo:"ctw-opacity-0",afterLeave:o,beforeEnter:s,afterEnter:i},c.createElement("div",{className:"ctw-fixed ctw-inset-0  ctw-transition-opacity"},c.createElement("div",{className:"ctw-h-full ctw-w-full ctw-bg-content-light ctw-opacity-75"}))),c.createElement("div",{className:"ctw-fixed ctw-inset-0 ctw-overflow-hidden"},c.createElement("div",{className:"ctw-absolute ctw-inset-0 ctw-overflow-hidden"},c.createElement("div",{className:"ctw-pointer-events-none ctw-fixed ctw-inset-y-0 ctw-right-0 ctw-flex ctw-max-w-full ctw-pl-10"},c.createElement(pe.Child,{as:l.Fragment,enter:f,enterFrom:"ctw-translate-x-full",enterTo:"ctw-translate-x-0",leave:f,leaveFrom:"ctw-translate-x-0",leaveTo:"ctw-translate-x-full"},c.createElement(ce.Panel,{className:"ctw-pointer-events-auto ctw-w-screen ctw-max-w-xl"},c.createElement("div",{className:"ctw-flex ctw-h-full ctw-flex-col ctw-bg-white ctw-shadow-xl"},c.createElement("div",{className:"ctw-flex ctw-h-14 ctw-flex-shrink-0 ctw-items-center ctw-justify-between ctw-border-0 ctw-border-b ctw-border-solid ctw-border-content-lighter ctw-px-6"},c.createElement(ce.Title,{className:"ctw-drawer-title ctw-text-lg ctw-font-semibold ctw-text-content-black"},u),c.createElement("div",{className:"ctw-ml-3 ctw-flex ctw-h-7 ctw-items-center"},c.createElement("button",{type:"button","aria-label":"close",onClick:n,"data-zus-telemetry-click":"Close icon",className:"ctw-btn-clear"},c.createElement("span",{className:"ctw-sr-only"},"Close panel"),c.createElement(Gt,{className:"ctw-h-6 ctw-w-6","aria-hidden":"true"})))),t,a&&c.createElement(x.Footer,null,c.createElement(x.CloseButton,{label:"Close",onClose:n}))))))))))}x.Footer=({children:e})=>c.createElement("div",{className:"ctw-border-default ctw-border-t ctw-p-6"},e);x.CloseButton=({label:e,onClose:t})=>c.createElement("button",{type:"button",className:"ctw-btn-clear !ctw-px-4 !ctw-py-2","data-zus-telemetry-click":`${e} button`,onClick:t},e);x.Body=({children:e})=>c.createElement("div",{className:"ctw-flex ctw-h-full ctw-flex-col ctw-overflow-y-auto ctw-p-6"},e);try{x.displayName="Drawer",x.__docgenInfo={description:"Drawer is a side-panel that slides in/out from the right.\nIt has a title section at top and displays children below.\n\n`Drawer.Body` & `Drawer.Footer` can be used as children to create\na scrollable body section with a fixed footer.",displayName:"Drawer",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},onOpen:{defaultValue:null,description:"",name:"onOpen",required:!1,type:{name:"(() => void)"}},onAfterOpen:{defaultValue:null,description:"",name:"onAfterOpen",required:!1,type:{name:"(() => void)"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}},onAfterClosed:{defaultValue:null,description:`Called after drawer closing animation has ended. Use this for
any cleanup that would affect the content displayed in the drawer.`,name:"onAfterClosed",required:!1,type:{name:"(() => void)"}},showCloseFooter:{defaultValue:null,description:'Shows a simple footer with a single "Close" button.',name:"showCloseFooter",required:!1,type:{name:"boolean"}},disableCloseOnBlur:{defaultValue:{value:"false"},description:"Prevent drawer from closing on ESC or background click.",name:"disableCloseOnBlur",required:!1,type:{name:"boolean"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}}}}}catch{}try{x.Footer.displayName="Drawer.Footer",x.Footer.__docgenInfo={description:"",displayName:"Drawer.Footer",props:{}}}catch{}try{x.CloseButton.displayName="Drawer.CloseButton",x.CloseButton.__docgenInfo={description:"",displayName:"Drawer.CloseButton",props:{label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"string"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}}}}}catch{}try{x.Body.displayName="Drawer.Body",x.Body.__docgenInfo={description:"",displayName:"Drawer.Body",props:{}}}catch{}export{x as D,pe as W,Gt as X,ce as g,ne as n};

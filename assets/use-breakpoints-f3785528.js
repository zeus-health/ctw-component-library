import{R as ae,r as g}from"./index-6f814c40.js";import{u as ce,E as ue}from"./patient-helper-c5d8ffd5.js";import"./_baseToString-ba0098b0.js";import"./sortBy-6991f27f.js";import"./_baseClone-0c3bfcab.js";import"./sortBy-9842b21c.js";import"./_equalByTag-3aa7c076.js";import"./_baseForOwn-56487e0e.js";import{m as ve}from"./mapValues-fd7519e7.js";import"./_createSet-823d7c6f.js";var f=[],fe=function(){return f.some(function(e){return e.activeTargets.length>0})},de=function(){return f.some(function(e){return e.skippedTargets.length>0})},M="ResizeObserver loop completed with undelivered notifications.",le=function(){var e;typeof ErrorEvent=="function"?e=new ErrorEvent("error",{message:M}):(e=document.createEvent("Event"),e.initEvent("error",!1,!1),e.message=M),window.dispatchEvent(e)},m;(function(e){e.BORDER_BOX="border-box",e.CONTENT_BOX="content-box",e.DEVICE_PIXEL_CONTENT_BOX="device-pixel-content-box"})(m||(m={}));var d=function(e){return Object.freeze(e)},he=function(){function e(t,r){this.inlineSize=t,this.blockSize=r,d(this)}return e}(),U=function(){function e(t,r,n,i){return this.x=t,this.y=r,this.width=n,this.height=i,this.top=this.y,this.left=this.x,this.bottom=this.top+this.height,this.right=this.left+this.width,d(this)}return e.prototype.toJSON=function(){var t=this,r=t.x,n=t.y,i=t.top,s=t.right,o=t.bottom,a=t.left,c=t.width,u=t.height;return{x:r,y:n,top:i,right:s,bottom:o,left:a,width:c,height:u}},e.fromRect=function(t){return new e(t.x,t.y,t.width,t.height)},e}(),D=function(e){return e instanceof SVGElement&&"getBBox"in e},J=function(e){if(D(e)){var t=e.getBBox(),r=t.width,n=t.height;return!r&&!n}var i=e,s=i.offsetWidth,o=i.offsetHeight;return!(s||o||e.getClientRects().length)},P=function(e){var t;if(e instanceof Element)return!0;var r=(t=e==null?void 0:e.ownerDocument)===null||t===void 0?void 0:t.defaultView;return!!(r&&e instanceof r.Element)},pe=function(e){switch(e.tagName){case"INPUT":if(e.type!=="image")break;case"VIDEO":case"AUDIO":case"EMBED":case"OBJECT":case"CANVAS":case"IFRAME":case"IMG":return!0}return!1},b=typeof window<"u"?window:{},w=new WeakMap,W=/auto|scroll/,be=/^tb|vertical/,ge=/msie|trident/i.test(b.navigator&&b.navigator.userAgent),v=function(e){return parseFloat(e||"0")},l=function(e,t,r){return e===void 0&&(e=0),t===void 0&&(t=0),r===void 0&&(r=!1),new he((r?t:e)||0,(r?e:t)||0)},F=d({devicePixelContentBoxSize:l(),borderBoxSize:l(),contentBoxSize:l(),contentRect:new U(0,0,0,0)}),Y=function(e,t){if(t===void 0&&(t=!1),w.has(e)&&!t)return w.get(e);if(J(e))return w.set(e,F),F;var r=getComputedStyle(e),n=D(e)&&e.ownerSVGElement&&e.getBBox(),i=!ge&&r.boxSizing==="border-box",s=be.test(r.writingMode||""),o=!n&&W.test(r.overflowY||""),a=!n&&W.test(r.overflowX||""),c=n?0:v(r.paddingTop),u=n?0:v(r.paddingRight),h=n?0:v(r.paddingBottom),p=n?0:v(r.paddingLeft),j=n?0:v(r.borderTopWidth),ee=n?0:v(r.borderRightWidth),te=n?0:v(r.borderBottomWidth),re=n?0:v(r.borderLeftWidth),_=p+u,L=c+h,y=re+ee,T=j+te,N=a?e.offsetHeight-T-e.clientHeight:0,A=o?e.offsetWidth-y-e.clientWidth:0,ne=i?_+y:0,ie=i?L+T:0,E=n?n.width:v(r.width)-ne-A,z=n?n.height:v(r.height)-ie-N,oe=E+_+A+y,se=z+L+N+T,I=d({devicePixelContentBoxSize:l(Math.round(E*devicePixelRatio),Math.round(z*devicePixelRatio),s),borderBoxSize:l(oe,se,s),contentBoxSize:l(E,z,s),contentRect:new U(p,c,E,z)});return w.set(e,I),I},K=function(e,t,r){var n=Y(e,r),i=n.borderBoxSize,s=n.contentBoxSize,o=n.devicePixelContentBoxSize;switch(t){case m.DEVICE_PIXEL_CONTENT_BOX:return o;case m.BORDER_BOX:return i;default:return s}},me=function(){function e(t){var r=Y(t);this.target=t,this.contentRect=r.contentRect,this.borderBoxSize=d([r.borderBoxSize]),this.contentBoxSize=d([r.contentBoxSize]),this.devicePixelContentBoxSize=d([r.devicePixelContentBoxSize])}return e}(),Q=function(e){if(J(e))return 1/0;for(var t=0,r=e.parentNode;r;)t+=1,r=r.parentNode;return t},Ee=function(){var e=1/0,t=[];f.forEach(function(o){if(o.activeTargets.length!==0){var a=[];o.activeTargets.forEach(function(u){var h=new me(u.target),p=Q(u.target);a.push(h),u.lastReportedSize=K(u.target,u.observedBox),p<e&&(e=p)}),t.push(function(){o.callback.call(o.observer,a,o.observer)}),o.activeTargets.splice(0,o.activeTargets.length)}});for(var r=0,n=t;r<n.length;r++){var i=n[r];i()}return e},V=function(e){f.forEach(function(r){r.activeTargets.splice(0,r.activeTargets.length),r.skippedTargets.splice(0,r.skippedTargets.length),r.observationTargets.forEach(function(i){i.isActive()&&(Q(i.target)>e?r.activeTargets.push(i):r.skippedTargets.push(i))})})},ze=function(){var e=0;for(V(e);fe();)e=Ee(),V(e);return de()&&le(),e>0},B,Z=[],we=function(){return Z.splice(0).forEach(function(e){return e()})},Oe=function(e){if(!B){var t=0,r=document.createTextNode(""),n={characterData:!0};new MutationObserver(function(){return we()}).observe(r,n),B=function(){r.textContent="".concat(t?t--:t++)}}Z.push(e),B()},xe=function(e){Oe(function(){requestAnimationFrame(e)})},R=0,Re=function(){return!!R},ye=250,Te={attributes:!0,characterData:!0,childList:!0,subtree:!0},H=["resize","load","transitionend","animationend","animationstart","animationiteration","keyup","keydown","mouseup","mousedown","mouseover","mouseout","blur","focus"],X=function(e){return e===void 0&&(e=0),Date.now()+e},S=!1,Be=function(){function e(){var t=this;this.stopped=!0,this.listener=function(){return t.schedule()}}return e.prototype.run=function(t){var r=this;if(t===void 0&&(t=ye),!S){S=!0;var n=X(t);xe(function(){var i=!1;try{i=ze()}finally{if(S=!1,t=n-X(),!Re())return;i?r.run(1e3):t>0?r.run(t):r.start()}})}},e.prototype.schedule=function(){this.stop(),this.run()},e.prototype.observe=function(){var t=this,r=function(){return t.observer&&t.observer.observe(document.body,Te)};document.body?r():b.addEventListener("DOMContentLoaded",r)},e.prototype.start=function(){var t=this;this.stopped&&(this.stopped=!1,this.observer=new MutationObserver(this.listener),this.observe(),H.forEach(function(r){return b.addEventListener(r,t.listener,!0)}))},e.prototype.stop=function(){var t=this;this.stopped||(this.observer&&this.observer.disconnect(),H.forEach(function(r){return b.removeEventListener(r,t.listener,!0)}),this.stopped=!0)},e}(),C=new Be,q=function(e){!R&&e>0&&C.start(),R+=e,!R&&C.stop()},Se=function(e){return!D(e)&&!pe(e)&&getComputedStyle(e).display==="inline"},ke=function(){function e(t,r){this.target=t,this.observedBox=r||m.CONTENT_BOX,this.lastReportedSize={inlineSize:0,blockSize:0}}return e.prototype.isActive=function(){var t=K(this.target,this.observedBox,!0);return Se(this.target)&&(this.lastReportedSize=t),this.lastReportedSize.inlineSize!==t.inlineSize||this.lastReportedSize.blockSize!==t.blockSize},e}(),Ce=function(){function e(t,r){this.activeTargets=[],this.skippedTargets=[],this.observationTargets=[],this.observer=t,this.callback=r}return e}(),O=new WeakMap,$=function(e,t){for(var r=0;r<e.length;r+=1)if(e[r].target===t)return r;return-1},x=function(){function e(){}return e.connect=function(t,r){var n=new Ce(t,r);O.set(t,n)},e.observe=function(t,r,n){var i=O.get(t),s=i.observationTargets.length===0;$(i.observationTargets,r)<0&&(s&&f.push(i),i.observationTargets.push(new ke(r,n&&n.box)),q(1),C.schedule())},e.unobserve=function(t,r){var n=O.get(t),i=$(n.observationTargets,r),s=n.observationTargets.length===1;i>=0&&(s&&f.splice(f.indexOf(n),1),n.observationTargets.splice(i,1),q(-1))},e.disconnect=function(t){var r=this,n=O.get(t);n.observationTargets.slice().forEach(function(i){return r.unobserve(t,i.target)}),n.activeTargets.splice(0,n.activeTargets.length)},e}(),De=function(){function e(t){if(arguments.length===0)throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");if(typeof t!="function")throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");x.connect(this,t)}return e.prototype.observe=function(t,r){if(arguments.length===0)throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");if(!P(t))throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");x.observe(this,t,r)},e.prototype.unobserve=function(t){if(arguments.length===0)throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");if(!P(t))throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");x.unobserve(this,t)},e.prototype.disconnect=function(){x.disconnect(this)},e.toString=function(){return"function ResizeObserver () { [polyfill code] }"},e}();const _e=ae[typeof document<"u"&&document.createElement!==void 0?"useLayoutEffect":"useEffect"],Le=_e,Ne=e=>{const t=g.useRef(e);return g.useEffect(()=>{t.current=e}),t},Ae=Ne,Ie=typeof window<"u"&&"ResizeObserver"in window?window.ResizeObserver:De;function Me(){}function G(e,t){const r=We(),n=Ae(t);return Le(()=>{let i=!1;const s=e&&"current"in e?e.current:e;if(!s)return Me;function o(a,c){i||n.current(a,c)}return r.subscribe(s,o),()=>{i=!0,r.unsubscribe(s,o)}},[e,r,n]),r.observer}function Pe(){let e=!1,t=[];const r=new Map,n=new Ie((i,s)=>{t=t.concat(i);function o(){const a=new Set;for(let c=0;c<t.length;c++){if(a.has(t[c].target))continue;a.add(t[c].target);const u=r.get(t[c].target);u==null||u.forEach(h=>h(t[c],s))}t=[],e=!1}e||window.requestAnimationFrame(o),e=!0});return{observer:n,subscribe(i,s){var o;n.observe(i);const a=(o=r.get(i))!==null&&o!==void 0?o:[];a.push(s),r.set(i,a)},unsubscribe(i,s){var o;const a=(o=r.get(i))!==null&&o!==void 0?o:[];if(a.length===1){n.unobserve(i),r.delete(i);return}const c=a.indexOf(s);c!==-1&&a.splice(c,1),r.set(i,a)}}}let k;const We=()=>k||(k=Pe()),Fe=typeof window<"u"?g.useLayoutEffect:g.useEffect,Ve=G.default||G;function Ze(e){const{theme:t}=ce(),[r,n]=g.useState(ve(ue,()=>!1));function i(){const s=e.current;if(!s)return;const{width:o}=s.getBoundingClientRect();if(o===0)return;const a={};Object.entries(t.breakpoints).forEach(([c,u])=>{a[c]=o<u}),n(a)}return Fe(i,[e,t]),Ve(e,s=>i()),r}export{Ze as u};

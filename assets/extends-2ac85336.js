import{b as u,_ as p}from"./_baseForOwn-9e5806bb.js";import{_ as f}from"./_basePickBy-ef5dbcda.js";import{e as c}from"./_baseClone-deb2a2b4.js";function d(t){throw new Error('Could not dynamically require "'+t+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}function h(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function a(t,r){return a=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,o){return e.__proto__=o,e},a(t,r)}function i(t){return i=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(n){return n.__proto__||Object.getPrototypeOf(n)},i(t)}var l=u,y=p,_=f,O=c;function b(t,r){if(t==null)return{};var n=l(O(t),function(e){return[e]});return r=y(r),_(t,n,function(e,o){return r(e,o[0])})}var j=b;function s(){return s=Object.assign?Object.assign.bind():function(t){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&(t[e]=n[e])}return t},s.apply(this,arguments)}export{a as _,h as a,i as b,d as c,s as d,j as p};

import{l as a,m as c}from"./_baseIsEqual-e6235ae7.js";import{p as n}from"./_baseForOwn-9e8b57a2.js";var i=a,s=n,p=c,b="[object Object]",f=Function.prototype,j=Object.prototype,e=f.toString,l=j.hasOwnProperty,u=e.call(Object);function O(r){if(!p(r)||i(r)!=b)return!1;var o=s(r);if(o===null)return!0;var t=l.call(o,"constructor")&&o.constructor;return typeof t=="function"&&t instanceof t&&e.call(t)==u}var v=O;export{v as i};
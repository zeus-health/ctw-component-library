import{v as d}from"./v4-a960c1f4.js";var f="storybook/actions",O=`${f}/action-event`;const{addons:b}=__STORYBOOK_MODULE_PREVIEW_API__;var h={depth:10,clearOnStoryChange:!0,limit:50},p=(t,r)=>{let e=Object.getPrototypeOf(t);return!e||r(e)?e:p(e,r)},v=t=>!!(typeof t=="object"&&t&&p(t,r=>/^Synthetic(?:Base)?Event$/.test(r.constructor.name))&&typeof t.persist=="function"),A=t=>{if(v(t)){let r=Object.create(t.constructor.prototype,Object.getOwnPropertyDescriptors(t));r.persist();let e=Object.getOwnPropertyDescriptor(r,"view"),n=e==null?void 0:e.value;return typeof n=="object"&&(n==null?void 0:n.constructor.name)==="Window"&&Object.defineProperty(r,"view",{...e,value:Object.create(n.constructor.prototype)}),r}return t};function l(t,r={}){let e={...h,...r},n=function(...i){let o=b.getChannel(),s=d(),a=5,c=i.map(A),y=i.length>1?c:c[0],u={id:s,count:0,data:{name:t,args:y},options:{...e,maxDepth:a+(e.depth||3),allowFunction:e.allowFunction||!1}};o.emit(O,u)};return n.isAction=!0,n}var g=(t,r)=>typeof r[t]>"u"&&!(t in r),m=t=>{let{initialArgs:r,argTypes:e,parameters:{actions:n}}=t;if(!n||n.disable||!n.argTypesRegex||!e)return{};let i=new RegExp(n.argTypesRegex);return Object.entries(e).filter(([o])=>!!i.test(o)).reduce((o,[s,a])=>(g(s,r)&&(o[s]=l(s)),o),{})},j=t=>{let{initialArgs:r,argTypes:e,parameters:{actions:n}}=t;return n!=null&&n.disable||!e?{}:Object.entries(e).filter(([i,o])=>!!o.action).reduce((i,[o,s])=>(g(o,r)&&(i[o]=l(typeof s.action=="string"?s.action:o)),i),{})},T=[j,m];export{T as argsEnhancers};

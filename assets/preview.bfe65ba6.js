import{Q as s,d as o,L as m,w as c,l as v}from"./iframe.a900e634.js";module&&module.hot&&module.hot.decline&&module.hot.decline();var h="links",{document:i,HTMLElement:p}=c,u=e=>o.getChannel().emit(v,e),l=e=>{let{target:t}=e;if(!(t instanceof p))return;let d=t,{sbKind:n,sbStory:r}=d.dataset;(n||r)&&(e.preventDefault(),u({kind:n,story:r}))},a=!1,L=()=>{a||(a=!0,i.addEventListener("click",l))},k=()=>{a&&(a=!1,i.removeEventListener("click",l))},w=s({name:"withLinks",parameterName:h,wrapper:(e,t)=>(L(),o.getChannel().once(m,k),e(t))}),$=[w];export{$ as decorators};
//# sourceMappingURL=preview.bfe65ba6.js.map

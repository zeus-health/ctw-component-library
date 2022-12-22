try{
var n=`
*[id*="test"] {
  display: none !important;
}
`;if(location.hostname==="zeus-health.github.io"){let t=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style");t.appendChild(e),e.appendChild(document.createTextNode(n))}
}catch(e){ console.error("[Storybook] One of your manager-entries failed: " + import.meta.url, e); }
//# sourceMappingURL=manager.mjs.map

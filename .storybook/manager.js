const CSS_TO_HIDE_TESTS_IN_SIDEBAR = `
*[id*="test"] {
  display: none !important;
}
`;

// Don't show tests when on github.
if (location.hostname === "zeus-health.github.io") {
  const head = document.head || document.getElementsByTagName("head")[0];
  const style = document.createElement("style");
  head.appendChild(style);
  style.appendChild(document.createTextNode(CSS_TO_HIDE_TESTS_IN_SIDEBAR));
}

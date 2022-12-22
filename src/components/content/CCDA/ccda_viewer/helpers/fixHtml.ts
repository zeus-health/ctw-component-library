import { escapeRegExp, identity, isArray } from "lodash";

const replaceInXML = (
  xmlString: string,
  toReplace: string | string[],
  toReplaceWith: string,
  escape = true
): string => {
  if (isArray(toReplace)) {
    return toReplace.reduce(
      (acc, val) => replaceInXML(acc, val, toReplaceWith),
      xmlString
    );
  }

  const modify: (_: string) => string = escape ? escapeRegExp : identity;
  return xmlString.replace(new RegExp(modify(toReplace), "g"), toReplaceWith);
};

const replaceTag = (xmlString: string, oldTag: string, newTag: string) => {
  const oldTags = [`</${oldTag}>`, `<${oldTag}>`, `</${oldTag}`, `<${oldTag}`];
  const newTags = [`</${newTag}>`, `<${newTag}>`, `</${newTag}`, `<${newTag}`];

  return oldTags.reduce(
    (acc, _, index) => replaceInXML(acc, oldTags[index], newTags[index]),
    xmlString
  );
};

export const fixHtml = (xmlData: Document): string => {
  let fixedHtml = xmlData.toString();

  // these are not needed at all
  fixedHtml = replaceInXML(
    fixedHtml,
    [
      "<list/>",
      "<item/>",
      "<content/>",
      "<paragraph/>",
      "<section/>",
      "<br/>",
      '<text xmlns="urn:hl7-org:v3">',
      "<text />",
      "<text/>",
    ],
    ""
  );

  // there can be more strange attributes in C-CDA that need to be changed
  fixedHtml = replaceInXML(fixedHtml, ' styleCode="(.*?)"', "", false);

  fixedHtml = replaceTag(fixedHtml, "section", "div");
  fixedHtml = replaceTag(fixedHtml, "list", "ul");
  fixedHtml = replaceTag(fixedHtml, "item", "li");
  fixedHtml = replaceTag(fixedHtml, "content", "div");
  fixedHtml = replaceTag(fixedHtml, "paragraph", "p");

  return fixedHtml;
};

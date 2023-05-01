import xpath from "xpath";

export const getId = (id: Document | undefined): string => {
  if (!id) return "";

  const rootValue = String(xpath.select1("string(@root)", id));

  const extensionValue = String(xpath.select1("string(@extension)", id));

  return `${extensionValue}${extensionValue ? " (" : ""}${rootValue}${extensionValue ? ")" : ""}`;
};

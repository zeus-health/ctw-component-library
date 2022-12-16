import xpath from "xpath";

export const getId = (id: Document): string => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!id) return "";

  const rootValue = String(xpath.select1("string(@root)", id));

  const extensionValue = String(xpath.select1("string(@extension)", id));

  return `${extensionValue}${extensionValue ? " (" : ""}${rootValue}${
    extensionValue ? ")" : ""
  }`;
};

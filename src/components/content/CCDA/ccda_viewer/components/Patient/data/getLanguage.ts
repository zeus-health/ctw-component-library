import xpath from "xpath";

export const getLanguage = (patient: Document): string => {
  const languages = xpath.select(
    "*[name()='languageCommunication']",
    patient
  ) as Document[];

  return languages.reduce((acc, language, index) => {
    const languageCode = String(
      xpath.select1("string(*[name()='languageCode']/@code)", language)
    );
    if (!languageCode) return acc;

    const preferred = String(
      xpath.select1("string(*[name()='preferenceInd']/@value)", language)
    );

    const withNewLine = index === 0 ? "" : "\n";
    const withPreferred = preferred !== "" ? `, preferred: ${preferred}` : "";
    return `${acc}${withNewLine}${languageCode}${withPreferred}`;
  }, "");
};

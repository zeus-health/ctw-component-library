import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { DeepPartial } from "../utils/types";

export const useBaseTranslations = () => useTranslation(["main", "glossary"]);

export const resources = {
  en: {
    glossary: {
      condition_one: "condition",
      condition_other: "conditions",
    },
    main: {
      "resource.add": "Add {{resource}}",
      "resource.edit": "Edit {{resource}}",
      "resource.history.heading": "{{resource}} history",
      "resource.history.loading": "Loading {{resource}} history...",
      "resource.remove.body":
        "This will remove <2>{{resourceName}}</2> from this patient's {{resource}} list.",
      "resource.remove.heading": "Remove this {{resource}}",
      "resource.unamed": "unamed {{resource}}",
      "zap.tabs.conditions": "$t(glossary:condition_other) list",
      "zap.tabs.conditionsOutside": "outside $t(glossary:condition_other)",
    },
  },
};

export type Locals = DeepPartial<typeof resources>;

void i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    ns: ["glossary", "main"],
    returnNull: false,
    defaultNS: ["main", "glossary"],
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;

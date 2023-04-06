import { resources } from "./index";

declare module "i18next" {
  interface CustomTypeOptions {
    returnNull: false;
    defaultNS: "main";
    resources: (typeof resources)["en"];
  }
}

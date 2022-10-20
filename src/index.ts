import { version } from "../package.json";

export * from "@/components/content/conditions";
export * from "@/components/content/conditions-table-base";
export * from "@/components/core/ctw-provider";
export * from "@/components/core/patient-provider";
export * from "@/components/core/table/table";
export { version } from "../package.json";

declare global {
  interface Window {
    CTWComponentLibrary: {
      version: string;
    };
  }
}

if (typeof window !== "undefined") {
  window.CTWComponentLibrary = {
    version,
  };
}

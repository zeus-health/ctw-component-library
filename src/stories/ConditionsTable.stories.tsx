import { Conditions } from "@/components/content/conditions";
import { ComponentMeta, ComponentStoryFn } from "@storybook/react";

import { CTWProvider } from "@/components/core/ctw-provider";
import "@/styles/tailwind-gen.css";

const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;
const DEV_PENNY_UPID = "1b997957-e275-4e86-8f9a-8e0d03cecbab";

export default {
  title: "Content/ConditionsTable",
  component: Conditions,
  argTypes: {
    className: { name: "className", type: { name: "string", required: false } },
    patientID: {
      name: "Patient ID",
      type: { name: "string", required: true },
    },
    patientSystemURL: {
      name: "System URL of Patient ID",
      type: { name: "string", required: true },
    }
  },
} as ComponentMeta<typeof Conditions>;

const Template: ComponentStoryFn<typeof Conditions> = (args) => (
  <CTWProvider env="dev" authToken={AUTH_TOKEN}>
    <PatientProvider patientID={args.patientSystemURL} systemURL={VITE_SYSTEM_URL}>
      <Conditions {args.className} />
    </PatientProvider>
  </CTWProvider>
);

export const SarahMarsden = Template.bind({
  patientUPID: DEV_PENNY_UPID,
});

export const BlankUPID = Template.bind({
  patientUPID: "",
});

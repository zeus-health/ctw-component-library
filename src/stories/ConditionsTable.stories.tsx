import { Conditions } from "@/components/content/conditions";
import { ComponentMeta, ComponentStoryFn } from "@storybook/react";

import { CTWProvider } from "@/components/core/ctw-provider";
import "@/styles/tailwind-gen.css";
import {
  CONDITIONS_BUNDLE_BUILDER,
  CONDITIONS_BUNDLE_LENS,
  CONDITIONS_RESPONSE_HEADER,
} from "./resources/conditions";

const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;
const DEV_PENNY_UPID = "1b997957-e275-4e86-8f9a-8e0d03cecbab";

export default {
  title: "Content/ConditionsTable",
  component: Conditions,
  decorators: [withMock],
  argTypes: {
    className: { name: "className", type: { name: "string", required: false } },
    patientUPID: {
      name: "Patient UPID",
      type: { name: "string", required: true },
    },
  },
} as ComponentMeta<typeof Conditions>;

const Template: ComponentStoryFn<typeof Conditions> = (args) => (
  <CTWProvider env="dev" authToken={AUTH_TOKEN}>
    <Conditions {...args} />
  </CTWProvider>
);

export const SarahMarsden = Template.bind({
  patientUPID: DEV_PENNY_UPID,
});

const MOCK_RESPONSE = {
  mockData: [
    {
      url: "https://api.dev.zusapi.com/fhir/Condition?_tag%3Anot=https%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Csurescripts%2Chttps%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Ccommonwell%2Chttps%3A%2F%2Fzusapi.com%2Fthirdparty%2Fsource%7Celation%2Chttps%3A%2F%2Fzusapi.com%2Flens%7CActiveMedications%2Chttps%3A%2F%2Fzusapi.com%2Flens%7CChronicConditions&clinical-status=active%2C%20recurrence%2C%20relapse",
      method: "GET",
      status: 200,
      response: {
        header: JSON.stringify(CONDITIONS_RESPONSE_HEADER),
        data: JSON.stringify(CONDITIONS_BUNDLE_BUILDER),
      },
      delay: 350,
    },
    {
      url: "https://api.dev.zusapi.com/fhir/Condition?_tag=https%3A%2F%2Fzusapi.com%2Flens%7CActiveMedications%2Chttps%3A%2F%2Fzusapi.com%2Flens%7CChronicConditions",
      method: "GET",
      status: 200,
      response: {
        data: CONDITIONS_BUNDLE_LENS,
      },
      delay: 300,
    },
  ],
};
SarahMarsden.parameters = MOCK_RESPONSE;

export const BlankUPID = Template.bind({
  patientUPID: "",
});

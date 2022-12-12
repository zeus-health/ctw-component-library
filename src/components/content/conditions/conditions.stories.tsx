import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { Conditions, ConditionsProps } from "../conditions";
import { conditionFormDrawer } from "./story-helpers/condition-form-drawer";
import { conditionsObject } from "./story-helpers/conditions";
import { emptyConditions } from "./story-helpers/mocks/empty-conditions";
import { otherConditions } from "./story-helpers/mocks/other-conditions";
import { patientConditions } from "./story-helpers/mocks/patient-conditions";
import { setupConditionMocks } from "./story-helpers/mocks/requests";
import { CTWProvider } from "@/components/core/ctw-provider";
import { PatientProvider } from "@/components/core/patient-provider";
import { SYSTEM_ZUS_UNIVERSAL_ID } from "@/fhir/system-urls";

type Props = ConditionsProps;

export default {
  component: Conditions,
  tags: ["docsPage"],
  argTypes: {
    className: {
      options: ["Blank", "Fixed Width"],
      control: "select",
      mapping: {
        Blank: "",
        "Fixed Width": "ctw-m-auto ctw-max-w-[600px]",
      },
    },
  },
  args: {
    className: "Blank",
    readOnly: false,
  },
  decorators: [
    (Story, { args }) => (
      <CTWProvider env="dev" authToken="dummy-token" builderId="b123">
        <PatientProvider patientID="u12345" systemURL={SYSTEM_ZUS_UNIVERSAL_ID}>
          <Story args={args} />
        </PatientProvider>
      </CTWProvider>
    ),
  ],
} as Meta<Props>;

export const Basic: StoryObj<Props> = {
  ...setupConditionMocks({ otherConditions, patientConditions }),
};

export const Empty: StoryObj<Props> = {
  ...setupConditionMocks({
    otherConditions: emptyConditions,
    patientConditions: emptyConditions,
  }),
};

export const TestAdd: StoryObj<Props> = {
  ...Basic,
  play: async ({ canvasElement }) => {
    const conditions = await conditionsObject(canvasElement);
    await conditions.patientRecord.toHaveRowCount(2);
    const newCondition = "Heart failure (disorder)";
    conditions.clickAddCondition();
    const conditionForm = conditionFormDrawer(canvasElement);
    conditionForm.conditionSearch("heart");
    await conditionForm.selectCondition(newCondition);
    conditionForm.onset("2020-02-14");
    await conditionForm.save();
    await conditions.patientRecord.toHaveRowCount(3);
    expect(
      await conditions.patientRecord.table.findByText(newCondition)
    ).toBeTruthy();
  },
};

export const TestAddOther: StoryObj<Props> = {
  ...Basic,
  play: async ({ canvasElement }) => {
    const conditions = await conditionsObject(canvasElement);
    await conditions.patientRecord.toHaveRowCount(2);
    await conditions.otherProvider.add(2);
    const conditionForm = conditionFormDrawer(canvasElement);
    await conditionForm.save();
    await conditions.patientRecord.toHaveRowCount(3);
    expect(
      await conditions.patientRecord.table.findByText(/iron deficiency/i)
    ).toBeTruthy();
  },
};

export const TestEdit: StoryObj<Props> = {
  ...Basic,
  play: async ({ canvasElement }) => {
    const conditions = await conditionsObject(canvasElement);
    await conditions.patientRecord.toHaveRowCount(2);
    await conditions.patientRecord.edit(0);
    const conditionForm = conditionFormDrawer(canvasElement);
    conditionForm.verificationStatus("Confirmed");
    conditionForm.note("hello world");
    await conditionForm.save();
    conditions.patientRecord.toHaveRowWithText(0, /confirmed/i);
  },
};

export const TestDelete: StoryObj<Props> = {
  ...Basic,
  play: async ({ canvasElement }) => {
    const conditions = await conditionsObject(canvasElement);
    await conditions.patientRecord.toHaveRowCount(2);
    await conditions.patientRecord.delete(0);
    await conditions.patientRecord.toHaveRowCount(1);
    conditions.toggleInactive();
    await conditions.patientRecord.toHaveRowCount(3);
    conditions.patientRecord.toHaveRowWithText(0, /entered-in-error/i);
    conditions.toggleInactive();
    await conditions.patientRecord.toHaveRowCount(1);
  },
};

export const TestViewHistory: StoryObj<Props> = {
  ...Basic,
  play: async ({ canvasElement }) => {
    const conditions = await conditionsObject(canvasElement);
    await conditions.patientRecord.toHaveRowCount(2);
    await conditions.patientRecord.viewHistory(0);
    const canvas = within(canvasElement);
    const drawer = within(canvas.getByRole("dialog"));
    expect(
      await drawer.findByText(/generalized anxiety disorder/i)
    ).toBeTruthy();
    expect(drawer.getAllByRole("button", { name: /details/i })).toHaveLength(3);
    userEvent.click(drawer.getAllByRole("button", { name: /close/i })[0]);
  },
};

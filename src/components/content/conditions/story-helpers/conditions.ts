import { userEvent, within } from "@storybook/testing-library";
import { conditionTable } from "./condition-table";

export async function conditionsObject(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const tables = canvas.queryAllByRole("table");
  const patientRecord = conditionTable(canvasElement, tables[0]);
  const otherProvider = conditionTable(canvasElement, tables[1]);

  // Wait for loading to finish, we should have an active condition in each table.
  await patientRecord.table.findAllByText("active");
  await otherProvider.table.findAllByText("active");

  return {
    addCondition: () =>
      userEvent.click(canvas.getByRole("button", { name: "+ Add Condition" })),

    toggleInactive: () =>
      userEvent.click(canvas.getByLabelText("Include Inactive")),

    patientRecord,
    otherProvider,
  };
}

import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { conditionTable } from "./condition-table";

export async function conditionsObject(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  await waitFor(() => expect(canvas.queryAllByRole("table")).toHaveLength(2));
  const tables = canvas.queryAllByRole("table");
  const patientRecord = conditionTable(canvasElement, tables[0]);
  const otherProvider = conditionTable(canvasElement, tables[1]);

  // Wait for loading to finish, we should have an active condition in each table.
  await patientRecord.table.findAllByText("active");
  await otherProvider.table.findAllByText("active");

  return {
    clickAddCondition: () =>
      userEvent.click(canvas.getByTestId("button.add-condition")),

    toggleInactive: () =>
      userEvent.click(canvas.getByLabelText("Include Inactive")),

    patientRecord,
    otherProvider,
  };
}

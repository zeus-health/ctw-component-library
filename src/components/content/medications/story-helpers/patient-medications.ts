import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";

export async function medicationsTables(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  await waitFor(() => expect(canvas.queryAllByRole("table")).toHaveLength(2));
  const tables = canvas.queryAllByRole("table");
  const patientRecord = singleMedicationsTable(canvasElement, tables[0]);
  const otherProvider = singleMedicationsTable(canvasElement, tables[1]);

  return {
    patientRecord,
    otherProvider,
    clickAddMedication: () =>
      userEvent.click(canvas.getByRole("button", { name: "+ Add Medication" })),
  };
}

export function singleMedicationsTable(
  canvasElement: HTMLElement,
  tableEl: HTMLElement
) {
  async function clickInMenu(row: number, menuItem: string) {
    userEvent.click(getRow(row).getByRole("button", { name: /dropdown/i }));
    await within(canvasElement).findAllByRole("menuitem");
    userEvent.click(
      within(canvasElement).getByRole("menuitem", { name: menuItem })
    );
  }

  function getRow(row: number) {
    const tbody = within(tableEl).getAllByRole("rowgroup")[1];
    return within(within(tbody).queryAllByRole("row")[row]);
  }

  return {
    table: within(tableEl),
    // When switching between tests, we need to wait for the
    // mocked data to refresh/update.
    toHaveRowCount: async (count: number) => {
      if (count === 0) {
        await waitFor(() => {
          const tbody = within(tableEl).getAllByRole("rowgroup")[1];
          expect(tbody).toBeFalsy();
        });
      } else {
        await waitFor(() => {
          const tbody = within(tableEl).getAllByRole("rowgroup")[1];
          expect(within(tbody).queryAllByRole("row")).toHaveLength(count);
        });
      }
    },
    toHaveRowWithText: (row: number, text: string | RegExp) =>
      getRow(row).getByText(text),
    toHaveAnyRowWithText: async (text: string | RegExp) => {
      const tbody = await within(tableEl).getAllByRole("rowgroup")[1];
      expect(
        within(tbody)
          .getAllByRole("row")
          .some((next) => !!within(next).queryByText(text))
      ).toBeTruthy();
    },
    addToRecord: (row: number) => clickInMenu(row, "Add to Record"),
  };
}

import { expect } from "@storybook/jest";
import { userEvent, waitFor, waitForElementToBeRemoved, within } from "@storybook/testing-library";

export function conditionTable(canvasElement: HTMLElement, tableEl: HTMLElement) {
  const canvas = within(canvasElement);
  const table = within(tableEl);

  async function openMenu(row: number) {
    userEvent.click(getRow(row).getByRole("button", { name: /dropdown/i }));
    await canvas.findAllByRole("menuitem");
  }

  function clickMenu(menuItem: string) {
    userEvent.click(canvas.getByRole("menuitem", { name: menuItem }));
  }

  function getRow(row: number) {
    const tbody = table.getAllByRole("rowgroup")[1];
    return within(within(tbody).queryAllByRole("row")[row]);
  }

  return {
    table,
    // We use waitFor here as there is a race condition
    // when switching between tests, where the new
    // mocked data has yet to update.
    toHaveRowCount: async (count: number) => {
      const tbody = table.getAllByRole("rowgroup")[1];
      if (count === 0) {
        await waitFor(() => expect(tbody).toBeFalsy());
      } else {
        await waitFor(() => expect(within(tbody).queryAllByRole("row")).toHaveLength(count));
      }
    },
    toHaveRowWithText: (row: number, text: string | RegExp) => {
      getRow(row).getByText(text);
    },
    add: async (row: number) => {
      await openMenu(row);
      clickMenu("Add");
    },
    delete: async (row: number) => {
      await openMenu(row);
      clickMenu("Delete");
      userEvent.click(await canvas.findByRole("button", { name: /remove/i }));
      await waitForElementToBeRemoved(() => canvas.queryByRole("dialog"));
    },
    edit: async (row: number) => {
      await openMenu(row);
      clickMenu("Edit");
    },
    viewHistory: async (row: number) => {
      await openMenu(row);
      clickMenu("View History");
    },
  };
}

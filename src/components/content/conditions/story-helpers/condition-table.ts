import { expect } from "@storybook/jest";
import {
  userEvent,
  waitForElementToBeRemoved,
  within,
} from "@storybook/testing-library";

export function conditionTable(
  canvasElement: HTMLElement,
  tableEl: HTMLElement
) {
  const canvas = within(canvasElement);
  const table = within(tableEl);

  async function openMenu(row: number) {
    userEvent.click(getRow(row).getByRole("button", { name: /dropdown/i }));
    await canvas.findAllByRole("menuitem");
  }

  function clickMenu(menuItem: string) {
    userEvent.click(canvas.getByRole("menuitem", { name: menuItem }));
  }

  // Add 1 to account for header row.
  function getRow(row: number) {
    return within(table.queryAllByRole("row")[row + 1]);
  }

  return {
    table,
    tableEl,
    toHaveRowCount: (count: number) => {
      // We add 1 here to account for header row.
      expect(table.queryAllByRole("row")).toHaveLength(count + 1);
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

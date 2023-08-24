import { userEvent, waitForElementToBeRemoved, within } from "@storybook/testing-library";

export function conditionFormDrawer(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const drawer = within(canvas.getByRole("dialog"));

  return {
    conditionSearch: (search: string) =>
      userEvent.type(drawer.getByPlaceholderText("Type to search"), search),
    selectCondition: async (name: string) =>
      userEvent.click(await drawer.findByRole("option", { name })),
    status: (status: string) =>
      userEvent.selectOptions(drawer.getByTestId("form-field-status"), status),

    onset: (date: string) => userEvent.type(drawer.getByTestId("form-field-onset"), date),
    abatement: (date: string) => userEvent.type(drawer.getByTestId("form-field-abatement"), date),
    note: (note: string) => userEvent.type(drawer.getByTestId("form-field-note"), note),

    cancel: () => userEvent.click(drawer.getByRole("button", { name: "Cancel" })),
    save: async () => {
      await userEvent.click(drawer.getByRole("button", { name: "Save" }));
      await waitForElementToBeRemoved(() => canvas.queryByRole("dialog"));
    },
  };
}

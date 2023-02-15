import { userEvent, waitFor, within } from "@storybook/testing-library";

export async function medicationFormDrawer(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  const drawer = await waitFor(() => within(canvas.getByRole("dialog")));

  return {
    search: (search: string) =>
      userEvent.type(drawer.getByPlaceholderText("Type to search"), search),
    selectMedication: async (name: string) =>
      userEvent.click(await drawer.findByRole("option", { name })),
    status: (status: string) =>
      userEvent.selectOptions(drawer.getByTestId("form-field-status"), status),
    instructions: (instructions: string) =>
      userEvent.type(drawer.getByLabelText("Instructions"), instructions),
    cancel: () =>
      userEvent.click(drawer.getByRole("button", { name: "Cancel" })),
    save: async () => {
      userEvent.click(drawer.getByRole("button", { name: "Save" }));
    },
  };
}

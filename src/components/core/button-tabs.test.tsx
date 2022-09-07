import { Tab } from "@headlessui/react";
import { fireEvent, render } from "@testing-library/react";
import { ButtonTabs } from "./button-tabs";

function renderButtons() {
  return render(
    <ButtonTabs tabs={["First Tab", "Second Tab", "Third Tab"]}>
      <Tab.Panels>
        <Tab.Panel>First Panel</Tab.Panel>
        <Tab.Panel>Second Panel</Tab.Panel>
        <Tab.Panel>Third Panel</Tab.Panel>
      </Tab.Panels>
    </ButtonTabs>
  );
}

describe("button-tabs", () => {
  it("should render all buttons", () => {
    const { container } = renderButtons();
    expect(container).toHaveTextContent("First Tab");
    expect(container).toHaveTextContent("Second Tab");
    expect(container).toHaveTextContent("Third Tab");
  });

  it("should default to first tab", () => {
    const { container } = renderButtons();
    expect(container).toHaveTextContent("First Panel");
    expect(container).not.toHaveTextContent("Second Panel");
    expect(container).not.toHaveTextContent("Third Panel");
  });

  it("should switch tabs when button clicked", () => {
    const { getByText, container } = renderButtons();
    fireEvent.click(getByText("Second Tab"));

    expect(container).not.toHaveTextContent("First Panel");
    expect(container).toHaveTextContent("Second Panel");
    expect(container).not.toHaveTextContent("Third Panel");
  });
});

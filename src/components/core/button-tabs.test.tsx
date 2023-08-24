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
    expect(container.textContent).toContain("First Tab");
    expect(container.textContent).toContain("Second Tab");
    expect(container.textContent).toContain("Third Tab");
  });

  it("should default to first tab", () => {
    const { container } = renderButtons();
    expect(container.textContent).toContain("First Panel");
    expect(container.textContent).not.toContain("Second Panel");
    expect(container.textContent).not.toContain("Third Panel");
  });

  it("should switch tabs when button clicked", () => {
    const { getByText, container } = renderButtons();
    fireEvent.click(getByText("Second Tab"));

    expect(container.textContent).not.toContain("First Panel");
    expect(container.textContent).toContain("Second Panel");
    expect(container.textContent).not.toContain("Third Panel");
  });
});

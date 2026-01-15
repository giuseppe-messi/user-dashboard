import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "./Modal";

const mockOnClose = vi.fn();

const defaultProps = {
  isOpen: true,
  onClose: mockOnClose,
  children: <div>Modal Content</div>
};

const renderComponent = (props = defaultProps) => render(<Modal {...props} />);

describe("Modal component", () => {
  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it("should render when isOpen is true", () => {
    renderComponent();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("should not render when isOpen is false", () => {
    renderComponent({ ...defaultProps, isOpen: false });
    expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
  });

  it("should call onClose when overlay is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    const overlay = document.body.querySelector('[class*="modalOverlay"]');
    if (overlay) {
      await user.click(overlay as HTMLElement);
    }

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("should not call onClose when content is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText("Modal Content"));
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("should call onClose when Escape key is pressed", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.keyboard("{Escape}");

    expect(mockOnClose).toHaveBeenCalled();
  });
});

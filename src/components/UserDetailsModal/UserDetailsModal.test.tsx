import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserDetailsModal, UserDetailsModalProps } from "./UserDetailsModal";
import { mockUser } from "../../test/mocks/sharedMocks";

const mockOnClose = vi.fn();

const defaultProps: UserDetailsModalProps = {
  user: mockUser,
  onClose: mockOnClose
};

const renderComponent = (props: UserDetailsModalProps = defaultProps) =>
  render(<UserDetailsModal {...props} />);

describe("UserDetailsModal component", () => {
  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it("should render user details", () => {
    renderComponent();

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("admin")).toBeInTheDocument();
    expect(screen.getByText("Engineering")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });

  it("should call onClose when Close button is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText("Close"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});

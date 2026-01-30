import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserDetailsView } from "./UserDetailsView";
import { mockUser } from "../../test/mocks/sharedMocks";

const mockOnClose = vi.fn();
const mockOnNextUser = vi.fn();
const mockOnPrevUser = vi.fn();
const mockOnEdit = vi.fn();
const mockOnDelete = vi.fn();

const baseProps = {
  user: mockUser,
  onClose: mockOnClose,
  onNextUser: mockOnNextUser,
  onPrevUser: mockOnPrevUser,
  onEdit: mockOnEdit,
  onDelete: mockOnDelete,
  hasNextUser: true,
  hasPrevUser: true
};

const renderComponent = (props = baseProps) =>
  render(<UserDetailsView {...props} />);

describe("UserDetailsView component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders user basic information", () => {
    renderComponent();

    expect(
      screen.getByText(`${mockUser.firstName} ${mockUser.lastName}`)
    ).toBeInTheDocument();

    expect(screen.getByText(mockUser.position)).toBeInTheDocument();
    expect(screen.getByText(mockUser.team)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });

  it("calls callbacks when action buttons are clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText("Edit"));
    await user.click(screen.getByText("Delete"));
    await user.click(screen.getByText("Close"));

    expect(mockOnEdit).toHaveBeenCalled();
    expect(mockOnDelete).toHaveBeenCalledWith(mockUser.id);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("disables navigation buttons when flags are false", () => {
    renderComponent({
      ...baseProps,
      hasNextUser: false,
      hasPrevUser: false
    });

    expect(screen.getByText("Prev")).toBeDisabled();
    expect(screen.getByText("Next")).toBeDisabled();
  });
});

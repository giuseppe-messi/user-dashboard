import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserDetailsModalWrapper } from "./UserDetailsModalWrapper";
import { mockUser } from "../../test/mocks/sharedMocks";
import type { UserDetailsEditProps } from "./UserDetailsEdit";
import { UserDetailsViewProps } from "./UserDetailsView";

const mockOnSaveUser = vi.fn();
const mockOnDeleteUser = vi.fn();
const mockOnClose = vi.fn();

const baseProps = {
  user: mockUser,
  onClose: mockOnClose,
  onNextUser: vi.fn(),
  onPrevUser: vi.fn(),
  hasNextUser: true,
  hasPrevUser: true,
  onSaveUser: mockOnSaveUser,
  onDeleteUser: mockOnDeleteUser,
  onLoading: false
};

vi.mock("./UserDetailsEdit", () => ({
  UserDetailsEdit: ({ onSave, onCancel }: UserDetailsEditProps) => (
    <>
      <button onClick={() => onSave(mockUser)}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </>
  )
}));

vi.mock("./UserDetailsView", () => ({
  UserDetailsView: ({ onEdit, onDelete }: UserDetailsViewProps) => (
    <>
      <button onClick={onEdit}>Edit</button>
      <button onClick={() => onDelete(mockUser.id)}>Delete</button>
    </>
  )
}));

const renderComponent = (props = baseProps) =>
  render(<UserDetailsModalWrapper {...props} />);

describe("UserDetailsModalWrapper component", () => {
  it("handles edit, cancel, save and delete flows", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText("Edit"));
    expect(screen.getByText("Save")).toBeInTheDocument();

    await user.click(screen.getByText("Cancel"));
    expect(screen.getByText("Edit")).toBeInTheDocument();

    await user.click(screen.getByText("Edit"));

    await user.click(screen.getByText("Save"));
    expect(mockOnSaveUser).toHaveBeenCalledWith(mockUser);

    await user.click(screen.getByText("Delete"));
    expect(mockOnDeleteUser).toHaveBeenCalledWith(mockUser.id);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("renders loading spinner when onLoading is true", () => {
    renderComponent({ ...baseProps, onLoading: true });

    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});

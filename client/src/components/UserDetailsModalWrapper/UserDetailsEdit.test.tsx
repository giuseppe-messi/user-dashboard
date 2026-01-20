import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserDetailsEdit } from "./UserDetailsEdit";
import { mockUser } from "../../test/mocks/sharedMocks";
import { UserDetailsFormProps } from "./UserDetailsForm";

const mockOnSave = vi.fn();
const mockOnCancel = vi.fn();

vi.mock("./UserDetailsForm", () => ({
  UserDetailsForm: ({ onSubmit, onCancel, onChange }: UserDetailsFormProps) => (
    <form onSubmit={onSubmit}>
      <button type="button" onClick={() => onChange("firstName", "Mike")}>
        Change First Name
      </button>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  )
}));

const renderComponent = () =>
  render(
    <UserDetailsEdit
      user={mockUser}
      onSave={mockOnSave}
      onCancel={mockOnCancel}
    />
  );

describe("UserDetailsEdit component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls onSave with original user when submitted", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText("Save"));

    expect(mockOnSave).toHaveBeenCalledWith(mockUser);
  });

  it("calls onCancel when cancel is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText("Cancel"));

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("updates form state when onChange is called", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText("Change First Name"));
    await user.click(screen.getByText("Save"));

    expect(mockOnSave).toHaveBeenCalledWith({
      ...mockUser,
      firstName: "Mike"
    });
  });
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateUserModal } from "./CreateUserModal";
import { UserDetailsFormProps } from "../UserDetailsModalWrapper/UserDetailsForm";

const mockOnCreateUser = vi.fn();
const mockOnCancel = vi.fn();

vi.mock("../UserDetailsModalWrapper/UserDetailsForm", () => ({
  UserDetailsForm: ({ onSubmit, onCancel, onChange }: UserDetailsFormProps) => (
    <form onSubmit={onSubmit}>
      <button type="button" onClick={() => onChange("firstName", "Anna")}>
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
    <CreateUserModal onCreateUser={mockOnCreateUser} onCancel={mockOnCancel} />
  );

describe("CreateUserModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("updates form state and submits new user", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText("Change First Name"));
    await user.click(screen.getByText("Save"));

    expect(mockOnCreateUser).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: "Anna",
        role: "GUEST"
      })
    );

    expect(mockOnCancel).toHaveBeenCalled();
  });
});

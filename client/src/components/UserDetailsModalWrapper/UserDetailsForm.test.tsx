import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserDetailsForm } from "./UserDetailsForm";
import { mockUser } from "../../test/mocks/sharedMocks";

vi.mock("../../hooks/useUserRoles", () => ({
  useUserRoles: () => ({
    roles: ["Admin", "User"]
  })
}));

const mockOnSubmit = vi.fn((e) => e.preventDefault());
const mockOnCancel = vi.fn();
const mockOnChange = vi.fn();

const renderComponent = () =>
  render(
    <UserDetailsForm
      user={mockUser}
      onSubmit={mockOnSubmit}
      onCancel={mockOnCancel}
      onChange={mockOnChange}
    />
  );

describe("UserDetailsForm", () => {
  it("renders user values", () => {
    renderComponent();

    expect(screen.getByDisplayValue(mockUser.firstName)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.lastName)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.position)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.team)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.email)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.details)).toBeInTheDocument();
  });

  it("calls onSubmit when Save is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText("Save"));

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it("calls onCancel when Cancel is clicked", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.click(screen.getByText("Cancel"));

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("wires all input onChange handlers correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    const cases = [
      ["First Name", "firstName"],
      ["Last Name", "lastName"],
      ["Position", "position"],
      ["Team:", "team"],
      ["Contact information:", "email"],
      ["Other details:", "details"]
    ] as const;

    for (const [label, key] of cases) {
      const input = screen.getByLabelText(label);

      await user.type(input, "X");

      expect(mockOnChange).toHaveBeenLastCalledWith(key, expect.any(String));
    }
  });

  it("wires role select onChange correctly", async () => {
    const user = userEvent.setup();
    renderComponent();

    await user.selectOptions(screen.getByRole("combobox"), "User");

    expect(mockOnChange).toHaveBeenLastCalledWith("role", "User");
  });
});
